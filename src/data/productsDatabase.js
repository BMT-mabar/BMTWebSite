// --- COMPREHENSIVE PRODUCT DATABASE (Representing 200+ capabilities) ---
const productsDatabase = [
  // --- B2B INFECTIOUS DISEASE ---
  { id: 'strep-a-pen', category: 'b2b', subCat: 'Infectious', image: 'DSC_2091.JPG', img2: 'LabOnTime Device.jpg',
    title: { he: 'LabOnTime™ Strep A (פטנט 0-שלבים)', en: 'LabOnTime™ Strep A (0-Step Patent)', ru: 'LabOnTime™ Strep A', ar: 'LabOnTime™ Strep A' },
    shortDesc: { he: 'הבדיקה המהירה בעולם לדלקת גרון. פורמט עט ייחודי המבטל לחלוטין העברות נוזלים פתוחות וזיהומים. (Cat No: 56002)', en: 'The fastest Strep A test. Unique pen format completely eliminates fluid transfers and contamination. (Cat: 56002)' },
    specs: { sensitivity: '95.1%', specificity: '100%', time: '5 Min', steps: '2 (NO-STEP)' },
    comparison: { us: { steps: '2', time: '5 min', transfers: '0' }, them: { steps: '9', time: '12 min', transfers: '4' } },
    youtubeId: 'x92STpm-v9w'
  },
  { id: 'flu-ab', category: 'b2b', subCat: 'Infectious', image: 'LabOnTime Device.jpg',
    title: { he: 'Influenza A+B (פורמט פטנט)', en: 'Influenza A+B Patented', ru: 'Грипп A+B', ar: 'الإنفلونزا A+B' },
    shortDesc: { he: 'גילוי מוקדם של שפעת עונתית בפורמט התקן סגור. מחקר קליני ב-Heliyon הוכיח 100% ספציפיות.', en: 'Early detection of seasonal flu in a closed device format. Clinical study proved 100% specificity.' },
    specs: { sensitivity: '75.7%', specificity: '100%', time: '10 Min', validation: 'Heliyon 2024' }
  },
  { id: 'covid-ag', category: 'b2b', subCat: 'Infectious', image: 'DSC_2058.JPG',
    title: { he: 'COVID-19 Antigen - NO STEP', en: 'COVID-19 Antigen - NO STEP', ru: 'Антиген COVID-19', ar: 'مستضد كوفيد-19' },
    shortDesc: { he: 'בדיקת קורונה מהירה בתצורת פטנט (התקן משולב). אידיאלית למרפאות למניעת הפצת זיהומים.', en: 'Rapid COVID-19 Ag test in patented integrated format. Ideal for infection control in clinics.' },
    specs: { sensitivity: '97%', specificity: '100%', time: '10 Min', steps: 'Integrated Device' }
  },
  { id: 'resp-panels', category: 'b2b', subCat: 'Infectious', image: 'Placeholder_Virus',
    title: { he: 'RSV / Adenovirus / M. Pneumoniae', en: 'RSV / Adenovirus / M. Pneumoniae', ru: 'Респираторные панели', ar: 'أمراض تنفسية' },
    shortDesc: { he: 'קסטות בדיקה מהירות למחלות דרכי הנשימה כולל פאנלים משולבים ומחלקתיים (Cat: 51073-51076).', en: 'Rapid test cassettes for respiratory tract infections including combo panels.' },
    specs: { type: 'Nasal Swab / Aspirate', pack: '20 Tests' }
  },
  { id: 'hiv-panels', category: 'b2b', subCat: 'Infectious', image: 'Placeholder_Virus',
    title: { he: 'HIV / Syphilis / Hepatitis Panels', en: 'HIV / Syphilis / Hepatitis Combo', ru: 'ВИЧ / Сифилис / Гепатит', ar: 'فيروس نقص المناعة / الكبد' },
    shortDesc: { he: 'בדיקות סרולוגיות מהירות לזיהוי נוגדני HIV (1/2/O/p24), עגבת, והפטיטיס (A,B,C,E) מדם מלא.', en: 'Rapid serological tests for HIV (1/2/O/p24), Syphilis, and Hepatitis antibodies/antigens.' },
    specs: { type: 'WB / Serum / Plasma', pack: '25T/40T/50T' }
  },
  { id: 'h-pylori-b2b', category: 'b2b', subCat: 'Infectious', image: 'Placeholder_Virus',
    title: { he: 'H. Pylori Antigen/Antibody Tests', en: 'H. Pylori Antigen/Antibody Tests', ru: 'Тесты H. Pylori', ar: 'جرثومة المعدة H. Pylori' },
    shortDesc: { he: 'בדיקות מהירות לאבחון הליקובקטר פילורי - נוגדנים בדם (51006) או אנטיגן בצואה (51009).', en: 'Rapid diagnostic tests for H. pylori - antibodies in blood or antigen in feces.' },
    specs: { type: 'Blood / Feces', pack: '25-50 Tests' }
  },
  { id: 'dengue-malaria', category: 'b2b', subCat: 'Infectious', image: 'Placeholder_Virus',
    title: { he: 'Malaria / Dengue / Typhoid', en: 'Malaria / Dengue / Typhoid', ru: 'Малярия / Денге / Тиф', ar: 'ملاريا / حمى الضنك' },
    shortDesc: { he: 'מערך בדיקות מחלות טרופיות לזיהוי מהיר במרפאות מטיילים ובמעבדות פתולוגיה.', en: 'Tropical disease testing suite for rapid identification in travel clinics and pathology labs.' },
    specs: { type: 'Whole Blood', pack: '25-40 Tests' }
  },
  
  // --- B2B TUMOR MARKERS ---
  { id: 'fob-b2b', category: 'b2b', subCat: 'Tumor', image: 'DSC_2078.JPG', img2: '7290013882066.jpg',
    title: { he: 'בדיקת דם סמוי בצואה (FOB)', en: 'FOB Rapid Test - Clinical', ru: 'FOB (Скрытая кровь)', ar: 'الدم الخفي (FOB)' },
    shortDesc: { he: 'מערכת סקר לסרטן המעי הגס. יכולת אינטגרציה דיגיטלית מלאה לאפליקציית קופת החולים (Cat: 53003).', en: 'Colorectal cancer screening system. Digital integration capabilities for HMOs.' },
    specs: { sensitivity: '95%', accuracy: '99.1%', type: 'Feces Cassette', time: '5 Min' },
    youtubeId: '51ECod0uUy4'
  },
  { id: 'psa', category: 'b2b', subCat: 'Tumor', image: 'Placeholder_Tumor',
    title: { he: 'PSA Qualitative Rapid Test', en: 'PSA Qualitative Rapid Test', ru: 'PSA Тест (ПСА)', ar: 'مستضد البروستاتا (PSA)' },
    shortDesc: { he: 'בדיקה איכותית מהירה לגילוי אנטיגן PSA (סרטן הערמונית) בדם (Cat No: 53008).', en: 'Qualitative rapid test for Prostate Specific Antigen detection.' },
    specs: { type: 'WB / Serum / Plasma', pack: '10T/25T', time: '5 Min' }
  },
  { id: 'cea-afp', category: 'b2b', subCat: 'Tumor', image: 'Placeholder_Tumor',
    title: { he: 'CEA / AFP Tumor Markers', en: 'CEA / AFP Tumor Markers', ru: 'Онкомаркеры CEA / AFP', ar: 'مؤشرات الأورام CEA / AFP' },
    shortDesc: { he: 'קסטות בדיקה מהירות לאיתור סמני הסרטן CEA ו-AFP בנסיוב/פלזמה.', en: 'Rapid test cassettes for CEA and AFP tumor markers.' },
    specs: { type: 'Serum / Plasma', pack: '40 Tests' }
  },

  // --- B2B CARDIAC MARKERS ---
  { id: 'cardiac-combo', category: 'b2b', subCat: 'Cardiac', image: 'Placeholder_Heart',
    title: { he: 'Cardiac Multi-Marker Combo Panels', en: 'Cardiac Multi-Marker Combo Panels', ru: 'Кардиомаркеры (Панель)', ar: 'لوحة مؤشرات القلب' },
    shortDesc: { he: 'פאנלים משולבים (Troponin I / CK-MB / Myoglobin / H-FABP) לזיהוי מהיר של אוטם שריר הלב בחירום.', en: 'Combo panels for rapid emergency diagnosis of myocardial infarction.' },
    specs: { type: 'WB / Serum / Plasma', time: '15 Min' }
  },
  { id: 'ctni-solo', category: 'b2b', subCat: 'Cardiac', image: 'Placeholder_Heart',
    title: { he: 'cTnI (Troponin I) Rapid Test', en: 'cTnI (Troponin I) Rapid Test', ru: 'Тропонин I (cTnI)', ar: 'تروبونين (cTnI)' },
    shortDesc: { he: 'בדיקות מהירות לטרופונין, כולל פורמט ללא באפר לביצוע מיידי בשטח.', en: 'Rapid test for Troponin I, including Buffer-free format for immediate field use.' },
    specs: { type: 'WB / Serum / Plasma', pack: '10 Tests' }
  },
  { id: 'crp-ddimer', category: 'b2b', subCat: 'Cardiac', image: 'Placeholder_Heart',
    title: { he: 'CRP, D-Dimer & Procalcitonin', en: 'CRP, D-Dimer & Procalcitonin', ru: 'CRP, D-Dimer & PCT', ar: 'البروتين التفاعلي والجلطات' },
    shortDesc: { he: 'בדיקות לרמות דלקת (CRP), קרישיות (D-Dimer) וספסיס (PCT).', en: 'Rapid tests measuring inflammation (CRP), blood clotting (D-Dimer) and Sepsis (PCT).' },
    specs: { type: 'WB / Serum / Plasma', pack: '10 Tests' }
  },

  // --- B2B DRUGS OF ABUSE (DOA) ---
  { id: 'doa-cup', category: 'b2b', subCat: 'Doa', image: 'Placeholder_Doa',
    title: { he: 'Multi-Drug Rapid Test Cup', en: 'Multi-Drug Rapid Test Cup', ru: 'Мультитест на наркотики', ar: 'كوب اختبار المخدرات' },
    shortDesc: { he: 'כוס בדיקה אינטגרלית לבדיקת סמים מרובה בשתן (פאנלים מ-5 ועד 12 סמים במקביל). תכנון היגייני ומתקדם.', en: 'Integral testing cup for up to 12 drugs in urine. Hygienic and secure design.' },
    specs: { type: 'Urine', pack: 'Various Panels', time: '5 Min' }
  },
  { id: 'doa-wb', category: 'b2b', subCat: 'Doa', image: 'Placeholder_Doa',
    title: { he: 'Whole Blood Multi-Drug Cassette', en: 'Whole Blood Multi-Drug Cassette', ru: 'Мультитест по крови', ar: 'اختبار المخدرات في الدم' },
    shortDesc: { he: 'חדשנות בתחום: סדרת קסטות ייחודית לביצוע פאנל סמים רחב ישירות מדגימת דם מלא (WB).', en: 'Innovation: Unique cassette series for multi-drug testing directly from whole blood.' },
    specs: { type: 'Whole Blood', pack: '25 Tests', steps: '1 Step' }
  },
  { id: 'doa-saliva', category: 'b2b', subCat: 'Doa', image: 'Placeholder_Doa',
    title: { he: 'Oral Fluid (Saliva) Drug Tests', en: 'Oral Fluid (Saliva) Drug Tests', ru: 'Тесты по слюне', ar: 'اختبارات المخدرات باللعاب' },
    shortDesc: { he: 'בדיקות מהירות לאלכוהול, אמפטמינים וסמים נוספים באמצעות דגימת רוק פשוטה ולא פולשנית.', en: 'Rapid non-invasive tests for Alcohol, AMP, BZO and others using Oral Fluid.' },
    specs: { type: 'Oral Fluid', pack: '25T/50T' }
  },

  // --- B2B URINALYSIS & OTHER ---
  { id: 'urinalysis', category: 'b2b', subCat: 'Urine', image: 'Placeholder_Urine',
    title: { he: 'Urinalysis Reagent Dipsticks (1-11)', en: 'Urinalysis Reagent Dipsticks (1-11)', ru: 'Тест-полоски для мочи', ar: 'أشرطة فحص البول' },
    shortDesc: { he: 'סדרת מקלונים מקצועית לבדיקת שתן. ניתן להזמין מפרמטר בודד ועד ל-11 פרמטרים שונים.', en: 'Professional urine reagent strips. Available from 1 up to 11 testing parameters.' },
    specs: { type: 'Urine', pack: '100 Strips/Tube' }
  },
  { id: 'micro-albumin', category: 'b2b', subCat: 'Urine', image: 'Placeholder_Urine',
    title: { he: 'Micro-Albumin Rapid Test', en: 'Micro-Albumin Rapid Test', ru: 'Тест на Микроальбумин', ar: 'اختبار الألبومين הדקيق' },
    shortDesc: { he: 'בדיקה איכותית או חצי-כמותית לגילוי מיקרו-אלבומין בשתן להערכת תפקוד כלייתי מוקדם.', en: 'Qualitative or Semi-Quant test for urine Micro-Albumin to evaluate kidney function.' },
    specs: { type: 'Urine', format: 'Dipstick / Cassette' }
  },

  // --- B2C (OTC) WOMEN'S HEALTH & GENERAL ---
  { id: 'preg-1', category: 'b2c', subCat: 'Womens', image: 'DSC_2064.JPG',
    title: { he: 'בשעה טובה - בדיקת הריון (בודדת)', en: 'Pregnancy Test (Single)', ru: 'Тест на беременность', ar: 'اختبار الحمل المنزلي' },
    shortDesc: { he: 'ערכה ביתית לבדיקת הריון מוקדמת. דיוק מעל 99%, קלה ונוחה לשימוש במבנה "מקלון זרם".', en: 'Home early pregnancy test kit. Over 99% accuracy in a convenient midstream format.' },
    specs: { accuracy: '>99%', type: 'Midstream', time: '3 Min' }
  },
  { id: 'preg-2', category: 'b2c', subCat: 'Womens', image: 'DSC_2068.JPG',
    title: { he: 'בשעה טובה - בדיקת הריון (כפולה)', en: 'Pregnancy Test (Double)', ru: 'Тест на беременность (2 шт)', ar: 'اختبار الحمل (مزدوج)' },
    shortDesc: { he: 'מארז כפול לבדיקת הריון. נועד לאימות נוסף של התוצאה ולביטחון אישי מרבי בבית המטופלת.', en: 'Double pack pregnancy test. Designed for secondary verification and maximum confidence.' },
    specs: { accuracy: '>99%', pack: '2 Tests', time: '3 Min' }
  },
  { id: 'ovulation', category: 'b2c', subCat: 'Womens', image: 'DSC_2049.JPG',
    title: { he: 'בדיקת ביוץ (7 בדיקות במארז)', en: 'Ovulation Test (7 Tests)', ru: 'Тест на овуляцию (7 шт)', ar: 'اختبار التبويض (7)' },
    shortDesc: { he: 'ערכת תכנון משפחה שלמה. כוללת 7 בדיקות ביוץ מדויקות לאיתור אופטימלי של ימי הפוריות.', en: 'Complete family planning kit. Includes 7 accurate ovulation tests to detect fertile days.' },
    specs: { pack: '7 Tests', time: '5 Min' }
  },
  { id: 'candida', category: 'b2c', subCat: 'Womens', image: 'DSC_2110.JPG',
    title: { he: 'בדיקת קנדידה וגינאלית', en: 'Vaginal Candida Test', ru: 'Тест на кандидоз', ar: 'اختبار الكانديدا' },
    shortDesc: { he: 'אבחון מהיר ודיסקרטי בבית (OTC). מאפשר זיהוי מידי לצורך התאמת הטיפול המתאים בבית המרקחת.', en: 'Fast and discreet OTC home diagnosis for Vaginal Candida to enable prompt treatment.' },
    specs: { type: 'Vaginal Swab', time: '10 Min', setting: 'OTC / Home' }
  },
  { id: 'hpylori-otc', category: 'b2c', subCat: 'Other', image: '20260323_161807.jpg',
    title: { he: 'H. pylori בצואה - לשימוש ביתי', en: 'H. pylori Feces - Home Test', ru: 'Домашний тест H. pylori', ar: 'اختبار H. pylori المنزلي' },
    shortDesc: { he: 'בדיקה מהירה לגילוי חיידק הליקובקטר פילורי בדגימת צואה, בנוחות ובפרטיות של הבית.', en: 'Rapid OTC test for detecting H. pylori bacteria in stool, in the privacy of your home.' },
    specs: { type: 'Feces Cassette', time: '10 Min', setting: 'OTC / Home' }
  },
  { id: 'uti-otc', category: 'b2c', subCat: 'Urine', image: 'Placeholder_Urine',
    title: { he: 'בדיקת דלקת בשתן (UTI)', en: 'Urinary Tract Infection (UTI)', ru: 'Тест на ИМП', ar: 'التهاب المسالك البولية' },
    shortDesc: { he: 'בדיקה עצמית מהירה לגילוי דלקת בדרכי השתן (לויקוציטים וניטריטים). תהליך של 2 דקות בבית.', en: 'Rapid self-test for Urinary Tract Infection detection (Leukocytes & Nitrites).' },
    specs: { type: 'Urine Dipstick', time: '2 Min', setting: 'OTC / Home' }
  }
];

export default productsDatabase;
