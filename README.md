# MecanIQ 🛠️ - Application PWA Atelier & Données Mécaniques IA

**MecanIQ** est une Progressive Web App (PWA) moderne, rapide et responsive, conçue pour les mécaniciens, préparateurs et passionnés d'automobile. Elle offre un accès instantané aux fiches techniques de référence (fluides, couples de serrage, boîtes à fusibles interactives, pannes chroniques et carnet d'entretien), avec un fonctionnement hybride et 100% hors-ligne.

---

## 🚀 Architecture Hybride de Données

1. **Base Locale Initiale Intégrée (106 Motorisations de Référence)** :
   - Fiches techniques d'atelier complètes pré-chargées issues de `vehicles.json` :
     - **Volkswagen / Seat / Skoda** — *1.4 16V 75 à 86 ch EA111 atmosphérique (APE / AUA / BBY / BKY / BXW / CGGB)* (Golf IV/V/VI, Polo 9N/6R, Ibiza III/IV, Fabia I/II, Octavia)
     - **Peugeot / Citroën / Mini** — *1.4 VTi 95 ch Prince (EP3 / EP3C / 8FS / 8FP)* (207, 208 I, 308 I, Citroën C3 II, C3 Picasso, C4 I/II, DS3, Mini One R56)
     - **Renault / Suzuki** — *1.9 dCi 120/130 ch (F9Q 800 / 804 / 812 / 870)* (Megane II/III, Scenic II/III, Laguna II/III, Trafic II, Suzuki Grand Vitara 1.9 DDiS)
     - **BMW** — *2.5i / 3.0i 6 cylindres en ligne 218 à 272 ch N52 / N53* (Série 1 130i, Série 3 E90 325i/330i, Série 5 E60/F10 528i/530i, X3 E83, Z4 E85/E89)
     - **Ford** — *1.5 EcoBoost 3 cylindres 150 à 200 ch Dragon (YZDA / Y1DA)* (Fiesta ST Mk8, Focus IV, Puma, Puma ST, Kuga III)
     - **Fiat / Alfa Romeo / Lancia** — *0.9 TwinAir Turbo 2 cylindres 85/105 ch (312A2000 / 199B6000)* (Fiat 500, Panda III, Punto, 500L, Alfa Romeo MiTo, Lancia Ypsilon)
     - **Mercedes-Benz** — *1.6 / 2.0 Turbo BlueDIRECT 122 à 211 ch M270 (transversal) & M274 (longitudinal)* (Classe A W176, CLA, GLA, Classe C W205, Classe E, GLC)
     - **Toyota** — *1.2 Turbo D-4T 116 ch (8NR-FTS)* (Auris II, Corolla XII, C-HR)
     - **Nissan** — *2.5 dCi 16V 144 à 190 ch YD25DDTi* (Navara D40, Pathfinder R51, Cabstar, Murano II)
     - **Volkswagen / Audi / Porsche** — *3.2 VR6 24V 241/250 ch EA390 (BFH / BML / BDB / BMJ / BUB)* (Golf IV/V R32, Passat B6, Audi TT 8N/8J, A3 8P 3.2, Porsche Cayenne I)
     - **Volkswagen / Seat / Skoda** — *1.9 SDI 68 ch injection directe atmosphérique EA080 (AGP / AQM / ASY)* (Golf IV, Bora, Polo 6N2/9N, Ibiza III, Cordoba, Octavia 1)
     - **BMW / Toyota** — *3.0 TwinPower Turbo 6 cylindres en ligne 326 à 382 ch B58* (Série 1 M140i, M240i, 340i/M340i, 540i, X3 M40i, Toyota Supra GR A90)
     - **Ford** — *1.5 TDCi / EcoBlue 85 à 120 ch (XUJA / Z2DA / Base DV5)* (Fiesta VII/VIII, Focus III/IV, EcoSport, Kuga II, Tourneo Connect)
     - **Mercedes-Benz** — *1.5 CDI / d 90 à 116 ch OM607 / OM608* (Classe A W176/W177 A160d/A180d, Classe B W246/W247, CLA, GLA, Citan)
     - **Fiat / Iveco** — *2.3 MultiJet Sofim / FPT 110 à 180 ch (F1AE / F1AGL)* (Fiat Ducato II/III, Iveco Daily III/IV/V)
     - **Renault / Dacia** — *1.6 E-Tech Hybride 140/145 ch (H4M 630 / 632)* (Clio V E-Tech, Captur II E-Tech, Arkana E-Tech, Dacia Jogger Hybrid, Duster III)
     - **Toyota / Lexus** — *2.5 Hybrid Dynamic Force 218 à 222 ch A25A-FXS* (RAV4 V, Camry VIII, Highlander IV, Lexus ES 300h, NX 350h)
     - **Mazda** — *2.2 SkyActiv-D Twin-Turbo 150 à 184 ch (SH-VPTS / SH-VPTR)* (Mazda 3 BM/BN, Mazda 6 GJ/GL, CX-5 KE/KF)
     - **Opel** — *1.4 Turbo Ecotec 120/140 ch (A14NEL / A14NET / B14NET)* (Astra J, Corsa D/E, Meriva B, Mokka, Zafira Tourer, Insignia A)
     - **Peugeot / Citroën** — *1.9 D 69 ch atmosphérique DW8 / DW8B (WJZ / WJY)* (206, 306, Partner I, Citroën Xsara, Berlingo I)
     - **Peugeot / Citroën** — *1.4 16V 90 ch ET3J4 / KFU* (206, 207, 307, C2, C3 I, C4 I)
     - **Volkswagen** — *2.5 TDI 5 cylindres en ligne Injecteurs-Pompes 130/174 ch EA381* (Transporter T5, Multivan T5, Touareg I R5 TDI)
     - **BMW** — *2.0i Valvetronic / Injection directe 129 à 170 ch N46 / N43* (Série 1 E87 118i/120i, Série 3 E90 318i/320i, X3 E83, Z4 E85)
     - **Mercedes-Benz** — *3.0 V6 Bi-Turbo BlueDIRECT 333 à 390 ch M276 (M276.820 / 823 / 850)* (Classe C W205 C400/C43 AMG, Classe E W212/W213 E400, CLS, GLC)
     - **Ford / Land Rover / PSA** — *2.2 TDCi / Duratorq Puma 100 à 155 ch* (Transit 2T V347/V363, Ranger T6, Defender TD4, Boxer/Jumper 2.2 HDi)
     - **Opel / Fiat** — *1.9 CDTI 120 ch 8V & 150 ch 16V (Z19DT / Z19DTH)* (Astra H, Vectra C, Signum, Zafira B, Fiat Croma II)
     - **Toyota / Lexus** — *2.2 D-4D / D-CAT 136 à 177 ch (2AD-FTV / 2AD-FHV)* (RAV4 III, Avensis II/III, Auris I, Corolla Verso, Lexus IS 220d)
     - **Nissan / Dacia / Renault** — *1.5 Blue dCi Euro 6d avec SCR AdBlue (K9K 872 / 876)* (Qashqai II J11, Juke I/II, Micra K14, Duster II, Clio V)
     - **Renault** — *2.0 16V 135 ch à 275 ch F4R / F4Rt* (Clio II/III RS, Megane II/III RS, Laguna II/III, Scenic II)
     - **Hyundai / Kia** — *1.0 T-GDI 3 cylindres 100/120 ch Kappa II (G3LC)* (i20 II/III, i30 III, Kona, Bayon, Ceed III, Rio IV, Stonic)
     - **Peugeot / Citroën** — *2.0 16V 136 à 143 ch EW10 (EW10J4 RFN / EW10A RFJ)* (206 S16/CC, 307, 406, 407, Xsara, Xsara Picasso, C4 I, C5 I)
     - **Honda** — *1.8 i-VTEC 140 ch R18A (R18A1 / R18A2)* (Civic VIII, Civic IX, FR-V, HR-V II)
     - **Toyota** — *2.0 VVT-i / Valvematic 150 à 158 ch (1AZ-FE / 3ZR-FAE)* (RAV4 II/III/IV, Avensis I/II/III)
     - **Mazda** — *2.0 SkyActiv-G 120 à 165 ch PE-VPS (Taux 14:1 atmosphérique)* (Mazda 3 BM/BN/BP, Mazda 6 GJ/GL, CX-3, CX-5, MX-5 ND)
     - **Volvo** — *2.0 D3 / D4 Drive-E VEA 4 cylindres 150 à 190 ch (D4204T9 / D4204T14)* (V40 II, V60 I/II, XC60 I/II, S60 II, XC90 II)
     - **Mercedes-Benz** — *3.5 V6 24V 272 ch M272 (M272.960 / 972 / 980)* (Classe C W204 C350, Classe E W211/W212 E350, ML W164, CLK, SLK)
     - **Ford / Mazda** — *1.8 / 2.0 Duratec-HE 125 à 145 ch (AODA / AODB / CJBA / MZR)* (Mondeo III/IV, Focus II, C-Max I, S-Max, Galaxy, Mazda 3/6)
     - **Renault / Nissan / Opel** — *2.3 dCi 100 à 180 ch M9T (M9T 670 / 700 / 716 / 880)* (Master III, Nissan NV400, Navara D23, Movano B)
     - **Volkswagen / Seat** — *2.0 SDI 70/75 ch Injecteurs-Pompes atmosphérique EA188 (BDK / BST / BDJ)* (Golf V, Caddy III, Ibiza IV)
     - **Alfa Romeo** — *1.75 TBi Turbo 200 à 240 ch (939B1000 / 940A1000 / 960A1000)* (159, Brera, Spider, Giulietta QV, 4C, Lancia Delta III)
     - **Audi / Volkswagen / Skoda** — *2.5 V6 TDI 150 à 180 ch Bosch VP44 (AFB / AKN / AKE / BAU / BDG)* (A4 B5/B6, A6 C5, Allroad, Passat B5, Superb I)
     - **Peugeot / Citroën / Jaguar / Land Rover** — *2.7 V6 HDi Bi-Turbo / TDV6 190 à 207 ch (DT17TED4 / UHZ / 276DT)* (407 Coupé, 607, C6, C5 II, Jaguar XF, Discovery 3, Range Sport)
     - **BMW** — *3.0 TwinPower Turbo 6 cylindres 306 à 340 ch N54 / N55* (Série 3 335i E90/F30, 135i/1M E82, M235i F22, 535i F10, X5 E70)
     - **Opel** — *1.7 DTI / CDTI 75 à 130 ch Isuzu Circle L (Y17DT / Z17DTH / A17DTS)* (Astra G/H/J, Corsa C/D, Meriva A/B, Zafira B, Mokka)
     - **Renault / Dacia** — *1.4 16V (98 ch) & 1.6 16V (105/110 ch) K4J / K4M* (Clio II/III, Megane I/II/III, Scenic I/II/III, Kangoo, Duster I)
     - **Toyota / Mini** — *1.4 D-4D 75/90 ch 1ND-TV* (Yaris I/II/III, Auris I, Corolla E120/E150, Urban Cruiser, Mini One D R50)
     - **Mercedes-Benz** — *3.0 V6 CDI 190 à 265 ch OM642 (OM642.940 / 820 / 850)* (Classe C W203/W204, Classe E W211/W212, ML/GLE W164/W166, CLS, Sprinter)
     - **Volkswagen / Audi / Seat** — *1.8 Turbo 20V 150 à 225 ch EA113 (AGU / AUQ / BAM / APX)* (Golf IV GTI, TT 8N, A3 8L, A4 B5/B6, Leon 1M Cupra)
     - **Ford / Volvo** — *1.6 TDCi 8 soupapes 95/115 ch Duratorq (T1DB / T1DA / DV6C)* (Focus III, Fiesta VI/VII, C-Max II, Mondeo IV, Volvo V40 D2)
     - **Peugeot / Citroën** — *1.6 16V 110 ch TU5JP4 / NFU* (206, 207, 307, Partner, C2, C3 I, C4 I, Xsara, Berlingo)
     - **Toyota / Citroën / Peugeot** — *1.0 VVT-i 68/72 ch 3 cylindres 1KR-FE / CFA* (Aygo I/II, Yaris II/III, C1 I/II, 107, 108)
     - **Alfa Romeo / Fiat** — *1.9 JTD / JTDm 8V 115/120 ch & 16V 140/150 ch (937A2000 / 937A5000)* (147, 156, 159, GT, Grande Punto, Bravo II)
     - **BMW / Mini** — *1.5 TwinPower Turbo 3 cylindres 102 à 140 ch B38 (B38A15A / B38B15A)* (Série 1 F20/F40, Série 2 Active Tourer, X1 F48, Mini Cooper F55/F56)
     - **Volkswagen / Skoda** — *2.0 BiTDI 240 ch 4Motion EA288 (CUAA / CXEB)* (Passat B8, Tiguan II, Arteon, Kodiaq RS)
     - **Honda** — *2.2 i-CTDi / i-DTEC 140/150 ch (N22A1 / N22A2 / N22B1)* (Civic VIII/IX, CR-V II/III/IV, Accord VII/VIII, FR-V)
     - **Renault / Dacia / Smart** — *1.0 SCe 65 à 75 ch B4D (B4D 400 / 419)* (Twingo III, Clio V, Sandero III, Logan III, Smart Fortwo)
     - **Suzuki** — *1.4 Boosterjet Turbo 129/140 ch (K14C / K14D)* (Swift Sport ZC33S, Vitara IV, S-Cross)
     - **Renault / Opel** — *2.2 dCi 16V 90 à 150 ch G9T (G9T 700 / 702 / 710 / 742)* (Laguna II, Espace IV, Vel Satis, Master II, Movano A)
     - **Toyota / Lexus** — *1.8 HSD Hybride 122/136 ch système 2ZR-FXE* (Prius III/IV, Auris II Hybride, Corolla XII, C-HR, Lexus CT200h)
     - **Hyundai / Kia** — *1.6 CRDi 110 à 136 ch D4FB U-Line* (i30 I/II/III, Ceed I/II/III, Sportage IV, Tucson III)
     - **Peugeot / Citroën / DS / Opel** — *2.0 BlueHDi 150/180 ch DW10FD / DW10FC* (308 II, 3008 II, 508 I/II, C4 Picasso, Grandland X)
     - **Mercedes-Benz** — *2.0 d / CDI 150 à 245 ch OM654 (OM654.920)* (Classe C W205/W206, Classe E W213, GLC X253)
     - **Renault / Dacia** — *0.9 TCe 90 ch 3 cylindres H4Bt (H4Bt 400 / 408)* (Clio IV, Captur I, Twingo III, Sandero II, Logan II)
     - **Volkswagen / Audi / Seat / Skoda** — *1.5 TSI Evo 130/150 ch EA211 Evo (DADA / DPCA / DHFA)* (Golf VII/VIII, Polo VI, T-Roc, Tiguan II, Leon IV, Octavia IV)
     - **Renault / Nissan** — *2.0 dCi 130 à 200 ch M9R (RN0720 / RN17)* (Laguna III, Megane III, Espace IV/V, Koleos, Trafic, Qashqai, X-Trail)
     - **Peugeot / Citroën** — *1.6 BlueHDi 100/120 ch 8S Euro 6 DV6FD / DV6FC* (208, 308 II, 2008, 3008 II, C3 III, C4 Cactus, Picasso)
     - **Volkswagen / Audi / Seat / Skoda** — *1.0 TSI 3 cylindres 95 à 115 ch EA211 (VW 508.00 0W-20)* (Polo VI, Golf VII/VIII, T-Roc, A1 GB, Ibiza V, Fabia)
     - **BMW** — *3.0d 6 cylindres en ligne 265 à 400 ch B57 (B57D30A / B / C)* (Série 3 G20, Série 5 G30, X3 G01, X5 G05)
     - **Ford** — *2.0 TDCi EcoBlue Panther 105 à 185 ch (WSS-M2C952-A1 0W-20)* (Transit Custom, Transit 2T, Focus IV, Kuga II/III)
     - **Fiat / Alfa Romeo / Jeep** — *1.4 T-Jet / MultiAir Turbo 120 à 180 ch* (Abarth 595/695, Tipo II, Giulietta, MiTo, Renegade)
     - **Renault / Nissan / Mercedes** — *1.6 dCi 130 ch monoturbo / 160 ch Twin-Turbo R9M / OM626*
     - **Fiat / Peugeot / Citroën / Opel** — *2.0 Multijet / BlueHDi 120 à 180 ch DW10FU (AH01 / AH02)*
     - **Volkswagen / Audi / Seat / Skoda** — *1.6 MPI 102 ch 8S EA113 (BGU / BSE / BSF / CCSA)*
     - **BMW / Mini** — *2.0i TwinPower Turbo 184 à 306 ch B48 (B48B20A / B48B20B)*
     - **Mercedes-Benz** — *1.8 Kompressor / CGI Turbo 143 à 204 ch M271*
     - **Nissan / Renault / Dacia** — *1.6 16V 115 ch Atmosphérique HR16DE / H4M*
     - **Volkswagen / Audi / Seat / Skoda** — *1.2 TSI 85/105 ch EA111 chaîne (CBZA / CBZB)*
     - **Audi / Porsche / VW** — *3.0 V6 TDI 204 à 272 ch EA897 (CDUC / CKVD / CRTD / CRTC)*
     - **Peugeot / Citroën** — *1.4i 75 ch 8S TU (TU3A / TU3JP / KFW / KFX)*
     - **Peugeot / Citroën** — *2.2 HDi 133 à 204 ch DW12 (DW12TED4 / DW12BTED4 / DW12C)*
     - **BMW** — *M54 2.2i, 2.5i, 3.0i 6 cylindres en ligne (M54B22 / M54B25 / M54B30)*
     - **Volvo** — *2.4 D5 5 cylindres 163 à 215 ch (D5244T / D5244T4 / D5244T10)*
     - **Land Rover / Jaguar** — *2.0 Ingenium Diesel 150 à 240 ch (AJ200D / 204DTD / 204DTA)*
     - **Tesla** — *Model 3 Propulsion RWD & Dual Motor AWD (Batterie 50 à 82 kWh)*
     - **Renault / Dacia / Nissan / Mercedes** — *1.3 TCe / DIG-T 100 à 160 ch (H5Ht / HR13DDT / M282)*
     - **Renault** — *1.2 16V 75 ch (D4F)*
     - **Peugeot / Citroën / Ford** — *1.4 HDi / TDCi 68 ch (DV4TD / 8HX / 8HZ)*
     - **Volkswagen / Audi / Seat / Skoda** — *1.4 TSI 122 à 150 ch EA211 courroie (CHPA / CZCA / CZEA)*
     - **Peugeot / Citroën / Mini / BMW** — *1.6 VTi / THP 120 à 200 ch (EP6 / N14 / N18)*
     - **Mercedes-Benz** — *2.1 / 2.2 CDI 122 à 170 ch (OM646 / OM646 EVO)*
     - **Saab** — *1.9 TiD 150 ch (Z19DTH - Base Fiat JTDm)*
     - **Volkswagen Golf VII** — *2.0 TDI 150 ch (CRBC / CRLB / DFGA)*
     - **Volkswagen Golf IV / Bora / Passat B5** — *1.9 TDI 90 à 150 ch (ALH / ASV / ATD / ASZ / ARL)*
     - **Volkswagen Golf VI / Polo V / Touran** — *1.6 TDI 90/105 ch (CAYB / CAYC)*
     - **Volkswagen Golf GTI / Golf R / Audi S3 / TT / A4 B8** — *2.0 TSI / TFSI EA888 (CCZB / CHHA / CJXC / DNU)*
     - **Renault Clio IV** — *1.5 dCi 90 ch (K9K 608 / 628)*
     - **Peugeot 208 I / II** — *1.2 PureTech 110/130 ch (EB2DT / EB2DTS)*
     - **Peugeot 308 II / 3008 II** — *1.5 BlueHDi 130 ch (DV5RC / YHZ)*
     - **BMW Série 3 F30 / Série 1 F20** — *2.0d 150/190 ch (B47D20A / B47D20B)*
     - **BMW Série 1 E87 / Série 3 E90 / X1 E84 / X3** — *2.0d 143/177/204 ch (N47D20A / N47D20C)*
     - **BMW Série 3 E46 / E90, Série 5 E39 / E60, X5** — *3.0d L6 184 à 286 ch (M57D30 / TU / TU2)*
     - **Mercedes-Benz Classe A, C, E, Sprinter** — *2.2 CDI 136 à 204 ch (OM651)*
     - **Fiat Punto / 500 / Panda & Opel Corsa / Astra** — *1.3 MultiJet / CDTI 70 à 95 ch (188A9000 / Z13DTJ)*
     - **Toyota Yaris III Hybride** — *1.5 HSD 100 ch (1NZ-FXE)*
     - **Toyota Corolla, Avensis II, RAV4 II / III** — *2.0 D-4D 116/126 ch (1CD-FTV / 1AD-FTV)*
     - **Ford Fiesta VII / Focus III/IV** — *1.0 EcoBoost 100/125 ch (M1DA / M2DA / SFJA)*

2. **Génération & Cache Automatique à la Volée (IA Gemini Flash)** :
   - Si vous recherchez un véhicule absent de la base locale (ex: *Audi A3 1.6 TDI*, *Toyota Yaris Hybride*, *Ford Fiesta 1.0 EcoBoost*...), l'application vous propose en un clic de générer la fiche technique standardisée complète via l'API **Gemini Flash**.
   - **Enregistrement automatique dans IndexedDB** : dès sa génération, la nouvelle fiche technique est sauvegardée dans le navigateur et devient accessible **définitivement hors-ligne** sans nouvelle consommation d'API.

---

## 📦 Modules & Fonctionnalités

### 1. Navigation & Recherche Universelle
- Recherche instantanée par marque, modèle ou code moteur.
- Autocomplétion et suggestions en temps réel.
- Filtres rapides : *Tous*, *Diesel*, *Essence*, *Base locale*, *Générés IA*.
- Historique chronologique des véhicules consultés récents et liste des favoris (⭐).

### 2. Fiche Technique Universelle (Par Onglets)
- **Fluides & Vidange** :
  - Huile moteur : viscosité, norme constructeur stricte (RN0720, VW 507.00, PSA B71 2010, BMW LL-04...), capacités avec/sans filtre, intervalle.
  - Bouchon de vidange : couple de serrage en Nm, dimensions du filetage et type de joint.
  - Liquide de refroidissement : spécification, capacité du circuit, intervalle de purge.
  - Liquide de frein : norme (DOT 4, basse viscosité ESP), intervalle de vidange.
  - Huile de boîte de vitesses : viscosité, contenance et périodicité.
- **Boîtes à Fusibles Interactives** :
  - Emplacements réels (habitacle sous volant, compartiment moteur UPC/BSM, coffre).
  - Tableau dynamique avec filtrage par nom d'équipement (ex: recherche "allume-cigare", "feux", "pompe").
  - Badges d'ampérage avec les **couleurs normalisées de l'industrie automobile (DIN 72581 / SAE J1284)** : 5A orange, 7.5A marron, 10A rouge, 15A bleu, 20A jaune, 25A blanc, 30A vert, etc.
- **Radioscopie & Fiabilité** :
  - Synthèse du bloc moteur.
  - Top pannes chroniques classées par gravité (*Critique*, *Moyenne*, *Faible*) avec symptômes, causes techniques et remèdes d'atelier.
  - Checklist d'inspection pour achat d'occasion.
  - Recommandations d'entretien préventif pour maximiser la longévité.
- **Distribution & Moteur** :
  - Type (courroie ou chaîne), préconisation kilométrique et durée maximale en années, notes atelier.
  - Code moteur, puissance ch / kW, couple Nm et cylindrée.
- **Actions** : impression / export PDF direct (`window.print()`) et bouton d'ajout direct au carnet de bord.

### 3. Module Carnet de Bord
- Enregistrement de vos véhicules personnels avec plaque d'immatriculation européenne/française stylisée, marque, modèle, kilométrage et année.
- Journal d'entretien chronologique : type d'intervention (vidange, distribution, freins, pneus...), date, kilométrage, coût en euros, notes et prochain rappel kilométrique.
- Calcul automatique des dépenses globales d'entretien.

### 4. Module Utilitaires Atelier
- **Convertisseur Pression** : conversion instantanée bidirectionnelle Bar <-> PSI avec raccourcis usuels (2.0, 2.3, 2.5, 3.0 Bar).
- **Convertisseur Couple de Serrage** : conversion bidirectionnelle Nm <-> ft-lb (pied-livre).
- **Aide-mémoire des couples de serrage types** : bouchons de vidange carter tôle/alu, jantes alu/acier, bougies d'allumage et cloches de filtre à huile.

### 5. Écran Paramètres & Configuration API
- Saisie sécurisée de votre clé API Google Gemini ([Google AI Studio](https://aistudio.google.com/)).
- Bouton **"Tester la connexion"** pour vérifier immédiatement la validité de votre clé.
- Choix du modèle Gemini (`gemini-2.5-flash` ou `gemini-1.5-flash`).
- Aucune clé inscrite en dur dans le code source.
- Gestion du stockage : affichage du nombre de fiches en mémoire, bouton pour vider le cache des fiches IA, bouton d'**exportation globale (JSON)** et bouton d'**importation**.

### 6. PWA & Fonctionnement Hors-Ligne
- Fichier `manifest.webmanifest` complet avec icônes haute résolution et raccourcis.
- Service Worker `sw.js` complet avec stratégie de cache Stale-While-Revalidate pour les assets et exclusion réseau propre pour l'API Gemini.
- Installable sur Android, iOS (Safari -> Ajouter à l'écran d'accueil) et Desktop (Chrome / Edge -> Installer l'application).

---

## 💻 Démarrage Local

Puisque MecanIQ est développée en **Vanilla JavaScript moderne (ES Modules)**, aucun build ou compilation n'est nécessaire.

Pour la lancer en local, utilisez simplement n'importe quel serveur HTTP statique :

### Option 1 : Avec Python
```bash
python -m http.server 8080
```
Puis ouvrez votre navigateur sur : `http://localhost:8080`

### Option 2 : Avec Node.js (`npx serve`)
```bash
npx serve .
```

### Option 3 : Extension VS Code "Live Server"
Faites un clic droit sur `index.html` -> **"Open with Live Server"**.
