import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
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
  const { lang, setLang, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const optionsRef = useRef([]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Arrow key navigation inside listbox (W3C WAI-ARIA Listbox Pattern)
  const handleMenuKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = LANGUAGES.findIndex(l => l.code === lang);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => {
        const next = prev < LANGUAGES.length - 1 ? prev + 1 : 0;
        optionsRef.current[next]?.focus();
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => {
        const prevIdx = prev > 0 ? prev - 1 : LANGUAGES.length - 1;
        optionsRef.current[prevIdx]?.focus();
        return prevIdx;
      });
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
      optionsRef.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = LANGUAGES.length - 1;
      setFocusedIndex(last);
      optionsRef.current[last]?.focus();
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang);
    setIsOpen(false);
    triggerRef.current?.focus();
    if (isMobile && onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleMenuKeyDown}>
      <button 
        ref={triggerRef}
        type="button"
        onClick={(e) => { 
          e.stopPropagation(); 
          setIsOpen(!isOpen); 
          if (!isOpen) {
            const curIdx = LANGUAGES.findIndex(l => l.code === lang);
            setFocusedIndex(curIdx >= 0 ? curIdx : 0);
          }
        }} 
        className="language-selector-trigger flex items-center justify-between gap-2.5 text-slate-800 font-extrabold bg-white border-2 border-slate-300 hover:border-blue-600 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
        aria-haspopup="listbox" 
        aria-expanded={isOpen}
        aria-label={isRtl ? 'בחר שפה' : 'Select language'}
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
          <span className="text-base" aria-hidden="true">{currentLangObj.flag}</span> 
          <span className="uppercase text-xs font-black tracking-wider text-slate-900">{lang}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      
      {isOpen && (
        <div 
          role="listbox"
          aria-label={isRtl ? 'רשימת שפות זמינות' : 'Available languages'}
          className={`language-dropdown-menu absolute top-full ${isRtl ? 'left-0' : 'right-0'} mt-2 w-52 sm:w-56 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.30)] z-[250] border-2 border-slate-300 rounded-2xl overflow-hidden py-1.5 transition-all animate-in fade-in slide-in-from-top-2 origin-top`}
          style={{ backgroundColor: '#ffffff', opacity: 1 }}
        >
          {LANGUAGES.map((item, index) => {
            const isSelected = lang === item.code;
            return (
              <button 
                key={item.code} 
                ref={el => optionsRef.current[index] = el}
                type="button"
                role="option"
                tabIndex={focusedIndex === index ? 0 : -1}
                aria-selected={isSelected}
                onClick={() => handleLanguageChange(item.code)} 
                className={`flex items-center gap-3 w-full text-start px-4 py-3 text-sm font-extrabold transition-colors focus:outline-none focus:bg-blue-100 ${isSelected ? 'bg-blue-50 text-blue-800 border-s-4 border-blue-600' : 'text-slate-800 hover:bg-slate-100 border-s-4 border-transparent'}`}
              >
                <span className="text-base" aria-hidden="true">{item.flag}</span>
                <span className="flex-grow">{item.label}</span>
                {isSelected ? (
                  <Check className="w-4 h-4 text-blue-600 shrink-0 ms-1" aria-hidden="true" />
                ) : (
                  <span className="uppercase text-xs text-slate-400 font-mono ms-1">{item.code}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
