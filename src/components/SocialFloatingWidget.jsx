import React, { useState } from 'react';
import { MessageCircle, Youtube, Facebook, Linkedin, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SocialFloatingWidget() {
  const { lang, isRtl } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);

  const phoneNumber = '972547448033';
  const defaultMsg = lang === 'he'
    ? 'שלום BMT Diagnostics, אשמח לקבל מידע נוסף.'
    : 'Hello BMT Diagnostics, I would like to request more information.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      icon: MessageCircle,
      bg: 'bg-[#25D366] hover:bg-[#20bd5a] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(37,211,102,0.35)]',
      tooltipHe: 'צ׳אט מהיר ב-WhatsApp',
      tooltipEn: 'Chat on WhatsApp',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/channel/UC7bdY2FYKhOYeTB8fORrwRg',
      icon: Youtube,
      bg: 'bg-[#FF0000] hover:bg-[#cc0000] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(255,0,0,0.35)]',
      tooltipHe: 'ערוץ YouTube הרשמי',
      tooltipEn: 'Official YouTube Channel',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/18714416/admin/',
      icon: Linkedin,
      bg: 'bg-[#0A66C2] hover:bg-[#084e96] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(10,102,194,0.35)]',
      tooltipHe: 'עמוד LinkedIn העסקי',
      tooltipEn: 'LinkedIn Company Page',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/bmtDx',
      icon: Facebook,
      bg: 'bg-[#1877F2] hover:bg-[#115fc4] text-white',
      shadow: 'shadow-[0_8px_25px_rgba(24,119,242,0.35)]',
      tooltipHe: 'עמוד Facebook הרשמי',
      tooltipEn: 'Official Facebook Page',
    },
  ];

  return (
    <div 
      className={`fixed bottom-24 ${isRtl ? 'right-6' : 'left-6'} z-[85] flex flex-col items-center gap-3 transition-all duration-300`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {isExpanded ? (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            const tooltip = lang === 'he' ? social.tooltipHe : social.tooltipEn;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-12 h-12 rounded-full ${social.bg} ${social.shadow} transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/40`}
                aria-label={tooltip}
                title={tooltip}
              >
                <Icon className="w-5 h-5 fill-current shrink-0" />
                
                {/* Floating Tooltip Bubble */}
                <span 
                  className={`absolute ${isRtl ? 'right-14' : 'left-14'} whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg`}
                >
                  {tooltip}
                </span>
              </a>
            );
          })}
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition focus:outline-none"
          title={lang === 'he' ? 'פתח רשתות חברתיות' : 'Open Social Links'}
        >
          <Share2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
