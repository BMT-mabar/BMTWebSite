import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Factory, TestTube, Briefcase, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { lang, _ } = useLanguage();

  const title = _('about.title');
  const sub = _('about.sub');

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

      {/* Hero Header Banner */}
      <div className="bg-slate-900 text-white py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-blue-900/30 mix-blend-overlay"></div>
        <img src="home-main-image.png" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"/>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight drop-shadow-2xl tracking-tight">{title}</h1>
          <p className="text-xl md:text-3xl text-blue-50 font-light leading-relaxed drop-shadow-md">{sub}</p>
        </div>
      </div>

      {/* Core Company Strengths Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-[-80px] relative z-20">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 mb-32">
          {/* Strength 1 */}
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-500 group">
             <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-red-800 shadow-inner group-hover:scale-110 transition-transform">
                <Factory className="w-12 h-12"/>
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{_('about.c1Title')}</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{_('about.c1Desc')}</p>
          </div>
          {/* Strength 2 */}
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-500 group">
             <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                <TestTube className="w-12 h-12"/>
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{_('about.c2Title')}</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{_('about.c2Desc')}</p>
          </div>
          {/* Strength 3 */}
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-xl border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-500 group">
             <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                <Briefcase className="w-12 h-12"/>
             </div>
             <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{_('about.c3Title')}</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{_('about.c3Desc')}</p>
          </div>
        </div>
        
        {/* Executive Management Profiles Section */}
        <div className="bg-slate-50 rounded-[4rem] p-12 md:p-24 border border-slate-200 relative overflow-hidden shadow-inner">
           <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800/5 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
           
           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-20 text-center relative z-10 tracking-tight">{_('about.team')}</h2>
           <div className="grid md:grid-cols-2 gap-12 lg:gap-20 relative z-10">
             
             {/* Profile Card: Nili Tamir */}
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

             {/* Profile Card: Dr. Idan Tamir */}
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
}
