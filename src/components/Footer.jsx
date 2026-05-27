import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { _, isRtl } = useLanguage();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-24 border-t-[8px] border-red-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 mb-20">
          {/* Brand info */}
          <div className="md:col-span-5">
            <div className="bg-white inline-block p-6 rounded-3xl mb-10 shadow-xl">
              <img 
                src="BMT Logo.jpg" 
                alt="BMT Diagnostics" 
                className="h-10 md:h-14 object-contain" 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
              />
              <div style={{display:'none'}} className="text-4xl font-black text-slate-900">BMT</div>
            </div>
            <p className="text-lg leading-relaxed max-w-md font-medium text-slate-400">{_('footer.desc')}</p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-black mb-8 text-lg tracking-widest uppercase">{_('footer.linksTitle')}</h4>
            <ul className="space-y-5 font-medium text-lg">
              <li>
                <button onClick={() => handleNav('/catalog/b2b')} className="hover:text-blue-400 transition-colors text-start focus:outline-none focus:underline">
                  {_('footer.l1')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/catalog/b2c')} className="hover:text-blue-400 transition-colors text-start focus:outline-none focus:underline">
                  {_('footer.l2')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/clinical')} className="hover:text-blue-400 transition-colors text-start focus:outline-none focus:underline">
                  {_('footer.l3')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-white font-black mb-8 text-lg tracking-widest uppercase">{_('footer.contactTitle')}</h4>
            <ul className="space-y-6 font-medium text-lg">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" /> 
                <span>{_('footer.address')}</span>
              </li>
              <li className="flex items-center gap-4" dir="ltr">
                <Phone className="w-6 h-6 text-blue-500 flex-shrink-0" /> 
                <span className="text-start">{isRtl ? '+972-4-6396116' : '+972-4-6396116'}</span>
              </li>
              <li className="flex items-center gap-4" dir="ltr">
                <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" /> 
                <span className="text-start">info@bmtdx.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-12 border-t border-slate-800 text-sm text-slate-500 font-medium flex flex-col lg:flex-row justify-between gap-8">
          <div className="max-w-4xl">
            <p className="mb-3 uppercase font-bold text-slate-400 tracking-widest text-xs">{_('footer.disclaimer')}</p>
            <p className="leading-relaxed">{_('footer.legal')}</p>
          </div>
          <p className="lg:text-right shrink-0">© {new Date().getFullYear()} BMT Diagnostics. {_('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
