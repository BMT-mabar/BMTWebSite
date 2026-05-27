import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Mail, Phone, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RfqModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { _, isRtl } = useLanguage();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Formspree URL (can be customized via VITE_FORMSPREE_ID in .env)
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "xrgndepn";
  const formspreeUrl = `https://formspree.io/f/${FORMSPREE_ID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 4500);
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit the request. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg(err.message || 'An error occurred while sending your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={onClose} aria-hidden="true"></div>
      
      <div className="bg-white rounded-[3rem] w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 m-auto mt-10 md:mt-auto border border-slate-100">
        {/* Modal Header */}
        <div className="bg-slate-900 p-8 md:p-10 flex justify-between items-center text-white border-b-[6px] border-red-800">
          <h3 id="modal-title" className="text-2xl md:text-3xl font-extrabold tracking-tight">{_('rfq.title')}</h3>
          <button 
            onClick={onClose} 
            className="hover:bg-white/20 p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white bg-white/5" 
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 md:p-14 bg-slate-50">
          {success ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle className="w-16 h-16" />
              </div>
              <h4 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">{_('rfq.successTitle')}</h4>
              <p className="text-slate-600 text-xl font-light">{_('rfq.successDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Formspree dynamic custom routing / parameters */}
              <input type="hidden" name="_subject" value="New BMT Diagnostics RFQ Lead" />
              <input type="hidden" name="_to" value="info@bmtdx.com, roey@bmtdx.com" />

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl flex items-start gap-4 animate-fade-in">
                  <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-red-600" />
                  <div>
                    <span className="font-extrabold block mb-1">Submission Failed</span>
                    <span className="text-sm opacity-90">{errorMsg}</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.name')}</label>
                  <input 
                    required 
                    type="text" 
                    name="name" 
                    className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition shadow-sm text-lg"
                  />
                </div>

                {/* Role selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.role')}</label>
                  <div className="relative">
                    <select 
                      required 
                      name="role" 
                      className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition shadow-sm text-lg appearance-none cursor-pointer"
                    >
                      <option value="">{_('rfq.rolePh')}</option>
                      <option>{_('rfq.r1')}</option>
                      <option>{_('rfq.r2')}</option>
                      <option>{_('rfq.r3')}</option>
                      <option>{_('rfq.r4')}</option>
                      <option>{_('rfq.r5')}</option>
                    </select>
                    <div className={`absolute inset-y-0 ${isRtl ? 'left-6' : 'right-6'} flex items-center pointer-events-none text-slate-400`}>
                      <Clock className="w-5 h-5 opacity-40" />
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.clinic')}</label>
                  <input 
                    required 
                    type="text" 
                    name="clinic" 
                    className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition shadow-sm text-lg"
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.email')}</label>
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    dir="ltr" 
                    className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none text-start transition shadow-sm text-lg"
                  />
                </div>

                {/* Direct Phone */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 tracking-wide">{_('rfq.phone')}</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    dir="ltr" 
                    className="w-full bg-white border border-slate-200 p-4 md:p-5 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none text-start transition shadow-sm text-lg"
                  />
                </div>
              </div>

              {/* Form Footer Buttons */}
              <div className="pt-10 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-5 mt-10">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-8 py-5 font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-100 hover:text-slate-900 rounded-2xl transition w-full sm:w-auto text-center text-lg focus:outline-none focus:ring-4 focus:ring-slate-200"
                >
                  {_('rfq.cancel')}
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-red-800 text-white px-10 py-5 rounded-2xl font-extrabold hover:bg-red-900 transition-all duration-300 shadow-xl hover:shadow-red-900/30 disabled:opacity-50 w-full sm:w-auto text-center flex items-center justify-center text-lg focus:outline-none focus:ring-4 focus:ring-red-800/50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    _('rfq.submit')
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
