import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

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

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <div className={`relative ${isMobile ? 'w-full mt-4' : ''}`} ref={isMobile ? null : dropdownRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} 
        className="flex items-center justify-between w-full gap-2.5 text-slate-700 font-bold bg-white/80 backdrop-blur-md border border-slate-200/80 px-3.5 py-2.5 rounded-xl hover:bg-white hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        aria-haspopup="true" 
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-base">{currentLangObj.flag}</span> 
          <span className="uppercase text-xs font-black tracking-wider text-slate-800">{lang}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
      </button>
      
      {isOpen && (
        <div className={`${isMobile ? 'static mt-2 w-full shadow-inner bg-slate-50' : 'absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-2xl shadow-2xl z-50'} border border-slate-100 rounded-2xl overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 origin-top`}>
          {LANGUAGES.map(item => (
            <button 
              key={item.code} 
              onClick={() => handleLanguageChange(item.code)} 
              className={`flex items-center gap-3 w-full text-start px-5 py-3 hover:bg-blue-50/80 text-sm font-bold transition-colors ${lang === item.code ? 'bg-blue-50 text-blue-700 border-s-4 border-blue-600' : 'text-slate-600 border-s-4 border-transparent'}`}
            >
              <span className="text-base">{item.flag}</span>
              <span>{item.label}</span>
              <span className="ms-auto uppercase text-xs text-slate-400 font-mono">{item.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
