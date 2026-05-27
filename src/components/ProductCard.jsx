import React from 'react';
import { Microscope, HeartPulse, Target, Fingerprint, Droplet, Crosshair, ArrowRight, ArrowLeft } from 'lucide-react';

// --- CATEGORY ICONS MAPPING ---
export const CategoryIcons = {
  Placeholder_Virus: Microscope,
  Placeholder_Heart: HeartPulse,
  Placeholder_Tumor: Target,
  Placeholder_Doa: Fingerprint,
  Placeholder_Urine: Droplet,
  Placeholder_Other: Crosshair
};

export default function ProductCard({ prod, lang, isRtl, _, nav }) {
  const isPlaceholder = prod.image.startsWith('Placeholder');
  const Icon = isPlaceholder ? (CategoryIcons[prod.image] || Microscope) : Microscope;

  return (
    <button 
      onClick={() => nav('product', prod)} 
      className="text-start group bg-white/70 backdrop-blur-md rounded-[2rem] shadow-md hover:shadow-2xl border border-slate-200/60 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/30 w-full h-full"
      aria-label={`View details for ${prod.title[lang] || prod.title.en || prod.title.he}`}
    >
      <div className="h-60 w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8 relative border-b border-slate-100/50">
        {isPlaceholder ? (
          <div className="text-center opacity-30 group-hover:opacity-80 transition duration-500 transform group-hover:scale-110">
            <Icon className="w-20 h-20 mx-auto text-blue-900 mb-4 drop-shadow-sm" strokeWidth={1.5} />
            <div className="font-extrabold text-blue-900 tracking-widest text-xs uppercase">BMT Diagnostics</div>
          </div>
        ) : (
          <img src={prod.image} alt={prod.id} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-700 ease-out" />
        )}
        {prod.id.includes('strep-a-pen') && <div className="absolute top-4 right-4 bg-gradient-to-r from-red-800 to-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">Patent</div>}
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-white z-10">
        <h3 className="text-lg md:text-xl font-extrabold text-slate-800 mb-3 line-clamp-2 leading-snug">{prod.title[lang] || prod.title.en || prod.title.he}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">{prod.shortDesc[lang] || prod.shortDesc.en || prod.shortDesc.he}</p>
        <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-auto">
          {prod.specs && Object.keys(prod.specs)[0] && (
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">{_(`specs.${Object.keys(prod.specs)[0]}`)}</span>
          )}
          <span className={`font-bold text-sm flex items-center gap-1 transition-all ${isRtl ? 'flex-row-reverse' : ''} text-blue-700 group-hover:text-red-800 group-hover:gap-2 bg-blue-50/50 group-hover:bg-red-50 px-3 py-1.5 rounded-lg`}>
            {_('product.back').split(' ')[0]} {isRtl ? <ArrowLeft className="w-4 h-4"/> : <ArrowRight className="w-4 h-4"/>}
          </span>
        </div>
      </div>
    </button>
  );
}
