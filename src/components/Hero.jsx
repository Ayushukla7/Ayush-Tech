import React from 'react';
import { ArrowUpRight, ArrowDown, FileText, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { WireframeGlobe, BrutalStar } from './AcidIcons';
import { playTacticalClick } from '../utils/audio';

export default function Hero({ onOpenResume }) {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 px-3 sm:px-6 lg:px-8 border-b border-[#2a2d39] acid-grid overflow-hidden select-none"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ccff00]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* ========================================================================= */}
        {/* UPPER POSTER SPLIT: GIANT DISPLAY TITLE (LEFT) & PORTRAIT / INTRO (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: GIANT EDITORIAL CONDENSED TITLE */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top metadata tags */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8a8d98]">
              <span className="px-2 py-0.5 border border-[#2a2d39] bg-[#14161c] text-[#ccff00] font-bold">
                ENGINEER // 2026
              </span>
              <span>•</span>
              <span className="text-[#eae7dd]">ABESEC B.TECH CSE (CGPA 7.89)</span>
              <span>•</span>
              <span className="text-[#ccff00] font-bold">UPMSP 88%</span>
            </div>

            {/* GIANT ACID BRUTAL POSTER DISPLAY TYPOGRAPHY */}
            <div className="space-y-0 leading-none">
              <h1 className="font-bebas text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[11.5rem] tracking-tight text-[#eae7dd] uppercase select-none distressed-title leading-[0.80]">
                AYUSH
              </h1>
              <h1 className="font-bebas text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[11.5rem] tracking-tight text-[#ccff00] uppercase select-none distressed-title leading-[0.80]">
                SHUKLA
              </h1>
            </div>

            {/* PORTFOLIO ARROW TAG & SUMMARY PILLS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#2a2d39]">
              <div className="flex items-center space-x-2 text-sm font-mono font-bold text-[#eae7dd]">
                <span className="text-[#ccff00] font-extrabold text-lg">PORTFOLIO</span>
                <ArrowUpRight className="w-5 h-5 text-[#ccff00]" />
                <span className="text-[#8a8d98] text-xs font-normal hidden sm:inline">
                  // FULL-STACK MERN ARCHITECT
                </span>
              </div>

              <div className="flex items-center space-x-2 font-mono text-[11px] text-[#8a8d98]">
                <span className="text-[#ccff00] font-bold">350+ DSA</span>
                <span>•</span>
                <span className="text-white font-semibold">-35% LATENCY</span>
                <span>•</span>
                <span className="text-[#ccff00] font-bold">RANK 3 NATIONAL</span>
              </div>
            </div>

            {/* ACTION BUTTONS (ACID BRUTALIST STYLE) */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                onClick={playTacticalClick}
                className="px-6 py-3.5 bg-[#ccff00] hover:bg-white text-black font-anton tracking-wider text-sm uppercase flex items-center space-x-2 transition-all shadow-[4px_4px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={() => { playTacticalClick(); onOpenResume(); }}
                className="px-5 py-3.5 bg-[#14161c] hover:bg-[#20242e] border border-[#2a2d39] text-[#eae7dd] hover:text-[#ccff00] hover:border-[#ccff00] font-mono font-bold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all shadow-[4px_4px_0px_#ccff00] active:translate-x-0.5 active:translate-y-0.5"
              >
                <FileText className="w-4 h-4" />
                <span>RESUME [PDF]</span>
              </button>

              <a
                href="#contact"
                onClick={playTacticalClick}
                className="px-5 py-3.5 border border-[#2a2d39] bg-transparent text-[#eae7dd] hover:text-black hover:bg-[#ccff00] font-mono font-bold text-xs tracking-wider uppercase flex items-center space-x-1.5 transition-all"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* RIGHT 5 COLS: ACID GREEN DISC AVATAR & OFF-WHITE INTRODUCTION CARD */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. TOP EDITORIAL ARTWORK PORTRAIT (EXACT POSTER AESTHETIC) */}
            <div className="relative flex items-center justify-end">
              <div className="relative group">
                
                {/* HIGH-IMPACT EDITORIAL BRUTALIST PORTRAIT CARD */}
                <div className="relative w-64 sm:w-72 md:w-80 rounded-none border-2 border-[#2a2d39] group-hover:border-[#ccff00] overflow-hidden bg-[#0e0f12] shadow-[6px_6px_0px_#ccff00] transition-all">
                  <img 
                    src="/ayush-hero.jpg" 
                    alt="Ayush Shukla – Software Developer & Full-Stack Architect"
                    className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  {/* Subtle inner border overlay */}
                  <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                </div>

                {/* TECHNICAL ID TAG (AS IN POSTER: ID: AS/2026/01) */}
                <div className="absolute -bottom-3 right-2 font-mono text-[10px] text-[#ccff00] font-bold bg-[#0e0f12] border border-[#2a2d39] px-2.5 py-0.5 tracking-wider shadow-md">
                  ID: AS/2026/01
                </div>

                {/* TOP LEFT BRUTALIST LABEL */}
                <div className="absolute -top-2.5 -left-2.5 font-mono text-[9px] text-black font-extrabold bg-[#ccff00] px-2 py-0.5 uppercase tracking-widest shadow-[2px_2px_0px_#000]">
                  ARCHITECT // 01
                </div>

              </div>
            </div>

            {/* 2. OFF-WHITE PAPER CARD: INTRODUCTION (EXACT AS IMAGE) */}
            <div className="relative bg-[#e4e2d8] text-slate-950 p-6 rounded-none border border-black/30 shadow-[6px_6px_0px_#ccff00] space-y-3 font-mono">
              
              {/* TOP ARROW & TITLE */}
              <div className="flex items-center justify-between pb-2 border-b border-black/15">
                <div className="flex items-center space-x-2">
                  <span className="text-black font-extrabold text-sm">↳</span>
                  <span className="font-anton tracking-wider text-base uppercase text-black">
                    INTRODUCTION
                  </span>
                </div>
                <WireframeGlobe className="w-4 h-4 text-black" />
              </div>

              {/* BIO STATEMENT */}
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-900 leading-relaxed text-justify">
                I design and engineer bold digital experiences, high-throughput full-stack systems, and algorithmic architectures that cut through noise and deliver real, measurable impact.
              </p>

              {/* KEYWORDS PILL GRID */}
              <div className="pt-2 border-t border-black/15 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold uppercase text-slate-900">
                <span className="hover:text-black">FULL-STACK MERN</span>
                <span>•</span>
                <span className="hover:text-black">350+ DSA PROBLEMS</span>
                <span>•</span>
                <span className="hover:text-black">UI/UX ARCHITECTURE</span>
                <span>•</span>
                <span className="hover:text-black">SYSTEM OPTIMIZATION</span>
              </div>

              {/* BOTTOM CROSSHAIRS & MINI ACCENT */}
              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-700 font-bold border-t border-black/10">
                <span>ABESEC CSE • 2024–PRESENT</span>
                <span className="text-black font-bold">+ +</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
