import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Accessibility, 
  ShieldCheck, 
  Keyboard, 
  Eye, 
  Volume2, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AccessibilityPage({ onOpenRfq }) {
  const { lang, _ } = useLanguage();
  const isHe = lang === 'he';

  const title = _('legal.accessibilityTitle') || (isHe ? 'הצהרת נגישות (ת"י 5568 / WCAG 2.1 AA)' : 'Accessibility Statement (IS 5568 / WCAG 2.1 AA)');
  const pageDescription = isHe 
    ? 'הצהרת הנגישות הרשמית של חברת BMT Diagnostics לפי תקנות שוויון זכויות לאנשים עם מוגבלות ותקן ישראלי 5568 ברמה AA.'
    : 'Official Accessibility Statement of BMT Diagnostics in compliance with Israeli Standard 5568 and WCAG 2.1 Level AA.';

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen pb-24 text-slate-800">
      <Helmet>
        <title>{`${title} | BMT Diagnostics`}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={`${title} | BMT Diagnostics`} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>

      {/* Header Banner */}
      <section 
        className="relative py-20 md:py-28 overflow-hidden text-white border-b border-slate-200"
        style={{ background: 'linear-gradient(135deg, #005EAD 0%, #003B70 100%)' }}
      >
        <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[250px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-emerald-400/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-6 shadow-sm">
            <Accessibility className="w-4 h-4 text-emerald-300" aria-hidden="true" />
            <span>{isHe ? 'תקן ישראלי ת"י 5568 ברמה AA' : 'Israeli Standard 5568 Level AA'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            {_('legal.accessibilityTitle')}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-100 font-light leading-relaxed max-w-3xl mx-auto opacity-95">
            {_('legal.accessibilityDocMeta')}
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Commitment Banner Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200/80 mb-10">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-7 h-7 text-emerald-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight">
                {_('legal.accessibilityS1Title')}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                {_('legal.accessibilityS1Text')}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Accommodations Grid */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-md border border-slate-200/80 mb-10" aria-labelledby="tech-adjustments-heading">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Keyboard className="w-6 h-6 text-blue-600" aria-hidden="true" />
            </div>
            <div>
              <h2 id="tech-adjustments-heading" className="text-2xl font-black text-slate-900 tracking-tight">
                {_('legal.accessibilityS2Title')}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                {isHe ? 'פירוט ההתאמות שבוצעו בקוד האתר ובממשק המשתמש' : 'Technical accommodations implemented in source code and interface'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-3 font-extrabold text-slate-900 text-base mb-2">
                <Keyboard className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
                <span>{isHe ? 'ניווט מקלדת מלא' : 'Full Keyboard Navigation'}</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isHe 
                  ? 'האתר נגיש באופן מלא לשימוש באמצעות מקלדת בלבד. מעבר בין קישורים וכפתורים במקש Tab, פתיחה ב-Enter או Space, וסגירת חלונות ומודאלים במקש Escape.'
                  : 'The website is completely operable via keyboard alone. Navigate using Tab, activate with Enter/Space, and dismiss modals with Escape.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-3 font-extrabold text-slate-900 text-base mb-2">
                <Volume2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>{isHe ? 'תאימות לקוראי מסך' : 'Screen Reader Compatibility'}</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isHe 
                  ? 'מבנה סמנטי תקני (Header, Nav, Main, Footer), היררכיית כותרות מסודרת (H1-H6), תגיות ARIA מפורטות, ומחווני מצב מפורשים לתוכנות מסייעות (כגון NVDA, JAWS, VoiceOver).'
                  : 'Semantic HTML5 structure (Header, Nav, Main, Footer), proper heading levels (H1-H6), comprehensive ARIA attributes, and accessible state indicators.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-3 font-extrabold text-slate-900 text-base mb-2">
                <Eye className="w-5 h-5 text-burgundy shrink-0" aria-hidden="true" />
                <span>{isHe ? 'חלופות טקסטואליות (Alt Text)' : 'Text Alternatives (Alt Text)'}</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isHe 
                  ? 'כל התמונות, התרשימים, הלוגואים וערכות הבדיקה כוללים תיאורי טקסט אלטרנטיבי מלאים המבטאים את מהות המדיה. תמונות רקע דקורטיביות מוגדרות כ-aria-hidden.'
                  : 'All images, diagrams, logos, and medical test kits feature descriptive alt text. Purely decorative elements are marked with aria-hidden.'}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-3 font-extrabold text-slate-900 text-base mb-2">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" aria-hidden="true" />
                <span>{isHe ? 'עקיפת בלוקים (Skip to Content)' : 'Skip to Main Content Link'}</span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isHe 
                  ? 'בתחילת העמוד מוצב קישור ייעודי לדילוג ישיר לתוכן המרכזי של הדף, הנגיש למשתמשי מקלדת ומאפשר עקיפת תפריטי הניווט החוזרים.'
                  : 'A dedicated skip-link is positioned at the very top of each page, enabling keyboard users to bypass repeated navigation blocks directly.'}
              </p>
            </div>
          </div>

          {/* Detailed text explanation from translation */}
          <div className="mt-6 p-6 rounded-2xl bg-blue-50/50 border border-blue-100 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
            {_('legal.accessibilityS2Text')}
          </div>
        </section>

        {/* Physical Facilities Accessibility */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-md border border-slate-200/80 mb-10" aria-labelledby="facility-heading">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-burgundy/10 border border-burgundy/20 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-burgundy" aria-hidden="true" />
            </div>
            <div>
              <h2 id="facility-heading" className="text-2xl font-black text-slate-900 tracking-tight">
                {_('legal.accessibilityS3Title')}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                {isHe ? 'הסדרי נגישות פיזיים במתקני חברת BMT Diagnostics' : 'Physical accessibility arrangements at BMT Diagnostics facility'}
              </p>
            </div>
          </div>

          <div className="text-slate-600 text-sm md:text-base leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200/70">
            {_('legal.accessibilityS3Text')}
          </div>
        </section>

        {/* Accessibility Coordinator & Contact */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-200/80 mb-10" aria-labelledby="coordinator-heading">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-emerald-600" aria-hidden="true" />
            </div>
            <div>
              <h2 id="coordinator-heading" className="text-2xl font-black text-slate-900 tracking-tight">
                {_('legal.accessibilityS4Title')}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
                {isHe ? 'פרטי יצירת קשר ישירים עם רכז הנגישות של החברה' : 'Direct contact details for the corporate Accessibility Coordinator'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-50/60 border border-emerald-200/70 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-3">
                  {isHe ? 'רכז נגישות מוסמך' : 'Accessibility Coordinator'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  רואי טמיר / Roey Tamir
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {isHe 
                    ? 'אחראי על הנגשת שירותי החברה, קבלת פניות בנושאי נגישות וטיפול בהתאמות פרטניות.'
                    : 'Responsible for service accessibility, inquiries, and individual accommodation requests.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-200/60 space-y-2.5 text-xs sm:text-sm font-bold text-slate-800" dir="ltr">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <a href="tel:+972547448033" className="hover:text-emerald-700 underline underline-offset-4">+972-54-7448033</a>
                  <span className="text-slate-400 font-normal">({isHe ? 'נייד / וואטסאפ' : 'Mobile / WhatsApp'})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <a href="tel:+97246396116" className="hover:text-emerald-700 underline underline-offset-4">+972-4-6396116</a>
                  <span className="text-slate-400 font-normal">({isHe ? 'משרד' : 'Office'})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <a href="mailto:roey@bmtdx.com" className="hover:text-emerald-700 underline underline-offset-4">roey@bmtdx.com</a>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/70 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 bg-slate-200/70 px-3 py-1 rounded-full inline-block mb-3">
                  {isHe ? 'דרכי פנייה נוספות' : 'Additional Contact Channels'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  {isHe ? 'דיווח על תקלה או בקשת מידע נגיש' : 'Issue Reporting & Format Requests'}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {isHe 
                    ? 'אם נתקלתם בקושי כלשהו בגלישה, תקלה טכנית בנגישות או שברצונכם לקבל מידע בפורמט מונגש חלופי (קובץ טקסט, דפוס מוגדל, קובץ שמע), ניתן לפנות אלינו בכל עת ונטפל בפנייתכם בהקדם האפשרי.'
                    : 'If you encountered any accessibility difficulty or require information in alternative formats (large print, audio, text file), please reach out to us.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenRfq}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>{isHe ? 'פנייה מקוונת למוקד' : 'Online Contact Form'}</span>
                </button>
                <a
                  href="https://wa.me/972547448033?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A8%D7%9B%D7%96%20%D7%94%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA%20BMT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition focus:outline-none focus:ring-4 focus:ring-emerald-500/30 flex items-center gap-2 shadow-sm"
                  aria-label={isHe ? 'פנייה מהירה בוואטסאפ (נפתח בחלון חדש)' : 'WhatsApp Inquiry (opens in new tab)'}
                >
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Statement Audit & Update Metadata (Required by Law) */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>{isHe ? 'תאריך עדכון ובדיקת הצהרה: אוקטובר 2024' : 'Statement Last Updated & Audited: October 2024'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{_('legal.docId') || 'Web001 (Controlled Document)'}</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
