import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ isMobile = false, onCloseMobileMenu }) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside (non-mobile only)
  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    setIsOpen(false);
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <div className={`relative ${isMobile ? 'w-full mt-4' : ''}`} ref={isMobile ? null : dropdownRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} 
        className="flex items-center justify-between w-full gap-2 text-slate-700 font-bold bg-white/70 backdrop-blur-md border border-slate-200/80 px-4 py-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="true" 
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" /> 
          <span className="uppercase text-sm tracking-wider">{lang}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
      </button>
      
      {isOpen && (
        <div className={`${isMobile ? 'static mt-2 w-full shadow-inner bg-slate-50' : 'absolute top-full right-0 mt-2 w-44 bg-white/95 backdrop-blur-2xl shadow-2xl z-50'} border border-slate-100 rounded-2xl overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 origin-top`}>
          {['he', 'en', 'ru', 'ar'].map(l => (
            <button 
              key={l} 
              onClick={() => handleLanguageChange(l)} 
              className={`block w-full text-start px-5 py-4 hover:bg-blue-50/80 text-sm font-bold uppercase transition-colors ${lang === l ? 'bg-blue-50 text-blue-700 border-s-4 border-blue-600' : 'text-slate-600 border-s-4 border-transparent'}`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
