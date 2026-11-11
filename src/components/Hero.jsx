import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowDownRight, 
  Gauge, 
  Zap, 
  Trophy, 
  Activity, 
  Layers, 
  Radio, 
  Crosshair, 
  Volume2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick, playTelemetryBlip, playEngineRev } from '../utils/audio';
import MagneticButton from './MagneticButton';
import Counter from './Counter';

// Telemetry Hotspots mapped to Ayush's engineering stack
const SUBSYSTEMS = [
  {
    id: 'powertrain',
    title: 'POWERTRAIN // V6 HYBRID',
    stat: '250+ DSA',
    sub: 'Java & C++ STL',
    desc: 'High-throughput algorithmic core & memory optimization.',
    tags: ['Algorithms', 'Java', 'C++', 'OOP'],
    x: '72%',
    y: '50%'
  },
  {
    id: 'telemetry',
    title: 'ECU // WORKRADAR',
    stat: '-45% LATENCY',
    sub: '420ms → 180ms',
    desc: 'Predictive delay engine with 88% forecast accuracy.',
    tags: ['MongoDB Agg', 'Node.js', 'JWT', 'REST'],
    x: '52%',
    y: '46%'
  },
  {
    id: 'cockpit',
    title: 'AERO // COCKPIT UI',
    stat: '60 FPS FLUID',
    sub: '98+ Lighthouse',
    desc: 'Zero layout-shift reactive client architecture.',
    tags: ['React.js', 'Tailwind', 'GSAP', 'WebGL'],
    x: '34%',
    y: '52%'
  },
  {
    id: 'transmission',
    title: 'DRIVETRAIN // PIPELINE',
    stat: 'MERN FULL-STACK',
    sub: 'ABHA & Twilio 2FA',
    desc: 'Healthcare vaccination platform cutting clinical errors by 95%.',
    tags: ['Express', 'Node', 'ABHA', 'SQL'],
    x: '64%',
    y: '64%'
  },
  {
    id: 'podium',
    title: 'DRS WING // PODIUM',
    stat: 'RANK 3 / 120+',
    sub: 'National Hackathon',
    desc: '1st in Healthcare Innovation & 2nd Runner-Up.',
    tags: ['Hackathon P3', '1st Health', 'HackerRank 3★'],
    x: '88%',
    y: '38%'
  }
];

export default function Hero({ onOpenResume }) {
  const heroRef = useRef(null);
  const [activeSubsystem, setActiveSubsystem] = useState(SUBSYSTEMS[0]);
  const [rpm, setRpm] = useState(13200);
  const [speed, setSpeed] = useState(328);
  const [isRevving, setIsRevving] = useState(false);
  const [gForce, setGForce] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-badge-top', { y: -20, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.hero-headline', { scale: 0.96, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .from('.hero-car-stage', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
        .from('.telemetry-instrument', { scale: 0.9, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.6');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Track mouse for G-Force ball vector inside the HUD
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setGForce({ x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) });
  };

  const handleRev = () => {
    setIsRevving(true);
    playEngineRev();
    setRpm(14950);
    setSpeed(346);
    setTimeout(() => {
      setRpm(13200);
      setSpeed(328);
      setIsRevving(false);
    }, 1100);
  };

  const selectSpot = (sub, idx) => {
    setActiveSubsystem(sub);
    playTelemetryBlip(idx * 70);
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden racing-grid select-none"
    >
      {/* VIBRANT AMBIENT TELEMETRY GLOWS */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/15 blur-[160px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto w-full space-y-6 relative z-10 flex-1 flex flex-col justify-between">
        
        {/* TOP STATUS BAR (MINIMAL 10% TEXT) */}
        <div className="hero-badge-top flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="px-2.5 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-bold uppercase tracking-widest text-[11px]">
              SCUDERIA AS-26
            </span>
            <span className="text-slate-400 hidden sm:inline">// TELEMETRY LIVE</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>DRIVER: <strong className="text-white">AYUSH SHUKLA</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">ABESEC CSE</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-bold">CGPA: 8.00</span>
          </div>
        </div>

        {/* HERO HEADER: PUNCHY & VISUAL (20% TEXT) */}
        <div className="hero-headline flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-red-500 font-bold">
              <span className="w-2 h-2 rounded-sm bg-red-500" />
              <span>Full-Stack Systems & High-Velocity Architecture</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-extrabold uppercase tracking-tight text-white leading-[0.88]">
              AYUSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white">SHUKLA</span>
            </h1>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRev}
              className={`px-5 py-3 rounded-xl font-mono font-bold text-xs tracking-wider flex items-center space-x-2 transition-all ${
                isRevving 
                  ? 'bg-red-500 text-black shadow-[0_0_35px_#ef4444] scale-105' 
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(225,6,0,0.4)]'
              }`}
              data-cursor="REV"
            >
              <Gauge className={`w-4 h-4 ${isRevving ? 'animate-spin' : ''}`} />
              <span>{isRevving ? 'V6 THROTTLE OPEN' : 'REV ENGINE ⚡'}</span>
            </button>

            <MagneticButton
              href="#work"
              onClick={() => playTacticalClick()}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs tracking-wider flex items-center space-x-1.5 transition-all"
              data-cursor="BUILDS"
            >
              <span>BUILDS</span>
              <ArrowDownRight className="w-4 h-4" />
            </MagneticButton>

            <button
              onClick={() => { playTacticalClick(); onOpenResume(); }}
              className="px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-mono font-bold text-xs tracking-wider transition-all"
              data-cursor="DOSSIER"
            >
              <span>CV</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 70% VISUAL MASTERPIECE: MASSIVE F1 CAR TELEMETRY COCKPIT & LIVE HUD */}
        {/* ========================================================================= */}
        <div className="hero-car-stage relative w-full rounded-2xl bg-black/90 border border-white/15 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* CORNER BRACKETS */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500" />

          {/* BACKGROUND DENSE BLUEPRINT GRID */}
          <div className="absolute inset-0 racing-grid-dense opacity-30 pointer-events-none" />

          {/* MAIN VISUAL STAGE: CAR + SURROUNDING SVG TELEMETRY DIALS */}
          <div className="relative flex flex-col items-center justify-center min-h-[360px] sm:min-h-[460px] py-4">
            
            {/* FLOATING TOP VISUAL TELEMETRY CLUSTER */}
            <div className="w-full flex items-center justify-between px-2 sm:px-6 pb-2 z-20 font-mono">
              
              {/* SPEED & GEAR VISUAL READOUT */}
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-white/15 flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400">SPEED</span>
                  <span className="text-xl sm:text-2xl font-clash font-extrabold text-white">{speed}</span>
                  <span className="text-[9px] text-red-500 font-bold">KM/H</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 font-bold text-xs sm:text-sm">
                  GEAR 8
                </div>
                <div className="hidden sm:flex px-2 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-[10px]">
                  DRS OPEN
                </div>
              </div>

              {/* LIVE TACHOMETER RPM ARC WIDGET */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] text-slate-400">ENGINE RPM</div>
                  <div className={`text-base font-bold ${isRevving ? 'text-red-400 animate-pulse' : 'text-white'}`}>{rpm}</div>
                </div>

                {/* VISUAL SVG TACHOMETER GAUGE */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="5" fill="none" />
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="26" 
                      stroke={isRevving ? '#ef4444' : '#00f2fe'} 
                      strokeWidth="5" 
                      strokeDasharray="163" 
                      strokeDashoffset={isRevving ? '10' : '35'} 
                      strokeLinecap="round" 
                      fill="none" 
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute font-mono text-[9px] font-bold text-white">
                    {Math.round(rpm / 1000)}k
                  </div>
                </div>

              </div>

            </div>

            {/* ======================================================= */}
            {/* CENTRAL MASSIVE F1 CAR IMAGE WITH HOTSPOTS */}
            {/* ======================================================= */}
            <div className="relative w-full max-w-4xl py-2 flex items-center justify-center my-auto">
              
              {/* UNDERGLOW UNDER CAR */}
              <div className="absolute inset-x-12 bottom-6 h-12 bg-red-600/25 blur-[40px] rounded-full pointer-events-none" />

              {/* HIGH-RES F1 HORIZONTAL CAR SCHEMATIC */}
              <img 
                src="/f1-horizontal.jpg" 
                alt="F1 High-Performance Engineering Telemetry Chassis AS-2026"
                className="w-full h-auto max-h-[380px] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] pointer-events-none select-none transition-transform duration-500 hover:scale-[1.01]"
              />

              {/* 5 INTERACTIVE PULSING HOTSPOT TARGETS ON CAR */}
              {SUBSYSTEMS.map((sub, idx) => {
                const isSelected = activeSubsystem.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => selectSpot(sub, idx)}
                    onMouseEnter={() => selectSpot(sub, idx)}
                    style={{ top: sub.y, left: sub.x }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
                    data-cursor={sub.stat}
                    title={sub.title}
                  >
                    {/* Pulsing ring wave */}
                    <span className={`absolute -inset-2.5 rounded-full transition-all ${
                      isSelected 
                        ? 'bg-red-500/40 animate-ping' 
                        : 'bg-white/10 group-hover:bg-cyan-400/30'
                    }`} />

                    {/* Target reticle dot */}
                    <div className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-extrabold border transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-400 shadow-[0_0_25px_#ef4444] scale-125'
                        : 'bg-black/90 text-slate-200 border-white/30 group-hover:border-cyan-400 group-hover:text-cyan-300 group-hover:scale-110'
                    }`}>
                      0{idx + 1}
                    </div>

                    {/* Floating mini stat pill */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap pointer-events-none transition-all ${
                      isSelected 
                        ? 'bg-red-600 text-white border border-red-400 opacity-100 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                        : 'bg-black/90 text-slate-400 border border-white/15 opacity-0 group-hover:opacity-100'
                    }`}>
                      {sub.stat}
                    </div>
                  </button>
                );
              })}

              {/* LEFT HUD WIDGET: 4-TIRE THERMAL MAP (PURE VISUAL) */}
              <div className="absolute left-2 bottom-2 hidden sm:flex flex-col bg-black/85 border border-white/15 rounded-xl p-2.5 font-mono text-[9px] backdrop-blur-md z-20 space-y-1.5">
                <div className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">TIRE THERMALS</div>
                <div className="grid grid-cols-2 gap-1.5 text-center">
                  <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="block text-[8px] text-slate-400">FL</span>
                    <strong>102°C</strong>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="block text-[8px] text-slate-400">FR</span>
                    <strong>104°C</strong>
                  </div>
                  <div className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <span className="block text-[8px] text-slate-400">RL</span>
                    <strong>98°C</strong>
                  </div>
                  <div className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <span className="block text-[8px] text-slate-400">RR</span>
                    <strong>101°C</strong>
                  </div>
                </div>
              </div>

              {/* RIGHT HUD WIDGET: INTERACTIVE G-FORCE VECTOR BALL (PURE VISUAL) */}
              <div className="absolute right-2 bottom-2 hidden sm:flex flex-col items-center bg-black/85 border border-white/15 rounded-xl p-2.5 font-mono text-[9px] backdrop-blur-md z-20 space-y-1">
                <div className="text-[8px] text-slate-500 uppercase tracking-wider font-bold">G-FORCE METER</div>
                <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-px h-full bg-white/10 absolute" />
                  <div className="w-full h-px bg-white/10 absolute" />
                  <div className="w-7 h-7 rounded-full border border-white/10 absolute" />
                  {/* Dynamic G-force pointer dot */}
                  <div 
                    className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] transition-transform duration-75 absolute"
                    style={{
                      transform: `translate(${gForce.x * 16}px, ${gForce.y * 16}px)`
                    }}
                  />
                </div>
                <span className="text-[8px] text-slate-400">LAT: 3.4G</span>
              </div>

            </div>

            {/* BOTTOM DYNAMIC HUD DRAWER (ONLY 1 COMPACT BAR - 15% TEXT) */}
            <div className="w-full mt-2 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-20 font-mono">
              <div className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-bold text-xs uppercase">
                  {activeSubsystem.title}
                </span>
                <span className="text-white font-bold text-sm">
                  {activeSubsystem.stat} <span className="text-slate-400 font-normal text-xs">({activeSubsystem.sub})</span>
                </span>
                <span className="hidden md:inline text-xs text-slate-400 border-l border-white/10 pl-3">
                  {activeSubsystem.desc}
                </span>
              </div>

              {/* TECH CHIPS */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activeSubsystem.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-200 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5 HIGH-IMPACT VISUAL TELEMETRY INSTRUMENTS (DIALS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono">
          
          {/* DIAL 1: 250+ DSA */}
          <div className="telemetry-instrument p-3 sm:p-4 rounded-xl bg-dark-900/90 border border-white/15 hover:border-red-500/60 transition-all space-y-1 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 01 // DSA</span>
              <Gauge className="w-3.5 h-3.5 text-red-400 group-hover:rotate-45 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-red-500">
              <Counter value="250+" />
            </div>
            <div className="text-white text-xs font-bold">DSA Solved</div>
            <div className="text-[9px] text-slate-400">Java & C++ Algorithms</div>
          </div>

          {/* DIAL 2: -45% LATENCY */}
          <div className="telemetry-instrument p-3 sm:p-4 rounded-xl bg-dark-900/90 border border-white/15 hover:border-cyan-400/60 transition-all space-y-1 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 02 // SPEED</span>
              <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-cyan-400">
              <Counter value="-45%" />
            </div>
            <div className="text-white text-xs font-bold">API Latency Cut</div>
            <div className="text-[9px] text-slate-400">420ms &rarr; 180ms Pipelines</div>
          </div>

          {/* DIAL 3: P3 PODIUM */}
          <div className="telemetry-instrument p-3 sm:p-4 rounded-xl bg-dark-900/90 border border-white/15 hover:border-amber-400/60 transition-all space-y-1 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 03 // PODIUM</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-amber-400">
              Rank <Counter value="3" />
            </div>
            <div className="text-white text-xs font-bold">National Hackathon</div>
            <div className="text-[9px] text-slate-400">1st in Healthcare Track</div>
          </div>

          {/* DIAL 4: 88% ACCURACY */}
          <div className="telemetry-instrument p-3 sm:p-4 rounded-xl bg-dark-900/90 border border-white/15 hover:border-purple-400/60 transition-all space-y-1 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 04 // ECU</span>
              <Activity className="w-3.5 h-3.5 text-purple-400 group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-purple-400">
              <Counter value="88%" />
            </div>
            <div className="text-white text-xs font-bold">Delay Forecast</div>
            <div className="text-[9px] text-slate-400">WorkRadar Risk Engine</div>
          </div>

          {/* DIAL 5: 2,000+ COMMUNITY */}
          <div className="telemetry-instrument col-span-2 md:col-span-1 p-3 sm:p-4 rounded-xl bg-dark-900/90 border border-white/15 hover:border-emerald-400/60 transition-all space-y-1 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 05 // NETWORK</span>
              <Layers className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-125 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-emerald-400">
              <Counter value="2,000+" />
            </div>
            <div className="text-white text-xs font-bold">Engineers Mentored</div>
            <div className="text-[9px] text-slate-400">Elixir Tech & ZenYukti</div>
          </div>

        </div>

      </div>
    </section>
  );
}
