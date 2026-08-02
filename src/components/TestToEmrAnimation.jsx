import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, CheckCircle2, Cpu, ArrowRight, FileCheck, Lock, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TestToEmrAnimation() {
  const { lang } = useLanguage();
  const isHe = lang === 'he';

  const [activeStep, setActiveStep] = useState(1);
  const [isScanning, setIsScanning] = useState(true);
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
      title: isHe ? 'ביצוע בדיקה מהירה (No-Step)' : 'Perform Rapid Test (No-Step)',
      desc: isHe
        ? 'מערכת האבחון הסגורה והמוגנת בפטנט מאפשרת דגימה היגיינית ללא העברות נוזלים פתוחות.'
        : 'The patented self-contained device enables hygienic sampling without open fluid transfers.',
      tag: isHe ? 'בדיקת קצה היגיינית' : 'Point-of-Care Sampling'
    },
    {
      id: 2,
      stepNum: '02',
      title: isHe ? 'סריקה ואבחון AI אופטי' : 'AI Optical Verification',
      desc: isHe
        ? 'אלגוריתם ראייה ממוחשבת מנתח את עוצמת פסי הבדיקה והביקורת בדיוק של 99.1%+.'
        : 'Computer vision algorithms analyze control and test line intensities with 99.1%+ accuracy.',
      tag: isHe ? 'דיוק קליני AI' : 'Clinical AI Accuracy'
    },
    {
      id: 3,
      stepNum: '03',
      title: isHe ? 'הצפנה ותקשורת מאובטחת' : 'Encrypted Transmission',
      desc: isHe
        ? 'שידור נתונים מוצפן בתקן HIPAA/ISO27001 ישירות לשרתי הבריאות המאובטחים.'
        : 'Data encrypted via HIPAA/ISO27001 standards directly to secure health cloud servers.',
      tag: isHe ? 'אבטחת סייבר מלאה' : 'Full Cyber Security'
    },
    {
      id: 4,
      stepNum: '04',
      title: isHe ? 'סנכרון מיידי לתיק הרפואי (EMR)' : 'Instant EMR Sync',
      desc: isHe
        ? 'התוצאה המאומתת מוזרמת בזמן אמת לתיק המטופל בקופת החולים (כללית, מכבי, מאוחדת, לאומית).'
        : 'Verified result flows automatically into patient EMR files across health systems.',
      tag: isHe ? 'אינטגרציה קלינית' : 'Healthcare Integration'
    }
  ];

  const hmoLogos = [
    { name: isHe ? 'כללית' : 'Clalit', img: 'clalit-logo.jpg', color: 'border-emerald-500' },
    { name: isHe ? 'מכבי' : 'Maccabi', img: 'maccabi-logo.webp', color: 'border-blue-500' },
    { name: isHe ? 'מאוחדת' : 'Meuhedet', img: 'meuhedet-logo.png', color: 'border-orange-500' },
    { name: isHe ? 'לאומית' : 'Leumit', img: 'leumit-logo.jpg', color: 'border-cyan-500' }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-blue-500/20 relative overflow-hidden my-12" dir={isHe ? 'rtl' : 'ltr'}>
      {/* Background Glows & Grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 text-sky-300 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-400 animate-spin-slow" />
          {isHe ? 'טכנולוגיית RapidTest AI & EMR Integration' : 'RapidTest AI & EMR Integration Platform'}
        </div>
        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          {isHe ? 'מהבדיקה המהירה ישירות לתיק הרפואי' : 'From Rapid Test Directly to the EMR'}
        </h3>
        <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
          {isHe
            ? 'מערכת דיגיטלית מקצה לקצה המקשרת בין מכשיר ה-no step, אפליקציית סריקה מתקדמת מבוססת AI וסנכרון מאובטח למערכות המידע הרפואיות.'
            : 'End-to-end digital architecture bridging No-Step devices, computer vision scan engines, and secure medical records.'}
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
                className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border ${isActive
                  ? 'bg-blue-600/20 border-sky-400/60 shadow-[0_0_30px_rgba(56,189,248,0.15)] backdrop-blur-xl translate-x-1'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${isActive ? 'bg-sky-400 text-slate-900 shadow-md shadow-sky-400/30' : 'bg-white/10 text-slate-400'
                      }`}>
                      {step.stepNum}
                    </span>
                    <h4 className="text-lg md:text-xl font-extrabold text-white">{step.title}</h4>
                  </div>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/20 uppercase tracking-wider">
                    {step.tag}
                  </span>
                </div>
                <p className="text-slate-300 text-xs md:text-sm font-normal leading-relaxed ps-11">
                  {step.desc}
                </p>

                {/* Progress bar inside active step */}
                {isActive && (
                  <div className="mt-4 ps-11">
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full transition-all duration-150 rounded-full"
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
          <div className="w-full max-w-sm bg-slate-900 border border-sky-500/30 rounded-[2.5rem] p-6 shadow-[0_0_50px_rgba(0,119,212,0.25)] relative overflow-hidden flex flex-col justify-between min-h-[460px]">

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
                      src="LabOnTime Device.jpg"
                      alt="No Step Pen"
                      className="h-44 object-contain rounded-xl shadow-2xl border border-sky-400/30 p-2 bg-slate-800/80"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-slate-900 font-black text-[10px] px-2 py-0.5 rounded-md uppercase">
                      NO-STEP
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white mb-1">
                    {isHe ? 'מכשיר אבחון סגור' : 'Hermetic Diagnostic Pen'}
                  </span>
                  <span className="text-xs text-sky-300 font-mono">
                    {isHe ? 'מוכן לקריאה אופטית' : 'Ready for Optical Scan'}
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

                    <Smartphone className="w-16 h-16 text-sky-400/40" />

                    {/* Floating AI Bands Detection overlay */}
                    <div className="absolute inset-x-4 bottom-6 bg-slate-900/90 border border-emerald-500/40 rounded-xl p-2 text-[11px] font-mono text-emerald-400 flex justify-between items-center z-10">
                      <span>C-LINE: POSITIVE</span>
                      <span className="font-bold">T-LINE: CLEAR</span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {isHe ? 'אימות AI אופטי: 99.1% התאמה' : 'AI Optical Verification: 99.1% Match'}
                  </span>
                </div>
              )}

              {activeStep === 3 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-blue-500/10 border-2 border-blue-400 flex items-center justify-center mb-6 relative">
                    <Lock className="w-10 h-10 text-sky-400 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border border-sky-400/40 animate-ping" />
                  </div>
                  <span className="text-base font-extrabold text-white mb-1">
                    {isHe ? 'הצפנת נתונים מקצה לקצה' : 'End-to-End Encryption'}
                  </span>
                  <span className="text-xs text-slate-400 max-w-xs font-mono">
                    {isHe ? 'שידור מאובטח בתקן HL7 / FHIR' : 'Secure Transmission via HL7 / FHIR Standard'}
                  </span>
                </div>
              )}

              {activeStep === 4 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                  <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-4 w-full text-start mb-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        {isHe ? 'גיליון רפואי מעודכן' : 'Medical File Updated'}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        VERIFIED
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">PARAM:</span>
                        <span className="text-sky-300 font-bold">Strep A Rapid Test</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">RESULT:</span>
                        <span className="text-emerald-400 font-bold">NEGATIVE (NO DETECT)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">TIME:</span>
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* HMO Badges Strip */}
                  <div className="flex items-center justify-center gap-2 w-full pt-2">
                    {hmoLogos.map((hmo, idx) => (
                      <div key={idx} className="w-10 h-10 rounded-xl bg-white p-1 border flex items-center justify-center shadow-md">
                        <img
                          src={hmo.img}
                          alt={hmo.name}
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Step Switch Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/10">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setActiveStep(num)}
                  className={`py-2 rounded-xl font-mono text-xs font-bold transition-all ${activeStep === num
                    ? 'bg-sky-400 text-slate-900 shadow-md shadow-sky-400/30 scale-105'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                >
                  ST-0{num}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
