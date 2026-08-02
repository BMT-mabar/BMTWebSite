import React, { useState, useEffect, useRef } from 'react';
import { Accessibility, HelpCircle, Check, X, ShieldAlert, RotateCcw, Link, Type, Compass, MousePointer, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AccessibilityWidget() {
  const { lang, _, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  // States
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  const [spacing, setSpacing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [monochrome, setMonochrome] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [highlightTitles, setHighlightTitles] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // 100, 110, 120
  const [readingGuide, setReadingGuide] = useState(false);
  const [showStatement, setShowStatement] = useState(false);

  // Coordinates for the reading guide line
  const [mouseY, setMouseY] = useState(0);

  // Toggle Accessibility High Contrast Style on Body
  useEffect(() => {
    const body = document.body;
    if (highContrast) {
      body.classList.add('accessibility-high-contrast');
    } else {
      body.classList.remove('accessibility-high-contrast');
    }
  }, [highContrast]);

  // Toggle Accessibility Large Text Style on Body
  useEffect(() => {
    const body = document.body;
    if (largeText) {
      body.classList.add('accessibility-large-text');
    } else {
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard escape to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setShowStatement(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

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
      statement: 'הצהרת נגישות ופרטיות',
      statementTitle: 'הצהרת נגישות ופרטיות - BMT Diagnostics',
      statementText: 'חברת BMT Diagnostics רואה בחשיבות עליונה את מתן השירות השוויוני, המכבד והנגיש לכלל לקוחותיה. אנו משקיעים מאמצים ומשאבים רבים על מנת להנגיש את אתר האינטרנט שלנו לאוכלוסיית אנשים עם מוגבלות, במטרה לאפשר חווית גלישה עצמאית, נוחה ובטוחה.\n\nהאתר מותאם להנחיות הנגישות בתקן הישראלי ת"י 5568 ברמה AA ומיישם את המלצות מסמך WCAG 2.1 הבינלאומי. האתר תומך בניווט מקלדת מלא, תיאורי תמונות (Alt Text), ומבנה כותרות תקין לטובת קוראי מסך. פרטיות הגולשים מוגנת באופן מוחלט ואיננו אוספים מידע אישי מזהה ללא אישור מפורש.\n\nבמידה ונתקלתם בקושי כלשהו בגלישה או שיש לכם הצעה לשיפור, אנא פנו אלינו בכתובת המייל: roey@bmtdx.com.',
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
      statement: 'Accessibility & Privacy Policy',
      statementTitle: 'Accessibility & Privacy Policy - BMT Diagnostics',
      statementText: 'BMT Diagnostics is deeply committed to ensuring its services are accessible to all individuals, including people with disabilities. We believe website accessibility is a fundamental aspect of digital inclusion and have designed this platform to be highly navigable and readable.\n\nOur website complies with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. We ensure robust keyboard navigation support, clean screen-reader structures, readable contrast levels, and alternative text descriptions for all primary clinical visual media.\n\nIf you experience any difficulties or have feedback, please reach out to us at: info@bmtdx.com.',
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
    <div className={`fixed bottom-6 ${isRtl ? 'right-6' : 'left-6'} z-[90] flex items-end justify-start font-sans`} ref={widgetRef} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Horizontal Focused Reading Guide Overlay */}
      {readingGuide && (
        <div 
          className="fixed left-0 right-0 h-10 bg-emerald-500/10 border-y-2 border-emerald-500/40 pointer-events-none z-[9999]"
          style={{ top: `${mouseY - 20}px` }}
        />
      )}

      {/* Floating Accessibility Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#005EAD] to-[#008AE6] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,94,173,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:from-[#10b981] hover:to-[#059669] transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 hover:scale-110 floating-widget-btn relative shrink-0"
        aria-label={curr.btnLabel}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping pointer-events-none scale-105" aria-hidden="true" />
        {isOpen ? <X className="w-6 h-6 animate-in spin-in-90" /> : <Accessibility className="w-7 h-7" />}
      </button>

      {/* Accessibility Settings Panel Overlay */}
      {isOpen && (
        <div className={`absolute bottom-18 ${isRtl ? 'right-0' : 'left-0'} w-[340px] sm:w-[420px] bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 animate-in slide-in-from-bottom-4 duration-300 origin-bottom-${isRtl ? 'right' : 'left'} z-20`}>
          
          {/* Header Title with quick reset */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <div>
              <h4 className="font-black text-lg sm:text-xl text-slate-900 leading-none">{curr.title}</h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">SavvyCheck Standard compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={resetAll}
                className="text-slate-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-slate-300 p-2 rounded-xl bg-slate-100 hover:bg-red-50 transition-colors flex items-center gap-1.5 text-xs font-bold"
                title={curr.reset}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isRtl ? 'איפוס' : 'Reset'}</span>
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300 p-1.5 rounded-xl hover:bg-slate-100 transition-colors accessibility-close-btn"
                aria-label={curr.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Adjustment Grid */}
          <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
            
            {/* Setting 1: High Contrast */}
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${highContrast ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.contrast}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${highContrast ? 'text-slate-300' : 'text-slate-400'}`}>{curr.contrastDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${highContrast ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {highContrast && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 2: Grayscale Monochrome */}
            <button 
              onClick={() => setMonochrome(!monochrome)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${monochrome ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.monochrome}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${monochrome ? 'text-slate-300' : 'text-slate-400'}`}>{curr.monochromeDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${monochrome ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {monochrome && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 3: Highlight Links */}
            <button 
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${highlightLinks ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <Link className={`w-4 h-4 mt-0.5 shrink-0 ${highlightLinks ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.links}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${highlightLinks ? 'text-slate-300' : 'text-slate-400'}`}>{curr.linksDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${highlightLinks ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {highlightLinks && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 4: Highlight Headings */}
            <button 
              onClick={() => setHighlightTitles(!highlightTitles)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${highlightTitles ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <Type className={`w-4 h-4 mt-0.5 shrink-0 ${highlightTitles ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.titles}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${highlightTitles ? 'text-slate-300' : 'text-slate-400'}`}>{curr.titlesDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${highlightTitles ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {highlightTitles && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 5: Large Mouse Cursor */}
            <button 
              onClick={() => setBigCursor(!bigCursor)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${bigCursor ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <MousePointer className={`w-4 h-4 mt-0.5 shrink-0 ${bigCursor ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.cursor}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${bigCursor ? 'text-slate-300' : 'text-slate-400'}`}>{curr.cursorDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${bigCursor ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {bigCursor && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 6: Content scaling zoom level */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="max-w-[55%]">
                <span className="block font-extrabold text-xs sm:text-sm text-slate-800">{curr.zoom}</span>
                <span className="block text-[10px] mt-0.5 font-medium text-slate-400 leading-tight">{curr.zoomDesc}</span>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {[100, 110, 120].map((zoomVal) => (
                  <button
                    key={zoomVal}
                    onClick={() => setZoomLevel(zoomVal)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${zoomLevel === zoomVal ? 'bg-slate-950 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                  >
                    {zoomVal}%
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 7: Focused Reading Guide */}
            <button 
              onClick={() => setReadingGuide(!readingGuide)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${readingGuide ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%] flex items-start gap-2.5">
                <Compass className={`w-4 h-4 mt-0.5 shrink-0 ${readingGuide ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div>
                  <span className="block font-extrabold text-xs sm:text-sm">{curr.guide}</span>
                  <span className={`block text-[10px] mt-0.5 font-medium ${readingGuide ? 'text-slate-300' : 'text-slate-400'}`}>{curr.guideDesc}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${readingGuide ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {readingGuide && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 8: Large Text font scaling */}
            <button 
              onClick={() => setLargeText(!largeText)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${largeText ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.text}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${largeText ? 'text-slate-300' : 'text-slate-400'}`}>{curr.textDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${largeText ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {largeText && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 9: Dyslexia Friendly Font */}
            <button 
              onClick={() => setDyslexia(!dyslexia)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${dyslexia ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.dyslexia}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${dyslexia ? 'text-slate-300' : 'text-slate-400'}`}>{curr.dyslexiaDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${dyslexia ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {dyslexia && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 10: Extra Spacing */}
            <button 
              onClick={() => setSpacing(!spacing)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${spacing ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.spacing}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${spacing ? 'text-slate-300' : 'text-slate-400'}`}>{curr.spacingDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${spacing ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {spacing && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Setting 11: Reduce Motion */}
            <button 
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-start transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${reduceMotion ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'}`}
            >
              <div className="max-w-[75%]">
                <span className="block font-extrabold text-xs sm:text-sm">{curr.motion}</span>
                <span className={`block text-[10px] mt-0.5 font-medium ${reduceMotion ? 'text-slate-300' : 'text-slate-400'}`}>{curr.motionDesc}</span>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${reduceMotion ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-300'}`}>
                {reduceMotion && <Check className="w-3 h-3" />}
              </div>
            </button>

            {/* Accessibility statement button */}
            <button 
              onClick={() => setShowStatement(true)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-extrabold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{curr.statement}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Dialog: Accessibility Statement Details */}
      {showStatement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowStatement(false)}></div>
          <div className="bg-white rounded-[3rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 p-8 md:p-12">
            <div className="flex items-center gap-4 text-emerald-600 mb-6">
              <ShieldAlert className="w-8 h-8 flex-shrink-0" />
              <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{curr.statementTitle}</h4>
            </div>
            <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium overflow-y-auto max-h-[50vh] pr-4 mb-8">
              {curr.statementText}
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowStatement(false)} 
                className="bg-slate-950 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-2xl transition focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
              >
                {curr.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
