/**
 * MecanIQ - Base de donnees locale de reference des vehicules (vehicles.json)
 * 106 Motorisations de reference d'atelier integrees par defaut
 */

export const INITIAL_VEHICLES = [
    {
        "id":  "vw_golf7_20tdi_crbc",
        "make":  "Volkswagen",
        "model":  "Golf VII (aussi Audi A3 8V / Seat Leon 3 / Skoda Octavia 3)",
        "generation":  "2012-2020",
        "engine":  {
                       "name":  "2.0 TDI 150 ch",
                       "code":  "CRBC / CRLB / DFGA",
                       "fuel":  "Diesel",
                       "displacement":  "1968 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-30",
                                          "norm":  "VW 507.00 (LL03)",
                                          "capacity_with_filter":  "4.6 L",
                                          "drain_plug_torque":  "30 Nm (vis M14x1.5 six pans creux ou Torx)"
                                      },
                       "coolant":  {
                                       "type":  "G12evo ou G13 (Rose/Violet)",
                                       "capacity":  "8.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Low Viscosity (norme VW 501.14)"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière vide-poche conducteur)",
                          "number":  "SC40",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Habitacle (derrière vide-poche conducteur)",
                          "number":  "SC12",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Commande climatisation"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SB)",
                          "number":  "SB10",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Calculateur moteur (ECU)"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Grippage de la pompe à eau à régulation pilotée provoquant surchauffe",
                                                   "Colmatage du radiateur de chauffage habitacle (dégradation sachet silicate réservoir G13)",
                                                   "Usure prématurée du volant moteur bi-masse (BVM) vers 180 000 km"
                                               ],
                            "buying_advice":  "Vérifier le bon fonctionnement du chauffage habitacle à chaud et s\u0027assurer du remplacement de la pompe à eau lors de la courroie."
                        }
    },
    {
        "id":  "renault_clio4_15dci_k9k",
        "make":  "Renault",
        "model":  "Clio IV (aussi Megane III/IV / Captur I / Dacia Duster)",
        "generation":  "2012-2019",
        "engine":  {
                       "name":  "1.5 dCi 90 ch",
                       "code":  "K9K 608 / K9K 628",
                       "fuel":  "Diesel",
                       "displacement":  "1461 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "RN0720 (obligatoire avec FAP)",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "20 Nm (vis empreinte carrée 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune/Vert)",
                                       "capacity":  "5.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "F18",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Essuie-glace avant"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "FM3",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Pompe à carburant / Injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Durite du capteur de pression différentielle FAP qui fissure avec l\u0027âge (voyant injection)",
                                                   "Encrassement régulier vanne EGR sur trajets péri-urbains courts",
                                                   "Fuite d\u0027air sur circuit de suralimentation (durite échangeur)"
                                               ],
                            "buying_advice":  "Moteur très résistant. Privilégier les révisions tous les 15 000 km plutôt que les 30 000 km constructeur."
                        }
    },
    {
        "id":  "peugeot_208_12puretech_eb2",
        "make":  "Peugeot",
        "model":  "208 I / II (aussi 2008 / Citroën C3 III / Opel Corsa F)",
        "generation":  "2015-2023",
        "engine":  {
                       "name":  "1.2 PureTech 110/130 ch",
                       "code":  "EB2DT / EB2DTS",
                       "fuel":  "Essence",
                       "displacement":  "1199 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 (révision constructeur) ou 0W-30",
                                          "norm":  "Stellantis FPW9.55535/03 ou PSA B71 2010",
                                          "capacity_with_filter":  "3.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "5.6 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 ESP"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière trappe gauche)",
                          "number":  "F7",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V avant"
                      },
                      {
                          "location":  "Habitacle (derrière trappe gauche)",
                          "number":  "F13",
                          "rating":  "5A",
                          "color":  "Beige",
                          "function":  "Écran tactile / Combiné"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F19",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Pulseur de climatisation"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Désagrégation de la courroie de distribution humide baignée dans l\u0027huile moteur",
                                                   "Obstruction de la crépine de pompe à huile par résidus de courroie (perte de pression)",
                                                   "Surconsommation d\u0027huile par gommage des segments"
                                               ],
                            "buying_advice":  "Contrôler la largeur de courroie par l\u0027orifice de remplissage d\u0027huile avec la jauge dédiée impérativement avant achat."
                        }
    },
    {
        "id":  "peugeot_308_15bluehdi_dv5",
        "make":  "Peugeot",
        "model":  "308 II / 3008 II (aussi Citroën C4 / DS7 / Opel Grandland)",
        "generation":  "2017-2022",
        "engine":  {
                       "name":  "1.5 BlueHDi 130 ch",
                       "code":  "DV5RC / YHZ",
                       "fuel":  "Diesel",
                       "displacement":  "1499 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 obligatoire",
                                          "norm":  "Stellantis FPW9.55535/03 (PSA B71 2010)",
                                          "capacity_with_filter":  "3.95 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc planche de bord)",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F21",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Pompe injection carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Rupture de la petite chaîne de synchronisation des arbres à cames (passage de 7 mm à 8 mm en SAV)",
                                                   "Défaillance de la pompe intégrée au réservoir AdBlue (cristallisation urée)",
                                                   "Fuite d\u0027huile carter palier arbre à cames"
                                               ],
                            "buying_advice":  "Vérifier si le rappel de la chaîne 8 mm et le réservoir AdBlue ont été pris en charge par le réseau."
                        }
    },
    {
        "id":  "bmw_serie3_f30_b47",
        "make":  "BMW",
        "model":  "Série 3 F30 / Série 1 F20 (aussi Mini Cooper D/SD F56)",
        "generation":  "2015-2019",
        "engine":  {
                       "name":  "2.0d 150/190 ch (318d / 320d)",
                       "code":  "B47D20A / B47D20B",
                       "fuel":  "Diesel",
                       "displacement":  "1995 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-30",
                                          "norm":  "BMW Longlife-04 (LL-04)",
                                          "capacity_with_filter":  "5.0 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 ou LC-18 (Bleu)",
                                       "capacity":  "7.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Coffre (sous plancher droit)",
                          "number":  "F143",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prises 12V habitacle et coffre"
                      },
                      {
                          "location":  "Pied passager avant (boîtier FEM)",
                          "number":  "F32",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Multimédia / Écran iDrive"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F47",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant basse pression"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite du radiateur EGR (rappel mondial BMW pour risque départ incendie)",
                                                   "Encrassement du collecteur d\u0027admission et des volets de turbulence",
                                                   "Sondes NOx amont/aval sensibles provoquant allumage voyant moteur"
                                               ],
                            "buying_advice":  "Vérifier impérativement en concession si la campagne de rappel de l\u0027échangeur EGR a été réalisée."
                        }
    },
    {
        "id":  "toyota_yaris3_hybrid_1nzfxe",
        "make":  "Toyota",
        "model":  "Yaris III Hybride (aussi Auris Hybride)",
        "generation":  "2012-2020",
        "engine":  {
                       "name":  "1.5 HSD Hybride 100 ch",
                       "code":  "1NZ-FXE",
                       "fuel":  "Essence Hybride",
                       "displacement":  "1497 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 0W-16",
                                          "norm":  "API SN/SP ou ILSAC GF-5/GF-6",
                                          "capacity_with_filter":  "3.7 L",
                                          "drain_plug_torque":  "37 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota Super Long Life Coolant (SLLC Rose)",
                                       "capacity":  "Moteur: 4.8 L / Inverseur hybride: 1.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous planche de bord à gauche)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "ECU-B",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Calculateur hybride et batterie"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "H-LP LO",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Feux de croisement"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Encrassement de la grille de ventilation de la batterie hybride (sous banquette arrière)",
                                                   "Décharge de la petite batterie 12V auxiliaire en cas d\u0027inutilisation prolongée",
                                                   "Mécanique thermique et boîte e-CVT extrêmement fiables (quasi aucune panne moteur)"
                                               ],
                            "buying_advice":  "Faire un bilan de santé de la batterie de traction hybride avec un rapport Toyota."
                        }
    },
    {
        "id":  "ford_fiesta7_10ecoboost",
        "make":  "Ford",
        "model":  "Fiesta VII / Focus III/IV",
        "generation":  "2013-2021",
        "engine":  {
                       "name":  "1.0 EcoBoost (100 / 125 ch)",
                       "code":  "M1DA / M2DA / SFJA",
                       "fuel":  "Essence",
                       "displacement":  "998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-20",
                                          "norm":  "Ford WSS-M2C948-B",
                                          "capacity_with_filter":  "4.1 L",
                                          "drain_plug_torque":  "28 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange/Rose)",
                                       "capacity":  "5.8 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 High Performance"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F11",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Calculateur moteur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Courroie de distribution lubrifiée (humide) se désagrégeant si l\u0027huile n\u0027a pas la norme Ford stricte",
                                                   "Rupture de la petite durite rigide de dégazage du liquide de refroidissement (surchauffe brutale)",
                                                   "Colmatage crépine de pompe à huile par résidus de courroie"
                                               ],
                            "buying_advice":  "Vérifier scrupuleusement les factures pour certifier l\u0027usage exclusif de la norme d\u0027huile Ford 948-B."
                        }
    },
    {
        "id":  "vag_19_tdi_asv_asz_arl",
        "make":  "Volkswagen",
        "model":  "Golf IV / Bora / Passat B5 (aussi Audi A3 8L, Seat Leon 1, Skoda Octavia 1)",
        "generation":  "1998-2005",
        "engine":  {
                       "name":  "1.9 TDI (90, 110 ch pompe rotative / 100, 130, 150 ch Injecteurs-Pompes)",
                       "code":  "ALH / ASV / ATD / ASZ / ARL",
                       "fuel":  "Diesel",
                       "displacement":  "1896 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 (Injecteur-Pompe) ou 10W-40 / 5W-40 (Pompe rotative)",
                                          "norm":  "VW 505.01 (obligatoire pour Injecteur-Pompe IP) / VW 505.00 (Pompe rotative)",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "30 Nm (vis six pans 19 mm, filetage M14x1.5)"
                                      },
                       "coolant":  {
                                       "type":  "G12 (Rose)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F28",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant"
                      },
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Sur batterie moteur",
                          "number":  "S162",
                          "rating":  "50A",
                          "color":  "Barrette métal",
                          "function":  "Bougies de préchauffage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Grippage de la géométrie variable du turbocompresseur (suie / perte de puissance à 3000 tr/min)",
                                                   "Encrassement du débitmètre massique d\u0027air Bosch",
                                                   "Usure de l\u0027arbre à cames et des poussoirs hydrauliques si l\u0027huile 505.01 n\u0027est pas scrupuleusement respectée sur les versions IP"
                                               ],
                            "buying_advice":  "Bloc légendaire pouvant dépasser 500 000 km. Vérifier que l\u0027accélération est linéaire sans coupure turbo (mode dégradé)."
                        }
    },
    {
        "id":  "vag_16_tdi_cayc",
        "make":  "Volkswagen",
        "model":  "Golf VI / Polo V / Touran (aussi Audi A1/A3, Seat Ibiza/Leon, Skoda Fabia/Octavia)",
        "generation":  "2009-2015",
        "engine":  {
                       "name":  "1.6 TDI 90 / 105 ch Common Rail",
                       "code":  "CAYB / CAYC",
                       "fuel":  "Diesel",
                       "displacement":  "1598 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "VW 507.00",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12++ ou G13 (Violet)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîte à fusibles tableau de bord)",
                          "number":  "F42",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F24",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Calculateur moteur et relais principal"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Défaillance fréquente des 4 injecteurs piézoélectriques Continental/VDO (claquements, ratés)",
                                                   "Fuite d\u0027eau ou blocage du module vanne EGR + refroidisseur situé derrière le bloc moteur (très long à remplacer)",
                                                   "FAP colmaté en cas d\u0027utilisation urbaine exclusive"
                                               ],
                            "buying_advice":  "Exiger l\u0027historique de remplacement des injecteurs et tester la régularité du ralenti à froid."
                        }
    },
    {
        "id":  "vag_20_tfsi_ea888",
        "make":  "Volkswagen",
        "model":  "Golf VI GTI / Golf VII GTI / R / Audi A4 B8 / Audi TT",
        "generation":  "2008-2020",
        "engine":  {
                       "name":  "2.0 TSI / TFSI (210 à 310 ch)",
                       "code":  "CCZB / CHHA / CJXC / DNU",
                       "fuel":  "Essence",
                       "displacement":  "1984 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 5W-30 (Gen 2/3) / 0W-20 (Gen 3B/4 VW 508.00)",
                                          "norm":  "VW 502.00 / 504.00 (Gen 2/3)",
                                          "capacity_with_filter":  "4.6 à 5.7 L selon génération",
                                          "drain_plug_torque":  "30 Nm (vis acier) ou quart de tour plastique sur carter plastique Gen 3"
                                      },
                       "coolant":  {
                                       "type":  "G13 ou G12evo",
                                       "capacity":  "8.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "SC40",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB23",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "EA888 Gen 2 (2008-2012) : Allongement de chaîne de distribution avec casse moteur et surconsommation d\u0027huile majeure (segments racleurs)",
                                                   "EA888 Gen 3 (dès 2013) : Fiabilisé sur chaîne et huile, mais fuites fréquentes sur le module boîte à eau / thermostat piloté en plastique",
                                                   "Grippage de la wastegate du turbocompresseur IS20/IS38"
                                               ],
                            "buying_advice":  "Sur versions 2008-2012, vérifier si les pistons/segments ont été modifiés et si le tendeur de chaîne est la dernière version."
                        }
    },
    {
        "id":  "bmw_20d_n47",
        "make":  "BMW",
        "model":  "Série 1 E87 / Série 3 E90 / X1 E84 / X3 E83-F25",
        "generation":  "2007-2014",
        "engine":  {
                       "name":  "2.0d (116d, 118d, 120d, 123d - 143/177/204 ch)",
                       "code":  "N47D20A / N47D20C",
                       "fuel":  "Diesel",
                       "displacement":  "1995 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "BMW Longlife-04",
                                          "capacity_with_filter":  "5.2 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 (Bleu)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F08",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Habitacle",
                          "number":  "F61",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Pulseur d\u0027air habitacle"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Défaut de conception majeur de la chaîne de distribution (située côté boîte de vitesses) : frottement, bruit de cigale, allongement et casse moteur",
                                                   "Amortisseur de vilebrequin (poulie damper) qui se fissure",
                                                   "Clapets d\u0027admission qui prennent du jeu (risque d\u0027ingestion par le moteur)"
                                               ],
                            "buying_advice":  "Écouter attentivement le bruit moteur vers 1500-2000 tr/min côté tablier à chaud. Privilégier les modèles avec chaîne déjà remplacée (facture à l\u0027appui)."
                        }
    },
    {
        "id":  "bmw_30d_m57",
        "make":  "BMW",
        "model":  "Série 3 E46 / E90, Série 5 E39 / E60, X5 E53 / E70",
        "generation":  "1998-2010",
        "engine":  {
                       "name":  "3.0d 6 cylindres en ligne (184, 193, 204, 218, 231, 286 ch)",
                       "code":  "M57D30 / M57TUD30 / M57TU2D30",
                       "fuel":  "Diesel",
                       "displacement":  "2926 à 2993 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "BMW LL-01 (sans FAP) ou LL-04 (avec FAP)",
                                          "capacity_with_filter":  "6.7 à 7.5 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87",
                                       "capacity":  "9.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Boîte à gants habitacle",
                          "number":  "F47",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise allume-cigare"
                      },
                      {
                          "location":  "Coffre à bagages",
                          "number":  "F74",
                          "rating":  "50A",
                          "color":  "Rouge",
                          "function":  "Relais pompe à carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Clapets de turbulence (swirl flaps) dans le collecteur d\u0027admission qui cassent et tombent dans les cylindres (suppression préventive recommandée)",
                                                   "Collecteur d\u0027échappement en tôle qui se fissure sur les versions E60/E90 (odeur d\u0027échappement dans l\u0027habitacle)",
                                                   "Thermostats moteur et EGR qui restent ouverts (le moteur ne monte plus à 90°C, empêchant les régénérations FAP)"
                                               ],
                            "buying_advice":  "Moteur extrêmement robuste (500 000 km sans forcer). Vérifier immédiatement la température moteur via le menu caché."
                        }
    },
    {
        "id":  "mercedes_22_cdi_om651",
        "make":  "Mercedes-Benz",
        "model":  "Classe A (W176), Classe C (W204, W205), Classe E (W212), Sprinter",
        "generation":  "2008-2020",
        "engine":  {
                       "name":  "2.2 CDI / 200 CDI / 220 CDI / 250 CDI (136 à 204 ch)",
                       "code":  "OM651",
                       "fuel":  "Diesel",
                       "displacement":  "2143 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "MB 229.51 ou MB 229.52",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.0 ou 325.5 (Bleu/Bleu-vert)",
                                       "capacity":  "8.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus (norme MB 331.0)"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc tableau de bord)",
                          "number":  "f9",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise de courant 12V avant"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SAM)",
                          "number":  "f22",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Gestion moteur CDI"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite d\u0027eau sur le boîtier de filtre à carburant / bride de liquide de refroidissement en plastique",
                                                   "Tendeur de chaîne de distribution à remplacer préventivement vers 200 000 km (bruit au démarrage à froid)",
                                                   "Injecteurs Delphi défaillants sur les premières versions 2008-2010 (rappel massif en atelier)"
                                               ],
                            "buying_advice":  "Très endurant et très économique. Surveiller les fuites de liquide de refroidissement sous le collecteur d\u0027admission."
                        }
    },
    {
        "id":  "fiat_opel_13_multijet",
        "make":  "Fiat",
        "model":  "Fiat Punto, 500, Panda, Doblo / Opel Corsa D, Astra H/J (1.3 CDTI)",
        "generation":  "2003-2020",
        "engine":  {
                       "name":  "1.3 MultiJet / 1.3 CDTI (70, 75, 85, 95 ch)",
                       "code":  "188A9000 / 199A2000 / Z13DTJ",
                       "fuel":  "Diesel",
                       "displacement":  "1248 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 (C2/C3)",
                                          "norm":  "Fiat 9.55535-S1/S2 ou Opel GM Dexos2",
                                          "capacity_with_filter":  "3.2 L (très faible contenance !)",
                                          "drain_plug_torque":  "20 Nm (clé Allen de 12 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Paraflu UP (Rouge)",
                                       "capacity":  "5.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîtier BSI)",
                          "number":  "F85",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F17",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Calculateur d\u0027injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Rupture de chaîne de distribution causée par un manque d\u0027huile ou une huile dégradée (la contenance n\u0027est que de 3,2L, la moindre baisse est fatale)",
                                                   "Dilution de l\u0027huile par le gazole lors des régénérations FAP avortées en ville",
                                                   "Vanne EGR très facilement encrassée"
                                               ],
                            "buying_advice":  "Vérifier le niveau d\u0027huile toutes les 2 semaines. Remplacer la chaîne préventivement à 150 000 km."
                        }
    },
    {
        "id":  "toyota_20_d4d_1cdftv_1adftv",
        "make":  "Toyota",
        "model":  "Corolla, Avensis II, RAV4 II / III",
        "generation":  "2001-2015",
        "engine":  {
                       "name":  "2.0 D-4D (116 ch 1CD-FTV / 126 ch 1AD-FTV)",
                       "code":  "1CD-FTV / 1AD-FTV",
                       "fuel":  "Diesel",
                       "displacement":  "1995 à 1998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "ACEA C2 (avec FAP) ou B4",
                                          "capacity_with_filter":  "5.9 à 6.3 L",
                                          "drain_plug_torque":  "38 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota SLLC (Rose)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous le tableau de bord à gauche)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare / Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "MAIN",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Injection et démarreur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "1AD-FTV (126 ch alu) : Problème de joint de culasse et tassement du plan de bloc provoquant surpression dans le bocal de liquide",
                                                   "1CD-FTV (116 ch fonte) : Soupapes SCV (régulateur de pression sur pompe Denso) grippées provoquant perte de puissance",
                                                   "Volant moteur bi-masse sensible sur RAV4"
                                               ],
                            "buying_advice":  "Sur le 126 ch (1AD), inspecter impérativement des traces blanches de liquide autour du bouchon de vase d\u0027expansion (signe de joint de culasse HS)."
                        }
    },
    {
        "id":  "renault_13_tce_h5ht",
        "group":  "Renault-Nissan-Daimler",
        "makes_compatible":  [
                                 "Renault",
                                 "Dacia",
                                 "Nissan",
                                 "Mercedes-Benz"
                             ],
        "models":  [
                       "Renault Clio V, Megane IV, Captur II, Arkana, Kadjar",
                       "Dacia Duster II",
                       "Nissan Qashqai II/III",
                       "Mercedes Classe A W177 (A160, A180, A200)"
                   ],
        "years":  "2018-2024",
        "engine":  {
                       "name":  "1.3 TCe / DIG-T (100, 130, 140, 160 ch)",
                       "code":  "H5Ht / HR13DDT / M282",
                       "fuel":  "Essence",
                       "displacement":  "1332 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "RN17 FE (0W-20) ou RN17 (5W-30) / MB 229.71",
                                          "capacity_with_filter":  "5.4 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D ou Glaceol RX Type E",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 ESP"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F14",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F02",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Allumage et injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Moteur bien plus fiable que l\u0027ancien 1.2 TCe, conçu en partenariat avec Daimler",
                                                   "Encrassement modéré des soupapes d\u0027admission (injection directe)",
                                                   "Thermostat piloté / boîte à eau plastique sujet à suintement vers 120 000 km"
                                               ],
                            "buying_advice":  "Très bonne mécanique essence moderne. Respecter impérativement la norme d\u0027huile RN17 pour préserver le filtre à particules essence (GPF)."
                        }
    },
    {
        "id":  "renault_12_16v_d4f",
        "make":  "Renault",
        "model":  "Twingo I/II, Clio II/III/IV, Modus (aussi Dacia Sandero I/II)",
        "generation":  "2000-2018",
        "engine":  {
                       "name":  "1.2 16V 75 ch",
                       "code":  "D4F 702 / 712 / 722 / 740",
                       "fuel":  "Essence",
                       "displacement":  "1149 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "10W-40 ou 5W-40",
                                          "norm":  "RN0700",
                                          "capacity_with_filter":  "4.0 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune)",
                                       "capacity":  "5.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe sous volant)",
                          "number":  "F3",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F1",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Pompe à carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Capteur PMH (point mort haut) encrassé : démarrage difficile ou impossible à chaud",
                                                   "Bobine d\u0027allumage monobloc jumostatique sensible à l\u0027humidité",
                                                   "Fuite d\u0027huile légère au joint de couvre-culasse"
                                               ],
                            "buying_advice":  "Moteur atmosphérique ultra-robuste, économique et facile à réparer à moindre coût."
                        }
    },
    {
        "id":  "psa_14_hdi_dv4",
        "make":  "Peugeot",
        "model":  "206, 207, 1007 (aussi Citroën C1, C2, C3 I/II, Ford Fiesta V/VI 1.4 TDCi)",
        "generation":  "2001-2015",
        "engine":  {
                       "name":  "1.4 HDi / TDCi 68 ch",
                       "code":  "DV4TD / 8HX / 8HZ",
                       "fuel":  "Diesel",
                       "displacement":  "1398 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 5W-30",
                                          "norm":  "PSA B71 2296 (sans FAP) ou B71 2290 (avec FAP)",
                                          "capacity_with_filter":  "3.8 L",
                                          "drain_plug_torque":  "25 Nm (vis six pans 21 mm avec joint cuivre)"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "5.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (BSI)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe de gavage carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite aux rondelles pare-flamme des injecteurs (bruit de \u0027pschitt pschitt\u0027 et suie noire)",
                                                   "Poire d\u0027amorçage de gazole et araignée d\u0027alimentation poreuses (désamorçage)",
                                                   "Très peu de pannes de turbo ou de bielle contrairement aux premiers 1.6 HDi"
                                               ],
                            "buying_advice":  "Remplacer impérativement les joints d\u0027injecteurs dès l\u0027apparition d\u0027un sifflement d\u0027air sous le cache moteur."
                        }
    },
    {
        "id":  "vag_14_tsi_ea211",
        "make":  "Volkswagen",
        "model":  "Golf VII, Polo V/VI, Touran (aussi Audi A3 8V, Seat Leon 3, Skoda Octavia 3)",
        "generation":  "2012-2020",
        "engine":  {
                       "name":  "1.4 TSI 122/125/140/150 ch (Distribution par courroie)",
                       "code":  "CHPA / CZCA / CZEA (ACT)",
                       "fuel":  "Essence",
                       "displacement":  "1395 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-30",
                                          "norm":  "VW 504.00 / 507.00",
                                          "capacity_with_filter":  "4.0 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G13 ou G12evo",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants conducteur)",
                          "number":  "SC40",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB23",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Moteur EA211 fiabilisé par rapport à l\u0027ancien 1.4 TSI EA111 (retour à la courroie de distribution)",
                                                   "Grippage de l\u0027axe de wastegate de turbocompresseur (voyant EPC)",
                                                   "Pompe à eau / thermostat avec fuite de liquide de refroidissement récurrente vers 100 000 km"
                                               ],
                            "buying_advice":  "Excellent moteur essence, à ne pas confondre avec l\u0027ancienne génération EA111 à chaîne fragile (Golf 5/6)."
                        }
    },
    {
        "id":  "psa_bmw_16_thp_vti_ep6",
        "make":  "Peugeot",
        "model":  "207, 208, 308, RCZ, 3008 I (aussi Citroën DS3/C4, Mini Cooper R56, BMW 116i F20)",
        "generation":  "2006-2018",
        "engine":  {
                       "name":  "1.6 VTi / THP (120, 150, 156, 175, 200 ch)",
                       "code":  "EP6 / EP6DT / EP6CDT / N14 / N18",
                       "fuel":  "Essence",
                       "displacement":  "1598 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-30",
                                          "norm":  "PSA B71 2290 ou B71 2312 / BMW LL-04",
                                          "capacity_with_filter":  "4.25 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F2",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Calculateur d\u0027injection et relais"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Décalage et allongement de la chaîne de distribution avec perte de calage (claquements métalliques à froid)",
                                                   "Pompe haute pression (HP) carburant qui flanche sur les versions turbo THP",
                                                   "Encrassement sévère des soupapes d\u0027admission (calamine) nécessitant un sablage aux coquilles de noix",
                                                   "Surconsommation d\u0027huile via le déshuileur de couvre-culasse"
                                               ],
                            "buying_advice":  "Moteur très délicat. Exiger les factures de remplacement du kit chaîne renforcé et de la pompe HP."
                        }
    },
    {
        "id":  "mercedes_21_cdi_om646",
        "make":  "Mercedes-Benz",
        "model":  "Classe C W203 / W204, Classe E W211, Vito / Viano W639, Sprinter",
        "generation":  "2002-2010",
        "engine":  {
                       "name":  "2.1 / 2.2 CDI (122, 136, 150, 170 ch)",
                       "code":  "OM646 / OM646 EVO",
                       "fuel":  "Diesel",
                       "displacement":  "2148 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "MB 229.3 (sans FAP) ou MB 229.51 (avec FAP)",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "30 Nm (vis six pans 13 mm)"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.0 (Bleu)",
                                       "capacity":  "9.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc tableau de bord)",
                          "number":  "F9",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SAM)",
                          "number":  "F43",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite aux joints pare-feu des injecteurs (\u0027peste noire\u0027 Mercedes : calamine recouvrant le puits d\u0027injecteur)",
                                                   "Blocage du verrou de colonne de direction (ELV / ESL) empêchant le démarrage",
                                                   "Bloc moteur en fonte avec chaîne double quasi-indestructible"
                                               ],
                            "buying_advice":  "L\u0027un des diesels les plus solides de chez Mercedes, capable de franchir 600 000 km. Inspecter la propreté du cache injecteurs."
                        }
    },
    {
        "id":  "saab_93_19_tid_z19dth",
        "make":  "Saab",
        "model":  "9-3 II (Sport-Hatch / Berline)",
        "generation":  "2004-2011",
        "engine":  {
                       "name":  "1.9 TiD 150 ch (16V)",
                       "code":  "Z19DTH (Base Fiat/GM JTDm)",
                       "fuel":  "Diesel",
                       "displacement":  "1910 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "GM-LL-B-025 ou GM Dexos2",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "20 Nm (vis Torx T45 ou clé Allen)"
                                      },
                       "coolant":  {
                                       "type":  "Glysantin G30 / GM Orange",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F10",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V console centrale"
                      },
                      {
                          "location":  "Compartiment Moteur (près de la batterie)",
                          "number":  "MAXI 1",
                          "rating":  "50A",
                          "color":  "Rouge",
                          "function":  "Bougies de préchauffage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Tringle des volets de turbulence (swirl flaps) sur collecteur d\u0027admission qui se décroche",
                                                   "Alternateur Denso 120A/140A qui grille fréquemment vers 140 000 km",
                                                   "Vanne EGR et FAP sensibles en cas de petits trajets"
                                               ],
                            "buying_advice":  "Excellente routière suédoise sur base mécanique italienne éprouvée. Vérifier que la tringle de commande des volets d\u0027admission est bien en place."
                        }
    },
    {
        "id":  "vag_12_tsi_ea111",
        "make":  "Volkswagen",
        "model":  "Polo V, Golf VI, Touran (aussi Audi A1 8X, Seat Ibiza IV/Leon 2, Skoda Fabia II)",
        "generation":  "2009-2015",
        "engine":  {
                       "name":  "1.2 TSI 85 / 105 ch (Distribution par chaîne)",
                       "code":  "CBZA / CBZB",
                       "fuel":  "Essence",
                       "displacement":  "1197 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "VW 504.00 / 507.00",
                                          "capacity_with_filter":  "3.9 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12++ ou G13 (Violet)",
                                       "capacity":  "5.6 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière volet sous volant)",
                          "number":  "F42",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F21",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobine d\u0027allumage double et bougies"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Allongement critique de la chaîne de distribution avec risque de décalage ou saut de dents au démarrage",
                                                   "Tendeur hydraulique de chaîne inefficace au démarrage à froid (claquement métallique de 2 à 3 secondes)",
                                                   "Actionneur de décharge du turbo (wastegate) qui grippe"
                                               ],
                            "buying_advice":  "Démarrer impérativement moteur froid pour écouter l\u0027absence totale de claquement de chaîne. Vérifier si le kit de chaîne modifié a été posé."
                        }
    },
    {
        "id":  "vag_30_tdi_v6_ea897",
        "make":  "Audi",
        "model":  "A4 B8/B9, A6 C6/C7, A8, Q5, Q7 (aussi VW Touareg II, Porsche Cayenne II)",
        "generation":  "2008-2020",
        "engine":  {
                       "name":  "3.0 V6 TDI (204, 245, 272 ch)",
                       "code":  "CDUC / CKVD / CRTD / CRTC",
                       "fuel":  "Diesel",
                       "displacement":  "2967 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-30",
                                          "norm":  "VW 507.00 (LongLife III)",
                                          "capacity_with_filter":  "6.4 à 7.3 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12evo ou G13",
                                       "capacity":  "11.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc montant gauche conducteur)",
                          "number":  "Rouge 4",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V allume-cigare"
                      },
                      {
                          "location":  "Coffre (côté droit)",
                          "number":  "Marron 2",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant immergée"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite d\u0027huile ou de liquide de refroidissement dans le \u0027V\u0027 central du moteur (clapet d\u0027arrêt / refroidisseur d\u0027huile)",
                                                   "Bruit de chaîne de distribution au démarrage côté tablier (tendeurs hydrauliques supérieurs à remplacer)",
                                                   "Volets tubulures d\u0027admission (collecteurs d\u0027air) qui prennent du jeu (défaut P2015)"
                                               ],
                            "buying_advice":  "V6 autoroutier d\u0027une endurance remarquable. Contrôler au miroir l\u0027absence d\u0027accumulation de liquide au fond du V moteur."
                        }
    },
    {
        "id":  "psa_14_tu_tu3",
        "make":  "Peugeot",
        "model":  "206, 106, 207, 306, Partner (aussi Citroën Saxo, C2, C3 I, Xsara, Berlingo I)",
        "generation":  "1996-2012",
        "engine":  {
                       "name":  "1.4i 75 ch (8 soupapes)",
                       "code":  "TU3A / TU3JP / KFW / KFX",
                       "fuel":  "Essence",
                       "displacement":  "1360 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "10W-40 ou 5W-40",
                                          "norm":  "PSA B71 2294 ou B71 2296",
                                          "capacity_with_filter":  "3.25 L",
                                          "drain_plug_torque":  "30 Nm (vis six pans 21 mm ou carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110 (Bleu/Vert)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (platine fusible BSI)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F15",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite d\u0027huile externe classique au joint de culasse à l\u0027angle avant droit au-dessus de l\u0027alternateur (passage d\u0027huile sous pression)",
                                                   "Moteur pas-à-pas de régulation de ralenti encrassé (calage aux carrefours)",
                                                   "Bobine d\u0027allumage monobloc compacte (Sagem/Bouic) qui claque avec l\u0027âge"
                                               ],
                            "buying_advice":  "Inspecter l\u0027alternateur : s\u0027il est gras d\u0027huile, le joint de culasse suinte sur son passage d\u0027huile extérieur (panne historique archi-connue mais peu coûteuse à réparer)."
                        }
    },
    {
        "id":  "psa_22_hdi_dw12",
        "make":  "Peugeot",
        "model":  "406, 407, 607, 508 I, Boxer (aussi Citroën C5 I/II, C6, C-Crosser, Jumper)",
        "generation":  "2000-2016",
        "engine":  {
                       "name":  "2.2 HDi (133 ch monoturbo / 170 à 204 ch bi-turbo)",
                       "code":  "DW12TED4 (4HX) / DW12BTED4 (4HT) / DW12C",
                       "fuel":  "Diesel",
                       "displacement":  "2179 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 (C2)",
                                          "norm":  "PSA B71 2290",
                                          "capacity_with_filter":  "5.25 L",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "9.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe de gavage basse pression"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Poumon de commande du volet swirl (diaphragme percé causant des trous à l\u0027accélération)",
                                                   "Système bi-turbo séquentiel sur versions 170/204 ch : électrovannes et dépressions de commande complexes",
                                                   "Injecteurs fortement grippés dans le puits de culasse sur versions utilitaires Boxer/Jumper (démontage très difficile)"
                                               ],
                            "buying_advice":  "Routière exceptionnelle de confort et de couple. Vérifier que les montées en régime après 2500 tr/min sont franches (bascule 2e turbo)."
                        }
    },
    {
        "id":  "bmw_6cyl_m54",
        "make":  "BMW",
        "model":  "Série 3 E46 (320i, 325i, 330i), Série 5 E39/E60, X3 E83, X5 E53, Z4 E85",
        "generation":  "2000-2006",
        "engine":  {
                       "name":  "2.2i, 2.5i, 3.0i 6 cylindres en ligne",
                       "code":  "M54B22 / M54B25 / M54B30",
                       "fuel":  "Essence",
                       "displacement":  "2171 à 2979 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "BMW Longlife-01 (LL-01)",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 (Bleu)",
                                       "capacity":  "8.5 à 10.5 L selon boîte"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (haut boîte à gants)",
                          "number":  "F47",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Habitacle",
                          "number":  "F28",
                          "rating":  "5A",
                          "color":  "Beige",
                          "function":  "Combiné d\u0027instruments"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Déshuileur / séparateur d\u0027huile (CCV) et ses durites qui durcissent et cassent (surconsommation d\u0027huile et fumée bleue)",
                                                   "Joints du système double VANOS durcis provoquant un manque de couple sous 3000 tr/min",
                                                   "Vase d\u0027expansion en plastique qui se fissure brutalement avec surchauffe (à remplacer tous les 100 000 km en préventif)"
                                               ],
                            "buying_advice":  "Monument de sonorité et de plaisir. Prévoir la réfection complète du système de refroidissement (bocal, pompe, thermostat) si historique flou."
                        }
    },
    {
        "id":  "volvo_24_d5_d5244t",
        "make":  "Volvo",
        "model":  "S60 I/II, V70 II/III, XC70, S80, XC90 I",
        "generation":  "2001-2015",
        "engine":  {
                       "name":  "2.4 D5 5 cylindres en ligne (163, 185, 205, 215 ch)",
                       "code":  "D5244T / D5244T4 / D5244T10",
                       "fuel":  "Diesel",
                       "displacement":  "2400 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 (Euro 4/5) ou 5W-40 (Euro 3 sans FAP)",
                                          "norm":  "Volvo VCC 95200377 / ACEA A5/B5",
                                          "capacity_with_filter":  "5.9 L",
                                          "drain_plug_torque":  "38 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Volvo Coolant VCS (Jaune)",
                                       "capacity":  "8.5 à 11.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (côté gauche planche de bord)",
                          "number":  "F22",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V habitacle / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F35",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines/Injecteurs/Calculateur moteur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Biellette de commande des volets de turbulence (swirl) qui saute sur le dessus de culasse (Euro 4 185 ch)",
                                                   "Courroie d\u0027accessoires qui peut s\u0027effilocher et passer dans la distribution (casse moteur fatale) : tendeur à changer scrupuleusement",
                                                   "Niveau d\u0027huile qui monte par dilution de gasoil lors des régénérations FAP répétées"
                                               ],
                            "buying_advice":  "Le légendaire 5 pattes Volvo : acoustique unique et longévité exceptionnelle (500 000 km réguliers). Vérifier impérativement l\u0027état de la courroie d\u0027accessoires."
                        }
    },
    {
        "id":  "landrover_20_ingenium_aj200d",
        "make":  "Land Rover",
        "model":  "Range Rover Evoque I/II, Discovery Sport, Velar, Jaguar F-Pace / XE / XF",
        "generation":  "2015-2022",
        "engine":  {
                       "name":  "2.0 eD4 / TD4 / D180 / D240 Ingenium Diesel (150, 180, 240 ch)",
                       "code":  "AJ200D / 204DTD / 204DTA",
                       "fuel":  "Diesel",
                       "displacement":  "1999 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30",
                                          "norm":  "STJLR.03.5007",
                                          "capacity_with_filter":  "6.5 à 7.2 L",
                                          "drain_plug_torque":  "24 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Havoline XLC / STJLR.651.5003 (Orange)",
                                       "capacity":  "9.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Low Viscosity"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F52",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prises accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F13",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Pompe d\u0027alimentation en carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Allongement et rupture des chaînes de distribution situées à l\u0027arrière du moteur (claquement métallique à froid, dépose moteur nécessaire)",
                                                   "Dilution massive du gasoil dans l\u0027huile moteur par les cycles d\u0027injection DPF (l\u0027huile perd son pouvoir lubrifiant)",
                                                   "Usure prématurée des coussinets de bielle et du turbo par huile contaminée"
                                               ],
                            "buying_advice":  "Moteur sous haute surveillance. Raccourcir impérativement l\u0027intervalle de vidange à 10 000 - 12 000 km (ignorer les 34 000 km préconisés par la marque)."
                        }
    },
    {
        "id":  "tesla_model3_standard_lr",
        "make":  "Tesla",
        "model":  "Model 3 (Standard Range Plus / Long Range / Performance)",
        "generation":  "2018-2024",
        "engine":  {
                       "name":  "Électrique RWD (Propulsion) ou Dual Motor AWD (Transmission Intégrale)",
                       "code":  "3D1 / 3D3 / 3D7",
                       "fuel":  "Électrique",
                       "displacement":  "Batterie 50 à 82 kWh"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "Huile de transmission réducteur (Drive Unit) : SK Lubricants ATF D971 ou Mobil 1 Synthetic LV ATF HP",
                                          "norm":  "Tesla spec 1031102-00-A",
                                          "capacity_with_filter":  "Moteur arrière : ~2.1 L / Moteur avant AWD : ~1.2 L",
                                          "drain_plug_torque":  "20 Nm (bouchon magnétique)"
                                      },
                       "coolant":  {
                                       "type":  "Tesla G-48 Ethylene Glycol 50/50 (Bleu/Turquoise) ou Zerex G48",
                                       "capacity":  "Circuit complet batterie et octovalve : ~12.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 High Temp / DOT 5.1 (remplacement recommandé tous les 2 à 4 ans)"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Système Basse Tension (VCFRONT / eFuse électroniques)",
                          "number":  "eFuse virtuel",
                          "rating":  "Contrôle électronique",
                          "color":  "Sans fusible verre classique",
                          "function":  "Prise 12V/16V console centrale gérée par contrôleur de caisse"
                      },
                      {
                          "location":  "Sous banquette arrière (Pack Haute Tension)",
                          "number":  "Pyro-fuse",
                          "rating":  "Pyrotechnique",
                          "color":  "Orange",
                          "function":  "Déconnexion de sécurité haute tension en cas de crash"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Jeu et grincement prématuré des rotules et triangles de suspension avant supérieurs",
                                                   "Grippage des étriers de frein arrière par manque d\u0027utilisation (due au freinage régénératif)",
                                                   "Condensation dans les blocs optiques arrière"
                                               ],
                            "buying_advice":  "Inspecter visuellement l\u0027usure régulière des trains roulants et tester le freinage mécanique classique pour dégripper les disques."
                        }
    },
    {
        "id":  "renault_16_dci_r9m",
        "group":  "Renault-Nissan",
        "makes_compatible":  [
                                 "Renault",
                                 "Nissan",
                                 "Mercedes-Benz"
                             ],
        "models":  [
                       "Renault Megane III/IV, Scenic III/IV, Kadjar, Talisman, Espace V, Trafic III",
                       "Nissan Qashqai I/II, X-Trail III",
                       "Mercedes Classe C W205 (C180d/C200d)"
                   ],
        "years":  "2011-2020",
        "engine":  {
                       "name":  "1.6 dCi (130 ch monoturbo / 160 ch Twin-Turbo)",
                       "code":  "R9M 402 / 450 / 452 (OM626 chez Mercedes)",
                       "fuel":  "Diesel",
                       "displacement":  "1598 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "RN0720 (Euro 5) ou RN17 (Euro 6)",
                                          "capacity_with_filter":  "5.5 L (monoturbo) à 6.7 L (Twin-Turbo / Trafic)",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune/Vert)",
                                       "capacity":  "7.0 à 8.5 L selon modèle"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe sous volant)",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "FM3",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Calculateur d\u0027injection et électrovannes"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fissuration du volet d\u0027échappement basse pression (EGR BP) provoquant des à-coups et voyant injection",
                                                   "Sur version Twin-Turbo 160 ch : usure du petit turbo haute pression et fuites de liquide au refroidisseur intermédiaire",
                                                   "Sondes de température d\u0027échappement fragiles"
                                               ],
                            "buying_advice":  "La version 130 ch monoturbo est nettement plus robuste et fiable à long terme que le Twin-Turbo 160 ch."
                        }
    },
    {
        "id":  "fiat_psa_20_multijet_dw10fu",
        "group":  "Stellantis",
        "makes_compatible":  [
                                 "Fiat",
                                 "Peugeot",
                                 "Citroën",
                                 "Opel"
                             ],
        "models":  [
                       "Fiat Ducato III, Scudo",
                       "Peugeot Boxer II, Expert",
                       "Citroën Jumper II, Jumpy",
                       "Opel Vivaro C, Movano C"
                   ],
        "years":  "2016-2024",
        "engine":  {
                       "name":  "2.0 BlueHDi / Multijet (120, 140, 160, 180 ch)",
                       "code":  "DW10FUC / DW10FUD / AH01 / AH02",
                       "fuel":  "Diesel",
                       "displacement":  "1997 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 obligatoire",
                                          "norm":  "PSA B71 2312",
                                          "capacity_with_filter":  "6.1 L",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "10.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (planche de bord côté conducteur)",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V tableau de bord"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F18",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Préchauffage et réchauffeur gazole"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Injecteur d\u0027urée AdBlue sujet à cristallisation rapide",
                                                   "Fuite d\u0027huile au carter de distribution plastique",
                                                   "Grippage du doseur d\u0027air double sur le circuit d\u0027admission"
                                               ],
                            "buying_advice":  "Très bon moteur utilitaire pour le couple et la charge, mais exige de l\u0027huile stricte PSA 2312 pour éviter l\u0027encrassement FAP/SCR."
                        }
    },
    {
        "id":  "vag_16_mpi_ea113",
        "make":  "Volkswagen",
        "model":  "Golf IV, Golf V, Bora, Touran (aussi Audi A3 8L/8P, Seat Leon 1/2, Skoda Octavia 1/2)",
        "generation":  "1997-2010",
        "engine":  {
                       "name":  "1.6 MPI 102 ch (8 soupapes)",
                       "code":  "BGU / BSE / BSF / CCSA",
                       "fuel":  "Essence",
                       "displacement":  "1595 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "VW 502.00",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12 ou G12+ (Rose)",
                                       "capacity":  "6.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc tableau de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F10",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Bobines et gestion moteur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Boîtier papillon motorisé encrassé (instabilité du ralenti et calage)",
                                                   "Module de bobine d\u0027allumage fissuré provoquant des ratés d\u0027allumage par temps humide",
                                                   "Thermostat d\u0027eau à commande mécanique qui reste bloqué ouvert"
                                               ],
                            "buying_advice":  "Mécanique atmosphérique d\u0027une simplicité totale, très bon marché à l\u0027entretien, compatible avec les kits bioéthanol."
                        }
    },
    {
        "id":  "bmw_20i_b48",
        "make":  "BMW",
        "model":  "Série 1 F20/F40, Série 3 F30/G20, Série 4, X1 F48, X3 G01 (aussi Mini Cooper S F56)",
        "generation":  "2015-2024",
        "engine":  {
                       "name":  "2.0i TwinPower Turbo (184, 192, 252, 306 ch)",
                       "code":  "B48B20A / B48B20B",
                       "fuel":  "Essence",
                       "displacement":  "1998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "BMW Longlife-17 FE+ ou Longlife-04 / LL-01",
                                          "capacity_with_filter":  "5.25 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 ou LC-18",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Coffre (côté droit)",
                          "number":  "F143",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V console"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F42",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Durite de retour de liquide de refroidissement en plastique reliant la culasse au vase d\u0027expansion qui devient cassante",
                                                   "Boîtier de filtre à huile / échangeur thermique en plastique qui fissure et fuit l\u0027huile/liquide",
                                                   "Pompe à eau électrique à surveiller après 120 000 km"
                                               ],
                            "buying_advice":  "L\u0027un des 4 cylindres essence les plus fiables et performants de sa génération. Remplacer préventivement la petite durite de purge d\u0027eau rigide."
                        }
    },
    {
        "id":  "mercedes_18_cgi_kompressor_m271",
        "make":  "Mercedes-Benz",
        "model":  "Classe C W203 / W204 (C180, C200, C250), Classe E W211 / W212, SLK R171",
        "generation":  "2002-2015",
        "engine":  {
                       "name":  "1.8 Kompressor / CGI Turbo (143, 156, 184, 204 ch)",
                       "code":  "M271.946 / M271.820 / M271.860",
                       "fuel":  "Essence",
                       "displacement":  "1796 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "MB 229.3 ou MB 229.5",
                                          "capacity_with_filter":  "5.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.0 (Bleu)",
                                       "capacity":  "8.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "f9",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SAM)",
                          "number":  "f23",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Électroaimants d\u0027arbre à cames"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée des pignons de déphaseurs d\u0027arbre à cames et allongement de la chaîne simple (dents de pignons qui s\u0027arrondissent)",
                                                   "Remontée d\u0027huile par capillarité à travers les connecteurs d\u0027électroaimants d\u0027arbres à cames jusque dans le calculateur moteur (ECU)",
                                                   "Durite de reniflard d\u0027huile sous le collecteur d\u0027admission qui se déchire (prise d\u0027air au ralenti)"
                                               ],
                            "buying_advice":  "Vérifier impérativement si les faisceaux bloqueurs d\u0027huile (adaptateurs Mercedes) ont été installés sur les deux électroaimants en façade."
                        }
    },
    {
        "id":  "nissan_renault_16_hr16de",
        "make":  "Nissan",
        "model":  "Juke I, Qashqai I, Micra K12/K13 (aussi Renault Captur I, Dacia Duster I/II 1.6 SCe)",
        "generation":  "2006-2020",
        "engine":  {
                       "name":  "1.6 16V 115 ch (Atmosphérique)",
                       "code":  "HR16DE / H4M",
                       "fuel":  "Essence",
                       "displacement":  "1598 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "API SN ou ACEA A3/B4 (RN0700 chez Renault)",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Nissan L248 ou Glaceol RX Type D",
                                       "capacity":  "6.3 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "F13",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (IPDM)",
                          "number":  "F42",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Moteur à chaîne extrêmement fiable sans turbo ni injection directe complexe",
                                                   "Collecteur d\u0027admission devant être déposé pour changer les bougies d\u0027allumage",
                                                   "Sur Dacia Duster : consommation d\u0027huile modérée à surveiller sur autoroute soutenue"
                                               ],
                            "buying_advice":  "Excellente alternative aux petits moteurs 1.2 turbos fragiles. Robuste et tolérant, adapté aux gros kilométrages."
                        }
    },
    {
        "id":  "renault_20_dci_m9r",
        "group":  "Renault-Nissan",
        "makes_compatible":  [
                                 "Renault",
                                 "Nissan"
                             ],
        "models":  [
                       "Renault Laguna III, Megane III, Espace IV/V, Koleos I/II, Trafic II/III",
                       "Nissan Qashqai I (2.0 dCi), X-Trail II"
                   ],
        "years":  "2006-2022",
        "engine":  {
                       "name":  "2.0 dCi (130, 150, 175, 180, 200 ch)",
                       "code":  "M9R 700 / 800 / 814 / 858",
                       "fuel":  "Diesel",
                       "displacement":  "1995 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "RN0720 (avec FAP) ou RN17 (versions récentes)",
                                          "capacity_with_filter":  "6.6 à 7.4 L selon carter",
                                          "drain_plug_torque":  "30 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune/Vert)",
                                       "capacity":  "8.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe sous volant)",
                          "number":  "F12",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "FM3",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Injection et pompe gazole"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Moteur à chaîne extrêmement robuste, l\u0027un des diesels modernes les plus fiables de Renault",
                                                   "Capteur de pression différentielle FAP et ses durites caoutchouc à surveiller après 180 000 km",
                                                   "Injecteurs piézoélectriques Bosch pouvant se gripper dans la culasse sur Trafic (humidité baie de pare-brise)"
                                               ],
                            "buying_advice":  "Excellente motorisation pour tracter ou faire de l\u0027autoroute. Bloc capable d\u0027atteindre 400 000 km sans intervention lourde."
                        }
    },
    {
        "id":  "psa_16_bluehdi_dv6fc",
        "make":  "Peugeot",
        "model":  "208 I, 308 II, 2008 I, 3008 II (aussi Citroën C3 III, C4 Cactus, C4 Picasso II)",
        "generation":  "2014-2019",
        "engine":  {
                       "name":  "1.6 BlueHDi 100 / 120 ch (8 soupapes Euro 6)",
                       "code":  "DV6FD (100 ch) / DV6FC (120 ch)",
                       "fuel":  "Diesel",
                       "displacement":  "1560 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 obligatoire",
                                          "norm":  "PSA B71 2312",
                                          "capacity_with_filter":  "3.75 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 ESP"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare / Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F21",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Calculateur moteur et préchauffage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Défaillance de la pompe intégrée au réservoir AdBlue (mise en sécurité avec compte à rebours de démarrage)",
                                                   "Injecteur d\u0027urée AdBlue encrassé par des cristaux blancs en amont du SCR",
                                                   "Bloc mécanique 8 soupapes fiabilisé par rapport aux anciens DV6 16 soupapes (plus de problème de turbo récurrent)"
                                               ],
                            "buying_advice":  "Vérifier si le réservoir d\u0027AdBlue a déjà été remplacé sous garantie constructeur."
                        }
    },
    {
        "id":  "vag_10_tsi_ea211",
        "make":  "Volkswagen",
        "model":  "Polo VI, Golf VII/VIII, T-Roc, T-Cross (aussi Audi A1 GB, Seat Ibiza V/Arona, Skoda Fabia III/IV/Kamiq)",
        "generation":  "2015-2024",
        "engine":  {
                       "name":  "1.0 TSI 3 cylindres (95, 110, 115 ch)",
                       "code":  "CHZB / CHZC / DKLA / DKRF",
                       "fuel":  "Essence",
                       "displacement":  "999 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 (norme VW 508.00) ou 5W-30 (VW 504.00)",
                                          "norm":  "VW 508.00 / 509.00 (recommandation stricte pour consommation/émissions)",
                                          "capacity_with_filter":  "4.0 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12evo ou G13",
                                       "capacity":  "5.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière volet boîte à fusibles conducteur)",
                          "number":  "SC40",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB18",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage crayon"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Courroie de distribution à sec fiable (remplacement constructeur espacé mais conseillé à 160 000 km)",
                                                   "Tige de commande d\u0027actuateur de wastegate turbo sensible au jeu",
                                                   "Pompe à eau avec thermostat piloté sujette à suintements réguliers"
                                               ],
                            "buying_advice":  "Petit moteur nerveux et très sobre. Respecter impérativement la viscosité 0W-20 verte sous norme VW 508.00."
                        }
    },
    {
        "id":  "bmw_30d_b57",
        "make":  "BMW",
        "model":  "Série 3 G20 (330d), Série 5 G30 (530d/540d), X3 G01, X5 G05",
        "generation":  "2015-2024",
        "engine":  {
                       "name":  "3.0d 6 cylindres en ligne (265, 320, 340, 400 ch M50d)",
                       "code":  "B57D30A / B57D30B / B57D30C",
                       "fuel":  "Diesel",
                       "displacement":  "2993 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 ou 5W-30",
                                          "norm":  "BMW Longlife-12 FE ou Longlife-04",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-18 ou LC-87",
                                       "capacity":  "9.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Coffre (plancher droit)",
                          "number":  "F218",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F52",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Gestion moteur DDE"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Refroidisseur de vanne EGR sujet à fuite interne (objet de campagnes de rappel constructeur)",
                                                   "Système SCR AdBlue à double injection (sondes NOx sensibles)",
                                                   "Chaîne de distribution renforcée par rapport aux blocs N57 précédents"
                                               ],
                            "buying_advice":  "Moteur d\u0027autoroute de très haut niveau. Exiger l\u0027attestation du rappel de refroidisseur EGR en concession BMW."
                        }
    },
    {
        "id":  "ford_20_ecoblue_panther",
        "make":  "Ford",
        "model":  "Transit Custom, Transit 2T, Focus IV, Kuga II/III, Mondeo V",
        "generation":  "2016-2024",
        "engine":  {
                       "name":  "2.0 TDCi EcoBlue (105, 130, 170, 185 ch)",
                       "code":  "Panther / YLF6 / YMF6 / YNF6 / BC2X",
                       "fuel":  "Diesel",
                       "displacement":  "1995 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20",
                                          "norm":  "Ford WSS-M2C952-A1",
                                          "capacity_with_filter":  "8.5 à 9.1 L (utilitaire)",
                                          "drain_plug_torque":  "24 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange)",
                                       "capacity":  "10.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière trappe conducteur)",
                          "number":  "F47",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V console"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F16",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Injecteurs et pompe carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Courroie de distribution lubrifiée (baignée dans l\u0027huile) qui se détériore prématurément si l\u0027huile 952-A1 n\u0027est pas scrupuleusement respectée",
                                                   "Injecteurs Continental sensibles provoquant claquements et trous à l\u0027accélération",
                                                   "Dilution d\u0027huile par le gazole nécessitant de rapprocher les vidanges à 15 000 km max sur utilitaire"
                                               ],
                            "buying_advice":  "Vérifier impérativement la conformité de l\u0027huile moteur sur chaque facture pour préserver la courroie immergée."
                        }
    },
    {
        "id":  "fiat_alfa_14_tjet_multiair",
        "make":  "Fiat",
        "model":  "Fiat 500 Abarth 595/695, Tipo II, Bravo II, Punto Evo (aussi Alfa Romeo Giulietta, MiTo, Jeep Renegade)",
        "generation":  "2007-2022",
        "engine":  {
                       "name":  "1.4 T-Jet / MultiAir Turbo (120, 140, 160, 170, 180 ch)",
                       "code":  "198A4000 / 940A2000 / 955A8000",
                       "fuel":  "Essence",
                       "displacement":  "1368 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 (T-Jet) ou 0W-30 / 5W-40 C3 (MultiAir / Abarth)",
                                          "norm":  "Fiat 9.55535-S2 (T-Jet/MultiAir) ou 9.55535-GH2 (Abarth)",
                                          "capacity_with_filter":  "3.5 L",
                                          "drain_plug_torque":  "22 Nm (clé Allen 12 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Paraflu UP (Rouge)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîtier BSI)",
                          "number":  "F85",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F18",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage et calculateur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Sur version MultiAir : panne du module électro-hydraulique MultiAir (actionneurs de soupapes) en cas de vidange tardive ou huile non conforme",
                                                   "Fissuration du carter d\u0027échappement du turbo IHI VL36/VL38 autour du clapet de wastegate",
                                                   "La version T-Jet classique (sans MultiAir) est en revanche réputée pour sa robustesse mécanique"
                                               ],
                            "buying_advice":  "Sur moteur MultiAir, exiger la preuve de vidanges annuelles avec le petit filtre tamis du module MultiAir remplacé régulièrement."
                        }
    },
    {
        "id":  "toyota_18_hsd_2zr_fxe",
        "make":  "Toyota",
        "model":  "Prius III/IV, Auris II Hybride, Corolla XII, C-HR (aussi Lexus CT200h)",
        "generation":  "2009-2023",
        "engine":  {
                       "name":  "1.8 HSD Hybride (122 / 136 ch système)",
                       "code":  "2ZR-FXE",
                       "fuel":  "Essence Hybride",
                       "displacement":  "1798 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 (recommandé) ou 5W-30",
                                          "norm":  "API SN/SP / ILSAC GF-5/GF-6",
                                          "capacity_with_filter":  "4.2 L",
                                          "drain_plug_torque":  "37 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota SLLC (Rose)",
                                       "capacity":  "Moteur : 5.8 L / Inverseur hybride : 1.9 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "HEV",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Système hybride et relais haute tension"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Encrassement du conduit et du refroidisseur de vanne EGR (vibrations et bruits métalliques au redémarrage moteur)",
                                                   "Joint de culasse sensible au-delà de 250 000 km si le circuit EGR reste colmaté",
                                                   "Pompe à eau électrique moteur à remplacer préventivement vers 200 000 km"
                                               ],
                            "buying_advice":  "Endurance remarquable (couramment plus de 400 000 km). Nettoyer le circuit EGR complet tous les 150 000 km."
                        }
    },
    {
        "id":  "hyundai_kia_16_crdi_d4fb",
        "make":  "Hyundai",
        "model":  "Hyundai i30 I/II/III, Tucson / Kia Ceed I/II/III, Sportage III/IV",
        "generation":  "2007-2021",
        "engine":  {
                       "name":  "1.6 CRDi (90, 110, 115, 128, 136 ch)",
                       "code":  "D4FB / U-Line",
                       "fuel":  "Diesel",
                       "displacement":  "1582 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "ACEA C2 ou C3",
                                          "capacity_with_filter":  "5.3 L",
                                          "drain_plug_torque":  "40 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Liquide antigel phosphate vert ou rose Hyundai/Kia",
                                       "capacity":  "6.8 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc planche de bord gauche)",
                          "number":  "POWER OUTLET",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "ECU 1",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Calculateur moteur et injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Crépine de réservoir de carburant bouchée par un dépôt bactérien/algues (perte de puissance brutale en charge)",
                                                   "Allongement de la chaîne de distribution sur les premières séries (bruit métallique au ralenti)",
                                                   "Actionneur de géométrie variable de turbo sensible à l\u0027oxydation"
                                               ],
                            "buying_advice":  "Moteur diesel très répandu et robuste. Vérifier la propreté du puits de jauge et du filtre à gasoil en cas de ratés."
                        }
    },
    {
        "id":  "psa_20_bluehdi_dw10fc",
        "make":  "Peugeot",
        "model":  "Peugeot 308 II, 3008 II, 508 I/II, 5008 II (aussi Citroën C4 Picasso II, C5 Aircross, DS7 Crossback)",
        "generation":  "2014-2022",
        "engine":  {
                       "name":  "2.0 BlueHDi 150 / 180 ch",
                       "code":  "DW10FD (150 ch) / DW10FC (180 ch)",
                       "fuel":  "Diesel",
                       "displacement":  "1997 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30",
                                          "norm":  "PSA B71 2312",
                                          "capacity_with_filter":  "5.1 L",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "8.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 ESP"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F21",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Pompe à carburant et relais injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Réservoir AdBlue avec module de jauge/pompe défaillant (message démarrage impossible dans 1100 km)",
                                                   "Sonde NOx aval qui remonte des défauts de dépollution intempestifs",
                                                   "Bloc mécanique (bas moteur et culasse) d\u0027une fiabilité remarquable sans les soucis de chaîne du 1.5 BlueHDi"
                                               ],
                            "buying_advice":  "L\u0027un des meilleurs diesels routiers du groupe Stellantis. Vérifier l\u0027absence de voyant AdBlue au tableau de bord."
                        }
    },
    {
        "id":  "mercedes_20_cdi_om654",
        "make":  "Mercedes-Benz",
        "model":  "Classe A W177, Classe C W205/W206, Classe E W213, GLC X253, Classe V",
        "generation":  "2016-2024",
        "engine":  {
                       "name":  "2.0 d / CDI (150, 163, 194, 245 ch)",
                       "code":  "OM654.920",
                       "fuel":  "Diesel",
                       "displacement":  "1950 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-20",
                                          "norm":  "MB 229.52 ou MB 229.71 / 229.72",
                                          "capacity_with_filter":  "6.0 à 6.8 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.6 ou 325.5 (Rose/Violet)",
                                       "capacity":  "9.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (côté passager)",
                          "number":  "F110",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V avant"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SAM)",
                          "number":  "F24",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Gestion moteur OM654"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Pompe à eau pilotée à dépression sujette à des fuites internes de liquide vers le circuit de vide",
                                                   "Chaîne de distribution positionnée à l\u0027arrière côté boîte de vitesses (surveiller les bruits à froid vers 200 000 km)",
                                                   "Capteurs de pression et sondes de température d\u0027échappement sensibles"
                                               ],
                            "buying_advice":  "Moteur très moderne, sobre et silencieux. Surveiller le niveau de liquide de refroidissement et les électrovannes de dépression."
                        }
    },
    {
        "id":  "renault_09_tce_h4bt",
        "make":  "Renault",
        "model":  "Clio IV, Captur I, Twingo III (aussi Dacia Sandero II, Logan II, Smart Fortwo III 0.9)",
        "generation":  "2012-2020",
        "engine":  {
                       "name":  "0.9 TCe 90 ch (3 cylindres turbo)",
                       "code":  "H4Bt 400 / 408",
                       "fuel":  "Essence",
                       "displacement":  "898 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40",
                                          "norm":  "RN0710",
                                          "capacity_with_filter":  "4.1 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune)",
                                       "capacity":  "5.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "FM2",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Bobines d\u0027allumage et injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Boîtier de thermostat d\u0027eau en plastique qui se fissure à la base (fuite de liquide classique sur boîte de vitesses)",
                                                   "À-coups de fonctionnement à froid et temps de réponse turbo sur les premières versions 2012-2014",
                                                   "Beaucoup plus robuste que le 1.2 TCe 4 cylindres : pas de surconsommation d\u0027huile chronique"
                                               ],
                            "buying_advice":  "Très bon choix en citadine essence. Inspecter immédiatement le dessus de boîte de vitesses pour traquer une trace jaune/verte de fuite de liquide."
                        }
    },
    {
        "id":  "vag_15_tsi_ea211_evo",
        "make":  "Volkswagen",
        "model":  "Golf VII/VIII, T-Roc, Tiguan II, Passat B8 (aussi Audi A3 8V/8Y, Seat Leon 3/4, Skoda Octavia 3/4)",
        "generation":  "2017-2024",
        "engine":  {
                       "name":  "1.5 TSI Evo 130 / 150 ch (ACT désactivation de cylindres)",
                       "code":  "DADA / DPCA / DHFA",
                       "fuel":  "Essence",
                       "displacement":  "1498 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20",
                                          "norm":  "VW 508.00 / 509.00 obligatoire",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12evo",
                                       "capacity":  "7.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (vide-poche gauche)",
                          "number":  "SC40",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB18",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Effet \u0027kangourou\u0027 (à-coups et hésitations marqués au décollage en première à froid sur boîte manuelle)",
                                                   "Encrassement modéré des injecteurs haute pression directe",
                                                   "Pompe à eau électrique régulée sujette à fuite externe"
                                               ],
                            "buying_advice":  "S\u0027assurer que la mise à jour logicielle moteur VAG pour corriger les à-coups à froid en première a été injectée."
                        }
    },
    {
        "id":  "bmw_mini_15_b38",
        "make":  "BMW",
        "model":  "Série 1 F20/F40 (116i/118i), Série 2 Active Tourer, X1 F48 (aussi Mini Cooper F55/F56)",
        "generation":  "2014-2024",
        "engine":  {
                       "name":  "1.5 TwinPower Turbo 3 cylindres (102, 136, 140 ch)",
                       "code":  "B38A15A / B38B15A",
                       "fuel":  "Essence",
                       "displacement":  "1499 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "BMW Longlife-17 FE+ ou LL-04 / LL-01",
                                          "capacity_with_filter":  "4.25 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 ou LC-18",
                                       "capacity":  "6.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Pied passager avant (boîtier BDC)",
                          "number":  "F32",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Écran central et combiné"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F42",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée du palier de butée axiale de vilebrequin sur les premières séries manuelles 2014-2015 (jeu axial excessif)",
                                                   "Support moteur côté droit (silentbloc hydraulique) qui s\u0027affaisse et fuit vers 80 000 km",
                                                   "Électrovanne de purge de canister d\u0027essence bruyante (cliquetis)"
                                               ],
                            "buying_advice":  "Vérifier l\u0027absence de vibration sourde au ralenti (support moteur droit affaissé). Moteur par ailleurs très agréable et tonique."
                        }
    },
    {
        "id":  "vag_20_bitdi_cuan_ea288",
        "make":  "Volkswagen",
        "model":  "Passat B8, Tiguan II, Arteon (aussi Skoda Kodiaq RS)",
        "generation":  "2014-2021",
        "engine":  {
                       "name":  "2.0 BiTDI 240 ch 4Motion",
                       "code":  "CUAA / CXEB",
                       "fuel":  "Diesel",
                       "displacement":  "1968 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 ou 5W-30",
                                          "norm":  "VW 507.00",
                                          "capacity_with_filter":  "5.0 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12evo ou G13",
                                       "capacity":  "9.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (vide-poche conducteur)",
                          "number":  "SC40",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prises 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB20",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Calculateur gestion moteur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Surchauffe et fragilité du module bi-turbo séquentiel sous forte charge prolongée",
                                                   "Pompe à eau électrique additionnelle de refroidissement turbo sensible aux pannes",
                                                   "Remplacement de la courroie de distribution très technique en raison du manque de place sous capot"
                                               ],
                            "buying_advice":  "Performances de premier ordre pour un 4 cylindres diesel, mais exige un entretien très rigoureux. Laisser impérativement tourner au ralenti 1 min avant coupure."
                        }
    },
    {
        "id":  "honda_22_ictdi_idtec",
        "make":  "Honda",
        "model":  "Civic VIII/IX, CR-V II/III/IV, Accord VII/VIII, FR-V",
        "generation":  "2003-2015",
        "engine":  {
                       "name":  "2.2 i-CTDi / i-DTEC (140 à 150 ch)",
                       "code":  "N22A1 / N22A2 / N22B1",
                       "fuel":  "Diesel",
                       "displacement":  "2204 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 ou 5W-30",
                                          "norm":  "ACEA C2/C3 (i-DTEC avec FAP) ou ACEA B1/B5 (i-CTDi sans FAP)",
                                          "capacity_with_filter":  "5.9 L",
                                          "drain_plug_torque":  "39 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Honda Type 2 (Bleu)",
                                       "capacity":  "7.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche sous tableau de bord)",
                          "number":  "F29",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F12",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Préchauffage et pompe gazole"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fissuration du collecteur d\u0027échappement en inox sur i-CTDi avant 2007 (odeurs d\u0027échappement dans l\u0027habitacle)",
                                                   "Allongement de la chaîne de distribution de pompe à huile/arbre à cames sur séries 2004-2006",
                                                   "Volant moteur bi-masse et embrayage sensibles sur Civic et Accord"
                                               ],
                            "buying_advice":  "Moteur tout aluminium d\u0027un silence et d\u0027une souplesse remarquables. Vérifier si le collecteur d\u0027échappement a été remplacé par la version fonte modifiée."
                        }
    },
    {
        "id":  "renault_10_sce_b4d",
        "make":  "Renault",
        "model":  "Twingo III, Clio V (aussi Dacia Sandero III, Logan III, Smart Fortwo 1.0)",
        "generation":  "2014-2024",
        "engine":  {
                       "name":  "1.0 SCe 65 / 70 / 75 ch (Atmosphérique)",
                       "code":  "B4D 400 / 419",
                       "fuel":  "Essence",
                       "displacement":  "999 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "RN17 (5W-30) ou RN17 FE (0W-20)",
                                          "capacity_with_filter":  "3.1 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune)",
                                       "capacity":  "5.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F12",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (ou coffre moteur sur Twingo)",
                          "number":  "FM1",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Bobines et injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Thermostat d\u0027eau piloté plastique fuyant à la base",
                                                   "Capteur d\u0027oxygène amont (sonde lambda) générant un voyant antipollution erratique",
                                                   "Absence totale de turbo et injection indirecte : mécanique basique ne souffrant d\u0027aucune maladie grave"
                                               ],
                            "buying_advice":  "Moteur urbain économique par excellence, sans risque mécanique majeur. Vidange très facile d\u0027accès."
                        }
    },
    {
        "id":  "suzuki_14_boosterjet_k14c",
        "make":  "Suzuki",
        "model":  "Swift Sport (ZC33S), Vitara IV, S-Cross",
        "generation":  "2016-2024",
        "engine":  {
                       "name":  "1.4 Boosterjet Turbo (129 ch micro-hybride / 140 ch standard)",
                       "code":  "K14C / K14D Boosterjet",
                       "fuel":  "Essence / Micro-hybride 48V",
                       "displacement":  "1373 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 (K14C) ou 0W-20 (K14D)",
                                          "norm":  "API SN/SP ou ILSAC GF-5",
                                          "capacity_with_filter":  "3.9 L",
                                          "drain_plug_torque":  "35 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Suzuki Super Coolant (Bleu)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "ACC",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V accessoires"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "FI",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Injection de carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Batterie auxiliaire 48V sous le siège passager sensible aux décharges prolongées sur version K14D",
                                                   "Encrassement modéré des conduits d\u0027admission (injection directe)",
                                                   "Mécanique générale d\u0027une fiabilité remarquable, parmi les 4 cylindres turbo récents les plus solides"
                                               ],
                            "buying_advice":  "L\u0027un des meilleurs moteurs essence actuels en terme de rapport fiabilité/nervosité. Respecter les échéances d\u0027entretien annuel."
                        }
    },
    {
        "id":  "renault_22_dci_g9t",
        "make":  "Renault",
        "model":  "Laguna II, Espace IV, Vel Satis, Master II (aussi Opel Movano A)",
        "generation":  "2000-2008",
        "engine":  {
                       "name":  "2.2 dCi 16V (90, 115, 150 ch)",
                       "code":  "G9T 700 / 702 / 710 / 742",
                       "fuel":  "Diesel",
                       "displacement":  "2188 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "RN0710 / ACEA B4",
                                          "capacity_with_filter":  "6.3 L (carter tôle) à 7.5 L (Master)",
                                          "drain_plug_torque":  "25 Nm (carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune/Vert)",
                                       "capacity":  "9.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière vide-poche)",
                          "number":  "F12",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F3",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Pompe de gavage carburant"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée des coussinets de bielle entraînant une casse moteur violente",
                                                   "Collecteur d\u0027admission d\u0027air en plastique (qui fait office de couvre-culasse) qui se fissure ou dont les joints fuient",
                                                   "Cascade de pignons de distribution complexe et bruyante"
                                               ],
                            "buying_advice":  "Moteur sous haute surveillance. Exiger impérativement la facture de remplacement préventif des coussinets de bielle avant 180 000 km."
                        }
    },
    {
        "id":  "mercedes_30_cdi_v6_om642",
        "make":  "Mercedes-Benz",
        "model":  "Classe C W203/W204, Classe E W211/W212, ML/GLE W164/W166, CLS, Sprinter",
        "generation":  "2005-2020",
        "engine":  {
                       "name":  "3.0 V6 CDI (190, 224, 231, 258, 265 ch)",
                       "code":  "OM642.940 / OM642.820 / OM642.850",
                       "fuel":  "Diesel",
                       "displacement":  "2987 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "MB 229.51 ou MB 229.52",
                                          "capacity_with_filter":  "8.0 à 8.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.0 (Bleu) ou MB 325.5",
                                       "capacity":  "10.5 à 12.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche)",
                          "number":  "F9",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SAM)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Gestion moteur V6 CDI"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite d\u0027huile aux joints violets du refroidisseur d\u0027huile situé au creux du V moteur (grosse main d\u0027œuvre pour quelques joints)",
                                                   "Moteur de commande des volets d\u0027admission (M55) noyé par les coulures d\u0027huile du joint de turbo orange",
                                                   "Capteur de contre-pression d\u0027échappement qui s\u0027encrasse fréquemment"
                                               ],
                            "buying_advice":  "V6 extrêmement endurant (dépasse souvent 400 000 km). Remplacer systématiquement le joint orange d\u0027admission de turbo à chaque révision."
                        }
    },
    {
        "id":  "vag_18t_20v_ea113",
        "make":  "Volkswagen",
        "model":  "Golf IV GTI, Passat B5, Bora (aussi Audi TT 8N, A3 8L, A4 B5/B6, Seat Leon 1M)",
        "generation":  "1997-2006",
        "engine":  {
                       "name":  "1.8 Turbo 20V (150, 180, 210, 225 ch)",
                       "code":  "AGU / AUQ / BAM / APX / AUM",
                       "fuel":  "Essence",
                       "displacement":  "1781 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 synthétique haute performance",
                                          "norm":  "VW 502.00",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12 (Rose)",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (sur batterie)",
                          "number":  "S178",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Gestion ventilateurs et moteur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Phénomène de \u0027sludge\u0027 (boue d\u0027huile) : crépine de pompe à huile qui se colmate si les vidanges ont été espacées",
                                                   "Bobines d\u0027allumage individuelles sensibles aux claquages prématurés",
                                                   "Durites du circuit de reniflard (PCV) sous le collecteur d\u0027admission qui cuirassent et se percent"
                                               ],
                            "buying_advice":  "Moteur mythique très robuste et préparable. Remplacer impérativement la crépine de pompe à huile en préventif."
                        }
    },
    {
        "id":  "ford_16_tdci_8v_dv6c",
        "make":  "Ford",
        "model":  "Focus III, Fiesta VI/VII, C-Max II, B-Max, Mondeo IV (aussi Volvo V40 D2)",
        "generation":  "2010-2017",
        "engine":  {
                       "name":  "1.6 TDCi / Duratorq 8 soupapes (95, 115 ch)",
                       "code":  "T1DB / T1DA / T3DA (Base DV6C)",
                       "fuel":  "Diesel",
                       "displacement":  "1560 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "Ford WSS-M2C913-C ou WSS-M2C913-D",
                                          "capacity_with_filter":  "3.85 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange)",
                                       "capacity":  "6.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 High Performance"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F61",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F34",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Injecteurs et calculateur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Injecteurs Continental piézoélectriques sujets au claquement et recalibrage régulier",
                                                   "Version 8 soupapes nettement fiabilisée : plus de problème de crépine turbo comme sur le vieux 16 soupapes",
                                                   "FAP sensible aux trajets urbains répétés"
                                               ],
                            "buying_advice":  "Très économique à l\u0027usage. Surveiller la régularité du ralenti à froid (injecteurs)."
                        }
    },
    {
        "id":  "psa_16_16v_tu5jp4",
        "make":  "Peugeot",
        "model":  "206, 207, 307, Partner I/II (aussi Citroën C2, C3 I, C4 I, Xsara, Berlingo I/II)",
        "generation":  "2000-2012",
        "engine":  {
                       "name":  "1.6 16V 110 ch",
                       "code":  "TU5JP4 / NFU",
                       "fuel":  "Essence",
                       "displacement":  "1587 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "PSA B71 2296",
                                          "capacity_with_filter":  "3.4 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110 (Bleu/Vert)",
                                       "capacity":  "6.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (platine BSI)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F15",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant immergée"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite d\u0027huile classique au niveau des deux joints de couvre-culasse en plastique",
                                                   "Poussoirs hydrauliques bruyants à froid si l\u0027huile est usée ou non conforme",
                                                   "Boîtier papillon motorisé encrassé provoquant des légers trous à bas régime"
                                               ],
                            "buying_advice":  "L\u0027un des moteurs essence les plus fiables et faciles d\u0027entretien jamais produits par PSA."
                        }
    },
    {
        "id":  "toyota_psa_10_1kr_fe",
        "make":  "Toyota",
        "model":  "Toyota Aygo I/II, Yaris II/III (aussi Citroën C1 I/II, Peugeot 107, Peugeot 108)",
        "generation":  "2005-2021",
        "engine":  {
                       "name":  "1.0 VVT-i 68 / 72 ch 3 cylindres",
                       "code":  "1KR-FE / CFA / CFB",
                       "fuel":  "Essence",
                       "displacement":  "998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-20",
                                          "norm":  "API SL/SM/SN ou ACEA A3/B4 / A5",
                                          "capacity_with_filter":  "3.1 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota Super Long Life Coolant (Rose)",
                                       "capacity":  "4.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière combiné)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "EFI",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Gestion électronique injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée de l\u0027embrayage (disque sous-dimensionné d\u0027origine, à changer vers 80 000 - 100 000 km)",
                                                   "Pompe à eau bruyante ou fuyante vers 100 000 km (bruit de roulement caractéristique)",
                                                   "Surconsommation d\u0027huile au-delà de 150 000 km si les vidanges ont été négligées"
                                               ],
                            "buying_advice":  "Moteur à chaîne indestructible en usage urbain si le niveau d\u0027huile est contrôlé régulièrement."
                        }
    },
    {
        "id":  "alfa_fiat_19_jtdm_8v_16v",
        "make":  "Alfa Romeo",
        "model":  "Alfa Romeo 147, 156, 159, GT (aussi Fiat Grande Punto, Stilo, Bravo II)",
        "generation":  "2000-2011",
        "engine":  {
                       "name":  "1.9 JTD / JTDm (115, 120 ch 8V / 140, 150 ch 16V)",
                       "code":  "937A2000 / 937A5000 / 939A2000",
                       "fuel":  "Diesel",
                       "displacement":  "1910 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 5W-30 (avec FAP)",
                                          "norm":  "Fiat 9.55535-N2 (sans FAP) ou 9.55535-S1 (avec FAP)",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "20 Nm (clé Allen 12 mm ou Torx)"
                                      },
                       "coolant":  {
                                       "type":  "Paraflu UP (Rouge)",
                                       "capacity":  "7.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (tableau de bord gauche)",
                          "number":  "F44",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F17",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Centrale d\u0027injection JTDm"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Volets de turbulence (swirl flaps) sur version 16V 150 ch qui prennent du jeu ou se détachent dans l\u0027admission",
                                                   "Vanne EGR électrique grippée par la calamine (perte de puissance sous 2000 tr/min)",
                                                   "Durite inférieure de turbo qui frotte ou se fend (sifflement d\u0027air et fumée noire à l\u0027accélération)"
                                               ],
                            "buying_advice":  "Le bloc 8V (115/120 ch) est l\u0027un des diesels les plus solides du marché sans le problème des volets swirl du 16V."
                        }
    },
    {
        "id":  "vag_25_tdi_v6_vp44",
        "make":  "Audi",
        "model":  "A4 B5/B6, A6 C5, Allroad C5 (aussi Volkswagen Passat B5, Skoda Superb I)",
        "generation":  "1997-2005",
        "engine":  {
                       "name":  "2.5 V6 TDI (150, 163, 180 ch)",
                       "code":  "AFB / AKN / AKE / BAU / BDG",
                       "fuel":  "Diesel",
                       "displacement":  "2496 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "VW 505.00",
                                          "capacity_with_filter":  "5.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12 (Rose)",
                                       "capacity":  "8.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier calculateur)",
                          "number":  "F28",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Pompe d\u0027injection Bosch VP44"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée des arbres à cames et culbuteurs sur codes AFB/AKN/AKE (claquements métalliques en haut moteur)",
                                                   "Panne électronique du driver de la pompe à injection haute pression Bosch VP44 (transistor qui claque, arrêt brutal)",
                                                   "Distribution très coûteuse et complexe avec dépose complète de la face avant"
                                               ],
                            "buying_advice":  "Privilégier impérativement les codes moteurs fiabilisés avec culbuteurs à rouleaux (BAU / BDH / BDG à partir de 2003)."
                        }
    },
    {
        "id":  "psa_ford_27_hdi_dt17",
        "make":  "Peugeot",
        "model":  "407 Coupé, 607, Citroën C6, C5 II (aussi Jaguar S-Type/XF, Land Rover Discovery 3 / Range Sport TDV6)",
        "generation":  "2004-2011",
        "engine":  {
                       "name":  "2.7 V6 HDi Bi-Turbo / TDV6 (190, 204, 207 ch)",
                       "code":  "DT17TED4 / UHZ / 276DT",
                       "fuel":  "Diesel",
                       "displacement":  "2720 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 (C1/C2)",
                                          "norm":  "PSA B71 2290 ou Ford WSS-M2C934-B",
                                          "capacity_with_filter":  "5.75 L (berlines) à 6.5 L (Land Rover)",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110 ou Havoline XLC",
                                       "capacity":  "11.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F2",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Gestion biturbo et calculateurs"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Casse de vilebrequin ou rotation des coussinets de bielle par faiblesse de lubrification (particulièrement sur Land Rover Discovery 3)",
                                                   "Boîtier de sortie d\u0027eau en plastique au centre du V qui fissure (fuite de liquide sournoise)",
                                                   "Vannes EGR jumelles très difficiles d\u0027accès à l\u0027arrière du moteur"
                                               ],
                            "buying_advice":  "Sur Land Rover, raccourcir impérativement la vidange à 10 000 km et contrôler le voyant de pression d\u0027huile au démarrage."
                        }
    },
    {
        "id":  "bmw_6cyl_n54_n55",
        "make":  "BMW",
        "model":  "Série 3 E90/F30 (335i), Série 1 E82 (135i/1M), Série 2 F22 (M235i), Série 5 E60/F10 (535i), X5 E70",
        "generation":  "2006-2016",
        "engine":  {
                       "name":  "3.0 TwinPower Turbo 6 cylindres (306 à 340 ch)",
                       "code":  "N54B30 (Bi-turbo) / N55B30 (Twin-Scroll)",
                       "fuel":  "Essence",
                       "displacement":  "2979 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40 synthétique",
                                          "norm":  "BMW Longlife-01 (LL-01) ou LL-04",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 (Bleu)",
                                       "capacity":  "8.5 à 10.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîte à gants)",
                          "number":  "F08",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier DME)",
                          "number":  "F01",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Injecteurs piézoélectriques / Bobines"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "N54 : Injecteurs piézoélectriques haute pression index 1 à 11 fuyards (remplacement par index 12 très onéreux)",
                                                   "Panne de la pompe haute pression carburant (HPFP)",
                                                   "Bruit de wastegate qui tremble (wastegate rattle) sur les deux turbos du N54",
                                                   "Fuite d\u0027huile au joint de boîtier de filtre à huile / échangeur (court-circuit avec la courroie d\u0027accessoires si l\u0027huile coule dessus)"
                                               ],
                            "buying_advice":  "Moteur aux performances exceptionnelles. Vérifier l\u0027index des injecteurs et tester l\u0027absence de claquement de wastegates à la décélération."
                        }
    },
    {
        "id":  "opel_isuzu_17_cdti",
        "make":  "Opel",
        "model":  "Astra G/H/J, Corsa C/D, Meriva A/B, Zafira B, Mokka (1.7 CDTI)",
        "generation":  "1998-2015",
        "engine":  {
                       "name":  "1.7 DTI / CDTI (75, 100, 110, 125, 130 ch)",
                       "code":  "Y17DT / Z17DTH / Z17DTJ / A17DTS (Origine Isuzu Circle L)",
                       "fuel":  "Diesel",
                       "displacement":  "1686 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "Opel GM Dexos2",
                                          "capacity_with_filter":  "4.5 à 5.4 L selon version",
                                          "drain_plug_torque":  "14 Nm (attention filetage carter alu fragile)"
                                      },
                       "coolant":  {
                                       "type":  "Glysantin G34 / GM Dex-Cool (Orange)",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîtier latéral coffre ou trappe volant)",
                          "number":  "F29",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F6",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Centrale d\u0027injection et électrovannes"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Régulateur de pression de carburant sur pompe Denso (SCV) qui grippe (ralenti très instable à froid)",
                                                   "Alternateur Hitachi d\u0027origine qui lâche régulièrement vers 120 000 km",
                                                   "Fuite d\u0027huile sur les joints des raccords de pompe à huile ou durites de dépression"
                                               ],
                            "buying_advice":  "Bloc moteur en fonte d\u0027origine Isuzu extrêmement endurant (dépasse souvent 400 000 km). Surveiller la régularité du ralenti."
                        }
    },
    {
        "id":  "renault_14_16_16v_k4m",
        "make":  "Renault",
        "model":  "Clio II/III, Megane I/II/III, Scenic I/II/III, Modus, Kangoo I/II (aussi Dacia Duster I, Sandero I)",
        "generation":  "1998-2016",
        "engine":  {
                       "name":  "1.4 16V (98 ch) \u0026 1.6 16V (105 / 110 ch)",
                       "code":  "K4J 710/750 \u0026 K4M 700/760/812",
                       "fuel":  "Essence",
                       "displacement":  "1390 à 1598 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "RN0700",
                                          "capacity_with_filter":  "4.8 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "FM2",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Bobines d\u0027allumage individuelles"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Bobines d\u0027allumage crayon Sagem d\u0027origine qui grillent (remplacer par du Beru ou Denso)",
                                                   "Poulie déphaseur d\u0027arbre à cames bruyante au démarrage à froid sur K4M (bruit de crécelle / diesel au démarrage)",
                                                   "Capteur PMH encrassé empêchant le démarrage"
                                               ],
                            "buying_advice":  "Moteur essence phare de Renault, très endurant et économique. Écouter attentivement la première seconde du démarrage pour valider la poulie déphaseur."
                        }
    },
    {
        "id":  "toyota_14_d4d_1nd_tv",
        "make":  "Toyota",
        "model":  "Yaris I/II/III, Auris I, Corolla E120/E150, Urban Cruiser (aussi Mini One D R50 2003-2005)",
        "generation":  "2001-2017",
        "engine":  {
                       "name":  "1.4 D-4D 75 / 90 ch",
                       "code":  "1ND-TV",
                       "fuel":  "Diesel",
                       "displacement":  "1364 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "ACEA C2 (avec FAP) ou B4 (sans FAP)",
                                          "capacity_with_filter":  "4.1 L",
                                          "drain_plug_torque":  "38 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota Super Long Life Coolant (Rose)",
                                       "capacity":  "5.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous volant à gauche)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare / Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "EFI",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Injection et relais de préchauffage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Surconsommation d\u0027huile moteur sur versions Euro 5 (2009-2013) par faiblesse de segments de pistons (rappel SAV)",
                                                   "Fuite aux joints d\u0027étanchéité des injecteurs",
                                                   "Distribution par chaîne extrêmement résistante"
                                               ],
                            "buying_advice":  "Petit diesel nerveux et très sobre (souvent moins de 4,5 L/100 km). Contrôler le niveau d\u0027huile à la jauge avant achat sur les versions post-2009."
                        }
    },
    {
        "id":  "psa_20_16v_ew10",
        "make":  "Peugeot",
        "model":  "206 S16/CC, 307, 406, 407 (aussi Citroën Xsara, Xsara Picasso, C4 I, C5 I)",
        "generation":  "1999-2010",
        "engine":  {
                       "name":  "2.0 16V (136 à 143 ch)",
                       "code":  "EW10J4 (RFN) / EW10A (RFJ)",
                       "fuel":  "Essence",
                       "displacement":  "1997 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "PSA B71 2296",
                                          "capacity_with_filter":  "4.25 L",
                                          "drain_plug_torque":  "33 Nm (vis six pans 21 mm)"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110 (Bleu/Vert)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (platine BSI)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F15",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant immergée"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Poussoirs hydrauliques bruyants à froid (claquement de diesel durant 2 minutes)",
                                                   "Consommation d\u0027huile modérée par durcissement des joints de queues de soupapes après 180 000 km",
                                                   "Boîtier papillon motorisé et moteur pas-à-pas encrassés (ralenti oscillant)"
                                               ],
                            "buying_advice":  "Bloc en fonte très robuste et sans histoire. Écouter la discrétion des poussoirs lors d\u0027un démarrage à froid."
                        }
    },
    {
        "id":  "honda_18_ivtec_r18a",
        "make":  "Honda",
        "model":  "Civic VIII, Civic IX, FR-V, HR-V II",
        "generation":  "2006-2016",
        "engine":  {
                       "name":  "1.8 i-VTEC 140 ch",
                       "code":  "R18A1 / R18A2",
                       "fuel":  "Essence",
                       "displacement":  "1799 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "API SN/SM ou ACEA A3/B4 / A5",
                                          "capacity_with_filter":  "3.7 L",
                                          "drain_plug_torque":  "39 Nm (vis six pans 17 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Honda Type 2 (Bleu)",
                                       "capacity":  "5.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous colonne de direction)",
                          "number":  "F29",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F3",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage directes"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Support moteur supérieur droit (hydraulique) affaissé provoquant de fortes vibrations au ralenti",
                                                   "Fissuration du bloc moteur sur séries très précises 2006-2008 (rappel constructeur pris en charge 10 ans)",
                                                   "Distribution par chaîne inusable si l\u0027huile est propre"
                                               ],
                            "buying_advice":  "Moteur atmosphérique d\u0027une fiabilité remarquable. Vérifier l\u0027état d\u0027affaissement du support moteur supérieur côté courroie."
                        }
    },
    {
        "id":  "toyota_20_vvti_1az_3zr",
        "make":  "Toyota",
        "model":  "RAV4 II/III/IV, Avensis I/II/III",
        "generation":  "2000-2018",
        "engine":  {
                       "name":  "2.0 VVT-i / Valvematic (150 à 158 ch)",
                       "code":  "1AZ-FE (150 ch) / 3ZR-FAE (158 ch)",
                       "fuel":  "Essence",
                       "displacement":  "1998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 (3ZR) ou 5W-30 (1AZ/3ZR)",
                                          "norm":  "API SN / ILSAC GF-5",
                                          "capacity_with_filter":  "4.2 L",
                                          "drain_plug_torque":  "37 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota Super Long Life Coolant (Rose)",
                                       "capacity":  "6.6 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc inférieur gauche)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "EFI MAIN",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Gestion injection et pompe à essence"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "1AZ-FE (2001-2004) : Filetages de vis de culasse qui s\u0027arrachent dans le bloc alu à l\u0027arrière (fuite de liquide)",
                                                   "3ZR-FAE : Contrôleur Valvematic (actuateur de levée variable) en panne avec voyant moteur P1047",
                                                   "Pompe à eau bruyante vers 150 000 km"
                                               ],
                            "buying_advice":  "Sur RAV4 II 1AZ, vérifier l\u0027absence d\u0027odeur de liquide de refroidissement derrière le collecteur d\u0027admission."
                        }
    },
    {
        "id":  "mazda_20_skyactiv_g_pe",
        "make":  "Mazda",
        "model":  "Mazda 3 (BM/BN/BP), Mazda 6 (GJ/GL), CX-3, CX-5 (KE/KF), MX-5 ND",
        "generation":  "2012-2024",
        "engine":  {
                       "name":  "2.0 SkyActiv-G (120, 145, 165 ch)",
                       "code":  "PE-VPS",
                       "fuel":  "Essence",
                       "displacement":  "1998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "Mazda Original Oil Supra (0W-20) ou Ultra (5W-30) / API SN",
                                          "capacity_with_filter":  "4.2 L",
                                          "drain_plug_torque":  "38 Nm (clé de 8 mm hexagonale ou vis six pans 17 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Mazda FL22 (Vert foncé)",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (montant de porte gauche)",
                          "number":  "F9",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F22",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Calculateur moteur PCM"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Taux de compression record (14:1) sans turbo : fiabilité globale remarquable",
                                                   "Tendeur de courroie d\u0027accessoires hydraulique fuyant vers 100 000 km",
                                                   "Encrassement modéré des soupapes d\u0027admission lié à l\u0027injection directe"
                                               ],
                            "buying_advice":  "Moteur atmosphérique référence de sobriété et de robustesse. Contrôler le suintement gras du galet tendeur d\u0027accessoires."
                        }
    },
    {
        "id":  "volvo_20_d3_d4_drive_e",
        "make":  "Volvo",
        "model":  "V40 II, V60 I/II, XC60 I/II, S60 II, XC90 II",
        "generation":  "2014-2022",
        "engine":  {
                       "name":  "2.0 D3 / D4 Drive-E 4 cylindres (150 à 190 ch)",
                       "code":  "D4204T9 / D4204T14 / VEA",
                       "fuel":  "Diesel",
                       "displacement":  "1969 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 obligatoire",
                                          "norm":  "Volvo VCC RBS0-2AE",
                                          "capacity_with_filter":  "5.2 L",
                                          "drain_plug_torque":  "38 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Volvo Coolant VCS (Jaune)",
                                       "capacity":  "8.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous boîte à gants)",
                          "number":  "F22",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V console avant et tunnel"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F38",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines/Injecteurs common rail"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Surconsommation d\u0027huile moteur sur versions 2014-2016 par gommage des segments racleurs",
                                                   "Vanne EGR et son refroidisseur très sensibles à l\u0027encrassement (campagne de rappel Volvo)",
                                                   "Collecteur d\u0027admission en plastique sujet à fonte locale suite à surchauffe du circuit EGR"
                                               ],
                            "buying_advice":  "Privilégier les modèles produits après mi-2016 dont la segmentation et le refroidisseur EGR ont été modifiés."
                        }
    },
    {
        "id":  "mercedes_35_v6_m272",
        "make":  "Mercedes-Benz",
        "model":  "Classe C W204 (C350), Classe E W211/W212 (E350), ML W164, CLK A209, SLK R171",
        "generation":  "2004-2012",
        "engine":  {
                       "name":  "3.5 V6 24V (272 ch)",
                       "code":  "M272.960 / M272.972 / M272.980",
                       "fuel":  "Essence",
                       "displacement":  "3498 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 0W-40",
                                          "norm":  "MB 229.3 ou MB 229.5",
                                          "capacity_with_filter":  "8.0 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.0 (Bleu)",
                                       "capacity":  "9.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc planche de bord gauche)",
                          "number":  "F9",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (SAM avant)",
                          "number":  "F23",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Électroaimants de déphaseurs d\u0027arbres à cames"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée du pignon d\u0027arbre d\u0027équilibrage (balance shaft) sur moteurs jusqu\u0027au numéro 2729..30 468993 (défauts P0016/P0017)",
                                                   "Leviers en plastique des volets tubulure du collecteur d\u0027admission qui cassent",
                                                   "Aimants de déphaseurs d\u0027arbres à cames fuyards (huile dans le faisceau moteur)"
                                               ],
                            "buying_advice":  "Vérifier impérativement le numéro de série moteur pour s\u0027assurer qu\u0027il est hors de la plage critique d\u0027arbre d\u0027équilibrage."
                        }
    },
    {
        "id":  "ford_20_duratec_he",
        "make":  "Ford",
        "model":  "Mondeo III/IV, Focus II, C-Max I, S-Max I, Galaxy II (aussi Mazda 3/6 2.0 MZR)",
        "generation":  "2001-2014",
        "engine":  {
                       "name":  "1.8 / 2.0 Duratec-HE (125 à 145 ch)",
                       "code":  "AODA / AODB / CJBA / TBBA",
                       "fuel":  "Essence",
                       "displacement":  "1999 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "Ford WSS-M2C913-B ou WSS-M2C913-C",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange)",
                                       "capacity":  "6.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous boîte à gants)",
                          "number":  "F19",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F30",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Clapets de turbulence dans le collecteur d\u0027admission qui prennent du jeu (bruit de cliquetis plastique, risque d\u0027ingestion par les cylindres)",
                                                   "Consommation d\u0027huile via le circuit du reniflard d\u0027huile PCV sous le collecteur",
                                                   "Bobines d\u0027allumage sensibles à l\u0027humidité dans les puits de bougies"
                                               ],
                            "buying_advice":  "Moteur à chaîne très solide. Écouter le collecteur d\u0027admission au ralenti : un bruit de mitraillette indique des volets à remplacer sans tarder."
                        }
    },
    {
        "id":  "renault_23_dci_m9t",
        "make":  "Renault",
        "model":  "Master III (aussi Nissan NV400, Nissan Navara D23, Opel Movano B)",
        "generation":  "2010-2024",
        "engine":  {
                       "name":  "2.3 dCi (100 à 180 ch monoturbo et bi-turbo)",
                       "code":  "M9T 670 / 700 / 716 / 880 (Base bloc M9R)",
                       "fuel":  "Diesel",
                       "displacement":  "2299 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "RN0720 (Euro 5) ou RN17 / RN17 FE (Euro 6)",
                                          "capacity_with_filter":  "8.0 à 8.9 L",
                                          "drain_plug_torque":  "30 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune/Vert)",
                                       "capacity":  "10.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F13",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V tableau de bord"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "F1",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Injection et pompe d\u0027alimentation"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Infiltrations d\u0027eau depuis la baie de pare-brise qui rouillent les injecteurs dans la culasse",
                                                   "Fissuration de la durite rigide d\u0027admission d\u0027air du turbo",
                                                   "Sondes de pression différentielle et réservoir AdBlue sur versions Euro 6 récentes"
                                               ],
                            "buying_advice":  "Excellente mécanique utilitaire à chaîne. Graisser préventivement les puits d\u0027injecteurs pour éviter qu\u0027ils ne se soudent par l\u0027oxydation."
                        }
    },
    {
        "id":  "vag_20_sdi_ea188",
        "make":  "Volkswagen",
        "model":  "Golf V, Caddy III (aussi Seat Ibiza IV 2.0 SDI)",
        "generation":  "2004-2010",
        "engine":  {
                       "name":  "2.0 SDI 70 / 75 ch (Injecteurs-Pompes sans turbo)",
                       "code":  "BDK / BST / BDJ",
                       "fuel":  "Diesel",
                       "displacement":  "1968 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40",
                                          "norm":  "VW 505.01 obligatoire (Injecteurs-Pompes)",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12+ (Rose)",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîtier SB)",
                          "number":  "F42",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SA)",
                          "number":  "F24",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Calculateur moteur et relais d\u0027alimentation"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure de l\u0027arbre à cames si l\u0027huile VW 505.01 n\u0027est pas scrupuleusement respectée",
                                                   "Boîte de vitesses mécanique manuelle à 5 rapports fragile sur Caddy (roulements)",
                                                   "Absence totale de turbo, géométrie variable ou échangeur : pannes moteur quasiment inexistantes"
                                               ],
                            "buying_advice":  "Performances très modestes mais endurance exceptionnelle. Vidanges régulières avec norme 505.01 indispensables."
                        }
    },
    {
        "id":  "alfa_175_tbi_940",
        "make":  "Alfa Romeo",
        "model":  "Alfa Romeo 159, Brera, Spider, Giulietta QV (aussi Alfa Romeo 4C, Lancia Delta III)",
        "generation":  "2009-2020",
        "engine":  {
                       "name":  "1.75 TBi Turbo (200 à 240 ch)",
                       "code":  "939B1000 / 940A1000 / 960A1000",
                       "fuel":  "Essence",
                       "displacement":  "1742 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 (bloc fonte 159) ou 0W-40 / 5W-40 C3 (bloc alu Giulietta QV/4C)",
                                          "norm":  "Fiat 9.55535-GH2",
                                          "capacity_with_filter":  "5.0 L",
                                          "drain_plug_torque":  "22 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Paraflu UP (Rouge)",
                                       "capacity":  "6.8 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîtier BSI)",
                          "number":  "F85",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F18",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage et turbo"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Conduite d\u0027huile d\u0027alimentation du turbocompresseur qui se bouche avec l\u0027huile cokéfiée (casse turbo)",
                                                   "Fissuration du collecteur d\u0027échappement intégré au carter de turbine BorgWarner",
                                                   "Consommation d\u0027huile en conduite sportive soutenue"
                                               ],
                            "buying_advice":  "Remplacer impérativement la durite d\u0027alimentation de turbo et sa vis banjo équipée d\u0027un tamis pour fiabiliser le turbo."
                        }
    },
    {
        "id":  "psa_14_16v_et3j4",
        "make":  "Peugeot",
        "model":  "206, 207, 307 (aussi Citroën C2, C3 I, C4 I)",
        "generation":  "2003-2010",
        "engine":  {
                       "name":  "1.4 16V 90 ch",
                       "code":  "ET3J4 / KFU",
                       "fuel":  "Essence",
                       "displacement":  "1360 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "PSA B71 2296",
                                          "capacity_with_filter":  "3.25 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (platine BSI)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F15",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à essence"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fuite d\u0027huile au joint de culasse à l\u0027angle extérieur avant droit (sur le conduit de montée d\u0027huile, hérité du bloc TU)",
                                                   "Poulie de déphaseur d\u0027arbre à cames (VVT) qui claque à froid",
                                                   "Poussoirs hydrauliques sensibles à l\u0027encrassement"
                                               ],
                            "buying_advice":  "Inspecter la zone au-dessus de l\u0027alternateur pour traquer la fuite d\u0027huile classique du joint de culasse."
                        }
    },
    {
        "id":  "vag_25_tdi_t5_ea381",
        "make":  "Volkswagen",
        "model":  "Transporter T5, Multivan T5, Touareg I (R5 TDI)",
        "generation":  "2003-2009",
        "engine":  {
                       "name":  "2.5 TDI 5 cylindres en ligne Injecteurs-Pompes (130, 174 ch)",
                       "code":  "AXD / AXE / BAC / BLJ / BNZ / BPC",
                       "fuel":  "Diesel",
                       "displacement":  "2461 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 (sans FAP) ou 5W-30 (avec FAP)",
                                          "norm":  "VW 506.01 strict (sans FAP AXD/AXE) / VW 507.00 (avec FAP BNZ/BPC)",
                                          "capacity_with_filter":  "7.4 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12+ (Rose)",
                                       "capacity":  "9.0 à 13.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (porte-fusibles sous porte-bouteilles central)",
                          "number":  "F12",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V console"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier E-Box)",
                          "number":  "F24",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Calculateur moteur et relais d\u0027alimentation"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée de l\u0027arbre à cames et des poussoirs si l\u0027huile VW 506.01 n\u0027est pas strictement respectée sur AXD/AXE",
                                                   "Pompe à eau interne entraînée par cascade de pignons qui fuit dans l\u0027huile moteur (émulsion / mayonnaise)",
                                                   "Accouplements Gates et roues libres élastiques d\u0027alternateur/climatisation à changer tous les 150 000 km"
                                               ],
                            "buying_advice":  "Vérifier la couleur de l\u0027huile (absence de liquide de refroidissement) et exiger des factures mentionnant formellement la norme VW 506.01."
                        }
    },
    {
        "id":  "bmw_20i_n46_n43",
        "make":  "BMW",
        "model":  "Série 1 E87 (118i/120i), Série 3 E90 (318i/320i), X3 E83 2.0i, Z4 E85",
        "generation":  "2004-2012",
        "engine":  {
                       "name":  "2.0i Valvetronic / Injection directe (129, 143, 150, 170 ch)",
                       "code":  "N46B20 / N43B20",
                       "fuel":  "Essence",
                       "displacement":  "1995 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "BMW Longlife-01 ou LL-04",
                                          "capacity_with_filter":  "4.25 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 (Bleu)",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F08",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F01",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Servomoteur Valvetronic"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Joints de queues de soupapes durcis provoquant un panache de fumée bleue à la réaccélération après un ralenti prolongé",
                                                   "Tendeur de chaîne de distribution défaillant et patins de guidage en plastique qui cassent dans le carter",
                                                   "Pompe à vide fuyant l\u0027huile sur le collecteur d\u0027échappement (odeur de brûlé dans l\u0027habitacle)"
                                               ],
                            "buying_advice":  "Laisser tourner 5 minutes au ralenti puis accélérer franchement : l\u0027apparition d\u0027une fumée bleue trahit les joints de queues de soupapes."
                        }
    },
    {
        "id":  "mercedes_30_v6_turbo_m276",
        "make":  "Mercedes-Benz",
        "model":  "Classe C W205 (C400/C43 AMG), Classe E W212/W213 (E400), CLS C218, GLC X253",
        "generation":  "2013-2021",
        "engine":  {
                       "name":  "3.0 V6 Bi-Turbo BlueDIRECT (333 à 390 ch)",
                       "code":  "M276.820 / M276.823 / M276.850",
                       "fuel":  "Essence",
                       "displacement":  "2996 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-40 ou 5W-40",
                                          "norm":  "MB 229.5",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.5 ou 325.6 (Rose)",
                                       "capacity":  "9.8 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (côté passager)",
                          "number":  "F110",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V avant"
                      },
                      {
                          "location":  "Compartiment Moteur (boîtier SAM)",
                          "number":  "F25",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Bobines et gestion bi-turbo"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Claquement de chaîne de distribution de 2 secondes au démarrage à froid (clapets anti-retour d\u0027huile à installer sur les tendeurs secondaires)",
                                                   "Capteurs d\u0027arbre à cames suintant l\u0027huile dans le faisceau moteur",
                                                   "Pompe à eau additionnelle de refroidissement des turbos à surveiller"
                                               ],
                            "buying_advice":  "V6 extrêmement solide et raffiné. Écouter attentivement le démarrage à froid pour s\u0027assurer que les clapets anti-retour d\u0027huile ont été posés."
                        }
    },
    {
        "id":  "ford_22_tdci_puma",
        "make":  "Ford",
        "model":  "Transit 2T (V347/V363), Ranger T6 (aussi Land Rover Defender TD4 2.2, Peugeot Boxer/Citroën Jumper 2.2 HDi)",
        "generation":  "2006-2016",
        "engine":  {
                       "name":  "2.2 TDCi / Duratorq Puma (100, 125, 150, 155 ch)",
                       "code":  "CYFA / CYFB / QWFA / DRFA / P8FA",
                       "fuel":  "Diesel",
                       "displacement":  "2198 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "Ford WSS-M2C913-C ou WSS-M2C913-D",
                                          "capacity_with_filter":  "6.2 L (traction) à 10.0 L (propulsion carter profond)",
                                          "drain_plug_torque":  "23 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange)",
                                       "capacity":  "8.5 à 11.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière le volant sous volet)",
                          "number":  "F47",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F16",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Régulateur de pression gazole et injecteurs"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Fissuration / perçage d\u0027un piston sur Transit consécutif à un injecteur Continental/Denso fuyard",
                                                   "Vanne EGR électrique grippée par la calamine",
                                                   "Soupape régulatrice de pression de pompe à carburant (SCV) provoquant calages intempestifs"
                                               ],
                            "buying_advice":  "Surveiller les injecteurs et faire vérifier les débits de correction à la valise diagnostic pour écarter tout risque de perçage de piston."
                        }
    },
    {
        "id":  "opel_fiat_19_cdti_z19dth",
        "make":  "Opel",
        "model":  "Astra H, Vectra C, Signum, Zafira B (aussi Fiat Croma II 1.9 Multijet)",
        "generation":  "2004-2010",
        "engine":  {
                       "name":  "1.9 CDTI (120 ch 8V / 150 ch 16V)",
                       "code":  "Z19DT (8V) / Z19DTH (16V)",
                       "fuel":  "Diesel",
                       "displacement":  "1910 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "GM Dexos2",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "14 Nm (Torx T45)"
                                      },
                       "coolant":  {
                                       "type":  "GM Dex-Cool (Orange)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Coffre (boîtier REC)",
                          "number":  "F29",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V accessoires"
                      },
                      {
                          "location":  "Compartiment Moteur (UEC)",
                          "number":  "F26",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Gestion moteur et volets de turbulence"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Barrette de liaison des volets de turbulence (swirl) sur collecteur d\u0027admission qui se décroche sur version 16V",
                                                   "Alternateur Denso 105A/120A qui lâche brusquement (défaut de pont de diodes)",
                                                   "Vanne EGR encrassée et vanne papillon étouffoir remplie d\u0027huile"
                                               ],
                            "buying_advice":  "La version 8 soupapes (120 ch Z19DT) n\u0027a pas de volets swirl et s\u0027avère nettement plus tranquille que la version 150 ch."
                        }
    },
    {
        "id":  "toyota_22_dcat_2ad",
        "make":  "Toyota",
        "model":  "RAV4 III, Avensis II/III, Auris I, Corolla Verso II (aussi Lexus IS 220d)",
        "generation":  "2005-2014",
        "engine":  {
                       "name":  "2.2 D-4D / D-CAT (136, 150, 177 ch)",
                       "code":  "2AD-FTV (136/150 ch) / 2AD-FHV (177 ch D-CAT)",
                       "fuel":  "Diesel",
                       "displacement":  "2231 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 (C2)",
                                          "norm":  "ACEA C2 (obligatoire pour système D-CAT)",
                                          "capacity_with_filter":  "5.9 L",
                                          "drain_plug_torque":  "38 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota Super Long Life Coolant (Rose)",
                                       "capacity":  "7.8 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous le tableau de bord à gauche)",
                          "number":  "CIG",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "EFI MAIN",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Injection et 5e injecteur D-CAT"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Érosion du plan de joint de culasse et tassement du bloc en aluminium (surpression et refoulement dans le vase d\u0027expansion)",
                                                   "Encrassement du 5e injecteur de régénération d\u0027échappement sur système D-CAT (fumée blanche)",
                                                   "Vanne EGR colmatée très fréquemment en ville"
                                               ],
                            "buying_advice":  "Vérifier impérativement l\u0027absence de traces blanchâtres de liquide autour du bouchon de vase d\u0027expansion moteur chaud (symptôme classique de joint de culasse)."
                        }
    },
    {
        "id":  "nissan_15_dci_k9k_adblue",
        "make":  "Nissan",
        "model":  "Qashqai II (J11), Juke I/II, Micra K14 (aussi Dacia Duster II, Renault Clio V 1.5 Blue dCi)",
        "generation":  "2018-2024",
        "engine":  {
                       "name":  "1.5 Blue dCi / dCi 115 (Euro 6d avec SCR)",
                       "code":  "K9K 872 / K9K 876",
                       "fuel":  "Diesel",
                       "displacement":  "1461 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "RN17 (5W-30) ou RN17 FE (0W-20)",
                                          "capacity_with_filter":  "4.8 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D ou Type E",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe latérale gauche)",
                          "number":  "F13",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (IPDM)",
                          "number":  "F4",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Pompe d\u0027injection et réchauffeur gazole"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Cristallisation de l\u0027urée AdBlue sur l\u0027injecteur SCR en amont du catalyseur",
                                                   "Capteur de particules (sonde PM) et sonde NOx aval remontant des alertes antipollution",
                                                   "Bloc moteur K9K fiabilisé au fil des générations (coussinets et injection sans problème)"
                                               ],
                            "buying_advice":  "L\u0027ultime évolution du 1.5 dCi : mécanique très robuste et sobre, surveiller uniquement les composants du système AdBlue."
                        }
    },
    {
        "id":  "renault_20_16v_f4r",
        "make":  "Renault",
        "model":  "Clio II RS, Clio III RS, Megane II RS, Megane III RS, Laguna II/III, Scenic II",
        "generation":  "2000-2016",
        "engine":  {
                       "name":  "2.0 16V (135 ch atmosphérique / 172-203 ch Clio RS / 225-275 ch Megane RS Turbo)",
                       "code":  "F4R / F4Rt",
                       "fuel":  "Essence",
                       "displacement":  "1998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 synthétique (0W-40 sur RS piste)",
                                          "norm":  "RN0710 (RN0700 sur 135 ch)",
                                          "capacity_with_filter":  "5.4 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune)",
                                       "capacity":  "7.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 (DOT 5.1 / RBF600 pour modèles RS)"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "FM2",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Bobines crayon et injection"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Poulie de déphaseur d\u0027arbre à cames (sur atmosphérique) qui devient bruyante au démarrage à froid",
                                                   "Bobines d\u0027allumage individuelles sensibles à l\u0027échauffement",
                                                   "Collecteur d\u0027échappement qui peut se fissurer sur Megane 2 RS"
                                               ],
                            "buying_advice":  "Bas moteur en fonte extrêmement robuste, capable d\u0027encaisser de très fortes charges. Remplacer la poulie déphaseur à chaque changement de courroie de distribution."
                        }
    },
    {
        "id":  "hyundai_kia_10_tgdi_g3lc",
        "make":  "Hyundai",
        "model":  "Hyundai i20 II/III, i30 III, Kona, Bayon (aussi Kia Ceed III, Rio IV, Stonic)",
        "generation":  "2015-2024",
        "engine":  {
                       "name":  "1.0 T-GDI 3 cylindres (100, 120 ch)",
                       "code":  "G3LC / Kappa II",
                       "fuel":  "Essence",
                       "displacement":  "998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 5W-30",
                                          "norm":  "ACEA C2 ou C5 / API SN PLUS (protection contre le cliquetis LSPI)",
                                          "capacity_with_filter":  "3.6 L",
                                          "drain_plug_torque":  "40 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Antigel phosphate Hyundai/Kia (Rose)",
                                       "capacity":  "5.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe sous tableau de bord)",
                          "number":  "POWER OUTLET",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V console"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "IGN COIL",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Encrassement des soupapes d\u0027admission lié à l\u0027injection directe",
                                                   "Actuateur électronique de décharge de turbo (wastegate) sujet au jeu mécanique",
                                                   "Sensibilité au cliquetis à bas régime (LSPI) si l\u0027huile n\u0027est pas certifiée API SN Plus ou SP"
                                               ],
                            "buying_advice":  "Très bon 3 cylindres turbo moderne. Exiger une huile certifiée API SN Plus / SP pour préserver les pistons du cliquetis."
                        }
    },
    {
        "id":  "vag_19_sdi_ea080",
        "make":  "Volkswagen",
        "model":  "Golf IV, Bora, Polo 6N2/9N (aussi Seat Ibiza III, Cordoba, Leon 1M, Skoda Octavia 1)",
        "generation":  "1997-2005",
        "engine":  {
                       "name":  "1.9 SDI 68 ch (Atmosphérique injection directe)",
                       "code":  "AGP / AQM / ASY",
                       "fuel":  "Diesel",
                       "displacement":  "1896 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "10W-40 ou 5W-40",
                                          "norm":  "VW 505.00",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "30 Nm (vis six pans 19 mm)"
                                      },
                       "coolant":  {
                                       "type":  "G12 (Rose)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Habitacle",
                          "number":  "F28",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Pompe à carburant et relais 109"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Relais 109 (alimentation calculateur) dont les soudures internes lâchent (coupure moteur nette en roulant)",
                                                   "Boîte de vitesses mécanique à tringlerie (type 02K avec rivets différentiel fragiles sur premières séries)",
                                                   "Absence complète de turbo, d\u0027échangeur ou de bi-masse : longévité moteur quasi infinie (dépasse 500 000 km sans effort)"
                                               ],
                            "buying_advice":  "Très lent mais d\u0027une robustesse mécanique à toute épreuve. Avoir un relais 109 de secours dans la boîte à gants."
                        }
    },
    {
        "id":  "bmw_30i_b58",
        "make":  "BMW",
        "model":  "Série 1 F20 (M140i), Série 2 F22/G42 (M240i), Série 3 F30/G20 (340i/M340i), Série 5 G30 (540i), X3 M40i (aussi Toyota Supra GR A90)",
        "generation":  "2015-2024",
        "engine":  {
                       "name":  "3.0 TwinPower Turbo 6 cylindres en ligne (326 à 382 ch)",
                       "code":  "B58B30A / B58B30C / B58B30O1",
                       "fuel":  "Essence",
                       "displacement":  "2998 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 ou 0W-30 / 5W-30",
                                          "norm":  "BMW Longlife-17 FE+ ou LL-04 / LL-01",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-18 ou LC-87",
                                       "capacity":  "Circuit moteur : ~8.5 L / Circuit refroidissement turbo/air : ~3.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Coffre (plancher droit)",
                          "number":  "F218",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V habitacle"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F42",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Bobines et DME"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Durite rigide de purge de refroidissement reliant la culasse au bocal qui devient poreuse avec la chaleur",
                                                   "Bouchon de vase d\u0027expansion secondaire (refroidissement indirect de suralimentation) fuyant sous pression",
                                                   "Diaphragme de reniflard d\u0027huile PCV intégré au couvre-culasse qui se déchire (sifflement aigu au ralenti)"
                                               ],
                            "buying_advice":  "Considéré comme l\u0027un des meilleurs moteurs 6 cylindres modernes au monde. Énorme potentiel de fiabilité et de préparation."
                        }
    },
    {
        "id":  "ford_15_tdci_ecoblue",
        "make":  "Ford",
        "model":  "Fiesta VII/VIII, Focus III/IV, EcoSport, Kuga II, Tourneo Connect",
        "generation":  "2015-2024",
        "engine":  {
                       "name":  "1.5 TDCi / EcoBlue (85, 95, 120 ch)",
                       "code":  "XUJA / XUJB / Z2DA / Z2DB (Base DV5 / Ford)",
                       "fuel":  "Diesel",
                       "displacement":  "1499 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20 (EcoBlue) ou 5W-30 (TDCi Euro 6)",
                                          "norm":  "Ford WSS-M2C952-A1 (0W-20) ou WSS-M2C913-D",
                                          "capacity_with_filter":  "3.85 L",
                                          "drain_plug_torque":  "24 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange)",
                                       "capacity":  "6.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F61",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V console centrale"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F34",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Calculateur d\u0027injection et électrovannes"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Sur version EcoBlue (arbre à cames double) : chaîne de synchronisation interne de 7 mm fragile (similaire au 1.5 BlueHDi PSA)",
                                                   "Encrassement de la soupape EGR et du doseur d\u0027air",
                                                   "Injecteur d\u0027urée AdBlue sujet à la cristallisation en hiver"
                                               ],
                            "buying_advice":  "Privilégier les modèles avec suivi rigoureux de l\u0027huile moteur en 0W-20 spécifique Ford WSS-M2C952-A1."
                        }
    },
    {
        "id":  "mercedes_15_cdi_om607_om608",
        "make":  "Mercedes-Benz",
        "model":  "Classe A W176/W177 (A160d, A180d), Classe B W246/W247, CLA C117/C118, GLA X156, Citan",
        "generation":  "2012-2024",
        "engine":  {
                       "name":  "1.5 CDI / d 90 / 109 / 116 ch",
                       "code":  "OM607.912 / OM608.915 (Base Renault K9K revue par Mercedes)",
                       "fuel":  "Diesel",
                       "displacement":  "1461 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-20 (OM608 Euro 6d)",
                                          "norm":  "MB 229.51 ou MB 229.71",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.5 (Rose/Violet)",
                                       "capacity":  "6.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (côté passager sous moquette)",
                          "number":  "F110",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise accessoires 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (SAM)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Gestion injection et préchauffage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Capteur de pression différentielle FAP dont les tuyaux souples cuisent avec la chaleur",
                                                   "Vanne EGR basse pression s\u0027encrassant sur les trajets urbains courts",
                                                   "Moteur globalement réputé pour sa très grande sobriété et sa longévité générale"
                                               ],
                            "buying_advice":  "Entretien très économique pour une Mercedes grâce à la large diffusion des pièces d\u0027origine Renault/Dacia."
                        }
    },
    {
        "id":  "fiat_23_multijet_ducato_f1ae",
        "make":  "Fiat",
        "model":  "Fiat Ducato II/III (aussi Iveco Daily III/IV/V, UAZ Patriot)",
        "generation":  "2002-2021",
        "engine":  {
                       "name":  "2.3 MultiJet (110, 120, 130, 150, 180 ch)",
                       "code":  "F1AE0481 / F1AE3481 / F1AGL411 (Moteur Sofim / FPT)",
                       "fuel":  "Diesel",
                       "displacement":  "2287 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 (C2) ou 0W-30 (Euro 6)",
                                          "norm":  "Fiat 9.55535-S1 (Euro 4/5) ou 9.55535-DS1 (Euro 6)",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Paraflu UP (Rouge)",
                                       "capacity":  "11.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc montant gauche)",
                          "number":  "F15",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V planche de bord"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F17",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Calculateur d\u0027injection et pompe"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Infiltrations d\u0027eau récurrentes par la baie de pare-brise rouillant les injecteurs et le boîtier papillon",
                                                   "Boîtier papillon motorisé grippé par l\u0027humidité et les résidus d\u0027huile",
                                                   "Courroie de distribution à remplacer scrupuleusement tous les 5 ans même avec faible kilométrage (casse fréquente sur camping-cars stationnés)"
                                               ],
                            "buying_advice":  "Le roi incontesté du marché des utilitaires et des camping-cars. Installer la goulotte de protection anti-pluie au-dessus des injecteurs."
                        }
    },
    {
        "id":  "renault_16_etech_hybrid",
        "make":  "Renault",
        "model":  "Clio V E-Tech, Captur II E-Tech, Arkana E-Tech (aussi Dacia Jogger Hybrid, Dacia Duster III)",
        "generation":  "2020-2026",
        "engine":  {
                       "name":  "1.6 E-Tech Hybride 140 / 145 ch (Moteur atmosphérique + 2 moteurs électriques)",
                       "code":  "H4M 630 / 632",
                       "fuel":  "Essence Hybride",
                       "displacement":  "1598 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20",
                                          "norm":  "RN17 FE",
                                          "capacity_with_filter":  "4.3 L",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type E",
                                       "capacity":  "Circuit moteur thermique : ~5.5 L / Circuit refroidissement batterie/onduleur : ~3.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 ESP"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe gauche sous volant)",
                          "number":  "F14",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V accessoires"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "FM4",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Gestion hybride et boîte à crabots"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "À-coups ou blocages de rapports sur la boîte de vitesses innovante multimode à crabots sans embrayage (mises à jour logicielles impératives)",
                                                   "Bruit de sifflement de la transmission en phase de régénération forte",
                                                   "Moteur thermique 1.6 atmosphérique d\u0027origine Nissan (HR16) très fiable et sans fioritures"
                                               ],
                            "buying_advice":  "Vérifier lors de l\u0027essai routier la fluidité des passages de vitesses entre électrique et thermique."
                        }
    },
    {
        "id":  "toyota_25_hybrid_a25a_fxs",
        "make":  "Toyota",
        "model":  "RAV4 V, Camry VIII, Highlander IV (aussi Lexus ES 300h, NX 350h)",
        "generation":  "2018-2026",
        "engine":  {
                       "name":  "2.5 Hybrid Dynamic Force (218 à 222 ch système)",
                       "code":  "A25A-FXS",
                       "fuel":  "Essence Hybride",
                       "displacement":  "2487 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-16 (recommandé) ou 0W-20",
                                          "norm":  "API SP / ILSAC GF-6B",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "40 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota Super Long Life Coolant (Rose)",
                                       "capacity":  "Moteur : 6.6 L / Inverseur hybride : 2.1 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous le tableau de bord à gauche)",
                          "number":  "P/OUTLET",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "HEV",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Contrôle système hybride"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Corrosion du connecteur du câble haute tension sous le châssis arrière sur versions 4 roues motrices AWD-i (problème \u0027Cablegate\u0027)",
                                                   "Rendement thermique exceptionnel de 41 % sans turbo : endurance mécanique maximale",
                                                   "Encrassement très faible des conduits d\u0027admission grâce à la double injection directe et indirecte (D-4S)"
                                               ],
                            "buying_advice":  "Inspecter visuellement l\u0027état du câble orange haute tension au niveau du train arrière sur les versions 4x4 AWD."
                        }
    },
    {
        "id":  "mazda_22_skyactiv_d_sh",
        "make":  "Mazda",
        "model":  "Mazda 3 (BM/BN), Mazda 6 (GJ/GL), CX-5 (KE/KF)",
        "generation":  "2012-2022",
        "engine":  {
                       "name":  "2.2 SkyActiv-D Twin-Turbo (150, 175, 184 ch)",
                       "code":  "SH-VPTS / SH-VPTR",
                       "fuel":  "Diesel",
                       "displacement":  "2191 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-30 ou 5W-30",
                                          "norm":  "Mazda Original Oil Supra DPF / ACEA C3",
                                          "capacity_with_filter":  "5.1 L",
                                          "drain_plug_torque":  "38 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Mazda FL22 (Vert)",
                                       "capacity":  "8.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (montant de porte gauche)",
                          "number":  "OUTLET",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "ENGINE 1",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Gestion moteur bi-turbo"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Usure prématurée des cames d\u0027échappement provoquant limaille et colmatage de la crépine de pompe à huile (casse moteur)",
                                                   "Fuite aux rondelles pare-flamme des injecteurs polluant l\u0027huile par la suie",
                                                   "Clapet de décharge du petit turbo qui casse ou prend du jeu"
                                               ],
                            "buying_advice":  "Moteur diesel très souple mais fragile. Déposer le carter pour vérifier la propreté de la crépine d\u0027huile avant tout achat."
                        }
    },
    {
        "id":  "opel_14_turbo_a14net",
        "make":  "Opel",
        "model":  "Astra J, Corsa D/E, Meriva B, Mokka, Zafira Tourer, Insignia A (aussi Chevrolet Cruze 1.4T)",
        "generation":  "2010-2019",
        "engine":  {
                       "name":  "1.4 Turbo Ecotec (120, 140 ch)",
                       "code":  "A14NEL / A14NET / B14NET",
                       "fuel":  "Essence",
                       "displacement":  "1364 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30",
                                          "norm":  "Opel GM Dexos1 Gen 2 / Gen 3 (obligatoire pour contrer le cliquetis LSPI)",
                                          "capacity_with_filter":  "4.0 L",
                                          "drain_plug_torque":  "14 Nm (vis Torx T45 avec joint torique)"
                                      },
                       "coolant":  {
                                       "type":  "Glysantin G34 / GM Dex-Cool (Orange)",
                                       "capacity":  "6.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (UEC)",
                          "number":  "F16",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines et injecteurs"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Membrane de reniflard PCV intégrée au couvre-culasse qui se déchire (bruit de sifflement aigu, ralenti instable)",
                                                   "Petite valve champignon orange disparue dans le collecteur d\u0027admission (dépression excessive)",
                                                   "Vase d\u0027expansion et raccord de retour de liquide de refroidissement qui cuisent et fuient"
                                               ],
                            "buying_advice":  "Vérifier l\u0027absence de sifflement au ralenti : si le sifflement disparaît en retirant la jauge d\u0027huile, le couvre-culasse est à remplacer."
                        }
    },
    {
        "id":  "psa_19_d_dw8",
        "make":  "Peugeot",
        "model":  "206, 306, Partner I (aussi Citroën Xsara, Berlingo I)",
        "generation":  "1998-2006",
        "engine":  {
                       "name":  "1.9 D 69 ch (Atmosphérique injection indirecte)",
                       "code":  "DW8 / DW8B (WJZ / WJY)",
                       "fuel":  "Diesel",
                       "displacement":  "1868 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "10W-40 ou 15W-40",
                                          "norm":  "PSA B71 2295 / B71 2294",
                                          "capacity_with_filter":  "4.5 L",
                                          "drain_plug_torque":  "30 Nm (vis six pans 21 mm avec joint cuivre)"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110 (Bleu/Vert)",
                                       "capacity":  "8.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (boîtier BSI)",
                          "number":  "F22",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F2",
                          "rating":  "50A",
                          "color":  "Rouge",
                          "function":  "Boîtier de préchauffage bougies"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Prise d\u0027air sur le support de filtre à gazole Purflux (poire d\u0027amorçage molle, démarrage difficile après arrêt prolongé)",
                                                   "Jeu aux soupapes qui diminue avec le temps (pastillage de réglage à refaire si démarrage difficile à froid)",
                                                   "Pompe à injection Lucas/Delphi sensible aux fuites d\u0027axe d\u0027accélérateur"
                                               ],
                            "buying_advice":  "Mécanique ultra-rustique, réparable avec des outils de base et d\u0027une solidité légendaire."
                        }
    },
    {
        "id":  "vag_14_16v_ea111",
        "make":  "Volkswagen",
        "model":  "Golf IV, Golf V, Golf VI, Polo 9N/6R (aussi Seat Ibiza III/IV, Cordoba, Skoda Fabia I/II, Octavia)",
        "generation":  "1999-2014",
        "engine":  {
                       "name":  "1.4 16V atmosphérique (75, 80, 86 ch)",
                       "code":  "APE / AUA / BBY / BKY / BXW / CGGB",
                       "fuel":  "Essence",
                       "displacement":  "1390 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 ou 10W-40",
                                          "norm":  "VW 502.00",
                                          "capacity_with_filter":  "3.2 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12+ (Rose)",
                                       "capacity":  "5.6 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare / Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB10",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Calculateur moteur et bobines"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Phénomène de battement de piston à froid (piston slap) sur blocs APE/AUA (claquement de diesel à froid bénin mais persistant)",
                                                   "Double courroie de distribution (principale + liaison arbres à cames) dont les galets tendeurs en plastique vieillissent mal",
                                                   "Boîtier papillon très facilement encrassé provoquant des calages à l\u0027arrêt"
                                               ],
                            "buying_advice":  "Remplacer scrupuleusement la distribution complète avec tous les galets tendeurs plastique tous les 5 à 6 ans."
                        }
    },
    {
        "id":  "psa_14_vti_ep3",
        "make":  "Peugeot",
        "model":  "207, 208 I, 308 I (aussi Citroën C3 II, C3 Picasso, C4 I/II, DS3, Mini One R56)",
        "generation":  "2007-2015",
        "engine":  {
                       "name":  "1.4 VTi 95 ch (Base moteur Prince)",
                       "code":  "EP3 / EP3C / 8FS / 8FP",
                       "fuel":  "Essence",
                       "displacement":  "1397 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 0W-30",
                                          "norm":  "PSA B71 2290 ou B71 2312",
                                          "capacity_with_filter":  "4.25 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "PSA B71 5110 (Bleu/Vert)",
                                       "capacity":  "6.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle",
                          "number":  "F10",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur (BSM)",
                          "number":  "F2",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Calculateur d\u0027injection et relais moteur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Allongement de la chaîne de distribution et décalage des déphaseurs VTi (défaut calage distribution à froid)",
                                                   "Surconsommation d\u0027huile moteur importante par les joints de queues de soupapes",
                                                   "Boîtier de sortie d\u0027eau (thermostat piloté plastique) qui fissure et fuit"
                                               ],
                            "buying_advice":  "Surveiller le niveau d\u0027huile tous les 1 000 km et écouter les bruits de chaîne au premier démarrage le matin."
                        }
    },
    {
        "id":  "renault_19_dci_f9q",
        "make":  "Renault",
        "model":  "Megane II/III, Scenic II/III, Laguna II/III, Trafic II (aussi Suzuki Grand Vitara 1.9 DDiS)",
        "generation":  "2001-2012",
        "engine":  {
                       "name":  "1.9 dCi (120, 130 ch)",
                       "code":  "F9Q 800 / 804 / 812 / 870",
                       "fuel":  "Diesel",
                       "displacement":  "1870 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 (sans FAP) ou 5W-30 (avec FAP)",
                                          "norm":  "RN0710 (sans FAP) ou RN0720 (avec FAP)",
                                          "capacity_with_filter":  "4.8 à 5.1 L",
                                          "drain_plug_torque":  "20 Nm (vis à carré 8 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Glaceol RX Type D (Jaune/Vert)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (trappe sous volant)",
                          "number":  "F4",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur (UPC)",
                          "number":  "FM3",
                          "rating":  "25A",
                          "color":  "Blanc",
                          "function":  "Pompe d\u0027injection et calculateur"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "F9Q 120 ch (2001-2005) : Casse fréquente du turbocompresseur entraînant un emballement moteur par aspiration d\u0027huile",
                                                   "Coussinets de bielle fragiles sur versions 120 ch (à remplacer préventivement vers 160 000 km)",
                                                   "F9Q 130 ch (dès 2005) : Bloc entièrement fiabilisé, coussinets renforcés et turbo refroidi par eau"
                                               ],
                            "buying_advice":  "Éviter les versions 120 ch sauf si le turbo et les coussinets ont été remplacés. La version 130 ch est très robuste."
                        }
    },
    {
        "id":  "bmw_6cyl_n52_n53",
        "make":  "BMW",
        "model":  "Série 1 E87 (130i), Série 3 E90 (325i, 328i, 330i), Série 5 E60/F10 (523i, 528i, 530i), X3 E83, Z4 E85/E89",
        "generation":  "2004-2013",
        "engine":  {
                       "name":  "2.5i / 3.0i 6 cylindres en ligne atmosphérique (218 à 272 ch)",
                       "code":  "N52B25 / N52B30 (Valvetronic) \u0026 N53B30 (Injection directe)",
                       "fuel":  "Essence",
                       "displacement":  "2497 à 2996 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "BMW Longlife-01 ou LL-04",
                                          "capacity_with_filter":  "6.5 L",
                                          "drain_plug_torque":  "25 Nm"
                                      },
                       "coolant":  {
                                       "type":  "BMW LC-87 (Bleu)",
                                       "capacity":  "8.2 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F08",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F02",
                          "rating":  "30A",
                          "color":  "Vert",
                          "function":  "Pompe à eau électrique et thermostats"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Pompe à eau électrique Pierburg qui s\u0027arrête brusquement sans signe avant-coureur (surchauffe immédiate vers 120 000 km)",
                                                   "N53 (injection directe) : Injecteurs piézoélectriques fuyards, bobines d\u0027allumage et sonde NOx très capricieux",
                                                   "N52 (magnésium/aluminium) : Poussoirs hydrauliques bruyants à froid (tic-tac sans gravité) et solénoïdes de VANOS encrassés"
                                               ],
                            "buying_advice":  "Privilégier le bloc N52 (injection indirecte, couvre-culasse plastique noir ou alu) bien plus fiable que le N53."
                        }
    },
    {
        "id":  "ford_15_ecoboost_dragon",
        "make":  "Ford",
        "model":  "Fiesta ST Mk8, Focus IV, Puma, Puma ST, Kuga III",
        "generation":  "2018-2026",
        "engine":  {
                       "name":  "1.5 EcoBoost 3 cylindres (150, 182, 200 ch ST)",
                       "code":  "Dragon / YZDA / Y1DA",
                       "fuel":  "Essence",
                       "displacement":  "1496 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-20",
                                          "norm":  "Ford WSS-M2C948-B",
                                          "capacity_with_filter":  "5.05 L",
                                          "drain_plug_torque":  "28 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Ford Super Plus Premium (Orange)",
                                       "capacity":  "6.8 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière trappe conducteur)",
                          "number":  "F47",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Prise 12V accessoires"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F11",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines d\u0027allumage"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Distribution par chaîne (contrairement au 1.0 EcoBoost à courroie humide), mais courroie humide conservée pour la pompe à huile",
                                                   "Système de désactivation de cylindre (passage sur 2 cylindres) provoquant des vibrations légères à vitesse stabilisée",
                                                   "Rupture de la petite durite rigide d\u0027expansion sur les premiers modèles"
                                               ],
                            "buying_advice":  "Très performant et joueur (surtout en version ST 200 ch). Respecter scrupuleusement la norme d\u0027huile 948-B pour la courroie de pompe à huile."
                        }
    },
    {
        "id":  "fiat_09_twinair",
        "make":  "Fiat",
        "model":  "Fiat 500, Panda III, Punto, 500L (aussi Lancia Ypsilon II, Alfa Romeo MiTo)",
        "generation":  "2010-2020",
        "engine":  {
                       "name":  "0.9 TwinAir Turbo 2 cylindres (85, 105 ch)",
                       "code":  "312A2000 / 199B6000",
                       "fuel":  "Essence",
                       "displacement":  "875 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 C3 (85 ch) ou 0W-30 (105 ch)",
                                          "norm":  "Fiat 9.55535-S2 (5W-40) ou Fiat 9.55535-GS1 (0W-30)",
                                          "capacity_with_filter":  "3.2 L",
                                          "drain_plug_torque":  "20 Nm (clé Allen 12 mm)"
                                      },
                       "coolant":  {
                                       "type":  "Paraflu UP (Rouge)",
                                       "capacity":  "5.3 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (BSI)",
                          "number":  "F85",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V / Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "F18",
                          "rating":  "10A",
                          "color":  "Rouge",
                          "function":  "Centrale d\u0027injection et module Uniair"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Défaillance du module électro-hydraulique MultiAir (actionnement des soupapes d\u0027admission) en cas d\u0027espacement des vidanges",
                                                   "Bruit de cliquetis de wastegate turbo à la décélération",
                                                   "Vibrations naturelles importantes inhérentes à l\u0027architecture bi-cylindre (volant moteur bi-masse très sollicité)"
                                               ],
                            "buying_advice":  "Vidange annuelle impérative avec nettoyage du micro-filtre tamis du module MultiAir. Bruit moteur atypique à appréhender."
                        }
    },
    {
        "id":  "mercedes_20_turbo_m270_m274",
        "make":  "Mercedes-Benz",
        "model":  "Classe A W176, Classe B W246, CLA C117, GLA X156 (M270 transversal) / Classe C W205, Classe E W212/W213, GLC (M274 longitudinal)",
        "generation":  "2012-2020",
        "engine":  {
                       "name":  "1.6 / 2.0 Turbo BlueDIRECT (122, 156, 184, 211 ch)",
                       "code":  "M270.910 / M270.920 (Transversal) \u0026 M274.910 / M274.920 (Longitudinal)",
                       "fuel":  "Essence",
                       "displacement":  "1595 à 1991 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "MB 229.5 ou MB 229.51 / 229.52",
                                          "capacity_with_filter":  "5.6 à 7.0 L selon carter",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "MB 325.5 (Rose/Violet)",
                                       "capacity":  "7.5 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 Plus"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc passager)",
                          "number":  "F110",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V console"
                      },
                      {
                          "location":  "Compartiment Moteur (SAM)",
                          "number":  "F22",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines et gestion injection directe"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "M274 : Fissuration du piston 1 suite à du cliquetis LSPI sur versions 2014-2016",
                                                   "Thermostat piloté intégré avec pompe à eau à régulation mécanique défaillant",
                                                   "Déphaseur d\u0027arbre à cames d\u0027admission bruyant au démarrage (défaut P0011)"
                                               ],
                            "buying_advice":  "Utiliser impérativement une huile de haute qualité répondant à la norme MB 229.5 pour préserver les pistons de l\u0027auto-allumage destructeur."
                        }
    },
    {
        "id":  "toyota_12_turbo_8nr_fts",
        "make":  "Toyota",
        "model":  "Auris II, Corolla XII, C-HR",
        "generation":  "2015-2022",
        "engine":  {
                       "name":  "1.2 Turbo D-4T (116 ch)",
                       "code":  "8NR-FTS",
                       "fuel":  "Essence",
                       "displacement":  "1197 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "0W-20",
                                          "norm":  "API SN/SP / ILSAC GF-5",
                                          "capacity_with_filter":  "4.0 L",
                                          "drain_plug_torque":  "37 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Toyota SLLC (Rose)",
                                       "capacity":  "Circuit moteur : 5.8 L / Intercooler eau : 1.7 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (sous planche de bord gauche)",
                          "number":  "P/OUTLET",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "EFI MAIN",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Gestion injection et turbo"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Encrassement modéré des soupapes d\u0027admission (injection directe)",
                                                   "Sensibilité de la pompe à eau additionnelle de l\u0027échangeur air/eau du turbo",
                                                   "Moteur globalement exempt de défauts majeurs par rapport à ses concurrents européens"
                                               ],
                            "buying_advice":  "Très bonne alternative essence classique aux modèles hybrides de Toyota pour qui roule peu."
                        }
    },
    {
        "id":  "nissan_25_dci_yd25",
        "make":  "Nissan",
        "model":  "Navara D40, Pathfinder R51, Cabstar, Murano II (2.5 dCi)",
        "generation":  "2005-2015",
        "engine":  {
                       "name":  "2.5 dCi 16V (144, 171, 174, 190 ch)",
                       "code":  "YD25DDTi",
                       "fuel":  "Diesel",
                       "displacement":  "2488 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-30 ou 5W-40",
                                          "norm":  "ACEA C3 (avec FAP) ou ACEA B4 (sans FAP)",
                                          "capacity_with_filter":  "6.9 à 7.5 L",
                                          "drain_plug_torque":  "34 Nm"
                                      },
                       "coolant":  {
                                       "type":  "Nissan L248 / L250 (Vert)",
                                       "capacity":  "10.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (derrière boîte à gants)",
                          "number":  "F15",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Prise 12V accessoires"
                      },
                      {
                          "location":  "Compartiment Moteur (IPDM)",
                          "number":  "F43",
                          "rating":  "20A",
                          "color":  "Jaune",
                          "function":  "Pompe d\u0027injection Denso et relais"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Rupture de la chaîne de distribution simple inférieure (duplex supérieur fiable, mais simple brin inférieur fragile jusqu\u0027en 2010)",
                                                   "Fissuration de la culasse entre les soupapes suite à surchauffe sur Pathfinder",
                                                   "Régulateur de pression de carburant sur pompe Denso (SCV) qui grippe"
                                               ],
                            "buying_advice":  "Surveiller les bruits de chaîne au ralenti. Poser impérativement le kit de conversion en chaîne double (duplex complet)."
                        }
    },
    {
        "id":  "vag_32_vr6_ea390",
        "make":  "Volkswagen",
        "model":  "Golf IV R32, Golf V R32, Passat B6, Eos (aussi Audi TT 8N/8J 3.2, Audi A3 8P 3.2, Porsche Cayenne I 3.2)",
        "generation":  "2002-2010",
        "engine":  {
                       "name":  "3.2 VR6 24V (241, 250 ch)",
                       "code":  "BFH / BML / BDB / BMJ / BUB",
                       "fuel":  "Essence",
                       "displacement":  "3189 cm³"
                   },
        "fluids":  {
                       "engine_oil":  {
                                          "viscosity":  "5W-40 synthétique haute performance",
                                          "norm":  "VW 502.00",
                                          "capacity_with_filter":  "5.5 L",
                                          "drain_plug_torque":  "30 Nm"
                                      },
                       "coolant":  {
                                       "type":  "G12+ (Rose)",
                                       "capacity":  "9.0 L"
                                   },
                       "brake_fluid":  {
                                           "type":  "DOT 4 LV"
                                       }
                   },
        "fuses":  [
                      {
                          "location":  "Habitacle (flanc gauche planche de bord)",
                          "number":  "F41",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Allume-cigare"
                      },
                      {
                          "location":  "Compartiment Moteur",
                          "number":  "SB23",
                          "rating":  "15A",
                          "color":  "Bleu",
                          "function":  "Bobines individuelles VR6"
                      }
                  ],
        "reliability":  {
                            "chronic_faults":  [
                                                   "Allongement des deux chaînes de distribution situées à l\u0027arrière côté boîte (défauts d\u0027arbres à cames au VCDS, dépose moteur/boîte)",
                                                   "Pompe à huile dont le clapet de décharge grippe fermé, générant une surpression fatale pour les patins de chaîne",
                                                   "Tubulure d\u0027admission à géométrie variable dont les paliers prennent du jeu (bruit de vibration plastique)"
                                               ],
                            "buying_advice":  "Contrôler les canaux 208 et 209 au VCDS : une valeur d\u0027angle de déphasage dépassant -8° impose le remplacement immédiat des chaînes."
                        }
    }
];