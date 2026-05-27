import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Microscope, Activity, Award, Factory, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';

export default function HomePage({ onOpenRfq }) {
  const { lang, _ } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>{_('seo.title')}</title>
        <meta name="description" content={_('seo.desc')} />
        <meta property="og:title" content={_('seo.title')} />
        <meta property="og:description" content={_('seo.desc')} />
        <meta property="og:image" content="/home-main-image.png" />
        <meta name="keywords" content="Rapid Diagnostic Tests, POC, BMT Diagnostics, בדיקות מהירות, Strep A, Influenza, LabOnTime, MedTech Israel" />
      </Helmet>

      {/* Hero Section */}
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
              <button 
                onClick={() => navigate('/catalog/b2b')} 
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center justify-center gap-3 group focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <Microscope className="w-5 h-5 text-red-800 group-hover:scale-110 transition-transform" /> {_('hero.btnB2b')}
              </button>
              <button 
                onClick={() => navigate('/catalog/b2c')} 
                className="bg-slate-800/40 backdrop-blur-md border border-slate-500/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center gap-3 group focus:outline-none focus:ring-4 focus:ring-slate-500/50"
              >
                <Activity className="w-5 h-5 text-blue-300 group-hover:scale-110 transition-transform" /> {_('hero.btnB2c')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white/90 backdrop-blur-lg border-b border-slate-200/60 py-10 shadow-sm relative z-20 -mt-8 mx-4 md:mx-10 rounded-[2rem]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-around gap-6 items-center text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <img src="Patent cover.jpeg" alt="Patent" className="w-6 h-6 object-cover rounded-md grayscale opacity-70"/> 
              {_('trust.pat')}
            </div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-slate-300"/> {_('trust.iso1')}</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-slate-300"/> {_('trust.iso2')}</div>
            <div className="flex items-center gap-2"><Award className="w-6 h-6 text-blue-500/80"/> {_('trust.ce')}</div>
            <div className="flex items-center gap-2"><Award className="w-6 h-6 text-blue-500/80"/> {_('trust.moh')}</div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-200/20 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{_('home.innovation')}</h2>
            <div className="w-24 h-1.5 bg-red-800 mx-auto rounded-full"></div>
          </div>
           
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Strep A Pen Highlight Card */}
            <button 
              onClick={() => navigate('/product/strep-a-pen')} 
              className="text-start group bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white relative overflow-hidden flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
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
                    <div className="bg-blue-50/60 px-4 py-3 rounded-2xl border border-blue-100/60 flex-1 text-center">
                      <span className="block text-2xl font-black text-blue-900">100%</span>
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">{_('home.strepSpec')}</span>
                    </div>
                    <div className="bg-red-50/60 px-4 py-3 rounded-2xl border border-red-100/60 flex-1 text-center">
                      <span className="block text-2xl font-black text-red-900">0</span>
                      <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">{_('home.strepTrans')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* FOB Cancer Screening Highlight Card */}
            <button 
              onClick={() => navigate('/product/fob-b2b')} 
              className="text-start group bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white relative overflow-hidden flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-600 to-cyan-500 text-white text-xs font-bold px-6 py-2.5 rounded-bl-3xl uppercase tracking-widest z-10 shadow-lg">{_('home.fitBadge')}</div>
              <div className="flex flex-col md:flex-row gap-8 items-center flex-grow">
                <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] h-full flex items-center justify-center border border-slate-100/50 shadow-inner">
                  <img src="DSC_2078.JPG" alt="FIT/FOB" className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-105 transition duration-700" />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight mt-4 md:mt-0">{_('home.fitTitle')}</h3>
                  <p className="text-slate-500 mb-8 text-sm leading-relaxed">{_('home.fitDesc')}</p>
                  <div className="flex gap-4">
                    <div className="bg-blue-50/60 px-4 py-3 rounded-2xl border border-blue-100/60 flex-1 text-center">
                      <span className="block text-2xl font-black text-blue-900">99.1%</span>
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">{_('home.fitAcc')}</span>
                    </div>
                    <div className="bg-emerald-50/60 px-4 py-3 rounded-2xl border border-emerald-100/60 flex-1 text-center">
                      <span className="block text-2xl font-black text-emerald-700">AI</span>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">{_('home.fitAi')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Global Scaling & OEM Partnerships */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Manufacturing capabilities */}
            <div className="text-center md:text-start">
              <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm md:mx-0 mx-auto">
                <Factory className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{_('home.quality')}</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light">{_('home.qualityDesc')}</p>
            </div>
            {/* Business development & OEM */}
            <div className="text-center md:text-start border-t md:border-t-0 md:border-s border-slate-200 pt-16 md:pt-0 md:ps-16 rtl:md:ps-0 rtl:md:pe-16 rtl:border-s-0 rtl:md:border-r">
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm md:mx-0 mx-auto">
                <Briefcase className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{_('home.oem')}</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-light mb-8">{_('home.oemDesc')}</p>
              <button 
                onClick={onOpenRfq} 
                className="text-blue-700 font-bold hover:text-blue-900 flex items-center gap-2 mx-auto md:mx-0 bg-blue-50 px-6 py-3 rounded-xl transition-colors hover:bg-blue-100 focus:outline-none"
              >
                {_('nav.quote')} <ArrowRight className="w-5 h-5 rtl:rotate-180"/>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
