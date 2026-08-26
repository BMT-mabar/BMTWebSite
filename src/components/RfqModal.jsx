import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * RfqModal — Integrates directly with Google Apps Script & Google Sheets Web App.
 *
 * HOW IT WORKS:
 *  - Submits to Google Apps Script Web App.
 *  - Appends submission to Google Sheets and sends instant email to info@bmtdx.com and roey@bmtdx.com.
 */

const GOOGLE_SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxymJ-tYHSLlnFcTMCsLOvUt6nCtIuV91zjtGN_qsYI2zU79iEIKftFaTRRTdw-Oaspag/exec';

export default function RfqModal({ isOpen, onClose }) {
  const { lang, _, isRtl } = useLanguage();
  const [success, setSuccess]       = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg]     = useState(null);
  const formRef    = useRef(null);
  const modalRef   = useRef(null);
  const lastFocusRef = useRef(null);

  /* ── Focus: save/restore ── */
  useEffect(() => {
    if (isOpen) {
      lastFocusRef.current = document.activeElement;
      const raf = requestAnimationFrame(() => {
        const first = modalRef.current?.querySelector(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        first?.focus();
      });
      return () => cancelAnimationFrame(raf);
    } else {
      lastFocusRef.current?.focus();
    }
  }, [isOpen]);

  /* ── Focus trap ── */
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'Tab') {
      const el = modalRef.current;
      if (!el) return;
      const nodes = Array.from(
        el.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  /* ── Submit directly to Google Apps Script / Google Sheets endpoint ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const form = formRef.current;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      await fetch(GOOGLE_SCRIPT_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      setSuccess(true);
      form.reset();
      setTimeout(() => { setSuccess(false); onClose(); }, 4000);
    } catch (err) {
      console.error('Google Sheets submission error:', err);
      setErrorMsg(_('rfq.errorMsg') || 'An error occurred while submitting the form. Please contact info@bmtdx.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputCls = 'w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition text-sm';
  const labelCls = 'block text-sm font-bold text-slate-800 mb-2';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={modalRef}
        className="bg-white rounded-[2.5rem] w-full max-w-3xl relative z-10 overflow-hidden shadow-2xl border border-slate-100 max-h-[95vh] overflow-y-auto"
        style={{ animation: 'rfqFadeIn 0.25s ease-out both' }}
      >
        {/* Brand stripes */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, #005EAD, #004F92)' }} aria-hidden="true" />
        <div className="h-[2px] w-full bg-burgundy" aria-hidden="true" />

        {/* Header */}
        <div className="px-8 md:px-10 pt-8 pb-6 flex justify-between items-start border-b border-slate-100">
          <div>
            <h2 id="modal-title" className="text-2xl md:text-[1.75rem] font-extrabold text-slate-900 tracking-tight">
              {_('rfq.title')}
            </h2>
            <p id="modal-desc" className="text-slate-400 text-sm mt-1 font-light">
              {_('rfq.sub')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200 p-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0 mt-1"
            aria-label={_('rfq.cancel')}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 md:px-10 py-8">
          {success ? (
            /* ── Success state ── */
            <div className="text-center py-14" role="status" aria-live="polite">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-7 border border-emerald-100 shadow-sm">
                <CheckCircle className="w-10 h-10 text-emerald-500" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{_('rfq.successTitle')}</h3>
              <p className="text-slate-500 font-light">{_('rfq.successDesc')}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Error live region */}
              <div role="alert" aria-live="assertive" aria-atomic="true">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
                    <p className="text-sm leading-relaxed">{errorMsg}</p>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Full Name */}
                <div>
                  <label htmlFor="rfq-name" className={labelCls}>
                    {_('rfq.name')}
                  </label>
                  <input
                    id="rfq-name" required type="text" name="name"
                    autoComplete="name" aria-required="true"
                    className={inputCls}
                  />
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="rfq-role" className={labelCls}>
                    {_('rfq.role')}
                  </label>
                  <select
                    id="rfq-role" required name="role"
                    aria-required="true"
                    className={inputCls + ' appearance-none cursor-pointer'}
                  >
                    <option value="">{_('rfq.rolePh')}</option>
                    <option>{_('rfq.r1')}</option>
                    <option>{_('rfq.r2')}</option>
                    <option>{_('rfq.r3')}</option>
                    <option>{_('rfq.r4')}</option>
                    <option>{_('rfq.r5')}</option>
                  </select>
                </div>

                {/* Clinic / Company */}
                <div className="md:col-span-2">
                  <label htmlFor="rfq-clinic" className={labelCls}>
                    {_('rfq.clinic')}
                  </label>
                  <input
                    id="rfq-clinic" required type="text" name="organization"
                    autoComplete="organization" aria-required="true"
                    className={inputCls}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="rfq-email" className={labelCls}>
                    {_('rfq.email')}
                  </label>
                  <input
                    id="rfq-email" required type="email" name="email"
                    dir="ltr" autoComplete="email" aria-required="true"
                    className={inputCls}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="rfq-phone" className={labelCls}>
                    {_('rfq.phone')}
                  </label>
                  <input
                    id="rfq-phone" required type="tel" name="phone"
                    dir="ltr" autoComplete="tel" aria-required="true"
                    className={inputCls}
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="rfq-message" className={labelCls}>
                    {_('rfq.message')}
                  </label>
                  <textarea
                    id="rfq-message" name="message" rows={4}
                    placeholder={_('rfq.messagePh')}
                    className={inputCls + ' resize-y'}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  type="button" onClick={onClose}
                  className="px-7 py-3 font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {_('rfq.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-burgundy text-white px-9 py-3 rounded-full font-extrabold hover:brightness-110 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-burgundy/30 min-w-[140px]"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      <span>{_('rfq.sending')}</span>
                    </>
                  ) : (
                    _('rfq.submit')
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes rfqFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}
