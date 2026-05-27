import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Smartphone, Globe, ShieldCheck, Microscope, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TechPage() {
  const { lang, _ } = useLanguage();

  const title = _('tech.title');
  const desc = _('tech.desc');

  return (
    <div className="animate-fade-in bg-slate-50 py-24 min-h-screen">
      <Helmet>
        <title>{`Technology | BMT Diagnostics`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content="Technology | BMT Diagnostics" />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="/LabOnTime Device.jpg" />
        <meta name="keywords" content="LabOnTime, Point of Care, Digital Health, Strep A Pen, Bio-safety, EMR Integration, MedTech" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-24">
          <div className="bg-white inline-block p-5 rounded-[2rem] shadow-sm border border-slate-100 mb-10">
            <img src="LabOnTime LOGO.jpg" alt="LabOnTime" className="h-12 md:h-16 mx-auto object-contain" onError={(e)=>{e.target.style.display='none'}}/>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">{title}</h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">{desc}</p>
        </div>

        {/* Feature Device Grid */}
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

        {/* Ecosystem Section */}
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
}
