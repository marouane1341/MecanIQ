/**
 * MecanIQ - Module Supabase (Synchronisation Cloud & Base Partagée)
 * Architecture Hybride : Local Cache-First -> Cloud Supabase -> IA Gemini Flash
 * Enrichissement collaboratif de la table 'vehicles'
 */

import { db } from "./db.js";

export const DEFAULT_SUPABASE_URL = "https://uevfnellf1khmvjkmnye.supabase.co";
export const DEFAULT_SUPABASE_KEY = "Sb_publishable_ye0Q2UnMlpXnh33bcO2cMA_NRGaJSB_";

/**
 * Récupère l'URL Supabase configurée
 */
export async function getSupabaseUrl() {
  try {
    const url = await db.getSetting("supabase_url");
    if (url && typeof url === "string" && url.trim().length > 0) {
      return url.trim();
    }
  } catch (e) {}
  return localStorage.getItem("mecaniq_supabase_url") || DEFAULT_SUPABASE_URL;
}

/**
 * Récupère la clé Supabase configurée
 */
export async function getSupabaseKey() {
  try {
    const key = await db.getSetting("supabase_key");
    if (key && typeof key === "string" && key.trim().length > 0) {
      return key.trim();
    }
  } catch (e) {}
  return localStorage.getItem("mecaniq_supabase_key") || DEFAULT_SUPABASE_KEY;
}

/**
 * Sauvegarde la configuration Supabase
 */
export async function saveSupabaseConfig(url, key) {
  const cleanUrl = (url || DEFAULT_SUPABASE_URL).trim().replace(/\/+$/, "");
  const cleanKey = (key || DEFAULT_SUPABASE_KEY).trim();
  try {
    await db.saveSetting("supabase_url", cleanUrl);
    await db.saveSetting("supabase_key", cleanKey);
  } catch (e) {}
  localStorage.setItem("mecaniq_supabase_url", cleanUrl);
  localStorage.setItem("mecaniq_supabase_key", cleanKey);
  return { url: cleanUrl, key: cleanKey };
}

/**
 * Prépare les en-têtes d'authentification Supabase REST
 */
async function getHeaders(customPrefer = "") {
  const key = await getSupabaseKey();
  const headers = {
    "apikey": key,
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json"
  };
  if (customPrefer) {
    headers["Prefer"] = customPrefer;
  }
  return headers;
}

/**
 * Déballe et normalise un enregistrement issu de Supabase (colonnes: id, make, model, generation, data)
 */
export function unpackVehicleRecord(row) {
  if (!row) return null;
  let baseData = {};
  if (row.data && typeof row.data === "object") {
    baseData = { ...row.data };
  } else if (typeof row.data === "string") {
    try {
      baseData = JSON.parse(row.data);
    } catch (e) {
      baseData = {};
    }
  }

  return {
    ...baseData,
    id: row.id || baseData.id,
    brand: row.make || baseData.brand || baseData.make || "Atelier",
    make: row.make || baseData.make || baseData.brand || "Atelier",
    model: row.model || baseData.model || "",
    generation: row.generation || baseData.generation || "",
    source: "supabase_cloud",
    synced_at: new Date().toISOString()
  };
}

/**
 * Recherche des véhicules dans la table Supabase `vehicles`
 * @param {string} query Termes de recherche (ex: "Clio 4", "1.5 dci", "Golf 7")
 * @returns {Promise<Array>} Liste des véhicules trouvés
 */
export async function searchSupabaseVehicles(query) {
  if (!query || typeof query !== "string" || !query.trim()) return [];
  if (!navigator.onLine) return [];

  const baseUrl = await getSupabaseUrl();
  const headers = await getHeaders();
  const cleanQuery = query.trim();

  try {
    // 1. Recherche PostgREST sur make, model, generation ou id
    const encoded = encodeURIComponent(`*${cleanQuery}*`);
    const filter = `or=(id.ilike.${encoded},make.ilike.${encoded},model.ilike.${encoded},generation.ilike.${encoded})`;
    const endpoint = `${baseUrl}/rest/v1/vehicles?${filter}&select=*&limit=10`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        return rows.map(unpackVehicleRecord).filter(Boolean);
      }
    }

    // 2. Recherche par mots-clés si plusieurs termes
    const words = cleanQuery.split(/\s+/).filter((w) => w.length >= 2);
    if (words.length > 1) {
      const subConditions = words.map((w) => {
        const enc = encodeURIComponent(`*${w}*`);
        return `or(make.ilike.${enc},model.ilike.${enc},id.ilike.${enc})`;
      }).join(",");
      const subEndpoint = `${baseUrl}/rest/v1/vehicles?and=(${subConditions})&select=*&limit=10`;

      const subController = new AbortController();
      const subTimeoutId = setTimeout(() => subController.abort(), 6000);

      const subRes = await fetch(subEndpoint, {
        method: "GET",
        headers,
        signal: subController.signal
      });
      clearTimeout(subTimeoutId);

      if (subRes.ok) {
        const subRows = await subRes.json();
        if (Array.isArray(subRows) && subRows.length > 0) {
          return subRows.map(unpackVehicleRecord).filter(Boolean);
        }
      }
    }

    return [];
  } catch (err) {
    console.warn("Recherche Supabase non disponible ou hors-ligne :", err.message);
    return [];
  }
}

/**
 * Insère ou met à jour une fiche véhicule dans la table Supabase `vehicles`
 * Colonnes : id, make, model, generation, data
 * @param {Object} vehicle Objet véhicule complet
 * @returns {Promise<boolean>} Succès de l'opération
 */
export async function pushVehicleToSupabase(vehicle) {
  if (!vehicle || !vehicle.id) {
    console.warn("Véhicule invalide pour publication Supabase.");
    return false;
  }
  if (!navigator.onLine) {
    console.warn("Hors-ligne : l'envoi Supabase sera reporté.");
    return false;
  }

  const baseUrl = await getSupabaseUrl();
  const headers = await getHeaders("resolution=merge-duplicates,return=representation");

  const row = {
    id: vehicle.id,
    make: vehicle.brand || vehicle.make || "Atelier",
    model: vehicle.model || "Véhicule",
    generation: vehicle.generation || vehicle.years || "",
    data: vehicle
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${baseUrl}/rest/v1/vehicles`, {
      method: "POST",
      headers,
      body: JSON.stringify(row),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.warn("Statut réponse Supabase :", res.status, errText);
      return false;
    }

    console.log(`Véhicule ${vehicle.id} publié avec succès sur Supabase ☁️`);
    return true;
  } catch (err) {
    console.warn("Erreur réseau synchronisation Supabase :", err.message);
    return false;
  }
}

/**
 * Synchronise les nouveaux véhicules de la table Supabase `vehicles` vers le cache local IndexedDB
 * @returns {Promise<number>} Nombre de nouvelles fiches intégrées
 */
export async function syncNewVehiclesFromSupabase() {
  if (!navigator.onLine) return 0;

  const baseUrl = await getSupabaseUrl();
  const headers = await getHeaders();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const endpoint = `${baseUrl}/rest/v1/vehicles?select=*&limit=100`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) return 0;

    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return 0;

    let addedCount = 0;
    const localVehicles = await db.getAllVehicles();
    const localIdSet = new Set(localVehicles.map((v) => v.id));

    for (const row of rows) {
      const unpacked = unpackVehicleRecord(row);
      if (unpacked && !localIdSet.has(unpacked.id)) {
        await db.saveVehicle(unpacked);
        localIdSet.add(unpacked.id);
        addedCount++;
      }
    }

    if (addedCount > 0) {
      console.log(`Synchronisation Supabase : ${addedCount} nouvelle(s) fiche(s) ajoutée(s) au cache local !`);
    }
    return addedCount;
  } catch (err) {
    console.warn("Synchronisation arrière-plan Supabase non disponible :", err.message);
    return 0;
  }
}

/**
 * Teste la connexion à la table Supabase `vehicles`
 */
export async function testSupabaseConnection(url = "", key = "") {
  const targetUrl = (url || (await getSupabaseUrl())).trim().replace(/\/+$/, "");
  const targetKey = (key || (await getSupabaseKey())).trim();

  if (!targetUrl || !targetKey) {
    throw new Error("URL et clé Supabase requises.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  const res = await fetch(`${targetUrl}/rest/v1/vehicles?select=id&limit=1`, {
    method: "GET",
    headers: {
      "apikey": targetKey,
      "Authorization": `Bearer ${targetKey}`,
      "Content-Type": "application/json"
    },
    signal: controller.signal
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Erreur Supabase (code ${res.status}) : ${txt || "Accès refusé"}`);
  }

  return true;
}
