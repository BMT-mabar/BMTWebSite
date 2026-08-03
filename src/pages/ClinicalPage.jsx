import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, ShieldCheck, Microscope, BookOpen, Quote, Download, ArrowUpRight, ExternalLink, Sparkles, Stethoscope, Activity, HeartPulse, FileText, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function ClinicalPage() {
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';

  const title = _('clinical.title');
  const desc = _('clinical.desc');

  // Peer-reviewed studies summary table
  const studiesSummary = [
    {
      assayHe: 'Strep A Lab-On-Time (BMT 51084)',
      assayEn: 'Strep A Rapid Test (BMT 51084)',
      centerHe: 'המרכז הרפואי צפון (פוריה)',
      centerEn: 'Tzafon Medical Center (Poriya)',
      sampleSize: '181',
      sens: '96.9% (Colony-rich) / 88.6%',
      spec: '100.0%',
      ref: 'Prof. Avi Peretz (PI)',
      pdfLink: '/Clinical validation of BMT 51084 Strep A Lab-On-Time test device at Puriya Medical Center_final_signed (1).pdf'
    },
    {
      assayHe: 'Influenza A+B Lab-On-Time (BMT 51088)',
      assayEn: 'Influenza A+B Rapid Test (BMT 51088)',
      centerHe: 'המרכז הרפואי צפון (פוריה)',
      centerEn: 'Tzafon Medical Center (Poriya)',
      sampleSize: '170',
      sens: '94.9% (CT < 30) / 84.1% (CT < 35)',
      spec: '100.0%',
      ref: 'Prof. Avi Peretz (PI)',
      pdfLink: '/Clinical validation of BMT 51088 Influenza A+B test at Puriya Medical Center_clean.pdf'
    },
    {
      assayHe: 'RapidTest AI Mobile Application',
      assayEn: 'RapidTest AI Clinical Usability',
      centerHe: 'המרכז הרפואי צפון (פוריה)',
      centerEn: 'Tzafon Medical Center (Poriya)',
      sampleSize: '100',
      sens: '97.1% AI Accuracy',
      spec: '87.0% Independent (Ages 50-74)',
      ref: 'Prof. Avi Peretz (PI)',
      pdfLink: '/Clinical Usabilty validation of RapidTest AI at Puriya Medical Center_final_signed.pdf'
    }
  ];

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
        <title>{`Scientific Articles & Research | BMT Diagnostics`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content="Scientific Articles & Research | BMT Diagnostics" />
        <meta property="og:description" content={desc} />
        <meta name="keywords" content="Clinical Validation, Strep A Research, Influenza A+B, RapidTest AI, Dr. Kids, Tzafon Medical Center, Puriya, MedTech Validation" />
      </Helmet>

      {/* Majestic Widescreen Header Banner with Blue People Image ("האנשים בכחול") */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden text-white border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg, #0267B5 0%, #01417A 100%)' }}
      >
        {/* Blue Lab Team Background Image ("האנשים בכחול") */}
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
            {isHe ? 'מאמרים מדעיים ומחקרים קליניים' : 'Scientific Articles & Clinical Validation Reports'}
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

        {/* --- SECTION 1: PEER-REVIEWED CLINICAL VALIDATION REPORTS (PURYA MEDICAL CENTER) --- */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
              <Microscope className="w-4 h-4 text-blue-600" />
              {isHe ? 'מחקרי תיקוף קליניים רשמיים — המרכז הרפואי צפון (פוריה)' : 'Official Clinical Validation Reports — Tzafon Medical Center'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {isHe ? 'תיקוף קליני ומחקרי שימושיות בלתי תלויים' : 'Independent Clinical Validations & Usability Studies'}
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-3xl mx-auto mt-2 font-normal">
              {isHe ? 'דוחות התיקוף הקליניים שנערכו במעבדה למיקרוביולוגיה במרכז הרפואי צפון (פוריה) בראשות פרופ׳ אבי פרץ' : 'Clinical validation protocols conducted at Tzafon Medical Center (Poriya) under the supervision of Prof. Avi Peretz'}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Card 1: Strep A Rapid Test (BMT 51084) */}
            <article className="bg-white rounded-[2.5rem] p-8 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group card-3d-lift relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-burgundy/[0.02] rounded-full blur-3xl pointer-events-none" />
               
               <div>
                 <div className="inline-flex items-center gap-2 bg-burgundy/5 text-burgundy text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-burgundy/10 shadow-sm">
                   <Microscope className="w-3.5 h-3.5" />
                   {isHe ? 'Strep A (מק"ט 51084)' : 'Strep A (BMT 51084)'}
                 </div>
                 
                 <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-burgundy transition-colors">
                   {isHe ? 'תיקוף קליני - בדיקת Strep A Lab-On-Time' : 'Clinical Validation - Strep A Lab-On-Time Test'}
                 </h3>

                 <div className="text-xs text-slate-500 font-semibold mb-6 flex items-center gap-2">
                   <Award className="w-4 h-4 text-amber-500 shrink-0" />
                   <span>{isHe ? 'המרכז הרפואי צפון (פוריה) • פרופ׳ אבי פרץ' : 'Tzafon Medical Center (Poriya) • Prof. Avi Peretz'}</span>
                 </div>
                 
                 <div className="relative mb-8 bg-slate-50 border-s-4 border-burgundy p-5 rounded-e-2xl shadow-sm">
                   <Quote className="absolute top-3 right-3 w-8 h-8 text-burgundy/10 transform rotate-180 pointer-events-none" />
                   <p className="text-slate-700 italic text-xs md:text-sm leading-relaxed font-serif relative z-10">
                     {isHe 
                       ? '"ספציפיות בדיקת הסטרפטוקוק המהירה של BMT הינה 100%, והרגישות מגיעה ל-96.9% מול תרביות מעבדה. התקן האבחון נמצא נוח וידידותי במיוחד למשתמש."'
                       : '"BMT Strep A rapid test displayed 100% specificity and 96.9% sensitivity for colony-rich cultures, proving intuitive and highly reliable for point-of-care."'}
                   </p>
                 </div>
               </div>
               
               <div>
                 <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center shadow-inner group-hover:bg-white transition-colors">
                      <div className="text-2xl font-black text-emerald-600 mb-0.5 leading-none">100%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isHe ? 'ספציפיות' : 'Specificity'}</div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center shadow-inner group-hover:bg-white transition-colors">
                      <div className="text-2xl font-black text-blue-600 mb-0.5 leading-none">96.9%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isHe ? 'רגישות (תרביות)' : 'Sensitivity (Rich)'}</div>
                    </div>
                 </div>

                 <a 
                   href="/Clinical validation of BMT 51084 Strep A Lab-On-Time test device at Puriya Medical Center_final_signed (1).pdf" 
                   download
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full inline-flex items-center justify-center gap-2 bg-burgundy hover:brightness-110 text-white py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm hover:shadow-md focus:outline-none btn-bouncy"
                 >
                   <Download className="w-4 h-4" />
                   <span>{isHe ? 'הורד דוח תיקוף סטרפ A (PDF)' : 'Download Strep A Report (PDF)'}</span>
                 </a>
               </div>
            </article>

            {/* Card 2: Influenza A+B Rapid Test (BMT 51088) with CT < 30 Stat Display */}
            <article className="bg-white rounded-[2.5rem] p-8 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group card-3d-lift relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
               
               <div>
                 <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-blue-100 shadow-sm">
                   <Microscope className="w-3.5 h-3.5" />
                   {isHe ? 'שפעת A+B (מק"ט 51088)' : 'Influenza A+B (BMT 51088)'}
                 </div>
                 
                 <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                   {isHe ? 'תיקוף קליני - בדיקת שפעת Influenza A+B' : 'Clinical Validation - Influenza A+B Rapid Test'}
                 </h3>

                 <div className="text-xs text-slate-500 font-semibold mb-6 flex items-center gap-2">
                   <Award className="w-4 h-4 text-amber-500 shrink-0" />
                   <span>{isHe ? 'המרכז הרפואי צפון (פוריה) • פרופ׳ אבי פרץ' : 'Tzafon Medical Center (Poriya) • Prof. Avi Peretz'}</span>
                 </div>
                 
                 <div className="relative mb-8 bg-slate-50 border-s-4 border-blue-600 p-5 rounded-e-2xl shadow-sm">
                   <Quote className="absolute top-3 right-3 w-8 h-8 text-blue-600/10 transform rotate-180 pointer-events-none" />
                   <p className="text-slate-700 italic text-xs md:text-sm leading-relaxed font-serif relative z-10">
                     {isHe 
                       ? '"להערכתי המקצועית, בדיקת Influenza A+B Lab-On-Time של BMT מתאימה לשימוש עצמי בקרב הציבור הרחב הודות לפשטותה, נוחות תפעולה ובהירות קריאת התוצאות."'
                       : '"It is my professional opinion that BMT Lab-On-Time Influenza A+B Rapid Test Device could be used by the general population due to simplicity and clear results reading."'}
                   </p>
                 </div>
               </div>
               
               <div>
                 <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center shadow-inner group-hover:bg-white transition-colors">
                      <div className="text-2xl font-black text-emerald-600 mb-0.5 leading-none">100%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isHe ? 'ספציפיות' : 'Specificity'}</div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center shadow-inner group-hover:bg-white transition-colors">
                      <div className="text-2xl font-black text-blue-600 mb-0.5 leading-none">94.9%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isHe ? 'רגישות (CT < 30)' : 'Sensitivity (CT<30)'}</div>
                    </div>
                 </div>

                 <a 
                   href="/Clinical validation of BMT 51088 Influenza A+B test at Puriya Medical Center_clean.pdf" 
                   download
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm hover:shadow-md focus:outline-none btn-bouncy"
                 >
                   <Download className="w-4 h-4" />
                   <span>{isHe ? 'הורד דוח תיקוף שפעת (PDF)' : 'Download Flu Report (PDF)'}</span>
                 </a>
               </div>
            </article>

            {/* Card 3: RapidTest AI Mobile Usability Validation with 87% Ages 50-74 Explicit Subtext */}
            <article className="bg-white rounded-[2.5rem] p-8 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group card-3d-lift relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />
               
               <div>
                 <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-purple-100 shadow-sm">
                   <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                   {isHe ? 'אלגוריתם AI ושימושיות' : 'RapidTest AI Mobile'}
                 </div>
                 
                 <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-purple-600 transition-colors">
                   {isHe ? 'מחקר שימושיות קלינית - RapidTest AI' : 'Clinical Usability - RapidTest AI App'}
                 </h3>

                 <div className="text-xs text-slate-500 font-semibold mb-6 flex items-center gap-2">
                   <Award className="w-4 h-4 text-amber-500 shrink-0" />
                   <span>{isHe ? 'המרכז הרפואי צפון (פוריה) • פרופ׳ אבי פרץ' : 'Tzafon Medical Center (Poriya) • Prof. Avi Peretz'}</span>
                 </div>
                 
                 <div className="relative mb-8 bg-slate-50 border-s-4 border-purple-600 p-5 rounded-e-2xl shadow-sm">
                   <Quote className="absolute top-3 right-3 w-8 h-8 text-purple-600/10 transform rotate-180 pointer-events-none" />
                   <p className="text-slate-700 italic text-xs md:text-sm leading-relaxed font-serif relative z-10">
                     {isHe 
                       ? '"מחקר השימושיות הקליני מדגים אמינות אלגוריתמית גבוהה של 97.1% בפענוח אוטומטי של בדיקות FIT באמצעות סמארטפון ושיעור ביצוע עצמאי ללא עזרה של 87% בקרב נבדקים מגיל 50 עד 74."'
                       : '"The clinical usability study provides compelling evidence supporting RapidTest AI with 97.1% automated accuracy and 87% independent completion among ages 50-74."'}
                   </p>
                 </div>
               </div>
               
               <div>
                 <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center shadow-inner group-hover:bg-white transition-colors">
                      <div className="text-2xl font-black text-purple-600 mb-0.5 leading-none">97.1%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isHe ? 'דיוק פענוח AI' : 'AI Accuracy'}</div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 text-center shadow-inner group-hover:bg-white transition-colors">
                      <div className="text-2xl font-black text-emerald-600 mb-0.5 leading-none">87.0%</div>
                      <div className="text-[9px] font-extrabold text-slate-500 leading-tight mt-0.5">
                        {isHe ? 'ביצוע עצמאי ללא עזרה (גילאי 50-74)' : 'Self Completion (Ages 50-74)'}
                      </div>
                    </div>
                 </div>

                 <a 
                   href="/Clinical Usabilty validation of RapidTest AI at Puriya Medical Center_final_signed.pdf" 
                   download
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm hover:shadow-md focus:outline-none btn-bouncy"
                 >
                   <Download className="w-4 h-4" />
                   <span>{isHe ? 'הורד דוח RapidTest AI (PDF)' : 'Download AI Report (PDF)'}</span>
                 </a>
               </div>
            </article>

          </div>
        </section>

        {/* --- SECTION 2: DR. KIDS CLINICAL GUIDES WITH REAL ARTICLE SCREENSHOTS --- */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              {isHe ? 'מאמרים בשיתוף ד״ר אפי (Dr. Kids)' : 'Dr. Kids Collaboration Articles'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {isHe ? 'מדריכים קליניים ומאמרי הדרכה' : 'Clinical Guides & Parental Educational Articles'}
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

        {/* --- SECTION 3: STREPTOCCOCUS (STREP A) & THROAT INFECTIONS WITH REAL ARTICLE SCREENSHOTS --- */}
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

        {/* --- SECTION 4: FECAL OCCULT BLOOD (FOB) & COLORECTAL SCREENING WITH REAL ARTICLE SCREENSHOTS --- */}
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

        {/* --- SECTION 5: HELICOBACTER PYLORI (H. PYLORI) WITH REAL ARTICLE SCREENSHOTS --- */}
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

        {/* Global Clinical Validation Grid Table */}
        <section className="bg-white border border-slate-200/80 rounded-[3rem] p-8 md:p-14 shadow-md relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex items-center gap-4 border-b border-slate-100 pb-8 mb-10">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 border border-blue-100/50 rounded-2xl shadow-sm flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {isHe ? 'מפתח תיקוף וביצועים מדעיים' : 'EBM Peer-Reviewed Validation Summary'}
              </h2>
              <p className="text-slate-450 text-sm font-light mt-1">
                {isHe ? 'ריכוז תוצאות מחקרי התיקוף הקליניים העיקריים של הבדיקות המהירות מתוצרתנו' : 'Aggregated scientific performance characteristics for key diagnostic suites'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/70 shadow-inner">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-widest text-start">
                <tr>
                  <th scope="col" className="px-6 py-4.5 text-start">{isHe ? 'פאנל אבחוני / מחקר' : 'Diagnostic Study'}</th>
                  <th scope="col" className="px-6 py-4.5 text-start">{isHe ? 'מרכז רפואי' : 'Medical Center'}</th>
                  <th scope="col" className="px-6 py-4.5 text-start w-28">{isHe ? 'גודל מדגם' : 'Sample Size'}</th>
                  <th scope="col" className="px-6 py-4.5 text-start">{isHe ? 'רגישות / דיוק' : 'Sensitivity / Accuracy'}</th>
                  <th scope="col" className="px-6 py-4.5 text-start w-28">{isHe ? 'ספציפיות' : 'Specificity'}</th>
                  <th scope="col" className="px-6 py-4.5 text-start">{isHe ? 'חוקר ראשי' : 'Principal Investigator'}</th>
                  <th scope="col" className="px-6 py-4.5 text-center w-28">{isHe ? 'מסמך PDF' : 'Report'}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 text-sm font-medium text-slate-800">
                {studiesSummary.map((s, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                    <td className="px-6 py-4.5 font-bold text-slate-900">{isHe ? s.assayHe : s.assayEn}</td>
                    <td className="px-6 py-4.5 text-slate-650">{isHe ? s.centerHe : s.centerEn}</td>
                    <td className="px-6 py-4.5 text-slate-600 font-bold">{s.sampleSize}</td>
                    <td className="px-6 py-4.5 text-blue-700 font-extrabold">{s.sens}</td>
                    <td className="px-6 py-4.5 text-emerald-600 font-extrabold">{s.spec}</td>
                    <td className="px-6 py-4.5 text-slate-500 font-semibold">{s.ref}</td>
                    <td className="px-6 py-4.5 text-center">
                      <a 
                        href={s.pdfLink} 
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 hover:bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 transition"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
