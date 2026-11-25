import React from 'react';
import { ArrowUpRight, Code2, Zap, Trophy, GraduationCap } from 'lucide-react';
import { WireframeGlobe } from './AcidIcons';
import { playTacticalClick } from '../utils/audio';

export default function Hero({ onOpenResume }) {
  const telemetryStats = [
    { label: 'DSA PROBLEMS', value: '350+', sub: 'Java / C++ Algorithmic Core', icon: Code2, color: '#ccff00' },
    { label: 'SERVER LATENCY', value: '-35%', sub: 'MongoDB Aggregation Optimization', icon: Zap, color: '#ffffff' },
    { label: 'NATIONAL HACKATHON', value: 'RANK 3', sub: '2nd Runner-Up / 120+ Teams', icon: Trophy, color: '#ccff00' },
    { label: 'ACADEMIC RECORD', value: '7.89', sub: 'ABESEC B.Tech CSE (UPMSP 88%)', icon: GraduationCap, color: '#ffffff' }
  ];

  return (
    <section 
      id="hero" 
      className="relative pt-14 sm:pt-16 pb-10 px-3 sm:px-6 lg:px-8 border-b border-[#2a2d39] acid-grid overflow-hidden select-none"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ccff00]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-5 relative z-10">
        
        {/* ========================================================================= */}
        {/* UPPER POSTER SPLIT: GIANT DISPLAY TITLE (LEFT) & TELEMETRY + INTRO (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT 7 COLS: GIANT EDITORIAL CONDENSED "AYUSH SHUKLA" TITLE */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] text-[#8a8d98]">
              <span className="px-2 py-0.5 border border-[#2a2d39] bg-[#14161c] text-[#ccff00] font-bold">
                ENGINEER // 2026
              </span>
              <span>•</span>
              <span className="text-[#eae7dd]">ABESEC B.TECH CSE (CGPA 7.89)</span>
              <span>•</span>
              <span className="text-[#ccff00] font-bold">UPMSP 88%</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-[#8a8d98]">GHAZIABAD, INDIA</span>
            </div>

            {/* GIANT AYUSH SHUKLA POSTER DISPLAY TYPOGRAPHY */}
            <div className="space-y-0 leading-none">
              <h1 className="font-bebas text-[6.5rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13rem] xl:text-[14rem] tracking-tight text-[#eae7dd] uppercase select-none distressed-title leading-[0.76]">
                AYUSH
              </h1>
              <h1 className="font-bebas text-[6.5rem] sm:text-[9.5rem] md:text-[11.5rem] lg:text-[13rem] xl:text-[14rem] tracking-tight text-[#ccff00] uppercase select-none distressed-title leading-[0.76]">
                SHUKLA
              </h1>
            </div>

            {/* ROLE BANNER & PORTFOLIO TAG */}
            <div className="space-y-3 pt-2 border-t border-[#2a2d39]">
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-xl sm:text-2xl font-anton font-bold text-[#eae7dd] tracking-wider">
                  <span className="text-[#f4f3ee]">PORTFOLIO</span>
                  <ArrowUpRight className="w-6 h-6 text-[#ccff00]" />
                  <span className="font-mono text-xs text-[#8a8d98] font-normal tracking-widest pl-1 hidden sm:inline">
                    // FULL-STACK MERN ARCHITECT
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <button
                    onClick={() => { playTacticalClick(); onOpenResume(); }}
                    className="px-3.5 py-1.5 bg-[#ccff00] hover:bg-white text-black font-anton uppercase text-xs tracking-wider transition-all shadow-[2px_2px_0px_#fff]"
                  >
                    RESUME [PDF] ↗
                  </button>
                  <a
                    href="#projects"
                    onClick={playTacticalClick}
                    className="px-3.5 py-1.5 border border-[#2a2d39] bg-[#14161c] hover:border-[#ccff00] text-[#eae7dd] hover:text-[#ccff00] uppercase font-bold text-xs tracking-wider transition-all"
                  >
                    BUILDS ↓
                  </a>
                  <a
                    href="#contact"
                    onClick={playTacticalClick}
                    className="hidden sm:inline-flex px-3.5 py-1.5 border border-[#2a2d39] bg-transparent text-[#8a8d98] hover:text-[#ccff00] hover:border-[#ccff00] uppercase font-bold text-xs tracking-wider transition-all"
                  >
                    CONTACT ↗
                  </a>
                </div>
              </div>

              {/* TECH CAPABILITY RIBBON (Fills space cleanly) */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[10px]">
                {['MERN STACK', 'JAVA / C++', 'NEXT.JS', 'REST APIS', 'MONGODB', 'TAILWIND CSS', 'UI/UX ARCHITECTURE'].map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 border border-[#2a2d39] bg-[#0e0f12] text-[#cfd2dc] hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT 5 COLS: SYSTEM TELEMETRY + OFF-WHITE INTRODUCTION CARD */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* 1. SYSTEM SPEC & TELEMETRY CARD (REPLACES PHOTO WITHOUT DEAD SPACE) */}
            <div className="relative border border-[#2a2d39] bg-[#14161c] p-4 sm:p-5 shadow-[4px_4px_0px_#000] space-y-3.5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#2a2d39] font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#ccff00] animate-pulse" />
                  <span className="font-bold text-[#f4f3ee] tracking-wider uppercase">
                    SYSTEM TELEMETRY
                  </span>
                </div>
                <span className="text-[10px] text-[#ccff00] font-mono tracking-widest font-bold">
                  [ SPEC // 2026 ]
                </span>
              </div>

              {/* 4 Metric Blocks (2x2 Grid) */}
              <div className="grid grid-cols-2 gap-2.5 font-mono">
                {telemetryStats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 bg-[#0e0f12] border border-[#2a2d39] hover:border-[#ccff00]/60 transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#8a8d98]">
                      <span>{stat.label}</span>
                      <stat.icon className="w-3 h-3 text-[#ccff00]" />
                    </div>
                    <div className="font-anton text-2xl sm:text-3xl tracking-wide" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-[#8a8d98] truncate">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical ID Tag */}
              <div className="flex items-center justify-between pt-2 border-t border-[#2a2d39] font-mono text-[9px] text-[#8a8d98]">
                <span>CORE: AS-ENGINEERING-STACK</span>
                <span className="text-[#ccff00] font-bold">ID: AS/2026/01</span>
              </div>

            </div>

            {/* 2. OFF-WHITE PAPER CARD: INTRODUCTION (EXACT AS POSTER) */}
            <div className="relative bg-[#e4e2d8] text-slate-950 p-5 sm:p-6 rounded-none border border-black/30 shadow-[4px_4px_0px_#ccff00] space-y-3 font-mono">
              
              {/* TOP ARROW & TITLE */}
              <div className="flex items-center space-x-2 pb-2 border-b border-black/15">
                <span className="text-black font-extrabold text-base">↳</span>
                <span className="font-anton tracking-wider text-lg uppercase text-black">
                  INTRODUCTION
                </span>
              </div>

              {/* BIO STATEMENT (MATCHING POSTER TONE) */}
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-900 leading-relaxed text-justify">
                I design bold digital experiences that cut through noise and deliver real impact. Full-stack software developer and UI/UX architect specializing in scalable web systems, low-latency APIs, and clean engineering.
              </p>

              {/* KEYWORDS LIST & WIREFRAME GLOBE (EXACT AS IN POSTER) */}
              <div className="pt-2 border-t border-black/15 flex items-end justify-between text-[11px] font-bold uppercase text-slate-900">
                <div className="space-y-0.5">
                  <div className="hover:text-black">BRANDING</div>
                  <div className="hover:text-black">WEB DESIGN</div>
                  <div className="hover:text-black">UI/UX DESIGN</div>
                  <div className="hover:text-black">ART DIRECTION</div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <WireframeGlobe className="w-6 h-6 text-black" />
                  <span className="text-black font-bold text-xs tracking-widest">+ +</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
