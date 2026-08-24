import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function ClinicalPage() {
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';

  const title = isHe ? 'מאמרים ומדריכים רפואיים' : 'Scientific & Medical Articles';
  const desc = isHe 
    ? 'סקירה מקיפה של מאמרים קליניים, מדריכי הדרכה רפואיים ומקורות מידע מקצועיים ממוסדות הבריאות המובילים בישראל.'
    : 'Comprehensive overview of clinical articles, medical guides, and reference resources from leading Israeli healthcare institutions.';

  // Dr. Kids Articles collection with real screenshots from site
  const drKidsArticles = [
    {
      id: 1,
      tag: isHe ? 'אבחון שפעת A+B' : 'Rapid Influenza Testing',
      title: isHe ? 'בדיקה מהירה לשפעת — ד״ר אפי' : 'Rapid Flu Test — Dr. Effi',
      desc: isHe 
        ? 'מאמר והסבר קליני מפורט מאת ד״ר אפי על בדיקה מהירה לאבחון שפעת, זיהוי מוקדם ומניעת סיבוכים ברפואת ילדים ומשפחה.'
        : 'Detailed clinical article by Dr. Effi on rapid influenza diagnostics, early detection, and complication prevention.',
      link: 'https://drkids.co.il/laboratory/%d7%91%d7%93%d7%99%d7%a7%d7%94-%d7%9e%d7%94%d7%99%d7%a8%d7%94-%d7%9c%d7%a9%d7%a4%d7%a2%d7%aa/',
      img: '/dr_kids_flu_ss.png'
    },
    {
      id: 2,
      tag: isHe ? 'אבחון דלקת גרון Strep A' : 'Strep A Rapid Throat Swab',
      title: isHe ? 'איך עושים משטח גרון לילד או למבוגר? — ד״ר אפי' : 'How to Perform a Throat Swab for Children & Adults — Dr. Effi',
      desc: isHe 
        ? 'מדריך מעשי מאת ד״ר אפי בשיתוף חברת BMT Diagnostics על ביצוע נכון, היגייני ונטול כאב של משטח גרון מהיר לילדים ולמבוגרים.'
        : 'Practical guide by Dr. Effi in collaboration with BMT Diagnostics on pain-free, hygienic, and precise throat swab sampling.',
      link: 'https://drkids.co.il/use/איך-עושים-משטח-גרון-לילד-או-למבוגר/',
      img: '/dr_kids_swab_ss.png'
    },
    {
      id: 3,
      tag: isHe ? 'אבחון קורונה מהיר' : 'Rapid Covid-19 Testing',
      title: isHe ? 'בדיקה מהירה לקורונה — ד״ר אפי' : 'Rapid Covid-19 Test — Dr. Effi',
      desc: isHe 
        ? 'הנחיות קליניות והדרכת הורים מפורטת מאת ד״ר אפי על אבחון מהיר, אמינות התוצאה והתנהלות נכונה במחלות נשימתיות.'
        : 'Parental guidance and clinical instructions by Dr. Effi on rapid antigen COVID-19 testing and pediatric care.',
      link: 'https://drkids.co.il/laboratory/%d7%91%d7%93%d7%99%d7%a7%d7%94-%d7%9e%d7%94%d7%99%d7%a8%d7%94-%d7%9c%d7%a7%d7%95%d7%a8%d7%95%d7%a0%d7%94/',
      img: '/dr_kids_covid_ss.png'
    }
  ];

  // Additional Medical Knowledge & Reference Articles with real website screenshots
  const strepArticles = [
    {
      source: isHe ? 'מרכז שניידר לרפואת ילדים' : 'Schneider Children\'s Medical Center',
      title: isHe ? 'דלקות גרון וסטרפטוקוקוס בקרב ילדים' : 'Throat Infections & Streptococcal Illness in Children',
      desc: isHe ? 'מאמר מקצועי מבית החולים שניידר העוסק בזיהומי גרון, חיידק הסטרפטוקוקוס ודגשים מיוחדים ברפואת ילדים.' : 'Professional medical article by Schneider Children\'s Center focusing on streptococcal throat infections.',
      link: 'https://www.schneider.org.il/?CategoryID=851&ArticleID=5435',
      img: '/schneider_ss.png'
    },
    {
      source: isHe ? 'קופת חולים כללית' : 'Clalit Health Services',
      title: isHe ? 'דלקת גרון מקיף - ויראלי או חיידקי?' : 'Comprehensive Sore Throat Guide - Viral vs Bacterial',
      desc: isHe ? 'המדריך המקיף של קופת חולים כללית המסביר על דלקות גרון וההבדל הקריטי בין זיהום נגיפי לחיידקי.' : 'Comprehensive Clalit guide explaining throat inflammation and differentiating viral from bacterial infections.',
      link: 'https://www.clalit.co.il/he/your_health/family/Pages/laryngitis.aspx',
      img: '/clalit_strep_ss.png'
    },
    {
      source: isHe ? 'קופת חולים מאוחדת' : 'Meuhedet Health Services',
      title: isHe ? 'על וירוסים, סטרפטוקוקים וחיות אחרות' : 'On Viruses, Streptococci, and Diagnostics',
      desc: isHe ? 'מדריך הבריאות של קופת חולים מאוחדת על הבחנה בין מחלות ויראליות לחיידקיות וזיהומי סטרפטוקוק.' : 'Meuhedet health magazine guide on identifying streptococcal infections versus viral illness.',
      link: 'https://www.meuhedet.co.il/%D7%94%D7%9E%D7%92%D7%96%D7%99%D7%9F/%D7%A2%D7%9C-%D7%95%D7%99%D7%A8%D7%95%D7%A1%D7%99%D7%9D-%D7%A1%D7%98%D7%A8%D7%A4%D7%98%D7%95%D7%A7%D7%95%D7%A7%D7%99%D7%9D-%D7%95%D7%97%D7%99%D7%95%D7%AA-%D7%90%D7%97%D7%A8%D7%95%D7%AA/',
      img: '/meuhedet_strep_ss.png'
    },
    {
      source: isHe ? 'קופת חולים לאומית' : 'Leumit Health Services',
      title: isHe ? 'דלקת גרון סטרפטוקוקלית - Strep Throat' : 'Streptococcal Pharyngitis - Strep Throat',
      desc: isHe ? 'מאמר קליני המסביר ספציפית על דלקת גרון הנגרמת מחיידק הסטרפטוקוקוס, התסמינים והטיפול המומלץ.' : 'Clinical Leumit article covering symptoms, diagnosis, and treatment for Strep Throat.',
      link: 'https://www.leumit.co.il/diseases/strep-throat/',
      img: '/leumit_strep_ss.png'
    },
    {
      source: isHe ? 'קופת חולים מכבי' : 'Maccabi Healthcare',
      title: isHe ? 'זיהומי סטרפטוקוקוס' : 'Streptococcal Infections Guide',
      desc: isHe ? 'מדריך הבריאות של מכבי העוסק במשפחת חיידקי הסטרפטוקוקוס והשלכות זיהום מסוג זה.' : 'Maccabi medical guide addressing streptococcal bacterial strains and infection outcomes.',
      link: 'https://www.maccabi4u.co.il/healthguide/medicalconditions/streptococcalinfections/',
      img: '/maccabi_strep_ss.png'
    },
    {
      source: isHe ? 'אינפומד - Infomed' : 'Infomed Health Portal',
      title: isHe ? 'בדיקת משטח גרון' : 'Throat Culture & Rapid Swab Test',
      desc: isHe ? 'מאמר מפורט על אופן ביצוע בדיקת משטח הגרון (תרבית/בדיקה מהירה), מתי יש לבצע אותה וכיצד מפענחים את התוצאות.' : 'Detailed medical article explaining throat swab techniques, cultures, rapid testing, and result interpretation.',
      link: 'https://www.infomed.co.il/examinations/throat-culture/',
      img: '/infomed_strep_ss.png'
    },
    {
      source: isHe ? 'Ynet בריאות' : 'Ynet Health News',
      title: isHe ? 'כתבת בריאות: עליה בתחלואת סטרפטוקוק' : 'Health Report: Streptococcal Infection Trends',
      desc: isHe ? 'כתבת בריאות ב-Ynet העוסקת בעלייה בתחלואת סטרפטוקוק, איתור מוקדם וסיבוכים אפשריים.' : 'Ynet health reporting on streptococcal infection rises and early rapid diagnostic intervention.',
      link: 'https://www.ynet.co.il/health/article/bydbmrfeye',
      img: '/ynet_strep_ss.png'
    }
  ];

  const fobArticles = [
    {
      source: isHe ? 'האגודה למלחמה בסרטן' : 'Israel Cancer Association',
      title: isHe ? 'גילוי מוקדם של סרטן המעי הגס' : 'Early Detection of Colorectal Cancer',
      desc: isHe ? 'מאמר רשמי של האגודה למלחמה בסרטן העוסק בחשיבותן העצומה של בדיקות הסקר (כמו דם סמוי בצואה) להצלת חיים ולמניעת סרטן המעי הגס.' : 'Official Israel Cancer Association guidance on life-saving non-invasive FOB screening tests for early colorectal detection.',
      link: 'https://www.cancer.org.il/articles/5731/',
      img: '/cancer_fob_ss.png'
    }
  ];

  const hpyloriArticles = [
    {
      source: isHe ? 'קופת חולים מכבי' : 'Maccabi Healthcare Services',
      title: isHe ? 'הליקובקטר פילורי: תסמינים, אבחון וטיפול' : 'H. Pylori: Symptoms, Diagnostics & Treatment',
      desc: isHe ? 'המדריך השלם של קופת חולים מכבי על חיידק הקיבה הליקובקטר פילורי, הדרכים השונות לאבחון (כולל בדיקות מהירות) והטיפול האנטיביוטי.' : 'Maccabi healthcare guide covering H. pylori stomach infection, rapid diagnostic testing, and therapy.',
      link: 'https://www.maccabi4u.co.il/healthguide/medicalconditions/helicobacter_pylori/',
      img: '/maccabi_hpylori_ss.png'
    }
  ];

  return (
    <div className="animate-fade-in bg-white pb-24 min-h-screen">
      <Helmet>
        <title>{`Scientific & Medical Articles | BMT Diagnostics`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content="Scientific & Medical Articles | BMT Diagnostics" />
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
        
        {/* Tech Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-20">
          <div className="inline-block bg-sky-400/20 text-sky-200 border border-sky-300/30 text-xs font-black px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            {isHe ? 'מאמרים מדעיים ומדריכים קליניים' : 'Scientific & Medical Articles'}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>
          <p className="text-lg md:text-2xl text-slate-100 font-light leading-relaxed max-w-4xl mx-auto opacity-95 drop-shadow-sm">
            {desc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16">

        {/* --- SECTION 1: DR. KIDS CLINICAL GUIDES WITH REAL ARTICLE SCREENSHOTS --- */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {isHe ? 'מאמרים בשיתוף ד״ר אפי (Dr. Kids)' : 'Dr. Kids Collaboration Articles'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {isHe ? 'מדריכים קליניים ומאמרי הדרכה' : 'Clinical Guides & Educational Articles'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {drKidsArticles.map((art) => (
              <article 
                key={art.id} 
                className="bg-white rounded-[2.5rem] border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group card-3d-lift overflow-hidden"
              >
                <div>
                  <div className="h-52 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                    <img 
                      src={getAssetPath(art.img)} 
                      alt={art.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = getAssetPath('dr-kids-bear.jpg'); }}
                    />
                    <div className="absolute top-3 right-3 rtl:right-3 rtl:left-auto bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {art.tag}
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal mb-4">
                      {art.desc}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7">
                  <a 
                    href={art.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-burgundy hover:brightness-110 text-white px-6 py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm hover:shadow-md btn-bouncy w-full"
                  >
                    <span>{isHe ? 'קרא באתר Dr. Kids' : 'Read Article on Dr. Kids'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: STREPTOCCOCUS (STREP A) & THROAT INFECTIONS WITH REAL ARTICLE SCREENSHOTS --- */}
        <section className="mb-24">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-10 max-w-7xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-black text-xl shadow-sm">
              🦠
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {isHe ? 'סטרפטוקוקוס (Strep A) ודלקות גרון' : 'Streptococcus (Strep A) & Throat Infection Resources'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-light mt-0.5">
                {isHe ? 'אוסף מאמרים ומדריכי בריאות ממוסדות הרפואה, קופות החולים ומאגרי המידע המובילים בישראל' : 'Medical resources from leading Israeli hospitals, HMOs, and health portals'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strepArticles.map((item, idx) => (
              <article key={idx} className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden card-3d-lift">
                <div>
                  <div className="h-44 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                    <img 
                      src={getAssetPath(item.img)} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = getAssetPath('dr_kids_flu_ss.png'); }}
                    />
                    <div className="absolute top-3 right-3 rtl:right-3 rtl:left-auto bg-sky-900/80 backdrop-blur-md text-sky-100 text-[11px] font-black px-3 py-1 rounded-full border border-sky-400/30 uppercase tracking-wider shadow-md">
                      {item.source}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-blue-600 bg-sky-50 border border-sky-100 group-hover:bg-blue-600 group-hover:text-white px-5 py-3 rounded-xl transition-all btn-bouncy w-full shadow-sm"
                  >
                    <span>{isHe ? 'לקריאת המאמר המלא' : 'Read Full Article'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: FECAL OCCULT BLOOD (FOB) & COLORECTAL SCREENING WITH REAL ARTICLE SCREENSHOTS --- */}
        <section className="mb-24">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-10 max-w-7xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-black text-xl shadow-sm">
              🩸
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {isHe ? 'דם סמוי בצואה (FOB) וגילוי מוקדם' : 'Fecal Occult Blood (FOB) & Colorectal Screening'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-light mt-0.5">
                {isHe ? 'מידע רפואי רשמי על בדיקות סקר ביתיות למניעת סרטן המעי הגס' : 'Official medical guidance on non-invasive screening for early colorectal detection'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {fobArticles.map((item, idx) => (
              <article key={idx} className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden card-3d-lift">
                <div>
                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                    <img 
                      src={getAssetPath(item.img)} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = getAssetPath('cancer_fob_ss.png'); }}
                    />
                    <div className="absolute top-3 right-3 rtl:right-3 rtl:left-auto bg-rose-900/80 backdrop-blur-md text-rose-100 text-[11px] font-black px-3 py-1 rounded-full border border-rose-400/30 uppercase tracking-wider shadow-md">
                      {item.source}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-100 group-hover:bg-rose-600 group-hover:text-white px-5 py-3 rounded-xl transition-all btn-bouncy w-full shadow-sm"
                  >
                    <span>{isHe ? 'לקריאת המאמר המלא' : 'Read Full Article'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: HELICOBACTER PYLORI (H. PYLORI) WITH REAL ARTICLE SCREENSHOTS --- */}
        <section className="mb-24">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5 mb-10 max-w-7xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center font-black text-xl shadow-sm">
              🦠
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {isHe ? 'הליקובקטר פילורי (H. Pylori)' : 'Helicobacter Pylori (H. Pylori) Resources'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-light mt-0.5">
                {isHe ? 'אבחון מהיר, תסמינים וטיפול בחיידק הקיבה' : 'Rapid diagnostics, symptoms, and medical treatment for H. pylori'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {hpyloriArticles.map((item, idx) => (
              <article key={idx} className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden card-3d-lift">
                <div>
                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden border-b border-slate-100">
                    <img 
                      src={getAssetPath(item.img)} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = getAssetPath('maccabi_hpylori_ss.png'); }}
                    />
                    <div className="absolute top-3 right-3 rtl:right-3 rtl:left-auto bg-amber-900/80 backdrop-blur-md text-amber-100 text-[11px] font-black px-3 py-1 rounded-full border border-amber-400/30 uppercase tracking-wider shadow-md">
                      {item.source}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-amber-700 bg-amber-50 border border-amber-100 group-hover:bg-amber-600 group-hover:text-white px-5 py-3 rounded-xl transition-all btn-bouncy w-full shadow-sm"
                  >
                    <span>{isHe ? 'לקריאת המאמר המלא' : 'Read Full Article'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
