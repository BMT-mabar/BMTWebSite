import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, X, AlertCircle, Scale, Lock, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function Footer() {
  const { _, isRtl } = useLanguage();
  const navigate = useNavigate();
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-blue-50/20 text-slate-600 overflow-hidden z-10 border-t border-slate-200">
      {/* Brand Dual Stripe Divider on top edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
      <div className="h-[2px] w-full bg-burgundy"></div>

      {/* Decorative background grid and soft clinical overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,94,173,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,94,173,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-1/3 w-[350px] h-[350px] bg-blue-300/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 mb-20">
          
          {/* Brand Identity & Summary */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <div className="bg-white inline-block p-5 rounded-[2rem] mb-8 shadow-md border border-slate-100 max-w-[240px]">
              <img 
                src={getAssetPath('BMT Logo.jpg')} 
                alt="BMT Diagnostics" 
                className="h-10 md:h-12 object-contain mix-blend-multiply" 
                onError={(e) => { e.target.style.display='none'; if (e.target.nextSibling) e.target.nextSibling.style.display='block'; }}
              />
              <div style={{display:'none'}} className="text-3xl font-black text-slate-900">BMT</div>
            </div>
            <p className="text-base md:text-lg leading-relaxed max-w-md font-medium text-slate-500 mb-6">
              {_('footer.desc')}
            </p>
            {/* Controlled Version Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-100/90 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-slate-600 text-xs font-mono font-bold w-fit shadow-inner">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>{_('footer.controlledDoc')}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-slate-900 font-extrabold mb-8 text-sm md:text-base tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-3 bg-burgundy rounded-full"></span>
              {_('footer.linksTitle')}
            </h4>
            <ul className="space-y-4 font-bold text-base">
              <li>
                <button 
                  onClick={() => handleNav('/catalog/b2b')} 
                  className="relative py-1 text-slate-550 hover:text-blue-600 transition-colors text-start focus:outline-none group inline-flex items-center gap-1"
                >
                  <span>{_('footer.l1')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-350 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/catalog/b2c')} 
                  className="relative py-1 text-slate-550 hover:text-blue-600 transition-colors text-start focus:outline-none group inline-flex items-center gap-1"
                >
                  <span>{_('footer.l2')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-350 group-hover:w-full"></span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('/clinical')} 
                  className="relative py-1 text-slate-550 hover:text-blue-600 transition-colors text-start focus:outline-none group inline-flex items-center gap-1"
                >
                  <span>{_('footer.l3')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0.5" />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-350 group-hover:w-full"></span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-slate-900 font-extrabold mb-8 text-sm md:text-base tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-3 bg-blue-600 rounded-full"></span>
              {_('footer.contactTitle')}
            </h4>
            <ul className="space-y-5 font-bold text-base text-slate-500">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" /> 
                <span className="leading-snug text-slate-500">{_('footer.address')}</span>
              </li>
              <li className="flex items-center gap-4" dir="ltr">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" /> 
                <span className="text-start hover:text-blue-700 transition-colors cursor-default">+972-4-6396116</span>
              </li>
              <li className="flex items-center gap-4" dir="ltr">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" /> 
                <a href="mailto:info@bmtdx.com" className="text-start hover:text-blue-600 transition-colors underline decoration-blue-500/30 underline-offset-4">info@bmtdx.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Policies framed inside pure white clinical card */}
        <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 md:p-10 shadow-sm text-sm text-slate-500 font-medium flex flex-col lg:flex-row justify-between gap-8 items-start">
          <div className="max-w-4xl">
            <p className="mb-3 uppercase font-extrabold text-slate-900 tracking-widest text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {_('footer.disclaimer')}
            </p>
            <p className="leading-relaxed text-[13px] text-slate-450 font-normal mb-4">
              {_('footer.legal')}
            </p>
            
            {/* Legal Documents Links */}
            <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-100 text-xs font-bold">
              <button
                onClick={() => setLegalModal('privacy')}
                className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-4 transition-colors focus:outline-none"
              >
                {_('legal.privacyTitle')}
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => setLegalModal('terms')}
                className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-4 transition-colors focus:outline-none"
              >
                {_('legal.termsTitle')}
              </button>
            </div>
          </div>
          <div className="lg:text-right shrink-0 self-end lg:self-center font-bold text-xs tracking-wider text-slate-400">
            © {new Date().getFullYear()} BMT Diagnostics.
            <span className="block mt-1 font-semibold opacity-80">{_('footer.rights')}</span>
          </div>
        </div>
      </div>

      {/* Comprehensive MedTech Legal Modal */}
      {legalModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-10 relative max-h-[88vh] overflow-y-auto flex flex-col justify-between">
            
            {/* Close Button */}
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition-colors focus:outline-none z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              {/* Segmented Modal Tabs */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8 w-fit max-w-full">
                <button
                  onClick={() => setLegalModal('privacy')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${legalModal === 'privacy' ? 'bg-white text-blue-900 shadow-md scale-102' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{_('legal.privacyTab')}</span>
                </button>
                <button
                  onClick={() => setLegalModal('terms')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${legalModal === 'terms' ? 'bg-white text-blue-900 shadow-md scale-102' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <Scale className="w-4 h-4 text-burgundy" />
                  <span>{_('legal.termsTab')}</span>
                </button>
              </div>

              {/* TAB 1: PRIVACY POLICY */}
              {legalModal === 'privacy' && (
                <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {_('legal.privacyTitle')}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {_('legal.privacyDocMeta')}
                    </p>
                  </div>

                  <div className="bg-blue-50/80 border border-blue-200/80 p-5 rounded-2xl text-blue-950 font-medium text-xs sm:text-sm leading-relaxed">
                    <strong>{_('legal.privacyCommitmentTitle')}</strong>{' '}
                    {_('legal.privacyCommitmentText')}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      {_('legal.privacyS1Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.privacyS1Text')}
                    </p>

                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      {_('legal.privacyS2Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.privacyS2Text')}
                    </p>

                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      {_('legal.privacyS3Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.privacyS3Text')}
                    </p>

                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {_('legal.privacyS4Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.privacyS4Text')}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: TERMS AND CONDITIONS & MEDICAL DISCLAIMER */}
              {legalModal === 'terms' && (
                <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {_('legal.termsTitle')}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {_('legal.termsDocMeta')}
                    </p>
                  </div>

                  {/* Medical Disclaimer Banner */}
                  <div className="bg-amber-50/90 border border-amber-200 p-5 rounded-2xl text-amber-950 font-medium text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-1">
                        {_('legal.termsDisclaimerTitle')}
                      </strong>
                      {_('legal.termsDisclaimerText')}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <Scale className="w-4 h-4 text-burgundy" />
                      {_('legal.termsS1Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.termsS1Text')}
                    </p>

                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-burgundy" />
                      {_('legal.termsS2Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.termsS2Text')}
                    </p>

                    <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-burgundy" />
                      {_('legal.termsS3Title')}
                    </h4>
                    <p className="text-xs sm:text-sm">
                      {_('legal.termsS3Text')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Status & Action */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{_('legal.docId')}</span>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold text-sm transition focus:outline-none shadow-md btn-bouncy"
              >
                {_('legal.acknowledgeBtn')}
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
}
