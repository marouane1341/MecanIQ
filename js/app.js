/**
 * MecanIQ - Application Principale (SPA & PWA)
 * Contrôleur unifié : Recherche, Fiche Technique, Carnet de bord, Convertisseurs & IA
 */

import { db } from "./db.js";
import { INITIAL_VEHICLES } from "./data/initial-vehicles.js";
import { 
  getApiKey, 
  saveApiKey, 
  getSelectedModel, 
  saveSelectedModel, 
  testApiKey, 
  generateVehicleData, 
  scanDocumentOrVin,
  DEFAULT_MODEL 
} from "./api.js";
import { getVehicleRazProcedure } from "./data/raz-procedures.js";
import {
  searchSupabaseVehicles,
  pushVehicleToSupabase,
  syncNewVehiclesFromSupabase,
  getSupabaseUrl,
  getSupabaseKey,
  saveSupabaseConfig,
  testSupabaseConnection
} from "./supabase.js";

/**
 * Nettoyage et échappement sécurisé des chaînes HTML
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Découpe un modèle de véhicule pour séparer le modèle principal des modèles partagés / plateformes
 * Ex: "Golf VII (aussi Audi A3 8V / Seat Leon 3 / Skoda Octavia 3)" -> { main: "Golf VII", shared: "Audi A3 8V / Seat Leon 3 / Skoda Octavia 3" }
 * Ex: "Alfa Romeo 159 / Brera / Giulietta QV, 4C, Delta III" -> { main: "Alfa Romeo 159 / Brera", shared: "Giulietta QV, 4C, Delta III" }
 */
export function parseVehicleModel(rawModel) {
  if (!rawModel || typeof rawModel !== "string") {
    return { main: rawModel || "", shared: "" };
  }

  const trimmed = rawModel.trim();

  // 1. Détection des parenthèses avec précision
  const parenMatch = trimmed.match(/^(.*?)\s*\((?:aussi\s+|partagé\s+(?:avec\s+)?|plateforme\s+)?(.*?)\)$/i);
  if (parenMatch) {
    const main = parenMatch[1].trim();
    let shared = parenMatch[2].trim();
    shared = shared.replace(/^(?:aussi|partagé avec|plateforme)\s+/i, "");
    return { main, shared };
  }

  // 2. Détection avec mot-clé "aussi" ou "partagé avec" hors parenthèses
  const wordMatch = trimmed.match(/^(.*?)\s+(?:aussi|partagé avec)\s+(.*)$/i);
  if (wordMatch) {
    return { main: wordMatch[1].trim(), shared: wordMatch[2].trim() };
  }

  // 3. Détection de longues listes de modèles séparées par des slashes (>= 3 modèles)
  const parts = trimmed.split(/\s*\/\s*/);
  if (parts.length >= 3) {
    const main = parts.slice(0, 2).join(" / ");
    const shared = parts.slice(2).join(" / ");
    return { main, shared };
  }

  return { main: trimmed, shared: "" };
}

class MecanIQApp {
  constructor() {
    this.vehicles = INITIAL_VEHICLES || [];
    this.currentVehicle = null;
    this.selectedFuseBoxIndex = 0;
    this.activeFilter = "all";
    this.activeView = "home";

    // Carnet de bord
    this.myVehicles = [];
    this.selectedMyVehicleId = null;

    this.init();
  }

  async init() {
    // 1. Initialiser le thème d'atelier immédiatement
    this.initTheme();

    // 2. Liaison synchrone et immédiate des écouteurs UI (garantit la réactivité permanente de tous les boutons et onglets)
    this.setupEventListeners();
    this.setupNetworkStatusListener();
    this.setupConverters();
    this.setupWorkshopFeatures();

    // 3. Enregistrement PWA Service Worker
    this.registerServiceWorker();

    // 4. Initialisation IndexedDB avec repli mémoire garanti
    try {
      await db.init();
      const loaded = await db.getAllVehicles();
      if (loaded && loaded.length > 0) {
        this.vehicles = loaded;
      }
    } catch (err) {
      console.warn("IndexedDB indisponible ou bloqué, conservation de la base intégrée :", err);
      this.vehicles = INITIAL_VEHICLES;
    }

    if (!this.vehicles || this.vehicles.length === 0) {
      this.vehicles = INITIAL_VEHICLES;
    }

    // 5. Chargement initial des vues
    try {
      await this.renderCatalog();
      await this.renderRecentHistory();
      await this.loadMyVehicles();
      await this.updateStorageStats();
    } catch (err) {
      console.error("Erreur chargement des vues :", err);
    }

    // 6. Gestion du routage
    this.handleRoute();
    window.addEventListener("hashchange", () => this.handleRoute());

    // 7. Synchronisation collaborative silencieuse avec Supabase Cloud
    if (navigator.onLine) {
      setTimeout(() => {
        syncNewVehiclesFromSupabase()
          .then(async (newCount) => {
            if (newCount > 0) {
              this.vehicles = await db.getAllVehicles();
              await this.renderCatalog();
              await this.updateStorageStats();
              this.showToast(`${newCount} nouvelle(s) fiche(s) synchronisée(s) depuis Supabase ! ☁️`, "info");
            }
          })
          .catch(() => {});
      }, 1500);
    }
  }

  // =========================================================================
  // SERVICE WORKER & HORS-LIGNE
  // =========================================================================

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("./sw.js")
          .then((reg) => {
            console.log("MecanIQ Service Worker actif, scope :", reg.scope);
          })
          .catch((err) => {
            console.warn("Échec d'enregistrement Service Worker :", err);
          });
      });
    }
  }

  setupNetworkStatusListener() {
    const updateStatus = () => {
      const badge = document.getElementById("networkBadge");
      const text = document.getElementById("networkText");
      if (navigator.onLine) {
        badge.classList.remove("offline");
        text.textContent = "En ligne";
      } else {
        badge.classList.add("offline");
        text.textContent = "Hors-ligne";
      }
    };
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    updateStatus();
  }

  // =========================================================================
  // GESTION DU THÈME VISUEL ATELIER
  // =========================================================================

  initTheme() {
    let savedTheme = "dark-amber";
    try {
      savedTheme = localStorage.getItem("mecaniq_theme") || "dark-amber";
    } catch (e) {}
    this.setTheme(savedTheme, false);
  }

  setTheme(themeName, showToastFeedback = true) {
    const validThemes = ["dark-amber", "oled", "midnight", "graphite", "light"];
    const theme = validThemes.includes(themeName) ? themeName : "dark-amber";

    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("mecaniq_theme", theme);
    } catch (e) {}

    const select = document.getElementById("settingThemeSelect");
    if (select && select.value !== theme) {
      select.value = theme;
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const themeColors = {
        "dark-amber": "#0a0e17",
        "oled": "#000000",
        "midnight": "#0b132b",
        "graphite": "#18181b",
        "light": "#f8fafc"
      };
      metaThemeColor.setAttribute("content", themeColors[theme] || "#0a0e17");
    }

    if (showToastFeedback) {
      const themeLabels = {
        "dark-amber": "🛠️ Atelier Sombre (Ambre & Carbone)",
        "oled": "🖤 Noir Pur OLED",
        "midnight": "🌌 Bleu Minuit (Cobalt Pro)",
        "graphite": "⚙️ Graphite & Titane (Gris Neutre)",
        "light": "☀️ Atelier Plein Soleil (Clair)"
      };
      this.showToast(`Thème activé : ${themeLabels[theme] || theme}`, "info");
    }
  }

  // =========================================================================
  // GESTION DU ROUTAGE & DES VUES
  // =========================================================================

  setupEventListeners() {
    // Navigation Desktop
    document.querySelectorAll(".sidebar .nav-item[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        this.navigateTo(view);
      });
    });

    // Navigation Mobile Bottom Bar
    document.querySelectorAll(".bottom-nav .bottom-nav-item[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        this.navigateTo(view);
      });
    });

    // Bouton Logo Home
    document.getElementById("btnLogoHome")?.addEventListener("click", () => {
      this.navigateTo("home");
    });

    // Bouton Retour depuis la fiche technique
    document.getElementById("btnBackToHome")?.addEventListener("click", () => {
      this.navigateTo("home");
    });

    // Bouton Paramètres
    document.querySelectorAll("[data-action='open-settings']").forEach((btn) => {
      btn.addEventListener("click", () => this.openSettingsModal());
    });
    document.getElementById("btnHeaderSettings")?.addEventListener("click", () => this.openSettingsModal());

    // Fermeture des modales
    document.querySelectorAll(".btn-close-modal").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetId = btn.getAttribute("data-target");
        document.getElementById(targetId)?.classList.remove("open");
      });
    });

    // Fermeture modale en cliquant sur l'overlay
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    });

    // Recherche universelle
    const searchInput = document.getElementById("globalSearchInput");
    const clearBtn = document.getElementById("btnSearchClear");
    const searchSubmit = document.getElementById("btnSearchSubmit");
    const searchLoupe = document.getElementById("btnSearchLoupe");

    searchInput?.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      clearBtn.style.display = val ? "inline-flex" : "none";
      this.handleSearchInput(val);
    });

    clearBtn?.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      this.handleSearchInput("");
      searchInput.focus();
    });

    searchSubmit?.addEventListener("click", () => {
      this.triggerSearchOrAI();
    });

    searchLoupe?.addEventListener("click", () => {
      this.triggerSearchOrAI();
    });

    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.triggerSearchOrAI();
      }
    });

    // Puces filtres rapides
    document.querySelectorAll(".filter-chip[data-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".filter-chip[data-filter]").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeFilter = chip.getAttribute("data-filter");
        this.renderCatalog();
      });
    });

    // Bouton de déclenchement IA
    document.getElementById("btnTriggerAiGeneration")?.addEventListener("click", () => {
      this.executeAiGeneration();
    });

    // Bouton Effacer l'historique
    document.getElementById("btnClearHistory")?.addEventListener("click", async () => {
      await db.clearHistory();
      await this.renderRecentHistory();
      this.showToast("Historique de consultation effacé");
    });

    // Fiche technique : Onglets
    document.querySelectorAll(".sheet-tab-btn").forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        document.querySelectorAll(".sheet-tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));

        tabBtn.classList.add("active");
        const tabId = tabBtn.getAttribute("data-tab");
        document.getElementById(tabId)?.classList.add("active");
      });
    });

    // Fiche technique : Toggle Favori
    document.getElementById("btnToggleFavoriteSpec")?.addEventListener("click", async () => {
      if (!this.currentVehicle) return;
      const isFav = await db.toggleFavorite(this.currentVehicle.id);
      this.updateSpecFavoriteButton(isFav);
      this.showToast(isFav ? "Ajouté aux favoris ⭐" : "Retiré des favoris");
      await this.renderCatalog();
    });

    // Fiche technique : Ajouter au carnet
    document.getElementById("btnAddSpecToLogbook")?.addEventListener("click", () => {
      if (!this.currentVehicle) return;
      this.openAddVehicleModal({
        brand: this.currentVehicle.brand,
        model: this.currentVehicle.model,
        engine: this.currentVehicle.engine
      });
    });

    // Fiche technique : Imprimer
    document.getElementById("btnPrintSpec")?.addEventListener("click", () => {
      window.print();
    });

    // Fiche technique : Filtre dynamique des fusibles
    document.getElementById("fuseFilterInput")?.addEventListener("input", (e) => {
      this.renderFusesTable(e.target.value.trim().toLowerCase());
    });

    // Modale Paramètres : Thème
    document.getElementById("settingThemeSelect")?.addEventListener("change", (e) => {
      this.setTheme(e.target.value, true);
    });

    // Modale Paramètres : Clé API & Modèle
    document.getElementById("btnToggleApiKeyVisibility")?.addEventListener("click", () => {
      const input = document.getElementById("settingApiKey");
      input.type = input.type === "password" ? "text" : "password";
    });

    document.getElementById("btnTestApiKey")?.addEventListener("click", async () => {
      await this.testGeminiKey();
    });

    document.getElementById("btnSaveSettings")?.addEventListener("click", async () => {
      await this.saveSettings();
    });

    // Modale Paramètres : Supabase Cloud
    document.getElementById("btnTestSupabase")?.addEventListener("click", async () => {
      await this.testSupabaseConnectionUI();
    });

    document.getElementById("btnSyncSupabaseNow")?.addEventListener("click", async () => {
      await this.manualSyncSupabase();
    });

    document.getElementById("btnClearCacheBtn")?.addEventListener("click", async () => {
      if (confirm("Voulez-vous supprimer les fiches techniques générées par l'IA du cache local ? (Les véhicules locaux seront conservés)")) {
        await db.clearAIGeneratedVehicles();
        this.vehicles = await db.getAllVehicles();
        await this.renderCatalog();
        await this.updateStorageStats();
        this.showToast("Cache des fiches IA vidé avec succès.");
      }
    });

    // Export / Import
    document.getElementById("btnExportDataBtn")?.addEventListener("click", async () => {
      await this.exportDataAsJson();
    });

    document.getElementById("btnImportDataBtn")?.addEventListener("click", () => {
      document.getElementById("importFileInput")?.click();
    });

    document.getElementById("importFileInput")?.addEventListener("change", async (e) => {
      await this.handleImportFile(e);
    });

    // Carnet de bord : Boutons et formulaires
    document.getElementById("btnOpenAddVehicleModal")?.addEventListener("click", () => {
      this.openAddVehicleModal();
    });

    document.getElementById("formAddVehicle")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleSaveMyVehicle();
    });

    document.getElementById("btnOpenAddLogModal")?.addEventListener("click", () => {
      this.openAddLogModal();
    });

    document.getElementById("formAddLog")?.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleSaveMaintenanceLog();
    });

    document.getElementById("btnDeleteMyVehicle")?.addEventListener("click", async () => {
      if (!this.selectedMyVehicleId) return;
      if (confirm("Êtes-vous sûr de vouloir supprimer ce véhicule et tout son historique d'entretien ?")) {
        await db.deleteMyVehicle(this.selectedMyVehicleId);
        this.showToast("Véhicule supprimé de votre carnet.");
        await this.loadMyVehicles();
      }
    });
  }

  navigateTo(viewName, updateHash = true) {
    this.activeView = viewName;

    // Masquage de toutes les sections
    document.querySelectorAll(".view-section, .spec-sheet-view").forEach((sec) => {
      sec.classList.add("hidden");
      sec.style.display = "none";
    });

    // Mise à jour des classes actives sur les menus
    document.querySelectorAll(".nav-item, .bottom-nav-item").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("data-view") === viewName);
    });

    // Affichage de la vue ciblée
    if (viewName === "home") {
      const el = document.getElementById("viewHome");
      if (el) {
        el.classList.remove("hidden");
        el.style.display = "block";
      }
      if (updateHash && window.location.hash !== "#search" && window.location.hash !== "") {
        window.location.hash = "search";
      }
    } else if (viewName === "favorites") {
      const el = document.getElementById("viewFavorites");
      if (el) {
        el.classList.remove("hidden");
        el.style.display = "block";
      }
      this.renderFavorites();
      if (updateHash && window.location.hash !== "#favorites") {
        window.location.hash = "favorites";
      }
    } else if (viewName === "logbook") {
      const el = document.getElementById("viewLogbook");
      if (el) {
        el.classList.remove("hidden");
        el.style.display = "block";
      }
      this.loadMyVehicles();
      if (updateHash && window.location.hash !== "#logbook") {
        window.location.hash = "logbook";
      }
    } else if (viewName === "tools") {
      const el = document.getElementById("viewTools");
      if (el) {
        el.classList.remove("hidden");
        el.style.display = "block";
      }
      if (updateHash && window.location.hash !== "#tools") {
        window.location.hash = "tools";
      }
    } else if (viewName === "specSheet") {
      const el = document.getElementById("viewSpecSheet");
      if (el) {
        el.classList.remove("hidden");
        el.style.display = "block";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  handleRoute() {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("vehicle/")) {
      const vehicleId = hash.replace("vehicle/", "");
      this.openSpecSheet(vehicleId, false);
    } else if (hash === "favorites") {
      this.navigateTo("favorites", false);
    } else if (hash === "logbook") {
      this.navigateTo("logbook", false);
    } else if (hash === "tools") {
      this.navigateTo("tools", false);
    } else {
      this.navigateTo("home", false);
    }
  }

  // =========================================================================
  // RECHERCHE & CATALOGUE VÉHICULES
  // =========================================================================

  async renderCatalog() {
    const grid = document.getElementById("vehiclesGrid");
    const countBadge = document.getElementById("vehicleCountBadge");
    if (!grid) return;

    try {
      const loaded = await db.getAllVehicles();
      if (loaded && loaded.length > 0) {
        this.vehicles = loaded;
      }
    } catch (err) {
      console.warn("Utilisation du catalogue de secours :", err);
    }
    if (!this.vehicles || this.vehicles.length === 0) {
      this.vehicles = INITIAL_VEHICLES || [];
    }

    let favIds = [];
    try {
      favIds = await db.getFavorites();
    } catch (err) {
      favIds = [];
    }

    const searchInput = document.getElementById("globalSearchInput");
    const query = (searchInput?.value || "").toLowerCase().trim();

    // Filtrage
    const filtered = this.vehicles.filter((v) => {
      const brand = v.make || v.brand || "";
      const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
      const engineCode = typeof v.engine === "object" ? v.engine.code || "" : (v.engine_code || "");
      const fuel = typeof v.engine === "object" ? v.engine.fuel || "" : (v.fuel || "");
      const modelsExtra = Array.isArray(v.models) ? v.models.join(" ") : "";
      const makesExtra = Array.isArray(v.makes_compatible) ? v.makes_compatible.join(" ") : "";
      const groupExtra = v.group || "";

      const matchesFilter =
        this.activeFilter === "all" ||
        (this.activeFilter === "Diesel" && fuel.toLowerCase().includes("diesel")) ||
        (this.activeFilter === "Essence" && fuel.toLowerCase().includes("essence")) ||
        (this.activeFilter === "local" && v.source === "local_base") ||
        (this.activeFilter === "ai" && v.source === "ai_generated");

      if (!matchesFilter) return false;

      if (!query) return true;

      const haystack = `${brand} ${v.model} ${modelsExtra} ${makesExtra} ${groupExtra} ${engineName} ${engineCode}`.toLowerCase();
      return haystack.includes(query);
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} disponible${filtered.length > 1 ? "s" : ""}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; color: var(--text-dim);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p style="font-size: 1rem; font-weight: 600; color: var(--text-main);">Aucun véhicule ne correspond à ces critères</p>
          <p style="font-size: 0.85rem; margin-top: 0.25rem;">Utilisez la recherche ci-dessus pour générer sa fiche instantanément via Gemini Flash.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((v) => {
        const isFav = favIds.includes(v.id);
        const isAI = v.source === "ai_generated";
        const isCloud = v.source === "supabase_cloud";
        const brand = v.make || v.brand || "Atelier";
        const { main: modelMain, shared: modelShared } = parseVehicleModel(v.model);
        const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
        const fuel = typeof v.engine === "object" ? v.engine.fuel || "" : (v.fuel || "");
        const viscosity = v.fluids?.engine_oil?.viscosity || "N/A";
        const timingText = v.timing?.type ? (v.timing.type.includes("Chaîne") ? "Chaîne" : "Courroie") : (v.engine?.code || fuel);

        return `
          <div class="vehicle-card" data-id="${v.id}">
            <div>
              <div class="card-top">
                <div class="card-brand">${escapeHtml(brand)}</div>
                <button class="favorite-btn ${isFav ? "active" : ""}" data-fav-id="${v.id}" title="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>

              <div class="card-title-wrap">
                <div class="card-title" title="${escapeHtml(v.model)}">${escapeHtml(modelMain)}</div>
                ${modelShared ? `
                  <div class="card-shared-badge" title="Modèles partagés : ${escapeHtml(modelShared)}">
                    <span class="shared-tag-icon">partagé :</span>
                    <span class="shared-tag-text">${escapeHtml(modelShared)}</span>
                  </div>
                ` : ""}
              </div>
              <div class="card-engine">${escapeHtml(engineName)}</div>

              <div class="card-specs-row">
                <span class="spec-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                  ${escapeHtml(viscosity)}
                </span>
                <span class="spec-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${escapeHtml(timingText)}
                </span>
                <span class="spec-badge">
                  ${v.power_hp ? v.power_hp + " ch" : escapeHtml(fuel)}
                </span>
              </div>
            </div>

            <div class="card-bottom">
              <span class="source-badge ${isAI ? "ai" : isCloud ? "cloud" : ""}">
                ${isAI ? "Généré IA MecanIQ" : isCloud ? "Cloud Supabase" : "Base Locale"}
              </span>
              <span style="color: var(--accent-amber); font-weight: 600; display: inline-flex; align-items: center; gap: 0.2rem;">
                Voir fiche &rarr;
              </span>
            </div>
          </div>
        `;
      })
      .join("");

    // Clic sur une carte pour ouvrir la fiche
    grid.querySelectorAll(".vehicle-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".favorite-btn")) return;
        const id = card.getAttribute("data-id");
        this.openSpecSheet(id);
      });
    });

    // Clic sur favori rapide
    grid.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-fav-id");
        const isFav = await db.toggleFavorite(id);
        this.showToast(isFav ? "Ajouté aux favoris ⭐" : "Retiré des favoris");
        await this.renderCatalog();
      });
    });
  }

  handleSearchInput(query) {
    const suggestionsBox = document.getElementById("searchSuggestions");
    const aiCard = document.getElementById("aiGeneratorCard");
    const aiQuerySpan = document.getElementById("aiTargetQuery");

    if (!query) {
      if (suggestionsBox) suggestionsBox.style.display = "none";
      if (aiCard) aiCard.style.display = "none";
      this.renderCatalog();
      return;
    }

    const matches = this.vehicles.filter((v) => {
      const brand = v.make || v.brand || "";
      const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
      const engineCode = typeof v.engine === "object" ? v.engine.code || "" : (v.engine_code || "");
      const modelsExtra = Array.isArray(v.models) ? v.models.join(" ") : "";
      const makesExtra = Array.isArray(v.makes_compatible) ? v.makes_compatible.join(" ") : "";
      const groupExtra = v.group || "";
      const str = `${brand} ${v.model} ${modelsExtra} ${makesExtra} ${groupExtra} ${engineName} ${engineCode}`.toLowerCase();
      return str.includes(query.toLowerCase());
    });

    // Affichage des suggestions
    if (suggestionsBox) {
      if (matches.length > 0) {
        suggestionsBox.style.display = "block";
        suggestionsBox.innerHTML = matches
          .slice(0, 5)
          .map((v) => {
            const brand = v.make || v.brand || "Atelier";
            const { main: modelMain, shared: modelShared } = parseVehicleModel(v.model);
            const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
            const viscosity = v.fluids?.engine_oil?.viscosity || "";
            return `
              <div class="suggestion-item" data-id="${v.id}">
                <div class="suggestion-info">
                  <span class="suggestion-name">${escapeHtml(brand)} ${escapeHtml(modelMain)}</span>
                  <span class="suggestion-sub">${escapeHtml(engineName)}${viscosity ? ` • ${escapeHtml(viscosity)}` : ""}${modelShared ? ` • aussi : ${escapeHtml(modelShared)}` : ""}</span>
                </div>
                <span class="source-badge ${v.source === "ai_generated" ? "ai" : ""}" style="font-size: 0.65rem;">
                  ${v.source === "ai_generated" ? "IA" : "Local"}
                </span>
              </div>
            `;
          })
          .join("");

        suggestionsBox.querySelectorAll(".suggestion-item").forEach((item) => {
          item.addEventListener("click", () => {
            const id = item.getAttribute("data-id");
            suggestionsBox.style.display = "none";
            this.openSpecSheet(id);
          });
        });
      } else {
        suggestionsBox.style.display = "none";
      }
    }

    // Si aucun résultat local, proposer la génération IA
    if (matches.length === 0 && query.length >= 2) {
      if (aiCard && aiQuerySpan) {
        aiQuerySpan.textContent = `"${query}"`;
        aiCard.style.display = "block";
      }
    } else {
      if (aiCard) aiCard.style.display = "none";
    }

    this.renderCatalog();
  }

  findLocalVehicleMatch(query) {
    if (!query) return null;
    const q = query.toLowerCase().trim();
    return this.vehicles.find((v) => {
      const brand = v.make || v.brand || "";
      const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
      const engineCode = typeof v.engine === "object" ? v.engine.code || "" : (v.engine_code || "");
      const modelsExtra = Array.isArray(v.models) ? v.models.join(" ") : "";
      const makesExtra = Array.isArray(v.makes_compatible) ? v.makes_compatible.join(" ") : "";
      const groupExtra = v.group || "";
      const full = `${brand} ${v.model} ${modelsExtra} ${makesExtra} ${groupExtra} ${engineName} ${engineCode}`.toLowerCase();
      return full.includes(q);
    });
  }

  async triggerSearchOrAI() {
    const input = document.getElementById("globalSearchInput");
    const query = (input?.value || "").trim();
    if (!query) return;

    // Fermer les suggestions
    const suggestionsBox = document.getElementById("searchSuggestions");
    if (suggestionsBox) suggestionsBox.style.display = "none";

    // 1. ÉTAPE 1 : Cache local hors-ligne (Cache-First)
    const localMatch = this.findLocalVehicleMatch(query);
    if (localMatch) {
      this.openSpecSheet(localMatch.id);
      return;
    }

    // 2. ÉTAPE 2 : Interrogation de la base Cloud partagée Supabase
    if (navigator.onLine) {
      this.showToast("Recherche sur la base Cloud Supabase... ☁️", "info");
      try {
        const cloudResults = await searchSupabaseVehicles(query);
        if (cloudResults && cloudResults.length > 0) {
          const cloudVehicle = cloudResults[0];

          // Stocker immédiatement dans le cache local (IndexedDB) pour consultation hors-ligne
          await db.saveVehicle(cloudVehicle);
          this.vehicles = await db.getAllVehicles();
          await this.renderCatalog();
          await this.updateStorageStats();

          this.showToast(`Fiche "${cloudVehicle.make || cloudVehicle.brand} ${cloudVehicle.model}" trouvée sur Supabase et mise en cache ! ☁️⚡`, "success");
          this.openSpecSheet(cloudVehicle.id);
          return;
        }
      } catch (err) {
        console.warn("Recherche Supabase en échec ou hors-ligne :", err);
      }
    }

    // 3. ÉTAPE 3 : Absente du local et de Supabase -> Déclenchement / Proposition Génération IA Gemini Flash
    const aiCard = document.getElementById("aiGeneratorCard");
    const aiQuerySpan = document.getElementById("aiTargetQuery");
    if (aiCard && aiQuerySpan) {
      aiQuerySpan.textContent = `"${query}"`;
      aiCard.style.display = "block";
      aiCard.scrollIntoView({ behavior: "smooth" });
    }
  }

  // =========================================================================
  // GÉNÉRATION DYNAMIQUE PAR IA GEMINI FLASH & ENRICHISSEMENT SUPABASE
  // =========================================================================

  async executeAiGeneration() {
    const input = document.getElementById("globalSearchInput");
    const query = (input?.value || "").trim();
    if (!query) {
      this.showToast("Veuillez saisir un modèle ou motorisation.", "warning");
      return;
    }

    const apiKey = await getApiKey();
    if (!apiKey) {
      this.showToast("Clé API Gemini requise pour générer ce véhicule.", "warning");
      this.openSettingsModal();
      return;
    }

    const aiCard = document.getElementById("aiGeneratorCard");
    const loadingBox = document.getElementById("aiLoadingBox");

    if (aiCard) aiCard.style.display = "none";
    if (loadingBox) loadingBox.style.display = "flex";

    try {
      const generatedVehicle = await generateVehicleData(query);

      // 1. Enregistrement simultané dans le cache local du client
      await db.saveVehicle(generatedVehicle);
      this.vehicles = await db.getAllVehicles();
      await this.updateStorageStats();

      // 2. Enrichissement collaboratif : insertion simultanée dans Supabase table `vehicles`
      if (navigator.onLine) {
        pushVehicleToSupabase(generatedVehicle)
          .then((synced) => {
            if (synced) {
              this.showToast("Fiche partagée avec la communauté sur Supabase ! ☁️🤝", "success");
            }
          })
          .catch((pushErr) => {
            console.warn("Report de synchronisation Supabase :", pushErr);
          });
      }

      this.showToast("Fiche technique générée et sauvegardée hors-ligne ! 🚀", "success");
      if (loadingBox) loadingBox.style.display = "none";

      // Ouvrir immédiatement la fiche
      this.openSpecSheet(generatedVehicle.id);
    } catch (err) {
      if (loadingBox) loadingBox.style.display = "none";
      if (aiCard) aiCard.style.display = "block";
      console.error("Erreur génération IA :", err);
      this.showToast(err.message || "Échec de génération IA.", "error");
    }
  }

  // =========================================================================
  // HISTORIQUE RÉCENT & FAVORIS
  // =========================================================================

  async renderRecentHistory() {
    const container = document.getElementById("recentHistorySection");
    const grid = document.getElementById("recentHistoryGrid");
    if (!container || !grid) return;

    const history = await db.getRecentHistory(4);
    if (history.length === 0) {
      container.style.display = "none";
      return;
    }

    container.style.display = "block";
    const historyVehicles = history
      .map((h) => this.vehicles.find((v) => v.id === h.vehicleId))
      .filter(Boolean);

    grid.innerHTML = historyVehicles
      .map((v) => {
        const brand = v.make || v.brand || "Atelier";
        const { main: modelMain, shared: modelShared } = parseVehicleModel(v.model);
        const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
        const viscosity = v.fluids?.engine_oil?.viscosity || "";
        return `
          <div class="vehicle-card" data-id="${v.id}">
            <div>
              <div class="card-brand">${escapeHtml(brand)}</div>
              <div class="card-title-wrap">
                <div class="card-title" title="${escapeHtml(v.model)}">${escapeHtml(modelMain)}</div>
                ${modelShared ? `
                  <div class="card-shared-badge" title="Modèles partagés : ${escapeHtml(modelShared)}">
                    <span class="shared-tag-icon">partagé :</span>
                    <span class="shared-tag-text">${escapeHtml(modelShared)}</span>
                  </div>
                ` : ""}
              </div>
              <div class="card-engine">${escapeHtml(engineName)}</div>
            </div>
            <div class="card-bottom">
              <span class="spec-badge">${escapeHtml(viscosity)}</span>
              <span style="color: var(--accent-amber); font-weight: 600;">Ouvrir &rarr;</span>
            </div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll(".vehicle-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        this.openSpecSheet(id);
      });
    });
  }

  async renderFavorites() {
    const grid = document.getElementById("favoritesGrid");
    if (!grid) return;

    const favIds = await db.getFavorites();
    const favVehicles = this.vehicles.filter((v) => favIds.includes(v.id));

    if (favVehicles.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-lg);">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; color: var(--text-dim);">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">Aucun véhicule en favoris</p>
          <p style="font-size: 0.85rem; margin-top: 0.25rem;">Cliquez sur l'étoile d'une fiche technique pour y accéder rapidement ici.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = favVehicles
      .map((v) => {
        const brand = v.make || v.brand || "Atelier";
        const { main: modelMain, shared: modelShared } = parseVehicleModel(v.model);
        const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
        const fuel = typeof v.engine === "object" ? v.engine.fuel || "" : (v.fuel || "");
        const viscosity = v.fluids?.engine_oil?.viscosity || "N/A";
        return `
          <div class="vehicle-card" data-id="${v.id}">
            <div>
              <div class="card-top">
                <div class="card-brand">${escapeHtml(brand)}</div>
                <button class="favorite-btn active" data-fav-id="${v.id}" title="Retirer des favoris">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>
              <div class="card-title-wrap">
                <div class="card-title" title="${escapeHtml(v.model)}">${escapeHtml(modelMain)}</div>
                ${modelShared ? `
                  <div class="card-shared-badge" title="Modèles partagés : ${escapeHtml(modelShared)}">
                    <span class="shared-tag-icon">partagé :</span>
                    <span class="shared-tag-text">${escapeHtml(modelShared)}</span>
                  </div>
                ` : ""}
              </div>
              <div class="card-engine">${escapeHtml(engineName)}</div>
              <div class="card-specs-row">
                <span class="spec-badge">${escapeHtml(viscosity)}</span>
                <span class="spec-badge">${v.power_hp ? v.power_hp + " ch" : escapeHtml(fuel)}</span>
              </div>
            </div>
            <div class="card-bottom">
              <span class="source-badge ${v.source === "ai_generated" ? "ai" : ""}">
                ${v.source === "ai_generated" ? "Généré IA" : "Base Locale"}
              </span>
              <span style="color: var(--accent-amber); font-weight: 600;">Consulter &rarr;</span>
            </div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll(".vehicle-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".favorite-btn")) return;
        const id = card.getAttribute("data-id");
        this.openSpecSheet(id);
      });
    });

    grid.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-fav-id");
        await db.toggleFavorite(id);
        this.showToast("Retiré des favoris");
        await this.renderFavorites();
      });
    });
  }

  // =========================================================================
  // AFFICHAGE DE LA FICHE TECHNIQUE UNIVERSELLE
  // =========================================================================

  async openSpecSheet(vehicleId, updateHash = true) {
    let vehicle = this.vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) {
      vehicle = await db.getVehicleById(vehicleId);
    }
    if (!vehicle) {
      this.showToast("Véhicule introuvable dans la base locale.", "error");
      this.navigateTo("home");
      return;
    }

    // Normalisation à la volée des formats de données
    const brand = vehicle.make || vehicle.brand || "Atelier";
    const engineName = typeof vehicle.engine === "object" ? vehicle.engine.name || "" : (vehicle.engine || "");
    const engineCode = typeof vehicle.engine === "object" ? vehicle.engine.code || "" : (vehicle.engine_code || "");
    const fuel = typeof vehicle.engine === "object" ? vehicle.engine.fuel || "" : (vehicle.fuel || "Essence / Diesel");
    const displacement = typeof vehicle.engine === "object" ? vehicle.engine.displacement || "" : (vehicle.displacement_cc ? `${vehicle.displacement_cc} cm³` : "N/A");

    // Normalisation des fusibles (si tableau plat "fuses" au lieu de "fuse_boxes")
    if ((!vehicle.fuse_boxes || vehicle.fuse_boxes.length === 0) && Array.isArray(vehicle.fuses)) {
      const locationMap = new Map();
      for (const f of vehicle.fuses) {
        const loc = f.location || "Boîtier principal";
        if (!locationMap.has(loc)) {
          locationMap.set(loc, []);
        }
        locationMap.get(loc).push({
          id: f.number || f.id || "F",
          rating_a: parseFloat(f.rating) || f.rating || 15,
          color: f.color || "Standard",
          function: f.function || "Protection équipement",
          category: f.category || (loc.toLowerCase().includes("moteur") ? "Moteur" : "Habitacle")
        });
      }
      vehicle.fuse_boxes = Array.from(locationMap.entries()).map(([locName, fuseList]) => ({
        name: locName.split("(")[0].trim() || locName,
        location: locName,
        access: "Se référer au panneau d'accès",
        fuses: fuseList
      }));
    }

    // Normalisation de la fiabilité (si "chronic_faults" et "buying_advice" au format string)
    if (vehicle.reliability) {
      if (Array.isArray(vehicle.reliability.chronic_faults) && (!vehicle.reliability.critical_issues || vehicle.reliability.critical_issues.length === 0)) {
        vehicle.reliability.critical_issues = vehicle.reliability.chronic_faults.map((fault, idx) => ({
          component: `Point de vigilance ${idx + 1}`,
          severity: idx === 0 ? "high" : "medium",
          symptoms: fault,
          cause: "Sensibilité mécanique documentée en atelier",
          remedy: "Contrôle préventif lors de la révision"
        }));
      }
      if (vehicle.reliability.buying_advice && (!vehicle.reliability.buyer_checklist || vehicle.reliability.buyer_checklist.length === 0)) {
        vehicle.reliability.buyer_checklist = [vehicle.reliability.buying_advice];
      }
    }

    this.currentVehicle = vehicle;
    this.selectedFuseBoxIndex = 0;

    // Enregistrement dans l'historique
    await db.addToHistory(vehicle.id);
    await this.renderRecentHistory();

    // Remplissage des données d'en-tête
    document.getElementById("specBrandBadge").textContent = brand.toUpperCase();
    document.getElementById("specTitle").textContent = `${vehicle.model} ${vehicle.generation ? `(${vehicle.generation})` : ""}`;
    document.getElementById("specEngineSubtitle").textContent = `${engineName} ${engineCode ? `• [${engineCode}]` : ""}`;

    // Statut favori
    const isFav = await db.isFavorite(vehicle.id);
    this.updateSpecFavoriteButton(isFav);

    // 1. ONGLET FLUIDES
    const oil = vehicle.fluids?.engine_oil || {};
    document.getElementById("specOilViscosity").textContent = oil.viscosity || "N/A";
    document.getElementById("specOilStandard").textContent = oil.norm || oil.standard || "Spécification standard";
    document.getElementById("specOilCapWith").textContent = oil.capacity_with_filter || (oil.capacity_with_filter_l ? `${oil.capacity_with_filter_l} L` : "N/A");
    document.getElementById("specOilCapWithout").textContent = oil.capacity_without_filter || (oil.capacity_without_filter_l ? `${oil.capacity_without_filter_l} L` : "N/A");
    document.getElementById("specOilInterval").textContent = oil.interval_km ? `${oil.interval_km.toLocaleString()} km / ${oil.interval_months || 12} mois` : "Selon préconisation carnet";

    const drain = oil.drain_plug || {};
    const drainTorqueText = oil.drain_plug_torque || (drain.torque_nm ? `${drain.torque_nm} Nm` : "N/A");
    document.getElementById("specDrainTorque").textContent = drainTorqueText;
    document.getElementById("specDrainThread").textContent = drain.thread || (oil.drain_plug_torque ? "Spécifié constructeur" : "Standard");
    document.getElementById("specDrainWasher").textContent = drain.washer || "Joint cuivre / écrasement";

    // Mise à jour du bouton Déport Dynamométrique
    const drainNum = parseFloat(drainTorqueText) || drain.torque_nm || 25;
    const btnDrainOffset = document.querySelector("#tabFluids .btn-open-torque-offset");
    if (btnDrainOffset) {
      btnDrainOffset.setAttribute("data-torque", drainNum);
    }

    // Détection d'un serrage angulaire dans la fiche
    const angularBadge = document.getElementById("btnDrainAngularBadge");
    if (angularBadge) {
      const matchAngle = drainTorqueText.match(/(\d+)\s*°/);
      if (matchAngle) {
        angularBadge.style.display = "inline-flex";
        angularBadge.setAttribute("data-angle", matchAngle[1]);
        angularBadge.textContent = `📐 +${matchAngle[1]}°`;
      } else {
        angularBadge.style.display = "none";
      }
    }

    const coolant = vehicle.fluids?.coolant || {};
    document.getElementById("specCoolantType").textContent = coolant.type || "Liquide universel";
    document.getElementById("specCoolantCapacity").textContent = coolant.capacity || (coolant.capacity_l ? `${coolant.capacity_l} L` : "N/A");
    document.getElementById("specCoolantInterval").textContent = coolant.interval || "Tous les 4 à 5 ans";

    const brake = vehicle.fluids?.brake_fluid || {};
    document.getElementById("specBrakeFluidType").textContent = brake.type || "DOT 4";
    document.getElementById("specBrakeFluidInterval").textContent = brake.interval || "Tous les 2 ans";

    const gearbox = vehicle.fluids?.gearbox_oil || {};
    document.getElementById("specGearboxType").textContent = gearbox.type || "Standard constructeur";
    document.getElementById("specGearboxCapacity").textContent = gearbox.capacity || (gearbox.capacity_l ? `${gearbox.capacity_l} L` : "Contrôle niveau");

    // 2. ONGLET BOÎTES À FUSIBLES
    this.renderFuseBoxTabs();
    this.renderFusesTable("");

    // 3. ONGLET RADIOSCOPIE & FIABILITÉ
    const rel = vehicle.reliability || {};
    document.getElementById("reliabilitySummaryBox").textContent = rel.summary || rel.buying_advice || "Synthèse mécanique certifiée d'atelier.";

    const issuesContainer = document.getElementById("criticalIssuesList");
    if (issuesContainer) {
      const issues = rel.critical_issues || [];
      if (issues.length === 0) {
        issuesContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Aucune anomalie chronique majeure répertoriée.</p>`;
      } else {
        issuesContainer.innerHTML = issues
          .map((iss) => {
            const sev = (iss.severity || "medium").toLowerCase();
            return `
              <div class="issue-card severity-${sev}">
                <div class="issue-header">
                  <span class="issue-title">${iss.component || "Composant critique"}</span>
                  <span class="severity-pill ${sev}">${sev === "high" ? "Critique" : sev === "medium" ? "Moyen" : "Faible"}</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 0.4rem;">
                  <strong>Symptômes :</strong> ${iss.symptoms || "N/A"}
                </p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                  <strong>Origine :</strong> ${iss.cause || "Usure prématurée ou défaut de conception"}
                </p>
                <p style="font-size: 0.85rem; color: var(--accent-emerald);">
                  <strong>Solution atelier :</strong> ${iss.remedy || "Contrôle et remplacement préventif"}
                </p>
              </div>
            `;
          })
          .join("");
      }
    }

    // Checklist d'achat
    const buyerContainer = document.getElementById("buyerChecklistContainer");
    if (buyerContainer) {
      const list = rel.buyer_checklist || [];
      buyerContainer.innerHTML = list
        .map((item) => `
          <div class="checklist-item">
            <span class="checklist-icon">✓</span>
            <span>${item}</span>
          </div>
        `)
        .join("");
    }

    // Recommandations
    const serviceContainer = document.getElementById("serviceRecommendationsContainer");
    if (serviceContainer) {
      const list = rel.service_recommendations || (rel.buying_advice ? [rel.buying_advice] : []);
      serviceContainer.innerHTML = list
        .map((item) => `
          <div class="checklist-item">
            <span class="checklist-icon" style="color: var(--accent-cyan);">✦</span>
            <span>${item}</span>
          </div>
        `)
        .join("");
    }

    // 4. ONGLET DISTRIBUTION & MOTEUR
    const timing = vehicle.timing || {};
    document.getElementById("specTimingType").textContent = timing.type || "Courroie ou chaîne selon motorisation";
    document.getElementById("specTimingKm").textContent = timing.interval_km ? `${timing.interval_km.toLocaleString()} km` : "Selon préconisation constructeur";
    document.getElementById("specTimingYears").textContent = timing.interval_years ? `${timing.interval_years} ans` : "N/A";
    document.getElementById("specTimingNotes").textContent = timing.notes || "Contrôle visuel recommandé à chaque révision annuelle.";

    document.getElementById("specEngineCode").textContent = engineCode || "Code standard";
    document.getElementById("specDisplacement").textContent = displacement;
    document.getElementById("specPower").textContent = vehicle.power_hp ? `${vehicle.power_hp} ch (${vehicle.power_kw || Math.round(vehicle.power_hp * 0.735)} kW)` : engineName;
    document.getElementById("specTorque").textContent = vehicle.torque_nm ? `${vehicle.torque_nm} Nm` : "N/A";
    document.getElementById("specFuel").textContent = fuel;

    // 5. RENDU DE LA PROCÉDURE DE REMISE À ZÉRO (RAZ) VIDANGE
    this.renderRazSection(vehicle);

    // Afficher la vue
    this.navigateTo("specSheet");
    if (updateHash && window.location.hash !== `#vehicle/${vehicle.id}`) {
      window.location.hash = `vehicle/${vehicle.id}`;
    }
  }

  updateSpecFavoriteButton(isFav) {
    const icon = document.getElementById("specFavIcon");
    const text = document.getElementById("specFavText");
    if (icon && text) {
      if (isFav) {
        icon.setAttribute("fill", "#EAB308");
        icon.setAttribute("stroke", "#EAB308");
        text.textContent = "Favori ⭐";
      } else {
        icon.setAttribute("fill", "none");
        icon.setAttribute("stroke", "currentColor");
        text.textContent = "Favori";
      }
    }
  }

  renderFuseBoxTabs() {
    const container = document.getElementById("fuseBoxSelector");
    if (!container || !this.currentVehicle) return;

    const boxes = this.currentVehicle.fuse_boxes || [];
    if (boxes.length === 0) {
      container.innerHTML = `<span style="font-size: 0.85rem; color: var(--text-muted);">Schéma de fusibles non documenté.</span>`;
      return;
    }

    container.innerHTML = boxes
      .map((box, idx) => `
        <button class="fuse-box-tab ${idx === this.selectedFuseBoxIndex ? "active" : ""}" data-index="${idx}">
          ${box.name || `Boîte ${idx + 1}`}
        </button>
      `)
      .join("");

    container.querySelectorAll(".fuse-box-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".fuse-box-tab").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedFuseBoxIndex = parseInt(btn.getAttribute("data-index"), 10);
        this.renderFusesTable(document.getElementById("fuseFilterInput")?.value.trim().toLowerCase() || "");
      });
    });

    const activeBox = boxes[this.selectedFuseBoxIndex] || boxes[0];
    document.getElementById("fuseBoxLocationText").textContent = activeBox.location || "Emplacement standard";
    document.getElementById("fuseBoxAccessText").textContent = activeBox.access || "Se référer au manuel de bord";
  }

  renderFusesTable(filterQuery = "") {
    const tbody = document.getElementById("fuseTableBody");
    if (!tbody || !this.currentVehicle) return;

    const boxes = this.currentVehicle.fuse_boxes || [];
    const activeBox = boxes[this.selectedFuseBoxIndex] || boxes[0];

    if (!activeBox || !activeBox.fuses || activeBox.fuses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Aucun fusible renseigné pour ce compartiment.</td></tr>`;
      return;
    }

    const fuses = activeBox.fuses.filter((f) => {
      if (!filterQuery) return true;
      const str = `${f.id} ${f.rating_a} ${f.function} ${f.category || ""}`.toLowerCase();
      return str.includes(filterQuery);
    });

    if (fuses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Aucun fusible ne correspond à "${filterQuery}".</td></tr>`;
      return;
    }

    tbody.innerHTML = fuses
      .map((f) => {
        const rating = f.rating_a;
        const colorClass = this.getFuseColorClass(rating);
        return `
          <tr>
            <td class="font-mono text-amber" style="font-weight: 700;">${f.id}</td>
            <td>
              <span class="fuse-pill ${colorClass}">
                ${rating}A
              </span>
            </td>
            <td>
              <span style="font-size: 0.75rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                ${f.category || "Général"}
              </span>
            </td>
            <td style="color: var(--text-main); font-weight: 500;">
              ${f.function}
            </td>
          </tr>
        `;
      })
      .join("");
  }

  getFuseColorClass(rating) {
    const r = parseFloat(rating);
    if (r === 3) return "fuse-3a";
    if (r === 5) return "fuse-5a";
    if (r === 7.5) return "fuse-7-5a";
    if (r === 10) return "fuse-10a";
    if (r === 15) return "fuse-15a";
    if (r === 20) return "fuse-20a";
    if (r === 25) return "fuse-25a";
    if (r === 30) return "fuse-30a";
    if (r === 40) return "fuse-40a";
    if (r === 50) return "fuse-50a";
    if (r === 60) return "fuse-60a";
    if (r === 70) return "fuse-70a";
    return "fuse-default";
  }

  // =========================================================================
  // CARNET DE BORD : GESTION DES VÉHICULES ET ENTRETIENS
  // =========================================================================

  async loadMyVehicles() {
    this.myVehicles = await db.getMyVehicles();
    const tabsContainer = document.getElementById("myVehiclesTabs");
    const summaryCard = document.getElementById("selectedVehicleSummary");

    if (this.myVehicles.length === 0) {
      if (tabsContainer) {
        tabsContainer.innerHTML = `
          <div style="font-size: 0.9rem; color: var(--text-muted); padding: 0.5rem 0;">
            Aucun véhicule enregistré dans votre garage. Ajoutez-en un pour suivre son kilométrage et ses révisions.
          </div>
        `;
      }
      if (summaryCard) summaryCard.style.display = "none";
      document.getElementById("maintenanceLogsContainer").innerHTML = "";
      return;
    }

    if (!this.selectedMyVehicleId || !this.myVehicles.find((v) => v.id === this.selectedMyVehicleId)) {
      this.selectedMyVehicleId = this.myVehicles[0].id;
    }

    // Affichage des onglets
    if (tabsContainer) {
      tabsContainer.innerHTML = this.myVehicles
        .map((v) => `
          <button class="filter-chip ${v.id === this.selectedMyVehicleId ? "active" : ""}" data-my-veh-id="${v.id}">
            <span class="font-mono">${v.plate}</span> • ${v.brand} ${v.model}
          </button>
        `)
        .join("");

      tabsContainer.querySelectorAll("[data-my-veh-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.selectedMyVehicleId = btn.getAttribute("data-my-veh-id");
          this.loadMyVehicles();
        });
      });
    }

    const cur = this.myVehicles.find((v) => v.id === this.selectedMyVehicleId);
    if (cur && summaryCard) {
      summaryCard.style.display = "block";
      document.getElementById("selectedVehiclePlate").querySelector("span:last-child").textContent = cur.plate;
      document.getElementById("selectedVehicleTitle").textContent = `${cur.brand} ${cur.model}`;
      document.getElementById("selectedVehicleSubtitle").textContent = `${cur.year ? cur.year + " • " : ""}${cur.engine ? cur.engine + " • " : ""}${cur.mileage ? Number(cur.mileage).toLocaleString() + " km" : ""}`;
    }

    await this.loadMaintenanceLogs();
  }

  async loadMaintenanceLogs() {
    const container = document.getElementById("maintenanceLogsContainer");
    if (!container || !this.selectedMyVehicleId) return;

    const logs = await db.getMaintenanceLogs(this.selectedMyVehicleId);

    if (logs.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-lg);">
          <p style="font-size: 1rem; font-weight: 600; color: var(--text-main);">Aucune intervention consignée</p>
          <p style="font-size: 0.85rem; margin-top: 0.25rem;">Cliquez sur "Enregistrer une intervention" ci-dessus pour ajouter votre dernière vidange ou révision.</p>
        </div>
      `;
      return;
    }

    const totalCost = logs.reduce((acc, l) => acc + (parseFloat(l.cost) || 0), 0);

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
        <span>${logs.length} intervention${logs.length > 1 ? "s" : ""} répertoriée${logs.length > 1 ? "s" : ""}</span>
        <span style="font-weight: 700; color: var(--accent-emerald);">Total dépenses atelier : ${totalCost.toFixed(2)} €</span>
      </div>
      ${logs
        .map((log) => `
          <div class="log-entry-card">
            <div class="log-entry-header">
              <span class="log-type-tag">${log.type}</span>
              <span class="log-km">${log.mileage ? Number(log.mileage).toLocaleString() + " km" : ""}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
              <span>Date : <strong style="color: var(--text-main);">${log.date || "N/A"}</strong> ${log.provider ? `• Par : ${log.provider}` : ""}</span>
              ${log.cost ? `<span style="font-weight: 700; color: var(--accent-amber);">${parseFloat(log.cost).toFixed(2)} €</span>` : ""}
            </div>
            ${log.notes ? `<p style="font-size: 0.88rem; color: var(--text-main); margin-top: 0.35rem; background: var(--bg-secondary); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">${log.notes}</p>` : ""}
            ${log.next_km ? `<div style="font-size: 0.75rem; color: var(--accent-cyan); margin-top: 0.25rem;">🔔 Prochain rappel préconisé : ${Number(log.next_km).toLocaleString()} km</div>` : ""}
            <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
              <button class="btn-danger btn-delete-log" data-log-id="${log.id}" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;">
                Supprimer
              </button>
            </div>
          </div>
        `)
        .join("")}
    `;

    container.querySelectorAll(".btn-delete-log").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-log-id");
        if (confirm("Supprimer cette entrée du carnet d'entretien ?")) {
          await db.deleteMaintenanceLog(id);
          this.showToast("Intervention supprimée.");
          await this.loadMaintenanceLogs();
        }
      });
    });
  }

  openAddVehicleModal(prefill = null) {
    const modal = document.getElementById("modalAddVehicle");
    if (!modal) return;

    document.getElementById("inputMyPlate").value = "";
    document.getElementById("inputMyBrand").value = prefill?.brand || "";
    document.getElementById("inputMyModel").value = prefill?.model || "";
    document.getElementById("inputMyEngine").value = prefill?.engine || "";
    document.getElementById("inputMyYear").value = "";
    document.getElementById("inputMyMileage").value = "";

    modal.classList.add("open");
  }

  async handleSaveMyVehicle() {
    const plate = document.getElementById("inputMyPlate").value.trim().toUpperCase();
    const brand = document.getElementById("inputMyBrand").value.trim();
    const model = document.getElementById("inputMyModel").value.trim();
    const engine = document.getElementById("inputMyEngine").value.trim();
    const year = document.getElementById("inputMyYear").value.trim();
    const mileage = document.getElementById("inputMyMileage").value.trim();

    if (!plate || !brand || !model) {
      this.showToast("Veuillez renseigner les champs obligatoires (immat, marque, modèle).", "warning");
      return;
    }

    const saved = await db.saveMyVehicle({ plate, brand, model, engine, year, mileage });
    this.selectedMyVehicleId = saved.id;
    document.getElementById("modalAddVehicle").classList.remove("open");
    this.showToast("Véhicule ajouté à votre carnet de bord ! 🚘", "success");
    await this.loadMyVehicles();
    this.navigateTo("logbook");
  }

  openAddLogModal() {
    const modal = document.getElementById("modalAddLog");
    if (!modal || !this.selectedMyVehicleId) return;

    // Remplir date du jour
    document.getElementById("inputLogDate").value = new Date().toISOString().split("T")[0];
    const cur = this.myVehicles.find((v) => v.id === this.selectedMyVehicleId);
    if (cur?.mileage) {
      document.getElementById("inputLogKm").value = cur.mileage;
    }

    modal.classList.add("open");
  }

  async handleSaveMaintenanceLog() {
    if (!this.selectedMyVehicleId) return;

    const type = document.getElementById("inputLogType").value;
    const date = document.getElementById("inputLogDate").value;
    const mileage = document.getElementById("inputLogKm").value;
    const cost = document.getElementById("inputLogCost").value;
    const provider = document.getElementById("inputLogProvider").value;
    const notes = document.getElementById("inputLogNotes").value;
    const next_km = document.getElementById("inputLogNextKm").value;

    await db.saveMaintenanceLog({
      vehicleId: this.selectedMyVehicleId,
      type,
      date,
      mileage,
      cost,
      provider,
      notes,
      next_km
    });

    // Mettre à jour le km du véhicule si le log est plus récent
    const cur = this.myVehicles.find((v) => v.id === this.selectedMyVehicleId);
    if (cur && (!cur.mileage || parseInt(mileage, 10) > parseInt(cur.mileage, 10))) {
      cur.mileage = mileage;
      await db.saveMyVehicle(cur);
    }

    document.getElementById("modalAddLog").classList.remove("open");
    this.showToast("Intervention enregistrée dans le journal !", "success");
    await this.loadMyVehicles();
  }

  // =========================================================================
  // MODULE UTILITAIRES / CONVERTISSEURS ATELIER
  // =========================================================================

  setupConverters() {
    // 1. Pression (Bar <-> PSI)
    const inputBar = document.getElementById("inputBar");
    const inputPsi = document.getElementById("inputPsi");

    inputBar?.addEventListener("input", () => {
      const bar = parseFloat(inputBar.value);
      if (!isNaN(bar)) {
        inputPsi.value = (bar * 14.5038).toFixed(2);
      }
    });

    inputPsi?.addEventListener("input", () => {
      const psi = parseFloat(inputPsi.value);
      if (!isNaN(psi)) {
        inputBar.value = (psi / 14.5038).toFixed(2);
      }
    });

    // Boutons rapides Bar
    document.querySelectorAll(".btn-quick-bar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");
        if (inputBar && inputPsi) {
          inputBar.value = val;
          inputPsi.value = (parseFloat(val) * 14.5038).toFixed(2);
        }
      });
    });

    // 2. Couple de serrage (Nm <-> ft-lb)
    const inputNm = document.getElementById("inputNm");
    const inputFtLb = document.getElementById("inputFtLb");

    inputNm?.addEventListener("input", () => {
      const nm = parseFloat(inputNm.value);
      if (!isNaN(nm)) {
        inputFtLb.value = (nm * 0.737562).toFixed(1);
      }
    });

    inputFtLb?.addEventListener("input", () => {
      const ftLb = parseFloat(inputFtLb.value);
      if (!isNaN(ftLb)) {
        inputNm.value = Math.round(ftLb / 0.737562);
      }
    });
  }

  // =========================================================================
  // MODALE PARAMÈTRES & CONFIGURATION GEMINI
  // =========================================================================

  async openSettingsModal() {
    const modal = document.getElementById("modalSettings");
    if (!modal) return;

    const apiKey = await getApiKey();
    const model = await getSelectedModel();
    const currentTheme = localStorage.getItem("mecaniq_theme") || "dark-amber";

    const themeSelect = document.getElementById("settingThemeSelect");
    if (themeSelect) {
      themeSelect.value = currentTheme;
    }

    document.getElementById("settingApiKey").value = apiKey;
    document.getElementById("settingModelSelect").value = model;
    document.getElementById("apiKeyTestStatus").textContent = "";

    // Configuration Supabase Cloud
    const supabaseUrl = await getSupabaseUrl();
    const supabaseKey = await getSupabaseKey();
    const inputSupUrl = document.getElementById("settingSupabaseUrl");
    const inputSupKey = document.getElementById("settingSupabaseKey");
    const supTestStatus = document.getElementById("supabaseTestStatus");
    if (inputSupUrl) inputSupUrl.value = supabaseUrl;
    if (inputSupKey) inputSupKey.value = supabaseKey;
    if (supTestStatus) supTestStatus.textContent = "";

    await this.updateStorageStats();
    modal.classList.add("open");
  }

  async testGeminiKey() {
    const key = document.getElementById("settingApiKey").value.trim();
    const model = document.getElementById("settingModelSelect").value;
    const statusSpan = document.getElementById("apiKeyTestStatus");

    if (!key) {
      statusSpan.textContent = "⚠️ Veuillez renseigner une clé API.";
      statusSpan.style.color = "var(--accent-amber)";
      return;
    }

    statusSpan.textContent = "⏳ Test de connexion en cours...";
    statusSpan.style.color = "var(--accent-cyan)";

    try {
      await testApiKey(key, model);
      statusSpan.textContent = "✓ Clé API valide et connectée !";
      statusSpan.style.color = "var(--accent-emerald)";
      this.showToast("Test API Gemini réussi !", "success");
    } catch (err) {
      statusSpan.textContent = `✕ Erreur : ${err.message}`;
      statusSpan.style.color = "var(--accent-rose)";
      this.showToast(err.message, "error");
    }
  }

  async testSupabaseConnectionUI() {
    const url = document.getElementById("settingSupabaseUrl")?.value.trim();
    const key = document.getElementById("settingSupabaseKey")?.value.trim();
    const statusSpan = document.getElementById("supabaseTestStatus");
    if (!statusSpan) return;

    statusSpan.textContent = "⏳ Test en cours...";
    statusSpan.style.color = "var(--text-muted)";

    try {
      await testSupabaseConnection(url, key);
      statusSpan.textContent = "✓ Connecté à Supabase !";
      statusSpan.style.color = "var(--accent-emerald)";
      this.showToast("Connexion Supabase réussie !", "success");
    } catch (err) {
      statusSpan.textContent = `✕ Erreur : ${err.message}`;
      statusSpan.style.color = "var(--accent-rose)";
      this.showToast(`Échec connexion Supabase : ${err.message}`, "error");
    }
  }

  async manualSyncSupabase() {
    this.showToast("Synchronisation avec la base Supabase en cours... 🔄", "info");
    try {
      const added = await syncNewVehiclesFromSupabase();
      if (added > 0) {
        this.vehicles = await db.getAllVehicles();
        await this.renderCatalog();
        await this.updateStorageStats();
        this.showToast(`${added} nouvelle(s) fiche(s) importée(s) depuis Supabase ! ☁️🎉`, "success");
      } else {
        this.showToast("Votre base locale est déjà à jour avec Supabase. 👍", "info");
      }
    } catch (err) {
      this.showToast("Erreur lors de la synchronisation Supabase.", "error");
    }
  }

  async saveSettings() {
    const key = document.getElementById("settingApiKey").value.trim();
    const model = document.getElementById("settingModelSelect").value;
    const theme = document.getElementById("settingThemeSelect")?.value;

    if (theme) {
      this.setTheme(theme, false);
    }

    await saveApiKey(key);
    await saveSelectedModel(model);

    // Sauvegarde Supabase
    const supUrl = document.getElementById("settingSupabaseUrl")?.value.trim();
    const supKey = document.getElementById("settingSupabaseKey")?.value.trim();
    if (supUrl || supKey) {
      await saveSupabaseConfig(supUrl, supKey);
    }

    document.getElementById("modalSettings").classList.remove("open");
    this.showToast("Paramètres enregistrés avec succès.", "success");
  }

  async updateStorageStats() {
    const statsEl = document.getElementById("storageStatsText");
    if (!statsEl) return;

    const allVehicles = await db.getAllVehicles();
    const aiCount = allVehicles.filter((v) => v.source === "ai_generated").length;
    const cloudCount = allVehicles.filter((v) => v.source === "supabase_cloud").length;
    const localCount = allVehicles.filter((v) => v.source === "local_base").length;
    const myVehicles = await db.getMyVehicles();

    statsEl.innerHTML = `
      <strong>${allVehicles.length}</strong> fiches techniques au total (<strong>${localCount}</strong> de base + <strong>${cloudCount}</strong> Cloud Supabase + <strong>${aiCount}</strong> IA) • 
      <strong>${myVehicles.length}</strong> véhicule(s) dans votre carnet.
    `;
  }

  async exportDataAsJson() {
    try {
      const data = await db.exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mecaniq_export_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast("Exportation des données téléchargée.", "success");
    } catch (err) {
      this.showToast("Erreur lors de l'exportation.", "error");
    }
  }

  async handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await db.importData(data);
      this.vehicles = await db.getAllVehicles();
      await this.renderCatalog();
      await this.loadMyVehicles();
      await this.updateStorageStats();
      this.showToast("Données importées avec succès !", "success");
      document.getElementById("modalSettings").classList.remove("open");
    } catch (err) {
      console.error("Erreur import :", err);
      this.showToast("Fichier JSON non valide ou corrompu.", "error");
    }
  }

  // =========================================================================
  // FONCTIONNALITÉS D'ATELIER V4.0
  // =========================================================================

  setupWorkshopFeatures() {
    // 1. SCANNER CARTE GRISE / VIN (Vision IA)
    const btnScan = document.getElementById("btnScanDocOrVin");
    const inputScan = document.getElementById("inputScanCamera");

    btnScan?.addEventListener("click", () => {
      inputScan?.click();
    });

    inputScan?.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      await this.handleScanDocument(file);
      inputScan.value = "";
    });

    // 2. CALCULATEURS DE DÉPORT DYNAMOMÉTRIQUE
    this.setupTorqueOffset();

    // 3. ASSISTANT DE REMPLISSAGE D'HUILE SÉCURISÉ
    document.getElementById("btnOpenOilAssistant")?.addEventListener("click", () => {
      this.openOilAssistantModal();
    });
    this.setupOilAssistantEvents();

    // 4. GUIDE VISUEL DE SERRAGE ANGULAIRE
    this.setupAngularGuideEvents();

    // 6. PRÉPARATION DU CHANTIER & CHECK-LIST
    document.getElementById("btnPrepareWork")?.addEventListener("click", () => {
      this.openPrepareWorkModal();
    });
    this.setupPrepareWorkEvents();
  }

  // --- 1. SCAN CARTE GRISE / VIN ---
  async handleScanDocument(file) {
    const apiKey = await getApiKey();
    if (!apiKey) {
      this.showToast("Veuillez renseigner votre clé API Gemini pour utiliser le scanner 📷", "warning");
      this.openSettingsModal();
      return;
    }

    const btnScan = document.getElementById("btnScanDocOrVin");
    const searchInput = document.getElementById("globalSearchInput");
    const clearBtn = document.getElementById("btnSearchClear");

    if (btnScan) {
      btnScan.style.opacity = "0.6";
      btnScan.style.pointerEvents = "none";
    }
    this.showToast("Analyse de la Carte Grise / VIN en cours par Gemini Vision... 📷⏳", "info");

    try {
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const scanResult = await scanDocumentOrVin(base64Data, file.type || "image/jpeg");
      console.log("Résultat Scan Carte Grise :", scanResult);

      const parts = [
        scanResult.make,
        scanResult.model,
        scanResult.engine_hint || scanResult.fuel
      ].filter(Boolean);

      let query = parts.join(" ").trim();
      if (!query && scanResult.vin) {
        query = scanResult.vin;
      }

      if (!query) {
        throw new Error("Impossible d'extraire le véhicule ou le numéro VIN de l'image.");
      }

      if (searchInput) {
        searchInput.value = query;
        if (clearBtn) clearBtn.style.display = "block";
      }

      const vinText = scanResult.vin ? ` (VIN: ${scanResult.vin})` : "";
      this.showToast(`Véhicule identifié : ${scanResult.make || ""} ${scanResult.model || ""}${vinText} 🚗`, "success");

      // Injection automatique dans le flux de recherche hybride (Local -> Supabase -> Génération IA)
      await this.triggerSearchOrAI();
    } catch (err) {
      console.error("Erreur scan carte grise :", err);
      this.showToast(err.message || "Échec de l'analyse du document.", "error");
    } finally {
      if (btnScan) {
        btnScan.style.opacity = "1";
        btnScan.style.pointerEvents = "auto";
      }
    }
  }

  // --- 2. CALCULATEUR DÉPORT DYNAMOMÉTRIQUE ---
  setupTorqueOffset() {
    // A. Calculateur intégré dans Outils (Convertisseurs)
    const targetInput = document.getElementById("offsetTargetTorque");
    const wrenchInput = document.getElementById("offsetWrenchLength");
    const adapterInput = document.getElementById("offsetAdapterLength");
    const angleGroup = document.getElementById("offsetAngleGroup");
    const displayResult = document.getElementById("offsetDisplayResult");
    const formulaCaption = document.getElementById("offsetFormulaCaption");

    const updateEmbeddedCalc = () => {
      const target = parseFloat(targetInput?.value) || 0;
      const wrenchL = parseFloat(wrenchInput?.value) || 40;
      const adapterE = parseFloat(adapterInput?.value) || 5;
      const activeBtn = angleGroup?.querySelector(".btn-toggle-chip.active");
      const angleMode = activeBtn?.getAttribute("data-angle-mode") || "0";

      let finalVal = target;
      let formulaText = "";

      if (angleMode === "90") {
        finalVal = target;
        formulaText = `À 90° (perpendiculaire) : bras de levier effectif inchangé -> Régler exactement <strong>${target.toFixed(1)} Nm</strong>`;
      } else if (angleMode === "180") {
        const denom = Math.max(1, wrenchL - adapterE);
        finalVal = target * (wrenchL / denom);
        formulaText = `Vers l'arrière (180°) : ${target} Nm × (${wrenchL} cm / (${wrenchL} - ${adapterE} cm)) = <strong>${finalVal.toFixed(1)} Nm</strong>`;
      } else {
        const denom = wrenchL + adapterE;
        finalVal = target * (wrenchL / denom);
        formulaText = `Dans l'axe (0°) : ${target} Nm × (${wrenchL} cm / (${wrenchL} + ${adapterE} cm)) = <strong>${finalVal.toFixed(1)} Nm</strong>`;
      }

      if (displayResult) displayResult.innerHTML = `${finalVal.toFixed(1)} <span style="font-size: 1.3rem;">Nm</span>`;
      if (formulaCaption) formulaCaption.innerHTML = formulaText;
    };

    targetInput?.addEventListener("input", updateEmbeddedCalc);
    wrenchInput?.addEventListener("input", updateEmbeddedCalc);
    adapterInput?.addEventListener("input", updateEmbeddedCalc);

    angleGroup?.querySelectorAll(".btn-toggle-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        angleGroup.querySelectorAll(".btn-toggle-chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateEmbeddedCalc();
      });
    });

    // B. Modal Calculateur Déport (accessible depuis n'importe quelle valeur de couple)
    const modalTarget = document.getElementById("modalOffsetTarget");
    const modalWrench = document.getElementById("modalOffsetWrenchL");
    const modalAdapter = document.getElementById("modalOffsetAdapterE");
    const modalAngleGroup = document.getElementById("modalOffsetAngleGroup");
    const modalResult = document.getElementById("modalOffsetResult");
    const modalFormula = document.getElementById("modalOffsetFormula");

    const updateModalCalc = () => {
      const target = parseFloat(modalTarget?.value) || 0;
      const wrenchL = parseFloat(modalWrench?.value) || 40;
      const adapterE = parseFloat(modalAdapter?.value) || 5;
      const activeBtn = modalAngleGroup?.querySelector(".btn-toggle-chip.active");
      const angleMode = activeBtn?.getAttribute("data-modal-angle") || "0";

      let finalVal = target;
      let formulaText = "";

      if (angleMode === "90") {
        finalVal = target;
        formulaText = `À 90° (perpendiculaire) : bras de levier effectif inchangé -> Régler exactement <strong>${target.toFixed(1)} Nm</strong>`;
      } else if (angleMode === "180") {
        const denom = Math.max(1, wrenchL - adapterE);
        finalVal = target * (wrenchL / denom);
        formulaText = `Vers l'arrière (180°) : ${target} Nm × (${wrenchL} cm / (${wrenchL} - ${adapterE} cm)) = <strong>${finalVal.toFixed(1)} Nm</strong>`;
      } else {
        const denom = wrenchL + adapterE;
        finalVal = target * (wrenchL / denom);
        formulaText = `Dans l'axe (0°) : ${target} Nm × (${wrenchL} cm / (${wrenchL} + ${adapterE} cm)) = <strong>${finalVal.toFixed(1)} Nm</strong>`;
      }

      if (modalResult) modalResult.innerHTML = `${finalVal.toFixed(1)} <span style="font-size: 1.2rem;">Nm</span>`;
      if (modalFormula) modalFormula.innerHTML = formulaText;
    };

    modalTarget?.addEventListener("input", updateModalCalc);
    modalWrench?.addEventListener("input", updateModalCalc);
    modalAdapter?.addEventListener("input", updateModalCalc);

    modalAngleGroup?.querySelectorAll(".btn-toggle-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        modalAngleGroup.querySelectorAll(".btn-toggle-chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        updateModalCalc();
      });
    });

    // C. Clic sur n'importe quel bouton ".btn-open-torque-offset"
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-open-torque-offset");
      if (btn) {
        const torqueVal = parseFloat(btn.getAttribute("data-torque")) || 25;
        if (modalTarget) modalTarget.value = torqueVal;
        updateModalCalc();
        document.getElementById("modalTorqueOffset")?.classList.add("open");
      }
    });

    updateEmbeddedCalc();
  }

  // --- 3. ASSISTANT DE REMPLISSAGE D'HUILE SÉCURISÉ ---
  openOilAssistantModal() {
    if (!this.currentVehicle) return;
    const modal = document.getElementById("modalOilAssistant");
    if (!modal) return;

    const oil = this.currentVehicle.fluids?.engine_oil || {};
    const capStr = oil.capacity_with_filter || (oil.capacity_with_filter_l ? `${oil.capacity_with_filter_l} L` : "4.5 L");
    const capNum = parseFloat(capStr) || 4.5;
    const viscosity = oil.viscosity || "5W-30";

    const titleEl = document.getElementById("oilModalVehicleTitle");
    const capReqEl = document.getElementById("oilModalCapacityReq");
    const viscEl = document.getElementById("oilModalViscosity");

    if (titleEl) titleEl.textContent = `${this.currentVehicle.make || this.currentVehicle.brand} ${this.currentVehicle.model}`;
    if (capReqEl) capReqEl.textContent = `${capNum} L`;
    if (viscEl) viscEl.textContent = viscosity;

    this.selectedOilCapacity = capNum;
    this.updateOilBottleGauge();

    modal.classList.add("open");
  }

  updateOilBottleGauge() {
    const selector = document.getElementById("oilJugSelector");
    const activeChip = selector?.querySelector(".btn-toggle-chip.active");
    const jugSize = parseFloat(activeChip?.getAttribute("data-jug-size")) || 5.0;
    const req = this.selectedOilCapacity || 4.5;

    const fluidFill = document.getElementById("oilFluidFill");
    const stopLine = document.getElementById("oilStopLine");
    const stopVal = document.getElementById("oilStopValue");
    const pourInstr = document.getElementById("oilPourInstruction");
    const gradBox = document.getElementById("oilBottleGraduations");

    let remaining = 0;
    let instruction = "";

    if (req <= jugSize) {
      remaining = Math.max(0, jugSize - req);
      instruction = `Sur votre bidon de <strong>${jugSize}L</strong>, versez l'huile et arrêtez-vous précisément lorsque le niveau restant atteint la graduation <strong>${remaining.toFixed(2)} L</strong>.`;
    } else {
      const fullJugs = Math.floor(req / jugSize);
      const partial = req % jugSize;
      remaining = jugSize - partial;
      instruction = `Versez l'intégralité de <strong>${fullJugs} bidon(s) de ${jugSize}L</strong>. Sur le dernier bidon, arrêtez-vous à la graduation <strong>${remaining.toFixed(2)} L</strong>.`;
    }

    const pct = Math.min(100, Math.max(5, (remaining / jugSize) * 100));

    if (fluidFill) fluidFill.style.height = `${pct}%`;
    if (stopLine) stopLine.style.bottom = `${pct}%`;
    if (stopVal) stopVal.innerHTML = `${remaining.toFixed(2)} <span style="font-size: 1.2rem;">L restant</span>`;
    if (pourInstr) pourInstr.innerHTML = instruction;

    if (gradBox) {
      gradBox.innerHTML = `
        <span>${jugSize}L</span>
        <span>${(jugSize * 0.75).toFixed(1)}</span>
        <span>${(jugSize * 0.5).toFixed(1)}</span>
        <span>${(jugSize * 0.25).toFixed(1)}</span>
        <span>0L</span>
      `;
    }
  }

  setupOilAssistantEvents() {
    const selector = document.getElementById("oilJugSelector");
    selector?.querySelectorAll(".btn-toggle-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        selector.querySelectorAll(".btn-toggle-chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.updateOilBottleGauge();
      });
    });

    // Chronomètre repos d'huile (3 min = 180s)
    let timerInterval = null;
    let timeLeft = 180;
    let isRunning = false;

    const digitsEl = document.getElementById("oilTimerDigits");
    const startBtn = document.getElementById("btnStartOilTimer");
    const resetBtn = document.getElementById("btnResetOilTimer");
    const msgEl = document.getElementById("oilTimerMessage");

    const updateDisplay = () => {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;
      if (digitsEl) digitsEl.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const playBeep = () => {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {}
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 300]);
    };

    startBtn?.addEventListener("click", () => {
      if (!isRunning) {
        isRunning = true;
        startBtn.textContent = "⏸ Pause";
        if (msgEl) msgEl.textContent = "L'huile descend lentement vers le carter...";

        timerInterval = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
          } else {
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = "▶ Repartir";
            playBeep();
            if (msgEl) {
              msgEl.innerHTML = "<strong style='color: var(--accent-emerald);'>✓ 3 minutes écoulées ! L'huile est stabilisée. Effectuez le contrôle final à la jauge manuelle.</strong>";
            }
            this.showToast("Repos d'huile terminé ! Contrôlez le niveau à la jauge manuelle 🛢️✓", "success");
          }
        }, 1000);
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = "▶ Reprendre";
        if (msgEl) msgEl.textContent = "Chronomètre en pause.";
      }
    });

    resetBtn?.addEventListener("click", () => {
      clearInterval(timerInterval);
      isRunning = false;
      timeLeft = 180;
      updateDisplay();
      if (startBtn) startBtn.textContent = "▶ Démarrer repos (3 min)";
      if (msgEl) msgEl.textContent = "";
    });
  }

  // --- 4. GUIDE VISUEL SERRAGE ANGULAIRE ---
  setupAngularGuideEvents() {
    const drawGauge = (svgId, degElId, clockElId, fracElId, hexElId, degree) => {
      const svg = document.getElementById(svgId);
      const degText = document.getElementById(degElId);
      const clockText = document.getElementById(clockElId);
      const fracText = document.getElementById(fracElId);
      const hexText = document.getElementById(hexElId);

      const d = parseInt(degree, 10) || 90;
      if (degText) degText.textContent = `${d}°`;

      if (clockText) {
        if (d === 90) clockText.textContent = "De 12h00 à 03h00 (15 min)";
        else if (d === 180) clockText.textContent = "De 12h00 à 06h00 (30 min / demi-tour)";
        else if (d === 60) clockText.textContent = "De 12h00 à 02h00 (10 min)";
        else if (d === 120) clockText.textContent = "De 12h00 à 04h00 (20 min)";
        else if (d === 45) clockText.textContent = "De 12h00 à 01h30 (7.5 min)";
        else if (d === 270) clockText.textContent = "De 12h00 à 09h00 (45 min)";
        else clockText.textContent = `Rotation horaire de ${d}° depuis 12h00`;
      }

      if (fracText) {
        if (d === 90) fracText.textContent = "Exactement 1/4 de tour";
        else if (d === 180) fracText.textContent = "Exactement 1/2 tour (demi-tour)";
        else if (d === 60) fracText.textContent = "Exactement 1/6 de tour";
        else if (d === 120) fracText.textContent = "Exactement 1/3 de tour";
        else if (d === 45) fracText.textContent = "Exactement 1/8 de tour";
        else if (d === 270) fracText.textContent = "3/4 de tour complet";
        else fracText.textContent = `Fraction : ${(d / 360).toFixed(2)} tour`;
      }

      if (hexText) {
        const pans = (d / 60).toFixed(1);
        if (d === 60) hexText.textContent = "Exactement 1 pan d'écrou hexagonal (6 pans)";
        else if (d === 120) hexText.textContent = "Exactement 2 pans d'écrou hexagonal";
        else if (d === 180) hexText.textContent = "Exactement 3 pans d'écrou hexagonal";
        else hexText.textContent = `${pans} pan(s) d'écrou hexagonal (1 pan = 60°)`;
      }

      if (!svg) return;

      const cx = 110;
      const cy = 110;
      const r = 75;
      const startAngleRad = -Math.PI / 2;
      const endAngleRad = startAngleRad + (d * Math.PI) / 180;

      const xStart = cx + r * Math.cos(startAngleRad);
      const yStart = cy + r * Math.sin(startAngleRad);
      const xEnd = cx + r * Math.cos(endAngleRad);
      const yEnd = cy + r * Math.sin(endAngleRad);

      const largeArc = d > 180 ? 1 : 0;
      const pathD = `M ${xStart} ${yStart} A ${r} ${r} 0 ${largeArc} 1 ${xEnd} ${yEnd}`;

      svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#334155" stroke-width="8" />
        <line x1="${cx}" y1="25" x2="${cx}" y2="35" stroke="#94A3B8" stroke-width="2" />
        <line x1="${cx}" y1="185" x2="${cx}" y2="195" stroke="#94A3B8" stroke-width="2" />
        <line x1="25" y1="${cy}" x2="35" y2="${cy}" stroke="#94A3B8" stroke-width="2" />
        <line x1="185" y1="${cy}" x2="195" y2="${cy}" stroke="#94A3B8" stroke-width="2" />
        <polygon points="110,90 127,100 127,120 110,130 93,120 93,100" fill="none" stroke="#64748B" stroke-width="2" />
        <path d="${pathD}" fill="none" stroke="#F59E0B" stroke-width="10" stroke-linecap="round" />
        <circle cx="${xStart}" cy="${yStart}" r="5" fill="#38BDF8" />
        <circle cx="${xEnd}" cy="${yEnd}" r="6" fill="#F59E0B" />
      `;
    };

    // A. Outil intégré dans Convertisseurs
    document.querySelectorAll(".btn-angle-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-angle-preset").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const angle = btn.getAttribute("data-angle");
        drawGauge("angularGaugeSvg", "angularSvgDegree", "cueClock", "cueFraction", "cueHex", angle);
      });
    });

    // B. Modale Serrage Angulaire
    document.querySelectorAll(".btn-modal-angle-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-modal-angle-preset").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const angle = btn.getAttribute("data-angle");
        drawGauge("modalAngularGaugeSvg", "modalAngularSvgDegree", "modalCueClock", "modalCueFraction", "modalCueHex", angle);
      });
    });

    // C. Clic sur boutons ".btn-open-angular-guide"
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-open-angular-guide");
      if (btn) {
        const angle = btn.getAttribute("data-angle") || "90";
        drawGauge("modalAngularGaugeSvg", "modalAngularSvgDegree", "modalCueClock", "modalCueFraction", "modalCueHex", angle);
        document.getElementById("modalAngularGuide")?.classList.add("open");
      }
    });

    drawGauge("angularGaugeSvg", "angularSvgDegree", "cueClock", "cueFraction", "cueHex", 90);
    drawGauge("modalAngularGaugeSvg", "modalAngularSvgDegree", "modalCueClock", "modalCueFraction", "modalCueHex", 90);
  }

  // --- 5. RAZ VIDANGE MANUELLE ---
  renderRazSection(vehicle) {
    const proc = getVehicleRazProcedure(vehicle);
    if (!proc || !Array.isArray(proc.steps)) return;

    // A. Rendu Inline dans tabFluids
    const inlineBox = document.getElementById("specRazStepsInline");
    const methodBadge = document.getElementById("specRazMethodBadge");
    if (methodBadge) methodBadge.textContent = proc.method || "Bouton compteur";

    if (inlineBox) {
      inlineBox.innerHTML = proc.steps
        .map((step, idx) => `
          <div class="raz-step-card">
            <span class="raz-step-badge">Étape ${idx + 1}</span>
            <p class="raz-step-text">${step}</p>
          </div>
        `)
        .join("");
    }

    // B. Rendu Complet dans tabRazService
    const fullBox = document.getElementById("specRazStepsFull");
    const fullBadge = document.getElementById("specRazFullBadge");
    const methodNotice = document.getElementById("specRazMethodNotice");
    const notesText = document.getElementById("specRazNotesText");

    if (fullBadge) fullBadge.textContent = proc.name || vehicle.brand || "Constructeur";
    if (methodNotice) methodNotice.textContent = `Méthode : ${proc.method || "Bouton compteur"}`;
    if (notesText) notesText.textContent = proc.notes || "Fermer toutes les portes et le capot avant d'exécuter la manipulation.";

    if (fullBox) {
      fullBox.innerHTML = proc.steps
        .map((step, idx) => `
          <div class="raz-flow-item">
            <div class="raz-flow-num">${idx + 1}</div>
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--accent-amber); margin-bottom: 0.25rem;">
                Étape ${idx + 1}
              </div>
              <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.5;">
                ${step}
              </div>
            </div>
          </div>
        `)
        .join("");
    }
  }

  // --- 6. CHECK-LIST & PANIER ATELIER ---
  openPrepareWorkModal() {
    if (!this.currentVehicle) return;
    const modal = document.getElementById("modalPrepareWork");
    if (!modal) return;

    const v = this.currentVehicle;
    const oil = v.fluids?.engine_oil || {};
    const drain = oil.drain_plug || {};
    const cap = oil.capacity_with_filter || (oil.capacity_with_filter_l ? `${oil.capacity_with_filter_l} L` : "4.5 L");
    const visc = oil.viscosity || "5W-30";
    const norm = oil.norm || oil.standard || "Spécification constructeur";
    const washer = drain.washer || "Joint cuivre écrasable";
    const thread = drain.thread || "M14 x 1.5";
    const torque = oil.drain_plug_torque || (drain.torque_nm ? `${drain.torque_nm} Nm` : "30 Nm");

    const vehicleTitle = document.getElementById("prepareVehicleTitle");
    if (vehicleTitle) vehicleTitle.textContent = `${v.make || v.brand} ${v.model} (${v.engine?.name || v.engine || ""})`;

    this.currentPrepItems = {
      consumables: [
        `Huile moteur neuve : ${visc} (${norm}) — Volume requis : ${cap}`,
        `Joint de bouchon de vidange neuf : ${washer} (Filetage : ${thread})`,
        `Filtre à huile neuf certifié (cartouche ou vissé)`,
        `Nettoyant freins / Dégraissant carter pour nettoyage du plan de joint`
      ],
      tools: [
        `Outil de démontage bouchon de vidange : ${thread.includes("Carré") ? thread : "Clé plate ou douille 6 pans adaptée"}`,
        `Cloche ou clé à filtre pour dépose du boîtier filtre à huile`,
        `Clé dynamométrique d'atelier (réglée à ${torque} pour le bouchon)`,
        `Bac de récupération d'huile (capacité minimale ${Math.ceil((parseFloat(cap) || 4) + 2)} L) + Entonnoir propre`,
        `Équipements de protection : Gants nitrile neufs + Chiffons d'atelier propres`
      ]
    };

    const savedStateKey = `mecaniq_prep_${v.id}`;
    let savedChecks = {};
    try {
      savedChecks = JSON.parse(localStorage.getItem(savedStateKey) || "{}");
    } catch (e) {}

    const consContainer = document.getElementById("prepareConsumablesList");
    const toolsContainer = document.getElementById("prepareToolsList");

    if (consContainer) {
      consContainer.innerHTML = this.currentPrepItems.consumables
        .map((text, i) => {
          const checked = !!savedChecks[`c_${i}`];
          return `
            <label class="checklist-task-item ${checked ? "checked" : ""}">
              <input type="checkbox" data-key="c_${i}" ${checked ? "checked" : ""}>
              <span>${text}</span>
            </label>
          `;
        })
        .join("");
    }

    if (toolsContainer) {
      toolsContainer.innerHTML = this.currentPrepItems.tools
        .map((text, i) => {
          const checked = !!savedChecks[`t_${i}`];
          return `
            <label class="checklist-task-item ${checked ? "checked" : ""}">
              <input type="checkbox" data-key="t_${i}" ${checked ? "checked" : ""}>
              <span>${text}</span>
            </label>
          `;
        })
        .join("");
    }

    this.updatePrepareProgress();
    modal.classList.add("open");
  }

  updatePrepareProgress() {
    const modal = document.getElementById("modalPrepareWork");
    if (!modal) return;

    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    const total = checkboxes.length;
    let checkedCount = 0;
    const stateObj = {};

    checkboxes.forEach((cb) => {
      const k = cb.getAttribute("data-key");
      if (cb.checked) {
        checkedCount++;
        stateObj[k] = true;
      }
    });

    const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
    const bar = document.getElementById("prepareProgressBar");
    const badge = document.getElementById("prepareProgressBadge");

    if (bar) bar.style.width = `${pct}%`;
    if (badge) badge.textContent = `${checkedCount} / ${total} préparés (${pct}%)`;

    if (this.currentVehicle?.id) {
      localStorage.setItem(`mecaniq_prep_${this.currentVehicle.id}`, JSON.stringify(stateObj));
    }
  }

  setupPrepareWorkEvents() {
    const modal = document.getElementById("modalPrepareWork");

    modal?.addEventListener("change", (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        const item = e.target.closest(".checklist-task-item");
        if (item) item.classList.toggle("checked", e.target.checked);
        this.updatePrepareProgress();
      }
    });

    document.getElementById("btnCopyPrepareList")?.addEventListener("click", () => {
      if (!this.currentPrepItems) return;
      const v = this.currentVehicle;
      const title = v ? `${v.make || v.brand} ${v.model}` : "Véhicule";
      let text = `📋 MECANIQ - PRÉPARATION CHANTIER VIDANGE (${title})\n\n`;
      text += `📦 CONSOMMABLES :\n`;
      this.currentPrepItems.consumables.forEach((c) => { text += `[ ] ${c}\n`; });
      text += `\n🛠️ OUTILLAGE REQUIS :\n`;
      this.currentPrepItems.tools.forEach((t) => { text += `[ ] ${t}\n`; });

      navigator.clipboard.writeText(text).then(() => {
        this.showToast("Liste copiée dans le presse-papier ! Prête à envoyer 📋", "success");
      }).catch(() => {
        this.showToast("Erreur lors de la copie presse-papier.", "error");
      });
    });

    document.getElementById("btnPrintPrepareList")?.addEventListener("click", () => {
      window.print();
    });

    document.getElementById("btnResetPrepareList")?.addEventListener("click", () => {
      if (!modal) return;
      modal.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
        cb.closest(".checklist-task-item")?.classList.remove("checked");
      });
      this.updatePrepareProgress();
      this.showToast("Check-list réinitialisée.");
    });
  }

  // =========================================================================
  // TOAST NOTIFICATIONS
  // =========================================================================

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }
}

// Lancement immédiat et résilient de l'application MecanIQ
function startMecanIQ() {
  if (!window.mecaniqApp) {
    try {
      window.mecaniqApp = new MecanIQApp();
      console.log("MecanIQ initialisé avec succès !");
    } catch (err) {
      console.error("Erreur critique initialisation MecanIQ :", err);
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startMecanIQ);
} else {
  startMecanIQ();
}
