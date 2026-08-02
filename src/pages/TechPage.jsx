import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Smartphone, Globe, ShieldCheck, Microscope, Activity, Flame, Cpu, Eye, Check, Play, X, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TestToEmrAnimation from '../components/TestToEmrAnimation';
import { getAssetPath } from '../utils/imagePath';

export default function TechPage() {
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';

  const title = _('tech.title');
  const desc = _('tech.desc');

  // Dynamic state to showcase interactive steps of the patent device
  const [activeStep, setActiveStep] = useState(1);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const stepDetails = [
    {
      num: 1,
      title: _('tech.s1Title'),
      desc: _('tech.s1Desc'),
      highlight: isHe ? 'מבטל לחלוטין העברות דגימה חיצוניות' : 'Completely eliminates external sample mix-ups.'
    },
    {
      num: 2,
      title: _('tech.s2Title'),
      desc: _('tech.s2Desc'),
      highlight: isHe ? 'ראגנטים מדודים מראש למיצוי מיידי' : 'Pre-measured clinical reagents for instant activation.'
    },
    {
      num: 3,
      title: _('tech.s3Title'),
      desc: _('tech.s3Desc'),
      highlight: isHe ? 'מנגנון נעילה קבוע המונע זיהום ביולוגי' : 'Permanent locking mechanism preventing bio-contamination.'
    }
  ];

  // Video Gallery Data
  const galleryVideos = [
    {
      id: 'strep-a',
      youtubeId: 'x92STpm-v9w',
      titleHe: 'בדיקת Strep A (פטנט no step)',
      titleEn: 'Strep A Rapid Test (no step Patent)',
      descHe: 'הדגמת תהליך אבחון מהיר בשלב 1 ללא העברות נוזל פתוחות.',
      descEn: '1-step diagnostic workflow eliminating open fluid transfers.',
      tag: 'PATENTED DEVICE'
    },
    {
      id: 'fob',
      youtubeId: '51ECod0uUy4',
      titleHe: 'בדיקת דם סמוי בצואה (FOB)',
      titleEn: 'Colorectal FOB Rapid Test',
      descHe: 'הדגמה קלינית של סקר דם סמוי בצואה עם תאימות לדיגיטל.',
      descEn: 'Clinical demonstration of FOB colorectal screening.',
      tag: 'DIGITAL HEALTH'
    },
    {
      id: 'flu',
      youtubeId: '8cZ12wTlitA',
      titleHe: 'בדיקת שפעת A+B (Influenza A+B)',
      titleEn: 'Influenza A+B Rapid Test',
      descHe: 'אבחון מוקדם ומהיר של שפעת עונתית בתצורת עט ואריזה.',
      descEn: 'Early rapid detection of seasonal flu A+B.',
      tag: 'RESPIRATORY'
    },
    {
      id: 'hpylori',
      youtubeId: '01NQD6egYF4',
      titleHe: 'בדיקת הליקובקטר פילורי (H. Pylori)',
      titleEn: 'H. Pylori Rapid Diagnostic Test',
      descHe: 'אבחון מהיר ואיכותי של חיידק הליקובקטר פילורי.',
      descEn: 'High sensitivity rapid detection of H. Pylori bacteria.',
      tag: 'GASTROENTEROLOGY'
    }
  ];

  return (
    <div className="animate-fade-in bg-slate-50 pb-24 min-h-screen">
      <Helmet>
        <title>{`Technology & Innovation | BMT Diagnostics`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content="Technology & Innovation | BMT Diagnostics" />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="/LabOnTime Device.jpg" />
        <meta name="keywords" content="Innovation, Digital Health, Strep A Pen, Bio-safety, EMR Integration, MedTech, חדשנות רפואית" />
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

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl mb-8">
            <span className="w-3 h-3 rounded-full bg-sky-400 animate-ping"></span>
            <span className="text-2xl md:text-3xl font-black text-white tracking-widest font-sans">LabOn<span className="text-sky-300">Time</span></span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-2xl text-slate-100 font-light leading-relaxed max-w-4xl mx-auto opacity-95">
            {desc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        
        {/* Interactive Device Video & Steps Showcase */}
        <section className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-200/80 shadow-md mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100/50 px-4 py-2 rounded-full mb-4 inline-block">
              {isHe ? 'פירוק הנדסי וסרטון הדגמה' : 'Patented Device Video Demonstration'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {isHe ? 'איך פועלת מערכת ה-"no step"?' : 'How does the "no step" system work?'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Col: Product Demonstration Video & LabOnTime Platform Image */}
            <div className="lg:col-span-6 flex flex-col space-y-6 justify-center">
              <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-slate-200 bg-slate-900 shadow-2xl flex items-center justify-center min-h-[280px] md:min-h-[340px] group">
                <iframe
                  className="w-full h-full min-h-[280px] md:min-h-[340px] rounded-[2.3rem] object-cover"
                  src="https://www.youtube.com/embed/x92STpm-v9w?autoplay=1&mute=1&loop=1&playlist=x92STpm-v9w&controls=1"
                  title="Strep A No-Step Product Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* LabOnTime Platform Showcase Image */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-4 shadow-sm flex items-center gap-4">
                <img 
                  src={getAssetPath('LabOnTime platform.png')} 
                  alt="LabOnTime Platform Architecture" 
                  className="h-20 w-auto object-contain rounded-xl bg-white p-2 border border-slate-200 shrink-0"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="text-start">
                  <div className="text-sm font-extrabold text-slate-900">{isHe ? 'פלטפורמת LabOnTime™ המוגנת בפטנט' : 'Patented LabOnTime™ Platform'}</div>
                  <div className="text-xs text-slate-500 font-normal mt-0.5">{isHe ? 'תצורת עט אבחוני משולב לבטיחות ביולוגית מלאה' : 'Integrated diagnostic pen format ensuring zero exposure.'}</div>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Tab Content */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-4" role="tablist">
                {stepDetails.map((s) => (
                  <button
                    key={s.num}
                    role="tab"
                    aria-selected={activeStep === s.num}
                    onClick={() => setActiveStep(s.num)}
                    className={`w-full text-start p-6 rounded-2xl border transition-all duration-300 flex gap-5 items-start focus:outline-none ${activeStep === s.num ? 'bg-blue-50/80 border-blue-200 shadow-sm' : 'bg-white border-slate-200/70 hover:bg-slate-50'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0 ${activeStep === s.num ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {s.num}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-1">{s.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-normal">{s.desc}</p>
                      
                      {activeStep === s.num && (
                        <div className="mt-4 pt-3 border-t border-blue-100/50 flex items-center gap-2 text-xs font-bold text-blue-700">
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          <span>{s.highlight}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- HIGH-TECH VIDEO GALLERY GRID --- */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">
              <Video className="w-4 h-4 text-sky-600" />
              {isHe ? 'גלריית סרטוני וידאו קליניים' : 'Clinical Demonstration Video Gallery'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {isHe ? 'צפו בהדגמות הווידאו של פלטפורמות האבחון' : 'Watch Live Video Demonstrations'}
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mt-3 font-light">
              {isHe ? 'סרטוני הדגמה מלאים של תהליכי העבודה, הבדיקות והטכנולוגיות מבית BMT Diagnostics' : 'Step-by-step diagnostic workflows across key BMT diagnostic test suites.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryVideos.map((vid) => (
              <div 
                key={vid.id}
                onClick={() => setActiveVideoModal(vid.youtubeId)}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 card-3d-lift flex flex-col justify-between"
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`} 
                    alt={isHe ? vid.titleHe : vid.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    onError={(e) => { e.target.src = '/LabOnTime Device.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Tag Pill */}
                  <span className="absolute top-3 right-3 rtl:right-3 rtl:left-auto bg-sky-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {vid.tag}
                  </span>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-burgundy/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-burgundy transition-all duration-300 border-2 border-white/40 btn-bouncy">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {isHe ? vid.titleHe : vid.titleEn}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-normal">
                      {isHe ? vid.descHe : vid.descEn}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-burgundy transition-colors">
                    <span>{isHe ? 'צפה בסרטון ההדגמה' : 'Watch Video Demo'}</span>
                    <Play className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Lightbox Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <button 
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Rapidtest.ai Inspired Ecosystem Section — Interactive Animated Flow */}
        <TestToEmrAnimation />

      </div>
    </div>
  );
}
