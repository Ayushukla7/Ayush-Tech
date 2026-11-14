import React from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import { GraduationCap, Award, Compass, ShieldCheck, CheckCircle2, UserCheck, QrCode } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* FORMAL EXECUTIVE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-red-500 font-semibold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>DRIVER DOSSIER // SCUDERIA AS-26</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              DRIVER <span className="text-white">DOSSIER</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ VERIFIED PADDOCK IDENTITY PASS ]
          </span>
        </div>

        {/* 70% VISUAL DRIVER IDENTITY PASS & TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT 5 COLS: 3D HOLOGRAPHIC DRIVER PASS (VISUAL IDENTITY) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-dark-900 border-2 border-white/20 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(225,6,0,0.2)] space-y-6 overflow-hidden group hover:border-red-500/80 transition-all">
              
              {/* Lanyard Top Slot */}
              <div className="w-16 h-3 rounded-full bg-white/10 mx-auto border border-white/20" />

              {/* Driver Photo Frame */}
              <div className="w-full h-56 rounded-2xl bg-gradient-to-b from-dark-800 to-black border border-white/15 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center font-clash font-extrabold text-3xl text-white shadow-[0_0_25px_rgba(225,6,0,0.35)]">
                  AS
                </div>
                <div className="mt-3 text-center">
                  <div className="font-clash font-extrabold text-xl text-white uppercase tracking-wide">
                    AYUSH SHUKLA
                  </div>
                  <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                    FULL-STACK SYSTEMS ARCHITECT
                  </div>
                </div>
              </div>

              {/* Pass Telemetry Details */}
              <div className="space-y-2.5 font-mono text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>CHASSIS NO:</span>
                  <strong className="text-white">AS-2026</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CAMPUS GRID:</span>
                  <strong className="text-slate-200">ABESEC (CGPA 7.89)</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>INTERMEDIATE:</span>
                  <strong className="text-white">UPMSP 88%</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>BASE STATION:</span>
                  <strong className="text-white">{personalInfo.location}</strong>
                </div>
              </div>

              {/* Holographic FIA Barcode & Chips */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px] text-slate-500">
                <span className="flex items-center space-x-1.5 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>FIA LICENSE VERIFIED</span>
                </span>
                <span className="tracking-widest">AS-9844-PRO</span>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: FORMAL SPECIFICATIONS & BIO */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="px-3 py-1 rounded bg-white/[0.06] border border-white/15 text-slate-300 font-mono text-xs uppercase tracking-widest font-semibold">
                SYSTEMS ARCHITECT SUMMARY
              </span>
              <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                Computer Science undergraduate combining full-stack MERN development, UI/UX design architectures, and technical leadership. Proven track record of architecting scalable web apps, optimizing database query pipelines, and leading developer community ecosystems of 2,000+ members. National hackathon 2nd runner-up and BuildSprint champion.
              </p>
            </div>

            {/* CORE ATTRIBUTES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-dark-900/90 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-white font-clash font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>ALGORITHMIC RIGOR</span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  350+ Data Structures & Algorithms solved across Java, C++ STL, and OOP design.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/90 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-white font-clash font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>SYSTEM LATENCY</span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Optimized multi-stage MongoDB aggregations, slashing server response latency by 35%.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/90 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-white font-clash font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>ENTERPRISE STANDARDS</span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Engineered 7+ modular HR subsystems with secure stateless JWT authentication.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/90 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-white font-clash font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>HIGH-FRAME FRONTENDS</span>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  10+ UI/UX design prototypes and fluid 60 FPS frontends with React, Framer Motion & Tailwind.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
