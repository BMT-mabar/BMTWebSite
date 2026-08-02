import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar({ onOpenRfq }) {
  const { _, isRtl } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const activeClass = (path) => {
    const isActive = location.pathname === path;
    return `text-base font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1 ${isActive ? 'text-burgundy' : 'text-slate-650 hover:text-blue-500'}`;
  };

  const activeMobileClass = (path) => {
    const isActive = location.pathname === path;
    return `text-start px-6 py-4 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActive ? 'bg-burgundy/5 text-burgundy' : 'hover:bg-slate-50 text-slate-700'}`;
  };

  const handleNav = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav
      className="glass-navbar border-b border-slate-200/80 shadow-md sticky top-0 z-[100] transition-all duration-300"
      ref={mobileMenuRef}
      aria-label={_('nav.home') === 'ראשי' ? 'ניווט ראשי' : 'Main navigation'}
      id="site-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-32">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNav('/')} 
            className="flex items-center gap-4 md:gap-6 focus:outline-none focus:ring-4 focus:ring-blue-500/10 rounded-2xl p-2 group" 
            aria-label="Go to Home"
          >
            <img 
              src="BMT Logo.jpg" 
              alt="BMT Diagnostics Logo" 
              className="h-20 md:h-24 max-h-[95px] object-contain group-hover:opacity-90 transition-all duration-300 mix-blend-multiply filter drop-shadow-sm" 
              onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
            />
            <div style={{display:'none'}} className="text-3xl font-black text-slate-900 tracking-tight">BMT</div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <button onClick={() => handleNav('/about')} className={activeClass('/about')}>{_('nav.about')}</button>
            <button onClick={() => handleNav('/catalog/b2b')} className={activeClass('/catalog/b2b')}>{_('nav.b2b')}</button>
            <button onClick={() => handleNav('/catalog/b2c')} className={activeClass('/catalog/b2c')}>{_('nav.b2c')}</button>
            <button onClick={() => handleNav('/tech')} className={activeClass('/tech')}>{_('nav.tech')}</button>
            <button onClick={() => handleNav('/clinical')} className={activeClass('/clinical')}>{_('nav.clinical')}</button>
          </div>

          {/* Desktop Action & Language Dropdown */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSelector />
            <button 
              onClick={onOpenRfq} 
              className="bg-burgundy text-white px-8 py-3 rounded-full font-extrabold hover:bg-burgundy-600 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-burgundy/30 text-[15px]"
            >
              {_('nav.quote')}
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <LanguageSelector isMobile={true} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 p-3 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isMobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-slate-100 shadow-2xl absolute w-full left-0 z-40 animate-in slide-in-from-top-2" role="region" aria-label="Mobile navigation menu">
          <div className="flex flex-col p-6 space-y-3 text-lg font-bold text-slate-800 max-h-[80vh] overflow-y-auto">
            <button onClick={() => handleNav('/')} className={activeMobileClass('/')}>{_('nav.home')}</button>
            <button onClick={() => handleNav('/about')} className={activeMobileClass('/about')}>{_('nav.about')}</button>
            <button onClick={() => handleNav('/catalog/b2b')} className={activeMobileClass('/catalog/b2b')}>{_('nav.b2b')}</button>
            <button onClick={() => handleNav('/catalog/b2c')} className={activeMobileClass('/catalog/b2c')}>{_('nav.b2c')}</button>
            <button onClick={() => handleNav('/tech')} className={activeMobileClass('/tech')}>{_('nav.tech')}</button>
            <button onClick={() => handleNav('/clinical')} className={activeMobileClass('/clinical')}>{_('nav.clinical')}</button>
            
            <button 
              onClick={() => { setIsMobileMenuOpen(false); onOpenRfq(); }} 
              className="bg-burgundy text-white text-center py-4 rounded-full mt-6 shadow-md text-lg focus:outline-none focus:ring-4 focus:ring-burgundy/30 font-extrabold"
            >
              {_('nav.quote')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
