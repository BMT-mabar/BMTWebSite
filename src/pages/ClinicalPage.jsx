import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function ClinicalPage() {
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';

  const title = _('clinical.title');
  const desc = _('clinical.desc');

  // Dr. Kids Articles collection with real screenshots from site
  const drKidsArticles = [
    {
      id: 1,
      tag: _('clinical.tagFlu'),
      title: {
        he: 'בדיקה מהירה לשפעת — ד״ר אפי',
        en: 'Rapid Flu Test — Dr. Effi',
        de: 'Grippe-Schnelltest — Dr. Effi',
        fr: 'Test Rapide Grippe — Dr. Effi',
        ru: 'Экспресс-тест на грипп — Д-р Эффи',
        ar: 'فحص الإنفلونزا السريع — د. إيفي'
      },
      desc: {
        he: 'מאמר והסבר קליני מפורט מאת ד״ר אפי על בדיקה מהירה לאבחון שפעת, זיהוי מוקדם ומניעת סיבוכים ברפואת ילדים ומשפחה.',
        en: 'Detailed clinical article by Dr. Effi on rapid influenza diagnostics, early detection, and complication prevention in family medicine.',
        de: 'Ausführlicher klinischer Fachartikel von Dr. Effi zur schnellen Grippediagnostik und Vermeidung von Komplikationen.',
        fr: 'Article clinique détaillé du Dr. Effi sur le diagnostic rapide de la grippe et la prévention pédiatrique.',
        ru: 'Клиническая статья д-ра Эффи о быстрой диагностике гриппа, раннем выявлении и профилактике осложнений.',
        ar: 'مقال سريري مفصل من د. إيفي حول الفحص السريع للإنفلونزا والكشف المبكر والوقاية من المضاعفات لدى الأطفال.'
      },
      link: 'https://drkids.co.il/laboratory/%d7%91%d7%93%d7%99%d7%a7%d7%94-%d7%9e%d7%94%d7%99%d7%a8%d7%94-%d7%9c%d7%a9%d7%a4%d7%a2%d7%aa/',
      img: '/dr_kids_flu_ss.png'
    },
    {
      id: 2,
      tag: _('clinical.tagStrep'),
      title: {
        he: 'איך עושים משטח גרון לילד או למבוגר? — ד״ר אפי',
        en: 'How to Perform a Throat Swab for Children & Adults — Dr. Effi',
        de: 'Rachenabstrich bei Kindern und Erwachsenen — Dr. Effi',
        fr: 'Comment réaliser un écouvillon pharyngé — Dr. Effi',
        ru: 'Как правильно брать мазок из зева — Д-р Эффи',
        ar: 'كيفية إجراء مسحة الحلق للأطفال والبالغين — د. إيفي'
      },
      desc: {
        he: 'מדריך מעשי מאת ד״ר אפי בשיתוף חברת BMT Diagnostics על ביצוע נכון, היגייני ונטול כאב של משטח גרון מהיר לילדים ולמבוגרים.',
        en: 'Practical guide by Dr. Effi in collaboration with BMT Diagnostics on pain-free, hygienic, and precise throat swab sampling.',
        de: 'Praktische Anleitung von Dr. Effi in Kooperation mit BMT Diagnostics zur schmerzfreien Durchführung von Rachenabstrichen.',
        fr: 'Guide pratique du Dr. Effi en partenariat avec BMT Diagnostics pour un prélèvement pharyngé précis et sans douleur.',
        ru: 'Практическое руководство д-ра Эффи совместно с BMT Diagnostics по безболезненному взятию мазка из зева.',
        ar: 'دليل عملي من د. إيفي بالتعاون مع BMT Diagnostics حول كيفية أخذ مسحة الحلق بشكل صحي وسلس للأطفال والبالغين.'
      },
      link: 'https://drkids.co.il/use/איך-עושים-משטח-גרון-לילד-או-למבוגר/',
      img: '/dr_kids_swab_ss.png'
    },
    {
      id: 3,
      tag: _('clinical.tagCovid'),
      title: {
        he: 'בדיקה מהירה לקורונה — ד״ר אפי',
        en: 'Rapid Covid-19 Test — Dr. Effi',
        de: 'Corona-Schnelltest — Dr. Effi',
        fr: 'Test Rapide Covid-19 — Dr. Effi',
        ru: 'Экспресс-тест на коронавирус — Д-р Эффи',
        ar: 'فحص كورونا السريع — د. إيفي'
      },
      desc: {
        he: 'הנחיות קליניות והדרכת הורים מפורטת מאת ד״ר אפי על אבחון מהיר, אמינות התוצאה והתנהלות נכונה במחלות נשימתיות.',
        en: 'Parental guidance and clinical instructions by Dr. Effi on rapid antigen COVID-19 testing and pediatric care.',
        de: 'Klinischer Leitfaden und Elternratgeber von Dr. Effi zur zuverlässigen Antigentestung bei Atemwegserkrankungen.',
        fr: 'Conseils cliniques pour les parents par le Dr. Effi sur les tests antigéniques rapides et la fiabilité des résultats.',
        ru: 'Клинические рекомендации для родителей от д-ра Эффи по экспресс-тестированию на антиген COVID-19.',
        ar: 'إرشادات سريرية وتوعية للأهالي من د. إيفي حول فحص كورونا السريع وموثوقية النتائج والتعامل مع الأعراض التنفسية.'
      },
      link: 'https://drkids.co.il/laboratory/%d7%91%d7%93%d7%99%d7%a7%d7%94-%d7%9e%d7%94%d7%99%d7%a8%d7%94-%d7%9c%d7%a7%d7%95%d7%a8%d7%95%d7%a0%d7%94/',
      img: '/dr_kids_covid_ss.png'
    }
  ];

  // Additional Medical Knowledge & Reference Articles with real website screenshots
  const strepArticles = [
    {
      source: isHe ? 'מרכז שניידר לרפואת ילדים' : (lang === 'ar' ? 'مركز شنايدر الطبي للأطفال' : 'Schneider Children\'s Medical Center'),
      title: {
        he: 'דלקות גרון וסטרפטוקוקוס בקרב ילדים',
        en: 'Throat Infections & Streptococcal Illness in Children',
        de: 'Racheninfektionen & Streptokokken bei Kindern',
        fr: 'Infections Pharyngées et Streptocoque chez l\'Enfant',
        ru: 'Инфекции горла и стрептококк у детей',
        ar: 'التهابات الحلق والمكورات العقدية لدى الأطفال'
      },
      desc: {
        he: 'מאמר מקצועי מבית החולים שניידר העוסק בזיהומי גרון, חיידק הסטרפטוקוקוס ודגשים מיוחדים ברפואת ילדים.',
        en: 'Professional medical article by Schneider Children\'s Center focusing on streptococcal throat infections.',
        de: 'Fachartikel des Schneider Children\'s Medical Center zu Streptokokken-Infektionen.',
        fr: 'Article médical spécialisé du Centre Médical Pédiatrique Schneider sur le streptocoque.',
        ru: 'Клиническая публикация детского медцентра Шнайдер о стрептококковых инфекциях у детей.',
        ar: 'مقال مهني من مستشفى شنايدر للأطفال يتناول التهابات الحلق وبكتيريا العقدية ورعاية الأطفال.'
      },
      link: 'https://www.schneider.org.il/?CategoryID=851&ArticleID=5435',
      img: '/schneider_ss.png'
    },
    {
      source: isHe ? 'קופת חולים כללית' : (lang === 'ar' ? 'خدمات صحة كلاليت' : 'Clalit Health Services'),
      title: {
        he: 'דלקת גרון מקיף - ויראלי או חיידקי?',
        en: 'Comprehensive Sore Throat Guide - Viral vs Bacterial',
        de: 'Umfassender Leitfaden zu Halsschmerzen - Viral oder Bakteriell?',
        fr: 'Guide Complet du Mal de Gorge - Viral ou Bactérien ?',
        ru: 'Руководство по боли в горле: вирусная или бактериальная?',
        ar: 'دليل شامل لالتهاب الحلق - فيروسي أم بكتيري؟'
      },
      desc: {
        he: 'המדריך המקיף של קופת חולים כללית המסביר על דלקות גרון וההבדל הקריטי בין זיהום נגיפי לחיידקי.',
        en: 'Comprehensive Clalit guide explaining throat inflammation and differentiating viral from bacterial infections.',
        de: 'Clalit-Gesundheitsleitfaden zur Unterscheidung viraler und bakterieller Halsinfektionen.',
        fr: 'Guide médical Clalit détaillant la distinction essentielle entre infections virales et bactériennes.',
        ru: 'Подробное руководство больничной кассы Клалит о различиях вирусных и бактериальных инфекций.',
        ar: 'الدليل الطبي الشامل لصندوق المرضى كلاليت حول التمييز الحاسم بين العدوى الفيروسية والبكتيرية.'
      },
      link: 'https://www.clalit.co.il/he/your_health/family/Pages/laryngitis.aspx',
      img: '/clalit_strep_ss.png'
    },
    {
      source: isHe ? 'קופת חולים מאוחדת' : (lang === 'ar' ? 'صندوق المرضى مئوحيدت' : 'Meuhedet Health Services'),
      title: {
        he: 'על וירוסים, סטרפטוקוקים וחיות אחרות',
        en: 'On Viruses, Streptococci, and Diagnostics',
        de: 'Über Viren, Streptokokken und Diagnostik',
        fr: 'Virus, Streptocoques et Diagnostic Différentiel',
        ru: 'О вирусах, стрептококках и правильной диагностике',
        ar: 'عن الفيروسات والمكورات العقدية والتشخيص الدقيق'
      },
      desc: {
        he: 'מדריך הבריאות של קופת חולים מאוחדת על הבחנה בין מחלות ויראליות לחיידקיות וזיהומי סטרפטוקוק.',
        en: 'Meuhedet health magazine guide on identifying streptococcal infections versus viral illness.',
        de: 'Gesundheitsratgeber der Krankenkasse Meuhedet zur Schnelldiagnostik von Streptokokken.',
        fr: 'Guide Meuhedet sur l\'identification rapide des infections à streptocoque.',
        ru: 'Клинические рекомендации больничной кассы Меухедет по диагностике стрептококка.',
        ar: 'دليل مئوحيدت الصحي للتمييز بين الأمراض الفيروسية والبكتيرية وتشخيص المكورات العقدية.'
      },
      link: 'https://www.meuhedet.co.il/%D7%94%D7%9E%D7%92%D7%96%D7%99%D7%9F/%D7%A2%D7%9C-%D7%95%D7%99%D7%A8%D7%95%D7%A1%D7%99%D7%9D-%D7%A1%D7%98%D7%A8%D7%A4%D7%98%D7%95%D7%A7%D7%95%D7%A7%D7%99%D7%9D-%D7%95%D7%97%D7%99%D7%95%D7%AA-%D7%90%D7%97%D7%A8%D7%95%D7%AA/',
      img: '/meuhedet_strep_ss.png'
    },
    {
      source: isHe ? 'קופת חולים לאומית' : (lang === 'ar' ? 'صندوق المرضى لئوميت' : 'Leumit Health Services'),
      title: {
        he: 'דלקת גרון סטרפטוקוקלית - Strep Throat',
        en: 'Streptococcal Pharyngitis - Strep Throat',
        de: 'Streptokokken-Pharyngitis - Strep Throat',
        fr: 'Pharyngite à Streptocoque - Strep Throat',
        ru: 'Стрептококковый фарингит (Strep Throat)',
        ar: 'التهاب البلعوم العقدي - Strep Throat'
      },
      desc: {
        he: 'מאמר קליני המסביר ספציפית על דלקת גרון הנגרמת מחיידק הסטרפטוקוקוס, התסמינים והטיפול המומלץ.',
        en: 'Clinical Leumit article covering symptoms, diagnosis, and treatment for Strep Throat.',
        de: 'Klinischer Artikel zu Symptomen, Schnelldiagnostik und Therapie bei Streptokokken.',
        fr: 'Article clinique sur les symptômes, le diagnostic rapide et la prise en charge du streptocoque.',
        ru: 'Клиническая статья о симптомах, диагностике и лечении стрептококкового фарингита.',
        ar: 'مقال سريري يشرح أعراض وتشخيص وعلاج التهاب الحلق الناتج عن بكتيريا العقدية.'
      },
      link: 'https://www.leumit.co.il/diseases/strep-throat/',
      img: '/leumit_strep_ss.png'
    },
    {
      source: isHe ? 'קופת חולים מכבי' : (lang === 'ar' ? 'خدمات صحة مكابي' : 'Maccabi Healthcare'),
      title: {
        he: 'זיהומי סטרפטוקוקוס',
        en: 'Streptococcal Infections Guide',
        de: 'Leitfaden zu Streptokokken-Infektionen',
        fr: 'Guide des Infections à Streptocoque',
        ru: 'Справочник по стрептококковым инфекциям',
        ar: 'دليل عدوى بكتيريا المكورات العقدية'
      },
      desc: {
        he: 'מדריך הבריאות של מכבי העוסק במשפחת חיידקי הסטרפטוקוקוס והשלכות זיהום מסוג זה.',
        en: 'Maccabi medical guide addressing streptococcal bacterial strains and infection outcomes.',
        de: 'Maccabi-Gesundheitsratgeber zu Streptokokkenstämmen und deren klinischer Bedeutung.',
        fr: 'Guide médical Maccabi sur les souches de streptocoques et leurs répercussions cliniques.',
        ru: 'Медицинское руководство больничной кассы Маккаби о штаммах стрептококка.',
        ar: 'دليل مكابي الصحي حول سلالات بكتيريا المكورات العقدية وتداعيات الإصابة بها.'
      },
      link: 'https://www.maccabi4u.co.il/healthguide/medicalconditions/streptococcalinfections/',
      img: '/maccabi_strep_ss.png'
    },
    {
      source: 'Infomed',
      title: {
        he: 'בדיקת משטח גרון',
        en: 'Throat Culture & Rapid Swab Test',
        de: 'Rachenabstrich & Schnelltest',
        fr: 'Prélèvement et Test Rapide de Gorge',
        ru: 'Мазок из зева и экспресс-диагностика',
        ar: 'فحص مسحة الحلق السريعة والمزرعة'
      },
      desc: {
        he: 'מאמר מפורט על אופן ביצוע בדיקת משטח הגרון (תרבית/בדיקה מהירה), מתי יש לבצע אותה וכיצד מפענחים את התוצאות.',
        en: 'Detailed medical article explaining throat swab techniques, cultures, rapid testing, and result interpretation.',
        de: 'Detaillierter Artikel zu Rachenabstrichen, Kulturverfahren und Auswertung von Schnelltests.',
        fr: 'Explications médicales détaillées sur la réalisation et l\'interprétation des tests pharyngés rapides.',
        ru: 'Подробная статья о методах взятия мазка, посевах и интерпретации результатов экспресс-тестов.',
        ar: 'مقال مفصل حول كيفية إجراء مسحة الحلق وتفسير النتائج السريرية.'
      },
      link: 'https://www.infomed.co.il/examinations/throat-culture/',
      img: '/infomed_strep_ss.png'
    },
    {
      source: 'Ynet',
      title: {
        he: 'כתבת בריאות: עליה בתחלואת סטרפטוקוק',
        en: 'Health Report: Streptococcal Infection Trends',
        de: 'Gesundheitsbericht: Zunahme von Streptokokken-Infektionen',
        fr: 'Rapport Santé : Hausse des Infections à Streptocoque',
        ru: 'Новости медицины: Рост заболеваемости стрептококком',
        ar: 'تقرير صحي: تزايد حالات الإصابة بعدوى بكتيريا العقدية'
      },
      desc: {
        he: 'כתבת בריאות ב-Ynet העוסקת בעלייה בתחלואת סטרפטוקוק, איתור מוקדם וסיבוכים אפשריים.',
        en: 'Ynet health reporting on streptococcal infection rises and early rapid diagnostic intervention.',
        de: 'Berichterstattung über den Anstieg von Streptokokken-Infektionen und die Rolle schneller Tests.',
        fr: 'Analyse sur la recrudescence des cas de streptocoque et l\'importance du dépistage précoce.',
        ru: 'Медицинский репортаж о росте стрептококковых инфекций и значении быстрой диагностики.',
        ar: 'تقرير صحي يتناول ازدياد حالات العدوى وأهمية الكشف السريع للوقاية من المضاعفات.'
      },
      link: 'https://www.ynet.co.il/health/article/bydbmrfeye',
      img: '/ynet_strep_ss.png'
    }
  ];

  const fobArticles = [
    {
      source: isHe ? 'האגודה למלחמה בסרטן' : (lang === 'ar' ? 'جمعية مكافحة السرطان' : 'Israel Cancer Association'),
      title: {
        he: 'גילוי מוקדם של סרטן המעי הגס',
        en: 'Early Detection of Colorectal Cancer',
        de: 'Früherkennung von Darmkrebs',
        fr: 'Dépistage Précoce du Cancer Colorectal',
        ru: 'Раннее выявление колоректального рака',
        ar: 'الكشف المبكر عن سرطان القولون'
      },
      desc: {
        he: 'מאמר רשמי של האגודה למלחמה בסרטן העוסק בחשיבותן העצומה של בדיקות הסקר (כמו דם סמוי בצואה) להצלת חיים ולמניעת סרטן המעי הגס.',
        en: 'Official Israel Cancer Association guidance on life-saving non-invasive FOB screening tests for early colorectal detection.',
        de: 'Offizielle Empfehlungen der Israel Cancer Association zur lebensrettenden Darmkrebsfrüherkennung mittels FOB-Tests.',
        fr: 'Recommandations officielles sur l\'importance vitale des tests de dépistage du sang occulte dans les selles.',
        ru: 'Официальные рекомендации Израильской онкологической ассоциации о важности скрининга на скрытую кровь (FOB).',
        ar: 'دليل رسمي صادر عن جمعية مكافحة السرطان يؤكد الأهمية القصوى لفحوصات الدم الخفي في البراز لإنقاذ الحياة.'
      },
      link: 'https://www.cancer.org.il/articles/5731/',
      img: '/cancer_fob_ss.png'
    }
  ];

  const hpyloriArticles = [
    {
      source: isHe ? 'קופת חולים מכבי' : (lang === 'ar' ? 'خدمات صحة مكابي' : 'Maccabi Healthcare Services'),
      title: {
        he: 'הליקובקטר פילורי: תסמינים, אבחון וטיפול',
        en: 'H. Pylori: Symptoms, Diagnostics & Treatment',
        de: 'H. Pylori: Symptome, Diagnostik & Therapie',
        fr: 'H. Pylori : Symptômes, Diagnostic et Traitement',
        ru: 'Хеликобактер пилори: симптомы, диагностика и терапия',
        ar: 'الملوية البوابية: الأعراض، التشخيص والعلاج'
      },
      desc: {
        he: 'המדריך השלם של קופת חולים מכבי על חיידק הקיבה הליקובקטר פילורי, הדרכים השונות לאבחון (כולל בדיקות מהירות) והטיפול האנטיביוטי.',
        en: 'Maccabi healthcare guide covering H. pylori stomach infection, rapid diagnostic testing, and therapy.',
        de: 'Vollständiger Leitfaden zu Helicobacter Pylori, Schnelldiagnostik und antibiotischer Therapie.',
        fr: 'Guide exhaustif sur la bactérie Helicobacter Pylori, les modalités de diagnostic rapide et la prise en charge.',
        ru: 'Полное руководство о бактерии хеликобактер пилори, методах экспресс-диагностики и лечении.',
        ar: 'الدليل الطبي الكامل حول جرثومة المعدة الملوية البوابية، وسائل التشخيص السريع والعلاج المناسب.'
      },
      link: 'https://www.maccabi4u.co.il/healthguide/medicalconditions/helicobacter_pylori/',
      img: '/maccabi_hpylori_ss.png'
    }
  ];

  return (
    <div className="animate-fade-in bg-white pb-24 min-h-screen">
      <Helmet>
        <title>{`${title} | BMT Diagnostics`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content={`${title} | BMT Diagnostics`} />
        <meta property="og:description" content={desc} />
        <meta name="keywords" content="Medical Articles, Strep A, Influenza A+B, Dr. Kids, Schneider, Clalit, Maccabi, Meuhedet, Leumit, FOB, H. Pylori" />
      </Helmet>

      {/* Majestic Widescreen Header Banner with Blue People Image ("האנשים בכחול") */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden text-white border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg, #0267B5 0%, #01417A 100%)' }}
      >
        {/* Blue Lab Team Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src={getAssetPath('home-main-image.png')} 
            alt="BMT Blue Healthcare Team" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0267B5]/80 via-[#01417A]/90 to-[#01417A]" />
        </div>

        <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[250px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none z-10" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-sky-400/20 rounded-full blur-[80px] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-md mb-6">
            <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-sky-200">
              {_('home.articlesBadge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">{title}</h1>
          <p className="text-lg md:text-xl text-slate-100 font-light leading-relaxed opacity-95 max-w-3xl mx-auto">
            {desc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-24">
        
        {/* --- SECTION 1: DR. KIDS EXCLUSIVE CLINICAL GUIDES --- */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
                <span>DR. KIDS • ד״ר אפי</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {isHe ? 'מדריכים ומאמרי הדרכה מאת ד״ר אפי' : 'Clinical Guides & Articles by Dr. Effi'}
              </h2>
            </div>
            <p className="text-slate-500 text-sm md:text-base font-light max-w-xl">
              {isHe 
                ? 'שיתוף פעולה מקצועי בין חברת BMT Diagnostics לד״ר אפי להנגשת הנחיות רפואיות ברורות ופשוטות להורים ולמטופלים.'
                : 'Educational collaboration with Dr. Effi providing clear clinical advice for parents and healthcare providers.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {drKidsArticles.map(article => {
              const artTitle = typeof article.title === 'object' ? (article.title[lang] || article.title.en || article.title.he) : article.title;
              const artDesc = typeof article.desc === 'object' ? (article.desc[lang] || article.desc.en || article.desc.he) : article.desc;
              return (
                <a 
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 card-3d-lift flex flex-col justify-between"
                >
                  <div className="h-56 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                    <img 
                      src={getAssetPath(article.img)} 
                      alt={artTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 rtl:right-4 rtl:left-auto bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {article.tag}
                    </span>
                  </div>

                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                        {artTitle}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6">
                        {artDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-burgundy transition-colors">
                      <span>{_('clinical.readDrKids')}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* --- SECTION 2: STREP A & THROAT INFECTIONS RESEARCH --- */}
        <section>
          <div className="border-b border-slate-200 pb-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
              {isHe ? 'דלקות גרון, סטרפטוקוקוס ואבחון מהיר (Strep A)' : 'Throat Inflammation & Strep A Rapid Diagnostics'}
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-light">
              {isHe ? 'מדריכים רפואיים מקצועיים מקופות החולים ובתי החולים המובילים בישראל' : 'Clinical guides and articles from Israeli healthcare funds and pediatric medical centers'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {strepArticles.map((art, idx) => {
              const artTitle = typeof art.title === 'object' ? (art.title[lang] || art.title.en || art.title.he) : art.title;
              const artDesc = typeof art.desc === 'object' ? (art.desc[lang] || art.desc.en || art.desc.he) : art.desc;
              return (
                <a
                  key={`strep-${idx}`}
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 flex flex-col justify-between p-6 card-3d-lift"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100/60">
                        {art.source}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {artTitle}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-normal">
                      {artDesc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-600 group-hover:text-burgundy flex items-center justify-between">
                    <span>{_('clinical.readArticle')}</span>
                    <span className="text-slate-300">→</span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* --- SECTION 3: COLORECTAL (FOB) & GASTROENTEROLOGY --- */}
        <section>
          <div className="border-b border-slate-200 pb-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
              {isHe ? 'סקר סרטן המעי הגס (FOB) ומחלות דרכי העיכול (H. Pylori)' : 'Colorectal Cancer Screening & Gastroenterology'}
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-light">
              {isHe ? 'מידע על חשיבות הגילוי המוקדם והנגשת הבדיקות בקרב הציבור הרחב' : 'Early detection guidelines from national cancer and gastrointestinal health associations'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[...fobArticles, ...hpyloriArticles].map((art, idx) => {
              const artTitle = typeof art.title === 'object' ? (art.title[lang] || art.title.en || art.title.he) : art.title;
              const artDesc = typeof art.desc === 'object' ? (art.desc[lang] || art.desc.en || art.desc.he) : art.desc;
              return (
                <a
                  key={`gastro-${idx}`}
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col sm:flex-row justify-between p-8 card-3d-lift gap-6"
                >
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-100 inline-block mb-4">
                        {art.source}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                        {artTitle}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6">
                        {artDesc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-burgundy">
                      <span>{_('clinical.readArticle')}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
