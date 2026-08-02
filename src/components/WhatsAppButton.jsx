import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const { lang, isRtl } = useLanguage();

  const phoneNumber = '972547448033';
  const defaultMsg = lang === 'he'
    ? 'שלום BMT Diagnostics, אשמח לקבל מידע נוסף.'
    : 'Hello BMT Diagnostics, I would like to request more information.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;

  const labelText = lang === 'he'
    ? 'צ׳אט מהיר ב-WhatsApp'
    : lang === 'ru'
    ? 'Чат в WhatsApp'
    : lang === 'ar'
    ? 'محادثة واتساب'
    : 'Chat on WhatsApp';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-24 ${isRtl ? 'right-6' : 'left-6'} z-[85] group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/40`}
      aria-label={labelText}
      title={labelText}
    >
      <span className="relative flex items-center justify-center">
        <MessageCircle className="w-6 h-6 fill-current shrink-0" />
        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75" />
      </span>
      <span className="hidden sm:inline-block font-extrabold text-sm tracking-wide">
        {labelText}
      </span>
    </a>
  );
}
