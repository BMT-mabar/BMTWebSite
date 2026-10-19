import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Accessibility, HelpCircle, Check, X, ShieldAlert, RotateCcw, Link, Type, Compass, MousePointer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const STORAGE_KEY = 'bmt_accessibility_preferences';

const loadSavedPrefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export default function AccessibilityWidget() {
  const navigate = useNavigate();
  const { lang, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);
  const triggerBtnRef = useRef(null);

  // Load preferences from local storage if previously selected
  const saved = useRef(loadSavedPrefs()).current;

  // States
  const [highContrast, setHighContrast] = useState(!!saved.highContrast);
  const [largeText, setLargeText] = useState(!!saved.largeText);
  const [dyslexia, setDyslexia] = useState(!!saved.dyslexia);
  const [spacing, setSpacing] = useState(!!saved.spacing);
  const [reduceMotion, setReduceMotion] = useState(!!saved.reduceMotion);
  const [monochrome, setMonochrome] = useState(!!saved.monochrome);
  const [highlightLinks, setHighlightLinks] = useState(!!saved.highlightLinks);
  const [highlightTitles, setHighlightTitles] = useState(!!saved.highlightTitles);
  const [bigCursor, setBigCursor] = useState(!!saved.bigCursor);
  const [zoomLevel, setZoomLevel] = useState(saved.zoomLevel || 100); // 100, 110, 120
  const [readingGuide, setReadingGuide] = useState(!!saved.readingGuide);
  const [showStatement, setShowStatement] = useState(false);

  // Coordinates for the reading guide line
  const [mouseY, setMouseY] = useState(0);

  // Persist preferences to localStorage
  useEffect(() => {
    try {
      const prefs = {
        highContrast,
        largeText,
        dyslexia,
        spacing,
        reduceMotion,
        monochrome,
        highlightLinks,
        highlightTitles,
        bigCursor,
        zoomLevel,
        readingGuide
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      // ignore in private browsing or disabled storage
    }
  }, [highContrast, largeText, dyslexia, spacing, reduceMotion, monochrome, highlightLinks, highlightTitles, bigCursor, zoomLevel, readingGuide]);

  // Toggle Accessibility High Contrast Style on Body
  useEffect(() => {
    const body = document.body;
    if (highContrast) {
      body.classList.add('accessibility-high-contrast');
    } else {
      body.classList.remove('accessibility-high-contrast');
    }
  }, [highContrast]);

  // Toggle Accessibility Large Text Style on both Root and Body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (largeText) {
      root.classList.add('accessibility-large-text');
      body.classList.add('accessibility-large-text');
    } else {
      root.classList.remove('accessibility-large-text');
      body.classList.remove('accessibility-large-text');
    }
  }, [largeText]);

  // Toggle Accessibility Dyslexia style on body
  useEffect(() => {
    const body = document.body;
    if (dyslexia) {
      body.classList.add('accessibility-dyslexia');
    } else {
      body.classList.remove('accessibility-dyslexia');
    }
  }, [dyslexia]);

  // Toggle Accessibility Spacing style on body
  useEffect(() => {
    const body = document.body;
    if (spacing) {
      body.classList.add('accessibility-spacing');
    } else {
      body.classList.remove('accessibility-spacing');
    }
  }, [spacing]);

  // Toggle Accessibility Reduce Motion style on body
  useEffect(() => {
    const body = document.body;
    if (reduceMotion) {
      body.classList.add('accessibility-reduce-motion');
    } else {
      body.classList.remove('accessibility-reduce-motion');
    }
  }, [reduceMotion]);

  // Toggle Monochrome Mode
  useEffect(() => {
    const body = document.body;
    if (monochrome) {
      body.classList.add('accessibility-monochrome');
    } else {
      body.classList.remove('accessibility-monochrome');
    }
  }, [monochrome]);

  // Toggle Highlight Links
  useEffect(() => {
    const body = document.body;
    if (highlightLinks) {
      body.classList.add('accessibility-highlight-links');
    } else {
      body.classList.remove('accessibility-highlight-links');
    }
  }, [highlightLinks]);

  // Toggle Highlight Titles
  useEffect(() => {
    const body = document.body;
    if (highlightTitles) {
      body.classList.add('accessibility-highlight-titles');
    } else {
      body.classList.remove('accessibility-highlight-titles');
    }
  }, [highlightTitles]);

  // Toggle Big Cursor
  useEffect(() => {
    const body = document.body;
    if (bigCursor) {
      body.classList.add('accessibility-big-cursor');
    } else {
      body.classList.remove('accessibility-big-cursor');
    }
  }, [bigCursor]);

  // Toggle Zoom Level
  useEffect(() => {
    const body = document.body;
    body.classList.remove('accessibility-zoom-110', 'accessibility-zoom-120');
    if (zoomLevel === 110) {
      body.classList.add('accessibility-zoom-110');
    } else if (zoomLevel === 120) {
      body.classList.add('accessibility-zoom-120');
    }
  }, [zoomLevel]);

  // Mouse Move listener for focused reading guide
  useEffect(() => {
    if (!readingGuide) return;
    const handleMouseMove = (e) => {
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingGuide]);

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Keyboard escape to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setShowStatement(false);
        triggerBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Body scroll lock when widget panel or statement modal is open
  useEffect(() => {
    if (isOpen || showStatement) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen, showStatement]);

  // Reset all accessibility configurations
  const resetAll = () => {
    setHighContrast(false);
    setLargeText(false);
    setDyslexia(false);
    setSpacing(false);
    setReduceMotion(false);
    setMonochrome(false);
    setHighlightLinks(false);
    setHighlightTitles(false);
    setBigCursor(false);
    setZoomLevel(100);
    setReadingGuide(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage access errors
    }
  };

  // Localized texts
  const t = {
    he: {
      btnLabel: 'תפריט נגישות',
      title: 'הגדרות נגישות - BMT',
      contrast: 'ניגודיות גבוהה',
      contrastDesc: 'שינוי צבעי האתר לניגודיות כהה בולטת',
      text: 'טקסט מוגדל',
      textDesc: 'הגדלת גופן האתר לקריאה נוחה',
      dyslexia: 'גופן לדיסלקציה',
      dyslexiaDesc: 'התאמת גופן לשיפור הקריאה ללקויי קריאה',
      spacing: 'מרווח טקסט מוגבר',
      spacingDesc: 'הגדלת המרווח בין אותיות, מילים ושורות',
      motion: 'צמצום אנימציות',
      motionDesc: 'עצירת כל האנימציות והמעברים באתר',
      monochrome: 'גווני אפור (מונוכרום)',
      monochromeDesc: 'הסרת צבעי האתר לטובת מוגבלי ראיית צבעים',
      links: 'הדגשת קישורים',
      linksDesc: 'הוספת מסגרת וקו תחתון לכל הקישורים והכפתורים',
      titles: 'הדגשת כותרות',
      titlesDesc: 'סימון כותרות האתר ברקע צהוב בולט',
      cursor: 'סמן עכבר מוגדל',
      cursorDesc: 'החלפת סמן העכבר לסמן שחור גדול ובולט',
      zoom: 'הגדלת תצוגת מסך',
      zoomDesc: 'הגדלת התצוגה הכללית של האתר (100% עד 120%)',
      guide: 'סרגל מדריך קריאה',
      guideDesc: 'פס אופקי העוקב אחר הסמן למיקוד הקריאה',
      reset: 'איפוס הגדרות נגישות',
      statement: 'הצהרת נגישות תקנית (ת"י 5568)',
      statementTitle: 'הצהרת נגישות - BMT Diagnostics Ltd',
      statementText: 'חברת BMT Diagnostics (בי.אמ.טי דיאגנוסטיקס בע"מ) רואה בחשיבות עליונה את מתן השירות השוויוני, המכבד והנגיש לכלל לקוחותיה ואזרחי ישראל. אנו משקיעים מאמצים רבים להנגשת אתר האינטרנט לפי חוק שוויון זכויות לאנשים עם מוגבלות (תקנה 35 - שירותי אינטרנט), בהתאם לתקן הישראלי ת"י 5568 ברמה AA והנחיות WCAG 2.1 AA הבינלאומיות.\n\nהתאמות האתר כוללות:\n• ניווט מקלדת מלא (Tab, Shift+Tab, חיצים, Enter, Space, Escape)\n• תאימות לקוראי מסך (NVDA, JAWS, VoiceOver) ומבנה כותרות סמנטי\n• קישור עקיפת בלוקים (Skip to Main Content) בראש כל עמוד\n• תיאורי תמונות (Alt Text) מפורטים לכל מוצרי הדיאגנוסטיקה והלוגואים\n• טפסים מונגשים ומודאלים מוגני פוקוס (Focus Trap)\n• סרגל התאמות נגישות (ניגודיות, גודל טקסט, גופן דיסלקציה, ביטול אנימציות ועוד).\n\nהסדרי נגישות פיזיים:\nמתקני ומשרדי חברת BMT Diagnostics (רחוב האילן 12, פארק תעשיות אור עקיבא) משמשים כמפעל ייצור, מעבדות מחקר, פיתוח וייצור מוצרים רפואיים, ואינם פתוחים לקבלת קהל / אינם מהווים חנות קמעונאית. השירות ניתן בערוצים דיגיטליים, בדוא"ל ובטלפון. במידת הצורך בתיאום ביקור מקצועי מוסדי, ניתן לפנות מראש לרכז הנגישות לתיאום סידורי הגעה וליווי מונגש.\n\nפרטי רכז הנגישות ודרכי פנייה:\n• שם רכז הנגישות: רואי טמיר (Roey Tamir)\n• טלפון נייד ישיר / WhatsApp: 054-7448033 (972-54-7448033+)\n• טלפון משרד: 04-6396116 (972-4-6396116+)\n• דוא"ל: roey@bmtdx.com (וכן בכתובת: info@bmtdx.com)\n• כתובת למשלוח דואר: ת.ד 12, פארק תעשיות אור עקיבא, מיקוד 3060000\n• תאריך עדכון ובדיקת ההצהרה: אוקטובר 2024.',
      close: 'סגור תפריט',
      closeBtn: 'סגור'
    },
    en: {
      btnLabel: 'Accessibility Menu',
      title: 'Accessibility Options',
      contrast: 'High Contrast Mode',
      contrastDesc: 'Swap colors to dark high contrast theme',
      text: 'Large Text Size',
      textDesc: 'Scale up site-wide font size for legibility',
      dyslexia: 'Dyslexia Friendly',
      dyslexiaDesc: 'Optimize font styles to improve readability',
      spacing: 'Extra Text Spacing',
      spacingDesc: 'Increase spacing between letters, words, and lines',
      motion: 'Reduce Motion',
      motionDesc: 'Stop all background animations and transitions',
      monochrome: 'Monochrome (Grayscale)',
      monochromeDesc: 'Remove colors to support colorblind users',
      links: 'Highlight Links',
      linksDesc: 'Add distinct borders & outlines to all links/buttons',
      titles: 'Highlight Headings',
      titlesDesc: 'Mark headings with a prominent yellow background',
      cursor: 'Large Mouse Cursor',
      cursorDesc: 'Replace standard cursor with a large black pointer',
      zoom: 'Content Scale Zoom',
      zoomDesc: 'Zoom overall website scale (100% to 120%)',
      guide: 'Reading Guide Rule',
      guideDesc: 'A horizontal focus bar following your mouse cursor',
      reset: 'Reset All Settings',
      statement: 'Accessibility Statement (IS 5568)',
      statementTitle: 'Accessibility Statement - BMT Diagnostics Ltd',
      statementText: 'BMT Diagnostics Ltd is firmly committed to ensuring its website and digital services are accessible to all individuals, including people with disabilities. Our platform complies with Israeli Standard IS 5568 Level AA and the W3C Web Content Accessibility Guidelines (WCAG 2.1 Level AA).\n\nKey features include:\n• Full keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape)\n• Screen reader compatibility (NVDA, JAWS, VoiceOver) with clean semantic HTML\n• Skip to main content link on every page\n• Descriptive alternative text (Alt Text) for clinical products and media\n• Fully accessible modal dialogs with focus traps.\n\nPhysical Facilities Notice:\nOur facility at 12 HaIlan St., Or Akiva Industrial Park, Israel functions strictly as a medical device manufacturing facility, cleanrooms, and R&D laboratory, and does not operate as a retail storefront or offer walk-in public reception. Inquiries and client support are conducted via phone and digital channels.\n\nAccessibility Coordinator Contact:\n• Coordinator: Roey Tamir\n• Mobile / WhatsApp: +972-54-7448033\n• Office Phone: +972-4-6396116\n• Email: roey@bmtdx.com / info@bmtdx.com\n• Audited: October 2024.',
      close: 'Close Menu',
      closeBtn: 'Close'
    },
    ru: {
      btnLabel: 'Меню доступности',
      title: 'Параметры доступности',
      contrast: 'Высокая контрастность',
      contrastDesc: 'Смена цветов на темную контрастную тему',
      text: 'Увеличенный текст',
      textDesc: 'Увеличение размера шрифта для удобства чтения',
      dyslexia: 'Шрифт для дислексии',
      dyslexiaDesc: 'Специальный шрифт для облегчения чтения',
      spacing: 'Дополнительные интервалы',
      spacingDesc: 'Увеличение расстояния между буквами и строками',
      motion: 'Меньше движения',
      motionDesc: 'Отключение анимации и переходов на сайте',
      monochrome: 'Монохромный режим',
      monochromeDesc: 'Удаление всех цветов с веб-страницы',
      links: 'Выделение ссылок',
      linksDesc: 'Добавить жирные подчеркивания и рамки ссылкам',
      titles: 'Выделение заголовков',
      titlesDesc: 'Выделить все заголовки ярким цветом',
      cursor: 'Увеличенный курсор',
      cursorDesc: 'Сделать указатель мыши большим и темным',
      zoom: 'Масштаб страницы',
      zoomDesc: 'Увеличить масштаб контента (100%-120%)',
      guide: 'Линейка чтения',
      guideDesc: 'Горизонтальная полоса, следящая за курсором',
      reset: 'Сбросить настройки',
      statement: 'Декларация доступности',
      statementTitle: 'Политика доступности - BMT Diagnostics',
      statementText: 'Компания BMT Diagnostics стремится сделать свой сайт доступным для всех пользователей. Мы следуем международным стандартам WCAG 2.1 AA для обеспечения легкого доступа к информации для людей с ограниченными возможностями, поддерживая навигацию клавиатурой и синтезаторы речи. Мы уважаем конфиденциальность ваших данных.\n\nПо любым вопросам пишите на roey@bmtdx.com.',
      close: 'Закрыть меню',
      closeBtn: 'Закрыть'
    },
    ar: {
      btnLabel: 'قائمة إمكانية الوصول',
      title: 'إعدادات إمكانية الوصول',
      contrast: 'تباين عالي للألوان',
      contrastDesc: 'تحويل الألوان إلى مظهر داكن عالي التباين',
      text: 'نصوص كبيرة',
      textDesc: 'تكبير حجم خطوط الموقع לתسهيل القراءة',
      dyslexia: 'خط صديق לעسر القراءة',
      dyslexiaDesc: 'تعديل نمط الخط لتحسين القراءة لذوي عسر القراءة',
      spacing: 'تباعد إضافي للنصوص',
      spacingDesc: 'زيادة المسافات بين الحروف والكلمات والأسطر',
      motion: 'تقليل الحركة',
      motionDesc: 'إيقاف الرسوم المتحركة والخلفيات المتحركة',
      monochrome: 'ألوان رمادية',
      monochromeDesc: 'إزالة ألوان الموقع بالكامل لدعم عمى الألوان',
      links: 'تمييز الروابط',
      linksDesc: 'إضافة خطوط وإطارات مميزة لجميع الأزرار والروابط',
      titles: 'تمييز العناوين',
      titlesDesc: 'تسليط الضوء على جميع العناوين بخلفية مميزة',
      cursor: 'مؤشر ماوس كبير',
      cursorDesc: 'استبدال المؤشر بآخر كبير الحجم وأسود اللون',
      zoom: 'تغيير حجم الشاشة',
      zoomDesc: 'تكبير المحتوى الإجمالي للموقع (100% إلى 120%)',
      guide: 'دليل القراءة',
      guideDesc: 'شريط أفقي يتبع مؤشر الماوس للتركيز',
      reset: 'إعادة تعيين الإعدادات',
      statement: 'بيان إمكانية الوصول والخصوصية',
      statementTitle: 'بيان إمكانية الوصول - BMT Diagnostics',
      statementText: 'تلتزم شركة BMT Diagnostics تقديم خدمات يسهل الوصول إليها لجميع الأفراد، بما في ذلك الأشخاص ذوي الإعاقة. يتوافق موقعنا مع إرشادات إمكانية الوصول إلى محتوى الويب (WCAG 2.1) بمستوى AA, مع دعم كامل للتنقل عبر لوحة المفاتيح وقارئات الشاشة وحماية خصوصية بيانات المستخدمين بشكل كامل.\n\nلأي استفسارات، يرجى التواصل معنا عبر: roey@bmtdx.com.',
      close: 'إغلاق القائمة',
      closeBtn: 'إغلاق'
    }
  };

  const curr = t[lang] || t.en;

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} ${isOpen ? 'z-[9995]' : 'z-[90]'} flex items-end justify-start font-sans accessibility-widget-root`} ref={widgetRef} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Horizontal Focused Reading Guide Overlay */}
      {readingGuide && (
        <div 
          className="fixed left-0 right-0 h-10 bg-emerald-500/10 border-y-2 border-emerald-500/40 pointer-events-none z-[9999]"
          style={{ top: `${mouseY - 20}px` }}
        />
      )}

      {/* Backdrop overlay — clicking outside immediately closes the panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-[2px] z-[9990] animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Accessibility Trigger Button */}
      <button
        ref={triggerBtnRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#005EAD] to-[#008AE6] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,94,173,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:from-[#10b981] hover:to-[#059669] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 hover:scale-105 active:scale-95 floating-widget-btn relative shrink-0 z-[9996]"
        aria-label={curr.btnLabel}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping pointer-events-none scale-105" aria-hidden="true" />
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 animate-in spin-in-90" /> : <Accessibility className="w-6 h-6 sm:w-7 sm:h-7" />}
      </button>

      {/* Accessibility Settings Panel Overlay */}
      {isOpen && (
        <div 
          role="region"
          aria-label={curr.title}
          className={`absolute bottom-16 sm:bottom-20 ${isRtl ? 'right-0' : 'left-0'} w-[320px] sm:w-[420px] max-w-[calc(100vw-2rem)] max-h-[min(82vh,calc(100dvh-6rem))] flex flex-col bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-[2.5rem] shadow-2xl p-5 sm:p-7 animate-in slide-in-from-bottom-4 duration-300 origin-bottom-${isRtl ? 'right' : 'left'} z-[9995] overflow-hidden accessibility-widget-panel`}
        >
          {/* Header Title with quick reset and prominent close button */}
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-100 shrink-0 bg-white accessibility-widget-header">
            <div>
              <h2 className="font-black text-lg sm:text-xl text-slate-900 leading-none">{curr.title}</h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">LabOnTime Standard compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={resetAll}
                className="text-slate-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-slate-300 p-2 rounded-xl bg-slate-100 hover:bg-red-50 transition-colors flex items-center gap-1.5 text-xs font-bold"
                title={curr.reset}
                aria-label={curr.reset}
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{isRtl ? 'איפוס' : 'Reset'}</span>
              </button>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="text-slate-700 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors accessibility-close-btn flex items-center gap-1.5 font-bold text-xs shrink-0"
                aria-label={curr.close}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="inline">{curr.close}</span>
              </button>
            </div>
          </div>

          {/* Quick Adjustment Grid */}
          <div className="space-y-3.5 overflow-y-auto flex-grow pr-1">
            
            {/* Setting 1: High Contrast */}
            <button 
              type="button"
              aria-pressed={highContrast}
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${highContrast ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.contrast}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${highContrast ? 'text-slate-300' : 'text-slate-400'}`}>{curr.contrastDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${highContrast ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {highContrast && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 2: Grayscale Monochrome */}
            <button 
              type="button"
              aria-pressed={monochrome}
              onClick={() => setMonochrome(!monochrome)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${monochrome ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.monochrome}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${monochrome ? 'text-slate-300' : 'text-slate-400'}`}>{curr.monochromeDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${monochrome ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {monochrome && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 3: Highlight Links */}
            <button 
              type="button"
              aria-pressed={highlightLinks}
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${highlightLinks ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <Link className={`w-4 h-4 mt-0.5 shrink-0 ${highlightLinks ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.links}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${highlightLinks ? 'text-slate-300' : 'text-slate-400'}`}>{curr.linksDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${highlightLinks ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {highlightLinks && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 4: Highlight Headings */}
            <button 
              type="button"
              aria-pressed={highlightTitles}
              onClick={() => setHighlightTitles(!highlightTitles)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${highlightTitles ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <Type className={`w-4 h-4 mt-0.5 shrink-0 ${highlightTitles ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.titles}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${highlightTitles ? 'text-slate-300' : 'text-slate-400'}`}>{curr.titlesDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${highlightTitles ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {highlightTitles && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 5: Large Mouse Cursor */}
            <button 
              type="button"
              aria-pressed={bigCursor}
              onClick={() => setBigCursor(!bigCursor)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${bigCursor ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <MousePointer className={`w-4 h-4 mt-0.5 shrink-0 ${bigCursor ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.cursor}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${bigCursor ? 'text-slate-300' : 'text-slate-400'}`}>{curr.cursorDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${bigCursor ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {bigCursor && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 6: Content scaling zoom level */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="max-w-[55%]">
                <span className="block font-extrabold text-xs sm:text-sm text-slate-800">{curr.zoom}</span>
                <span className="block text-[10px] mt-0.5 font-medium text-slate-400 leading-tight">{curr.zoomDesc}</span>
              </div>
              <div className="flex gap-1.5 shrink-0" role="group" aria-label={curr.zoom}>
                {[100, 110, 120].map((zoomVal) => (
                  <button
                    key={zoomVal}
                    type="button"
                    aria-pressed={zoomLevel === zoomVal}
                    onClick={() => setZoomLevel(zoomVal)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${zoomLevel === zoomVal ? 'bg-slate-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                  >
                    {zoomVal}%
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 7: Focused Reading Guide */}
            <button 
              type="button"
              aria-pressed={readingGuide}
              onClick={() => setReadingGuide(!readingGuide)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${readingGuide ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <Compass className={`w-4 h-4 mt-0.5 shrink-0 ${readingGuide ? 'text-emerald-400' : 'text-emerald-600'}`} aria-hidden="true" />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.guide}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${readingGuide ? 'text-slate-300' : 'text-slate-400'}`}>{curr.guideDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${readingGuide ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {readingGuide && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 8: Large Text font scaling */}
            <button 
              type="button"
              aria-pressed={largeText}
              onClick={() => setLargeText(!largeText)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${largeText ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.text}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${largeText ? 'text-slate-300' : 'text-slate-400'}`}>{curr.textDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${largeText ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {largeText && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 9: Dyslexia Friendly Font */}
            <button 
              type="button"
              aria-pressed={dyslexia}
              onClick={() => setDyslexia(!dyslexia)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${dyslexia ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.dyslexia}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${dyslexia ? 'text-slate-300' : 'text-slate-400'}`}>{curr.dyslexiaDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${dyslexia ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {dyslexia && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 10: Extra Spacing */}
            <button 
              type="button"
              aria-pressed={spacing}
              onClick={() => setSpacing(!spacing)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${spacing ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.spacing}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${spacing ? 'text-slate-300' : 'text-slate-400'}`}>{curr.spacingDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${spacing ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {spacing && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Setting 11: Reduce Motion */}
            <button 
              type="button"
              aria-pressed={reduceMotion}
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${reduceMotion ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.motion}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${reduceMotion ? 'text-slate-300' : 'text-slate-400'}`}>{curr.motionDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${reduceMotion ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {reduceMotion && <Check className="w-3 h-3" aria-hidden="true" />}
              </div>
            </button>

            {/* Accessibility statement button */}
            <button 
              type="button"
              onClick={() => setShowStatement(true)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>{curr.statement}</span>
            </button>
          </div>

          {/* Pinned Bottom Close & Apply Button */}
          <div className="pt-3 border-t border-slate-100 mt-2 shrink-0 bg-white accessibility-widget-footer">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>{isRtl ? 'סיום וסגירת תפריט נגישות' : 'Close Accessibility Menu'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Dialog: Accessibility Statement Details (WCAG 4.1.2 / 2.1.2) */}
      {showStatement && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="widget-statement-title"
          aria-describedby="widget-statement-desc"
        >
          {/* Backdrop overlay — clicking outside immediately closes the modal */}
          <div 
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-md animate-fade-in" 
            onClick={() => setShowStatement(false)} 
            aria-hidden="true" 
          />
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 flex flex-col max-h-[min(90vh,calc(100dvh-2.5rem))] my-auto accessibility-modal-card">
            <div className="flex items-center justify-between p-6 sm:px-8 border-b border-slate-100 shrink-0 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-3 text-emerald-600">
                <ShieldAlert className="w-7 h-7 flex-shrink-0" aria-hidden="true" />
                <h3 id="widget-statement-title" className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{curr.statementTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStatement(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0 ms-3"
                aria-label={curr.closeBtn}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div id="widget-statement-desc" className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium overflow-y-auto flex-grow p-6 sm:p-8">
              {curr.statementText}
            </div>
            <div className="p-5 sm:px-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-slate-50/80">
              <button
                type="button"
                onClick={() => { setShowStatement(false); setIsOpen(false); navigate('/accessibility'); }}
                className="text-emerald-700 hover:text-emerald-900 font-extrabold text-sm underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1 cursor-pointer"
              >
                {isRtl ? 'מעבר לעמוד הצהרת הנגישות המלאה ←' : 'Go to Full Accessibility Statement Page →'}
              </button>
              <button 
                type="button"
                onClick={() => setShowStatement(false)} 
                className="w-full sm:w-auto bg-slate-950 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-2xl transition focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
              >
                {curr.closeBtn}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
