import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, CheckCircle2, Cpu, ArrowRight, FileCheck, Lock, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function TestToEmrAnimation() {
  const { lang } = useLanguage();
  const isHe = lang === 'he';

  const [activeStep, setActiveStep] = useState(1);
  const [scanProgress, setScanProgress] = useState(0);

  // Auto progression ticker for high dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      stepNum: '01',
      title: isHe ? 'ביצוע הבדיקה בקסטה לשימוש עצמי' : 'Perform Rapid Self-Test',
      desc: isHe 
        ? 'הנחיות ברורות ומובנות שלב-אחר-שלב לביצוע היגייני, פשוט ומדויק של הבדיקה המהירה בקסטת אבחון לשימוש עצמי.'
        : 'Clear, step-by-step guidance for simple, hygienic, and precise rapid testing with a self-test cassette.',
      tag: isHe ? 'קסטת אבחון מהירה' : 'Self-Test Cassette'
    },
    {
      id: 2,
      stepNum: '02',
      title: isHe ? 'סריקה ופענוח אופטי AI' : 'Optical AI Scanning & Verification',
      desc: isHe 
        ? 'אלגוריתם ראייה ממוחשבת מנתח בצורה אוטומטית את עוצמת פסי הבדיקה והביקורת בזמן אמת.'
        : 'Computer vision algorithms automatically analyze test and control line signals in real time.',
      tag: isHe ? 'פענוח אופטי אוטומטי' : 'Automated Optical AI'
    },
    {
      id: 3,
      stepNum: '03',
      title: isHe ? 'תקשורת מוצפנת ומאובטחת' : 'Encrypted & Secure Transmission',
      desc: isHe 
        ? 'שידור נתונים מוצפן מקצה לקצה בתקני אבטחה מחמירים (ISO 27001 / HIPAA) לשרתי הבריאות.'
        : 'End-to-end encrypted data transmission via ISO 27001 and HIPAA standards to health servers.',
      tag: isHe ? 'הצפנת נתונים 256-bit' : '256-bit Encryption'
    },
    {
      id: 4,
      stepNum: '04',
      title: isHe ? 'סנכרון ישיר עם התיק הרפואי (EMR)' : 'Direct EMR Synchronization',
      desc: isHe 
        ? 'התוצאה המאומתת נרשמת אוטומטית ובזמן אמת בגיליון הרפואי של המטופל בקופות החולים.'
        : 'Verified diagnostic results sync automatically into the patient medical file in real time.',
      tag: isHe ? 'סנכרון קליני בזמן אמת' : 'Real-Time EMR Sync'
    }
  ];

  const hmoLogos = [
    { name: isHe ? 'כללית' : 'Clalit', img: getAssetPath('clalit-logo.jpg'), color: 'border-emerald-500' },
    { name: isHe ? 'מכבי' : 'Maccabi', img: getAssetPath('maccabi-logo.webp'), color: 'border-blue-500' },
    { name: isHe ? 'מאוחדת' : 'Meuhedet', img: getAssetPath('meuhedet-logo.png'), color: 'border-orange-500' },
    { name: isHe ? 'לאומית' : 'Leumit', img: getAssetPath('leumit-logo.jpg'), color: 'border-cyan-500' }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-blue-50/90 via-sky-50 to-slate-50 text-slate-900 rounded-[3rem] p-8 md:p-14 shadow-lg border border-sky-200/80 relative overflow-hidden my-12" dir={isHe ? 'rtl' : 'ltr'}>
      {/* Background Glows & Grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-400/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,103,181,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(2,103,181,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4 shadow-md">
          <Sparkles className="w-4 h-4 text-sky-200 animate-spin-slow" />
          {isHe ? 'מערכת דיגיטלית מתקדמת של חברת BMT Diagnostics' : 'Patented Digital Health System by BMT Diagnostics'}
        </div>
        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
          {isHe ? 'מהבדיקה המהירה ישירות לתיק הרפואי' : 'From Rapid Test Directly to the EMR'}
        </h3>
        <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">
          {isHe
            ? 'פלטפורמה גנרית מתקדמת המקשרת בין ערכות אבחון מהירות, אפליקציית סריקה ופענוח אופטי מבוססת בינה מלאכותית (AI) וסנכרון מאובטח למערכות המידע הרפואיות (EMR).'
            : 'A generic, patented digital platform connecting rapid diagnostic kits, AI computer vision scanning, and secure EMR data integration.'}
        </p>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Dynamic Workflow Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 translate-x-1'
                    : 'bg-white/70 border-slate-200/90 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                      isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {step.stepNum}
                    </span>
                    <h4 className="text-lg md:text-xl font-extrabold text-slate-900">{step.title}</h4>
                  </div>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
                    {step.tag}
                  </span>
                </div>
                <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed ps-11">
                  {step.desc}
                </p>

                {/* Progress bar inside active step */}
                {isActive && (
                  <div className="mt-4 ps-11">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-sky-400 h-full transition-all duration-150 rounded-full"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: High-Tech Live Scanner Simulation Mockup (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-slate-900 border border-sky-500/30 rounded-[2.5rem] p-6 shadow-[0_0_50px_rgba(2,103,181,0.2)] relative overflow-hidden flex flex-col justify-between min-h-[460px] text-white">
            
            {/* Top Status Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-emerald-400 font-bold">BMT-AI CONNECTED</span>
              </div>
              <span className="font-mono">HIPAA 256-bit</span>
            </div>

            {/* Stage Visual Display Switcher */}
            <div className="my-auto flex flex-col items-center text-center py-4">
              {activeStep === 1 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                  <div className="relative mb-6">
                    <img
                      src={getAssetPath('DSC_2078.JPG')}
                      alt="Self-Test Diagnostic Cassette"
                      className="h-44 object-contain rounded-xl shadow-2xl border border-sky-400/30 p-2 bg-white"
                      onError={(e) => { e.target.src = getAssetPath('20260323_161807.jpg'); }}
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white font-black text-[10px] px-2 py-0.5 rounded-md uppercase">
                      SELF-TEST
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white mb-1">
                    {isHe ? 'קסטת אבחון מהירה לשימוש עצמי' : 'Rapid Self-Test Cassette'}
                  </span>
                  <span className="text-xs text-sky-300 font-mono">
                    {isHe ? 'מוכנה לקריאה אופטית' : 'Ready for Optical Scan'}
                  </span>
                </div>
              )}

              {activeStep === 2 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                  <div className="w-48 h-48 rounded-3xl border-2 border-dashed border-sky-400/80 relative flex items-center justify-center bg-slate-950/80 overflow-hidden mb-4 shadow-inner">
                    {/* Laser Scan Line */}
                    <div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8] z-20"
                      style={{ top: `${scanProgress}%` }}
                    />
                    <Smartphone className="w-16 h-16 text-sky-400 animate-pulse" />
                  </div>
                  <span className="text-sm font-extrabold text-white mb-1">
                    {isHe ? 'פענוח אופטי בלייזר AI' : 'AI Optical Laser Scan'}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    {isHe ? 'אות קליני מאומת 99.1%+' : 'Signal Confirmed 99.1%+'}
                  </span>
                </div>
              )}

              {activeStep === 3 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center mb-6 shadow-inner">
                    <Lock className="w-10 h-10 text-sky-400 animate-bounce" />
                  </div>
                  <span className="text-sm font-extrabold text-white mb-1">
                    {isHe ? 'הצפנת 256-bit בתקן HIPAA' : 'HIPAA 256-bit Encryption'}
                  </span>
                  <span className="text-xs text-sky-300 font-mono">
                    {isHe ? 'שידור מאובטח לשרת' : 'Secure Transmission'}
                  </span>
                </div>
              )}

              {activeStep === 4 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <span className="text-sm font-extrabold text-white mb-3">
                    {isHe ? 'סנכרון מלא למערכת EMR' : 'EMR Integration Completed'}
                  </span>
                  
                  {/* HMO Badges */}
                  <div className="grid grid-cols-4 gap-2 w-full mt-2">
                    {hmoLogos.map((hmo, i) => (
                      <div key={i} className={`bg-slate-800 p-2 rounded-xl border ${hmo.color} flex flex-col items-center`}>
                        <img 
                          src={hmo.img} 
                          alt={hmo.name} 
                          className="h-6 object-contain rounded mb-1 bg-white p-0.5"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="text-[9px] font-black text-slate-300">{hmo.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Control */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">ISO 27001 Certified</span>
              <button
                onClick={() => setActiveStep((prev) => (prev % 4) + 1)}
                className="text-sky-300 hover:text-white font-extrabold flex items-center gap-1 transition"
              >
                <span>{isHe ? 'שלב הבא' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
