/**
 * MecanIQ - Intégration API Google Gemini (Google AI Studio)
 * Génération dynamique de fiches techniques véhicules au format JSON standardisé
 */

import { db } from "./db.js";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
export const DEFAULT_MODEL = "gemini-2.5-flash";

/**
 * Récupère la clé API Gemini stockée
 */
export async function getApiKey() {
  const key = await db.getSetting("gemini_api_key");
  if (key && typeof key === "string" && key.trim().length > 0) {
    return key.trim();
  }
  // Fallback localStorage si besoin
  return localStorage.getItem("mecaniq_gemini_api_key") || "";
}

/**
 * Sauvegarde la clé API Gemini
 */
export async function saveApiKey(key) {
  const cleanKey = (key || "").trim();
  await db.saveSetting("gemini_api_key", cleanKey);
  localStorage.setItem("mecaniq_gemini_api_key", cleanKey);
  return cleanKey;
}

/**
 * Récupère le modèle Gemini configuré
 */
export async function getSelectedModel() {
  const model = await db.getSetting("gemini_model");
  return model || DEFAULT_MODEL;
}

/**
 * Sauvegarde le modèle Gemini choisi
 */
export async function saveSelectedModel(model) {
  return await db.saveSetting("gemini_model", model);
}

/**
 * Teste la validité d'une clé API Gemini
 */
export async function testApiKey(apiKey, model = DEFAULT_MODEL) {
  if (!apiKey || apiKey.trim().length < 10) {
    throw new Error("Veuillez renseigner une clé API Google AI Studio valide.");
  }

  const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey.trim()}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Reponds uniquement 'OK' en texte brut." }] }],
      generationConfig: { maxOutputTokens: 10 }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `Erreur HTTP ${response.status}`;
    if (response.status === 400 || response.status === 403) {
      throw new Error(`Clé API non reconnue ou non autorisée (${message})`);
    } else if (response.status === 429) {
      throw new Error("Quota Gemini temporairement dépassé (429). Réessayez dans un instant.");
    }
    throw new Error(message);
  }

  return true;
}

/**
 * Génère une fiche technique complète pour un véhicule recherché
 * @param {string} query Requête utilisateur (ex: "Audi A3 2016 1.6 TDI 110" ou "Mazda MX-5 ND 2.0 Skyactiv-G")
 * @returns {Promise<Object>} Fiche technique standardisée
 */
export async function generateVehicleData(query) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    const err = new Error("Aucune clé API Gemini n'est configurée.");
    err.code = "NO_API_KEY";
    throw err;
  }

  const model = await getSelectedModel();
  const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;

  const systemInstruction = `Tu es MecanIQ AI, un ingénieur en chef d'atelier automobile et expert en données techniques constructeurs.
Tu dois générer une fiche technique ultra précise, exacte et standardisée au format JSON pour le véhicule demandé par le mécanicien.

RÈGLES D'OR ATELIER :
1. Les normes d'huile moteur doivent impérativement être la spécification exacte du constructeur (ex: VW 504.00/507.00, BMW LL-04, Renault RN0720 / RN17, PSA B71 2290 / FPW9.55535, Ford WSS-M2C913-D, Mercedes MB 229.51/52, etc.).
2. Couple de serrage du bouchon de vidange en Nm obligatoire avec dimension du filetage et type de joint.
3. Données sur la distribution précises : type (chaîne ou courroie), intervalle kilométrique et temporel.
4. Au moins 2 boîtes à fusibles (Habitacle et Compartiment Moteur) avec tableau de fusibles réels (numéro, ampérage, couleur SAE/DIN : 5A marron/orange, 10A rouge, 15A bleu, 20A jaune, 25A blanc, 30A vert, 40A orange maxi).
5. Radioscopie de fiabilité : au moins 3 pannes chroniques réelles connues en atelier avec gravité (high, medium, low), symptômes, causes et solutions, ainsi qu'une checklist d'achat et des recommandations pro.
6. Le résultat doit STRICTEMENT être un objet JSON valide, sans texte additionnel, sans markdown backticks.`;

  const prompt = `Génère la fiche technique complète pour le véhicule suivant : "${query}".

Schéma JSON attendu :
{
  "id": "slug-unique-en-minuscules-sans-espace",
  "brand": "Marque",
  "model": "Modèle",
  "generation": "Génération et années de production",
  "engine": "Dénomination moteur exacte",
  "engine_code": "Code moteur constructeur (ex: EA288, K9K, EB2, N47, etc.)",
  "fuel": "Diesel / Essence / Hybride / Électrique",
  "displacement_cc": 1968,
  "power_hp": 150,
  "power_kw": 110,
  "torque_nm": 340,
  "timing": {
    "type": "Courroie de distribution / Chaîne de distribution",
    "interval_km": 180000,
    "interval_years": 6,
    "notes": "Remarques sur la pompe à eau, galets ou tendeurs"
  },
  "fluids": {
    "engine_oil": {
      "viscosity": "5W-30",
      "standard": "Norme constructeur exacte",
      "capacity_with_filter_l": 4.5,
      "capacity_without_filter_l": 4.1,
      "interval_km": 15000,
      "interval_months": 12,
      "drain_plug": {
        "thread": "M14 x 1.5",
        "torque_nm": 30,
        "washer": "Description joint"
      }
    },
    "coolant": {
      "type": "Spécification liquide (ex: G12evo, Glaceol, etc.)",
      "capacity_l": 6.5,
      "interval": "Intervalle de remplacement"
    },
    "brake_fluid": {
      "type": "DOT 4 / DOT 5.1 / ISO 4925",
      "capacity_l": 1.0,
      "interval": "Tous les 2 ans"
    },
    "gearbox_oil": {
      "type": "Type de boîte et référence d'huile",
      "capacity_l": 2.2,
      "torque_drain_nm": 25,
      "torque_fill_nm": 25,
      "interval": "Préconisation de vidange"
    }
  },
  "fuse_boxes": [
    {
      "name": "Boîte Habitacle",
      "location": "Emplacement physique précis",
      "access": "Comment démonter le cache",
      "fuses": [
        { "id": "F1", "rating_a": 15, "color": "Bleu", "function": "Fonction protégée", "category": "Confort/Sécurité/Éclairage" }
      ]
    },
    {
      "name": "Boîte Compartiment Moteur",
      "location": "Emplacement physique précis",
      "access": "Comment démonter le cache",
      "fuses": [
        { "id": "F10", "rating_a": 30, "color": "Vert", "function": "Fonction protégée", "category": "Moteur" }
      ]
    }
  ],
  "reliability": {
    "summary": "Synthèse globale de fiabilité du bloc et du véhicule",
    "critical_issues": [
      {
        "component": "Pièce incriminée",
        "severity": "high / medium / low",
        "symptoms": "Signes précurseurs d'alerte",
        "cause": "Cause technique",
        "remedy": "Solution atelier et préventions"
      }
    ],
    "buyer_checklist": [
      "Point d'inspection 1",
      "Point d'inspection 2"
    ],
    "service_recommendations": [
      "Conseil d'entretien d'expert 1",
      "Conseil d'entretien d'expert 2"
    ]
  },
  "raz_procedure": {
    "method": "Bouton compteur / Comodo / Pédales",
    "steps": [
      "Étape 1 : Couper le contact et fermer toutes les portes.",
      "Étape 2 : Maintenir la commande de remise à zéro...",
      "Étape 3 : Mettre le contact sans démarrer...",
      "Étape 4 : Confirmer l'extinction du témoin d'entretien."
    ],
    "notes": "Remarque constructeur sur l'échéance de vidange"
  }
}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: prompt }] }
        ],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.1
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.error?.message || `Erreur API ${response.status}`;
      if (response.status === 400 || response.status === 403) {
        throw new Error("Clé API invalide ou permissions insuffisantes.");
      } else if (response.status === 429) {
        throw new Error("Quota Gemini atteint. Veuillez patienter un instant avant de réessayer.");
      }
      throw new Error(`Échec de génération IA : ${message}`);
    }

    const jsonResponse = await response.json();
    const candidateText = jsonResponse.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Réponse vide reçue de l'IA Gemini.");
    }

    // Parse du JSON avec nettoyage si besoin
    let parsedVehicle;
    try {
      let cleanText = candidateText.trim();
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```\s*/, "").replace(/```$/, "").trim();
      }
      parsedVehicle = JSON.parse(cleanText);
    } catch (parseErr) {
      console.error("Erreur de parsing JSON IA :", candidateText);
      throw new Error("Les données reçues de l'IA n'ont pas pu être décodées au format technique.");
    }

    // Assurer les champs essentiels et l'id unique
    if (!parsedVehicle.id) {
      const slug = `${parsedVehicle.brand || "auto"}-${parsedVehicle.model || "vehicule"}-${parsedVehicle.engine || Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      parsedVehicle.id = slug;
    }

    parsedVehicle.source = "ai_generated";
    parsedVehicle.generated_at = new Date().toISOString();

    // ENREGISTREMENT AUTOMATIQUE DANS INDEXEDDB POUR ACCÈS HORS-LIGNE PERMANENT
    await db.saveVehicle(parsedVehicle);

    return parsedVehicle;
  } catch (err) {
    if (!navigator.onLine) {
      throw new Error("Vous êtes hors-ligne. Impossible d'interroger Gemini pour un véhicule non répertorié.");
    }
    throw err;
  }
}

/**
 * Analyse une photo de carte grise (certificat d'immatriculation) ou code VIN par Gemini Flash Vision
 * @param {string} base64Data Image encodée en base64 (avec ou sans le préfixe data:image/...;base64,)
 * @param {string} mimeType Type MIME de l'image (ex: image/jpeg, image/png)
 * @returns {Promise<Object>} Données extraites { make, model, generation, vin, fuel, engine_hint }
 */
export async function scanDocumentOrVin(base64Data, mimeType = "image/jpeg") {
  const apiKey = await getApiKey();
  if (!apiKey) {
    const err = new Error("Aucune clé API Gemini n'est configurée.");
    err.code = "NO_API_KEY";
    throw err;
  }

  const model = await getSelectedModel();
  const endpoint = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;

  let cleanBase64 = base64Data;
  if (cleanBase64.includes(",")) {
    cleanBase64 = cleanBase64.split(",")[1];
  }

  const prompt = `Tu es un expert d'atelier automobile et de lecture de documents officiels.
Analyse cette image qui est soit une carte grise (certificat d'immatriculation français/européen), soit une plaque constructeur ou un numéro de série VIN (17 caractères).
Extrais avec la plus grande rigueur les informations clés suivantes :
- make : Marque du constructeur (champ D.1 sur carte grise, ex: Renault, Peugeot, Volkswagen, BMW, Audi, Toyota, etc.)
- model : Modèle commercial précis (champ D.3 ou D.2, ex: Clio IV, Golf VII, 308, A3, Série 3, 208, etc.)
- generation : Génération ou tranche d'années déductible (ex: 2012-2019, Phase 2, etc.)
- vin : Code VIN à 17 caractères (champ E sur carte grise ou plaque châssis)
- fuel : Énergie / Carburant (champ P.3 : ES=Essence, GO=Diesel, EL=Électrique, EE/EH/GL=Hybride)
- engine_hint : Motorisation déductible (ex: 1.5 dCi, 2.0 TDI, 1.2 PureTech, 110 ch, etc.)

RÉPONDS STRICTEMENT sous forme d'un objet JSON pur, valide, sans aucun texte autour, sans markdown backticks :
{
  "make": "Marque",
  "model": "Modèle",
  "generation": "Génération",
  "vin": "Numéro VIN ou vide",
  "fuel": "Carburant",
  "engine_hint": "Motorisation ou vide"
}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType || "image/jpeg",
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.1
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.error?.message || `Erreur API ${response.status}`;
      throw new Error(`Échec du scan visuel : ${message}`);
    }

    const jsonResponse = await response.json();
    const candidateText = jsonResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("L'IA n'a pas pu identifier le document.");
    }

    let cleanText = candidateText.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    } else if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```\s*/, "").replace(/```$/, "").trim();
    }

    return JSON.parse(cleanText);
  } catch (err) {
    if (!navigator.onLine) {
      throw new Error("Vous êtes hors-ligne. Le scan visuel nécessite une connexion internet.");
    }
    throw err;
  }
}
