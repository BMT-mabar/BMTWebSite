import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Microscope, Activity, Award, Factory, Briefcase, ArrowRight, ArrowLeft, CheckCircle, Calendar, ChevronLeft, ChevronRight, ShoppingBag, FileText, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';
import { getAssetPath } from '../utils/imagePath';

/* ─── Hand-crafted high-fidelity grayscale vector logos for partners ─── */
const getPartnerLogos = (isHe) => [
  {
    name: 'ISRAEL MOH',
    label: isHe ? 'משרד הבריאות' : 'Ministry of Health',
    imgUrl: 'moh-logo.png'
  },
  {
    name: 'SII NOTIFIED BODY',
    label: isHe ? 'מכון התקנים CERTIFIED' : 'SII Certified',
    imgUrl: 'sii-logo.jpeg'
  },
  {
    name: 'CLALIT HEALTH',
    label: isHe ? 'שירותי בריאות כללית' : 'Clalit Health Services',
    imgUrl: 'clalit-logo.jpg'
  },
  {
    name: 'MACCABI HEALTH',
    label: isHe ? 'מכבי שירותי בריאות' : 'Maccabi Healthcare',
    imgUrl: 'maccabi-logo.webp'
  },
  {
    name: 'MEUHEDET HEALTH',
    label: isHe ? 'קופת חולים מאוחדת' : 'Meuhedet Healthcare',
    imgUrl: 'meuhedet-logo.png'
  },
  {
    name: 'LEUMIT HEALTH',
    label: isHe ? 'לאומית שירותי בריאות' : 'Leumit Healthcare',
    imgUrl: 'leumit-logo.jpg'
  },
  {
    name: 'SUPER-PHARM',
    label: isHe ? 'רשת סופר-פארם' : 'Super-Pharm Israel',
    imgUrl: 'superpharm-logo.png'
  },
  {
    name: 'BE PHARM',
    label: isHe ? 'רשת Be פארם' : 'Be Pharm Israel',
    imgUrl: 'bepharm-logo.jpg'
  }
];

// YouTube IDs for embeds
const BMT_HERO_BG_YT = 'uJc-adTVaRQ';
const STREP_YT_ID    = 'x92STpm-v9w';
const FOB_YT_ID      = '51ECod0uUy4';

export default function HomePage({ onOpenRfq }) {
  const navigate = useNavigate();
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';
  const logos = getPartnerLogos(isHe);

  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const pharmaProducts = productsDatabase.filter(p => Array.isArray(p.category) ? p.category.includes('b2c') : p.category === 'b2c');

  return (
    <div className="animate-fade-in bg-white overflow-x-hidden">
      <Helmet>
        <title>{`BMT Diagnostics | Rapid Diagnostics`}</title>
        <meta name="description" content={_('hero.sub')} />
        <meta property="og:title" content="BMT Diagnostics | Rapid Diagnostics" />
        <meta property="og:description" content={_('hero.sub')} />
        <meta property="og:image" content="/home-main-image.png" />
        <meta name="keywords" content="BMT Diagnostics, Strep A Pen, Rapid Diagnostic Test, ISO 13485, CE Marked, MOH Approval, Israeli MedTech" />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════
          HIGH-END OCEAN BLUE MEDTECH HERO SECTION
          (Matching exact reference colors #0267B5 -> #01417A, clear left video, white bottom wave)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0267B5 0%, #01417A 100%)' }}
        aria-label={isHe ? 'אזור ראשי' : 'Hero Section'}
      >
        {/* Seamless Full-Bleed Corporate Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            className="w-full h-[140%] -mt-[10%] object-cover opacity-35 filter brightness-105 saturate-110 border-0 pointer-events-none scale-110"
            src={`https://www.youtube.com/embed/${BMT_HERO_BG_YT}?autoplay=1&mute=1&loop=1&playlist=${BMT_HERO_BG_YT}&controls=0&showinfo=0&autohide=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
            title="BMT Corporate Video Background"
            allow="autoplay; encrypted-media"
            loading="eager"
          />
          {/* Full-Bleed Ocean Blue Gradient Overlay — Seamless 100% Blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0267B5]/75 via-[#01417A]/85 to-[#01417A]/95 rtl:bg-gradient-to-l rtl:from-[#0267B5]/75 rtl:via-[#01417A]/85 rtl:to-[#01417A]/95" />
        </div>

        {/* Content Container — Compact top padding perfectly aligned with navbar logo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 lg:pt-6 xl:pt-8 pb-20 md:pb-28">
          <div className="max-w-3xl">

            {/* H1 Title — Closely aligned with header logo */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-[4rem] font-black leading-[1.12] mb-6 text-white tracking-tight drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: _('hero.title') }}
            />

            {/* Subtitle with WCAG compliant high contrast */}
            <p className="text-lg sm:text-xl mb-10 leading-relaxed font-normal text-white max-w-2xl drop-shadow">
              {_('hero.sub')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label={isHe ? 'כפתורי פעולה ראשיים' : 'Primary actions'}>
              <button
                id="hero-btn-b2b"
                onClick={() => navigate('/catalog/b2b')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-extrabold text-base text-white bg-burgundy hover:brightness-110 transition-all duration-300 shadow-xl hover:shadow-burgundy/40 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-white/40 btn-bouncy"
              >
                <Microscope className="w-5 h-5" aria-hidden="true" />
                {_('hero.btnB2b')}
              </button>
              <button
                id="hero-btn-b2c"
                onClick={() => navigate('/catalog/b2c')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base text-blue-700 bg-white hover:bg-slate-50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-white/40 btn-bouncy"
              >
                <Activity className="w-5 h-5 text-blue-500" aria-hidden="true" />
                {_('hero.btnB2c')}
              </button>
            </div>

            {/* Micro Stats Row */}
            <div className="mt-14 pt-6 border-t border-white/20 flex flex-wrap gap-8 sm:gap-12" aria-label={isHe ? 'נתוני מפתח' : 'Key figures'}>
              {[
                { value: '2004', label: isHe ? 'תחילת פעילות ב-2004' : 'Activity Since 2004' },
                { value: '+200', label: isHe ? 'פאנלים אבחוניים' : 'Diagnostic Products' },
                { value: '+40', label: isHe ? 'מדינות יצוא' : 'Global Export Markets' },
                { value: 'ISO', label: isHe ? 'תקני איכות בינלאומיים' : 'Certified Standards' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">{stat.value}</span>
                  <span className="text-[11px] text-sky-100 font-semibold uppercase tracking-wider mt-0.5 drop-shadow-sm">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* --- DYNAMIC PURE WHITE WAVY SVG BOTTOM DIVIDER (Matching Reference Site) --- */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-12 md:h-16 text-slate-100" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CLEAN ELEGANT LIGHT TRUST & CERTIFICATION STRIP
          ═══════════════════════════════════════════════════════ */}
      <section className="bg-slate-100/90 py-5 border-b border-slate-200/80 text-slate-700 text-xs md:text-sm font-semibold relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            
            {/* Highlighted Registered Patents Badge */}
            <div className="flex items-center gap-2 bg-blue-50/90 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all duration-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{isHe ? 'פטנטים בינלאומיים רשומים' : 'Patented Diagnostics'}</span>
            </div>

            {/* Clickable Accessible ISO Certificate Link with PDF integration */}
            <a 
              href="/ISO_40519_rev0 (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-700 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
              title={isHe ? 'צפייה בתעודת ISO 13485:2016 (PDF)' : 'View ISO 13485:2016 Certificate (PDF)'}
              aria-label={isHe ? 'תעודת ISO 13485:2016 - פתיחת קובץ PDF' : 'ISO 13485:2016 Certificate - Open PDF'}
            >
              <Award className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform shrink-0" />
              <span className="group-hover:underline underline-offset-4">ISO 13485:2016 Certified</span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">PDF</span>
            </a>

            <div className="flex items-center gap-2 hover:text-blue-700 transition-colors">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>ISO 27001 Security</span>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50/80 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">{isHe ? 'ספק חיוני' : 'Essential Supplier'}</span>
            </div>

            <div className="flex items-center gap-2 hover:text-emerald-700 transition-colors">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isHe ? 'אישורי משרד הבריאות (אמ"ר)' : 'Israeli MOH Permits'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PHARMA PRODUCTS CAROUSEL (TOP POSITION WITH SMOOTH CHEVRON SCROLL)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-slate-100/60 via-slate-50/80 to-blue-50/20 border-b border-slate-200/80 relative overflow-hidden" aria-label={isHe ? 'קרוסלת מוצרי פארם' : 'Pharma Products Carousel'}>
        <div aria-hidden="true" className="absolute top-1/2 left-0 w-[500px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                {isHe ? 'קטלוג פארם וצריכה ביתית' : 'Pharma & OTC Product Lineup'}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {isHe ? 'מגוון ערכות האבחון ברשתות הפארם' : 'Leading OTC Rapid Diagnostic Kits'}
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-light mt-2 max-w-2xl">
                {isHe 
                  ? 'ערכות אבחון מהירות, מדויקות ונגישות לשימוש עצמי וביתי הזמינות בבתי המרקחת וברשתות הפארם בישראל' 
                  : 'Fast, highly sensitive and intuitive self-testing kits available across Israeli retail pharmacy chains.'}
              </p>
            </div>

            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-md flex items-center justify-center transition-all duration-300 btn-bouncy"
                aria-label={isHe ? 'הקודם' : 'Previous'}
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-0 rotate-180" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-md flex items-center justify-center transition-all duration-300 btn-bouncy"
                aria-label={isHe ? 'הבא' : 'Next'}
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-0 rotate-180" />
              </button>
              <button
                onClick={() => navigate('/catalog/b2c')}
                className="px-6 py-3 rounded-2xl bg-burgundy hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all btn-bouncy hidden sm:inline-flex items-center gap-2"
              >
                <span>{isHe ? 'לכל מוצרי הפארם' : 'View Full Pharma Catalog'}</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* --- SCROLLABLE CONTAINER WITH INFINITE AUTOMATIC UNBROKEN MARQUEE --- */}
        <div ref={carouselRef} className="w-full relative py-4 overflow-x-auto scroll-smooth no-scrollbar" dir="ltr">
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-100/60 via-slate-100/40 to-transparent z-25 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-100/60 via-slate-100/40 to-transparent z-25 pointer-events-none" />

          <div className="animate-infinite-scroll flex gap-6 px-4">
            {/* First Set of Pharma Product Cards */}
            {pharmaProducts.map((prod, idx) => (
              <div 
                key={`pharma-1-${prod.id}-${idx}`}
                onClick={() => navigate(`/product/${prod.id}`)}
                className="shrink-0 w-[290px] sm:w-[320px] bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 card-3d-lift flex flex-col justify-between group"
              >
                <div className="h-56 w-full bg-slate-50 relative p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img 
                    src={getAssetPath(prod.image)} 
                    alt={prod.title[lang] || prod.title.en || prod.title.he} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = getAssetPath('LabOnTime Device.jpg'); }}
                  />
                  <span className={`absolute top-4 right-4 rtl:right-4 rtl:left-auto text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${prod.isProfessionalOnly ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'}`}>
                    {prod.isProfessionalOnly ? (isHe ? 'לשימוש מקצועי בלבד' : _('specs.setting') || 'Professional Only') : (isHe ? 'לשימוש עצמי' : 'Self-Use')}
                  </span>
                  {(prod.isPatented || prod.id.includes('strep') || prod.id.includes('covid-otc') || prod.id.includes('fob-b2c') || prod.id.includes('h-pylori')) && (
                    <span className="absolute top-4 left-4 rtl:left-4 rtl:right-auto text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm bg-gradient-to-r from-burgundy to-burgundy-600 text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
                      <span>
                        {prod.patentBadge 
                          ? (typeof prod.patentBadge === 'object' ? (prod.patentBadge[lang] || prod.patentBadge.he || prod.patentBadge.en) : prod.patentBadge)
                          : (isHe ? 'פטנט' : 'Patent')}
                      </span>
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base md:text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {prod.title[lang] || prod.title.en || prod.title.he}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-normal">
                      {prod.shortDesc[lang] || prod.shortDesc.en || prod.shortDesc.he}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-slate-400">
                      {prod.specs?.barcode ? `ברקוד: ${prod.specs.barcode}` : 'BMT OTC'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600 group-hover:text-burgundy transition-colors">
                      <span>{isHe ? 'לפרטים' : 'Details'}</span>
                      <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 rotate-180" />
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Second Identical Set for Seamless 100% Unbroken Infinite Looping */}
            {pharmaProducts.map((prod, idx) => (
              <div 
                key={`pharma-2-${prod.id}-${idx}`}
                onClick={() => navigate(`/product/${prod.id}`)}
                className="shrink-0 w-[290px] sm:w-[320px] bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 card-3d-lift flex flex-col justify-between group"
              >
                <div className="h-56 w-full bg-slate-50 relative p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  <img 
                    src={getAssetPath(prod.image)} 
                    alt={prod.title[lang] || prod.title.en || prod.title.he} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = getAssetPath('LabOnTime Device.jpg'); }}
                  />
                  <span className={`absolute top-4 right-4 rtl:right-4 rtl:left-auto text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${prod.isProfessionalOnly ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'}`}>
                    {prod.isProfessionalOnly ? (isHe ? 'לשימוש מקצועי בלבד' : _('specs.setting') || 'Professional Only') : (isHe ? 'לשימוש עצמי' : 'Self-Use')}
                  </span>
                  {(prod.isPatented || prod.id.includes('strep') || prod.id.includes('covid-otc') || prod.id.includes('fob-b2c') || prod.id.includes('h-pylori')) && (
                    <span className="absolute top-4 left-4 rtl:left-4 rtl:right-auto text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm bg-gradient-to-r from-burgundy to-burgundy-600 text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
                      <span>
                        {prod.patentBadge 
                          ? (typeof prod.patentBadge === 'object' ? (prod.patentBadge[lang] || prod.patentBadge.he || prod.patentBadge.en) : prod.patentBadge)
                          : (isHe ? 'פטנט' : 'Patent')}
                      </span>
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base md:text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                      {prod.title[lang] || prod.title.en || prod.title.he}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-normal">
                      {prod.shortDesc[lang] || prod.shortDesc.en || prod.shortDesc.he}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-slate-400">
                      {prod.specs?.barcode ? `ברקוד: ${prod.specs.barcode}` : 'BMT OTC'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-blue-600 group-hover:text-burgundy transition-colors">
                      <span>{isHe ? 'לפרטים' : 'Details'}</span>
                      <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 rotate-180" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INNOVATION HIGHLIGHT CARDS (Autoplay set to 0 for lightweight fast load)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50" aria-labelledby="innovation-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="innovation-heading" className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
              {_('home.innovation')}
            </h2>
            <div className="w-20 h-1 bg-burgundy mx-auto rounded-full" aria-hidden="true" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">

            {/* ── Strep A Card ── */}
            <article
              className="group bg-white rounded-[2rem] shadow-sm border border-slate-200/70 relative overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 card-3d-lift"
              aria-label={isHe ? 'מוצר LabOnTime Strep A' : 'LabOnTime Strep A product'}
            >
              <div
                className="absolute top-0 right-0 bg-burgundy text-white text-[10px] font-bold px-5 py-2 rounded-bl-2xl uppercase tracking-widest z-10"
              >
                {_('home.strepBadge')}
              </div>

              <div className="w-full h-52 sm:h-60 bg-slate-900 overflow-hidden flex-shrink-0 relative">
                <iframe
                  className="w-full h-full border-0 absolute inset-0"
                  src={`https://www.youtube.com/embed/${STREP_YT_ID}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
                  title={isHe ? 'הדגמת בדיקת Strep A' : 'Strep A Test Demonstration'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  frameBorder="0"
                  loading="lazy"
                />
              </div>

              <div className="p-7 md:p-9 flex flex-col flex-grow">
                <div className="mb-4">
                  <img
                    src={getAssetPath('LabOnTime LOGO.jpg')}
                    alt="LabOnTime"
                    className="h-6 object-contain"
                    style={{ mixBlendMode: 'multiply', opacity: 0.75 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="mb-3">
                  <span className="inline-block text-[11px] font-black text-cyan-700 bg-cyan-50 border border-cyan-200/60 px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                    {isHe ? 'סוג דגימה: סוואב גרון/לוע (Throat Swab)' : 'Specimen: Throat / Pharyngeal Swab'}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 leading-snug">
                  {isHe ? 'בדיקת Strep A — הפטנט (no step)' : 'Strep A Test — Patented (no step)'}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                  {_('home.strepDesc')}
                </p>

                <div className="flex gap-3 mt-6" role="list">
                  <div className="bg-blue-50 px-4 py-3.5 rounded-2xl border border-blue-100/80 flex-1 text-center flex items-center justify-center shadow-inner">
                    <span className="text-sm sm:text-base font-black text-blue-900 leading-tight">
                      {isHe ? 'בדיקה אינטואיטיבית' : 'Intuitive Testing'}
                    </span>
                  </div>
                  <div className="bg-emerald-50 px-4 py-3.5 rounded-2xl border border-emerald-100 flex-1 text-center flex items-center justify-center shadow-inner">
                    <span className="text-sm sm:text-base font-black text-emerald-800 leading-tight">
                      {isHe ? 'ללא שלבים' : 'No Steps (Closed System)'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3">
                  <button
                    id="strep-view-details-btn"
                    onClick={() => navigate('/product/strep-a-pen')}
                    className="flex-1 bg-burgundy hover:brightness-110 text-white py-3 rounded-xl font-extrabold text-sm transition focus:outline-none btn-bouncy"
                  >
                    {_('product.view')}
                  </button>
                  <button
                    id="strep-rfq-btn"
                    onClick={onOpenRfq}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-xl font-extrabold text-sm transition focus:outline-none btn-bouncy"
                  >
                    {_('nav.quote')}
                  </button>
                </div>
              </div>
            </article>

            {/* ── FOB Card ── */}
            <article
              className="group bg-white rounded-[2rem] shadow-sm border border-slate-200/70 relative overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 card-3d-lift"
              aria-label={isHe ? 'מוצר FOB בדיקת דם סמוי' : 'FOB Colorectal Cancer Screening product'}
            >
              <div
                className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-5 py-2 rounded-bl-2xl uppercase tracking-widest z-10"
              >
                {_('home.fitBadge')}
              </div>

              <div className="w-full h-52 sm:h-60 bg-slate-900 overflow-hidden flex-shrink-0 relative">
                <iframe
                  className="w-full h-full border-0 absolute inset-0"
                  src={`https://www.youtube.com/embed/${FOB_YT_ID}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
                  title={isHe ? 'הדגמת בדיקת FOB דם סמוי בצואה' : 'FOB Colorectal Cancer Screening Demonstration'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  frameBorder="0"
                  loading="lazy"
                />
              </div>

              <div className="p-7 md:p-9 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 leading-snug">
                  {_('home.fitTitle')}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                  {_('home.fitDesc')}
                </p>

                <div className="flex gap-3 mt-6" role="list">
                  <div className="bg-blue-50 px-4 py-3 rounded-xl border border-blue-100/80 flex-1 text-center">
                    <span className="block text-base sm:text-lg font-black text-blue-900 leading-tight mb-1">{isHe ? 'בדיקה ביתית' : 'At-Home'}</span>
                    <span className="text-[10px] font-bold text-blue-600 tracking-wider block leading-tight">{_('home.fitAcc')}</span>
                  </div>
                  <div className="bg-blue-50/60 px-4 py-3 rounded-xl border border-blue-100/50 flex-1 text-center">
                    <span className="block text-xl font-black text-blue-800 leading-none mb-1">AI</span>
                    <span className="text-[10px] font-bold text-blue-600 tracking-wider block leading-tight">{_('home.fitAi')}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3">
                  <button
                    id="fob-view-details-btn"
                    onClick={() => navigate('/product/fob-b2c')}
                    className="flex-1 bg-burgundy hover:brightness-110 text-white py-3 rounded-xl font-extrabold text-sm transition focus:outline-none btn-bouncy"
                  >
                    {_('product.view')}
                  </button>
                  <button
                    id="fob-rfq-btn"
                    onClick={onOpenRfq}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-xl font-extrabold text-sm transition focus:outline-none btn-bouncy"
                  >
                    {_('nav.quote')}
                  </button>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LATEST NEWS & ACHIEVEMENTS SECTION (Strategic Milestones)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-200/60" aria-labelledby="news-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="news-heading" className="text-3xl md:text-[2.75rem] font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
              {isHe ? 'חדשות ואבני דרך בפעילות חברת BMT' : 'Latest News & Corporate Milestones'}
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {isHe 
                ? 'סקירת הפטנטים האחרונים, אישורי משרד הבריאות והאינטגרציות הדיגיטליות של BMT לשמירה על בריאות הציבור.' 
                : 'Oversight on recent global patents, Ministry of Health clearances, and digital health integrations.'}
            </p>
            <div className="w-16 h-1 bg-burgundy mx-auto mt-6 rounded-full" aria-hidden="true" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Milestones Card 1: Global Patent */}
            <article className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between group card-3d-lift">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={getAssetPath('Patent cover.jpeg')} 
                    alt="BMT Patent Cover" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute top-4 right-4 rtl:right-4 rtl:left-auto left-auto bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">
                    {isHe ? 'פטנט עולמי רשום' : 'Global Patent'}
                  </div>
                  <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto left-auto text-white text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    May 2026
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {isHe ? 'אישור פטנט בינלאומי נוסף למערכת no step' : 'New Patent Granted for "no step" Platform'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {isHe 
                      ? 'אישור פטנט רשמי נוסף באירופה וארה"ב המגן על פלטפורמת האבחון המהירה המקטינה זיהומים ביולוגיים באבחון מהיר בנקודת הטיפול.' 
                      : 'Official patent approval secured in the US and Europe protecting our self-contained rapid testing platform designed to reduce biohazard exposure at point-of-care.'}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0">
                <button 
                  onClick={() => navigate('/tech')}
                  className="w-full inline-flex items-center justify-center gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider bg-blue-50 hover:bg-blue-600 hover:text-white py-3 rounded-2xl transition-all duration-300 btn-bouncy"
                >
                  <span>{isHe ? 'לפרטי הפטנט והטכנולוגיה' : 'View Patent Specs'}</span>
                  <ArrowLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
                </button>
              </div>
            </article>

            {/* Milestones Card 2: Regulatory Approvals */}
            <article className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between group card-3d-lift">
              <div>
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 p-6 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/30 flex items-center gap-4 max-w-xs group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={getAssetPath('moh-logo.png')} 
                      alt="משרד הבריאות אמ-ר" 
                      className="h-14 w-auto object-contain shrink-0"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="text-start">
                      <div className="text-xs font-black text-slate-900 leading-tight">משרד הבריאות</div>
                      <div className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider mt-0.5">אישורי אמ"ר רשמיים</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 rtl:right-4 rtl:left-auto left-auto bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">
                    {isHe ? 'אישור אמ"ר רשמי' : 'MOH Clearance'}
                  </div>
                  <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto left-auto text-white text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    April 2026
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-emerald-600 transition-colors">
                    {isHe ? 'אישורי אמ"ר (משרד הבריאות) לבדיקות משולבות' : 'Ministry of Health (MOH) Clearances'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {isHe 
                      ? 'התרחבות משמעותית בסל הבדיקות המאושרות לשיווק: קבלת אישורי משרד הבריאות הישראלי לסדרה נרחבת של בדיקות ביתיות.' 
                      : 'Significant expansion of our certified portfolio: standard regulatory approval secured from the Israeli MOH for an extensive suite of home testing kits.'}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0">
                <button 
                  onClick={() => navigate('/catalog/b2b')}
                  className="w-full inline-flex items-center justify-center gap-2 text-emerald-700 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 hover:bg-emerald-600 hover:text-white py-3 rounded-2xl transition-all duration-300 btn-bouncy"
                >
                  <span>{isHe ? 'לקטלוג המאושר' : 'View Certified Tests'}</span>
                  <ArrowLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
                </button>
              </div>
            </article>

            {/* Milestones Card 3: EMR & AI Integration */}
            <article className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col justify-between group card-3d-lift">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={getAssetPath('home-main-image.png')} 
                    alt="Digital Health Integration" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute top-4 right-4 rtl:right-4 rtl:left-auto left-auto bg-burgundy/90 backdrop-blur-md text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">
                    {isHe ? 'Digital Health AI' : 'EMR Integration'}
                  </div>
                  <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto left-auto text-white text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    March 2026
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-burgundy transition-colors">
                    {isHe ? 'שילוב פתרונות FIT דיגיטליים במרכזים רפואיים' : 'New Digital Health Clinic Integrations'}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">
                    {isHe 
                      ? 'השלמת פיילוט אינטגרציה רחב עם קופות החולים. בדיקות ה-FIT הביתיות מתחברות כעת ישירות ובצורה מאובטחת לאפליקציית התיק הרפואי.' 
                      : 'Successful HMO pilot completed: non-invasive colon screening kits now transmit direct, secure AI-verified results to the medical record systems.'}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0">
                <button 
                  onClick={() => navigate('/tech')}
                  className="w-full inline-flex items-center justify-center gap-2 text-burgundy font-extrabold text-xs uppercase tracking-wider bg-burgundy/5 hover:bg-burgundy hover:text-white py-3 rounded-2xl transition-all duration-300 btn-bouncy"
                >
                  <span>{isHe ? 'לקריאה על אינטגרציית AI' : 'Explore Digital Health'}</span>
                  <ArrowLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STRATEGIC PARTNERSHIPS MARQUEE (BOTTOM POSITION)
          ═══════════════════════════════════════════════════════ */}
      <section 
        className="bg-slate-50/70 py-16 border-b border-slate-200/80 overflow-hidden relative" 
        aria-label={isHe ? 'שותפים רגולטוריים ועסקיים' : 'Strategic Partners & Regulators'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full inline-block mb-2">
            {isHe ? 'פיקוח רגולטורי ושותפויות קליניות מובילות' : 'Regulatory Oversight & Strategic Health Ecosystems'}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1 mb-2">
            {isHe ? 'שותפויות אסטרטגיות וגופי בריאות מובילים' : 'Strategic Partnerships & Health Leaders'}
          </h2>
          <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">
            {isHe ? 'חברת BMT Diagnostics פועלת בשיתוף פעולה הדוק עם קופות החולים, רשתות הפארם המובילות וגופי הבריאות בישראל' : 'Working closely with leading HMOs, retail pharmacy chains and Israeli medical centers'}
          </p>
        </div>

        {/* The Carousel Marquee Wrapper */}
        <div className="w-full relative py-4" dir="ltr">
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-25 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-25 pointer-events-none" />

          <div className="animate-infinite-scroll flex gap-10">
            {logos.map((logo, idx) => (
              <div 
                key={`logo-1-${idx}`} 
                className="flex items-center gap-6 bg-white border border-slate-200/90 px-10 py-7 rounded-[2.5rem] shadow-lg group shrink-0 min-w-[380px] hover:border-blue-500 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 flex items-center justify-center w-32 h-32 md:w-36 md:h-36 bg-slate-50 rounded-3xl p-4 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                  {logo.imgUrl ? (
                    <img 
                      src={getAssetPath(logo.imgUrl)} 
                      alt={logo.name} 
                      className="w-full h-full object-contain transition-all duration-300 filter drop-shadow-sm"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    logo.svg
                  )}
                </div>
                <div className="text-start">
                  <div className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-snug">{logo.name}</div>
                  <div className="text-xs md:text-sm font-extrabold text-blue-600 tracking-wider uppercase mt-1.5 leading-snug">{logo.label}</div>
                </div>
              </div>
            ))}
            {logos.map((logo, idx) => (
              <div 
                key={`logo-2-${idx}`} 
                className="flex items-center gap-6 bg-white border border-slate-200/90 px-10 py-7 rounded-[2.5rem] shadow-lg group shrink-0 min-w-[380px] hover:border-blue-500 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <div className="shrink-0 flex items-center justify-center w-32 h-32 md:w-36 md:h-36 bg-slate-50 rounded-3xl p-4 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                  {logo.imgUrl ? (
                    <img 
                      src={getAssetPath(logo.imgUrl)} 
                      alt={logo.name} 
                      className="w-full h-full object-contain transition-all duration-300 filter drop-shadow-sm"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    logo.svg
                  )}
                </div>
                <div className="text-start">
                  <div className="text-base md:text-lg font-black text-slate-900 tracking-tight leading-snug">{logo.name}</div>
                  <div className="text-xs md:text-sm font-extrabold text-blue-600 tracking-wider uppercase mt-1.5 leading-snug">{logo.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HIGH-END GLOBAL SCALING & CUSTOM OEM SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" aria-labelledby="partnerships-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 xl:gap-16 items-stretch">

            {/* OEM Feature Card 1 */}
            <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 card-3d-lift flex flex-col justify-between group">
              <div>
                <div className="h-52 w-full relative overflow-hidden bg-slate-900">
                  <img 
                    src={getAssetPath('Gemini_Generated_Image_izsl9zizsl9zizsl.png')} 
                    alt="BMT R&D Manufacturing Capabilities" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = getAssetPath('home-main-image.png'); }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                    {isHe ? 'תשתיות ייצור ופיתוח גלובליות' : 'Global R&D Facilities'}
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h2 id="partnerships-heading" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    {_('home.quality')}
                  </h2>
                  <p className="text-slate-600 leading-relaxed font-normal">{_('home.qualityDesc')}</p>
                </div>
              </div>
              <div className="p-8 md:p-10 pt-0">
                <button
                  id="about-learn-more-btn"
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 text-blue-600 font-extrabold hover:text-blue-700 bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 transition-all btn-bouncy"
                >
                  {isHe ? 'קרא עוד על יכולות הייצור' : 'Learn More'}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* OEM Feature Card 2 */}
            <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 card-3d-lift flex flex-col justify-between group">
              <div>
                <div className="h-52 w-full relative overflow-hidden bg-slate-900">
                  <img 
                    src={getAssetPath('Gemini_Generated_Image_ohxmz9ohxmz9ohxm.png')} 
                    alt="BMT Custom OEM Solutions" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = getAssetPath('Patent cover.jpeg'); }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-4 right-4 rtl:right-4 rtl:left-auto bg-burgundy text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                    {isHe ? 'שותפויות OEM ופיתוח מותאם' : 'Custom OEM Partnerships'}
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">{_('home.oem')}</h2>
                  <p className="text-slate-600 leading-relaxed font-normal">{_('home.oemDesc')}</p>
                </div>
              </div>
              <div className="p-8 md:p-10 pt-0">
                <button
                  id="oem-rfq-btn"
                  onClick={onOpenRfq}
                  className="inline-flex items-center gap-2 text-burgundy font-extrabold hover:brightness-110 bg-burgundy/5 px-6 py-3 rounded-2xl border border-burgundy/10 transition-all btn-bouncy"
                >
                  {_('nav.quote')}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
