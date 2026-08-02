import React from 'react';
import { Microscope, HeartPulse, Target, Fingerprint, Droplet, Crosshair, ArrowRight, ArrowLeft } from 'lucide-react';
import { getAssetPath } from '../utils/imagePath';

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
  const specimenType = prod.specs?.type;

  return (
    <button 
      onClick={() => nav('product', prod)} 
      className="text-start group bg-white rounded-[2.5rem] shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-blue-300/80 overflow-hidden transition-all duration-500 card-3d-lift flex flex-col focus:outline-none focus:ring-4 focus:ring-blue-500/10 w-full h-full relative"
      aria-label={`View details for ${prod.title[lang] || prod.title.en || prod.title.he}`}
    >
      <div className="h-60 w-full overflow-hidden bg-gradient-to-b from-slate-50/80 to-blue-50/20 flex items-center justify-center p-8 relative border-b border-slate-100/80">
        {isPlaceholder ? (
          <div className="text-center opacity-30 group-hover:opacity-85 transition duration-500 transform group-hover:scale-105">
            <Icon className="w-16 h-16 mx-auto text-blue-900 mb-3" strokeWidth={1.5} />
            <div className="font-extrabold text-blue-900 tracking-widest text-[10px] uppercase">BMT Diagnostics</div>
          </div>
        ) : (
          <img 
            src={getAssetPath(prod.image)} 
            alt={prod.id} 
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500 ease-out shadow-sm rounded-xl"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        )}
        
        {/* Patent / Innovation Badge */}
        {(prod.id.includes('strep-a-pen') || prod.id.includes('flu-ab')) && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-burgundy to-burgundy-600 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>
            Patent
          </div>
        )}

        {/* Usage Classification Badge */}
        {prod.isProfessionalOnly ? (
          <div className="absolute top-4 left-4 bg-blue-900/10 border border-blue-900/20 text-blue-950 text-[10px] font-black px-3 py-1 rounded-full shadow-sm tracking-wider">
            {lang === 'he' ? 'לשימוש מקצועי בלבד' : lang === 'de' ? 'Nur für Fachpersonal' : lang === 'fr' ? 'Usage professionnel' : lang === 'ru' ? 'Для профессионалов' : lang === 'ar' ? 'للاستخدام المهني' : 'Professional Use'}
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full shadow-sm tracking-wider">
            {lang === 'he' ? 'לשימוש עצמי' : lang === 'de' ? 'Für Eigenanwendung' : lang === 'fr' ? 'Usage autotest' : lang === 'ru' ? 'Для дома' : lang === 'ar' ? 'للاستخدام الذاتي' : 'Self-Use'}
          </div>
        )}
      </div>

      <div className="p-7 md:p-9 flex flex-col flex-grow bg-white z-10">
        {/* Specimen Tag */}
        {specimenType && (
          <div className="mb-2">
            <span className="inline-block text-[10px] font-black text-cyan-700 bg-cyan-50 border border-cyan-200/60 px-3 py-1 rounded-lg uppercase tracking-wider">
              {typeof specimenType === 'object' ? (specimenType[lang] || specimenType.en || specimenType.he) : specimenType}
            </span>
          </div>
        )}

        <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {prod.title[lang] || prod.title.en || prod.title.he}
        </h3>
        
        <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed font-normal">
          {prod.shortDesc[lang] || prod.shortDesc.en || prod.shortDesc.he}
        </p>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto w-full">
          {prod.specs && Object.keys(prod.specs)[0] && (
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
               {_(`specs.${Object.keys(prod.specs)[0]}`)}
             </span>
          )}
          <span className={`font-extrabold text-sm flex items-center gap-1.5 transition-all ${isRtl ? 'flex-row-reverse' : ''} text-blue-600 group-hover:text-burgundy group-hover:bg-burgundy/5 px-4 py-2 rounded-xl border border-transparent group-hover:border-burgundy/10`}>
            {_('product.view')} {isRtl ? <ArrowLeft className="w-4 h-4"/> : <ArrowRight className="w-4 h-4"/>}
          </span>
        </div>
      </div>
    </button>
  );
}
