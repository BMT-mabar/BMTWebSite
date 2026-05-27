import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ClinicalPage() {
  const { lang, _ } = useLanguage();

  const title = _('clinical.title');
  const desc = _('clinical.desc');

  return (
    <div className="animate-fade-in py-24 bg-white min-h-screen">
      <Helmet>
        <title>{`Scientific Validation | BMT Diagnostics`}</title>
        <meta name="description" content={desc} />
        <meta property="og:title" content="Scientific Validation | BMT Diagnostics" />
        <meta property="og:description" content={desc} />
        <meta name="keywords" content="Clinical Validation, Strep A Research, Heliyon, Tzafon Medical Center, Rapid Test Study, MedTech Validation" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-sm border border-blue-100">
             <FileText className="w-12 h-12"/>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">{title}</h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">{desc}</p>
        </div>

        {/* Validations Row */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Study 1: Tzafon Medical Center */}
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
             
             {/* Note: Clicking this triggers direct PDF download from /public folder */}
             <a 
               href="One Pager LabOnTime.pdf" 
               download
               className="bg-white border-2 border-slate-200 text-slate-800 font-bold px-8 py-5 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center gap-3 mt-auto w-full md:w-auto shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-slate-900/30 text-center"
             >
                <Download className="w-6 h-6"/> {_('clinical.c1Btn')}
             </a>
          </div>

          {/* Study 2: Heliyon Journal */}
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
             
             <a 
               href="https://www.cell.com/heliyon/fulltext/S2405-8440(24)00213-9" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-white border-2 border-slate-200 text-slate-800 font-bold px-8 py-5 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 flex items-center justify-center gap-3 mt-auto w-full md:w-auto shadow-sm text-lg focus:outline-none focus:ring-4 focus:ring-slate-900/30 text-center"
             >
                <Globe className="w-6 h-6"/> {_('clinical.c2Btn')}
             </a>
          </div>
        </div>

      </div>
    </div>
  );
}
