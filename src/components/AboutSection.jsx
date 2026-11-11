import React from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import { GraduationCap, Award, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
                DRIVER DOSSIER // SCUDERIA AS-26
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              DRIVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">DOSSIER</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
            Committed to engineering digital software infrastructure that scales seamlessly without latency compromises or architectural bottlenecks.
          </p>
        </div>

        {/* EDITORIAL STATEMENT & TELEMETRY SPECS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-clash font-extrabold text-white uppercase leading-snug">
              "Building high-performance digital engines through disciplined engineering, creative intuition and algorithmic rigor."
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
              {aboutData.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {aboutData.highlights.map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-dark-900/90 border border-white/15 space-y-2 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="font-clash font-extrabold text-sm text-red-400 flex items-center space-x-1.5 uppercase tracking-wide">
                    <span>{item.title}</span>
                  </span>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ACADEMICS & INSTITUTION CARD */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-white/15 space-y-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/70" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/70" />

            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 border-b border-white/10 pb-4">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span className="uppercase font-bold tracking-wider">ACADEMIC FOUNDATION & TELEMETRY</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-clash font-extrabold text-white uppercase">
                {aboutData.education.institution}
              </h4>
              <p className="text-xs font-mono text-cyan-300 font-semibold">
                {aboutData.education.degree}
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  CGPA: {aboutData.education.cgpa}
                </span>
                <span>{aboutData.education.duration}</span>
              </div>
            </div>

            {/* Coursework Matrix */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                CORE COMPUTER SCIENCE DISCIPLINES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aboutData.education.coursework.map((course, i) => (
                  <span 
                    key={i}
                    className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300 font-medium"
                  >
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
