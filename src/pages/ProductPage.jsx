import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, ArrowRight, FileText, Mail, PlayCircle, 
  Users, Activity, Beaker, FileBadge, Microscope,
  Smartphone, ShieldCheck, CheckCircle2, Clock, XCircle, Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';
import { CategoryIcons } from '../components/ProductCard';
import { getAssetPath } from '../utils/imagePath';

export default function ProductPage({ onOpenRfq }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, _, isRtl } = useLanguage();
  const isHe = lang === 'he';

  const p = productsDatabase.find(prod => prod.id === id);

  if (!p) {
    return (
      <div className="py-24 text-center text-slate-500">
        <h2 className="text-3xl font-extrabold mb-4">{isHe ? 'המוצר לא נמצא' : 'Product Not Found'}</h2>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold">
          {isHe ? 'חזרה לעמוד הבית' : 'Go to Homepage'}
        </button>
      </div>
    );
  }

  const youtubeId = p.youtubeId;

  const isPlaceholder = p.image.startsWith('Placeholder');
  const Icon = isPlaceholder ? (CategoryIcons[p.image] || Microscope) : Microscope;

  const productTitle = p.title[lang] || p.title.en || p.title.he;
  const productDesc = p.shortDesc[lang] || p.shortDesc.en || p.shortDesc.he;

  return (
    <div className="animate-fade-in bg-white pb-24">
      <Helmet>
        <title>{`${productTitle} | BMT Diagnostics`}</title>
        <meta name="description" content={productDesc} />
        <meta property="og:title" content={`${productTitle} | BMT Diagnostics`} />
        <meta property="og:description" content={productDesc} />
        <meta property="og:image" content={isPlaceholder ? '/BMT Logo.jpg' : `/${p.image}`} />
        <meta name="keywords" content={`Rapid Diagnostic Tests, BMT Diagnostics, POC, ${productTitle}`} />
      </Helmet>

      {/* Navigation breadcrumbs bar */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-4 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 text-sm font-semibold text-slate-500">
          <button 
            onClick={() => navigate(`/catalog/${Array.isArray(p.category) ? p.category[0] : p.category}`)} 
            className="hover:text-blue-700 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />} 
            {_('product.back')}
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-bold bg-slate-200/50 px-4 py-2 rounded-xl">
            {productTitle}
          </span>
        </div>
      </div>

      {/* Main product presentation */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
        <div aria-hidden="true" className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Images Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white border border-slate-200/80 shadow-xl rounded-[3rem] p-10 mb-6 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              {isPlaceholder ? (
                 <div className="text-center opacity-40 group-hover:scale-105 transition duration-700">
                   <Icon className="w-24 h-24 mx-auto text-blue-900 mb-6" strokeWidth={1.5}/>
                   <div className="font-extrabold tracking-widest uppercase text-xl text-blue-900">BMT Diagnostics</div>
                 </div>
              ) : (
                 <img src={getAssetPath(p.image)} className="max-h-[350px] max-w-full object-contain group-hover:scale-103 transition duration-500 ease-out shadow-sm rounded-2xl" alt={productTitle} onError={(e) => { e.target.style.display = 'none'; }} />
              )}
            </div>
            {p.img2 && !isPlaceholder && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50/50 border border-slate-200/80 rounded-[2rem] p-6 h-40 flex items-center justify-center shadow-sm">
                  <img src={getAssetPath(p.img2)} className="max-h-full object-contain hover:scale-103 transition duration-500 rounded-xl" alt="Angle 2" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div className="bg-slate-50/50 border border-slate-200/80 rounded-[2rem] p-6 h-40 flex items-center justify-center shadow-sm">
                  <img src={getAssetPath(p.image)} className="max-h-full object-contain hover:scale-103 transition duration-500 rounded-xl" alt="Angle 1" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              </div>
            )}
          </div>
          
          {/* Product description and Specs */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {p.id.includes('strep-a-pen') && (
              <img src={getAssetPath('LabOnTime LOGO.jpg')} className="h-8 mb-8 object-contain object-left opacity-80 mix-blend-multiply" alt="LabOnTime" onError={(e)=>{e.target.style.display='none'}}/>
            )}
            
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest w-fit shadow-sm border border-blue-100">
                 {_(`catalog.cat${p.subCat}`) || p.subCat}
              </div>

              {(p.isPatented || p.patentBadge || p.id.includes('strep') || p.id.includes('covid-otc') || p.id.includes('fob-b2c') || p.id.includes('h-pylori')) && (
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-burgundy to-burgundy-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest w-fit shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
                  <span>
                    {p.patentBadge 
                      ? (typeof p.patentBadge === 'object' ? (p.patentBadge[lang] || p.patentBadge.he || p.patentBadge.en) : p.patentBadge)
                      : _('product.patentBadge')}
                  </span>
                </div>
              )}
              
              {p.isProfessionalOnly ? (
                <div className="inline-flex items-center gap-2 bg-blue-900/10 text-blue-950 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest w-fit shadow-sm border border-blue-900/20">
                  {_('product.professionalOnly')}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-800 px-5 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest w-fit shadow-sm border border-emerald-500/20">
                  {_('product.selfUse')}
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{productTitle}</h1>
            <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed font-light">{productDesc}</p>
            
            {p.specs && (
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 mb-12 shadow-md relative overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.01] rounded-full blur-[40px] pointer-events-none" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-blue-600"/> 
                  {_('product.specs')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                  {Object.entries(p.specs).map(([key, value]) => {
                    const specValue = typeof value === 'object' ? (value[lang] || value.en || value.he) : (_(`specsVal.${value}`) || value);
                    return (
                      <div key={key} className="min-w-0 break-words border-b border-slate-100 pb-4 sm:border-0 sm:pb-0">
                        <div className="text-2xl font-black text-slate-900 leading-none mb-2 tracking-tight">{specValue}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{_(`specs.${key}`) || key}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inquiry/RFQ trigger button */}
            <button 
              onClick={onOpenRfq} 
              className="bg-burgundy text-white px-8 py-5 rounded-full font-extrabold hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3 text-lg group focus:outline-none focus:ring-4 focus:ring-burgundy/30 btn-bouncy"
            >
              <Mail className="w-5 h-5 group-hover:scale-105 transition-transform"/> {_('product.contact')}
            </button>

          </div>
        </div>
      </div>

      {/* Centered Video Showcase Section */}
      {(youtubeId || p.videoFile) && (
        <div className="bg-slate-50 py-20 md:py-28 border-y border-slate-200/60 mt-12 relative overflow-hidden">
          <div aria-hidden="true" className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <PlayCircle className="w-8 h-8 text-burgundy" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{_('product.video')}</h2>
              <div className="w-12 h-1 bg-burgundy mx-auto mt-5 rounded-full" />
            </div>
            
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 p-2 md:p-3">
              {youtubeId ? (
                <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                    title="Product Demonstration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : p.videoFile ? (
                <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden">
                  <video controls className="w-full h-full object-cover" poster={!isPlaceholder ? p.image : undefined}>
                     <source src={p.videoFile} type="video/mp4" />
                  </video>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          FOB SPECIAL INNOVATION SHOWCASE: APP-LEVEL PATENT FOR HMOS
          (Replaces the outdated comparison table with a stunning flow)
          ═══════════════════════════════════════════════════════════════ */}
      {p.id === 'fob-b2c' && (
        <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 py-24 border-t border-slate-200/80 mt-12 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {_('product.fobSectionBadge')}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {_('product.fobSectionTitle')}
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                {_('product.fobSectionSub')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Old Traditional Lab Process Card */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-red-100 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-red-600 font-extrabold text-sm uppercase tracking-wider mb-6">
                    <XCircle className="w-5 h-5" />
                    <span>{_('product.fobOldTag')}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-6">
                    {_('product.fobOldH3')}
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-500 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                      <span>{_('product.fobOld1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                      <span>{_('product.fobOld2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                      <span>{_('product.fobOld3')}</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-slate-400 text-xs">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span>{_('product.fobOldDuration')}</span>
                </div>
              </div>

              {/* BMT Innovative App Solution Card */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-3 text-sky-400 font-extrabold text-sm uppercase tracking-wider mb-6">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{_('product.fobBmtTag')}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6">
                    {_('product.fobBmtH3')}
                  </h3>
                  <ul className="space-y-4 text-sm text-slate-200 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                      <span>{_('product.fobBmt1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                      <span>{_('product.fobBmt2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0 mt-0.5">✓</span>
                      <span>{_('product.fobBmt3')}</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sky-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-sky-400" />
                    <span>{_('product.fobBmtDuration')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{_('product.fobBmtNoLab')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B2B Workflows Comparison Matrix for other products */}
      {p.comparison && (
        <div className="bg-white py-24 text-slate-800 mt-10 relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,94,173,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,94,173,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-md">
                 <FileBadge className="w-10 h-10 text-blue-600"/>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{_('product.comparison')}</h2>
              <p className="text-slate-650 text-xl max-w-2xl mx-auto font-light leading-relaxed">{_('product.compSub')}</p>
            </div>
            
            <div className="bg-white rounded-[3rem] border border-slate-200/80 p-4 md:p-12 overflow-x-auto shadow-md">
              <table className="w-full text-start border-collapse min-w-[700px]">
                <thead>
                  <tr>
                    <th className="p-6 text-slate-500 font-extrabold tracking-widest uppercase text-xs md:text-sm border-b border-slate-150 w-1/3 text-start">{_('product.metric')}</th>
                    <th className="p-6 font-black text-2xl md:text-3xl text-blue-900 bg-blue-50/60 rounded-t-3xl border-b border-blue-100 text-center tracking-tight w-1/3 shadow-sm">{_('product.us')}</th>
                    <th className="p-6 text-slate-500 font-extrabold tracking-widest uppercase text-xs md:text-sm border-b border-slate-150 text-center w-1/3">{_('product.them')}</th>
                  </tr>
                </thead>
                <tbody className="font-semibold text-slate-800">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 md:p-10 border-b border-slate-100 flex items-center gap-5 text-lg text-start"><Users className="w-6 h-6 text-blue-600 shrink-0"/> {_('product.handsOn')}</td>
                    <td className="p-6 md:p-10 font-black text-5xl text-blue-900 bg-blue-50/60 border-b border-blue-100 text-center">
                      {p.comparison.us.steps === 'no step' ? _('specsVal.noStep') : p.comparison.us.steps}
                    </td>
                    <td className="p-6 md:p-10 text-slate-500 border-b border-slate-100 text-center text-xl font-bold">{p.comparison.them.steps}</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 md:p-10 border-b border-slate-100 flex items-center gap-5 text-lg text-start"><Activity className="w-6 h-6 text-blue-600 shrink-0"/> {_('product.time')}</td>
                    <td className="p-6 md:p-10 font-black text-3xl text-blue-900 bg-blue-50/60 border-b border-blue-100 text-center">{p.comparison.us.time}</td>
                    <td className="p-6 md:p-10 text-slate-500 border-b border-slate-100 text-center text-xl font-bold">{p.comparison.them.time}</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 md:p-10 flex items-center gap-5 text-lg text-start"><Beaker className="w-6 h-6 text-blue-600 shrink-0"/> {_('product.risk')}</td>
                    <td className="p-6 md:p-10 font-black text-emerald-600 bg-blue-50/60 rounded-b-3xl text-center text-xl shadow-inner">{_('product.zeroTransfers')}</td>
                    <td className="p-6 md:p-10 text-burgundy text-center font-black text-xl">{_('product.fourTransfers')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
