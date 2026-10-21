/**
 * MecanIQ - Module de Persistance IndexedDB & Cache Local
 * Gère le stockage hybride (véhicules préchargés, fiches IA, carnet d'entretien, favoris, historique)
 */

import { INITIAL_VEHICLES } from "./data/initial-vehicles.js";

const DB_NAME = "MecanIQ_Database";
const DB_VERSION = 16;

class MecanIQDatabase {
  constructor() {
    this.db = null;
    this.initPromise = null;
  }

  /**
   * Initialise et met à niveau IndexedDB
   */
  async init() {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          // Table des fiches techniques véhicules
          if (!db.objectStoreNames.contains("vehicles")) {
            const vehicleStore = db.createObjectStore("vehicles", { keyPath: "id" });
            vehicleStore.createIndex("brand", "brand", { unique: false });
            vehicleStore.createIndex("source", "source", { unique: false });
            vehicleStore.createIndex("created_at", "created_at", { unique: false });
          }

          // Table de l'historique de consultation
          if (!db.objectStoreNames.contains("history")) {
            const historyStore = db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
            historyStore.createIndex("vehicleId", "vehicleId", { unique: false });
            historyStore.createIndex("viewed_at", "viewed_at", { unique: false });
          }

          // Table des favoris
          if (!db.objectStoreNames.contains("favorites")) {
            db.createObjectStore("favorites", { keyPath: "vehicleId" });
          }

          // Table des véhicules du carnet de bord
          if (!db.objectStoreNames.contains("my_vehicles")) {
            const myVehiclesStore = db.createObjectStore("my_vehicles", { keyPath: "id" });
            myVehiclesStore.createIndex("plate", "plate", { unique: false });
          }

          // Table des entrées d'entretien du carnet de bord
          if (!db.objectStoreNames.contains("maintenance_logs")) {
            const logStore = db.createObjectStore("maintenance_logs", { keyPath: "id" });
            logStore.createIndex("vehicleId", "vehicleId", { unique: false });
            logStore.createIndex("date", "date", { unique: false });
          }

          // Table des paramètres / configurations
          if (!db.objectStoreNames.contains("settings")) {
            db.createObjectStore("settings", { keyPath: "key" });
          }
        };

        request.onsuccess = async (event) => {
          this.db = event.target.result;
          try {
            await this.seedInitialData();
          } catch (seedErr) {
            console.warn("Avertissement seed données :", seedErr);
          }
          resolve(this.db);
        };

        request.onerror = (event) => {
          console.error("Erreur d'ouverture IndexedDB :", event.target.error);
          this.initPromise = null;
          reject(event.target.error);
        };
      } catch (err) {
        console.error("IndexedDB indisponible :", err);
        this.initPromise = null;
        reject(err);
      }
    });

    return this.initPromise;
  }

  /**
   * Garantit une connexion ouverte à IndexedDB
   */
  async ensureDb() {
    if (this.db) return this.db;
    return await this.init();
  }

  /**
   * Charge les véhicules par défaut dans la base si la table est vide ou pour actualiser les véhicules de référence
   */
  async seedInitialData() {
    if (!this.db) return;
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction("vehicles", "readwrite");
        const store = tx.objectStore("vehicles");
        const req = store.getAll();

        req.onsuccess = () => {
          const existing = req.result || [];
          const existingMap = new Map(existing.map(e => [e.id, e]));

          for (const v of INITIAL_VEHICLES) {
            const alreadyPresent = existingMap.get(v.id);
            if (!alreadyPresent || alreadyPresent.source === "local_base") {
              store.put({
                ...v,
                brand: v.brand || v.make,
                make: v.make || v.brand,
                source: "local_base",
                created_at: alreadyPresent?.created_at || new Date().toISOString()
              });
            }
          }
        };

        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch (err) {
        console.warn("Exception seedInitialData :", err);
        resolve();
      }
    });
  }

  // ==========================================
  // GESTION DES VÉHICULES
  // ==========================================

  async getAllVehicles() {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("vehicles", "readonly");
      const store = tx.objectStore("vehicles");
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async getVehicleById(id) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("vehicles", "readonly");
      const store = tx.objectStore("vehicles");
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  }

  async saveVehicle(vehicle) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("vehicles", "readwrite");
      const store = tx.objectStore("vehicles");
      const toSave = {
        ...vehicle,
        updated_at: new Date().toISOString()
      };
      if (!toSave.created_at) {
        toSave.created_at = new Date().toISOString();
      }
      const req = store.put(toSave);
      req.onsuccess = () => resolve(toSave);
      req.onerror = () => reject(req.error);
    });
  }

  async deleteVehicle(id) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("vehicles", "readwrite");
      const store = tx.objectStore("vehicles");
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  async clearAIGeneratedVehicles() {
    await this.ensureDb();
    const vehicles = await this.getAllVehicles();
    const tx = this.db.transaction("vehicles", "readwrite");
    const store = tx.objectStore("vehicles");
    for (const v of vehicles) {
      if (v.source === "ai_generated") {
        store.delete(v.id);
      }
    }
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
    });
  }

  // ==========================================
  // GESTION DES FAVORIS
  // ==========================================

  async getFavorites() {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("favorites", "readonly");
      const store = tx.objectStore("favorites");
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result.map(f => f.vehicleId));
      req.onerror = () => reject(req.error);
    });
  }

  async isFavorite(vehicleId) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("favorites", "readonly");
      const store = tx.objectStore("favorites");
      const req = store.get(vehicleId);
      req.onsuccess = () => resolve(!!req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async toggleFavorite(vehicleId) {
    const isFav = await this.isFavorite(vehicleId);
    const tx = this.db.transaction("favorites", "readwrite");
    const store = tx.objectStore("favorites");
    if (isFav) {
      store.delete(vehicleId);
    } else {
      store.put({ vehicleId, added_at: new Date().toISOString() });
    }
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve(!isFav);
    });
  }

  // ==========================================
  // GESTION DE L'HISTORIQUE
  // ==========================================

  async addToHistory(vehicleId) {
    await this.ensureDb();
    const tx = this.db.transaction("history", "readwrite");
    const store = tx.objectStore("history");
    store.add({
      vehicleId,
      viewed_at: new Date().toISOString()
    });
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
    });
  }

  async getRecentHistory(limit = 10) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("history", "readonly");
      const store = tx.objectStore("history");
      const req = store.getAll();
      req.onsuccess = () => {
        const results = req.result || [];
        // Trier par date décroissante et dédoublonner
        results.sort((a, b) => new Date(b.viewed_at) - new Date(a.viewed_at));
        const seen = new Set();
        const unique = [];
        for (const item of results) {
          if (!seen.has(item.vehicleId)) {
            seen.add(item.vehicleId);
            unique.push(item);
            if (unique.length >= limit) break;
          }
        }
        resolve(unique);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async clearHistory() {
    await this.ensureDb();
    const tx = this.db.transaction("history", "readwrite");
    const store = tx.objectStore("history");
    store.clear();
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve();
    });
  }

  // ==========================================
  // CARNET DE BORD : VÉHICULES PROPRIÉTAIRE
  // ==========================================

  async getMyVehicles() {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("my_vehicles", "readonly");
      const store = tx.objectStore("my_vehicles");
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async saveMyVehicle(myVehicle) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("my_vehicles", "readwrite");
      const store = tx.objectStore("my_vehicles");
      if (!myVehicle.id) {
        myVehicle.id = "my-veh-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5);
      }
      myVehicle.updated_at = new Date().toISOString();
      const req = store.put(myVehicle);
      req.onsuccess = () => resolve(myVehicle);
      req.onerror = () => reject(req.error);
    });
  }

  async deleteMyVehicle(id) {
    await this.ensureDb();
    // Supprime le véhicule et ses entrées d'entretien
    const tx = this.db.transaction(["my_vehicles", "maintenance_logs"], "readwrite");
    tx.objectStore("my_vehicles").delete(id);
    const logStore = tx.objectStore("maintenance_logs");
    const logIndex = logStore.index("vehicleId");
    const req = logIndex.getAll(id);
    req.onsuccess = () => {
      for (const entry of req.result) {
        logStore.delete(entry.id);
      }
    };
    return new Promise((resolve) => {
      tx.oncomplete = () => resolve(true);
    });
  }

  // ==========================================
  // CARNET DE BORD : ENTRÉES D'ENTRETIEN
  // ==========================================

  async getMaintenanceLogs(myVehicleId) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("maintenance_logs", "readonly");
      const store = tx.objectStore("maintenance_logs");
      const index = store.index("vehicleId");
      const req = index.getAll(myVehicleId);
      req.onsuccess = () => {
        const sorted = (req.result || []).sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(sorted);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async saveMaintenanceLog(entry) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("maintenance_logs", "readwrite");
      const store = tx.objectStore("maintenance_logs");
      if (!entry.id) {
        entry.id = "log-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5);
      }
      entry.created_at = new Date().toISOString();
      const req = store.put(entry);
      req.onsuccess = () => resolve(entry);
      req.onerror = () => reject(req.error);
    });
  }

  async deleteMaintenanceLog(id) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("maintenance_logs", "readwrite");
      const store = tx.objectStore("maintenance_logs");
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // PARAMÈTRES / CONFIGURATION
  // ==========================================

  async getSetting(key, defaultValue = null) {
    await this.ensureDb();
    return new Promise((resolve) => {
      const tx = this.db.transaction("settings", "readonly");
      const store = tx.objectStore("settings");
      const req = store.get(key);
      req.onsuccess = () => {
        resolve(req.result ? req.result.value : defaultValue);
      };
      req.onerror = () => resolve(defaultValue);
    });
  }

  async saveSetting(key, value) {
    await this.ensureDb();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("settings", "readwrite");
      const store = tx.objectStore("settings");
      const req = store.put({ key, value, updated_at: new Date().toISOString() });
      req.onsuccess = () => resolve(value);
      req.onerror = () => reject(req.error);
    });
  }

  // ==========================================
  // EXPORT / IMPORT GLOBAL
  // ==========================================

  async exportAllData() {
    await this.ensureDb();
    const vehicles = await this.getAllVehicles();
    const myVehicles = await this.getMyVehicles();
    const favorites = await this.getFavorites();

    const allLogs = [];
    for (const v of myVehicles) {
      const logs = await this.getMaintenanceLogs(v.id);
      allLogs.push(...logs);
    }

    return {
      version: 1,
      exported_at: new Date().toISOString(),
      vehicles,
      my_vehicles: myVehicles,
      maintenance_logs: allLogs,
      favorites
    };
  }

  async importData(data) {
    await this.ensureDb();
    if (!data || typeof data !== "object") throw new Error("Format de fichier d'import invalide.");

    // Import des véhicules
    if (Array.isArray(data.vehicles)) {
      for (const v of data.vehicles) {
        await this.saveVehicle(v);
      }
    }
    // Import des véhicules perso
    if (Array.isArray(data.my_vehicles)) {
      for (const mv of data.my_vehicles) {
        await this.saveMyVehicle(mv);
      }
    }
    // Import des logs
    if (Array.isArray(data.maintenance_logs)) {
      for (const l of data.maintenance_logs) {
        await this.saveMaintenanceLog(l);
      }
    }
    return true;
  }
}

export const db = new MecanIQDatabase();
