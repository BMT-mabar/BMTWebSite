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
      className={`fixed bottom-20 sm:bottom-24 ${isRtl ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-[85] flex flex-col items-center gap-2.5 transition-all duration-300`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {isExpanded ? (
        <div className="flex flex-col items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            const tooltip = lang === 'he' ? social.tooltipHe : social.tooltipEn;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${social.bg} ${social.shadow} transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/40 btn-bouncy`}
                aria-label={tooltip}
                title={tooltip}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                
                {/* Floating Tooltip Bubble */}
                <span 
                  className={`absolute ${isRtl ? 'right-12 sm:right-14' : 'left-12 sm:left-14'} whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg`}
                >
                  {tooltip}
                </span>
              </a>
            );
          })}

          {/* Minimize / Toggle button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all text-xs focus:outline-none opacity-70 hover:opacity-100"
            title={lang === 'he' ? 'צמצם רשתות חברתיות' : 'Collapse Social Links'}
            aria-label={lang === 'he' ? 'צמצם' : 'Collapse'}
          >
            <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/40 btn-bouncy"
          title={lang === 'he' ? 'פתח רשתות חברתיות' : 'Open Social Links'}
          aria-label={lang === 'he' ? 'פתח רשתות חברתיות' : 'Open Social Links'}
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
}
