import React, { useState } from 'react';
import { MessageCircle, Youtube, Facebook, Linkedin, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SocialFloatingWidget() {
  const { lang, isRtl } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  const phoneNumber = '972547448033';
  const defaultMessages = {
    he: 'שלום BMT Diagnostics, אשמח לקבל מידע נוסף.',
    en: 'Hello BMT Diagnostics, I would like to request more information.',
    de: 'Hallo BMT Diagnostics, ich möchte weitere Informationen anfordern.',
    fr: 'Bonjour BMT Diagnostics, je souhaite recevoir plus d\'informations.',
    ru: 'Здравствуйте, BMT Diagnostics! Я хочу запросить дополнительную информацию.',
    ar: 'مرحباً BMT Diagnostics، أود طلب مزيد من المعلومات.'
  };

  const defaultMsg = defaultMessages[lang] || defaultMessages.en || defaultMessages.he;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;

  const tooltips = {
    whatsapp: {
      he: 'צ׳אט מהיר ב-WhatsApp',
      en: 'Chat on WhatsApp',
      de: 'WhatsApp-Chat',
      fr: 'Discussion WhatsApp',
      ru: 'Чат в WhatsApp',
      ar: 'محادثة واتساب'
    },
    youtube: {
      he: 'ערוץ YouTube הרשמי',
      en: 'Official YouTube Channel',
      de: 'Offizieller YouTube-Kanal',
      fr: 'Chaîne YouTube Officielle',
      ru: 'Официальный канал YouTube',
      ar: 'قناة YouTube الرسمية'
    },
    linkedin: {
      he: 'עמוד LinkedIn העסקי',
      en: 'LinkedIn Company Page',
      de: 'LinkedIn-Unternehmensseite',
      fr: 'Page Entreprise LinkedIn',
      ru: 'Страница компании в LinkedIn',
      ar: 'صفحة الشركة على LinkedIn'
    },
    facebook: {
      he: 'עמוד Facebook הרשמי',
      en: 'Official Facebook Page',
      de: 'Offizielle Facebook-Seite',
      fr: 'Page Facebook Officielle',
      ru: 'Официальная страница Facebook',
      ar: 'صفحة Facebook الرسمية'
    },
    collapse: {
      he: 'צמצם רשתות חברתיות',
      en: 'Collapse Social Links',
      de: 'Social Media einklappen',
      fr: 'Réduire les réseaux',
      ru: 'Свернуть соцсети',
      ar: 'طي وسائل التواصل'
    },
    expand: {
      he: 'פתח רשתות חברתיות',
      en: 'Open Social Links',
      de: 'Social Media öffnen',
      fr: 'Ouvrir les réseaux',
      ru: 'Открыть соцсети',
      ar: 'فتح وسائل التواصل'
    }
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      icon: MessageCircle,
      bg: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(37,211,102,0.35)]',
      tooltip: tooltips.whatsapp[lang] || tooltips.whatsapp.en || tooltips.whatsapp.he
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UC7bdY2FYKhOYeTB8fORrwRg',
      icon: Youtube,
      bg: 'bg-[#FF0000] hover:bg-[#cc0000] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(255,0,0,0.35)]',
      tooltip: tooltips.youtube[lang] || tooltips.youtube.en || tooltips.youtube.he
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/18714416/admin/',
      icon: Linkedin,
      bg: 'bg-[#0A66C2] hover:bg-[#084e96] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(10,102,194,0.35)]',
      tooltip: tooltips.linkedin[lang] || tooltips.linkedin.en || tooltips.linkedin.he
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/bmtDx',
      icon: Facebook,
      bg: 'bg-[#1877F2] hover:bg-[#115fc4] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(24,119,242,0.35)]',
      tooltip: tooltips.facebook[lang] || tooltips.facebook.en || tooltips.facebook.he
    },
  ];

  const collapseTooltip = tooltips.collapse[lang] || tooltips.collapse.en || tooltips.collapse.he;
  const expandTooltip = tooltips.expand[lang] || tooltips.expand.en || tooltips.expand.he;

  return (
    <div 
      className={`fixed bottom-20 sm:bottom-24 ${isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-[85] flex flex-col items-center gap-2.5 transition-all duration-300`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {isExpanded ? (
        <div className="flex flex-col items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${social.bg} ${social.shadow} transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/40 btn-bouncy`}
                aria-label={social.tooltip}
                title={social.tooltip}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                
                {/* Floating Tooltip Bubble */}
                <span 
                  className={`absolute ${isRtl ? 'right-12 sm:right-14' : 'left-12 sm:left-14'} whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg`}
                >
                  {social.tooltip}
                </span>
              </a>
            );
          })}

          {/* Minimize / Toggle button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all text-xs focus:outline-none opacity-70 hover:opacity-100"
            title={collapseTooltip}
            aria-label={collapseTooltip}
          >
            <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/40 btn-bouncy"
          title={expandTooltip}
          aria-label={expandTooltip}
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
}
