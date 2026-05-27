import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Activity, Microscope, ChevronDown, 
  X, CheckCircle, FileText, Smartphone, Award, Globe, Menu, 
  ArrowRight, ArrowLeft, Users, Beaker, FileBadge, 
  PlayCircle, Search, Mail, Phone, MapPin, 
  HeartPulse, TestTube, Fingerprint, Droplet, Factory,
  Target, Crosshair, Briefcase, Download
} from 'lucide-react';

// --- ROBUST TRANSLATIONS DICTIONARY (100% COVERAGE) ---
const translations = {
  he: {
    dir: 'rtl',
    seo: { title: 'BMT Diagnostics | פלטפורמות דיאגנוסטיקה מתקדמות', desc: 'יצרנית ישראלית גלובלית (משנת 2004) של בדיקות מהירות ופלטפורמות דיאגנוסטיקה (IVD) מוגנות פטנט.' },
    nav: { home: 'ראשי', about: 'אודותינו', b2b: 'קטלוג קליני (B2B)', b2c: 'מוצרי פארם (OTC)', tech: 'הטכנולוגיה', clinical: 'מחקר קליני', quote: 'הצעת מחיר' },
    hero: { title: 'דיאגנוסטיקה רפואית.<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">אמינות ללא פשרות.</span>', sub: 'חברת MedTech ישראלית מובילה משנת 2004. אנו מפתחים, מייצרים ומשווקים למעלה מ-200 פאנלים אבחוניים, המיוצרים תחת תקני ISO המחמירים ביותר ומשלבים דיוק קליני עם אוטומציה חכמה.', btnB2b: 'לקטלוג המקצועי', btnB2c: 'למוצרי צריכה (OTC)' },
    trust: { iso1: 'תקן ISO 13485:2016', iso2: 'תקן ISO 27001', ce: 'תאימות CE מלאה', moh: 'אישורי משרד הבריאות', pat: 'פטנטים בינלאומיים רשומים' },
    home: { 
      innovation: 'חדשנות בנקודת הטיפול (POC)',
      strepBadge: 'פטנט עולמי רשום', strepTitle: 'LabOnTime™ Strep A', strepDesc: 'הבדיקה המהירה והבטוחה בעולם לדלקת גרון. פורמט ה-"עט" הייחודי (0 שלבים) מבטל לחלוטין חשיפה ביולוגית ומייעל את זמני המרפאה.', strepSpec: 'ספציפיות קלינית', strepTrans: 'העברות נוזל פתוחות',
      fitBadge: 'Digital Health', fitTitle: 'סקר סרטן המעי הגס (FIT)', fitDesc: 'טרנספורמציה דיגיטלית בסקרי אוכלוסייה. אינטגרציה מלאה בין ערכה ביתית היגיינית לאפליקציית מטופל עם אימות בינה מלאכותית (AI).', fitAcc: 'דיוק אלגוריתמי', fitAi: 'ממשק ישיר ל-EMR',
      quality: 'יכולות ייצור וייבוא בקנה מידה עולמי', qualityDesc: 'תשתיות ייצור אוטומטיות בחדרים נקיים (ISO5), בשילוב מערך ייבוא רחב של למעלה מ-200 פרמטרים. אנו מהווים עוגן דיאגנוסטי למוסדות בריאות ברחבי העולם.',
      oem: 'שותפויות אסטרטגיות ופיתוח OEM', oemDesc: 'אנו פתוחים להרחבת רשת ההפצה הבינלאומית שלנו ולשיתופי פעולה טכנולוגיים לפיתוח פלטפורמות RDT מותאמות אישית על בסיס הטכנולוגיה מוגנת הפטנט שלנו.'
    },
    catalog: { 
      b2bDesc: 'פורטפוליו מקצועי המקיף למעלה מ-200 סוגי בדיקות ופאנלים למוסדות רפואיים, מעבדות חירום וקופות חולים. דיוק קליני מגובה מחקרית.', 
      b2cDesc: 'ליינים שלמים של ערכות אבחון לשימוש עצמי בבית (OTC). תכנון ארגונומי המאושר להפצה מסחרית ברשתות הפארם המובילות.',
      search: 'חפש מוצר, פרמטר או מק"ט...', filterAll: 'כל המוצרים', 
      catInfectious: 'מחלות זיהומיות', catWomens: 'בריאות האישה', catTumor: 'סמני סרטן', catCardiac: 'סמני לב', catDoa: 'סמים (DOA)', catUrine: 'בדיקות שתן', catOther: 'פרופילים מיוחדים',
      viewAllText: 'מוצג מדגם מייצג בלבד. לקטלוג ה-B2B המלא הכולל מעל 200 פרמטרים (כולל ליינים שלמים של AllTest), אנא פנו אלינו.'
    },
    product: { back: 'חזרה לקטלוג', specs: 'מפרט קליני וטכני', contact: 'בקשת הצעת מחיר / הזמנה', comparison: 'השוואת יעילות במרפאה', compSub: 'ניתוח תהליך העבודה הקליני אל מול קסטות הבדיקה המסורתיות.', metric: 'מדד בחינה', us: 'LabOnTime™', them: 'קסטות סטנדרטיות', handsOn: 'מספר שלבים ידניים', time: 'זמן כולל לקבלת תוצאה', risk: 'סיכון לחשיפה ביולוגית', zeroTransfers: '0 (ללא העברות)', fourTransfers: '4 חשיפות זיהומיות', video: 'הדגמת שימוש בווידאו' },
    tech: { title: 'מהפכת ה"אפס-שלבים"', desc: 'פלטפורמה המציבה סטנדרט עולמי חדש בבטיחות ביולוגית. ההתקן המשולב שלנו מבטל לחלוטין את הצורך בהעברת נוזלים פתוחה, ומצמצם את העבודה הידנית במרפאה ב-70%.', s1Title: 'מטוש וטסטר ביחידה אינטגרלית', s1Desc: 'המטוש מוטמע פיזית בתוך ידית ההתקן. מונע אובדן רכיבים או החלפת דגימות במרפאות עמוסות.', s2Title: 'מבחנת אקסטרקציה אטומה', s2Desc: 'הריאגנטים מעורבבים וחתומים מראש. הצוות רק מחדיר את ההתקן למבחנה – ללא צורך בספירת טיפות או ערבוב.', s3Title: 'מערכת סגורה וסטרילית', s3Desc: 'מרגע החדרת המטוש הוא ננעל בתוך המבחנה. התוצאה נקראת בבטחה מבעד לחלונית אטומה.', ecoBadge: 'Healthcare Ecosystem', ecoTitle: 'מהבדיקה אל התיק הרפואי', ecoDesc: 'BMT Diagnostics מעצבת את עתיד הרפואה הדיגיטלית. המערכות שלנו מאפשרות לשלב בדיקות ביתיות עם דיווח רציף, מאובטח ומונחה בינה מלאכותית (AI) ישירות למוסד הרפואי.', eco1: 'הצפנת נתונים מחמירה (תואם GDPR)', eco2: 'מעל 97% התאמה בפענוח מבוסס AI', eco3: 'אינטגרציה חלקה לתיקי המטופלים (EMR)' },
    clinical: { title: 'רפואה מבוססת נתונים (EBM)', desc: 'כל פלטפורמה מתוצרתנו עוברת שרשרת קפדנית של ולידציות קליניות במרכזים רפואיים מהשורה הראשונה.', c1Tag: 'ולידציה קלינית: מרכז רפואי צפון (פוריה)', c1Title: 'תיקוף מחקרי לפלטפורמת Strep A', c1Quote: '"הערכה נבדקה אל מול בדיקות תרבית בקרב 181 מטופלים במרכזנו... התקן הבדיקה הוכח כידידותי מאוד למשתמש, אינטואיטיבי לחלוטין, ודורש שלב עבודה קליני אחד בלבד." - פרופ\' אבי פרץ.', c1Spec: 'ספציפיות קלינית', c1Sens: 'רגישות (מתוקננת)*', c1Exc: '*בניכוי תרביות מעבדה בעלות עומס חיידקי נמוך במיוחד', c1Btn: 'למסמך המחקר המלא (PDF)', c2Tag: 'פרסום אקדמי: Heliyon Journal (2024)', c2Title: 'איתור מהיר של שפעת A/B', c2Quote: '"התקן ה-LabOnTime הוערך אל מול בדיקות RT-PCR מתקדמות... המסקנות מצביעות על יתרונות מובהקים וחיוניים ככלי דיאגנוסטי מהיר בנקודת הטיפול."', c2Spec: 'ספציפיות קלינית', c2Sens: 'רגישות (מול RT-PCR)', c2Btn: 'קריאת המאמר המדעי' },
    about: { title: 'חזית הביו-טק הישראלית', sub: 'נוסדנו ב-2004 במטרה לשנות את הדרך בה מתבצע אבחון רפואי - מהמעבדה אל נקודת הטיפול, ומשם אל בית המטופל. אנו מספקים מעטפת דיאגנוסטית כוללת.', c1Title: 'מצוינות בייצור ואוטומציה', c1Desc: 'הפעלה של קווי ייצור רובוטיים בחדרים נקיים (ISO5), המבטיחים איכות ואמינות רפואית עקבית.', c2Title: 'פורטפוליו עוצמתי', c2Desc: 'בנוסף לפטנטים העצמאיים, אנו בעלי יכולת ייצור וייבוא של מעל ל-200 סוגי פרמטרים ופאנלים קליניים.', c3Title: 'חדשנות כדרך חיים', c3Desc: 'אנו החברה הראשונה שהנגישה בדיקות זיהומיות מהירות (Strep A) ישירות לבתי המרקחת בישראל.', team: 'הצוות המוביל', roleCeo: 'מייסדת ומנכ"לית', roleCto: 'מייסד שותף ו-CTO', n1: 'תואר שני (MSc) במיקרוביולוגיה ואימונולוגיה (אונ\' בן-גוריון).', n2: 'תואר שני במינהל עסקים (MBA) עם התמחות בשיווק אסטרטגי.', n3: 'לשעבר מנהלת מוצר בחברת Biotechnology General (BTG).', n4: 'ניסיון קליני, תפעולי ומסחרי עשיר בחברת התרופות MSD.', i1: 'דוקטורט (PhD) באימונולוגיה מטעם מכון ויצמן למדע.', i2: 'למעלה מ-17 שנות ניסיון בהקמה וניהול של חברות ביומד מתקדמות.', i3: 'כיהן כראש חממת הסטארט-אפים הטכנולוגית RAD-Biomed.', i4: 'הוביל חברות מכשור רפואי ודיאגנוסטיקה להצלחה מסחרית באירופה וארה"ב.' },
    rfq: { title: 'מכרזים, הצעות מחיר ושיתופי פעולה', successTitle: 'בקשתך נקלטה בהצלחה במערכת!', successDesc: 'נציג בכיר מהמחלקה המסחרית שלנו יבחן את הדרישה ויחזור אליך בהקדם האפשרי.', name: 'שם מלא *', role: 'תפקיד במוסד *', rolePh: 'בחר/י מהרשימה...', r1: 'רופא / צוות רפואי', r2: 'מנהל/ת מעבדה', r3: 'מחלקת רכש / קניין מוסדי', r4: 'רוקח/ת', r5: 'מפיץ / נציג לפיתוח עסקי', clinic: 'שם המוסד הרפואי / חברה *', email: 'דוא"ל עסקי (ארגוני) *', phone: 'טלפון נייד / ישיר *', cancel: 'סגור', submit: 'שלח פנייה למחלקה' },
    footer: { desc: 'BMT Diagnostics (ביו-מרקטינג טי בע"מ) היא חברת MedTech ישראלית גלובלית, המובילה פיתוח וייצור של פלטפורמות דיאגנוסטיקה (IVD) מתקדמות.', linksTitle: 'ניווט מהיר', l1: 'קטלוג פתרונות (B2B)', l2: 'מוצרי פארמה (B2C)', l3: 'ולידציה קלינית ומדעית', contactTitle: 'יצירת קשר', address: 'רחוב האילן 14, פארק תעשיות אור עקיבא, ישראל', disclaimer: 'הצהרה משפטית ורפואית חשובה:', legal: 'המידע המופיע באתר זה נועד להעשרה ולמידע כללי בלבד. עבור כלל הערכות המאושרות לשימוש עצמי - קריאת התוצאה ופענוחה הינם באחריות המשתמש בלבד, בהתאם אך ורק לעלון הוראות השימוש (IFU) הרשמי המצורף לאריזת המוצר. המידע אינו מהווה תחליף בשום צורה לייעוץ רפואי, אבחנה קלינית או טיפול מוסמך. פלטפורמת LabOnTime™ מוגנת בפטנטים בינלאומיים רשומים.', rights: 'כל הזכויות שמורות לחברת ביו-מרקטינג טי בע"מ.' },
    specs: { sensitivity: 'רגישות', specificity: 'ספציפיות', accuracy: 'דיוק כללי', time: 'זמן בדיקה', steps: 'מספר שלבים ידניים', type: 'סוג הדגימה הדרושה', pack: 'כמות ערכות במארז', setting: 'יעוד מסחרי', validation: 'מחקר' }
  },
  en: {
    dir: 'ltr',
    seo: { title: 'BMT Diagnostics | Transforming Rapid Diagnostics', desc: 'Global Israeli manufacturer (est. 2004) of patented rapid diagnostic test platforms and over 200 POC panels for pharma, clinics, and institutions.' },
    nav: { home: 'Home', about: 'About Us', b2b: 'Clinical & OEM', b2c: 'OTC Pharmacy', tech: 'Technology', clinical: 'Validation', quote: 'Contact / Quote' },
    hero: { title: 'Rapid Diagnostics.<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Without Compromise.</span>', sub: 'A leading Israeli MedTech company since 2004. We manufacture patented RDT platforms, backed by over 200 diagnostic panels produced with smart automation under the strictest ISO standards.', btnB2b: 'Clinical Catalog', btnB2c: 'OTC Products' },
    trust: { iso1: 'ISO 13485:2016', iso2: 'ISO 27001', ce: 'CE Marked', moh: 'MOH Approved', pat: 'Global Patents' },
    home: { 
      innovation: 'Innovation at Point of Care',
      strepBadge: 'Patented Globally', strepTitle: 'LabOnTime™ Strep A', strepDesc: 'The fastest & safest Strep A test globally. Unique 0-step pen format completely eliminates open fluid transfers and clinical contamination.', strepSpec: 'Clinical Specificity', strepTrans: 'Open Transfers',
      fitBadge: 'Digital Health', fitTitle: 'FIT / FOB Screening', fitDesc: 'Digital transformation in population screening. Integrates hygienic home testing with secure HMO App reporting and real-time AI image verification.', fitAcc: 'AI Accuracy', fitAi: 'EMR Integration',
      quality: 'World-Class Manufacturing', qualityDesc: 'With years of experience, advanced automated production lines in ISO5 clean rooms, and a portfolio of over 200 RDTs, we serve as a central hub for global healthcare institutions.',
      oem: 'Business Opportunities & OEM', oemDesc: 'We seek global distribution partners and OEM collaborations to co-develop new medical applications based on our patented RDT platforms and digital ecosystem.'
    },
    catalog: { 
      b2bDesc: 'Comprehensive catalog featuring over 200 parameters for medical institutions, laboratories, ERs, and HMOs. Reliable tests supporting public health.', 
      b2cDesc: 'Full lines of simple, accurate, and highly user-friendly diagnostic kits approved for Over-The-Counter (OTC) home use.',
      search: 'Search product or Cat No...', filterAll: 'All Products', 
      catInfectious: 'Infectious Diseases', catWomens: 'Women\'s Health', catTumor: 'Tumor Markers', catCardiac: 'Cardiac Markers', catDoa: 'Drugs of Abuse', catUrine: 'Urinalysis', catOther: 'Other Profiles',
      viewAllText: 'Displaying a selected sample. For our full B2B catalog of over 200 products (including AllTest lines), please contact us.'
    },
    product: { back: 'Back', specs: 'Clinical & Tech Specs', contact: 'Request Volume Quote', comparison: 'Clinical Workflow Comparison', compSub: 'Workflow optimization vs. standard market testing cassettes.', metric: 'Metric', us: 'LabOnTime™', them: 'Standard Cassettes', handsOn: 'Hands-on Steps', time: 'Total Time to Result', risk: 'Bio-safety Exposure Risk', zeroTransfers: '0 (Zero transfers)', fourTransfers: '4 open exposures', video: 'Watch Demonstration' },
    tech: { title: 'The "0-Step" Revolution', desc: 'An integrated, patent-protected device that sets a new standard in bio-safety. It completely eliminates open fluid transfers and dramatically reduces hands-on time for medical staff.', s1Title: 'Integrated Swab & Tester', s1Desc: 'The swab is physically embedded in the device handle. All in one smart, sterile unit preventing mixed samples.', s2Title: 'Smart Extraction Tube', s2Desc: 'Reagents are pre-mixed and sealed. The operator simply inserts the device into the tube, swirls, and waits.', s3Title: 'Sealed & Sterile System', s3Desc: 'Once inserted, the swab locks inside forever. Results are safely read through a transparent window.', ecoBadge: 'Healthcare Ecosystem', ecoTitle: 'From Test to Medical Record', ecoDesc: 'BMT Diagnostics shapes the future of digital health. Our systems seamlessly integrate home tests with continuous, secure, AI-guided reporting directly to HMOs.', eco1: 'Encrypted Data (GDPR Compliant)', eco2: 'Over 97% AI Interpretation Accuracy', eco3: 'Smooth EMR Integration' },
    clinical: { title: 'Data-Driven Medicine', desc: 'Every product we develop undergoes rigorous independent clinical research and validation by world-leading medical centers.', c1Tag: 'Clinical Validation: Tzafon Medical Center', c1Title: 'Strep A Platform Validation', c1Quote: '"Evaluated against laboratory culture tests on 181 patients... The device was proven to be very user friendly, highly intuitive, and involves only a single clinical step." - Prof. Avi Peretz', c1Spec: 'Clinical Specificity', c1Sens: 'Relative Sensitivity*', c1Exc: '*Excluding cultures with very low bacterial load', c1Btn: 'Download Full Report (PDF)', c2Tag: 'Peer-Reviewed: Heliyon Journal (2024)', c2Title: 'Rapid Detection of Influenza A/B', c2Quote: '"The device was evaluated against advanced RT-PCR in 183 nasopharyngeal samples... The conclusions indicate distinct and vital advantages as a rapid point-of-care diagnostic tool."', c2Spec: 'Clinical Specificity', c2Sens: 'Sensitivity (vs RT-PCR)', c2Btn: 'Read Full Article' },
    about: { title: 'Leading the Bio-Tech Frontier', sub: 'Founded in 2004 with a mission to transform how medical diagnosis is performed - from central labs to clinics and patient homes. We provide a comprehensive diagnostic envelope.', c1Title: 'Manufacturing Excellence', c1Desc: 'Advanced robotic production lines located in ISO5 clean rooms, operating under smart automation and the strictest quality controls.', c2Title: 'Massive Portfolio', c2Desc: 'Beyond our patented innovations, we possess the capabilities to develop and manufacture over 200 types of diagnostic parameters.', c3Title: 'A Culture of Innovation', c3Desc: 'We were the first company in Israel to bring rapid infectious tests (Strep A) directly to pharmacies (OTC).', team: 'Executive Management', roleCeo: 'Founder & CEO', roleCto: 'Co-Founder & CTO', n1: 'MSc in Microbiology and Immunology from BGU.', n2: 'MBA with a specialization in Strategic Marketing.', n3: 'Former Product Manager at Biotechnology General (BTG).', n4: 'Extensive clinical and commercial experience at MSD pharma.', i1: 'PhD in Immunology from the Weizmann Institute of Science.', i2: 'Over 17 years experience in founding and leading biomed startups.', i3: 'Former Head of the RAD-Biomed Technology Accelerator.', i4: 'Led multiple medical device companies to FDA/CE approvals and global sales.' },
    rfq: { title: 'Quotes, Tenders & Partnerships', successTitle: 'Your inquiry has been received!', successDesc: 'A senior representative from our commercial department will review the details and contact you shortly with the most updated proposal.', name: 'Full Name *', role: 'Role / Position *', rolePh: 'Select from list...', r1: 'Physician / Medical Staff', r2: 'Laboratory Manager', r3: 'Institutional Procurement', r4: 'Pharmacist', r5: 'Distributor / Business Dev', clinic: 'Institution / Company Name *', email: 'Business Email *', phone: 'Mobile / Direct Phone *', cancel: 'Close', submit: 'Submit Inquiry' },
    footer: { desc: 'BMT Diagnostics (Bio-Marketing T Ltd.) is a global Israeli MedTech company, leading the development and manufacturing of advanced IVD diagnostic platforms.', linksTitle: 'Quick Navigation', l1: 'Solutions Catalog (B2B)', l2: 'Pharma Products (B2C)', l3: 'Scientific Clinical Validation', contactTitle: 'Contact Us', address: '14 Ha\'ilan St., Or Akiva Industrial Park, Israel', disclaimer: 'Important Legal & Medical Disclaimer:', legal: 'The information provided on this website is for educational and general information purposes only. For all self-test kits - reading and interpreting the results is the sole responsibility of the user, strictly in accordance with the official Instructions For Use (IFU). This information does not constitute a substitute for professional medical advice or clinical diagnosis. The LabOnTime™ platform is protected by international patents.', rights: 'All rights reserved to Bio-Marketing T Ltd.' }
  },
  ru: {
    dir: 'ltr',
    seo: { title: 'BMT Diagnostics | Передовая диагностика', desc: 'Израильская компания (основана в 2004). Более 200 видов экспресс-тестов и запатентованных диагностических платформ.' },
    nav: { home: 'Главная', about: 'О нас', b2b: 'Каталог B2B', b2c: 'Аптеки (OTC)', tech: 'Технология', clinical: 'Исследования', quote: 'Запрос цены' },
    hero: { title: 'Экспресс-диагностика.<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Без компромиссов.</span>', sub: 'Ведущая израильская MedTech компания (с 2004 г.). Более 200 диагностических панелей, умная автоматизация и высочайшие стандарты ISO.', btnB2b: 'Каталог для клиник', btnB2c: 'Домашние тесты' },
    trust: { iso1: 'ISO 13485:2016', iso2: 'ISO 27001', ce: 'Маркировка CE', moh: 'Одобрено Минздравом', pat: 'Мировые патенты' },
    home: { innovation: 'Инновации POC', strepBadge: 'Запатентовано', strepTitle: 'LabOnTime™ Strep A', strepDesc: 'Самый быстрый и безопасный тест на стрептококк. Формат ручки исключает перенос жидкости и риск заражения.', strepSpec: 'Специфичность', strepTrans: 'Переносов жидкости', fitBadge: 'Цифровое здоровье', fitTitle: 'Скрининг рака (FIT / FOB)', fitDesc: 'Цифровая трансформация. Интеграция домашнего теста с приложением и проверкой ИИ в реальном времени.', fitAcc: 'Точность ИИ', fitAi: 'Интеграция с ЭМК', quality: 'Производство мирового класса', qualityDesc: 'Продукция BMT производится в чистых помещениях (ISO5) на автоматизированных линиях.', oem: 'Сотрудничество и OEM', oemDesc: 'Мы ищем глобальных дистрибьюторов и партнеров для OEM-разработок.' },
    catalog: { b2bDesc: 'Комплексный каталог для медицинских учреждений: более 200 параметров.', b2cDesc: 'Надежные и простые в использовании домашние диагностические наборы (OTC).', search: 'Поиск продукта...', filterAll: 'Все продукты', catInfectious: 'Инфекции', catWomens: 'Женское здоровье', catTumor: 'Онкомаркеры', catCardiac: 'Кардиомаркеры', catDoa: 'Наркотики (DOA)', catUrine: 'Анализ мочи', catOther: 'Другие тесты', viewAllText: 'Показана часть ассортимента. Свяжитесь с нами для получения полного каталога из 200+ продуктов.' },
    product: { back: 'Назад в каталог', specs: 'Спецификации', contact: 'Запросить цену', comparison: 'Сравнение рабочих процессов', compSub: 'Оптимизация клинического процесса по сравнению со стандартными кассетами.', metric: 'Метрика', us: 'LabOnTime™', them: 'Обычные кассеты', handsOn: 'Количество шагов', time: 'Время до результата', risk: 'Био-риск', zeroTransfers: '0 переносов', fourTransfers: '4 переноса', video: 'Смотреть видео' },
    tech: { title: 'Платформа "0 шагов"', desc: 'Запатентованное устройство, полностью исключающее открытый перенос жидкостей. Максимальная безопасность.', s1Title: 'Встроенный тампон', s1Desc: 'Тампон является неотъемлемой частью ручки.', s2Title: 'Умная пробирка', s2Desc: 'Реагенты предварительно смешаны и запечатаны.', s3Title: 'Закрытая система', s3Desc: 'После введения тампон фиксируется навсегда.', ecoBadge: 'Экосистема', ecoTitle: 'От лаборатории к цифре', ecoDesc: 'Интеграция домашнего тестирования с ЭМК пациента.', eco1: 'Шифрование данных (GDPR)', eco2: 'Точность ИИ 97%', eco3: 'Автоматическая отчетность' },
    clinical: { title: 'Клиническая валидация', desc: 'Каждая платформа проходит независимые исследования.', c1Tag: 'Исследование: Tzafon Medical Center', c1Title: 'Валидация Strep A', c1Quote: '"Устройство оказалось очень интуитивным и требует всего одного шага." - Проф. Ави Перец', c1Spec: 'Специфичность', c1Sens: 'Чувствительность*', c1Exc: '*Исключая культуры с низкой нагрузкой', c1Btn: 'Скачать полный отчет', c2Tag: 'Публикация: Heliyon (2024)', c2Title: 'Обнаружение гриппа A/B', c2Quote: '"Устройство обладает явными преимуществами для быстрой диагностики в месте оказания помощи."', c2Spec: 'Специфичность', c2Sens: 'Чувствительность (vs RT-PCR)', c2Btn: 'Читать статью' },
    about: { title: 'Продвигая диагностику', sub: 'Основанная в 2004 году израильская компания, объединяющая науку и технологии.', c1Title: 'Совершенство производства', c1Desc: 'Автоматизированные линии в чистых помещениях ISO5.', c2Title: 'Масштабный портфель', c2Desc: 'Производство более 200 типов диагностических панелей.', c3Title: 'Культура инноваций', c3Desc: 'Первая компания, внедрившая тесты Strep A в аптеки Израиля.', team: 'Руководство', roleCeo: 'Основатель и CEO', roleCto: 'Сооснователь и CTO', n1: 'MSc Микробиология', n2: 'MBA', n3: 'Опыт в BTG Israel', n4: 'Опыт в MSD', i1: 'PhD, Институт Вейцмана', i2: '17+ лет опыта в биомеде', i3: 'Опыт управления акселераторами', i4: 'Вывод компаний на рынки США и ЕС' },
    rfq: { title: 'Запрос на сотрудничество', successTitle: 'Запрос получен!', successDesc: 'Наш коммерческий отдел свяжется с вами в ближайшее время.', name: 'ФИО *', role: 'Должность *', rolePh: 'Выберите...', r1: 'Врач', r2: 'Менеджер лаборатории', r3: 'Отдел закупок', r4: 'Фармацевт', r5: 'Дистрибьютор', clinic: 'Организация *', email: 'Email *', phone: 'Телефон *', cancel: 'Закрыть', submit: 'Отправить запрос' },
    footer: { desc: 'BMT Diagnostics — израильская MedTech компания, основанная в 2004 году.', linksTitle: 'Ссылки', l1: 'Каталог (B2B)', l2: 'Аптеки (B2C)', l3: 'Исследования', contactTitle: 'Контакты', address: 'Ор Акива, Израиль', disclaimer: 'Важное уведомление:', legal: 'Информация на сайте носит справочный характер. Использование домашних тестов — под ответственность пользователя в соответствии с инструкцией.', rights: 'Все права защищены.' }
  },
  ar: {
    dir: 'rtl',
    seo: { title: 'BMT Diagnostics | تشخيص متقدم', desc: 'شركة إسرائيلية رائدة (تأسست 2004) لتصنيع منصات التشخيص السريع، أكثر من 200 فحص طبي للعيادات والصيدليات.' },
    nav: { home: 'الرئيسية', about: 'حول الشركة', b2b: 'كتالوج طبي / OEM', b2c: 'كتالوج الصيدليات', tech: 'التكنولوجيا', clinical: 'التحقق السريري', quote: 'طلب تسعيرة' },
    hero: { title: 'تشخيص سريع.<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">دقة بدون مساومات.</span>', sub: 'شركة إسرائيلية رائدة منذ 2004. ننتج منصات محمية ببراءات اختراع وأكثر من 200 فحص مدعوم بالتصنيع الآلي.', btnB2b: 'الكتالوج الطبي', btnB2c: 'منتجات الصيدليات' },
    trust: { iso1: 'ISO 13485:2016', iso2: 'ISO 27001', ce: 'CE Marked', moh: 'موافقة وزارة الصحة', pat: 'براءات اختراع' },
    home: { innovation: 'ابتكار في نقطة الرعاية', strepBadge: 'براءة اختراع', strepTitle: 'LabOnTime™ Strep A', strepDesc: 'أسرع اختبار لالتهاب الحلق في العالم. شكل القلم يمنع نقل السوائل المفتوحة والعدوى.', strepSpec: 'الدقة السريرية', strepTrans: 'نقل السوائل', fitBadge: 'الصحة الرقمية', fitTitle: 'فحص FIT / FOB', fitDesc: 'تحول رقمي في الفحص. يجمع بين الفحص المنزلي وتطبيق طبي مع تحقق بالذكاء الاصطناعي.', fitAcc: 'دقة الخوارزمية', fitAi: 'تكامل مع الملف الطبي', quality: 'جودة تصنيع عالمية', qualityDesc: 'تُصنع جميع المنتجات في غرف نظيفة (ISO5) بخطوط إنتاج آلية ذكية.', oem: 'فرص أعمال و OEM', oemDesc: 'نبحث عن موزعين عالميين وشركاء لتطوير تطبيقات جديدة بناءً على التكنولوجيا الخاصة بنا.' },
    catalog: { b2bDesc: 'كتالوج شامل للمؤسسات الطبية، المختبرات، وصناديق المرضى مع أكثر من 200 فحص.', b2cDesc: 'مجموعات تشخيص منزلية دقيقة وسهلة الاستخدام للصيدليات.', search: 'بحث عن منتج...', filterAll: 'جميع المنتجات', catInfectious: 'أمراض معدية', catWomens: 'صحة المرأة', catTumor: 'مؤشرات الأورام', catCardiac: 'مؤشرات القلب', catDoa: 'المخدرات', catUrine: 'فحص البول', catOther: 'فحوصات أخرى', viewAllText: 'عرض عينة مختارة. للحصول على الكتالوج الكامل (200+ منتج)، يرجى الاتصال بنا.' },
    product: { back: 'الرجوع', specs: 'المواصفات الفنية', contact: 'طلب عرض أسعار', comparison: 'مقارنة الأداء في العيادة', compSub: 'تحسين سير العمل السريري مقابل الأشرطة العادية.', metric: 'المعيار', us: 'LabOnTime™', them: 'الأشرطة العادية', handsOn: 'الخطوات اليدوية', time: 'الوقت الإجمالي', risk: 'الخطر البيولوجي', zeroTransfers: '0 (بدون نقل)', fourTransfers: '4 خطوات نقل', video: 'شاهد الشرح' },
    tech: { title: 'منصة "صفر-خطوات"', desc: 'جهاز مدمج يمنع نقل السوائل المفتوحة تمامًا لحماية الطاقم الطبي.', s1Title: 'مسحة وجهاز مدمج', s1Desc: 'المسحة جزء لا يتجزأ من الجهاز. لا حاجة لأدوات إضافية.', s2Title: 'أنبوب استخراج ذكي', s2Desc: 'المواد الكيميائية مختلطة ومغلقة مسبقًا.', s3Title: 'نظام مغلق تمامًا', s3Desc: 'بمجرد إدخال المسحة، يتم قفلها للأبد.', ecoBadge: 'نظام بيئي صحي', ecoTitle: 'التوثيق الرقمي والذكاء الاصطناعي', ecoDesc: 'ربط مباشر للفحص المنزلي بالملف الطبي للمريض.', eco1: 'تشفير البيانات (GDPR)', eco2: 'دقة قراءة 97٪ (AI)', eco3: 'تكامل مباشر EMR' },
    clinical: { title: 'البحوث والتحقق السريري', desc: 'جميع منتجاتنا معتمدة من خلال أبحاث طبية مستقلة.', c1Tag: 'مستشفى بوريا (إسرائيل)', c1Title: 'تحقق منصة Strep A', c1Quote: '"أثبت الجهاز أنه سهل الاستخدام للغاية وبخطوة واحدة فقط." - بروفيسور آفي بيرتس', c1Spec: 'التحديد السريري', c1Sens: 'الحساسية*', c1Exc: '*باستثناء العينات منخفضة البكتيريا', c1Btn: 'تحميل التقرير الكامل', c2Tag: 'مجلة Heliyon (2024)', c2Title: 'اكتشاف الإنفلونزا A/B', c2Quote: '"أظهر الجهاز مزايا واضحة كأداة تشخيص سريعة في نقطة الرعاية."', c2Spec: 'التحديد', c2Sens: 'الحساسية (مقارنة بـ PCR)', c2Btn: 'قراءة المقال' },
    about: { title: 'مستقبل التشخيص الطبي', sub: 'شركة إسرائيلية تأسست عام 2004 لتقديم حلول دقيقة وسهلة الاستخدام.', c1Title: 'تصنيع ممتاز', c1Desc: 'خطوط إنتاج روبوتية في غرف نظيفة (ISO5).', c2Title: 'محفظة منتجات ضخمة', c2Desc: 'نقدم أكثر من 200 فحص مختلف.', c3Title: 'ثقافة الابتكار', c3Desc: 'أول شركة تدخل اختبارات Strep A السريعة للصيدليات في إسرائيل.', team: 'فريق الإدارة', roleCeo: 'المؤسسة والمديرة التنفيذية', roleCto: 'المؤسس الشريك و CTO', n1: 'ماجستير في علم الأحياء الدقيقة', n2: 'ماجستير في إدارة الأعمال', n3: 'مديرة منتجات سابقة في BTG', n4: 'خبرة تجارية في MSD', i1: 'دكتوراه من معهد وايزمان', i2: 'أكثر من 17 عامًا من الخبرة في إدارة الشركات', i3: 'رئيس مسرعة RAD-Biomed', i4: 'خبرة في الأسواق العالمية' },
    rfq: { title: 'طلبات الأسعار والشراكات', successTitle: 'تم استلام الطلب!', successDesc: 'سيتواصل معك فريق المبيعات قريباً بأفضل عرض.', name: 'الاسم الكامل *', role: 'الوظيفة *', rolePh: 'اختر...', r1: 'طبيب / طاقم طبي', r2: 'مدير مختبر', r3: 'مشتريات مؤسسية', r4: 'صيدلي', r5: 'موزع / شريك', clinic: 'اسم المؤسسة / الشركة *', email: 'البريد الإلكتروني *', phone: 'الهاتف *', cancel: 'إلغاء', submit: 'إرسال الطلب' },
    footer: { desc: 'BMT Diagnostics هي شركة رائدة في تصنيع معدات التشخيص الطبية منذ عام 2004.', linksTitle: 'روابط سريعة', l1: 'كتالوج المؤسسات (B2B)', l2: 'كتالوج الصيدليات (B2C)', l3: 'التحقق السريري', contactTitle: 'اتصل بنا', address: 'المنطقة الصناعية، أور عكيفا، إسرائيل', disclaimer: 'تنبيه قانوني وطبي:', legal: 'المعلومات المقدمة للتوعية فقط. الاستخدام المنزلي مسؤولية المستخدم ولا يغني عن الطبيب.', rights: 'جميع الحقوق محفوظة.' }
  }
};

// --- COMPREHENSIVE PRODUCT DATABASE (Representing 200+ capabilities) ---
const productsDatabase = [
  // --- B2B INFECTIOUS DISEASE ---
  { id: 'strep-a-pen', category: 'b2b', subCat: 'Infectious', image: 'DSC_2091.JPG', img2: 'LabOnTime Device.jpg',
    title: { he: 'LabOnTime™ Strep A (פטנט 0-שלבים)', en: 'LabOnTime™ Strep A (0-Step Patent)', ru: 'LabOnTime™ Strep A', ar: 'LabOnTime™ Strep A' },
    shortDesc: { he: 'הבדיקה המהירה בעולם לדלקת גרון. פורמט עט ייחודי המבטל לחלוטין העברות נוזלים פתוחות וזיהומים. (Cat No: 56002)', en: 'The fastest Strep A test. Unique pen format completely eliminates fluid transfers and contamination. (Cat: 56002)' },
    specs: { sensitivity: '95.1%', specificity: '100%', time: '5 Min', steps: '2 (NO-STEP)' },
    comparison: { us: { steps: '2', time: '5 min', transfers: '0' }, them: { steps: '9', time: '12 min', transfers: '4' } },
    videoFile: 'LabOnTime™ - Strep A Test (1).mp4'
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
    specs: { sensitivity: '95%', accuracy: '99.1%', type: 'Feces Cassette', time: '5 Min' }
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
    title: { he: 'Micro-Albumin Rapid Test', en: 'Micro-Albumin Rapid Test', ru: 'Тест на Микроальбумин', ar: 'اختبار الألبومين الدقيق' },
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

// --- CATEGORY ICONS MAPPING ---
const CategoryIcons = {
  Placeholder_Virus: Microscope,
  Placeholder_Heart: HeartPulse,
  Placeholder_Tumor: Target,
  Placeholder_Doa: Fingerprint,
  Placeholder_Urine: Droplet,
  Placeholder_Other: Crosshair
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [lang, setLang] = useState('he');
  const [page, setPage] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const langDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Robust Translation Helper with Multi-level Fallbacks
  const _ = (keyPath) => {
    const keys = keyPath.split('.');
    
    const getVal = (language) => {
      let val = translations[language];
      for (const key of keys) {
        if (!val) return null;
        val = val[key];
      }
      return val;
    };

    let result = getVal(lang);
    if (result) return result;
    
    // Fallback to English
    result = getVal('en');
    if (result) return result;

    // Fallback to Hebrew
    result = getVal('he');
    return result || keyPath;
  };

  const isRtl = translations[lang]?.dir === 'rtl';

  // Setup Document Properties & Hash Routing
  useEffect(() => {
    document.documentElement.dir = translations[lang]?.dir || 'ltr';
    document.documentElement.lang = lang;
    document.title = _('seo.title');
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = _('seo.desc');

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product/')) {
        const p = productsDatabase.find(p => p.id === hash.split('/')[1]);
        if (p) { setPage('product'); setSelectedProduct(p); } else setPage('home');
      } else {
        setPage(hash || 'home'); setSelectedProduct(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [lang]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) setIsLangDropdownOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const nav = (p, prod=null) => {
    setIsMobileMenuOpen(false);
    window.location.hash = (p === 'product' && prod) ? `product/${prod.id}` : p;
  };

  // --- REUSABLE PRODUCT CARD ---
  const ProductCard = ({ prod }) => {
    const isPlaceholder = prod.image.startsWith('Placeholder');
    const Icon = isPlaceholder ? (CategoryIcons[prod.image] || Microscope) : Microscope;
    
    return (
      <button 
        onClick={() => nav('product', prod)} 
        className="text-start group bg-white/70 backdrop-blur-md rounded-[2rem] shadow-md hover:shadow-2xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/30 w-full h-full"
        aria-label={`View details for ${prod.title[lang] || prod.title.en || prod.title.he}`}
      >
        <div className="h-60 w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8 relative border-b border-slate-100/50">
          {isPlaceholder ? (
            <div className="text-center opacity-30 group-hover:opacity-80 transition duration-500 transform group-hover:scale-110">
              <Icon className="w-20 h-20 mx-auto text-blue-900 mb-4 drop-shadow-sm" strokeWidth={1.5} />
              <div className="font-extrabold text-blue-900 tracking-widest text-xs uppercase">BMT Diagnostics</div>
            </div>
          ) : (
            <img src={prod.image} alt={prod.id} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-700 ease-out" />
          )}
          {prod.id.includes('strep-a-pen') && <div className="absolute top-4 right-4 bg-gradient-to-r from-red-800 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">Patent</div>}
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow bg-white z-10">
          <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-3 line-clamp-2 leading-snug">{prod.title[lang] || prod.title.en || prod.title.he}</h3>
          <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">{prod.shortDesc[lang] || prod.shortDesc.en || prod.shortDesc.he}</p>
          <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
            {prod.specs && Object.keys(prod.specs)[0] && (
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">{_(`specs.${Object.keys(prod.specs)[0]}`)}</span>
            )}
            <span className={`font-bold text-sm flex items-center gap-1 transition-all ${isRtl ? 'flex-row-reverse' : ''} text-blue-700 group-hover:text-red-800 group-hover:gap-2 bg-blue-50/50 group-hover:bg-red-50 px-3 py-1.5 rounded-lg`}>
              {_('product.back').split(' ')[0]} {isRtl ? <ArrowLeft className="w-4 h-4"/> : <ArrowRight className="w-4 h-4"/>}
            </span>
          </div>
        </div>
      </button>
    );
  };

  // --- LANGUAGE SELECTOR COMPONENT ---
  const LanguageSelector = ({ isMobile = false }) => (
    <div className={`relative ${isMobile ? 'w-full mt-4' : ''}`} ref={isMobile ? null : langDropdownRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsLangDropdownOpen(!isLangDropdownOpen); }} 
        className={`flex items-center justify-between w-full gap-2 text-slate-700 font-bold bg-white/70 backdrop-blur-md border border-slate-200/80 px-4 py-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-haspopup="true" aria-expanded={isLangDropdownOpen}
      >
        <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-600" /> <span className="uppercase text-sm tracking-wider">{lang}</span></div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`}/>
      </button>
      
      {isLangDropdownOpen && (
        <div className={`${isMobile ? 'static mt-2 w-full shadow-inner bg-slate-50' : 'absolute top-full right-0 mt-2 w-44 bg-white/95 backdrop-blur-2xl shadow-2xl z-50'} border border-slate-100 rounded-2xl overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 origin-top`}>
          {['he','en','ru','ar'].map(l => (
            <button key={l} onClick={() => { setLang(l); setIsLangDropdownOpen(false); if(isMobile) setIsMobileMenuOpen(false); }} className={`block w-full text-start px-5 py-4 hover:bg-blue-50/80 text-sm font-bold uppercase transition-colors ${lang===l ? 'bg-blue-50 text-blue-700 border-s-4 border-blue-600' : 'text-slate-600 border-s-4 border-transparent'}`}>{l}</button>
          ))}
        </div>
      )}
    </div>
  );

  // --- PAGES ---

  const HomePage = () => (
    <div className="animate-fade-in">
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 xl:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="home-main-image.png" alt="" className="w-full h-full object-cover object-center opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-50 text-xs md:text-sm font-bold mb-8 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400"/> ISO 13485:2016 Certified Manufacturer
            </div>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.15] mb-6 drop-shadow-2xl" dangerouslySetInnerHTML={{__html: _('hero.title')}} />
            <p className="text-lg md:text-xl text-blue-50/90 mb-10 leading-relaxed font-light max-w-2xl drop-shadow-md">{_('hero.sub')}</p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button onClick={() => nav('b2b')} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center justify-center gap-3 group focus:outline-none focus:ring-4 focus:ring-white/50">
                <Microscope className="w-5 h-5 text-red-800 group-hover:scale-110 transition-transform" /> {_('hero.btnB2b')}
              </button>
              <button onClick={() => nav('b2c')} className="bg-slate-800/40 backdrop-blur-md border border-slate-500/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center gap-3 group focus:outline-none focus:ring-4 focus:ring-slate-500/50">
                <Activity className="w-5 h-5 text-blue-300 group-hover:scale-110 transition-transform" /> {_('hero.btnB2c')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/90 backdrop-blur-lg border-b border-slate-200/60 py-10 shadow-sm relative z-20 -mt-8 mx-4 md:mx-10 rounded-[2rem]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-around gap-6 items-center text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2"><img src="Patent cover.jpeg" alt="Patent" className="w-6 h-6 object-cover rounded-md grayscale opacity-70"/> {_('trust.pat')}</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-slate-300"/> {_('trust.iso1')}</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-slate-300"/> {_('trust.iso2')}</div>
            <div className="flex items-center gap-2"><Award className="w-6 h-6 text-blue-500/80"/> {_('trust.ce')}</div>
            <div className="flex items-center gap-2"><Award className="w-6 h-6 text-blue-500/80"/> {_('trust.moh')}</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-200/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{_('home.innovation')}</h2>
             <div className="w-24 h-1.5 bg-red-800 mx-auto rounded-full"></div>
           </div>
           
           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <button onClick={()=>nav('product', productsDatabase.find(p=>p.id==='strep-a-pen'))} className="text-start group bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white relative overflow-hidden flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/30">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-red-800 to-red-600 text-white text-xs font-bold px-6 py-2.5 rounded-bl-3xl uppercase tracking-widest z-10 shadow-lg">{_('home.strepBadge')}</div>
                <div className="flex flex-col md:flex-row gap-8 items-center flex-grow">
                  <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] h-full flex items-center justify-center border border-slate-100/50 shadow-inner">
                    <img src="DSC_2091.JPG" alt="Strep A" className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <img src="LabOnTime LOGO.jpg" alt="LabOnTime" className="h-6 mb-5 opacity-70" onError={(e)=>{e.target.style.display='none'}} />
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">{_('home.strepTitle')}</h3>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">{_('home.strepDesc')}</p>
                    <div className="flex gap-4">
                       <div className="bg-blue-50/60 px-4 py-3 rounded-2xl border border-blue-100/60 flex-1 text-center"><span className="block text-2xl font-black text-blue-900">100%</span><span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">{_('home.strepSpec')}</span></div>
                       <div className="bg-red-50/60 px-4 py-3 rounded-2xl border border-red-100/60 flex-1 text-center"><span className="block text-2xl font-black text-red-900">0</span><span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">{_('home.strepTrans')}</span></div>
                    </div>
                  </div>
                </div>
              </button>

              <button onClick={()=>nav('product', productsDatabase.find(p=>p.id==='fob-b2b'))} className="text-start group bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white relative overflow-hidden flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/30">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-cyan-500 text-white text-xs font-bold px-6 py-2.5 rounded-bl-3xl uppercase tracking-widest z-10 shadow-lg">{_('home.fitBadge')}</div>
                <div className="flex flex-col md:flex-row gap-8 items-center flex-grow">
                  <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] h-full flex items-center justify-center border border-slate-100/50 shadow-inner">
                    <img src="DSC_2078.JPG" alt="FIT/FOB" className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight mt-4 md:mt-0">{_('home.fitTitle')}</h3>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">{_('home.fitDesc')}</p>
                    <div className="flex gap-4">
                       <div className="bg-blue-50/60 px-4 py-3 rounded-2xl border border-blue-100/60 flex-1 text-center"><span className="block text-2xl font-black text-blue-900">99.1%</span><span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">{_('home.fitAcc')}</span></div>
                       <div className="bg-emerald-50/60 px-4 py-3 rounded-2xl border border-emerald-100/60 flex-1 text-center"><span className="block text-2xl font-black text-emerald-700">AI</span><span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">{_('home.fitAi')}</span></div>
                    </div>
                  </div>
                </div>
              </button>
           </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-center md:text-start">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm md:mx-0 mx-auto">
                  <Factory className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{_('home.quality')}</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-light">{_('home.qualityDesc')}</p>
              </div>
              <div className="text-center md:text-start border-t md:border-t-0 md:border-s border-slate-200 pt-16 md:pt-0 md:ps-16 rtl:md:ps-0 rtl:md:pe-16 rtl:border-s-0 rtl:md:border-r">
                <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm md:mx-0 mx-auto">
                  <Briefcase className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{_('home.oem')}</h2>
                <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">{_('home.oemDesc')}</p>
                <button onClick={() => setIsRfqOpen(true)} className="text-blue-700 font-bold hover:text-blue-900 flex items-center gap-2 mx-auto md:mx-0 bg-blue-50 px-6 py-3 rounded-xl transition-colors hover:bg-blue-100">
                  {_('nav.quote')} <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`}/>
                </button>
              </div>
            </div>
         </div>
      </section>
    </div>
  );

  const CatalogPage = ({ category }) => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    
    const allProducts = productsDatabase.filter(p => p.category === category);
    const subCats = ['All', ...new Set(allProducts.map(p => p.subCat))];
    
    const filteredProducts = allProducts.filter(p => {
      const matchCat = filter === 'All' || p.subCat === filter;
      const term = searchTerm.toLowerCase();
      const titleHe = p.title.he?.toLowerCase() || '';
      const titleEn = p.title.en?.toLowerCase() || '';
      const titleRu = p.title.ru?.toLowerCase() || '';
      const titleAr = p.title.ar?.toLowerCase() || '';
      const matchSearch = titleHe.includes(term) || titleEn.includes(term) || titleRu.includes(term) || titleAr.includes(term) || p.id.includes(term);
      return matchCat && matchSearch;
    });

    return (
      <div className="animate-fade-in py-16 lg:py-24 bg-slate-50 min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{category === 'b2b' ? _('nav.b2b') : _('nav.b2c')}</h1>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-light">
              {category === 'b2b' ? _('catalog.b2bDesc') : _('catalog.b2cDesc')}
            </p>
          </div>

          <div className="mb-12 max-w-5xl mx-auto">
            <div className="relative mb-8 shadow-sm group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder={_('catalog.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-16 pr-6 py-5 border border-slate-200 rounded-2xl leading-5 bg-white/80 backdrop-blur-md placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg shadow-sm"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {subCats.map(sc => (
                <button 
                  key={sc} onClick={() => setFilter(sc)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${filter === sc ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  {sc === 'All' ? _('catalog.filterAll') : _(`catalog.cat${sc}`)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {filteredProducts.map(prod => <ProductCard key={prod.id} prod={prod} />)}
          </div>

          {filteredProducts.length === 0 && (
             <div className="text-center py-32 text-slate-400 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-slate-200/50 shadow-sm mt-8">
                <Search className="w-20 h-20 mx-auto mb-6 opacity-20"/>
                <p className="text-2xl font-medium">No products match your search.</p>
             </div>
          )}

          {category === 'b2b' && filteredProducts.length > 0 && (
            <div className="text-center bg-gradient-to-br from-blue-900 to-slate-900 text-white rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('home-main-image.png')] opacity-10 mix-blend-screen object-cover"></div>
              <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay"></div>
              <h3 className="relative z-10 text-2xl md:text-3xl font-extrabold mb-8 tracking-tight">{_('catalog.viewAllText')}</h3>
              <button onClick={() => setIsRfqOpen(true)} className="relative z-10 bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-100 transition shadow-xl text-lg hover:-translate-y-1">
                {_('nav.quote')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProductPage = () => {
    if (!selectedProduct) return null;
    const p = selectedProduct;
    const isPlaceholder = p.image.startsWith('Placeholder');
    const Icon = isPlaceholder ? (CategoryIcons[p.image] || Microscope) : Microscope;

    return (
      <div className="animate-fade-in bg-white pb-24">
        <div className="bg-slate-50 border-b border-slate-200/60 py-4 shadow-sm relative z-20">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 text-sm font-medium text-slate-500">
            <button onClick={() => nav(p.category)} className="hover:text-blue-700 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm"><ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`}/> {_('product.back')}</button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold bg-slate-200/50 px-4 py-2 rounded-xl">{p.title[lang] || p.title.en || p.title.he}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-[3rem] p-10 mb-6 border border-slate-200/60 flex items-center justify-center min-h-[400px] shadow-xl relative overflow-hidden group">
                {isPlaceholder ? (
                   <div className="text-center opacity-30 group-hover:scale-110 transition duration-700"><Icon className="w-32 h-32 mx-auto text-blue-900 mb-6" strokeWidth={1.5}/><div className="font-extrabold tracking-widest uppercase text-xl text-blue-900">BMT Diagnostics</div></div>
                ) : (
                   <img src={p.image} className="max-h-[350px] object-contain drop-shadow-2xl mix-blend-multiply group-hover:scale-105 transition duration-700 ease-out" alt="Product Main" />
                )}
              </div>
              {p.img2 && !isPlaceholder && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-100 h-40 flex items-center justify-center shadow-md hover:shadow-xl transition duration-300"><img src={p.img2} className="max-h-full mix-blend-multiply object-contain hover:scale-105 transition duration-500" alt="Angle 2"/></div>
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-100 h-40 flex items-center justify-center shadow-md hover:shadow-xl transition duration-300"><img src={p.image} className="max-h-full mix-blend-multiply object-contain hover:scale-105 transition duration-500" alt="Angle 1"/></div>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              {p.id.includes('strep-a-pen') && <img src="LabOnTime LOGO.jpg" className="h-8 mb-8 object-contain object-left opacity-80" alt="LabOnTime" onError={(e)=>{e.target.style.display='none'}}/>}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-6 shadow-sm border border-blue-100">
                 {_(`catalog.cat${p.subCat}`)}
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{p.title[lang] || p.title.en || p.title.he}</h1>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light">{p.shortDesc[lang] || p.shortDesc.en || p.shortDesc.he}</p>
              
              {p.specs && (
                <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2rem] p-8 md:p-10 mb-12">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2"><FileText className="w-4 h-4"/> {_('product.specs')}</h4>
                  <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                    {Object.entries(p.specs).map(([key, value]) => {
                      const specValue = typeof value === 'object' ? (value[lang] || value.en || value.he) : value;
                      return (
                        <div key={key}>
                          <div className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-2">{specValue}</div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{_(`specs.${key}`)}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <button onClick={() => setIsRfqOpen(true)} className="bg-red-800 text-white px-8 py-5 rounded-2xl font-extrabold hover:bg-red-900 transition-all duration-300 shadow-xl hover:shadow-red-900/30 text-center flex items-center justify-center gap-3 text-lg group focus:outline-none focus:ring-4 focus:ring-red-800/30">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform"/> {_('product.contact')}
              </button>

              {p.videoFile && (
                <div className="mt-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group relative">
                  <div className="absolute top-0 left-0 right-0 bg-slate-800/80 backdrop-blur-md text-white px-8 py-5 text-sm font-bold flex items-center gap-3 border-b border-white/10 tracking-wider z-10">
                     <PlayCircle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform"/> {_('product.video')}
                  </div>
                  <video controls className="w-full h-auto aspect-video object-cover pt-16" poster={!isPlaceholder ? p.image : undefined}>
                     <source src={p.videoFile} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>

        {p.comparison && (
          <div className="bg-slate-900 py-24 text-white mt-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-800/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
            <div className="max-w-5xl mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                   <FileBadge className="w-10 h-10 text-blue-400"/>
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">{_('product.comparison')}</h2>
                <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">{_('product.compSub')}</p>
              </div>
              <div className="bg-white/5 rounded-[3rem] border border-white/10 p-4 md:p-12 backdrop-blur-xl overflow-x-auto shadow-2xl">
                <table className="w-full text-start border-collapse min-w-[700px]">
                  <thead>
                    <tr>
                      <th className="p-6 text-slate-400 font-bold tracking-widest uppercase text-xs md:text-sm border-b border-white/10 w-1/3">{_('product.metric')}</th>
                      <th className="p-6 font-black text-2xl md:text-3xl text-white bg-blue-600/20 rounded-t-3xl border-b border-blue-500/30 text-center shadow-inner tracking-tight w-1/3">{_('product.us')}</th>
                      <th className="p-6 text-slate-400 font-bold tracking-widest uppercase text-xs md:text-sm border-b border-white/10 text-center w-1/3">{_('product.them')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-6 md:p-10 font-bold text-slate-200 border-b border-white/5 flex items-center gap-5 text-xl"><Users className="w-8 h-8 text-slate-500"/> {_('product.handsOn')}</td>
                      <td className="p-6 md:p-10 font-black text-5xl text-emerald-400 bg-blue-600/20 border-b border-blue-500/20 text-center shadow-inner">{p.comparison.us.steps}</td>
                      <td className="p-6 md:p-10 text-slate-400 border-b border-white/5 text-center text-3xl font-bold">{p.comparison.them.steps}</td>
                    </tr>
                    <tr>
                      <td className="p-6 md:p-10 font-bold text-slate-200 border-b border-white/5 flex items-center gap-5 text-xl"><Activity className="w-8 h-8 text-slate-500"/> {_('product.time')}</td>
                      <td className="p-6 md:p-10 font-bold text-3xl text-emerald-400 bg-blue-600/20 border-b border-blue-500/20 text-center shadow-inner">{p.comparison.us.time}</td>
                      <td className="p-6 md:p-10 text-slate-400 border-b border-white/5 text-center text-3xl font-bold">{p.comparison.them.time}</td>
                    </tr>
                    <tr>
                      <td className="p-6 md:p-10 font-bold text-slate-200 flex items-center gap-5 text-xl"><Beaker className="w-8 h-8 text-slate-500"/> {_('product.risk')}</td>
                      <td className="p-6 md:p-10 font-bold text-emerald-400 bg-blue-600/20 rounded-b-3xl text-center shadow-inner text-2xl">{_('product.zeroTransfers')}</td>
                      <td className="p-6 md:p-10 text-red-400 text-center font-bold text-2xl">{_('product.fourTransfers')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TechPage = () => (
    <div className="animate-fade-in bg-slate-50 py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
         <div className="text-center mb-24">
           <div className="bg-white inline-block p-5 rounded-[2rem] shadow-sm border border-slate-100 mb-10">
              <img src="LabOnTime LOGO.jpg" alt="LabOnTime" className="h-12 md:h-16 mx-auto object-contain" onError={(e)=>{e.target.style.display='none'}}/>
           </div>
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">{_('tech.title')}</h1>
           <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">{_('tech.desc')}</p>
         </div>

         <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-32">
           <div className="w-full lg:w-1/2 relative">
             <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 opacity-5 blur-xl pointer-events-none"></div>
             <div className="absolute inset-0 bg-red-800 rounded-[3rem] -rotate-3 opacity-5 blur-xl pointer-events-none"></div>
             <img src="LabOnTime Device.jpg" alt="Patent Device" className="w-full rounded-[3rem] shadow-2xl border border-white object-cover relative z-10 bg-white" />
           </div>
           <div className="w-full lg:w-1/2 space-y-12">
             <div className="flex gap-6 md:gap-8 group">
               <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white shadow-lg border border-slate-100 flex items-center justify-center text-blue-900 font-black text-2xl md:text-3xl flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">1</div>
               <div>
                 <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">{_('tech.s1Title')}</h3>
                 <p className="text-slate-600 leading-relaxed text-lg">{_('tech.s1Desc')}</p>
               </div>
             </div>
             <div className="flex gap-6 md:gap-8 group">
               <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white shadow-lg border border-slate-100 flex items-center justify-center text-blue-900 font-black text-2xl md:text-3xl flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">2</div>
               <div>
                 <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">{_('tech.s2Title')}</h3>
                 <p className="text-slate-600 leading-relaxed text-lg">{_('tech.s2Desc')}</p>
               </div>
             </div>
             <div className="flex gap-6 md:gap-8 group">
               <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white shadow-lg border border-slate-100 flex items-center justify-center text-emerald-600 font-black text-2xl md:text-3xl flex-shrink-0 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300">3</div>
               <div>
                 <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">{_('tech.s3Title')}</h3>
                 <p className="text-slate-600 leading-relaxed text-lg">{_('tech.s3Desc')}</p>
               </div>
             </div>
           </div>
         </div>

        <div className="bg-slate-900 rounded-[4rem] p-10 md:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 rtl:left-0 ltr:right-0 transform -translate-y-1/2 opacity-5 pointer-events-none">
             <Smartphone className="w-[800px] h-[800px]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent opacity-50 mix-blend-overlay pointer-events-none"></div>
          
          <div className="max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest mb-8 shadow-lg">
               <Globe className="w-4 h-4"/> {_('tech.ecoBadge')}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">{_('tech.ecoTitle')}</h2>
            <p className="text-blue-100 text-xl md:text-2xl mb-12 leading-relaxed font-light">{_('tech.ecoDesc')}</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex items-center gap-5 hover:bg-white/10 transition-colors duration-300 shadow-inner">
                  <ShieldCheck className="text-emerald-400 w-10 h-10 flex-shrink-0"/> 
                  <span className="text-xl font-bold">{_('tech.eco1')}</span>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex items-center gap-5 hover:bg-white/10 transition-colors duration-300 shadow-inner">
                  <Microscope className="text-blue-400 w-10 h-10 flex-shrink-0"/> 
                  <span className="text-xl font-bold">{_('tech.eco2')}</span>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex items-center gap-5 hover:bg-white/10 transition-colors duration-300 shadow-inner sm:col-span-2 md:col-span-1">
                  <Activity className="text-purple-400 w-10 h-10 flex-shrink-0"/> 
                  <span className="text-xl font-bold">{_('tech.eco3')}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ClinicalPage = () => (
    <div className="animate-fade-in py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-sm border border-blue-100">
             <FileText className="w-12 h-12"/>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">{_('clinical.title')}</h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">{_('clinical.desc')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="bg-slate-50 rounded-[3rem] p-10 md:p-14 shadow-inner border border-slate-100 flex flex-col group hover:bg-slate-100/50 transition-colors duration-500">
             <div className="inline-block bg-red-800/10 text-red-800 text-xs md:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8 w-fit">{_('clinical.c1Tag')}</div>
             <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">{_('clinical.c1Title')}</h3>
             <p className="text-slate-600 mb-12 italic flex-grow text-xl md:text-2xl leading-relaxed border-l-4 border-red-800/30 rtl:border-r-4 rtl:border-l-0 pl-8 rtl:pr-8 rtl:pl-0 font-serif">
                {_('clinical.c1Quote')}
             </p>
             
             <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-sm border border-slate-100 group-hover:border-red-100 transition-colors">
                  <div className="text-5xl md:text-6xl font-black text-emerald-600 mb-4 drop-shadow-sm">100%</div>
                  <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{_('clinical.c1Spec')}</div>
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-sm border border-slate-100 group-hover:border-red-100 transition-colors">
                  <div className="text-5xl md:text-6xl font-black text-blue-600 mb-4 drop-shadow-sm">96.9%</div>
                  <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{_('clinical.c1Sens')}</div>
                  <div className="text-[11px] text-blue-400 mt-2 font-medium">{_('clinical.c1Exc')}</div>
                </div>
             </div>
             <button className="bg-white border-2 border-slate-200 text-slate-800 font-bold px-8 py-5 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center gap-3 mt-auto w-full md:w-auto shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-slate-900/30">
                <Download className="w-6 h-6"/> {_('clinical.c1Btn')}
             </button>
          </div>

          <div className="bg-slate-50 rounded-[3rem] p-10 md:p-14 shadow-inner border border-slate-100 flex flex-col group hover:bg-slate-100/50 transition-colors duration-500">
             <div className="inline-block bg-blue-800/10 text-blue-800 text-xs md:text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8 w-fit">{_('clinical.c2Tag')}</div>
             <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">{_('clinical.c2Title')}</h3>
             <p className="text-slate-600 mb-12 italic flex-grow text-xl md:text-2xl leading-relaxed border-l-4 border-blue-800/30 rtl:border-r-4 rtl:border-l-0 pl-8 rtl:pr-8 rtl:pl-0 font-serif">
                {_('clinical.c2Quote')}
             </p>
             
             <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-sm border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <div className="text-5xl md:text-6xl font-black text-emerald-600 mb-4 drop-shadow-sm">100%</div>
                  <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{_('clinical.c2Spec')}</div>
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-sm border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <div className="text-5xl md:text-6xl font-black text-blue-600 mb-4 drop-shadow-sm">75.7%</div>
                  <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{_('clinical.c2Sens')}</div>
                </div>
             </div>
             <button className="bg-white border-2 border-slate-200 text-slate-800 font-bold px-8 py-5 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center gap-3 mt-auto w-full md:w-auto shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-slate-900/30">
                <Globe className="w-6 h-6"/> {_('clinical.c2Btn')}
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="animate-fade-in bg-white pb-32">
      <div className="bg-slate-900 text-white py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-blue-900/30 mix-blend-overlay"></div>
        <img src="home-main-image.png" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"/>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight drop-shadow-2xl tracking-tight">{_('about.title')}</h1>
          <p className="text-xl md:text-3xl text-blue-50 font-light leading-relaxed drop-shadow-md">{_('about.sub')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-[-80px] relative z-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-32">
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-500 group">
             <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-red-800 shadow-inner group-hover:scale-110 transition-transform">
                <Factory className="w-12 h-12"/>
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{_('about.c1Title')}</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{_('about.c1Desc')}</p>
          </div>
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-500 group">
             <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                <TestTube className="w-12 h-12"/>
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{_('about.c2Title')}</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{_('about.c2Desc')}</p>
          </div>
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-500 group">
             <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                <Briefcase className="w-12 h-12"/>
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{_('about.c3Title')}</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{_('about.c3Desc')}</p>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-[4rem] p-12 md:p-24 border border-slate-200 relative overflow-hidden shadow-inner">
           <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
           
           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-20 text-center relative z-10 tracking-tight">{_('about.team')}</h2>
           <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative z-10">
             <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition duration-500">
               <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Nili Tamir</h4>
               <p className="text-red-800 font-bold mb-10 text-sm md:text-base uppercase tracking-widest bg-red-50 inline-block px-5 py-2 rounded-full">{_('about.roleCeo')}</p>
               <ul className="space-y-6 text-slate-600 font-medium text-lg">
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"/> {_('about.n1')}</li>
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"/> {_('about.n2')}</li>
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"/> {_('about.n3')}</li>
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"/> {_('about.n4')}</li>
               </ul>
             </div>
             <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-slate-100 hover:shadow-2xl transition duration-500">
               <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Idan Tamir, PhD</h4>
               <p className="text-blue-800 font-bold mb-10 text-sm md:text-base uppercase tracking-widest bg-blue-50 inline-block px-5 py-2 rounded-full">{_('about.roleCto')}</p>
               <ul className="space-y-6 text-slate-600 font-medium text-lg">
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"/> {_('about.i1')}</li>
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"/> {_('about.i2')}</li>
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"/> {_('about.i3')}</li>
                 <li className="flex items-start gap-4"><CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"/> {_('about.i4')}</li>
               </ul>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  // --- RFQ MODAL ---
  
  const RfqModal = () => {
    if (!isRfqOpen) return null;
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
      const handleEscape = (e) => { if(e.key === 'Escape') setIsRfqOpen(false); };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const submit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => { 
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => { setSuccess(false); setIsRfqOpen(false); }, 4000);
      }, 1000);
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={()=>setIsRfqOpen(false)} aria-hidden="true"></div>
        <div className="bg-white rounded-[3rem] w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 m-auto mt-10 md:mt-auto border border-slate-100">
           <div className="bg-slate-900 p-8 md:p-10 flex justify-between items-center text-white border-b-[6px] border-red-800">
             <h3 id="modal-title" className="text-2xl md:text-3xl font-extrabold tracking-tight">{_('rfq.title')}</h3>
             <button onClick={()=>setIsRfqOpen(false)} className="hover:bg-white/20 p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white bg-white/5" aria-label="Close modal"><X className="w-6 h-6"/></button>
           </div>
           <div className="p-8 md:p-14 bg-slate-50">
             {success ? (
               <div className="text-center py-16 animate-fade-in">
                 <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><CheckCircle className="w-16 h-16"/></div>
                 <h4 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{_('rfq.successTitle')}</h4>
                 <p className="text-slate-600 text-xl font-light">{_('rfq.successDesc')}</p>
               </div>
             ) : (
               <form onSubmit={submit} className="space-y-8">
                 <input type="hidden" name="_to" value="info@bmtdx.com, roey@bmtdx.com" />
                 
                 <div className="grid md:grid-cols-2 gap-8">
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.name')}</label>
                     <input required type="text" name="name" className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition shadow-sm text-lg"/>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.role')}</label>
                     <select required name="role" className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition shadow-sm text-lg appearance-none cursor-pointer">
                       <option value="">{_('rfq.rolePh')}</option>
                       <option>{_('rfq.r1')}</option><option>{_('rfq.r2')}</option><option>{_('rfq.r3')}</option><option>{_('rfq.r4')}</option><option>{_('rfq.r5')}</option>
                     </select>
                   </div>
                   <div className="md:col-span-2">
                     <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.clinic')}</label>
                     <input required type="text" name="clinic" className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition shadow-sm text-lg"/>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.email')}</label>
                     <input required type="email" name="email" dir="ltr" className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none text-start transition shadow-sm text-lg"/>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.phone')}</label>
                     <input required type="tel" name="phone" dir="ltr" className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none text-start transition shadow-sm text-lg"/>
                   </div>
                 </div>
                 <div className="pt-10 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-5 mt-10">
                   <button type="button" onClick={()=>setIsRfqOpen(false)} className="px-8 py-5 font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-100 hover:text-slate-900 rounded-2xl transition w-full sm:w-auto text-center text-lg focus:outline-none focus:ring-4 focus:ring-slate-200">{_('rfq.cancel')}</button>
                   <button type="submit" disabled={isSubmitting} className="bg-red-800 text-white px-10 py-5 rounded-2xl font-extrabold hover:bg-red-900 transition-all duration-300 shadow-xl hover:shadow-red-900/30 disabled:opacity-50 w-full sm:w-auto text-center flex items-center justify-center text-lg focus:outline-none focus:ring-4 focus:ring-red-800/50">
                     {isSubmitting ? <span className="animate-pulse tracking-widest">...</span> : _('rfq.submit')}
                   </button>
                 </div>
               </form>
             )}
           </div>
        </div>
      </div>
    )
  };

  // --- TOP NAVBAR ---

  const Navbar = () => (
    <nav className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28">
          
          <button onClick={() => nav('home')} className="flex items-center gap-4 md:gap-6 focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-2xl p-2 group" aria-label="Go to Home">
            <img src="BMT Logo.jpg" alt="BMT Diagnostics Logo" className="h-10 md:h-14 object-contain group-hover:opacity-80 transition" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
            <div style={{display:'none'}} className="text-3xl font-black text-slate-900 tracking-tight">BMT</div>
            
            <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
            
            <img src="LabOnTime LOGO.jpg" alt="LabOnTime Logo" className="h-6 md:h-10 object-contain hidden sm:block group-hover:opacity-80 transition" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
            <div style={{display:'none'}} className="hidden sm:block text-2xl font-bold text-red-800 tracking-tight">LabOnTime</div>
          </button>

          <div className="hidden xl:flex items-center space-x-8 rtl:space-x-reverse">
            <button onClick={() => nav('about')} className={`text-base font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 ${page==='about' ? 'text-red-800' : 'text-slate-600 hover:text-blue-600'}`}>{_('nav.about')}</button>
            <button onClick={() => nav('b2b')} className={`text-base font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 ${page==='b2b' ? 'text-red-800' : 'text-slate-600 hover:text-blue-600'}`}>{_('nav.b2b')}</button>
            <button onClick={() => nav('b2c')} className={`text-base font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 ${page==='b2c' ? 'text-red-800' : 'text-slate-600 hover:text-blue-600'}`}>{_('nav.b2c')}</button>
            <button onClick={() => nav('tech')} className={`text-base font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 ${page==='tech' ? 'text-red-800' : 'text-slate-600 hover:text-blue-600'}`}>{_('nav.tech')}</button>
            <button onClick={() => nav('clinical')} className={`text-base font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 ${page==='clinical' ? 'text-red-800' : 'text-slate-600 hover:text-blue-600'}`}>{_('nav.clinical')}</button>
          </div>

          <div className="hidden xl:flex items-center gap-6">
            <LanguageSelector />
            <button onClick={() => setIsRfqOpen(true)} className="bg-red-800 text-white px-8 py-3.5 rounded-full font-bold hover:bg-red-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-800/30 text-[15px]">
              {_('nav.quote')}
            </button>
          </div>

          <div className="xl:hidden flex items-center gap-4" ref={mobileMenuRef}>
             <LanguageSelector isMobile={true} />
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-800 p-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
               {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
             </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 shadow-2xl absolute w-full left-0 z-40 animate-in slide-in-from-top-2">
          <div className="flex flex-col p-6 space-y-3 text-xl font-bold text-slate-800 max-h-[80vh] overflow-y-auto">
            {['home', 'about', 'b2b', 'b2c', 'tech', 'clinical'].map((item) => (
              <button key={item} onClick={() => nav(item)} className={`text-start px-6 py-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${page===item ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}>
                {_(`nav.${item}`)}
              </button>
            ))}
            <button onClick={() => {setIsMobileMenuOpen(false); setIsRfqOpen(true);}} className="bg-red-800 text-white text-center py-5 rounded-2xl mt-6 shadow-md text-lg focus:outline-none focus:ring-4 focus:ring-red-800/30">
              {_('nav.quote')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-24 border-t-[8px] border-red-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="md:col-span-5">
            <div className="bg-white inline-block p-6 rounded-3xl mb-10 shadow-xl">
              <img src="BMT Logo.jpg" alt="BMT" className="h-10 md:h-14 object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
              <div style={{display:'none'}} className="text-4xl font-black text-slate-900">BMT</div>
            </div>
            <p className="text-lg leading-relaxed max-w-md font-medium text-slate-400">{_('footer.desc')}</p>
          </div>
          <div className="md:col-span-3">
             <h4 className="text-white font-black mb-8 text-lg tracking-widest uppercase">{_('footer.linksTitle')}</h4>
             <ul className="space-y-5 font-medium text-lg">
               <li><button onClick={()=>nav('b2b')} className="hover:text-blue-400 transition-colors focus:outline-none focus:underline">{_('footer.l1')}</button></li>
               <li><button onClick={()=>nav('b2c')} className="hover:text-blue-400 transition-colors focus:outline-none focus:underline">{_('footer.l2')}</button></li>
               <li><button onClick={()=>nav('clinical')} className="hover:text-blue-400 transition-colors focus:outline-none focus:underline">{_('footer.l3')}</button></li>
             </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-white font-black mb-8 text-lg tracking-widest uppercase">{_('footer.contactTitle')}</h4>
            <ul className="space-y-6 font-medium text-lg">
              <li className="flex items-start gap-4"><MapPin className="w-6 h-6 text-red-600 flex-shrink-0"/> <span>{_('footer.address')}</span></li>
              <li className="flex items-center gap-4" dir="ltr"><Phone className="w-6 h-6 text-blue-500 flex-shrink-0"/> <span className="text-start">+972-4-6396116</span></li>
              <li className="flex items-center gap-4" dir="ltr"><Mail className="w-6 h-6 text-blue-500 flex-shrink-0"/> <span className="text-start">info@bmtdx.com</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-800 text-sm text-slate-500 font-medium flex flex-col lg:flex-row justify-between gap-8">
          <div className="max-w-4xl">
            <p className="mb-3 uppercase font-bold text-slate-400 tracking-widest text-xs">{_('footer.disclaimer')}</p>
            <p className="leading-relaxed">{_('footer.legal')}</p>
          </div>
          <p className="lg:text-right shrink-0">© {new Date().getFullYear()} BMT Diagnostics. {_('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch(page) {
      case 'home': return <HomePage />;
      case 'b2b': return <CatalogPage category="b2b" />;
      case 'b2c': return <CatalogPage category="b2c" />;
      case 'product': return <ProductPage />;
      case 'tech': return <TechPage />;
      case 'clinical': return <ClinicalPage />;
      case 'about': return <AboutPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans text-slate-800 ${isRtl ? 'font-hebrew' : ''} selection:bg-blue-500 selection:text-white flex flex-col`}>
      <Navbar />
      <main className="flex-grow focus:outline-none" tabIndex="-1">
        {renderPage()}
      </main>
      <Footer />
      <RfqModal />
    </div>
  );
}