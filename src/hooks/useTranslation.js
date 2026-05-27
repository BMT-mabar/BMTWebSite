import { useCallback } from 'react';
import translations from '../data/translations';

/**
 * Custom hook encapsulating the translation logic with multi-level fallback.
 * Fallback chain: current language → English → Hebrew → raw key path.
 */
export function useTranslation(lang) {
  const _ = useCallback((keyPath) => {
    const keys = keyPath.split('.');

    const getVal = (language) => {
      let val = translations[language];
      for (const key of keys) {
        if (!val) return null;
        val = val[key];
      }
      return val;
    };

    let result = getVal(lang);
    if (result) return result;

    // Fallback to English
    result = getVal('en');
    if (result) return result;

    // Fallback to Hebrew
    result = getVal('he');
    return result || keyPath;
  }, [lang]);

  const isRtl = translations[lang]?.dir === 'rtl';

  return { _, isRtl, translations };
}
