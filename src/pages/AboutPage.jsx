import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Factory, TestTube, Briefcase, CheckCircle, Users, Milestone, Award, Flame, Calendar, Play, Video, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';

  const title = _('about.title');
  const sub = _('about.sub');

  // Interactive timeline state
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  // Custom historical milestones for the visual timeline
  const milestones = [
    {
      year: '2004',
      titleHe: 'תחילת פעילות מחקרית ורפואית',
      titleEn: 'Operations & Medical Vision',
      descHe: 'תחילת הפעילות המחקרית והקלינית של חברת BMT Diagnostics במטרה להנגיש אבחון מהיר ומדויק.',
      descEn: 'Commenced initial research and clinical operations focused on point-of-care medical diagnostics.'
    },
    {
      year: '2008',
      titleHe: 'התאגדות רשמית של חברת BMT',
      titleEn: 'Official Corporate Incorporation',
      descHe: 'התאגדות רשמית ורישום חברת BMT Diagnostics בישראל ומעבר לפיתוח וייצור תעשייתי מתקדם.',
      descEn: 'Official corporate incorporation of BMT Diagnostics in Israel and transition to industrial development.'
    },
    {
      year: '2012',
      titleHe: 'פיתוח פטנט ה-"no step"',
      titleEn: 'Patenting "no step" Device',
      descHe: 'פריצת דרך הנדסית ורפואית: המצאה ורישום פטנט בינלאומי על התקן ה-LabOnTime המשולב המונע חשיפה ביולוגית.',
      descEn: 'Engineering breakthrough: Invention and global patenting of the completely integrated, zero-exposure diagnostic pen.'
    },
    {
      year: '2018',
      titleHe: 'ייצור אוטומטי בחדר נקי',
      titleEn: 'Automated Cleanroom Manufacturing',
      descHe: 'הקמת מערכי ייצור אוטומטיים בחדר נקי באור עקיבא, התומכים בתקן ISO 13485:2016 ומאפשרים ייצור המוני מדויק.',
      descEn: 'Established state-of-the-art automated manufacturing lines in climate-controlled cleanrooms in Or Akiva, Israel.'
    },
    {
      year: '2024',
      titleHe: 'אישורי אמ"ר ופענוח AI',
      titleEn: 'MOH Clearance & AI Analytics',
      descHe: 'קבלת אישורי משרד הבריאות לסדרות בדיקה נרחבות ושילוב מערכת סקירה מבוססת בינה מלאכותית לקופות החולים.',
      descEn: 'Secured official Ministry of Health (MOH) clearances and deployed AI-powered non-invasive population screening.'
    },
    {
      year: '2026',
      titleHe: 'אינטגרציה מלאה בקופות החולים בישראל',
      titleEn: 'Full HMO Integration in Israel',
      descHe: 'אימוץ קליני ורוקחי נרחב בכלל קופות החולים ורשתות הפארם בישראל (כללית, מכבי, מאוחדת, לאומית, סופר-פארם ו-Be).',
      descEn: 'Comprehensive clinical and pharmacy adoption across major Israeli HMOs (Clalit, Maccabi, Meuhedet, Leumit, Super-Pharm, Be).'
    }
  ];

  const currentMilestone = milestones[activeMilestoneIndex];

  return (
    <div className="animate-fade-in bg-white pb-32">
      <Helmet>
        <title>{`About Us | BMT Diagnostics`}</title>
        <meta name="description" content={sub} />
        <meta property="og:title" content="About Us | BMT Diagnostics" />
        <meta property="og:description" content={sub} />
        <meta property="og:image" content="/home-main-image.png" />
        <meta name="keywords" content="BMT Diagnostics history, Nili Tamir, Idan Tamir, ISO 5 Cleanrooms, Rapid Diagnostic Test Manufacturer Israel" />
      </Helmet>

      {/* Majestic Widescreen Header Banner with Blue People Image ("האנשים בכחול") */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden text-white border-b border-slate-100"
        style={{ background: 'linear-gradient(135deg, #0267B5 0%, #01417A 100%)' }}
      >
        {/* Blue Lab Team Background Image ("האנשים בכחול") */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="/home-main-image.png" 
            alt="BMT Blue Healthcare Team" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0267B5]/80 via-[#01417A]/90 to-[#01417A]" />
        </div>

        {/* Sky-Blue Glow Overlay */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[300px] bg-sky-400/20 rounded-full blur-[100px] pointer-events-none z-10" />
        
        {/* Tech Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-10" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight drop-shadow-md">
            {title}
          </h1>
          <p className="text-lg md:text-2xl text-slate-100 font-light leading-relaxed max-w-4xl mx-auto opacity-95 drop-shadow-sm">
            {sub}
          </p>
        </div>
      </section>

      {/* --- HERO INTRO COMPANY VIDEO PLAYER --- */}
      <section className="max-w-6xl mx-auto px-4 -mt-14 relative z-20 mb-20">
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative group">
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/uJc-adTVaRQ?autoplay=0&rel=0"
              title="BMT Diagnostics Official Company Overview Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="bg-slate-950 p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-burgundy flex items-center justify-center text-white shrink-0 shadow-md">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-start">
                <div className="text-base font-extrabold">{isHe ? 'סרטון תדמית רשמי — BMT Diagnostics' : 'Official Corporate Film — BMT Diagnostics'}</div>
                <div className="text-xs text-slate-400 font-medium">{isHe ? 'סיפור המהפכה הדיאגנוסטית, הטכנולוגיה ויכולות הייצור' : 'The story of diagnostic innovation, patented technology, and manufacturing.'}</div>
              </div>
            </div>
            <div className="text-xs font-black text-sky-400 bg-sky-500/10 px-4 py-2 rounded-full border border-sky-400/20 uppercase tracking-widest shrink-0">
              Corporate Film
            </div>
          </div>
        </div>
      </section>

      {/* Core Company Strengths Grid with High-Res Visual Image Banners */}
      <section className="max-w-7xl mx-auto px-4 relative z-20 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Strength 1: Manufacturing Excellence */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 group card-3d-lift flex flex-col justify-between">
             <div>
               <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                 <img 
                   src="/Gemini_Generated_Image_2ldwn72ldwn72ldw.png" 
                   alt="Cleanroom Manufacturing" 
                   className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                   onError={(e) => { e.target.src = '/solution_background.png'; }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                 <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto bg-burgundy text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
                   {isHe ? 'תשתיות ייצור אוטומטיות' : 'Automated Production'}
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{_('about.c1Title')}</h3>
                 <p className="text-slate-500 leading-relaxed text-sm font-normal">{_('about.c1Desc')}</p>
               </div>
             </div>
          </div>

          {/* Strength 2: Massive Portfolio */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 group card-3d-lift flex flex-col justify-between">
             <div>
               <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                 <img 
                   src="/DSC_2098.JPG" 
                   alt="Clinical Portfolio" 
                   className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                   onError={(e) => { e.target.style.display = 'none'; }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                 <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto bg-blue-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
                   {isHe ? 'מעל 200 סוגי בדיקות' : '200+ Clinical Panels'}
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{_('about.c2Title')}</h3>
                 <p className="text-slate-500 leading-relaxed text-sm font-normal">{_('about.c2Desc')}</p>
               </div>
             </div>
          </div>

          {/* Strength 3: Culture of Innovation */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 group card-3d-lift flex flex-col justify-between">
             <div>
               <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                 <img 
                   src="/LabOnTime platform.png" 
                   alt="Patented Innovation" 
                   className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                   onError={(e) => { e.target.style.display = 'none'; }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                 <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto bg-emerald-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
                   {isHe ? 'פטנטים רשומים' : 'Patented Innovation'}
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{_('about.c3Title')}</h3>
                 <p className="text-slate-500 leading-relaxed text-sm font-normal">{_('about.c3Desc')}</p>
               </div>
             </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COMPACT HORIZONTAL ANIMATED TIMELINE SLIDER
          (Positioned between 3 Strengths and Executive Leadership)
          ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 mb-28">
        <div className="bg-gradient-to-br from-blue-50/80 via-sky-50 to-slate-50 rounded-[3rem] p-8 md:p-14 text-slate-900 shadow-lg border border-sky-200/80 relative overflow-hidden">
          
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/[0.08] rounded-full blur-3xl pointer-events-none" />

          {/* Section Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-3 shadow-md">
              <Milestone className="w-4 h-4 text-sky-200" />
              {isHe ? 'היסטוריית החברה ואבני דרך' : 'Company History & Milestones'}
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">
              {isHe ? 'התפתחות חברת BMT Diagnostics (2004–2026)' : 'Evolution of BMT Diagnostics (2004–2026)'}
            </h2>
          </div>

          {/* Horizontal Progress Track with Year Buttons */}
          <div className="relative mb-8 px-4" dir="ltr">
            {/* Connecting Progress Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1.5 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />
            <div 
              className="absolute top-1/2 left-8 h-1.5 bg-gradient-to-r from-blue-600 to-sky-400 -translate-y-1/2 z-0 transition-all duration-500 rounded-full shadow-sm"
              style={{ width: `${(activeMilestoneIndex / (milestones.length - 1)) * 90}%` }}
            />

            {/* Year Nodes Grid */}
            <div className="relative z-10 flex items-center justify-between">
              {milestones.map((item, idx) => {
                const isActive = activeMilestoneIndex === idx;
                return (
                  <button
                    key={item.year}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`flex flex-col items-center group focus:outline-none transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 shadow-md ${
                      isActive 
                        ? 'bg-blue-600 text-white scale-125 ring-4 ring-blue-500/30 font-extrabold shadow-lg' 
                        : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-blue-50 hover:text-blue-600'
                    }`}>
                      {item.year}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Card */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 relative z-10 animate-fade-in shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-start flex-grow">
              <div className="inline-block text-xs font-black text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 mb-3">
                {currentMilestone.year} Milestone
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">
                {isHe ? currentMilestone.titleHe : currentMilestone.titleEn}
              </h3>
              <p className="text-slate-600 text-sm md:text-base font-normal leading-relaxed">
                {isHe ? currentMilestone.descHe : currentMilestone.descEn}
              </p>
            </div>

            {/* Navigation Chevron Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveMilestoneIndex(prev => Math.max(0, prev - 1))}
                disabled={activeMilestoneIndex === 0}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Previous milestone"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                onClick={() => setActiveMilestoneIndex(prev => Math.min(milestones.length - 1, prev + 1))}
                disabled={activeMilestoneIndex === milestones.length - 1}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 flex items-center justify-center border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Next milestone"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- EXECUTIVE MANAGEMENT PROFILES SECTION (FOUNDERS) --- */}
      <section className="py-24 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 bg-burgundy/5 border border-burgundy/10 text-burgundy text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-6 shadow-sm">
               <Award className="w-4 h-4 text-burgundy" />
               {isHe ? 'הנהגת ביוטק מנוסה' : 'Pioneering Leadership'}
             </div>
             <h2 id="team-heading" className="text-3xl md:text-5xl font-black text-slate-900 mb-6 text-center tracking-tight">
               {_('about.team')}
             </h2>
             <div className="w-16 h-1 bg-burgundy mx-auto rounded-full" />
           </div>

           <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
             
             {/* Profile Card: Nili Tamir */}
             <div className="bg-slate-50/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 flex flex-col justify-between card-3d-lift">
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Nili Tamir</h3>
                  <div className="text-burgundy font-black mb-8 text-xs md:text-sm uppercase tracking-widest bg-burgundy/10 border border-burgundy/20 inline-block px-5 py-2 rounded-full shadow-sm">
                    {isHe ? 'מייסדים' : 'Founders'}
                  </div>
                  <ul className="space-y-4 text-slate-600 text-sm leading-relaxed font-normal">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                      <span>{_('about.n1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                      <span>{_('about.n2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                      <span>{_('about.n3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                      <span>{_('about.n4')}</span>
                    </li>
                  </ul>
                </div>
             </div>

             {/* Profile Card: Dr. Idan Tamir */}
             <div className="bg-slate-50/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 flex flex-col justify-between card-3d-lift">
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Dr. Idan Tamir</h3>
                  <div className="text-blue-700 font-black mb-8 text-xs md:text-sm uppercase tracking-widest bg-blue-50 border border-blue-100 inline-block px-5 py-2 rounded-full shadow-sm">
                    {isHe ? 'מייסדים' : 'Founders'}
                  </div>
                  <ul className="space-y-4 text-slate-600 text-sm leading-relaxed font-normal">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{_('about.i1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{_('about.i2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{_('about.i3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{_('about.i4')}</span>
                    </li>
                  </ul>
                </div>
             </div>

           </div>
        </div>
      </section>
    </div>
  );
}
