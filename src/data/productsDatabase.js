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
    patentBadge: {
      he: 'פטנט רשום',
      en: 'Patented',
      de: 'Patentiert',
      fr: 'Breveté',
      ru: 'Запатентовано',
      ar: 'براءة اختراع مسجلة'
    },
    title: { 
      he: 'LabOnTime Swab - בדיקה מהירה לדלקת גרון (שלב 1 A STREP) *פטנט', 
      en: 'LabOnTime Swab - Strep A Rapid Test (1-Step Patent)', 
      de: 'LabOnTime Swab - Strep A Schnelltest (1-Schritt-Patent)', 
      fr: 'LabOnTime Swab - Test Rapide Strep A (Brevet 1 Étape)', 
      ru: 'LabOnTime Swab - Экспресс-тест Strep A (1-Шаговый патент)', 
      ar: 'LabOnTime Swab - فحص سريع لالتهاب الحلق Strep A (براءة اختراع خطوة 1)' 
    },
    shortDesc: { 
      he: 'בדיקת סוואב מהירה לדלקת גרון בפורמט LabOnTime Swab המוגן בפטנט (ברקוד: 7290008123723). ביצוע בשלב 1 ללא העברות נוזל פתוחות. לשימוש מקצועי בלבד.', 
      en: 'Rapid throat swab Strep A test in patented LabOnTime Swab 1-Step device format (Barcode: 7290008123723). For professional clinical use only.', 
      de: 'Schnelltest auf Strep A im patentierten LabOnTime Swab 1-Schritt-Format (Barcode: 7290008123723). Nur für Fachpersonal.', 
      fr: 'Test rapide d\'écouvillon pharyngé Strep A au format breveté LabOnTime Swab 1-Étape (Code-barres: 7290008123723). Usage professionnel.', 
      ru: 'Экспресс-тест на стрептококк А в запатентованном формате LabOnTime Swab в 1 шаг (Штрихкод: 7290008123723). Только для специалистов.', 
      ar: 'فحص مسحة الحلق السريع لالتهاب الحلق العقدي Strep A بنظام LabOnTime Swab المحمي ببراءة اختراع (الباركود: 7290008123723). للاستخدام المهني فقط.' 
    },
    specs: { 
      type: {
        he: 'מטוש גרון (Throat Swab)',
        en: 'Throat Swab',
        de: 'Rachenabstrich',
        fr: 'Écouvillon pharyngé',
        ru: 'Мазок из зева',
        ar: 'مسحة حلق (Throat Swab)'
      },
      sensitivity: '95.1%', 
      specificity: '100%', 
      time: '5 Min', 
      steps: {
        he: '1-Step (no step)',
        en: '1-Step (no step)',
        de: '1-Schritt (no step)',
        fr: '1-Étape (no step)',
        ru: '1 шаг (no step)',
        ar: 'خطوة واحدة (no step)'
      },
      setting: {
        he: 'לשימוש מקצועי בלבד',
        en: 'Professional Use Only',
        de: 'Nur für medizinisches Fachpersonal',
        fr: 'Usage professionnel uniquement',
        ru: 'Только для профессионалов',
        ar: 'للاستخدام المهني فقط'
      },
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
    patentBadge: {
      he: 'פטנט רשום',
      en: 'Patented',
      de: 'Patentiert',
      fr: 'Breveté',
      ru: 'Запатентовано',
      ar: 'براءة اختراع مسجلة'
    },
    title: { 
      he: 'בדיקת Strep A (פטנט no step - פורמט עט)', 
      en: 'Strep A Rapid Test (no step Pen Device)', 
      de: 'Strep A Schnelltest (no step Patent Stift-Format)', 
      fr: 'Test Rapide Strep A (Format Stylo Breveté no step)', 
      ru: 'Экспресс-тест Strep A (Патент no step, формат ручки)', 
      ar: 'فحص Strep A السريع (براءة اختراع no step - شكل قلم)' 
    },
    shortDesc: { 
      he: 'הבדיקה המהירה בעולם לדלקת גרון בפורמט עט אבחון ייחודי (no step) המבטל לחלוטין העברות נוזלים פתוחות (ברקוד: 7290013882080 / מק"ט: 51084). לשימוש מקצועי בלבד.', 
      en: 'The fastest Strep A test for throat swabs in unique pen device format eliminating open fluid transfers (Barcode: 7290013882080 / Cat: 51084). For professional use.', 
      de: 'Der schnellste Strep A-Test im patentierten Stiftformat ohne offene Flüssigkeitsübertragung (Barcode: 7290013882080). Nur für Fachpersonal.', 
      fr: 'Le test Strep A le plus rapide au format stylo breveté éliminant tout transfert de liquide (Code-barres: 7290013882080). Usage professionnel.', 
      ru: 'Самый быстрый тест на Strep A в уникальном формате ручки без открытых переносов жидкостей (Штрихкод: 7290013882080). Только для специалистов.', 
      ar: 'الفحص الأسرع عالمياً لالتهاب الحلق العقدي بتصميم قلم تشخيصي فريد (no step) يلغي نقل السوائل المفتوحة (الباركود: 7290013882080). للاستخدام المهني.' 
    },
    specs: { 
      type: {
        he: 'מטוש גרון (Throat Swab)',
        en: 'Throat Swab',
        de: 'Rachenabstrich',
        fr: 'Écouvillon pharyngé',
        ru: 'Мазок из зева',
        ar: 'مسحة حلق (Throat Swab)'
      },
      sensitivity: '95.1%', 
      specificity: '100%', 
      time: '5 Min', 
      steps: {
        he: 'no step (פטנט)',
        en: 'no step (Patented)',
        de: 'no step (Patentiert)',
        fr: 'no step (Breveté)',
        ru: 'no step (Запатентовано)',
        ar: 'no step (براءة اختراع)'
      },
      setting: {
        he: 'לשימוש מקצועי בלבד',
        en: 'Professional Use Only',
        de: 'Nur für medizinisches Fachpersonal',
        fr: 'Usage professionnel uniquement',
        ru: 'Только для профессионалов',
        ar: 'للاستخدام المهني فقط'
      },
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
    patentBadge: {
      he: 'פטנט רשום',
      en: 'Patented',
      de: 'Patentiert',
      fr: 'Breveté',
      ru: 'Запатентовано',
      ar: 'براءة اختراع مسجلة'
    },
    title: { 
      he: 'Influenza A+B (בדיקת שפעת A+B - לשימוש מקצועי)', 
      en: 'Influenza A+B Rapid Test (Professional Use Only)', 
      de: 'Influenza A+B Schnelltest (Professionell)', 
      fr: 'Test Rapide Grippe A+B (Professionnel)', 
      ru: 'Грипп A+B (Профессиональный экспресс-тест)', 
      ar: 'الإنفلونزا A+B (فحص سريع للاستخدام المهني)' 
    },
    shortDesc: { 
      he: 'ערכה מהירה לגילוי מוקדם של שפעת עונתית A+B מדגימת אף, המיועדת לשימוש מקצועי במוסדות רפואיים ומרפאות (ברקוד: 7290013882165 / מק"ט: 51088).', 
      en: 'Rapid test for seasonal flu A+B from nasal swab, designed for professional clinical settings (Barcode: 7290013882165 / Cat: 51088).', 
      de: 'Schnelltest für saisonale Grippe A+B für professionelle Anwendung in Kliniken (Barcode: 7290013882165).', 
      fr: 'Test rapide pour la grippe saisonnière A+B à usage professionnel en milieu clinique (Code-barres: 7290013882165).', 
      ru: 'Экспресс-тест на сезонный грипп А+В из мазка из носа для клинических учреждений (Штрихкод: 7290013882165).', 
      ar: 'طقم فحص سريع للكشف المبكر عن الإنفلونزا الموسمية A+B من مسحة الأنف للمؤسسات الطبية والعيادات (الباركود: 7290013882165).' 
    },
    specs: { 
      sensitivity: '94.9% (CT < 30)', 
      specificity: '100%', 
      time: '10 Min', 
      type: {
        he: 'מטוש אף (Nasal Swab)',
        en: 'Nasal Swab',
        de: 'Nasenabstrich',
        fr: 'Écouvillon nasal',
        ru: 'Мазок из носа',
        ar: 'مسحة أنف (Nasal Swab)'
      },
      setting: {
        he: 'לשימוש מקצועי בלבד',
        en: 'Professional Use Only',
        de: 'Nur für medizinisches Fachpersonal',
        fr: 'Usage professionnel uniquement',
        ru: 'Только для профессионалов',
        ar: 'للاستخدام المهني فقط'
      },
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
    patentBadge: {
      he: 'פטנט רשום',
      en: 'Patented',
      de: 'Patentiert',
      fr: 'Breveté',
      ru: 'Запатентовано',
      ar: 'براءة اختراع مسجلة'
    },
    title: { 
      he: 'בדיקת COVID-19 Antigen (פטנט no step)', 
      en: 'COVID-19 Antigen Rapid Test (Patented no step Device)', 
      de: 'COVID-19 Antigen Schnelltest (no step Patentierte Testvorrichtung)', 
      fr: 'Test Rapide Antigen COVID-19 (Format Breveté no step)', 
      ru: 'Антиген COVID-19 (Патентное устройство no step)', 
      ar: 'مستضد كوفيد-19 (جهاز فحص no step ببراءة اختراع)' 
    },
    shortDesc: { 
      he: 'בדיקת קורונה מהירה מדגימת אף בתצורת פטנט no step (ברקוד: 7290019098409 / מק"ט: 51095). טכנולוגיה מוגנת בפטנט המבטלת העברות נוזלים פתוחות, מקטינה חשיפה ביולוגית ומאפשרת אבחון מדויק ומהיר בנקודת הטיפול ובבית.', 
      en: 'Rapid COVID-19 Antigen nasal test in patented integrated No-Step format (Barcode: 7290019098409 / Cat: 51095). Patented technology eliminating open fluid transfers and reducing biohazard risks.', 
      de: 'Schnelltest auf COVID-19 Antigen im patentierten integrierten No-Step-Format (Barcode: 7290019098409). Minimiert Bio-Risiken und optimiert die Genauigkeit.', 
      fr: 'Test rapide d\'antigène COVID-19 au format breveté No-Step (Code-barres: 7290019098409). Élimine les transferts ouverts et sécurise le diagnostic.', 
      ru: 'Экспресс-тест на антиген COVID-19 в закрытом формате No-Step (Штрихкод: 7290019098409). Без открытых переносов жидкостей.', 
      ar: 'فحص كورونا السريع من مسحة الأنف بنظام no step المحمي ببراءة اختراع (الباركود: 7290019098409). يلغي نقل السوائل المفتوحة ويوفر دقة فورية.' 
    },
    specs: { 
      feature: {
        he: 'פטנט רשום no step',
        en: 'Patented no step format',
        de: 'Patentiertes no step Format',
        fr: 'Format breveté no step',
        ru: 'Запатентованный формат no step',
        ar: 'نظام no step ببراءة اختراع'
      },
      sensitivity: '>97%', 
      specificity: '100%', 
      time: '10 Min', 
      type: {
        he: 'מטוש אף (Nasal Swab)',
        en: 'Nasal Swab',
        de: 'Nasenabstrich',
        fr: 'Écouvillon nasal',
        ru: 'Мазок из носа',
        ar: 'مسحة أنف (Nasal Swab)'
      },
      steps: {
        he: 'no step (פטנט)',
        en: 'no step (Patented)',
        de: 'no step (Patentiert)',
        fr: 'no step (Breveté)',
        ru: 'no step (Запатентовано)',
        ar: 'no step (براءة اختراع)'
      },
      setting: {
        he: 'לשימוש עצמי ומקצועי',
        en: 'Self-Use & Professional',
        de: 'Selbsttest & Fachanwendung',
        fr: 'Autotest & Professionnel',
        ru: 'Для дома и клиник',
        ar: 'للاستخدام الذاتي والمهني'
      },
      barcode: '7290019098409' 
    },
    comparison: { 
      us: { steps: 'no step', time: '10 min', transfers: '0' }, 
      them: { steps: '8', time: '15 min', transfers: '3' } 
    },
    youtubeId: '0PwbjucJXCw'
  },
  { 
    id: 'resp-panels', 
    category: 'b2b', 
    subCat: 'Infectious', 
    image: '/DSC_2098.JPG',
    title: { 
      he: 'RSV / Adenovirus / M. Pneumoniae', 
      en: 'RSV / Adenovirus / M. Pneumoniae', 
      de: 'RSV / Adenovirus / M. Pneumoniae', 
      fr: 'RSV / Adénovirus / M. Pneumoniae', 
      ru: 'Респираторные панели (RSV / Аденовирус / Микоплазма)', 
      ar: 'لوحة الفحوصات التنفسية (RSV / الفيروس الغدي / الميكوبلازما)' 
    },
    shortDesc: { 
      he: 'קסטות בדיקה מהירות למחלות דרכי הנשימה כולל פאנלים משולבים ומחלקתיים (Cat: 51073-51076).', 
      en: 'Rapid test cassettes for respiratory tract infections including combo panels for clinical departments.', 
      de: 'Schnelltestkassetten für Atemwegsinfektionen inklusive Kombinationstests.', 
      fr: 'Cassettes de test rapide pour infections respiratoires et panneaux combinés.', 
      ru: 'Кассеты для экспресс-диагностики респираторных инфекций, включая комбинированные панели.', 
      ar: 'أشرطة فحص سريعة لالتهابات الجهاز التنفسي بما في ذلك اللوحات المدمجة للأقسام الطبية.' 
    },
    specs: { 
      type: {
        he: 'מטוש אף / שטיפה (Nasal Swab)',
        en: 'Nasal Swab / Aspirate',
        de: 'Nasenabstrich / Aspirat',
        fr: 'Écouvillon nasal / Aspiration',
        ru: 'Мазок из носа / Аспират',
        ar: 'مسحة أنف / رشافة'
      },
      pack: '20 Tests',
      time: '15 Min'
    }
  },
  { 
    id: 'hiv-panels', 
    category: 'b2b', 
    subCat: 'Infectious', 
    image: '/DSC_2116.JPG',
    title: { 
      he: 'HIV / Syphilis / Hepatitis Panels', 
      en: 'HIV / Syphilis / Hepatitis Combo', 
      de: 'HIV / Syphilis / Hepatitis Panels', 
      fr: 'Panneaux VIH / Syphilis / Hépatite', 
      ru: 'Панели ВИЧ / Сифилис / Гепатит', 
      ar: 'لوحات فيروس نقص المناعة / الزهري / التهاب الكبد' 
    },
    shortDesc: { 
      he: 'בדיקות סרולוגיות מהירות לזיהוי נוגדני HIV (1/2/O/p24), עגבת, והפטיטיס (A,B,C,E) מדם מלא.', 
      en: 'Rapid serological tests for HIV (1/2/O/p24), Syphilis, and Hepatitis antibodies/antigens from whole blood.', 
      de: 'Serologische Schnelltests auf HIV, Syphilis und Hepatitis-Antikörper aus Vollblut.', 
      fr: 'Tests sérologiques rapides pour le VIH, la syphilis et l\'hépatite à partir de sang total.', 
      ru: 'Серологические экспресс-тесты на ВИЧ, сифилис и вирусные гепатиты из цельной крови.', 
      ar: 'فحوصات مصلية سريعة للكشف عن الأجسام المضادة لفيروس نقص المناعة، الزهري والتهاب الكبد من الدم الكامل.' 
    },
    specs: { 
      type: {
        he: 'דם מלא / סרום / פלזמה',
        en: 'Whole Blood / Serum / Plasma',
        de: 'Vollblut / Serum / Plasma',
        fr: 'Sang total / Sérum / Plasma',
        ru: 'Цельная кровь / Сыворотка / Плазма',
        ar: 'دم كامل / مصل / بلازما'
      },
      pack: '25T / 40T / 50T',
      time: '15 Min'
    }
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
    title: { 
      he: 'בדיקת הליקובקטר פילורי (H. Pylori)', 
      en: 'H. Pylori Antigen/Antibody Rapid Test', 
      de: 'H. Pylori Antigen/Antikörper-Schnelltest', 
      fr: 'Test Rapide Antigène/Anticorps H. Pylori', 
      ru: 'Экспресс-тест на H. Pylori (Хеликобактер)', 
      ar: 'فحص جرثومة المعدة H. Pylori' 
    },
    shortDesc: { 
      he: 'ערכה מהירה ואיכותית לאבחון חיידק הליקובקטר פילורי (ברקוד: 7290013882141 / מק"ט: 51009). אבחון נוח ומדויק בזמן קצר.', 
      en: 'Rapid diagnostic test for H. pylori - antigen detection in stool or antibodies in blood (Barcode: 7290013882141 / Cat: 51009). Convenient and accurate.', 
      de: 'Schnelldiagnostik für H. pylori im Blut oder Stuhl (Barcode: 7290013882141). Zuverlässig und schnell.', 
      fr: 'Diagnostic rapide pour H. pylori dans le sang ou les selles (Code-barres: 7290013882141). Précis et pratique.', 
      ru: 'Экспресс-тест на хеликобактер пилори (антиген в кале или антитела в крови) (Штрихкод: 7290013882141).', 
      ar: 'طقم فحص سريع وعالي الجودة لتشخيص بكتيريا الملوية البوابية (جرثومة المعدة) (الباركود: 7290013882141).' 
    },
    specs: { 
      type: {
        he: 'דם / צואה (Blood / Feces)',
        en: 'Blood / Feces',
        de: 'Blut / Stuhl',
        fr: 'Sang / Selles',
        ru: 'Кровь / Кал',
        ar: 'دم / براز (Blood / Feces)'
      },
      time: '10 Min',
      pack: '25-50 Tests', 
      barcode: '7290013882141' 
    }
  },
  { 
    id: 'dengue-malaria', 
    category: 'b2b', 
    subCat: 'Infectious', 
    image: '/DSC_2133.JPG',
    title: { 
      he: 'Malaria / Dengue / Typhoid', 
      en: 'Malaria / Dengue / Typhoid Rapid Suite', 
      de: 'Malaria / Dengue / Typhus Schnelltests', 
      fr: 'Tests Rapides Paludisme / Dengue / Typhoïde', 
      ru: 'Малярия / Денге / Брюшной тиф', 
      ar: 'فحوصات الملاريا / حمى الضنك / التيفوئيد' 
    },
    shortDesc: { 
      he: 'מערך בדיקות מחלות טרופיות לזיהוי מהיר במרפאות מטיילים ובמעבדות פתולוגיה.', 
      en: 'Tropical disease testing suite for rapid identification in travel clinics and pathology labs.', 
      de: 'Schnelltests für Tropenkrankheiten in Reisemedizin und Laboren.', 
      fr: 'Ensemble de tests pour maladies tropicales en clinique de voyage et laboratoire.', 
      ru: 'Линейка экспресс-тестов на тропические инфекции для клиник путешествий и лабораторий.', 
      ar: 'مجموعة فحوصات للأمراض الاستوائية للكشف السريع في عيادات المسافرين ومختبرات الأمراض.' 
    },
    specs: { 
      type: {
        he: 'דם מלא / סרום / פלזמה',
        en: 'Whole Blood / Serum / Plasma',
        de: 'Vollblut / Serum / Plasma',
        fr: 'Sang total / Sérum / Plasma',
        ru: 'Цельная кровь / Сыворотка / Плазма',
        ar: 'دم كامل / مصل / بلازما'
      },
      pack: '25-40 Tests',
      time: '15 Min'
    }
  },
  
  // --- TUMOR MARKERS & COLORECTAL SCREENING ---
  { 
    id: 'fob-b2c', 
    category: ['b2c', 'b2b'], 
    subCat: 'Tumor', 
    image: '/FOB.jpeg', 
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
      ru: 'Экспресс-тест на скрытую кровь в кале (FOB)', 
      ar: 'فحص الدم الخفي في البراز (FOB)' 
    },
    shortDesc: { 
      he: 'ערכה מהירה לסקר סרטן המעי הגס (ברקוד: 7290013882066 / מק"ט: 53003). פטנט ברמת האפליקציה לקופות החולים – ללא צורך בהגעה למעבדה, לקיחת בקבוקון או המתנה של ימים לתוצאות. פתרון נוח, היגייני ומיידי בבית.', 
      en: 'Colorectal cancer screening system (Barcode: 7290013882066 / Cat: 53003). App-level patent for HMOs – at-home convenience without lab visits, vial drop-offs, or days of waiting.', 
      de: 'Schnelltest zur Darmkrebsvorsorge (Barcode: 7290013882066). Digitale Integration für Krankenkassen ohne mühsamen Laborbesuch.', 
      fr: 'Test de dépistage du cancer colorectal (Code-barres: 7290013882066). Brevet d\'application pour caisses de santé sans visite au laboratoire.', 
      ru: 'Система скрининга колоректального рака (Штрихкод: 7290013882066). Патент на уровне мобильного приложения для клиник без посещения лабораторий.', 
      ar: 'طقم سريع لمسح سرطان القولون (الباركود: 7290013882066). براءة اختراع على مستوى التطبيق لصناديق المرضى - بدون الحاجة للمختبر وبدقة منزلية فورية.' 
    },
    specs: { 
      type: {
        he: 'צואה (Feces Cassette)',
        en: 'Feces Cassette',
        de: 'Stuhlprobe (Kassette)',
        fr: 'Selles (Cassette)',
        ru: 'Кал (Кассета)',
        ar: 'براز (كاسيت)'
      },
      time: '5 Min', 
      feature: {
        he: 'ללא צורך במעבדה',
        en: 'Zero Lab Required',
        de: 'Kein Labor erforderlich',
        fr: 'Sans laboratoire',
        ru: 'Без лаборатории',
        ar: 'بدون الحاجة لمختبر'
      },
      accuracy: {
        he: 'דיוק ופשטות בבית',
        en: 'At-Home Simplicity',
        de: 'Präzision zu Hause',
        fr: 'Simplicité à domicile',
        ru: 'Точность дома',
        ar: 'دقة وسهولة في المنزل'
      },
      barcode: '7290013882066' 
    },
    youtubeId: '51ECod0uUy4'
  },
  { 
    id: 'psa', 
    category: 'b2b', 
    subCat: 'Tumor', 
    image: '/DSC_2183-min.JPG',
    title: { 
      he: 'PSA Qualitative Rapid Test', 
      en: 'PSA Qualitative Rapid Test', 
      de: 'PSA Qualitativer Schnelltest', 
      fr: 'Test Rapide Qualitatif PSA', 
      ru: 'PSA Качественный экспресс-тест (ПСА)', 
      ar: 'فحص مستضد البروستاتا النوعي السريع (PSA)' 
    },
    shortDesc: { 
      he: 'בדיקה איכותית מהירה לגילוי אנטיגן PSA (סרטן הערמונית) בדם (Cat No: 53008).', 
      en: 'Qualitative rapid test for Prostate Specific Antigen detection in clinical settings.', 
      de: 'Qualitativer Schnelltest zum Nachweis des Prostataspezifischen Antigens.', 
      fr: 'Test rapide qualitatif pour la détection de l\'antigène spécifique de la prostate.', 
      ru: 'Качественный экспресс-тест для определения простат-специфического антигена в крови.', 
      ar: 'فحص نوعي سريع للكشف عن مستضد البروستاتا النوعي (PSA) في الدم.' 
    },
    specs: { 
      type: {
        he: 'דם מלא / סרום / פלזמה',
        en: 'Whole Blood / Serum / Plasma',
        de: 'Vollblut / Serum / Plasma',
        fr: 'Sang total / Sérum / Plasma',
        ru: 'Цельная кровь / Сыворотка / Плазма',
        ar: 'دم كامل / مصل / بلازما'
      },
      pack: '10T / 25T', 
      time: '5 Min' 
    }
  },
  { 
    id: 'cea-afp-fob', 
    category: 'b2b', 
    subCat: 'Tumor', 
    image: '/FOB.jpeg',
    title: { 
      he: 'CEA / AFP / Calprotectin Panel', 
      en: 'CEA / AFP / Calprotectin Panel', 
      de: 'CEA / AFP / Calprotectin Panel', 
      fr: 'Panneau ACE / AFP / Calprotectine', 
      ru: 'Панель онкомаркеров CEA / AFP / Кальпротектин', 
      ar: 'لوحة الأورام والالتهابات CEA / AFP / كالبprotectين' 
    },
    shortDesc: { 
      he: 'פאנל סמני גידול ואבחון דלקות מעיים (קאלפרוטקטין, CEA, AFP) למרפאות גסטרונומיה ואונקולוגיה.', 
      en: 'Tumor marker and inflammatory bowel panels (Calprotectin, CEA, AFP) for gastroenterology and oncology.', 
      de: 'Tumormarker und Entzündungspanels für Gastroenterologie und Onkologie.', 
      fr: 'Panneaux de marqueurs tumoraux pour la gastro-entérologie et l\'oncologie.', 
      ru: 'Панель онкомаркеров и маркеров воспаления кишечника (кальпротектин, CEA, AFP).', 
      ar: 'لوحة مؤشرات الأورام والتهابات الأمعاء لعيادات الجهاز الهضمي والأورام.' 
    },
    specs: { 
      type: {
        he: 'דם / צואה (Blood / Feces)',
        en: 'Blood / Feces',
        de: 'Blut / Stuhl',
        fr: 'Sang / Selles',
        ru: 'Кровь / Кал',
        ar: 'دم / براز'
      },
      pack: '10T / 20T / 25T',
      time: '10 Min'
    }
  },

  // --- DRUGS OF ABUSE (DOA) & TOXICOLOGY ---
  { 
    id: 'doa-otc', 
    category: ['b2c', 'b2b'], 
    subCat: 'Doa', 
    image: '/DSC_2133.JPG', 
    img2: '/7290012882127.jpg', 
    isProfessionalOnly: false,
    title: { 
      he: 'בדיקת סמים בשתן (Multi-Drug 8-Panel)', 
      en: 'Multi-Drug 8-Panel Urine Rapid Test', 
      de: 'Urindrogencheck (Multi-Drug 8-Panel Schnelltest)', 
      fr: 'Test Dépistage Multi-Drogues Urinaire (8 Paramètres)', 
      ru: 'Экспресс-тест на 8 видов наркотиков в моче', 
      ar: 'فحص المخدرات الشامل في البول (8 مؤشرات)' 
    },
    shortDesc: { 
      he: 'בדיקה עצמית מהירה לגילוי 8 סוגי סמים בשתן (ברקוד: 7290013882127 / מק"ט: 51000). תוצאות מדויקות בתוך 5 דקות.', 
      en: 'Self-use multi-drug screening cup test for 8 drug parameters (Barcode: 7290013882127 / Cat: 51000). Accurate results in 5 min.', 
      de: 'Schnelltest auf 8 Drogensubstanzen im Urin (Barcode: 7290013882127). Ergebnisse in 5 Minuten.', 
      fr: 'Test de dépistage urinaire de 8 substances (Code-barres: 7290013882127). Résultats en 5 minutes.', 
      ru: 'Тест-стаканчик для быстрого выявления 8 видов наркотических веществ в моче (Штрихкод: 7290013882127). Результат за 5 минут.', 
      ar: 'فحص منزلي سريع للكشف عن 8 أنواع من المخدرات في البول (الباركود: 7290013882127). نتائج دقيقة خلال 5 دقائق.' 
    },
    specs: { 
      type: {
        he: 'כוסית / קסטת שתן (Urine Cup)',
        en: 'Urine Cup / Cassette',
        de: 'Urinbecher / Kassette',
        fr: 'Gobelet / Cassette d\'urine',
        ru: 'Стаканчик / Кассета с мочой',
        ar: 'كوب فحص / كاسيت بول'
      },
      time: '5 Min', 
      setting: {
        he: 'לשימוש עצמי ומקצועי',
        en: 'Self-Use & Professional',
        de: 'Selbsttest & Fachanwendung',
        fr: 'Autotest & Professionnel',
        ru: 'Для дома и клиник',
        ar: 'للفحص الذاتي والمهني'
      },
      barcode: '7290013882127' 
    }
  },
  { 
    id: 'single-doa', 
    category: 'b2b', 
    subCat: 'Doa', 
    image: '/DSC_2133.JPG', 
    title: { 
      he: 'THC / COC / AMP / MET Single Strips', 
      en: 'THC / COC / AMP / MET Single Strips', 
      de: 'THC / COC / AMP / MET Einzel-Teststreifen', 
      fr: 'Bandelettes Individuelles THC / COC / AMP / MET', 
      ru: 'Одиночные тест-полоски THC / COC / AMP / MET', 
      ar: 'شرائط فحص فردية لمخدرات THC / COC / AMP / MET' 
    },
    shortDesc: { 
      he: 'סטריפים וקסטות נפרדות לגילוי קנאביס, קוקאין, אמפטמינים ואופיאטים במוסדות גמילה ופורנזיקה.', 
      en: 'Individual strips and cassettes for targeted substance identification in rehabilitation and forensics.', 
      de: 'Einzelstreifen und Kassetten für gezielte Substanztests in Forensik und Entzugskliniken.', 
      fr: 'Bandelettes individuelles pour l\'identification ciblée de substances en réhabilitation et médecine légale.', 
      ru: 'Индивидуальные полоски и кассеты для выявления отдельных видов наркотических веществ.', 
      ar: 'شرائط وكاسيتات منفصلة للكشف المستهدف عن الحشيش، الكوكايين، الأمفيتامينات في مراكز التأهيل.' 
    },
    specs: { 
      type: {
        he: 'שתן (Urine Strip / Cassette)',
        en: 'Urine Strip / Cassette',
        de: 'Urinteststreifen / Kassette',
        fr: 'Bandelette / Cassette d\'urine',
        ru: 'Тест-полоска / Кассета с мочой',
        ar: 'شريط / كاسيت بول'
      },
      pack: '50 Tests',
      time: '5 Min'
    }
  },

  // --- URINALYSIS & WOMEN'S HEALTH ---
  { 
    id: 'uti-otc', 
    category: ['b2c', 'b2b'], 
    subCat: 'Urine', 
    image: '/DSC_2116.JPG', 
    img2: '/7290013882035.jpg', 
    isProfessionalOnly: false,
    title: { 
      he: 'בדיקת דלקת בשתן / ציסטיטיס (UTI)', 
      en: 'UTI Urinary Tract Infection Rapid Test', 
      de: 'Harnwegsinfektion (UTI Schnelltest)', 
      fr: 'Test Rapide Infection Urinaire (IUT / Cystite)', 
      ru: 'Экспресс-тест на инфекции мочевыводящих путей (UTI)', 
      ar: 'فحص التهاب المسالك البولية السريع (UTI)' 
    },
    shortDesc: { 
      he: 'בדיקה עצמית מהירה לגילוי דלקות בדרכי השתן (ציסטיטיס) (ברקוד: 7290013882035). תהליך של 2 דקות.', 
      en: 'Rapid self-test for urinary tract infections / cystitis (Barcode: 7290013882035). 2-minute results.', 
      de: 'Schnelltest bei Blasenentzündung und Harnwegsinfekten (Barcode: 7290013882035). 2 Minuten.', 
      fr: 'Test rapide pour infections urinaires / cystite (Code-barres: 7290013882035). Résultat en 2 minutes.', 
      ru: 'Домашний экспресс-тест на цистит и инфекции мочевыводящих путей (Штрихкод: 7290013882035). 2 минуты.', 
      ar: 'فحص ذاتي سريع للكشف عن التهابات المسالك البولية والتهاب المثانة (الباركود: 7290013882035). نتيجة خلال دقيقتين.' 
    },
    specs: { 
      type: {
        he: 'שתן (Urine Strip)',
        en: 'Urine Strip',
        de: 'Urinteststreifen',
        fr: 'Bandelette urinaire',
        ru: 'Тест-полоска для мочи',
        ar: 'شريط فحص بول'
      },
      time: '2 Min', 
      setting: {
        he: 'לשימוש עצמי וביתי',
        en: 'Self-Use / Home Care',
        de: 'Selbsttest / Heimanwendung',
        fr: 'Autotest / Domicile',
        ru: 'Самотестирование / Дом',
        ar: 'للفحص الذاتي / المنزلي'
      },
      barcode: '7290013882035' 
    }
  },
  { 
    id: 'candida', 
    category: ['b2c', 'b2b'], 
    subCat: 'Womens', 
    image: '/DSC_2110.JPG', 
    img2: '/7290013882042.jpg', 
    isProfessionalOnly: false,
    title: { 
      he: 'בדיקת קנדידה וגינאלית', 
      en: 'Candida Albicans Vaginal Rapid Test', 
      de: 'Vaginaler Candida Schnelltest', 
      fr: 'Test Rapide Candida Vaginal', 
      ru: 'Экспресс-тест на вагинальный кандидоз (Кандида)', 
      ar: 'فحص فطريات المهبل السريع (كانديدا)' 
    },
    shortDesc: { 
      he: 'אבחון מהיר ודיסקרטי בבית (ברקוד: 7290013882042). מאפשר זיהוי מיידי לצורך התאמת הטיפול המתאים בבית.', 
      en: 'Discreet and rapid home test for vaginal Candida (Barcode: 7290013882042). Enables instant identification.', 
      de: 'Diskreter Schnelltest für Zuhause auf Candida (Barcode: 7290013882042).', 
      fr: 'Test à domicile rapide et discret pour Candida (Code-barres: 7290013882042).', 
      ru: 'Быстрый и конфиденциальный домашний тест на вагинальный кандидоз (Штрихкод: 7290013882042).', 
      ar: 'تشخيص سريع وسري في المنزل لفطريات المهبل (الباركود: 7290013882042) لملاءمة العلاج المناسب.' 
    },
    specs: { 
      type: {
        he: 'מטוש וגינאלי (Vaginal Swab)',
        en: 'Vaginal Swab',
        de: 'Vaginalabstrich',
        fr: 'Écouvillon vaginal',
        ru: 'Вагинальный мазок',
        ar: 'مسحة مهبلية (Vaginal Swab)'
      },
      time: '10 Min', 
      setting: {
        he: 'לשימוש עצמי וביתי',
        en: 'Self-Use / Home Care',
        de: 'Selbsttest / Heimanwendung',
        fr: 'Autotest / Domicile',
        ru: 'Самотестирование / Дом',
        ar: 'للفحص الذاتي / المنزلي'
      },
      barcode: '7290013882042' 
    }
  },
  { 
    id: 'ovulation', 
    category: ['b2c', 'b2b'], 
    subCat: 'Womens', 
    image: '/DSC_2049.JPG', 
    isProfessionalOnly: false,
    title: { 
      he: 'בדיקת ביוץ (7 בדיקות סוואב/מקלון)', 
      en: 'LH Ovulation Rapid Test Kit (7 Tests)', 
      de: 'LH Eisprung-Schnelltest (7 Tests)', 
      fr: 'Test d\'Ovulation Rapide LH (7 Tests)', 
      ru: 'Экспресс-тест на овуляцию LH (7 тестов)', 
      ar: 'طقم فحص التبويض السريع LH (7 فحوصات)' 
    },
    shortDesc: { 
      he: 'ערכת תכנון משפחה שלמה (ברקוד: 7290013882028). כוללת 7 בדיקות ביוץ מדויקות בבית.', 
      en: 'Complete family planning kit (Barcode: 7290013882028). Contains 7 precise home ovulation tests.', 
      de: 'Komplettes Familienplanungs-Set mit 7 Eisprungtests (Barcode: 7290013882028).', 
      fr: 'Kit complet de planification familiale contenant 7 tests d\'ovulation (Code-barres: 7290013882028).', 
      ru: 'Набор для планирования семьи с 7 точными тестами на овуляцию дома (Штрихкод: 7290013882028).', 
      ar: 'طقم كامل لتنظيم وتخطيط الحمل (الباركود: 7290013882028) يحتوي على 7 فحوصات دقيقة للتبويض.' 
    },
    specs: { 
      type: {
        he: 'מקלון זרימה (Midstream)',
        en: 'Midstream',
        de: 'Midstream (Urin)',
        fr: 'Bâtonnet Midstream',
        ru: 'Струйный тест (Midstream)',
        ar: 'مجرى البول (Midstream)'
      },
      pack: '7 Tests', 
      time: '5 Min', 
      setting: {
        he: 'לשימוש עצמי וביתי',
        en: 'Self-Use / Home Care',
        de: 'Selbsttest / Heimanwendung',
        fr: 'Autotest / Domicile',
        ru: 'Самотестирование / Дом',
        ar: 'للفحص الذاتي / المنزلي'
      },
      barcode: '7290013882028' 
    }
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
      ru: 'LabOnTime hCG Экспресс-тест на беременность (1 тест)', 
      ar: 'LabOnTime hCG فحص الحمل السريع (عبوة مفردة)' 
    },
    shortDesc: { 
      he: 'בדיקת היריון מהירה ומדויקת בפורמט LabOnTime (ברקוד: 7290013882097 / מק"ט: 51085). תוצאה ברורה בתוך דקות ספורות בבית.', 
      en: 'Rapid, highly reliable home pregnancy test in LabOnTime format (Barcode: 7290013882097 / Cat: 51085). Easy to use with clear results in minutes.', 
      de: 'Zuverlässiger Schwangerschaftstest im LabOnTime-Format (Barcode: 7290013882097).', 
      fr: 'Test de grossesse rapide et fiable au format LabOnTime (Code-barres: 7290013882097).', 
      ru: 'Точный экспресс-тест на беременность в формате LabOnTime (Штрихкод: 7290013882097). Четкий результат за минуты.', 
      ar: 'فحص حمل سريع وفائق الدقة بتصميم LabOnTime (الباركود: 7290013882097). نتائج واضحة خلال دقائق.' 
    },
    specs: { 
      sensitivity: '25 mIU/mL', 
      type: {
        he: 'מקלון זרימה / שתן (Midstream)',
        en: 'Midstream / Urine',
        de: 'Midstream / Urin',
        fr: 'Midstream / Urine',
        ru: 'Струйный / Моча',
        ar: 'مجرى البول / شريط (Midstream)'
      },
      time: '3 Min', 
      pack: '1 Test', 
      setting: {
        he: 'לשימוש עצמי וביתי',
        en: 'Self-Use / Home Care',
        de: 'Selbsttest / Heimanwendung',
        fr: 'Autotest / Domicile',
        ru: 'Самотестирование / Дом',
        ar: 'للفحص الذاتي / المنزلي'
      },
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
      ru: 'LabOnTime hCG Экспресс-тест на беременность (Двойная упаковка)', 
      ar: 'LabOnTime hCG فحص الحمل السريع (عبوة مزدوجة)' 
    },
    shortDesc: { 
      he: 'מארז כפול לבדיקת היריון מוקדמת בפורמט LabOnTime (ברקוד: 7290013882103 / מק"ט: 51085-2). שני מקלוני בדיקה לאימות נוח בבית.', 
      en: 'Double pack pregnancy test kit in LabOnTime format (Barcode: 7290013882103 / Cat: 51085-2). Two tests for convenient verification.', 
      de: 'Schwangerschafts-Frühtest Doppelpack im LabOnTime-Format (Barcode: 7290013882103).', 
      fr: 'Double test de grossesse précoce au format LabOnTime (Code-barres: 7290013882103).', 
      ru: 'Двойная упаковка тестов на раннюю беременность LabOnTime (Штрихкод: 7290013882103).', 
      ar: 'عبوة مزدوجة لاختبار الحمل المبكر بنظام LabOnTime (الباركود: 7290013882103) لاختبار وتأكيد مريح في المنزل.' 
    },
    specs: { 
      sensitivity: '25 mIU/mL', 
      type: {
        he: 'מקלון זרימה / שתן (Midstream)',
        en: 'Midstream / Urine',
        de: 'Midstream / Urin',
        fr: 'Midstream / Urine',
        ru: 'Струйный / Моча',
        ar: 'مجرى البول / شريط (Midstream)'
      },
      time: '3 Min', 
      pack: '2 Tests', 
      setting: {
        he: 'לשימוש עצמי וביתי',
        en: 'Self-Use / Home Care',
        de: 'Selbsttest / Heimanwendung',
        fr: 'Autotest / Domicile',
        ru: 'Самотестирование / Дом',
        ar: 'للفحص الذاتي / المنزلي'
      },
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
      ru: 'LabOnTime COVID-19 и Грипп A+B Комбинированный экспресс-тест (Самотестирование)', 
      ar: 'LabOnTime كوفيد-19 وإنفلونزا A+B فحص مشترك سريع (للاستخدام الذاتي)' 
    },
    shortDesc: { 
      he: 'בדיקה משולבת מהירה ומדויקת לאבחון מבדל סימולטני של נגיפי קורונה ושפעת עונתית A/B מדגימת מטוש אף אחת. מיועדת לשימוש עצמי וביתי בנוחות ובמהירות (תוצאות ברורות בתוך 15 דקות).', 
      en: 'Rapid differential self-test for simultaneous detection of COVID-19 and Influenza A+B from a single nasal swab. Designed for convenient at-home and self-use with results in 15 minutes.', 
      de: 'Differenzial-Schnelltest auf SARS-CoV-2 und Influenza A+B für die Eigenanwendung zu Hause aus einem einzigen Nasenabstrich. Ergebnis in 15 Minuten.', 
      fr: 'Test d\'autodiagnostic rapide combiné pour le SARS-CoV-2 et la grippe A+B à domicile à partir d\'un seul écouvillon nasal. Résultats en 15 minutes.', 
      ru: 'Комбинированный экспресс-тест для одновременного дифференциального выявления COVID-19 и гриппа А/В из одного мазка из носа за 15 минут.', 
      ar: 'فحص مدمج سريع وفائق الدقة للتشخيص المتزامن لفيروسي كورونا والإنفلونزا الموسمية A/B من مسحة أنف واحدة في المنزل خلال 15 دقيقة.' 
    },
    specs: { 
      type: {
        he: 'מטוש אף (Nasal Swab)',
        en: 'Nasal Swab',
        de: 'Nasenabstrich',
        fr: 'Écouvillon nasal',
        ru: 'Мазок из носа',
        ar: 'مسحة أنف (Nasal Swab)'
      },
      sensitivity: '>95%', 
      specificity: '100%', 
      time: '15 Min', 
      setting: {
        he: 'לשימוש עצמי וביתי',
        en: 'Self-Use / Home Care',
        de: 'Selbsttest / Heimanwendung',
        fr: 'Autotest / Domicile',
        ru: 'Самотестирование / Дом',
        ar: 'للفحص الذاتي / المنزلي'
      }
    }
  }
];

export default productsDatabase;
