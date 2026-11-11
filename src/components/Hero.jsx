import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Gauge, 
  Cpu, 
  Zap, 
  Trophy, 
  Layers, 
  Activity, 
  Compass, 
  Crosshair, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick, playTelemetryBlip, playEngineRev } from '../utils/audio';
import MagneticButton from './MagneticButton';
import Counter from './Counter';

// Interactive F1 Telemetry Hotspots mapped to Ayush's engineering stack
const TELEMETRY_HOTSPOTS = [
  {
    id: 'powertrain',
    label: 'POWERTRAIN / ICE HYBRID',
    code: 'SYS-01 // ALGORITHMIC CORE',
    metric: '250+ DSA SOLVED',
    submetric: 'Java & C++ STL',
    tech: 'Algorithms • OOP • C/C++ • Java • Memory Optimization',
    x: '74%', // coordinates relative to car schematic
    y: '52%',
    description: 'High-throughput algorithmic engine solving complex graph, tree, and dynamic programming challenges with optimal time/space complexity.',
    stats: [
      { name: 'LeetCode & GFG', val: '250+' },
      { name: 'HackerRank Problem Solving', val: '3-Star in C' },
      { name: 'Code Velocity', val: 'Optimal O(N)' }
    ]
  },
  {
    id: 'telemetry-ecu',
    label: 'ECU & PREDICTIVE TELEMETRY',
    code: 'SYS-02 // WORKRADAR ENGINE',
    metric: '88% DELAY ACCURACY',
    submetric: '-45% Latency (180ms)',
    tech: 'Predictive Analytics • MongoDB Pipelines • JWT • Node.js',
    x: '52%',
    y: '48%',
    description: 'Real-time telemetry and predictive risk engine forecasting engineering delivery bottlenecks 7 days prior to release milestones.',
    stats: [
      { name: 'Risk Detection Accuracy', val: '88%' },
      { name: 'API Latency Drop', val: '420ms → 180ms' },
      { name: 'Active Metrics Analyzed', val: '6+ Real-time' }
    ]
  },
  {
    id: 'aero-cockpit',
    label: 'AERO & COCKPIT INTERFACE',
    code: 'SYS-03 // REACT & CLIENT CORE',
    metric: '60 FPS FLUID UI',
    submetric: 'Sub-1.2s Page Load',
    tech: 'React.js • Tailwind CSS • GSAP • Web Audio • Micro-interactions',
    x: '38%',
    y: '50%',
    description: 'Aerodynamic, low-latency user interfaces engineered for zero layout shifts, responsive ergonomics, and high-conversion visual design.',
    stats: [
      { name: 'Lighthouse Performance', val: '98/100' },
      { name: 'Target Frame Rate', val: '60 FPS' },
      { name: 'Cumulative Layout Shift', val: '0.00' }
    ]
  },
  {
    id: 'transmission',
    label: 'TRANSMISSION & DRIVETRAIN',
    code: 'SYS-04 // BACKEND ARCHITECTURE',
    metric: 'MERN FULL-STACK',
    submetric: 'REST APIs & ABHA Standard',
    tech: 'Node.js • Express • MongoDB • SQL • Twilio OTP 2FA',
    x: '64%',
    y: '62%',
    description: 'Scalable data transmission layer connecting decoupled microservices, relational/document storage, and encrypted authentication pipelines.',
    stats: [
      { name: 'Healthcare Entry Errors Cut', val: '95%' },
      { name: 'Record Duplication', val: '< 0.5%' },
      { name: 'Auth Protocol', val: '2FA OTP + ABHA' }
    ]
  },
  {
    id: 'podium',
    label: 'AERO REAR WING / DRS',
    code: 'SYS-05 // PODIUM RECOGNITION',
    metric: 'P3 NATIONAL FINISH',
    submetric: 'Rank 3 of 120+ Teams',
    tech: 'National Hackathon • 1st Healthcare Innovation • Leadership',
    x: '88%',
    y: '40%',
    description: 'Downforce stability and podium finish. 2nd Runner-Up at the National Hackathon and 1st prize in Healthcare Innovation for VacciTrack.',
    stats: [
      { name: 'Hackathon Rank', val: 'Rank 3 / 120+' },
      { name: 'Healthcare Track', val: '1st Position' },
      { name: 'Community Reach', val: '2,000+ Eng.' }
    ]
  }
];

export default function Hero({ onOpenResume }) {
  const heroRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(TELEMETRY_HOTSPOTS[0]);
  const [tachometerRpm, setTachometerRpm] = useState(12800);
  const [isRevving, setIsRevving] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-telemetry-header', {
        y: -25,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-title-main', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-car-schematic', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.telemetry-dial-card', {
        y: 30,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleTriggerRev = () => {
    setIsRevving(true);
    playEngineRev();
    setTachometerRpm(14950);
    setTimeout(() => {
      setTachometerRpm(12800);
      setIsRevving(false);
    }, 1200);
  };

  const selectHotspot = (item, idx) => {
    setActiveHotspot(item);
    playTelemetryBlip(idx * 80);
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[96vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden racing-grid"
    >
      {/* AMBIENT RADIAL GLOWS (F1 Red + Cyan Telemetry) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-cyan-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        
        {/* TELEMETRY PITWALL STATUS BAR */}
        <div className="hero-telemetry-header flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded bg-red-600/20 border border-red-500/50 text-red-400 font-mono text-xs font-bold flex items-center space-x-2 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              <span>SCUDERIA AS-2026</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              // TELEMETRY ACTIVE • HIGH-PERFORMANCE COMPUTATIONAL ENGINEERING
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-slate-400">DRIVER: <strong className="text-white font-bold">AYUSH SHUKLA</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">CAMPUS: <strong className="text-cyan-400">ABESEC (B.TECH CSE)</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              CGPA: 8.00 / 10.0
            </span>
          </div>
        </div>

        {/* HERO TITLE & ENGINEERING SPEC */}
        <div className="hero-title-main flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-red-400 tracking-widest uppercase">
              <span className="w-3 h-0.5 bg-red-500" />
              <span>Full-Stack Systems & Telemetry Engineering</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-clash font-extrabold uppercase tracking-tight text-white leading-[0.9]">
              AYUSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">SHUKLA</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-mono max-w-2xl leading-relaxed pt-1">
              Architecting precision software, predictive delay algorithms, and 60 FPS interfaces.
              Slashed API latencies by <strong className="text-white font-bold">-45%</strong> and scaling developer networks to <strong className="text-cyan-400 font-bold">2,000+ engineers</strong>.
            </p>
          </div>

          {/* QUICK CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#work"
              onClick={() => playTacticalClick()}
              className="px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs tracking-wider flex items-center space-x-2 shadow-[0_0_25px_rgba(225,6,0,0.5)] transition-all transform hover:-translate-y-0.5"
              data-cursor="PADDOCK"
            >
              <span>EXPLORE PADDOCK BUILDS</span>
              <ArrowDownRight className="w-4 h-4" />
            </MagneticButton>

            <button
              onClick={handleTriggerRev}
              className={`px-5 py-3.5 rounded-lg border font-mono font-bold text-xs tracking-wider flex items-center space-x-2 transition-all ${
                isRevving
                  ? 'bg-red-500 text-black border-red-400 shadow-[0_0_30px_#ef4444]'
                  : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/15 text-slate-200'
              }`}
              data-cursor="REV"
            >
              <Gauge className={`w-4 h-4 ${isRevving ? 'text-black animate-spin' : 'text-red-400'}`} />
              <span>{isRevving ? 'V6 HYBRID ACCELERATING' : 'REV ENGINE'}</span>
            </button>

            <button
              onClick={() => { playTacticalClick(); onOpenResume(); }}
              className="px-5 py-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-mono font-bold text-xs tracking-wider text-slate-300 transition-all"
              data-cursor="RESUME"
            >
              <span>DOSSIER</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTRAL MASTERPIECE: F1 RACE CAR BLUEPRINT & TELEMETRY SCHEMATIC */}
        {/* ========================================================================= */}
        <div className="hero-car-schematic relative rounded-2xl bg-black/80 border border-white/15 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* SCHEMATIC CORNER BRACKETS */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500" />

          {/* TELEMETRY SUB-HEADER INSIDE SCHEMATIC */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <Crosshair className="w-4 h-4 text-red-500" />
              <span className="text-white font-bold tracking-wider">CHASSIS SCHEMATIC & SUBSYSTEM TELEMETRY</span>
              <span className="text-slate-500">//</span>
              <span className="text-cyan-400 font-semibold">CLICK / HOVER ANY SUBSYSTEM BELOW</span>
            </div>

            {/* LIVE TACHOMETER / RPM READOUT */}
            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-500">RPM:</span>
                <span className={`font-bold transition-colors ${isRevving ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  {tachometerRpm}
                </span>
              </div>
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${isRevving ? 'w-full bg-red-500 shadow-[0_0_10px_#ef4444]' : 'w-4/5 bg-cyan-400'}`}
                />
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">GEAR: 8</span>
            </div>
          </div>

          {/* SCHEMATIC VISUALIZATION CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* CAR VISUALIZATION (7 COLUMNS) */}
            <div className="lg:col-span-8 relative flex items-center justify-center min-h-[300px] sm:min-h-[380px] bg-dark-900/60 rounded-xl border border-white/[0.06] p-4 overflow-hidden">
              
              {/* Fine blueprint coordinate grid */}
              <div className="absolute inset-0 racing-grid-dense opacity-40 pointer-events-none" />
              
              {/* Technical dimension guidelines */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-1 text-[9px] font-mono text-slate-600">
                <div className="w-px h-16 bg-white/20" />
                <span className="rotate-90 py-1">5,500mm</span>
                <div className="w-px h-16 bg-white/20" />
              </div>

              {/* F1 RACE CAR IMAGE */}
              <div className="relative w-full max-w-2xl py-4 flex items-center justify-center">
                <img 
                  src="/f1-horizontal.jpg" 
                  alt="Formula 1 Telemetry Engineering Schematic - Chassis AS-2026"
                  className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] select-none pointer-events-none"
                />

                {/* INTERACTIVE HOTSPOT TARGETS ON CAR SCHEMATIC */}
                {TELEMETRY_HOTSPOTS.map((spot, idx) => {
                  const isSelected = activeHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => selectHotspot(spot, idx)}
                      onMouseEnter={() => selectHotspot(spot, idx)}
                      style={{ top: spot.y, left: spot.x }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20`}
                      data-cursor={spot.id.toUpperCase()}
                      title={spot.label}
                    >
                      {/* Outer pulse wave */}
                      <span className={`absolute -inset-2 rounded-full transition-all ${
                        isSelected 
                          ? 'bg-red-500/30 animate-ping opacity-80' 
                          : 'bg-white/10 group-hover:bg-cyan-400/30'
                      }`} />

                      {/* Hotspot Target Crosshair Icon */}
                      <div className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border font-mono text-[10px] font-bold transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white border-red-400 shadow-[0_0_20px_#ef4444] scale-125'
                          : 'bg-black/90 text-slate-300 border-white/30 group-hover:border-cyan-400 group-hover:text-cyan-300 group-hover:scale-110'
                      }`}>
                        {idx + 1}
                      </div>

                      {/* Floating tooltip tag */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap pointer-events-none transition-all ${
                        isSelected
                          ? 'bg-red-600/90 text-white border border-red-400 opacity-100'
                          : 'bg-black/80 text-slate-400 border border-white/10 opacity-0 group-hover:opacity-100'
                      }`}>
                        {spot.metric}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* TIRE TELEMETRY MINI WIDGET (BOTTOM-RIGHT OF CAR) */}
              <div className="absolute bottom-3 right-3 hidden sm:flex items-center space-x-2 bg-black/80 border border-white/10 rounded-lg p-2 font-mono text-[9px]">
                <div className="grid grid-cols-2 gap-1 text-center">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">FL 89%</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">FR 87%</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">RL 92%</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">RR 91%</span>
                </div>
                <div className="border-l border-white/10 pl-2 text-slate-400">
                  <div>TEMP: 104°C</div>
                  <div>BRAKE: 56.4% F</div>
                </div>
              </div>
            </div>

            {/* LIVE TELEMETRY DRAWER / SUBSYSTEM INSPECTOR (5 COLUMNS) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* SELECTED SUBSYSTEM CARD */}
              <div className="p-5 rounded-xl bg-dark-900 border border-red-500/40 relative shadow-[0_0_30px_rgba(225,6,0,0.15)] space-y-3">
                
                {/* Header with code */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-300 font-bold">
                    {activeHotspot.code}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CALIBRATED</span>
                  </span>
                </div>

                {/* Subsystem Name & Primary Metric */}
                <div>
                  <h3 className="font-clash font-extrabold text-xl text-white tracking-wide">
                    {activeHotspot.label}
                  </h3>
                  <div className="text-sm font-mono font-bold text-red-400 pt-0.5">
                    {activeHotspot.metric} <span className="text-xs text-slate-400 font-normal">({activeHotspot.submetric})</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs font-mono text-slate-300 leading-relaxed border-t border-white/[0.08] pt-2.5">
                  {activeHotspot.description}
                </p>

                {/* Tech Specs */}
                <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-800/40 rounded-lg p-2.5">
                  <strong className="text-cyan-400 font-bold">SPEC:</strong> {activeHotspot.tech}
                </div>

                {/* Detailed Subsystem Metric Readouts */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/[0.08]">
                  {activeHotspot.stats.map((st) => (
                    <div key={st.name} className="p-2 rounded bg-black/60 border border-white/5 text-center font-mono">
                      <div className="text-xs font-bold text-white">{st.val}</div>
                      <div className="text-[8px] text-slate-400 uppercase pt-0.5 line-clamp-1">{st.name}</div>
                    </div>
                  ))}
                </div>

              </div>

              {/* QUICK SELECTOR PILLS FOR ALL 5 SUBSYSTEMS */}
              <div className="grid grid-cols-1 gap-1.5 font-mono text-xs">
                {TELEMETRY_HOTSPOTS.map((spot, idx) => {
                  const isCurrent = activeHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => selectHotspot(spot, idx)}
                      className={`p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-red-600/20 border-red-500/70 text-white'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                          isCurrent ? 'bg-red-600 text-white' : 'bg-white/10 text-slate-400'
                        }`}>
                          0{idx + 1}
                        </span>
                        <span className="font-bold text-[11px] tracking-wide">{spot.label.split('/')[0]}</span>
                      </div>
                      <span className={`text-[10px] font-bold ${isCurrent ? 'text-red-400' : 'text-slate-500'}`}>
                        {spot.metric}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* TELEMETRY GAUGES GRID (5 CORE METRICS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs">
          
          <div className="telemetry-dial-card p-4 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md space-y-1 hover:border-red-500/50 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 01 // DSA</span>
              <Gauge className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-red-500">
              <Counter value="250+" />
            </div>
            <div className="text-white font-bold text-[11px]">Problems Solved</div>
            <div className="text-[10px] text-slate-400">LeetCode & GFG in Java/C++</div>
          </div>

          <div className="telemetry-dial-card p-4 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md space-y-1 hover:border-cyan-400/50 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 02 // LATENCY</span>
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-cyan-400">
              <Counter value="-45%" />
            </div>
            <div className="text-white font-bold text-[11px]">API Latency Cut</div>
            <div className="text-[10px] text-slate-400">420ms to 180ms via Aggregation</div>
          </div>

          <div className="telemetry-dial-card p-4 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md space-y-1 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 03 // PODIUM</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-amber-400">
              Rank <Counter value="3" />
            </div>
            <div className="text-white font-bold text-[11px]">National Hackathon</div>
            <div className="text-[10px] text-slate-400">1st in Healthcare (120+ teams)</div>
          </div>

          <div className="telemetry-dial-card p-4 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md space-y-1 hover:border-purple-400/50 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 04 // FORECAST</span>
              <Activity className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-purple-400">
              <Counter value="88%" />
            </div>
            <div className="text-white font-bold text-[11px]">Predictive Accuracy</div>
            <div className="text-[10px] text-slate-400">WorkRadar Delay Risk Engine</div>
          </div>

          <div className="telemetry-dial-card col-span-2 md:col-span-1 p-4 rounded-xl bg-dark-900/80 border border-white/10 backdrop-blur-md space-y-1 hover:border-emerald-400/50 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px]">
              <span>DIAL 05 // PADDOCK</span>
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-clash font-extrabold text-emerald-400">
              <Counter value="2,000+" />
            </div>
            <div className="text-white font-bold text-[11px]">Developers Mentored</div>
            <div className="text-[10px] text-slate-400">Elixir Tech & ZenYukti Community</div>
          </div>

        </div>

      </div>
    </section>
  );
}
