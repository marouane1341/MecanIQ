/**
 * MecanIQ - Procédures Officielles de Remise à Zéro (RAZ) Vidange & Entretien
 * Procédures manuelles sans outil de diagnostic pour toutes les marques d'atelier
 */

export const BRAND_RAZ_DATABASE = {
  renault: {
    name: "Renault / Dacia",
    method: "Comodo d'essuie-glace ou Volant multifonction",
    steps: [
      "Mettre le contact sans démarrer le moteur (sur modèles avec carte mains-libres : appuyer 5 secondes sur Start sans toucher les pédales).",
      "Faire défiler les messages de l'ordinateur de bord via les boutons du comodo d'essuie-glace ou du volant jusqu'à afficher 'Autonomie de révision' ou 'Faire vidange rapidement'.",
      "Maintenir l'un des boutons de défilement enfoncé pendant environ 10 secondes : l'affichage se met à clignoter.",
      "Conserver l'appui jusqu'à ce que la nouvelle périodicité s'affiche en fixe (ex: '20 000 km / 12 mois') et que le voyant clé à molette s'éteigne. Couper puis remettre le contact."
    ],
    notes: "Sur les générations récentes (Clio 5, Captur 2, Arkana), la manipulation s'effectue via le menu 'Réglages' de l'écran tactile central EasyLink / OpenR Link ou les flèches gauches du volant."
  },
  dacia: {
    name: "Dacia",
    method: "Bouton comodo ou Volant",
    steps: [
      "Mettre le contact (position accessoires / voyants allumés sans démarrer).",
      "Faire défiler les menus du combiné jusqu'à l'écran 'Autonomie de révision'.",
      "Appuyer et maintenir enfoncé le bouton de défilement pendant 10 secondes.",
      "L'intervalle de vidange clignote puis se réinitialise à l'échéance nominale. Relâcher le bouton et couper le contact."
    ],
    notes: "Sur Duster 2 et Sandero 3, appuyer sur le bouton OK du volant pendant 10 secondes sur l'écran d'autonomie."
  },
  peugeot: {
    name: "Peugeot / Citroën / DS",
    method: "Bouton de remise à zéro journalier [000]",
    steps: [
      "Couper complètement le contact et retirer la clé (ou éteindre le véhicule).",
      "Appuyer et maintenir enfoncé le bouton de remise à zéro du compteur kilométrique partiel [000] situé sur le combiné d'instruments (ou sur l'extrémité du comodo d'éclairage).",
      "Tout en maintenant le bouton enfoncé, mettre le contact sans démarrer le moteur : un compte à rebours de 10 à 0 apparaît sur l'écran.",
      "Attendre que le décompte atteigne '=0' et que le symbole de clé d'entretien disparaisse, puis relâcher le bouton et couper le contact."
    ],
    notes: "Sur les i-Cockpit récents, le bouton [000] est souvent situé à gauche ou en bas du combiné numérique."
  },
  citroen: {
    name: "Citroën",
    method: "Bouton compteur [000]",
    steps: [
      "Couper le contact du véhicule.",
      "Maintenir enfoncé le bouton [000] de remise à zéro journalier du combiné d'instruments.",
      "Mettre le contact sans lancer le démarreur. Un décompte de 10 secondes se déclenche à l'écran.",
      "Relâcher le bouton dès que le décompte affiche '=0'. Couper le contact puis redémarrer pour vérifier l'extinction du témoin."
    ],
    notes: "Ne pas relâcher avant la fin du décompte, sinon la procédure est annulée."
  },
  volkswagen: {
    name: "Volkswagen / Seat / Skoda",
    method: "Bouton [0.0 / SET] sur le combiné",
    steps: [
      "Couper le contact et fermer toutes les portes du véhicule.",
      "Appuyer et maintenir enfoncé le bouton [0.0 / SET] situé sous le compteur de vitesse.",
      "Tout en maintenant [0.0 / SET], mettre le contact sans démarrer. Relâcher le bouton [0.0 / SET] dès que l'écran demande : 'Réinitialiser le service vidange ?'.",
      "Confirmer immédiatement en appuyant à nouveau brièvement sur [0.0 / SET] ou sur le bouton [OK] du volant multifonction. Le message 'Service réinitialisé' s'affiche."
    ],
    notes: "Pour réinitialiser le 'Service Entretien Général' (inspection), mettre les feux de détresse (warning) en marche avant d'effectuer la même manipulation."
  },
  audi: {
    name: "Audi",
    method: "Système MMI ou Bouton combiné",
    steps: [
      "Mettre le contact sans démarrer le moteur.",
      "Sur l'écran MMI central, appuyer sur la touche [MENU] ou [CAR].",
      "Sélectionner 'Véhicule' > 'Entretien & Contrôle' > 'Intervalles d'entretien'.",
      "Faire défiler vers le bas et sélectionner 'Réinitialiser l'intervalle de vidange d'huile', puis valider 'Oui'."
    ],
    notes: "Attention : sur Audi, la réinitialisation de la vidange d'huile se fait manuellement via le MMI, mais l'inspection générale nécessite généralement un outil de diagnostic (VCDS / OBD)."
  },
  bmw: {
    name: "BMW / Mini",
    method: "Bouton compteur journalier & Menu CBS caché",
    steps: [
      "Fermer les portes et mettre le contact (appuyer 3 fois rapidement sur Start sans toucher le frein sur les modèles récents avec mode diagnostic).",
      "Maintenir enfoncé le bouton de remise à zéro journalier (en bas à gauche du combiné) pendant environ 10 à 15 secondes jusqu'à l'apparition du menu de service CBS (icônes d'entretien).",
      "Faire défiler les symboles par de courts appuis jusqu'à sélectionner l'icône de la burette d'huile moteur.",
      "Maintenir à nouveau le bouton enfoncé 3 secondes jusqu'à l'apparition de 'Reset ?', relâcher puis réappuyer immédiatement et maintenir jusqu'à ce que la barre de progression se remplisse et affiche 'Réinitialisation réussie'."
    ],
    notes: "La date et l'heure du véhicule doivent impérativement être réglées pour valider la réinitialisation."
  },
  mercedes: {
    name: "Mercedes-Benz",
    method: "Volant multifonction & Menu atelier ASSYST PLUS",
    steps: [
      "Fermer les portes, insérer la clé et tourner en position 1 (ou appuyer 1 fois sur le bouton Start sans pied sur le frein). Le compteur kilométrique total doit être affiché.",
      "Maintenir simultanément enfoncés le bouton [Décrocher téléphone] puis le bouton [OK] (ou pavé tactile gauche) pendant 5 secondes jusqu'à l'apparition du menu atelier caché.",
      "Faire défiler vers le bas et sélectionner le sous-menu 'ASSYST PLUS', puis appuyer sur [OK].",
      "Mettre le contact en position 2. Sélectionner 'Service complet' > 'Confirmer service' > Choisir la qualité d'huile utilisée (ex: MB 229.51/52) > Valider 'Service effectué'."
    ],
    notes: "Sur les volants AMG ou récents avec touches capacitives : appuyer sur Retour pendant 1s puis glisser sur le pavé optique gauche vers 'Atelier'."
  },
  ford: {
    name: "Ford",
    method: "Double pédale Frein + Accélérateur",
    steps: [
      "Fermer les portes et mettre le contact sans démarrer le moteur (position II).",
      "Enfoncer simultanément la pédale d'accélérateur ET la pédale de frein à fond jusqu'au plancher.",
      "Maintenir les deux pédales enfoncées fermement pendant environ 20 à 25 secondes.",
      "Le message 'Oil service reset' clignote puis affiche 'Oil service reset complete'. Relâcher les pédales et couper le contact."
    ],
    notes: "Méthode infaillible sur Focus, Fiesta, Kuga, Transit, Mondeo et Ranger (2008 à 2024)."
  },
  toyota: {
    name: "Toyota / Lexus",
    method: "Bouton ODO/TRIP du combiné",
    steps: [
      "Mettre le contact et basculer l'affichage kilométrique sur 'TRIP A' (ou 'ODO' selon génération) à l'aide du bouton du combiné, puis couper le contact.",
      "Maintenir enfoncé le bouton de remise à zéro du compteur kilométrique.",
      "Tout en maintenant le bouton, mettre le contact (deux appuis sur Power sans pied sur le frein pour les hybrides).",
      "Un compte à rebours de tirets horizontaux clignotants (-----) s'affiche et s'éteint progressivement jusqu'à afficher '000000' ou 'Complete'. Relâcher le bouton et couper le contact."
    ],
    notes: "Sur les modèles récents avec écran couleur au volant, aller dans l'onglet 'Paramètres' (roue crantée) > 'Réglages véhicule' > 'Entretien d'huile' > 'Réinitialiser'."
  },
  fiat: {
    name: "Fiat / Alfa Romeo / Jeep",
    method: "Pédale d'accélérateur à 3 impulsions",
    steps: [
      "Fermer les portes et mettre le contact (position MAR sans démarrer le moteur).",
      "Dans les 10 secondes qui suivent la mise du contact, enfoncer 3 fois consécutives la pédale d'accélérateur à fond jusqu'au plancher, puis relâcher.",
      "Couper le contact et attendre au moins 10 secondes sans toucher aux commandes.",
      "Remettre le contact et démarrer : le témoin d'huile moteur et le message de vidange doivent être éteints."
    ],
    notes: "Sur Ducato / 500X avec FAP, si le voyant clignote en rouge, cette manipulation réinitialise l'indice de dégradation d'huile moteur."
  },
  opel: {
    name: "Opel",
    method: "Comodo clignotant ou Menu durée de vie d'huile",
    steps: [
      "Mettre le contact sans lancer le moteur.",
      "Appuyer sur le bouton [MENU] sur le comodo des clignotants pour basculer sur le menu 'Informations Véhicule'.",
      "Faire tourner la bague du comodo jusqu'à afficher 'Durée de vie restante de l'huile moteur' (ex: 5%).",
      "Maintenir enfoncé le bouton [SET/CLR] à l'extrémité du comodo pendant 5 secondes jusqu'à ce que la valeur passe à '100%'. Couper le contact."
    ],
    notes: "Sur les modèles Opel récents de base PSA (Corsa F, Mokka B, Astra L, Grandland), appliquer la méthode Peugeot/Citroën avec le bouton [000]."
  },
  nissan: {
    name: "Nissan",
    method: "Boutons du volant ou Menu Réglages combiné",
    steps: [
      "Mettre le contact sans démarrer.",
      "À l'aide des flèches sur la branche gauche du volant, naviguer jusqu'au menu 'Réglages' (icône engrenage).",
      "Faire défiler jusqu'à 'Entretien' > 'Huile et filtre'.",
      "Sélectionner 'Réinitialiser' et confirmer par [OK]. L'intervalle se cale automatiquement sur la valeur nominale."
    ],
    notes: "Sur les anciens modèles (Micra K12, Qashqai J10), maintenir la tige droite du combiné tournée vers la droite contact allumé."
  },
  hyundai: {
    name: "Hyundai / Kia",
    method: "Bouton Mode Volant & Écran LCD combiné",
    steps: [
      "Mettre le contact sans démarrer le moteur.",
      "Appuyer sur le bouton [Feuilles / Mode] sur la branche droite du volant pour basculer sur l'écran des paramètres utilisateur (icône clé plate ou engrenage).",
      "Faire défiler jusqu'à 'Intervalle d'entretien'.",
      "Maintenir le bouton [OK] enfoncé pendant 5 secondes jusqu'à l'affichage de 'Réinitialiser ?', puis réappuyer sur [OK] pour valider."
    ],
    notes: "Si l'intervalle d'entretien est désactivé dans le menu, le réactiver pour programmer le rappel kilométrique et temporel."
  }
};

/**
 * Récupère ou déduit la procédure officielle de RAZ pour un véhicule donné
 * @param {Object} vehicle Fiche technique du véhicule
 * @returns {Object} Procédure RAZ complète avec étapes numérotées
 */
export function getVehicleRazProcedure(vehicle) {
  if (!vehicle) {
    return BRAND_RAZ_DATABASE.renault;
  }

  // 1. Si la fiche véhicule possède déjà une procédure propre certifiée
  if (vehicle.raz_procedure && Array.isArray(vehicle.raz_procedure.steps) && vehicle.raz_procedure.steps.length > 0) {
    return vehicle.raz_procedure;
  }

  // 2. Recherche par marque dans la base d'atelier
  const brandKey = (vehicle.make || vehicle.brand || "").toLowerCase().trim();
  const modelText = (vehicle.model || "").toLowerCase();

  // Détections spécifiques par groupe
  if (brandKey.includes("renault") || brandKey.includes("dacia") || brandKey.includes("alpine")) {
    return brandKey.includes("dacia") ? BRAND_RAZ_DATABASE.dacia : BRAND_RAZ_DATABASE.renault;
  }
  if (brandKey.includes("peugeot") || brandKey.includes("citroen") || brandKey.includes("citroën") || brandKey.includes("ds")) {
    return brandKey.includes("citroen") || brandKey.includes("citroën") ? BRAND_RAZ_DATABASE.citroen : BRAND_RAZ_DATABASE.peugeot;
  }
  if (brandKey.includes("volkswagen") || brandKey.includes("vw") || brandKey.includes("seat") || brandKey.includes("skoda") || brandKey.includes("cupra")) {
    return BRAND_RAZ_DATABASE.volkswagen;
  }
  if (brandKey.includes("audi")) {
    return BRAND_RAZ_DATABASE.audi;
  }
  if (brandKey.includes("bmw") || brandKey.includes("mini")) {
    return BRAND_RAZ_DATABASE.bmw;
  }
  if (brandKey.includes("mercedes") || brandKey.includes("smart")) {
    return BRAND_RAZ_DATABASE.mercedes;
  }
  if (brandKey.includes("ford")) {
    return BRAND_RAZ_DATABASE.ford;
  }
  if (brandKey.includes("toyota") || brandKey.includes("lexus")) {
    return BRAND_RAZ_DATABASE.toyota;
  }
  if (brandKey.includes("fiat") || brandKey.includes("alfa") || brandKey.includes("jeep") || brandKey.includes("abarth") || brandKey.includes("lancia")) {
    return BRAND_RAZ_DATABASE.fiat;
  }
  if (brandKey.includes("opel") || brandKey.includes("vauxhall")) {
    // Si Opel récente (après 2017), base PSA
    const yearMatch = vehicle.generation?.match(/\b(20[12]\d)\b/);
    const year = yearMatch ? parseInt(yearMatch[1], 10) : 2015;
    if (year >= 2018 || modelText.includes("corsa f") || modelText.includes("mokka b")) {
      return BRAND_RAZ_DATABASE.peugeot;
    }
    return BRAND_RAZ_DATABASE.opel;
  }
  if (brandKey.includes("nissan")) {
    return BRAND_RAZ_DATABASE.nissan;
  }
  if (brandKey.includes("hyundai") || brandKey.includes("kia")) {
    return BRAND_RAZ_DATABASE.hyundai;
  }

  // Fallback général universel
  return {
    name: vehicle.brand || "Procédure Universelle",
    method: "Combiné d'instruments / Ordinateur de bord",
    steps: [
      "Couper le contact et s'assurer que toutes les portières sont fermées.",
      "Maintenir enfoncé le bouton de remise à zéro du compteur kilométrique partiel ou le bouton de défilement au volant.",
      "Mettre le contact sans démarrer le moteur. Observer l'apparition du compte à rebours ou le clignotement du symbole d'entretien.",
      "Conserver l'appui 10 secondes jusqu'à confirmation de la remise à zéro (extinction de la clé ou message '0'). Couper puis remettre le contact."
    ],
    notes: "Si le véhicule dispose d'un écran tactile multimédia, consulter également le menu 'Véhicule' > 'Entretien & Révision'."
  };
}
