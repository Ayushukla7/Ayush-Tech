import React from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import { GraduationCap, Award, Compass, ShieldCheck, CheckCircle2, UserCheck, QrCode } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER (20% TEXT) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse" />
              <span>DRIVER DOSSIER // SCUDERIA AS-26</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              DRIVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white">DOSSIER</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ VERIFIED FIA / PADDOCK IDENTITY PASS ]
          </span>
        </div>

        {/* 70% VISUAL DRIVER IDENTITY PASS & TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT 5 COLS: 3D HOLOGRAPHIC DRIVER PASS (VISUAL IDENTITY) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-dark-900 border-2 border-white/20 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(225,6,0,0.25)] space-y-6 overflow-hidden group hover:border-red-500/80 transition-all">
              
              {/* Lanyard Top Slot (from reference image) */}
              <div className="w-16 h-3 rounded-full bg-white/10 mx-auto border border-white/20" />

              {/* Driver Photo Frame */}
              <div className="w-full h-56 rounded-2xl bg-gradient-to-b from-dark-800 to-black border border-white/15 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center font-clash font-extrabold text-3xl text-white shadow-[0_0_25px_rgba(225,6,0,0.5)]">
                  AS
                </div>
                <div className="mt-3 text-center">
                  <div className="font-clash font-extrabold text-xl text-white uppercase tracking-wide">
                    AYUSH SHUKLA
                  </div>
                  <div className="text-[10px] font-mono text-red-400 font-bold uppercase">
                    FULL-STACK SYSTEMS ARCHITECT
                  </div>
                </div>
              </div>

              {/* Pass Telemetry Details */}
              <div className="space-y-2 font-mono text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>CHASSIS NO:</span>
                  <strong className="text-white">AS-2026</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CAMPUS GRID:</span>
                  <strong className="text-cyan-400">ABESEC (B.Tech CSE)</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CGPA METRIC:</span>
                  <strong className="text-amber-400">8.00 / 10.0</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>TELEMETRY STATUS:</span>
                  <strong className="text-emerald-400">VERIFIED ACTIVE</strong>
                </div>
              </div>

              {/* Digital Pass Holographic Stamp */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-slate-500">
                <span>DIGITAL PADDOCK PASS</span>
                <span className="text-red-400 font-bold">PASS ID #AS-9369</span>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: 4 VISUAL PILLARS (30% TEXT) */}
          <div className="lg:col-span-7 space-y-4 font-mono">
            
            <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/15 space-y-2">
              <span className="text-xs text-red-400 font-bold uppercase tracking-wider block">
                01 // ALGORITHMIC PERFORMANCE
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solved 250+ algorithmic problems across Java and C++ with HackerRank 3-Star Problem Solving recognition in C.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/15 space-y-2">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                02 // PREDICTIVE LOW-LATENCY SYSTEMS
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engineered VacciTrack (ABHA compliance, 95% error cut) and WorkRadar (88% delay forecast accuracy, -45% latency cut).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/15 space-y-2">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                03 // PADDOCK LEADERSHIP
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Co-Founder at ZenYukti, Capgemini Student Ambassador, and Community Manager scaling developer networks to 2,000+ engineers.
              </p>
            </div>

            {/* Academic Coursework Pills */}
            <div className="p-5 rounded-2xl bg-black border border-white/15 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                CORE COMPUTER SCIENCE DISCIPLINES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aboutData.education.coursework.map((course) => (
                  <span key={course} className="px-2.5 py-1 rounded bg-white/10 text-[11px] text-slate-200 border border-white/15 font-semibold">
                    {course}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
