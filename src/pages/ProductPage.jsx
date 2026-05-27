import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, ArrowRight, FileText, Mail, PlayCircle, 
  Users, Activity, Beaker, FileBadge, Microscope,
  HeartPulse, Target, Fingerprint, Droplet, Crosshair 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import productsDatabase from '../data/productsDatabase';
import { CategoryIcons } from '../components/ProductCard';

export default function ProductPage({ onOpenRfq }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, _, isRtl } = useLanguage();

  const p = productsDatabase.find(prod => prod.id === id);

  if (!p) {
    return (
      <div className="py-24 text-center text-slate-500">
        <h2 className="text-3xl font-extrabold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold">
          Go to Homepage
        </button>
      </div>
    );
  }

  // Check if product is Strep A pen or FOB and map their YouTube IDs
  const youtubeId = p.id === 'strep-a-pen' ? 'x92STpm-v9w' : p.id === 'fob-b2b' ? '51ECod0uUy4' : p.youtubeId;

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
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 text-sm font-medium text-slate-500">
          <button 
            onClick={() => navigate(`/catalog/${p.category}`)} 
            className="hover:text-blue-700 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm"
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
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Images Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-[3rem] p-10 mb-6 border border-slate-200/60 flex items-center justify-center min-h-[400px] shadow-xl relative overflow-hidden group">
              {isPlaceholder ? (
                 <div className="text-center opacity-30 group-hover:scale-110 transition duration-700">
                   <Icon className="w-32 h-32 mx-auto text-blue-900 mb-6" strokeWidth={1.5}/>
                   <div className="font-extrabold tracking-widest uppercase text-xl text-blue-900">BMT Diagnostics</div>
                 </div>
              ) : (
                 <img src={p.image} className="max-h-[350px] object-contain drop-shadow-2xl mix-blend-multiply group-hover:scale-105 transition duration-700 ease-out" alt="Product Main" />
              )}
            </div>
            {p.img2 && !isPlaceholder && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 h-40 flex items-center justify-center shadow-md hover:shadow-xl transition duration-300">
                  <img src={p.img2} className="max-h-full mix-blend-multiply object-contain hover:scale-105 transition duration-500" alt="Angle 2"/>
                </div>
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 h-40 flex items-center justify-center shadow-md hover:shadow-xl transition duration-300">
                  <img src={p.image} className="max-h-full mix-blend-multiply object-contain hover:scale-105 transition duration-500" alt="Angle 1"/>
                </div>
              </div>
            )}
          </div>
          
          {/* Product description and Specs */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {p.id.includes('strep-a-pen') && (
              <img src="LabOnTime LOGO.jpg" className="h-8 mb-8 object-contain object-left opacity-80" alt="LabOnTime" onError={(e)=>{e.target.style.display='none'}}/>
            )}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-6 shadow-sm border border-blue-100">
               {_(`catalog.cat${p.subCat}`)}
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{productTitle}</h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light">{productDesc}</p>
            
            {p.specs && (
              <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2rem] p-8 md:p-10 mb-12">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2"><FileText className="w-4 h-4"/> {_('product.specs')}</h4>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                  {Object.entries(p.specs).map(([key, value]) => {
                    const specValue = typeof value === 'object' ? (value[lang] || value.en || value.he) : value;
                    return (
                      <div key={key}>
                        <div className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-2">{specValue}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{_(`specs.${key}`)}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Inquiry/RFQ trigger button */}
            <button 
              onClick={onOpenRfq} 
              className="bg-red-800 text-white px-8 py-5 rounded-2xl font-extrabold hover:bg-red-900 transition-all duration-300 shadow-xl hover:shadow-red-900/30 text-center flex items-center justify-center gap-3 text-lg group focus:outline-none focus:ring-4 focus:ring-red-800/30"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform"/> {_('product.contact')}
            </button>

            {/* Video Player Section: Pre-configured YouTube embed takes priority */}
            {youtubeId ? (
              <div className="mt-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group relative">
                <div className="absolute top-0 left-0 right-0 bg-slate-800/80 backdrop-blur-md text-white px-8 py-5 text-sm font-bold flex items-center gap-3 border-b border-white/10 tracking-wider z-10">
                   <PlayCircle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform"/> {_('product.video')}
                </div>
                <div className="w-full aspect-video pt-16">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                    title="Product Demonstration"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : p.videoFile ? (
              <div className="mt-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group relative">
                <div className="absolute top-0 left-0 right-0 bg-slate-800/80 backdrop-blur-md text-white px-8 py-5 text-sm font-bold flex items-center gap-3 border-b border-white/10 tracking-wider z-10">
                   <PlayCircle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform"/> {_('product.video')}
                </div>
                <video controls className="w-full h-auto aspect-video object-cover pt-16" poster={!isPlaceholder ? p.image : undefined}>
                   <source src={p.videoFile} type="video/mp4" />
                </video>
              </div>
            ) : null}

          </div>
        </div>
      </div>

      {/* B2B Workflows Comparison Matrix */}
      {p.comparison && (
        <div className="bg-slate-900 py-24 text-white mt-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-800/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                 <FileBadge className="w-10 h-10 text-blue-400"/>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">{_('product.comparison')}</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">{_('product.compSub')}</p>
            </div>
            
            <div className="bg-white/5 rounded-[3rem] border border-white/10 p-4 md:p-12 backdrop-blur-xl overflow-x-auto shadow-2xl">
              <table className="w-full text-start border-collapse min-w-[700px]">
                <thead>
                  <tr>
                    <th className="p-6 text-slate-400 font-bold tracking-widest uppercase text-xs md:text-sm border-b border-white/10 w-1/3">{_('product.metric')}</th>
                    <th className="p-6 font-black text-2xl md:text-3xl text-white bg-blue-600/20 rounded-t-3xl border-b border-blue-500/30 text-center shadow-inner tracking-tight w-1/3">{_('product.us')}</th>
                    <th className="p-6 text-slate-400 font-bold tracking-widest uppercase text-xs md:text-sm border-b border-white/10 text-center w-1/3">{_('product.them')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-6 md:p-10 font-bold text-slate-200 border-b border-white/5 flex items-center gap-5 text-xl"><Users className="w-8 h-8 text-slate-500"/> {_('product.handsOn')}</td>
                    <td className="p-6 md:p-10 font-black text-5xl text-emerald-400 bg-blue-600/20 border-b border-blue-500/20 text-center shadow-inner">{p.comparison.us.steps}</td>
                    <td className="p-6 md:p-10 text-slate-400 border-b border-white/5 text-center text-3xl font-bold">{p.comparison.them.steps}</td>
                  </tr>
                  <tr>
                    <td className="p-6 md:p-10 font-bold text-slate-200 border-b border-white/5 flex items-center gap-5 text-xl"><Activity className="w-8 h-8 text-slate-500"/> {_('product.time')}</td>
                    <td className="p-6 md:p-10 font-bold text-3xl text-emerald-400 bg-blue-600/20 border-b border-blue-500/20 text-center shadow-inner">{p.comparison.us.time}</td>
                    <td className="p-6 md:p-10 text-slate-400 border-b border-white/5 text-center text-3xl font-bold">{p.comparison.them.time}</td>
                  </tr>
                  <tr>
                    <td className="p-6 md:p-10 font-bold text-slate-200 flex items-center gap-5 text-xl"><Beaker className="w-8 h-8 text-slate-500"/> {_('product.risk')}</td>
                    <td className="p-6 md:p-10 font-bold text-emerald-400 bg-blue-600/20 rounded-b-3xl text-center shadow-inner text-2xl">{_('product.zeroTransfers')}</td>
                    <td className="p-6 md:p-10 text-red-400 text-center font-bold text-2xl">{_('product.fourTransfers')}</td>
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
