import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function Footer() {
  const { _, isRtl } = useLanguage();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-blue-50/20 text-slate-600 overflow-hidden z-10 border-t border-slate-200">
      {/* Brand Dual Stripe Divider on top edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
      <div className="h-[2px] w-full bg-burgundy"></div>

      {/* Decorative background grid and soft clinical overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Fine clinical grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,94,173,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,94,173,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {/* Ambient clinical sky-blue highlights */}
        <div className="absolute top-0 left-1/3 w-[350px] h-[350px] bg-blue-300/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 mb-20">
          
          {/* Brand Identity & Summary */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <div className="bg-white inline-block p-5 rounded-[2rem] mb-8 shadow-md border border-slate-100 max-w-[240px]">
              <img 
                src={getAssetPath('BMT Logo.jpg')} 
                alt="BMT Diagnostics" 
                className="h-10 md:h-12 object-contain mix-blend-multiply" 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
              />
              <div style={{display:'none'}} className="text-3xl font-black text-slate-900">BMT</div>
            </div>
            <p className="text-base md:text-lg leading-relaxed max-w-md font-medium text-slate-500">
              {_('footer.desc')}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-slate-900 font-extrabold mb-8 text-sm md:text-base tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-3 bg-burgundy rounded-full"></span>
              {_('footer.linksTitle')}
            </h4>
            <ul className="space-y-4 font-bold text-base">
              <li>
                <button 
                  onClick={() => handleNav('/catalog/b2b')} 
                  className="relative py-1 text-slate-550 hover:text-blue-600 transition-colors text-start focus:outline-none group inline-flex items-center gap-1"
                >
                  <span>{_('footer.l1')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-350 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/catalog/b2c')} 
                  className="relative py-1 text-slate-550 hover:text-blue-600 transition-colors text-start focus:outline-none group inline-flex items-center gap-1"
                >
                  <span>{_('footer.l2')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-350 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/clinical')} 
                  className="relative py-1 text-slate-550 hover:text-blue-600 transition-colors text-start focus:outline-none group inline-flex items-center gap-1"
                >
                  <span>{_('footer.l3')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-350 group-hover:w-full"></span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-slate-900 font-extrabold mb-8 text-sm md:text-base tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
              {_('footer.contactTitle')}
            </h4>
            <ul className="space-y-5 font-bold text-base text-slate-500">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" /> 
                <span className="leading-snug text-slate-500">{_('footer.address')}</span>
              </li>
              <li className="flex items-center gap-4" dir="ltr">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" /> 
                <span className="text-start hover:text-blue-700 transition-colors cursor-default">{isRtl ? '+972-4-6396116' : '+972-4-6396116'}</span>
              </li>
              <li className="flex items-center gap-4" dir="ltr">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" /> 
                <a href="mailto:info@bmtdx.com" className="text-start hover:text-blue-600 transition-colors underline decoration-blue-500/30 underline-offset-4">info@bmtdx.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright framed inside pure white clinical card */}
        <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 md:p-10 shadow-sm text-sm text-slate-500 font-medium flex flex-col lg:flex-row justify-between gap-8 items-start">
          <div className="max-w-4xl">
            <p className="mb-3 uppercase font-extrabold text-slate-900 tracking-widest text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {_('footer.disclaimer')}
            </p>
            <p className="leading-relaxed text-[13px] text-slate-450 font-normal">
              {_('footer.legal')}
            </p>
          </div>
          <div className="lg:text-right shrink-0 self-end lg:self-center font-bold text-xs tracking-wider text-slate-400">
            © {new Date().getFullYear()} BMT Diagnostics.
            <span className="block mt-1 font-semibold opacity-80">{_('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
