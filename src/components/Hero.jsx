import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WireframeGlobe } from './AcidIcons';
import { playTacticalClick } from '../utils/audio';

export default function Hero({ onOpenResume }) {
  return (
    <section 
      id="hero" 
      className="relative pt-16 sm:pt-20 pb-12 px-3 sm:px-6 lg:px-8 border-b border-[#2a2d39] acid-grid overflow-hidden select-none"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ccff00]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* ========================================================================= */}
        {/* UPPER POSTER SPLIT: GIANT DISPLAY TITLE (LEFT) & PORTRAIT / INTRO (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: GIANT EDITORIAL CONDENSED "ACID BRUTAL" TITLE */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* GIANT ACID BRUTAL POSTER DISPLAY TYPOGRAPHY (EXACT AS REFERENCE POSTER) */}
            <div className="space-y-0 leading-none">
              <h1 className="font-bebas text-[7rem] sm:text-[10.5rem] md:text-[13rem] lg:text-[15rem] tracking-tight text-[#eae7dd] uppercase select-none distressed-title leading-[0.76]">
                ACID
              </h1>
              <h1 className="font-bebas text-[7rem] sm:text-[10.5rem] md:text-[13rem] lg:text-[15rem] tracking-tight text-[#ccff00] uppercase select-none distressed-title leading-[0.76]">
                BRUTAL
              </h1>
            </div>

            {/* PORTFOLIO ARROW TAG & QUICK RESUME / DISPATCH TRIGGER */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#2a2d39]">
              
              {/* PORTFOLIO ↗ LABEL (EXACT AS POSTER) */}
              <div className="flex items-center space-x-3 text-2xl sm:text-3xl font-anton font-bold text-[#eae7dd] tracking-wider">
                <span className="text-[#f4f3ee]">PORTFOLIO</span>
                <ArrowUpRight className="w-7 h-7 text-[#ccff00]" />
                <span className="font-mono text-xs text-[#8a8d98] font-normal tracking-widest pl-2 hidden sm:inline">
                  // AYUSH SHUKLA
                </span>
              </div>

              {/* ACTION BUTTONS (CLEAN & NON-INTRUSIVE) */}
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
                  SELECTED BUILDS ↓
                </a>
              </div>

            </div>

          </div>

          {/* RIGHT 5 COLS: AYUSH'S EDITORIAL PORTRAIT & OFF-WHITE INTRODUCTION CARD */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* 1. TOP EDITORIAL ARTWORK PORTRAIT (SEAMLESS AS IN POSTER) */}
            <div className="relative w-full">
              <div className="relative w-full overflow-hidden bg-transparent">
                <img 
                  src="/ayush-hero.jpg" 
                  alt="Ayush Shukla – ACID BRUTAL Editorial Portrait"
                  className="w-full h-auto object-cover block select-none"
                  loading="eager"
                />
              </div>

              {/* TECHNICAL ID TAG (AS IN POSTER: ID: AB/2026/05) */}
              <div className="absolute -bottom-2.5 right-1 font-mono text-[10px] text-[#ccff00] font-bold bg-[#0e0f12] border border-[#2a2d39] px-2 py-0.5 tracking-wider shadow-md">
                ID: AB/2026/05
              </div>
            </div>

            {/* 2. OFF-WHITE PAPER CARD: INTRODUCTION (EXACT AS POSTER) */}
            <div className="relative bg-[#e4e2d8] text-slate-950 p-6 rounded-none border border-black/30 shadow-[4px_4px_0px_#ccff00] space-y-3 font-mono">
              
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
