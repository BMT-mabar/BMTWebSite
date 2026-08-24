// --- COMPREHENSIVE PRODUCT DATABASE (Matched to BMT-Products-Catalogue & Catalogue2 PDF) ---
const productsDatabase = [
  // --- INFECTIOUS DISEASE & PATENTED DEVICES (B2B & B2C PHARMA) ---
  { 
    id: 'labontime-swab-otc', 
    category: ['b2c', 'b2b'], 
    subCat: 'Infectious', 
    image: '/DSC_2104.JPG', 
    isProfessionalOnly: true,
    isPatented: true,
    title: { 
      he: 'LabOnTime Swab - בדיקה מהירה לדלקת גרון (שלב 1 A STREP) *פטנט', 
      en: 'LabOnTime Swab - Strep A Rapid Test (1-Step Patent)', 
      de: 'LabOnTime Swab - Strep A Schnelltest (1-Schritt-Patent)', 
      fr: 'LabOnTime Swab - Test Rapide Strep A (Brevet 1 Étape)', 
      ru: 'LabOnTime Swab Strep A', 
      ar: 'LabOnTime Swab Strep A' 
    },
    shortDesc: { 
      he: 'בדיקת סוואב מהירה לדלקת גרון בפורמט LabOnTime Swab המוגן בפטנט (ברקוד: 7290008123723). ביצוע בשלב 1 ללא העברות נוזל פתוחות. לשימוש מקצועי בלבד.', 
      en: 'Rapid throat swab Strep A test in patented LabOnTime Swab 1-Step device format (Barcode: 7290008123723). For professional use only.', 
      de: 'Schnelltest auf Strep A im patentierten LabOnTime Swab 1-Schritt-Format (Barcode: 7290008123723).', 
      fr: 'Test rapide d\'écouvillon pharyngé Strep A au format breveté LabOnTime Swab 1-Étape (Code-barres: 7290008123723).' 
    },
    specs: { 
      type: 'Throat Swab / סוואב גרון', 
      sensitivity: '95.1%', 
      specificity: '100%', 
      time: '5 Min', 
      steps: '1-Step (no step)', 
      setting: 'Professional Only / לשימוש מקצועי בלבד',
      barcode: '7290008123723' 
    }
  },
  { 
    id: 'strep-a-pen', 
    category: ['b2b', 'b2c'], 
    subCat: 'Infectious', 
    image: '/DSC_2091.JPG', 
    img2: '/LabOnTime Device.jpg', 
    isProfessionalOnly: true,
    isPatented: true,
    title: { 
      he: 'בדיקת Strep A (פטנט no step - פורמט עט)', 
      en: 'Strep A Rapid Test (no step Pen Device)', 
      de: 'Strep A Schnelltest (no step Patent Stift-Format)', 
      fr: 'Test Rapide Strep A (Format Stylo Breveté no step)', 
      ru: 'Strep A Pen Device', 
      ar: 'Strep A Pen Device' 
    },
    shortDesc: { 
      he: 'הבדיקה המהירה בעולם לדלקת גרון בפורמט עט אבחון ייחודי (no step) המבטל לחלוטין העברות נוזלים פתוחות (ברקוד: 7290013882080 / מק"ט: 51084). לשימוש מקצועי בלבד.', 
      en: 'The fastest Strep A test for throat swabs in unique pen device format eliminating open fluid transfers (Barcode: 7290013882080 / Cat: 51084). For professional use.', 
      de: 'Der schnellste Strep A-Test im patentierten Stiftformat ohne offene Flüssigkeitsübertragung (Barcode: 7290013882080).', 
      fr: 'Le test Strep A le plus rapide au format stylo breveté éliminant tout transfert de liquide (Code-barres: 7290013882080).' 
    },
    specs: { 
      type: 'Throat Swab / סוואב גרון', 
      sensitivity: '95.1%', 
      specificity: '100%', 
      time: '5 Min', 
      steps: 'no step', 
      setting: 'Professional Only / לשימוש מקצועי בלבד',
      barcode: '7290013882080' 
    },
    comparison: { 
      us: { steps: 'no step', time: '5 min', transfers: '0' }, 
      them: { steps: '9', time: '12 min', transfers: '4' } 
    },
    youtubeId: 'x92STpm-v9w'
  },
  { 
    id: 'flu-ab', 
    category: ['b2b', 'b2c'], 
    subCat: 'Infectious', 
    image: '/DSC_2098.JPG', 
    img2: '/LabOnTime Device.jpg', 
    isProfessionalOnly: true,
    isPatented: true,
    title: { 
      he: 'Influenza A+B (בדיקת שפעת A+B - לשימוש מקצועי)', 
      en: 'Influenza A+B Rapid Test (Professional Use Only)', 
      de: 'Influenza A+B Schnelltest (Professionell)', 
      fr: 'Test Rapide Grippe A+B (Professionnel)', 
      ru: 'Грипп A+B (Профессиональный)', 
      ar: 'الإنفلونزا A+B (للاستخدام المهني)' 
    },
    shortDesc: { 
      he: 'ערכה מהירה לגילוי מוקדם של שפעת עונתית A+B מדגימת אף, המיועדת לשימוש מקצועי במוסדות רפואיים ומרפאות (ברקוד: 7290013882165 / מק"ט: 51088).', 
      en: 'Rapid test for seasonal flu A+B from nasal swab, designed for professional clinical settings (Barcode: 7290013882165 / Cat: 51088).', 
      de: 'Schnelltest für saisonale Grippe A+B für professionelle Anwendung (Barcode: 7290013882165).', 
      fr: 'Test rapide pour la grippe saisonnière A+B à usage professionnel (Code-barres: 7290013882165).' 
    },
    specs: { 
      sensitivity: '94.9% (CT < 30)', 
      specificity: '100%', 
      time: '10 Min', 
      type: 'Nasal Swab / דגימה מהאף', 
      setting: 'Professional Only / לשימוש מקצועי בלבד', 
      barcode: '7290013882165' 
    },
    youtubeId: '8cZ12wTlitA'
  },
  { 
    id: 'covid-otc', 
    category: ['b2c', 'b2b'], 
    subCat: 'Infectious', 
    image: '/Screenshot 2026-08-24 132643.png', 
    img2: '/LabOnTime Device.jpg', 
    isProfessionalOnly: false,
    isPatented: true,
    title: { 
      he: 'בדיקת COVID-19 Antigen (פטנט no step)', 
      en: 'COVID-19 Antigen Rapid Test (Patented no step Device)', 
      de: 'COVID-19 Antigen Schnelltest (no step Patentierte Testvorrichtung)', 
      fr: 'Test Rapide Antigen COVID-19 (Format Breveté no step)', 
      ru: 'Антиген COVID-19 (Патент no step)', 
      ar: 'مستضد كوفيد-19 (براءة اختراع no step)' 
    },
    shortDesc: { 
      he: 'בדיקת קורונה מהירה מדגימת אף בתצורת פטנט no step (ברקוד: 7290019098409 / מק"ט: 51095). טכנולוגיה מוגנת בפטנט המבטלת העברות נוזלים פתוחות, מקטינה חשיפה ביולוגית ומאפשרת אבחון מדויק ומהיר בנקודת הטיפול ובבית.', 
      en: 'Rapid COVID-19 Antigen nasal test in patented integrated No-Step format (Barcode: 7290019098409 / Cat: 51095). Patented technology eliminating open fluid transfers and reducing biohazard risks.', 
      de: 'Schnelltest auf COVID-19 Antigen im patentierten integrierten No-Step-Format (Barcode: 7290019098409).', 
      fr: 'Test rapide d\'antigène COVID-19 au format breveté No-Step (Code-barres: 7290019098409).' 
    },
    specs: { 
      feature: 'פטנט רשום no step',
      sensitivity: '>97%', 
      specificity: '100%', 
      time: '10 Min', 
      type: 'Nasal Swab / דגימה מהאף', 
      steps: 'no step (פטנט)', 
      barcode: '7290019098409' 
    },
    comparison: { 
      us: { steps: 'no step (פטנט)', time: '10 min', transfers: '0' }, 
      them: { steps: '8', time: '15 min', transfers: '3' } 
    },
    youtubeId: '0PwbjucJXCw'
  },
  { 
    id: 'resp-panels', 
    category: 'b2b', 
    subCat: 'Infectious', 
    image: '/DSC_2098.JPG',
    title: { he: 'RSV / Adenovirus / M. Pneumoniae', en: 'RSV / Adenovirus / M. Pneumoniae', de: 'RSV / Adenovirus / M. Pneumoniae', fr: 'RSV / Adénovirus / M. Pneumoniae', ru: 'Респираторные панели', ar: 'أمراض تنفسية' },
    shortDesc: { he: 'קסטות בדיקה מהירות למחלות דרכי הנשימה כולל פאנלים משולבים ומחלקתיים (Cat: 51073-51076).', en: 'Rapid test cassettes for respiratory tract infections including combo panels.', de: 'Schnelltestkassetten für Atemwegsinfektionen inklusive Kombinationstests.', fr: 'Cassettes de test rapide pour infections respiratoires.' },
    specs: { type: 'Nasal Swab / Aspirate', pack: '20 Tests' }
  },
  { 
    id: 'hiv-panels', 
    category: 'b2b', 
    subCat: 'Infectious', 
    image: '/DSC_2116.JPG',
    title: { he: 'HIV / Syphilis / Hepatitis Panels', en: 'HIV / Syphilis / Hepatitis Combo', de: 'HIV / Syphilis / Hepatitis Panels', fr: 'Panneaux VIH / Syphilis / Hépatite', ru: 'ВИЧ / Сифилис / Гепатит', ar: 'فيروس نقص المناعة / الكبد' },
    shortDesc: { he: 'בדיקות סרולוגיות מהירות לזיהוי נוגדני HIV (1/2/O/p24), עגבת, והפטיטיס (A,B,C,E) מדם מלא.', en: 'Rapid serological tests for HIV (1/2/O/p24), Syphilis, and Hepatitis antibodies/antigens.', de: 'Serologische Schnelltests auf HIV, Syphilis und Hepatitis-Antikörper.', fr: 'Tests sérologiques rapides pour le VIH, la syphilis et l\'hépatite.' },
    specs: { type: 'WB / Serum / Plasma', pack: '25T/40T/50T' }
  },
  { 
    id: 'h-pylori-b2b', 
    category: ['b2c', 'b2b'], 
    subCat: 'Infectious', 
    image: '/20260323_161807.jpg', 
    isProfessionalOnly: false,
    isPatented: true,
    patentBadge: {
      he: 'פטנט רפואה דיגיטלית',
      en: 'Digital Health Patent',
      de: 'Digital Health Patent',
      fr: 'Brevet Santé Numérique',
      ru: 'Патент Digital Health',
      ar: 'براءة اختراع الصحة الرقمية'
    },
    title: { he: 'בדיקת הליקובקטר פילורי (H. Pylori)', en: 'H. Pylori Antigen/Antibody Rapid Test', de: 'H. Pylori Antigen/Antikörper-Tests', fr: 'Tests Antigen/Anticorps H. Pylori', ru: 'Тесты H. Pylori', ar: 'جرثومة المعدة H. Pylori' },
    shortDesc: { he: 'ערכה מהירה ואיכותית לאבחון חיידק הליקובקטר פילורי (ברקוד: 7290013882141 / מק"ט: 51009). אבחון נוח ומדויק בזמן קצר.', en: 'Rapid diagnostic test for H. pylori - antigen detection in stool or antibodies in blood.', de: 'Schnelldiagnostik für H. pylori im Blut oder Stuhl.', fr: 'Diagnostic rapide pour H. pylori dans le sang ou les selles.' },
    specs: { type: 'Blood / Feces', pack: '25-50 Tests', barcode: '7290013882141' }
  },
  { 
    id: 'dengue-malaria', 
    category: 'b2b', 
    subCat: 'Infectious', 
    image: '/DSC_2133.JPG',
    title: { he: 'Malaria / Dengue / Typhoid', en: 'Malaria / Dengue / Typhoid', de: 'Malaria / Dengue / Typhus', fr: 'Paludisme / Dengue / Typhoïde', ru: 'Малярия / Денге / Тиф', ar: 'ملاريا / حمى الضنك' },
    shortDesc: { he: 'מערך בדיקות מחלות טרופיות לזיהוי מהיר במרפאות מטיילים ובמעבדות פתולוגיה.', en: 'Tropical disease testing suite for rapid identification in travel clinics and pathology labs.', de: 'Schnelltests für Tropenkrankheiten in Reisemedizin und Laboren.', fr: 'Ensemble de tests pour maladies tropicales en clinique et laboratoire.' },
    specs: { type: 'Whole Blood', pack: '25-40 Tests' }
  },
  
  // --- TUMOR MARKERS & COLORECTAL SCREENING ---
  { 
    id: 'fob-b2c', 
    category: ['b2c', 'b2b'], 
    subCat: 'Tumor', 
    image: '/DSC_2078.JPG', 
    img2: '/7290013882066.jpg', 
    isProfessionalOnly: false,
    isPatented: true,
    patentBadge: {
      he: 'פטנט רפואה דיגיטלית',
      en: 'Digital Health Patent',
      de: 'Digital Health Patent',
      fr: 'Brevet Santé Numérique',
      ru: 'Патент Digital Health',
      ar: 'براءة اختراع الصحة الرقمية'
    },
    title: { 
      he: 'בדיקת דם סמוי בצואה (FOB)', 
      en: 'Colorectal FOB Rapid Test', 
      de: 'Stuhltest auf okkultes Blut (FOB Schnelltest)', 
      fr: 'Dépistage du Sang Occulte dans les Selles (Test Rapide FOB)', 
      ru: 'FOB (Скрытая кровь)', 
      ar: 'الדם الخفي (FOB)' 
    },
    shortDesc: { 
      he: 'ערכה מהירה לסקר סרטן המעי הגס (ברקוד: 7290013882066 / מק"ט: 53003). פטנט ברמת האפליקציה לקופות החולים – ללא צורך בהגעה למעבדה, לקיחת בקבוקון או המתנה של ימים לתוצאות. פתרון נוח, היגייני ומיידי בבית.', 
      en: 'Colorectal cancer screening system (Barcode: 7290013882066). App-level patent for HMOs – at-home convenience without lab visits, vial drop-offs, or days of waiting.', 
      de: 'Schnelltest zur Darmkrebsvorsorge (Barcode: 7290013882066). Digitale Integration für Krankenkassen ohne Laborbesuch.', 
      fr: 'Test de dépistage du cancer colorectal (Code-barres: 7290013882066). Brevet d\'application pour caisses de santé sans visite au laboratoire.' 
    },
    specs: { 
      type: 'Feces Cassette / צואה', 
      time: '5 Min', 
      feature: 'ללא צורך במעבדה',
      accuracy: 'דיוק ופשטות בבית',
      barcode: '7290013882066' 
    },
    youtubeId: '51ECod0uUy4'
  },
  { 
    id: 'psa', 
    category: 'b2b', 
    subCat: 'Tumor', 
    image: '/DSC_2183-min.JPG',
    title: { he: 'PSA Qualitative Rapid Test', en: 'PSA Qualitative Rapid Test', de: 'PSA Qualitativer Schnelltest', fr: 'Test Rapide Qualitatif PSA', ru: 'PSA Тест (ПСА)', ar: 'مستضد البروستاتا (PSA)' },
    shortDesc: { he: 'בדיקה איכותית מהירה לגילוי אנטיגן PSA (סרטן הערמונית) בדם (Cat No: 53008).', en: 'Qualitative rapid test for Prostate Specific Antigen detection.', de: 'Qualitativer Schnelltest zum Nachweis des Prostataspezifischen Antigens.', fr: 'Test rapide qualitatif pour la détection de l\'antigène spécifique de la prostate.' },
    specs: { type: 'WB / Serum / Plasma', pack: '10T/25T', time: '5 Min' }
  },
  { 
    id: 'cea-afp-fob', 
    category: 'b2b', 
    subCat: 'Tumor', 
    image: '/DSC_2078.JPG',
    title: { he: 'CEA / AFP / Calprotectin Panel', en: 'CEA / AFP / Calprotectin Panel', de: 'CEA / AFP / Calprotectin Panel', fr: 'Panneau ACE / AFP / Calprotectine', ru: 'CEA / AFP Панели', ar: 'مؤشرات الأورام CEA / AFP' },
    shortDesc: { he: 'פאנל סמני גידול ואבחון דלקות מעיים (קאלפרוטקטין, CEA, AFP) למרפאות גסטרונומיה ואונקולוגיה.', en: 'Tumor marker and inflammatory bowel panels (Calprotectin, CEA, AFP) for gastroenterology and oncology.', de: 'Tumormarker und Entzündungspanels für Gastroenterologie und Onkologie.', fr: 'Panneaux de marqueurs tumoraux pour la gastro-entérologie et l\'oncologie.' },
    specs: { type: 'Blood / Feces', pack: '10T/20T/25T' }
  },

  // --- DRUGS OF ABUSE (DOA) & TOXICOLOGY ---
  { 
    id: 'doa-otc', 
    category: ['b2c', 'b2b'], 
    subCat: 'Doa', 
    image: '/DSC_2133.JPG', 
    img2: '/7290012882127.jpg', 
    isProfessionalOnly: false,
    title: { he: 'בדיקת סמים בשתן (Multi-Drug 8-Panel)', en: 'Multi-Drug 8-Panel Urine Rapid Test', de: 'Urindroger-Panel (Multi-Drug 8-Panel Schnelltest)', fr: 'Test Dépistage Multi-Drogues Urinaire (8 Panneaux)', ru: 'Тест на наркотики (8 панелей)', ar: 'فحص المخدرات (8 فحوصات)' },
    shortDesc: { he: 'בדיקה עצמית מהירה לגילוי 8 סוגי סמים בשתן (ברקוד: 7290013882127 / מק"ט: 51000). תוצאות מדויקות בתוך 5 דקות.', en: 'Self-use multi-drug screening cup test for 8 drug parameters (Barcode: 7290013882127). Accurate results in 5 min.', de: 'Schnelltest auf 8 Drogensubstanzen im Urin (Barcode: 7290013882127). Ergebnisse in 5 Minuten.', fr: 'Test de dépistage urinaire de 8 substances (Code-barres: 7290013882127). Résultats en 5 minutes.' },
    specs: { type: 'Urine Cup / Cassette', time: '5 Min', barcode: '7290013882127' }
  },
  { 
    id: 'single-doa', 
    category: 'b2b', 
    subCat: 'Doa', 
    image: '/DSC_2133.JPG', 
    title: { he: 'THC / COC / AMP / MET Single Strips', en: 'THC / COC / AMP / MET Single Strips', de: 'THC / COC / AMP / MET Einzeltests', fr: 'Bandelettes Individuelles THC / COC / AMP / MET', ru: 'Одиночные тесты DOA', ar: 'فحوصات المخدرات الفردية' },
    shortDesc: { he: 'סטריפים וקסטות נפרדות לגילוי קנאביס, קוקאין, אמפטמינים ואופיאטים במוסדות גמילה ופורנזיקה.', en: 'Individual strips and cassettes for targeted substance identification in rehabilitation and forensics.', de: 'Einzelstreifen und Kassetten für gezielte Substanztests.', fr: 'Bandelettes individuelles pour l\'identification ciblée de substances.' },
    specs: { type: 'Urine Strip / Cassette', pack: '50 Tests' }
  },

  // --- URINALYSIS & WOMEN'S HEALTH ---
  { 
    id: 'uti-otc', 
    category: ['b2c', 'b2b'], 
    subCat: 'Urine', 
    image: '/DSC_2116.JPG', 
    img2: '/7290013882035.jpg', 
    isProfessionalOnly: false,
    title: { he: 'בדיקת דלקת בשתן / ציסטיטיס (UTI)', en: 'UTI Urinary Tract Infection Rapid Test', de: 'Harnwegsinfektion (UTI Schnelltest)', fr: 'Test Rapide Infection Urinaire (IUT / Cystite)', ru: 'Тест на инфекции мочевыводящих путей (UTI)', ar: 'فحص التهاب البول (UTI)' },
    shortDesc: { he: 'בדיקה עצמית מהירה לגילוי דלקות בדרכי השתן (ציסטיטיס) (ברקוד: 7290013882035). תהליך של 2 דקות.', en: 'Rapid self-test for urinary tract infections / cystitis (Barcode: 7290013882035). 2-minute results.', de: 'Schnelltest bei Blasenentzündung und Harnwegsinfekten (Barcode: 7290013882035).', fr: 'Test rapide pour infections urinaires / cystite (Code-barres: 7290013882035).' },
    specs: { type: 'Urine Strip', time: '2 Min', barcode: '7290013882035' }
  },
  { 
    id: 'candida', 
    category: ['b2c', 'b2b'], 
    subCat: 'Womens', 
    image: '/DSC_2110.JPG', 
    img2: '/7290013882042.jpg', 
    isProfessionalOnly: false,
    title: { he: 'בדיקת קנדידה וגינאלית', en: 'Candida Albicans Vaginal Rapid Test', de: 'Vaginaler Candida Schnelltest', fr: 'Test Rapide Candida Vaginal', ru: 'Тест на Кандиду (Кандидоз)', ar: 'فحص الفطريات (كانديدا)' },
    shortDesc: { he: 'אבחון מהיר ודיסקרטי בבית (ברקוד: 7290013882042). מאפשר זיהוי מיידי לצורך התאמת הטיפול המתאים בבית.', en: 'Discreet and rapid home test for vaginal Candida (Barcode: 7290013882042).', de: 'Diskreter Schnelltest für Zuhause auf Candida (Barcode: 7290013882042).', fr: 'Test à domicile rapide et discret pour Candida (Code-barres: 7290013882042).' },
    specs: { type: 'Vaginal Swab', time: '10 Min', barcode: '7290013882042' }
  },
  { 
    id: 'ovulation', 
    category: ['b2c', 'b2b'], 
    subCat: 'Womens', 
    image: '/DSC_2049.JPG', 
    isProfessionalOnly: false,
    title: { he: 'בדיקת ביוץ (7 בדיקות סוואב/מקלון)', en: 'LH Ovulation Rapid Test Kit (7 Tests)', de: 'FSH & LH Eisprung-Schnelltest (7 Tests)', fr: 'Test d\'Ovulation Rapide LH (7 Tests)', ru: 'Тест на овуляцию (LH)', ar: 'فحص التبويض (7 فحوصات)' },
    shortDesc: { he: 'ערכת תכנון משפחה שלמה (ברקוד: 7290013882028). כוללת 7 בדיקות ביוץ מדויקות בבית.', en: 'Complete family planning kit (Barcode: 7290013882028). Contains 7 precise home ovulation tests.', de: 'Komplettes Familienplanungs-Set mit 7 Eisprungtests (Barcode: 7290013882028).', fr: 'Kit complet de planification familiale contenant 7 tests d\'ovulation (Code-barres: 7290013882028).' },
    specs: { type: 'Midstream', pack: '7 Tests', time: '5 Min', barcode: '7290013882028' }
  },
  { 
    id: 'labontime-preg-1', 
    category: ['b2c', 'b2b'], 
    subCat: 'Womens', 
    image: '/DSC_2064.JPG', 
    isProfessionalOnly: false,
    title: { 
      he: 'LabOnTime hCG - בדיקת היריון (מארז בודד / הריון 1)', 
      en: 'LabOnTime hCG Pregnancy Rapid Test (Single Pack)', 
      de: 'LabOnTime hCG Schwangerschaftstest (Einzelpackung)', 
      fr: 'LabOnTime hCG Test de Grossesse (Pack Simple)', 
      ru: 'LabOnTime hCG Тест на беременность', 
      ar: 'LabOnTime hCG فحص الحمل' 
    },
    shortDesc: { 
      he: 'בדיקת היריון מהירה ומדויקת בפורמט LabOnTime (ברקוד: 7290013882097 / מק"ט: 51085). תוצאה ברורה בתוך דקות ספורות בבית.', 
      en: 'Rapid, highly reliable home pregnancy test in LabOnTime format (Barcode: 7290013882097 / Cat: 51085). Easy to use with clear results in minutes.', 
      de: 'Zuverlässiger Schwangerschaftstest im LabOnTime-Format.', 
      fr: 'Test de grossesse rapide et fiable au format LabOnTime.' 
    },
    specs: { 
      sensitivity: '25 mIU/mL', 
      type: 'Midstream / שתן', 
      time: '3 Min', 
      pack: '1 Test', 
      barcode: '7290013882097' 
    }
  },
  { 
    id: 'labontime-preg-2', 
    category: ['b2c', 'b2b'], 
    subCat: 'Womens', 
    image: '/DSC_2068.JPG', 
    isProfessionalOnly: false,
    title: { 
      he: 'LabOnTime hCG - בדיקת היריון (מארז כפול / הריון 2)', 
      en: 'LabOnTime hCG Pregnancy Rapid Test (Double Pack)', 
      de: 'LabOnTime hCG Schwangerschaftstest (Doppelpackung)', 
      fr: 'LabOnTime hCG Test de Grossesse (Pack Double)', 
      ru: 'LabOnTime hCG Тест на беременность (Двойной)', 
      ar: 'LabOnTime hCG فحص الحمل (مزدوج)' 
    },
    shortDesc: { 
      he: 'מארז כפול לבדיקת היריון מוקדמת בפורמט LabOnTime (ברקוד: 7290013882103 / מק"ט: 51085-2). שני מקלוני בדיקה לאימות נוח בבית.', 
      en: 'Double pack pregnancy test kit in LabOnTime format (Barcode: 7290013882103 / Cat: 51085-2). Two tests for convenient verification.', 
      de: 'Schwangerschafts-Frühtest Doppelpack im LabOnTime-Format.', 
      fr: 'Double test de grossesse précoce au format LabOnTime.' 
    },
    specs: { 
      sensitivity: '25 mIU/mL', 
      type: 'Midstream / שתן', 
      time: '3 Min', 
      pack: '2 Tests', 
      barcode: '7290013882103' 
    }
  },
  { 
    id: 'covid-flu-combo', 
    category: ['b2c', 'b2b'], 
    subCat: 'Infectious', 
    image: '/DSC_2058.JPG', 
    isProfessionalOnly: false,
    title: { 
      he: 'LabOnTime COVID-19 & Influenza A+B Combo (בדיקה משולבת קורונה ושפעת - לשימוש עצמי)', 
      en: 'LabOnTime COVID-19 & Influenza A+B Combo Rapid Test (Self-Use)', 
      de: 'LabOnTime COVID-19 & Influenza A+B Kombinationstest (Selbsttest)', 
      fr: 'LabOnTime COVID-19 & Grippe A+B Test Combiné (Auto-test)', 
      ru: 'LabOnTime COVID-19 и Грипп A+B Комбо (Самотестирование)', 
      ar: 'LabOnTime كوفيد-19 وإنفلونزا A+B فحص مشترك (للاستخدام الذاتي)' 
    },
    shortDesc: { 
      he: 'בדיקה משולבת מהירה ומדויקת לאבחון מבדל סימולטני של נגיפי קורונה ושפעת עונתית A/B מדגימת מטוש אף אחת. מיועדת לשימוש עצמי וביתי בנוחות ובמהירות (תוצאות ברורות בתוך 15 דקות).', 
      en: 'Rapid differential self-test for simultaneous detection of COVID-19 and Influenza A+B from a single nasal swab. Designed for convenient at-home and self-use with results in 15 minutes.', 
      de: 'Differenzial-Schnelltest auf SARS-CoV-2 und Influenza A+B für die Eigenanwendung zu Hause.', 
      fr: 'Test d\'autodiagnostic rapide combiné pour le SARS-CoV-2 et la grippe A+B à domicile.' 
    },
    specs: { 
      type: 'Nasal Swab / דגימה מהאף', 
      sensitivity: '>95%', 
      specificity: '100%', 
      time: '15 Min', 
      setting: 'Self-Use / לשימוש עצמי וביתי' 
    }
  }
];

export default productsDatabase;
