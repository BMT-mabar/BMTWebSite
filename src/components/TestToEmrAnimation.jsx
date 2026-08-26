import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Lock, Sparkles, Play, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAssetPath } from '../utils/imagePath';

export default function TestToEmrAnimation() {
  const { _, isRtl } = useLanguage();

  const [activeStep, setActiveStep] = useState(1);
  const [scanProgress, setScanProgress] = useState(0);

  // Auto progression scan line ticker
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
      stepNum: _('emr.s1Num') || '01',
      title: _('emr.s1Title'),
      desc: _('emr.s1Desc'),
      tag: _('emr.s1Tag')
    },
    {
      id: 2,
      stepNum: _('emr.s2Num') || '02',
      title: _('emr.s2Title'),
      desc: _('emr.s2Desc'),
      tag: _('emr.s2Tag'),
      isBeta: true
    },
    {
      id: 3,
      stepNum: _('emr.s3Num') || '03',
      title: _('emr.s3Title'),
      desc: _('emr.s3Desc'),
      tag: _('emr.s3Tag')
    },
    {
      id: 4,
      stepNum: _('emr.s4Num') || '04',
      title: _('emr.s4Title'),
      desc: _('emr.s4Desc'),
      tag: _('emr.s4Tag'),
      isPilot: true
    }
  ];

  const hmoLogos = [
    { name: _('home.partnerClalit') || 'Clalit', img: getAssetPath('clalit-logo.jpg'), color: 'border-emerald-300' },
    { name: _('home.partnerMaccabi') || 'Maccabi', img: getAssetPath('maccabi-logo.webp'), color: 'border-blue-300' },
    { name: _('home.partnerMeuhedet') || 'Meuhedet', img: getAssetPath('meuhedet-logo.png'), color: 'border-orange-300' },
    { name: _('home.partnerLeumit') || 'Leumit', img: getAssetPath('leumit-logo.jpg'), color: 'border-cyan-300' }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-slate-50 text-slate-900 rounded-[3rem] p-8 md:p-14 shadow-lg border border-sky-200/90 relative overflow-hidden my-12" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/[0.12] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,103,181,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(2,103,181,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Header & Patent Recognition */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-200 animate-spin-slow" />
          <span>{_('emr.badge')}</span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
          {_('emr.title')}
        </h3>
        
        <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">
          {_('emr.sub')}
        </p>

        {/* Global Patent Recognition Banner */}
        <div className="mt-5 inline-flex items-center gap-2 bg-burgundy text-white text-xs md:text-sm font-extrabold px-6 py-2 rounded-full shadow-md">
          <Award className="w-4 h-4 text-sky-200 shrink-0" />
          <span>{_('emr.patentBadge')}</span>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10">
        
        {/* Left Side: Workflow Steps (7 cols) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 translate-x-1'
                    : 'bg-white/75 border-slate-200/90 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-all ${
                      isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {step.stepNum}
                    </span>
                    <h4 className="text-lg md:text-xl font-extrabold text-slate-900">{step.title}</h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {step.isBeta && (
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wider">
                        {_('emr.s2Beta') || 'BETA'}
                      </span>
                    )}
                    {step.isPilot && (
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-800 border border-cyan-300 uppercase tracking-wider">
                        {_('emr.s4Pilot') || 'PILOT'}
                      </span>
                    )}
                    <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider border ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {step.tag}
                    </span>
                  </div>
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
          <div 
            className="w-full max-w-md rounded-[2.8rem] p-6 sm:p-7 shadow-xl border-2 border-white/20 relative overflow-hidden flex flex-col justify-between min-h-[480px] text-white"
            style={{ background: 'linear-gradient(145deg, #0267B5 0%, #01417A 100%)' }}
          >
            {/* Top Status Bar */}
            <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
                <span className="font-mono font-black tracking-wider text-emerald-200">{_('emr.engineTitle')}</span>
              </div>
              <span className="font-mono text-[11px] bg-white/15 px-2.5 py-1 rounded-lg border border-white/20 text-sky-100">
                {activeStep === 1 ? 'DEMO' : activeStep === 2 ? 'BETA SCAN' : activeStep === 3 ? 'GDPR / HIPAA' : 'PILOT'}
              </span>
            </div>

            {/* Stage Visual Display Switcher */}
            <div className="my-auto flex flex-col items-center text-center py-2">
              
              {/* STEP 01: FOB DEMONSTRATION VIDEO */}
              {activeStep === 1 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                  <div className="w-full rounded-2xl overflow-hidden border-2 border-white/30 bg-slate-900 shadow-xl relative aspect-video mb-3">
                    <iframe
                      className="w-full h-full border-0 object-cover"
                      src="https://www.youtube.com/embed/51ECod0uUy4?autoplay=1&mute=1&loop=1&playlist=51ECod0uUy4&controls=1&rel=0&modestbranding=1"
                      title="FOB Test Demonstration Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-100 font-mono">
                    <Play className="w-3.5 h-3.5 fill-current text-sky-300" />
                    <span>{_('emr.demoVideoTitle')}</span>
                  </div>
                </div>
              )}

              {/* STEP 02: CASSETTE SCANNING WITH AI RETICLE & LASER */}
              {activeStep === 2 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                  <div className="w-full max-w-[260px] h-60 rounded-3xl border-2 border-white/40 relative flex items-center justify-center bg-slate-950/70 overflow-hidden mb-3 shadow-inner p-3">
                    
                    {/* Viewfinder Target Reticles */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sky-300" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sky-300" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sky-300" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sky-300" />
                    
                    {/* Diagnostic Cassette Image */}
                    <img
                      src={getAssetPath('pending_1766070663274_.jpg')}
                      alt="FOB Diagnostic Cassette"
                      className="h-40 object-contain rounded-xl shadow-md border border-white/20 p-1 bg-white"
                      onError={(e) => { e.target.src = getAssetPath('FOB.jpeg'); }}
                    />

                    {/* Animated Neon Laser Scan Line */}
                    <div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#38bdf8] z-30 pointer-events-none"
                      style={{ top: `${scanProgress}%` }}
                    />

                    {/* Scanning Target Box */}
                    <div className="absolute inset-x-5 inset-y-8 border border-dashed border-cyan-300/70 rounded-xl pointer-events-none flex items-start justify-end p-2">
                      <span className="text-[9px] font-mono font-bold bg-sky-400 text-slate-950 px-1.5 py-0.5 rounded shadow">
                        {_('emr.targetDetected') || 'TARGET DETECTED'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950">{_('emr.s2Beta') || 'BETA'}</span>
                    <span className="text-sm font-extrabold text-white">
                      {_('emr.aiReadingTitle')}
                    </span>
                  </div>
                  <span className="text-xs text-sky-100 font-mono mt-1">
                    {_('emr.realTimeAnalysis')}
                  </span>
                </div>
              )}

              {/* STEP 03: ENCRYPTED TRANSMISSION (GDPR & HIPAA BY DESIGN) */}
              {activeStep === 3 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full py-4">
                  <div className="w-24 h-24 rounded-3xl bg-white/15 border-2 border-white/30 flex items-center justify-center mb-5 shadow-lg relative">
                    <Lock className="w-10 h-10 text-sky-200 animate-pulse" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shadow">✓</span>
                  </div>
                  
                  <span className="text-lg font-black text-white mb-2">
                    {_('emr.encryptedTitle')}
                  </span>
                  
                  <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-white text-xs font-mono font-bold px-4 py-1.5 rounded-full mb-2 shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>{_('emr.encryptedSub')}</span>
                  </div>

                  <span className="text-xs text-sky-100 max-w-xs font-light">
                    {_('emr.iso27001Sub')}
                  </span>
                </div>
              )}

              {/* STEP 04: DIRECT EMR INTEGRATION & PILOT HMO BADGES */}
              {activeStep === 4 && (
                <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                  <div className="w-18 h-18 rounded-3xl bg-white/20 border-2 border-white/30 flex items-center justify-center p-3 mb-3 shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-emerald-300" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-cyan-300 text-slate-950">
                      {_('emr.s4Pilot') || 'PILOT'}
                    </span>
                    <span className="text-base font-black text-white">
                      {_('emr.emrSyncTitle')}
                    </span>
                  </div>

                  <p className="text-xs text-sky-100 font-light mb-3 max-w-xs">
                    {_('emr.emrSyncSub')}
                  </p>
                  
                  {/* HMO Badges */}
                  <div className="grid grid-cols-4 gap-2 w-full">
                    {hmoLogos.map((hmo, i) => (
                      <div key={i} className="bg-white p-2 rounded-2xl border border-white/30 flex flex-col items-center shadow-md">
                        <img 
                          src={hmo.img} 
                          alt={hmo.name} 
                          className="h-6 object-contain rounded mb-1"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="text-[10px] font-black text-slate-900">{hmo.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Footer Control */}
            <div className="border-t border-white/20 pt-4 flex items-center justify-between text-xs text-sky-100">
              <span className="font-mono text-[11px]">ISO 27001 / ISO 13485</span>
              <button
                onClick={() => setActiveStep((prev) => (prev % 4) + 1)}
                className="bg-white text-blue-900 hover:bg-sky-50 px-4 py-2 rounded-xl font-extrabold flex items-center gap-1.5 transition shadow-sm"
              >
                <span>{_('emr.nextStepBtn')}</span>
                {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
