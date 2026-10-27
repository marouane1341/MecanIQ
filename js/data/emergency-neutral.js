/**
 * MecanIQ - Bibliothèque d'urgence d'atelier : Déverrouillage Manuel Boîte Auto (Shift Lock Release / Emergency Neutral)
 * Procédures officielles de mise en roue libre (N) en cas de panne de batterie ou moteur éteint pour remorquage sécurisé.
 */

export const EMERGENCY_NEUTRAL_DATABASE = {
  vag: {
    brand_keywords: ["volkswagen", "vw", "audi", "seat", "skoda", "cupra", "porsche"],
    transmission_type: "Boîte DSG / S-Tronic (DQ200, DQ250, DQ381, DQ500) & Tiptronic",
    location: "Sous l'embase / soufflet du levier de vitesses",
    tool_required: "Petit levier plastique ou tournevis plat fin",
    steps: [
      "Couper le contact et serrer le frein de stationnement à main.",
      "Déclipser le cadre d'enjoliveur du soufflet de levier de vitesses en tirant doucement vers le haut à partir de l'arrière.",
      "Soulever le soufflet pour accéder au mécanisme interne. Repérer la languette en plastique de couleur jaune ou orange située à gauche ou à l'avant du sélecteur.",
      "Enfoncer la languette jaune avec un tournevis plat ou le doigt et maintenir la pression tout en déplaçant le levier de la position P vers la position N."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Sur versions 4Motion / Quattro (4 roues motrices), le remorquage essieu au sol est proscrit. Transport sur plateau intégral exigé."
  },

  renault_dacia: {
    brand_keywords: ["renault", "dacia", "alpine", "nissan"],
    transmission_type: "Boîte EDC (Getrag 6DCT250 / 7DCT300) & X-Tronic CVT",
    location: "Fente 'Shift Lock' à la base du levier ou sous le soufflet",
    tool_required: "Clé de secours intégrée à la carte mains libres ou tournevis plat",
    steps: [
      "Retirer la clé physique de secours logée dans la carte de démarrage Renault/Dacia.",
      "Insérer la clé ou un tournevis plat fin dans l'encoche 'Shift Lock' située sur le flanc de l'embase du sélecteur (ou déclipser le cache d'embase).",
      "Appuyer fermement sur le mécanisme de déverrouillage tout en appuyant sur la pédale de frein et ramener le levier de P vers N."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Ne jamais forcer sur le levier sans appuyer sur le loquet de déverrouillage sous peine de casser le câble de commande."
  },

  stellantis: {
    brand_keywords: ["peugeot", "citroën", "citroen", "ds", "opel", "vauxhall"],
    transmission_type: "Boîte EAT6 / EAT8 (Aisin), e-EAT8 & sélecteur e-Toggle / Cobra",
    location: "Sous l'enjoliveur de levier (mécanique) ou biellette sous capot (sélecteur e-Toggle)",
    tool_required: "Tournevis plat fin ou clé de 10 / booster 12V",
    steps: [
      "Pour levier mécanique EAT6 : Déclipser l'entourage enjoliveur du levier de vitesses. Repérer la patte plastique blanche ou jaune sous la console et la pousser tout en déplaçant le levier sur N.",
      "Pour sélecteur impulsionnel Cobra / e-Toggle (EAT8 / Hybride) : Mettre le contact sans démarrer, pied sur frein, appuyer sur le bouton Unlock latéral et pousser le sélecteur vers l'avant jusqu'à N pendant 2 secondes.",
      "Si batterie 12V totalement à plat : Raccorder impérativement un booster de démarrage sur les bornes batterie sous capot pour alimenter le calculateur de boîte et libérer la position Parking."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Sur les nouvelles générations e-Toggle, l'alimentation 12V externe sous capot est la méthode la plus rapide et sûre en atelier."
  },

  bmw: {
    brand_keywords: ["bmw", "mini", "rolls-royce"],
    transmission_type: "Boîte Steptronic ZF 6HP / ZF 8HP & DKG",
    location: "Sous le porte-gobelet (vis quart de tour) ou vis sous boîte côté gauche (ZF 8HP moderne)",
    tool_required: "Clé rouge d'urgence BMW (trousse à outils) ou clé Allen 5 mm",
    steps: [
      "Méthode électronique (si batterie encore sous tension) : Mettre le contact, appuyer à fond sur le frein, presser le bouton Unlock latéral et pousser le joystick sur N pendant 2 secondes consécutives.",
      "Méthode console (génération E60/E90/E70) : Retirer le tapis du porte-gobelet ou déclipser le soufflet, insérer la clé rouge de secours et effectuer une rotation d'un quart de tour jusqu'au clic de verrouillage en N.",
      "Méthode mécanique sous châssis (ZF 8HP moderne Série F/G) : Depuis le dessous du véhicule côté gauche de la boîte de vitesses, visser la vis à six pans creux Allen 5 mm contre le levier pour lever le cliquet de parking."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Modèles xDrive (4 roues motrices) : remorquage roues au sol STRICTEMENT INTERDIT (risque de destruction de la boîte de transfert). Plateau obligatoire !"
  },

  mercedes: {
    brand_keywords: ["mercedes", "mercedes-benz", "smart"],
    transmission_type: "Boîte 7G-Tronic, 9G-Tronic & 7G/8G-DCT (Direct Select)",
    location: "Bornes de secours 12V sous capot moteur (servomoteur ISM)",
    tool_required: "Booster de démarrage 12V / Câbles de démarrage",
    steps: [
      "Sur les Mercedes avec comodo Direct Select au volant, le verrouillage de parking est piloté par un servomoteur électrique (ISM).",
      "En cas de batterie 12V déchargée, brancher impérativement une source 12V externe (booster ou batterie donneuse) sur la borne positive rouge et la masse sous le capot moteur.",
      "Mettre le contact en position 2, appuyer sur la pédale de frein et basculer le comodo d'un demi-cran vers le haut ou le bas pour engager le Neutre (N).",
      "Vérifier la confirmation de la lettre 'N' au combiné d'instruments avant de couper le contact."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Sur modèles 4MATIC (transmission intégrale), le transport doit obligatoirement s'effectuer sur plateau avec les 4 roues levées."
  },

  toyota_lexus: {
    brand_keywords: ["toyota", "lexus"],
    transmission_type: "Boîte e-CVT Hybride (HSD), Direct Shift CVT & BVA Aisin",
    location: "Bouton 'Shift Lock Release' sur la platine du levier",
    tool_required: "Tournevis plat fin ou lame de clé de secours",
    steps: [
      "Serrer fermement le frein de stationnement.",
      "Retirer le petit opercule plastique rectangulaire marqué 'Shift Lock' situé à côté du levier de vitesses.",
      "Insérer la lame de clé ou le tournevis dans l'orifice pour maintenir le bouton enfoncé, puis déplacer le levier de vitesses de P vers N."
    ],
    max_speed_kmh: 30,
    max_distance_km: 30,
    notes: "Sur motorisations hybrides e-CVT (HSD) et AWD-i, le moteur électrique MG2 est entraîné par les roues. Tout remorquage longue distance roues au sol risque de brûler l'onduleur. Plateau ou chariot exigé."
  },

  ford: {
    brand_keywords: ["ford"],
    transmission_type: "Boîte PowerShift (6DCT450) & BVA8 à commande rotative",
    location: "Sangle de déverrouillage sous la console centrale / porte-gobelet",
    tool_required: "Outil plastique ou clé Allen 5 mm",
    steps: [
      "Pour commande rotative BVA8 : Retirer le tapis en caoutchouc du vide-poche de console centrale pour découvrir le volet de déverrouillage manuel.",
      "Tirer sur la sangle ou faire pivoter le levier de déblocage d'un quart de tour jusqu'au verrouillage en position N.",
      "Pour levier mécanique : Déclipser l'enjoliveur de levier et pousser le loquet de déverrouillage métallique avec un tournevis plat."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Vérifier l'affichage du message 'Neutre engagé' sur le tableau de bord avant de commencer le remorquage."
  },

  hyundai_kia: {
    brand_keywords: ["hyundai", "kia", "genesis"],
    transmission_type: "Boîte double embrayage DCT 7 & BVA 6/8",
    location: "Bouton ou cache 'Shift Lock Release' sur la console de boîte",
    tool_required: "Tournevis plat fin ou clé de contact",
    steps: [
      "Localiser le bouton ou le petit cache 'Shift Lock Release' sur la platine du sélecteur.",
      "Enfoncer le bouton avec la clé de secours ou un tournevis plat fin.",
      "Tout en maintenant le bouton pressé, appuyer sur la gâchette du levier et le déplacer sur N."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Sur modèles 4WD / HTRAC, le remorquage roues au sol est interdit. Transport sur plateau impératif."
  },

  ev_tesla: {
    brand_keywords: ["tesla", "lucid", "polestar", "rivian"],
    transmission_type: "Réducteur direct électrique (Mode Remorquage / Tow Mode)",
    location: "Menu tactile 'Mode Remorquage' ou borne 12V externe sous bouclier avant",
    tool_required: "Booster 12V externe si batterie basse tension à plat",
    steps: [
      "Si l'écran est alimenté : Aller dans Contrôles > Entretien > Mode Remorquage / Mode Transport et activer la mise en roue libre.",
      "Si batterie 12V déchargée (véhicule totalement inerte) : Retirer le cache de remorquage sur le bouclier avant, extraire les deux câbles de secours rouge et noir et connecter une alimentation 12V externe pour ouvrir le coffre avant et alimenter le système.",
      "TRACTAGE SUR ROUTE INTERDIT : Les moteurs électriques à aimants permanents génèrent une très haute tension destructrice en cas de remorquage roues au sol. Seul le treuillage à moins de 5 km/h pour monter sur plateau est autorisé."
    ],
    max_speed_kmh: 5,
    max_distance_km: 0.05,
    notes: "Transport STRICTEMENT sur camion plateau. Aucun remorquage roues au sol sous peine de détruire le stator et l'électronique de puissance."
  },

  universal: {
    brand_keywords: [],
    transmission_type: "Boîte automatique hydraulique, robotisée ou double embrayage",
    location: "Orifice 'Shift Lock' sur console ou loquet mécanique sous le soufflet de levier",
    tool_required: "Petit tournevis plat ou tige rigide fine",
    steps: [
      "Couper le contact et serrer le frein à main.",
      "Inspecter la console du levier à la recherche d'un opercule marqué 'Shift Lock' ou déclipser délicatement le soufflet de vitesses.",
      "Enfoncer le loquet mécanique interne de déblocage avec le tournevis tout en maintenant la pédale de frein enfoncée.",
      "Déplacer le sélecteur de la position P vers la position N tout en maintenant la pression sur le loquet."
    ],
    max_speed_kmh: 50,
    max_distance_km: 50,
    notes: "Moteur coupé, la pompe à huile interne de boîte ne tourne pas : respecter impérativement 50 km/h et 50 km max de remorquage, ou utiliser un plateau de dépannage."
  }
};

/**
 * Détecte si un véhicule possède une transmission automatique / robotisée / électrique
 */
export function isAutomaticVehicle(vehicle) {
  if (!vehicle) return false;
  
  // 1. Champ explicite emergency_neutral_procedure
  if (vehicle.emergency_neutral_procedure) return true;

  // 2. Recherche textuelle dans les propriétés du véhicule
  const textCorpus = [
    vehicle.model || "",
    typeof vehicle.engine === "object" ? vehicle.engine.name || "" : vehicle.engine || "",
    vehicle.transmission || "",
    vehicle.gearbox || "",
    vehicle.fluids?.gearbox_oil?.type || "",
    vehicle.fluids?.engine_oil?.viscosity || "",
    Array.isArray(vehicle.reliability?.chronic_faults) ? vehicle.reliability.chronic_faults.join(" ") : ""
  ].join(" ").toLowerCase();

  const autoKeywords = [
    "bva", "boite auto", "boîte auto", "automatique", "dsg", "s-tronic", "s tronic", "tiptronic",
    "eat6", "eat8", "e-eat8", "edc", "powershift", "steptronic", "7g-tronic", "9g-tronic",
    "7g-dct", "8g-dct", "cvt", "x-tronic", "e-cvt", "dkg", "robotisée", "électrique", "dual motor"
  ];

  return autoKeywords.some((kw) => textCorpus.includes(kw));
}

/**
 * Récupère la procédure officielle de déverrouillage d'urgence pour un véhicule donné
 */
export function getVehicleEmergencyNeutralProcedure(vehicle) {
  if (!vehicle) return EMERGENCY_NEUTRAL_DATABASE.universal;

  // 1. Procédure custom fournie directement dans la fiche technique (ex: générée par IA)
  if (vehicle.emergency_neutral_procedure && Array.isArray(vehicle.emergency_neutral_procedure.steps) && vehicle.emergency_neutral_procedure.steps.length > 0) {
    return {
      is_automatic: true,
      transmission_type: vehicle.emergency_neutral_procedure.transmission_type || "Boîte Automatique",
      location: vehicle.emergency_neutral_procedure.location || "Sous le soufflet de levier de vitesses / Orifice Shift Lock",
      tool_required: vehicle.emergency_neutral_procedure.tool_required || "Tournevis plat fin",
      steps: vehicle.emergency_neutral_procedure.steps,
      max_speed_kmh: vehicle.emergency_neutral_procedure.max_speed_kmh || 50,
      max_distance_km: vehicle.emergency_neutral_procedure.max_distance_km || 50,
      notes: vehicle.emergency_neutral_procedure.notes || "Respecter les limites de remorquage pour éviter la détérioration interne de la boîte.",
      is_awd: Boolean(vehicle.emergency_neutral_procedure.is_awd || isAwdVehicle(vehicle))
    };
  }

  // 2. Recherche par constructeur dans la base locale d'urgence
  const make = (vehicle.make || vehicle.brand || "").toLowerCase();
  const model = (vehicle.model || "").toLowerCase();
  const fuel = (typeof vehicle.engine === "object" ? vehicle.engine.fuel || "" : vehicle.fuel || "").toLowerCase();

  // Cas spécial électrique pur (Tesla, etc.)
  if (fuel.includes("électrique") || make.includes("tesla") || model.includes("model 3") || model.includes("model y")) {
    const proc = EMERGENCY_NEUTRAL_DATABASE.ev_tesla;
    return { ...proc, is_automatic: true, is_awd: isAwdVehicle(vehicle) };
  }

  for (const [key, proc] of Object.entries(EMERGENCY_NEUTRAL_DATABASE)) {
    if (key === "universal") continue;
    if (proc.brand_keywords.some((kw) => make.includes(kw) || model.includes(kw))) {
      return {
        ...proc,
        is_automatic: true,
        is_awd: isAwdVehicle(vehicle)
      };
    }
  }

  // 3. Procédure universelle
  return {
    ...EMERGENCY_NEUTRAL_DATABASE.universal,
    is_automatic: true,
    is_awd: isAwdVehicle(vehicle)
  };
}

/**
 * Détecte si le véhicule possède une transmission intégrale (4x4 / AWD)
 */
export function isAwdVehicle(vehicle) {
  if (!vehicle) return false;
  const str = [
    vehicle.model || "",
    vehicle.make || vehicle.brand || "",
    typeof vehicle.engine === "object" ? vehicle.engine.name || "" : vehicle.engine || ""
  ].join(" ").toLowerCase();

  return ["4motion", "quattro", "xdrive", "4matic", "awd", "4x4", "4wd", "all4", "q4"].some((kw) => str.includes(kw));
}
