import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const { _, isRtl } = useLanguage();
  const [success, setSuccess]       = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg]     = useState(null);
  const formRef    = useRef(null);
  const modalRef   = useRef(null);
  const lastFocusRef = useRef(null);

  const [errors, setErrors]         = useState({});

  /* ── Focus: save/restore ── */
  useEffect(() => {
    if (isOpen) {
      lastFocusRef.current = document.activeElement;
      setErrors({});
      setErrorMsg(null);
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
    setErrorMsg(null);

    const form = formRef.current;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Validate required fields (WCAG 3.3.1, 3.3.2, 3.3.3)
    const newErrors = {};
    if (!payload.name?.trim()) {
      newErrors.name = isRtl ? 'נא להזין שם מלא' : 'Please enter your full name';
    }
    if (!payload.role?.trim()) {
      newErrors.role = isRtl ? 'נא לבחור תפקיד מהרשימה' : 'Please select your role';
    }
    if (!payload.organization?.trim()) {
      newErrors.organization = isRtl ? 'נא להזין שם מוסד או חברה' : 'Please enter company or institution';
    }
    if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      newErrors.email = isRtl ? 'נא להזין כתובת דוא"ל תקינה' : 'Please enter a valid email address';
    }
    if (!payload.phone?.trim() || payload.phone.trim().length < 6) {
      newErrors.phone = isRtl ? 'נא להזין מספר טלפון ליצירת קשר' : 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstFieldId = Object.keys(newErrors)[0];
      const el = form.querySelector(`[name="${firstFieldId}"]`);
      el?.focus();
      return;
    }

    setErrors({});
    setSubmitting(true);

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
      setErrorMsg(_('rfq.errorMsg') || (isRtl ? 'אירעה שגיאה בעת שליחת הפנייה. אנא פנו ישירות ל-info@bmtdx.com' : 'An error occurred while submitting the form. Please contact info@bmtdx.com'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputCls = (hasErr) => `w-full bg-slate-50 border ${hasErr ? 'border-red-500 bg-red-50/20 ring-2 ring-red-400/30' : 'border-slate-300'} p-3.5 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 focus:bg-white outline-none transition text-sm text-slate-900`;
  const labelCls = 'block text-sm font-extrabold text-slate-800 mb-1.5';

  return typeof document !== 'undefined' ? createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={modalRef}
        className="bg-white rounded-[2.5rem] w-full max-w-3xl relative z-10 overflow-hidden shadow-2xl border border-slate-100 max-h-[min(92vh,calc(100dvh-2rem))] my-auto flex flex-col animate-in zoom-in-95 accessibility-modal-card"
        style={{ animation: 'rfqFadeIn 0.25s ease-out both' }}
      >
        {/* Brand stripes */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-blue-800 shrink-0" aria-hidden="true" />
        <div className="h-[2px] w-full bg-burgundy shrink-0" aria-hidden="true" />

        {/* Pinned Header (Always visible, close button never obscured) */}
        <div className="px-6 sm:px-10 pt-5 pb-4 flex justify-between items-start border-b border-slate-100 shrink-0 bg-white z-20">
          <div>
            <h2 id="modal-title" className="text-xl sm:text-2xl md:text-[1.75rem] font-black text-slate-900 tracking-tight">
              {_('rfq.title')}
            </h2>
            <p id="modal-desc" className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
              {_('rfq.sub')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 p-2 sm:p-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0 ms-4 mt-0.5"
            aria-label={_('rfq.cancel') || (isRtl ? 'סגור טופס' : 'Close form')}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 sm:px-10 py-6 overflow-y-auto flex-grow">
          {success ? (
            /* ── Success state ── */
            <div className="text-center py-14" role="status" aria-live="polite">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-7 border border-emerald-200 shadow-sm">
                <CheckCircle className="w-10 h-10 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{_('rfq.successTitle')}</h3>
              <p className="text-slate-600 font-medium">{_('rfq.successDesc')}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Error live region (WCAG 3.3.1 / 3.3.3) */}
              <div role="alert" aria-live="assertive" aria-atomic="true">
                {errorMsg && (
                  <div className="bg-red-50 border border-red-300 text-red-900 p-4 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
                    <p className="text-sm font-bold leading-relaxed">{errorMsg}</p>
                  </div>
                )}
                {Object.keys(errors).length > 0 && !errorMsg && (
                  <div className="bg-red-50 border border-red-300 text-red-900 p-4 rounded-2xl flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" aria-hidden="true" />
                    <div className="text-sm font-bold leading-relaxed">
                      <span>{isRtl ? 'ישנם שדות שדורשים את תיקונך:' : 'Please correct the highlighted fields below:'}</span>
                      <ul className="list-disc list-inside mt-1 font-semibold text-xs">
                        {Object.values(errors).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Full Name */}
                <div>
                  <label htmlFor="rfq-name" className={labelCls}>
                    {_('rfq.name')}
                    <span className="text-burgundy font-black ms-1" aria-hidden="true">*</span>
                    <span className="sr-only">({isRtl ? 'שדה חובה' : 'required'})</span>
                  </label>
                  <input
                    id="rfq-name" required type="text" name="name"
                    autoComplete="name" aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'rfq-name-err' : undefined}
                    className={inputCls(!!errors.name)}
                  />
                  {errors.name && (
                    <p id="rfq-name-err" className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="rfq-role" className={labelCls}>
                    {_('rfq.role')}
                    <span className="text-burgundy font-black ms-1" aria-hidden="true">*</span>
                    <span className="sr-only">({isRtl ? 'שדה חובה' : 'required'})</span>
                  </label>
                  <select
                    id="rfq-role" required name="role"
                    aria-required="true"
                    aria-invalid={errors.role ? 'true' : 'false'}
                    aria-describedby={errors.role ? 'rfq-role-err' : undefined}
                    className={inputCls(!!errors.role) + ' appearance-none cursor-pointer'}
                  >
                    <option value="">{_('rfq.rolePh')}</option>
                    <option>{_('rfq.r1')}</option>
                    <option>{_('rfq.r2')}</option>
                    <option>{_('rfq.r3')}</option>
                    <option>{_('rfq.r4')}</option>
                    <option>{_('rfq.r5')}</option>
                  </select>
                  {errors.role && (
                    <p id="rfq-role-err" className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.role}</span>
                    </p>
                  )}
                </div>

                {/* Clinic / Company */}
                <div className="md:col-span-2">
                  <label htmlFor="rfq-clinic" className={labelCls}>
                    {_('rfq.clinic')}
                    <span className="text-burgundy font-black ms-1" aria-hidden="true">*</span>
                    <span className="sr-only">({isRtl ? 'שדה חובה' : 'required'})</span>
                  </label>
                  <input
                    id="rfq-clinic" required type="text" name="organization"
                    autoComplete="organization" aria-required="true"
                    aria-invalid={errors.organization ? 'true' : 'false'}
                    aria-describedby={errors.organization ? 'rfq-clinic-err' : undefined}
                    className={inputCls(!!errors.organization)}
                  />
                  {errors.organization && (
                    <p id="rfq-clinic-err" className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.organization}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="rfq-email" className={labelCls}>
                    {_('rfq.email')}
                    <span className="text-burgundy font-black ms-1" aria-hidden="true">*</span>
                    <span className="sr-only">({isRtl ? 'שדה חובה' : 'required'})</span>
                  </label>
                  <input
                    id="rfq-email" required type="email" name="email"
                    dir="ltr" autoComplete="email" aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'rfq-email-err' : undefined}
                    className={inputCls(!!errors.email)}
                  />
                  {errors.email && (
                    <p id="rfq-email-err" className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="rfq-phone" className={labelCls}>
                    {_('rfq.phone')}
                    <span className="text-burgundy font-black ms-1" aria-hidden="true">*</span>
                    <span className="sr-only">({isRtl ? 'שדה חובה' : 'required'})</span>
                  </label>
                  <input
                    id="rfq-phone" required type="tel" name="phone"
                    dir="ltr" autoComplete="tel" aria-required="true"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'rfq-phone-err' : undefined}
                    className={inputCls(!!errors.phone)}
                  />
                  {errors.phone && (
                    <p id="rfq-phone-err" className="text-red-600 text-xs font-bold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="rfq-message" className={labelCls}>
                    {_('rfq.message')}
                  </label>
                  <textarea
                    id="rfq-message" name="message" rows={4}
                    placeholder={_('rfq.messagePh')}
                    className={inputCls(false) + ' resize-y'}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-5 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur-md -mx-6 sm:-mx-10 px-6 sm:px-10 py-4 -mb-6 mt-6 z-10 shadow-[0_-8px_16px_rgba(0,0,0,0.03)]">
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
    </div>,
    document.body
  ) : null;
}
