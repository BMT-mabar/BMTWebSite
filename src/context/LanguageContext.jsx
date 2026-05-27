import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation as useTransHook } from '../hooks/useTranslation';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('he');
  const { _, isRtl } = useTransHook(lang);

  // Synchronize document attributes on language/direction changes
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = _('seo.title');
  }, [lang, isRtl, _]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, _, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
