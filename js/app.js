/**
 * MecanIQ - Application Principale (SPA & PWA)
 * Contrôleur unifié : Recherche, Fiche Technique, Carnet de bord, Convertisseurs & IA
 */

import { db } from "./db.js";
import { 
  getApiKey, 
  saveApiKey, 
  getSelectedModel, 
  saveSelectedModel, 
  testApiKey, 
  generateVehicleData, 
  DEFAULT_MODEL 
} from "./api.js";

class MecanIQApp {
  constructor() {
    this.vehicles = [];
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
    // 1. Initialisation IndexedDB
    try {
      await db.init();
      this.vehicles = await db.getAllVehicles();
    } catch (err) {
      console.error("Erreur init DB :", err);
      this.showToast("Erreur d'initialisation de la base locale", "error");
    }

    // 2. Enregistrement PWA Service Worker
    this.registerServiceWorker();

    // 3. Liaison des écouteurs UI
    this.setupEventListeners();
    this.setupNetworkStatusListener();
    this.setupConverters();

    // 4. Chargement initial des vues
    await this.renderCatalog();
    await this.renderRecentHistory();
    await this.loadMyVehicles();
    await this.updateStorageStats();

    // 5. Gestion de l'historique du navigateur / hash
    this.handleRoute();
    window.addEventListener("hashchange", () => this.handleRoute());
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

    searchInput?.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      clearBtn.style.display = val ? "block" : "none";
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

  navigateTo(viewName, params = null) {
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
      el.classList.remove("hidden");
      el.style.display = "block";
      window.location.hash = "search";
    } else if (viewName === "favorites") {
      const el = document.getElementById("viewFavorites");
      el.classList.remove("hidden");
      el.style.display = "block";
      this.renderFavorites();
      window.location.hash = "favorites";
    } else if (viewName === "logbook") {
      const el = document.getElementById("viewLogbook");
      el.classList.remove("hidden");
      el.style.display = "block";
      this.loadMyVehicles();
      window.location.hash = "logbook";
    } else if (viewName === "tools") {
      const el = document.getElementById("viewTools");
      el.classList.remove("hidden");
      el.style.display = "block";
      window.location.hash = "tools";
    } else if (viewName === "specSheet") {
      const el = document.getElementById("viewSpecSheet");
      el.classList.remove("hidden");
      el.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  handleRoute() {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("vehicle/")) {
      const vehicleId = hash.replace("vehicle/", "");
      this.openSpecSheet(vehicleId);
    } else if (hash === "favorites") {
      this.navigateTo("favorites");
    } else if (hash === "logbook") {
      this.navigateTo("logbook");
    } else if (hash === "tools") {
      this.navigateTo("tools");
    } else {
      this.navigateTo("home");
    }
  }

  // =========================================================================
  // RECHERCHE & CATALOGUE VÉHICULES
  // =========================================================================

  async renderCatalog() {
    const grid = document.getElementById("vehiclesGrid");
    const countBadge = document.getElementById("vehicleCountBadge");
    if (!grid) return;

    this.vehicles = await db.getAllVehicles();
    const favIds = await db.getFavorites();

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
        const brand = v.make || v.brand || "Atelier";
        const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
        const fuel = typeof v.engine === "object" ? v.engine.fuel || "" : (v.fuel || "");
        const viscosity = v.fluids?.engine_oil?.viscosity || "N/A";
        const timingText = v.timing?.type ? (v.timing.type.includes("Chaîne") ? "Chaîne" : "Courroie") : (v.engine?.code || fuel);

        return `
          <div class="vehicle-card" data-id="${v.id}">
            <div>
              <div class="card-top">
                <div class="card-brand">${brand}</div>
                <button class="favorite-btn ${isFav ? "active" : ""}" data-fav-id="${v.id}" title="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>

              <div class="card-title">${v.model}</div>
              <div class="card-engine">${engineName}</div>

              <div class="card-specs-row">
                <span class="spec-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                  ${viscosity}
                </span>
                <span class="spec-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${timingText}
                </span>
                <span class="spec-badge">
                  ${v.power_hp ? v.power_hp + " ch" : fuel}
                </span>
              </div>
            </div>

            <div class="card-bottom">
              <span class="source-badge ${isAI ? "ai" : ""}">
                ${isAI ? "Généré IA MecanIQ" : "Base Locale"}
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
            const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
            const viscosity = v.fluids?.engine_oil?.viscosity || "";
            return `
              <div class="suggestion-item" data-id="${v.id}">
                <div class="suggestion-info">
                  <span class="suggestion-name">${brand} ${v.model}</span>
                  <span class="suggestion-sub">${engineName} ${viscosity ? `• ${viscosity}` : ""}</span>
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

  triggerSearchOrAI() {
    const input = document.getElementById("globalSearchInput");
    const query = (input?.value || "").trim();
    if (!query) return;

    // Fermer les suggestions
    const suggestionsBox = document.getElementById("searchSuggestions");
    if (suggestionsBox) suggestionsBox.style.display = "none";

    // Vérifier si un véhicule correspond exactement ou fortement
    const match = this.vehicles.find((v) => {
      const brand = v.make || v.brand || "";
      const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
      const modelsExtra = Array.isArray(v.models) ? v.models.join(" ") : "";
      const makesExtra = Array.isArray(v.makes_compatible) ? v.makes_compatible.join(" ") : "";
      const full = `${brand} ${v.model} ${modelsExtra} ${makesExtra} ${engineName}`.toLowerCase();
      return full.includes(query.toLowerCase());
    });

    if (match) {
      this.openSpecSheet(match.id);
    } else {
      // Proposer ou déclencher IA
      const aiCard = document.getElementById("aiGeneratorCard");
      const aiQuerySpan = document.getElementById("aiTargetQuery");
      if (aiCard && aiQuerySpan) {
        aiQuerySpan.textContent = `"${query}"`;
        aiCard.style.display = "block";
        aiCard.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
        aiQuerySpan.textContent = `"${query}"`;
        aiCard.style.display = "block";
        aiCard.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  // =========================================================================
  // GÉNÉRATION DYNAMIQUE PAR IA GEMINI FLASH
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
      this.vehicles = await db.getAllVehicles();
      await this.updateStorageStats();

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
        const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
        const viscosity = v.fluids?.engine_oil?.viscosity || "";
        return `
          <div class="vehicle-card" data-id="${v.id}">
            <div>
              <div class="card-brand">${brand}</div>
              <div class="card-title">${v.model}</div>
              <div class="card-engine">${engineName}</div>
            </div>
            <div class="card-bottom">
              <span class="spec-badge">${viscosity}</span>
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
        const engineName = typeof v.engine === "object" ? v.engine.name || "" : (v.engine || "");
        const fuel = typeof v.engine === "object" ? v.engine.fuel || "" : (v.fuel || "");
        const viscosity = v.fluids?.engine_oil?.viscosity || "N/A";
        return `
          <div class="vehicle-card" data-id="${v.id}">
            <div>
              <div class="card-top">
                <div class="card-brand">${brand}</div>
                <button class="favorite-btn active" data-fav-id="${v.id}" title="Retirer des favoris">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </button>
              </div>
              <div class="card-title">${v.model}</div>
              <div class="card-engine">${engineName}</div>
              <div class="card-specs-row">
                <span class="spec-badge">${viscosity}</span>
                <span class="spec-badge">${v.power_hp ? v.power_hp + " ch" : fuel}</span>
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

  async openSpecSheet(vehicleId) {
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
    document.getElementById("specDrainTorque").textContent = oil.drain_plug_torque || (drain.torque_nm ? `${drain.torque_nm} Nm` : "N/A");
    document.getElementById("specDrainThread").textContent = drain.thread || (oil.drain_plug_torque ? "Spécifié constructeur" : "Standard");
    document.getElementById("specDrainWasher").textContent = drain.washer || "Joint cuivre / écrasement";

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

    // Afficher la vue
    this.navigateTo("specSheet");
    window.location.hash = `vehicle/${vehicle.id}`;
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

    document.getElementById("settingApiKey").value = apiKey;
    document.getElementById("settingModelSelect").value = model;
    document.getElementById("apiKeyTestStatus").textContent = "";

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

  async saveSettings() {
    const key = document.getElementById("settingApiKey").value.trim();
    const model = document.getElementById("settingModelSelect").value;

    await saveApiKey(key);
    await saveSelectedModel(model);

    document.getElementById("modalSettings").classList.remove("open");
    this.showToast("Paramètres et clé API enregistrés avec succès.", "success");
  }

  async updateStorageStats() {
    const statsEl = document.getElementById("storageStatsText");
    if (!statsEl) return;

    const allVehicles = await db.getAllVehicles();
    const aiCount = allVehicles.filter((v) => v.source === "ai_generated").length;
    const localCount = allVehicles.filter((v) => v.source === "local_base").length;
    const myVehicles = await db.getMyVehicles();

    statsEl.innerHTML = `
      <strong>${allVehicles.length}</strong> fiches techniques au total (<strong>${localCount}</strong> de base + <strong>${aiCount}</strong> générées IA) • 
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

// Lancement automatique de l'application MecanIQ
window.addEventListener("DOMContentLoaded", () => {
  window.mecaniqApp = new MecanIQApp();
});
