/**
 * MecanIQ - Moteur de Schémas Visuels d'Atelier
 * Approche hybride : SVG vectoriel natif 100% hors-ligne pour le standard + Photos réelles plein écran pour le spécifique
 */

import { escapeHtml } from "./app.js";

/**
 * 1. ORDRE DE PURGE DES FREINS (SVG Châssis interactif)
 * @param {'standard' | 'diagonal'} method 
 * @param {number|null} activeWheel (1, 2, 3, 4)
 */
export function generateBrakeBleedSvg(method = "standard", activeWheel = null) {
  // Numérotation selon la méthode
  // standard (du plus éloigné au plus proche) : ARD (1) -> ARG (2) -> AVD (3) -> AVG (4)
  // diagonal (circuit en X / ESP) : ARD (1) -> AVG (2) -> AVD (3) -> ARG (4)
  const isDiag = method === "diagonal";
  const numARD = 1;
  const numARG = isDiag ? 4 : 2;
  const numAVD = 3;
  const numAVG = isDiag ? 2 : 4;

  const isAct = (n) => activeWheel === n;

  return `
    <svg viewBox="0 0 360 460" class="workshop-diagram-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" aria-label="Schéma ordre de purge des freins">
      <defs>
        <!-- Gradients -->
        <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#F59E0B" />
        </linearGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- FOND & REPERE CHASSIS -->
      <rect x="0" y="0" width="360" height="460" rx="16" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5" />

      <!-- FLECHE AVANT / SENS DE MARCHE -->
      <g transform="translate(180, 24)">
        <path d="M0 -10 L7 2 L-7 2 Z" fill="#F59E0B" />
        <text x="0" y="16" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">AVANT (MOTEUR)</text>
      </g>

      <!-- SILHOUETTE CARROSSERIE AUTOMOBILE -->
      <path d="
        M 100 50 
        C 120 46, 240 46, 260 50
        C 275 60, 285 95, 285 140
        C 285 190, 290 280, 285 330
        C 285 375, 275 405, 260 415
        C 240 420, 120 420, 100 415
        C 85 405, 75 375, 75 330
        C 70 280, 75 190, 75 140
        C 75 95, 85 60, 100 50 Z" 
        fill="url(#chassisGrad)" stroke="rgba(148, 163, 184, 0.3)" stroke-width="2" />

      <!-- PARE-BRISE ET HABITACLE -->
      <path d="M 105 130 C 135 125, 225 125, 255 130 C 250 170, 250 170, 245 195 L 115 195 Z" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.25)" stroke-width="1.5" />
      <path d="M 115 295 L 245 295 C 248 325, 252 325, 255 345 C 225 350, 135 350, 105 345 Z" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.2)" stroke-width="1.5" />

      <!-- BOCAL DE LIQUIDE DE FREIN / MAITRE-CYLINDRE (AVG) -->
      <g transform="translate(115, 85)">
        <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#0284C7" stroke="#38BDF8" stroke-width="1.5" />
        <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
        <text x="0" y="24" fill="#38BDF8" font-size="9" font-weight="700" text-anchor="middle">Bocal / ABS</text>
      </g>

      <!-- CONDUITS HYDRAULIQUES DE FREINAGE -->
      <!-- Conduits vers ARD -->
      <path d="M 115 85 L 115 220 L 295 220 L 295 340" fill="none" stroke="rgba(245, 158, 11, 0.35)" stroke-width="2" stroke-dasharray="4,3" />
      <!-- Conduits vers ARG -->
      <path d="M 115 85 L 115 340 L 65 340" fill="none" stroke="rgba(245, 158, 11, 0.35)" stroke-width="2" stroke-dasharray="4,3" />
      <!-- Conduits vers AVD -->
      <path d="M 115 85 L 200 85 L 200 115 L 295 115" fill="none" stroke="rgba(56, 189, 248, 0.35)" stroke-width="2" stroke-dasharray="4,3" />
      <!-- Conduits vers AVG -->
      <path d="M 115 85 L 65 85 L 65 115" fill="none" stroke="rgba(56, 189, 248, 0.35)" stroke-width="2" stroke-dasharray="4,3" />

      <!-- LIGNES DE SÉQUENCE RELIANT LES ÉTAPES -->
      ${isDiag ? `
        <!-- Séquence en X : 1:ARD -> 2:AVG -> 3:AVD -> 4:ARG -->
        <path d="M 295 340 L 65 115" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-dasharray="6,4" />
        <path d="M 65 115 L 295 115" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3,3" />
        <path d="M 295 115 L 65 340" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-dasharray="6,4" />
      ` : `
        <!-- Séquence classique : 1:ARD -> 2:ARG -> 3:AVD -> 4:AVG -->
        <path d="M 295 340 L 65 340" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow)" />
        <path d="M 65 340 C 50 250, 310 250, 295 115" fill="none" stroke="#F59E0B" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="5,4" />
        <path d="M 295 115 L 65 115" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" />
      `}

      <!-- 4 ROUES & ÉTRIERS -->

      <!-- 1. ROUE AVANT GAUCHE (AVG) -->
      <g transform="translate(65, 115)">
        <rect x="-14" y="-32" width="28" height="64" rx="7" fill="#1E293B" stroke="#475569" stroke-width="2" />
        <rect x="-8" y="-14" width="16" height="28" rx="3" fill="#334155" />
        <!-- Badge Numéro -->
        <circle cx="0" cy="0" r="16" fill="${numAVG === 1 ? '#EF4444' : '#F59E0B'}" filter="url(#glowEffect)" />
        <text x="0" y="6" fill="#0B0F19" font-size="14" font-weight="900" text-anchor="middle">${numAVG}</text>
        <text x="-24" y="-4" fill="#E2E8F0" font-size="11" font-weight="700" text-anchor="end">AVG</text>
        <text x="-24" y="10" fill="#94A3B8" font-size="9" text-anchor="end">${numAVG}e purge</text>
      </g>

      <!-- 2. ROUE AVANT DROITE (AVD) -->
      <g transform="translate(295, 115)">
        <rect x="-14" y="-32" width="28" height="64" rx="7" fill="#1E293B" stroke="#475569" stroke-width="2" />
        <rect x="-8" y="-14" width="16" height="28" rx="3" fill="#334155" />
        <!-- Badge Numéro -->
        <circle cx="0" cy="0" r="16" fill="${numAVD === 1 ? '#EF4444' : '#F59E0B'}" filter="url(#glowEffect)" />
        <text x="0" y="6" fill="#0B0F19" font-size="14" font-weight="900" text-anchor="middle">${numAVD}</text>
        <text x="24" y="-4" fill="#E2E8F0" font-size="11" font-weight="700" text-anchor="start">AVD</text>
        <text x="24" y="10" fill="#94A3B8" font-size="9" text-anchor="start">${numAVD}e purge</text>
      </g>

      <!-- 3. ROUE ARRIÈRE GAUCHE (ARG) -->
      <g transform="translate(65, 340)">
        <rect x="-14" y="-32" width="28" height="64" rx="7" fill="#1E293B" stroke="#475569" stroke-width="2" />
        <rect x="-8" y="-14" width="16" height="28" rx="3" fill="#334155" />
        <!-- Badge Numéro -->
        <circle cx="0" cy="0" r="16" fill="${numARG === 1 ? '#EF4444' : '#F59E0B'}" filter="url(#glowEffect)" />
        <text x="0" y="6" fill="#0B0F19" font-size="14" font-weight="900" text-anchor="middle">${numARG}</text>
        <text x="-24" y="-4" fill="#E2E8F0" font-size="11" font-weight="700" text-anchor="end">ARG</text>
        <text x="-24" y="10" fill="#94A3B8" font-size="9" text-anchor="end">${numARG}e purge</text>
      </g>

      <!-- 4. ROUE ARRIÈRE DROITE (ARD) -->
      <g transform="translate(295, 340)">
        <rect x="-14" y="-32" width="28" height="64" rx="7" fill="#1E293B" stroke="#475569" stroke-width="2" />
        <rect x="-8" y="-14" width="16" height="28" rx="3" fill="#334155" />
        <!-- Badge Numéro (Point de départ standard) -->
        <circle cx="0" cy="0" r="18" fill="#10B981" filter="url(#glowEffect)" />
        <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">1</text>
        <text x="26" y="-4" fill="#10B981" font-size="11" font-weight="800" text-anchor="start">ARD ★ DÉPART</text>
        <text x="26" y="10" fill="#94A3B8" font-size="9" text-anchor="start">Le + éloigné du bocal</text>
      </g>

      <!-- CARTOUCHE BAS RÉSUMÉ MÉTHODE -->
      <g transform="translate(180, 438)">
        <text x="0" y="0" fill="#94A3B8" font-size="11" text-anchor="middle">
          Ordre : <tspan fill="#10B981" font-weight="700">1: ARD</tspan> ➔ <tspan fill="#F59E0B" font-weight="700">2: ${isDiag ? 'AVG' : 'ARG'}</tspan> ➔ <tspan fill="#F59E0B" font-weight="700">3: AVD</tspan> ➔ <tspan fill="#F59E0B" font-weight="700">4: ${isDiag ? 'ARG' : 'AVG'}</tspan>
        </text>
      </g>
    </svg>
  `;
}

/**
 * 2. ORDRE DE SERRAGE DES ROUES & CULASSE (SVG interactif)
 * @param {'4_studs' | '5_studs' | 'cylinder_head_10'} patternType 
 */
export function generateWheelTorquePatternSvg(patternType = "5_studs") {
  if (patternType === "4_studs") {
    // Serrage 4 goujons en croix : 1 (haut) -> 2 (bas) -> 3 (droite) -> 4 (gauche)
    return `
      <svg viewBox="0 0 320 320" class="workshop-diagram-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
        <defs>
          <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- DISQUE & JANTE -->
        <circle cx="160" cy="160" r="140" fill="#0F172A" stroke="#334155" stroke-width="3" />
        <circle cx="160" cy="160" r="105" fill="#1E293B" stroke="#475569" stroke-width="2" />
        <circle cx="160" cy="160" r="45" fill="#0F172A" stroke="#F59E0B" stroke-width="2" />
        <text x="160" y="165" fill="#94A3B8" font-size="11" font-weight="700" text-anchor="middle">MOYEU</text>

        <!-- LIGNES EN CROIX -->
        <line x1="160" y1="75" x2="160" y2="245" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6,4" />
        <line x1="245" y1="160" x2="75" y2="160" stroke="#F59E0B" stroke-width="3" stroke-dasharray="6,4" />

        <!-- FLÈCHES EN CROIX D'ORDRE -->
        <!-- 1 Haut -> 2 Bas -->
        <path d="M 160 95 L 160 225" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow)" />
        <!-- 3 Droite -> 4 Gauche -->
        <path d="M 225 160 L 95 160" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrow)" />

        <!-- 4 GOUJONS -->
        <!-- Vis 1 : Haut -->
        <g transform="translate(160, 75)">
          <circle cx="0" cy="0" r="18" fill="#10B981" filter="url(#glow4)" />
          <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">1</text>
          <text x="0" y="-24" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">1er Écrou</text>
        </g>

        <!-- Vis 2 : Bas (diamétralement opposé) -->
        <g transform="translate(160, 245)">
          <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow4)" />
          <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">2</text>
          <text x="0" y="32" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="middle">2e Écrou (Opposé)</text>
        </g>

        <!-- Vis 3 : Droite -->
        <g transform="translate(245, 160)">
          <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow4)" />
          <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">3</text>
          <text x="26" y="5" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="start">3e</text>
        </g>

        <!-- Vis 4 : Gauche -->
        <g transform="translate(75, 160)">
          <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow4)" />
          <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">4</text>
          <text x="-26" y="5" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="end">4e</text>
        </g>
      </svg>
    `;
  }

  if (patternType === "cylinder_head_10") {
    // Plan de joint culasse 10 vis (Ordre en spirale du centre vers l'extérieur)
    // Ligne haute : 8 - 4 - 1 - 5 - 9
    // Ligne basse : 7 - 3 - 2 - 6 - 10
    return `
      <svg viewBox="0 0 460 250" class="workshop-diagram-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
        <defs>
          <filter id="glowHead" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- BLOC CULASSE / PLAN DE JOINT -->
        <rect x="15" y="15" width="430" height="220" rx="14" fill="#0F172A" stroke="#334155" stroke-width="2.5" />
        
        <!-- 4 CYLINDRES DESSINÉS -->
        <circle cx="85" cy="125" r="34" fill="#1E293B" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3" />
        <circle cx="180" cy="125" r="34" fill="#1E293B" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3" />
        <circle cx="275" cy="125" r="34" fill="#1E293B" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3" />
        <circle cx="370" cy="125" r="34" fill="#1E293B" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,3" />

        <text x="35" y="38" fill="#F59E0B" font-size="10" font-weight="800" letter-spacing="1">DISTRIBUTION / AVANT</text>
        <text x="425" y="38" fill="#94A3B8" font-size="10" font-weight="700" text-anchor="end">VOLANT MOTEUR</text>

        <!-- COURBE EN SPIRALE (ESCARTGOT) -->
        <!-- 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -->
        <path d="
          M 230 65 
          L 230 185
          L 150 185
          L 150 65
          L 310 65
          L 310 185
          L 70 185
          L 70 65
          L 390 65
          L 390 185
        " fill="none" stroke="rgba(245, 158, 11, 0.45)" stroke-width="2.5" stroke-dasharray="6,4" stroke-linecap="round" />

        <!-- 10 VIS NUMÉROTÉES -->
        <!-- Vis 1 (Centre Haut) -->
        <g transform="translate(230, 65)">
          <circle cx="0" cy="0" r="16" fill="#10B981" filter="url(#glowHead)" />
          <text x="0" y="5" fill="#0B0F19" font-size="13" font-weight="900" text-anchor="middle">1</text>
        </g>

        <!-- Vis 2 (Centre Bas) -->
        <g transform="translate(230, 185)">
          <circle cx="0" cy="0" r="16" fill="#10B981" filter="url(#glowHead)" />
          <text x="0" y="5" fill="#0B0F19" font-size="13" font-weight="900" text-anchor="middle">2</text>
        </g>

        <!-- Vis 3 -->
        <g transform="translate(150, 185)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">3</text>
        </g>

        <!-- Vis 4 -->
        <g transform="translate(150, 65)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">4</text>
        </g>

        <!-- Vis 5 -->
        <g transform="translate(310, 65)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">5</text>
        </g>

        <!-- Vis 6 -->
        <g transform="translate(310, 185)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">6</text>
        </g>

        <!-- Vis 7 -->
        <g transform="translate(70, 185)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">7</text>
        </g>

        <!-- Vis 8 -->
        <g transform="translate(70, 65)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">8</text>
        </g>

        <!-- Vis 9 -->
        <g transform="translate(390, 65)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">9</text>
        </g>

        <!-- Vis 10 -->
        <g transform="translate(390, 185)">
          <circle cx="0" cy="0" r="15" fill="#F59E0B" />
          <text x="0" y="5" fill="#0B0F19" font-size="12" font-weight="900" text-anchor="middle">10</text>
        </g>
      </svg>
    `;
  }

  // 5 goujons (Étoile) - Défaut le plus courant
  // Angles 0, 72, 144, 216, 288 (avec décalage -90 pour commencer au sommet)
  // Ordre en étoile standard : 1 (sommet) -> 2 (bas-droite) -> 3 (haut-gauche) -> 4 (haut-droite) -> 5 (bas-gauche) -> 1
  return `
    <svg viewBox="0 0 320 320" class="workshop-diagram-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
      <defs>
        <filter id="glow5" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- JANTE & DISQUE -->
      <circle cx="160" cy="160" r="140" fill="#0F172A" stroke="#334155" stroke-width="3" />
      <circle cx="160" cy="160" r="105" fill="#1E293B" stroke="#475569" stroke-width="2" />
      <circle cx="160" cy="160" r="45" fill="#0F172A" stroke="#F59E0B" stroke-width="2" />
      <text x="160" y="165" fill="#94A3B8" font-size="11" font-weight="700" text-anchor="middle">MOYEU</text>

      <!-- ÉTOILE DU SERRAGE (1 -> 2 -> 3 -> 4 -> 5 -> 1) -->
      <!-- Coordonnées des 5 goujons à rayon R=85 autour de (160, 160) -->
      <!-- 1 (0° = 90° trig): (160, 75) -->
      <!-- 2 (144°): (232, 230) -->
      <!-- 3 (288°): (79, 134) -->
      <!-- 4 (72°): (241, 134) -->
      <!-- 5 (216°): (88, 230) -->
      <polygon points="160,75 232,230 79,134 241,134 88,230" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6,4" stroke-linejoin="round" />

      <!-- FLÈCHES DE GUIDAGE EN ÉTOILE -->
      <!-- 1 -> 2 -->
      <line x1="160" y1="75" x2="232" y2="230" stroke="#10B981" stroke-width="2" />
      <!-- 2 -> 3 -->
      <line x1="232" y1="230" x2="79" y2="134" stroke="#F59E0B" stroke-width="2" />
      <!-- 3 -> 4 -->
      <line x1="79" y1="134" x2="241" y2="134" stroke="#F59E0B" stroke-width="2" />
      <!-- 4 -> 5 -->
      <line x1="241" y1="134" x2="88" y2="230" stroke="#F59E0B" stroke-width="2" />

      <!-- LES 5 GOUJONS NUMÉROTÉS -->
      <!-- Goujon 1 (Sommet) -->
      <g transform="translate(160, 75)">
        <circle cx="0" cy="0" r="18" fill="#10B981" filter="url(#glow5)" />
        <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">1</text>
        <text x="0" y="-24" fill="#10B981" font-size="11" font-weight="800" text-anchor="middle">1er (Départ)</text>
      </g>

      <!-- Goujon 2 (Bas Droite) -->
      <g transform="translate(232, 230)">
        <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow5)" />
        <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">2</text>
        <text x="24" y="16" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="start">2e</text>
      </g>

      <!-- Goujon 3 (Haut Gauche) -->
      <g transform="translate(79, 134)">
        <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow5)" />
        <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">3</text>
        <text x="-24" y="2" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="end">3e</text>
      </g>

      <!-- Goujon 4 (Haut Droite) -->
      <g transform="translate(241, 134)">
        <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow5)" />
        <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">4</text>
        <text x="24" y="2" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="start">4e</text>
      </g>

      <!-- Goujon 5 (Bas Gauche) -->
      <g transform="translate(88, 230)">
        <circle cx="0" cy="0" r="18" fill="#F59E0B" filter="url(#glow5)" />
        <text x="0" y="6" fill="#0B0F19" font-size="15" font-weight="900" text-anchor="middle">5</text>
        <text x="-24" y="16" fill="#F59E0B" font-size="11" font-weight="800" text-anchor="end">5e</text>
      </g>
    </svg>
  `;
}

/**
 * 3. ILLUSTRATION VECTORIELLE GÉNÉRIQUE : DÉVERROUILLAGE BOÎTE AUTO (Shift Lock)
 */
export function generateGenericShiftLockSvg() {
  return `
    <svg viewBox="0 0 360 210" class="workshop-diagram-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
      <defs>
        <linearGradient id="shifterBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>

      <!-- CONSOLE CENTRALE DU LEVIER -->
      <rect x="20" y="15" width="320" height="180" rx="14" fill="url(#shifterBg)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1.5" />

      <!-- SOUFFLET OU PLATINE DÉCLIPSÉE -->
      <rect x="50" y="35" width="260" height="140" rx="10" fill="#0B0F19" stroke="#334155" stroke-width="2" />

      <!-- GRILLE DES POSITIONS P R N D -->
      <rect x="80" y="60" width="30" height="100" rx="6" fill="#1E293B" />
      <text x="95" y="76" fill="#EF4444" font-size="12" font-weight="900" text-anchor="middle">P</text>
      <text x="95" y="100" fill="#94A3B8" font-size="11" font-weight="700" text-anchor="middle">R</text>
      <text x="95" y="125" fill="#10B981" font-size="13" font-weight="900" text-anchor="middle">N</text>
      <text x="95" y="150" fill="#94A3B8" font-size="11" font-weight="700" text-anchor="middle">D</text>

      <!-- LEVIER ACTUEL EN POSITION P -->
      <circle cx="95" cy="72" r="12" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
      <circle cx="95" cy="72" r="4" fill="#0F172A" />

      <!-- LOQUET DE SECOURS JAUNE / ORANGE -->
      <g transform="translate(145, 72)">
        <rect x="-8" y="-12" width="16" height="24" rx="4" fill="#F59E0B" stroke="#D97706" stroke-width="1.5" />
        <path d="M 0 -8 L 0 8" stroke="#000" stroke-width="2" />
        <text x="25" y="4" fill="#F59E0B" font-size="11" font-weight="800">Loquet Shift Lock</text>
      </g>

      <!-- OUTIL ENFONCANT LE LOQUET -->
      <g transform="translate(230, 40)">
        <!-- Tournevis plat -->
        <rect x="-4" y="-30" width="8" height="30" rx="2" fill="#E2E8F0" />
        <path d="M-2 0 L2 0 L1 18 L-1 18 Z" fill="#94A3B8" />
        <path d="M -40 20 L -8 28" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)" />
        <text x="14" y="-10" fill="#E2E8F0" font-size="10" font-weight="700">Tournevis plat fin</text>
      </g>

      <!-- FLECHE DE DEPLACEMENT DU LEVIER VERS N -->
      <path d="M 95 84 L 95 116" stroke="#10B981" stroke-width="3" stroke-linecap="round" />
      <path d="M 90 110 L 95 120 L 100 110 Z" fill="#10B981" />

      <!-- LÉGENDE DES ÉTAPES -->
      <text x="150" y="125" fill="#E2E8F0" font-size="10">1. Déclipser le cadre de soufflet</text>
      <text x="150" y="142" fill="#F59E0B" font-size="10" font-weight="700">2. Enfoncer le loquet mécanique</text>
      <text x="150" y="159" fill="#10B981" font-size="10" font-weight="700">3. Tirer le levier de P vers N</text>
    </svg>
  `;
}

/**
 * 4. ILLUSTRATION VECTORIELLE GÉNÉRIQUE : BOÎTE À FUSIBLES (Emplacement & Fusibles)
 */
export function generateGenericFuseBoxSvg(locationName = "Habitacle") {
  return `
    <svg viewBox="0 0 360 210" class="workshop-diagram-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
      <!-- BOÎTIER -->
      <rect x="20" y="15" width="320" height="180" rx="12" fill="#0F172A" stroke="#334155" stroke-width="2" />
      <text x="35" y="38" fill="#38BDF8" font-size="11" font-weight="800">BOÎTIER FUSIBLES : ${locationName.toUpperCase()}</text>

      <!-- RANGÉES DE FUSIBLES AUX COULEURS NORMALISÉES -->
      <!-- Rangée 1 -->
      <g transform="translate(45, 60)">
        <rect x="0" y="0" width="22" height="34" rx="4" fill="#EF4444" stroke="#B91C1C" stroke-width="1" />
        <text x="11" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">10A</text>
        
        <rect x="32" y="0" width="22" height="34" rx="4" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1" />
        <text x="43" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">15A</text>

        <rect x="64" y="0" width="22" height="34" rx="4" fill="#EAB308" stroke="#A16207" stroke-width="1" />
        <text x="75" y="21" fill="#000" font-size="9" font-weight="900" text-anchor="middle">20A</text>

        <rect x="96" y="0" width="22" height="34" rx="4" fill="#22C55E" stroke="#15803D" stroke-width="1" />
        <text x="107" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">30A</text>

        <rect x="128" y="0" width="22" height="34" rx="4" fill="#F97316" stroke="#C2410C" stroke-width="1" />
        <text x="139" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">5A</text>

        <rect x="160" y="0" width="22" height="34" rx="4" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1" />
        <text x="171" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">15A</text>
      </g>

      <!-- Rangée 2 -->
      <g transform="translate(45, 110)">
        <rect x="0" y="0" width="22" height="34" rx="4" fill="#EAB308" stroke="#A16207" stroke-width="1" />
        <text x="11" y="21" fill="#000" font-size="9" font-weight="900" text-anchor="middle">20A</text>

        <rect x="32" y="0" width="22" height="34" rx="4" fill="#EF4444" stroke="#B91C1C" stroke-width="1" />
        <text x="43" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">10A</text>

        <rect x="64" y="0" width="22" height="34" rx="4" fill="#EF4444" stroke="#B91C1C" stroke-width="1" />
        <text x="75" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">10A</text>

        <rect x="96" y="0" width="22" height="34" rx="4" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1" />
        <text x="107" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">15A</text>

        <rect x="128" y="0" width="22" height="34" rx="4" fill="#22C55E" stroke="#15803D" stroke-width="1" />
        <text x="139" y="21" fill="#FFF" font-size="9" font-weight="900" text-anchor="middle">30A</text>

        <rect x="160" y="0" width="22" height="34" rx="4" fill="#EAB308" stroke="#A16207" stroke-width="1" />
        <text x="171" y="21" fill="#000" font-size="9" font-weight="900" text-anchor="middle">20A</text>
      </g>

      <!-- BLOC RELAIS PRINCIPAUX -->
      <g transform="translate(245, 60)">
        <rect x="0" y="0" width="40" height="40" rx="4" fill="#1E293B" stroke="#64748B" stroke-width="1.5" />
        <text x="20" y="24" fill="#94A3B8" font-size="10" font-weight="800" text-anchor="middle">R1</text>

        <rect x="46" y="0" width="40" height="40" rx="4" fill="#1E293B" stroke="#64748B" stroke-width="1.5" />
        <text x="66" y="24" fill="#94A3B8" font-size="10" font-weight="800" text-anchor="middle">R2</text>

        <rect x="0" y="46" width="86" height="38" rx="4" fill="#1E293B" stroke="#64748B" stroke-width="1.5" />
        <text x="43" y="69" fill="#94A3B8" font-size="10" font-weight="800" text-anchor="middle">RELAIS PRINCIPAL</text>
      </g>

      <!-- PINCE EXTRACTEUR DE FUSIBLES -->
      <rect x="45" y="160" width="55" height="18" rx="3" fill="#F59E0B" />
      <text x="72" y="173" fill="#000" font-size="9" font-weight="800" text-anchor="middle">Pince</text>
      <text x="120" y="173" fill="#94A3B8" font-size="9">Fusibles de rechange disponibles sur platine</text>
    </svg>
  `;
}
