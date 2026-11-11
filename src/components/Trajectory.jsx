import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Flag, Calendar, MapPin, Gauge, Radio, ShieldCheck } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function Trajectory() {
  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-red-500 font-bold">
                RACE STRATEGY // CAREER LAPS & STINTS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              RACE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">STRATEGY</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
            Leading engineering organizations, scaling tech communities to 2,000+ members, corporate ambassadorship, and UI design leadership.
          </p>
        </div>

        {/* TIMELINE: RACE STINTS & PITSTOP RECORDS */}
        <div className="space-y-4">
          {experienceData.map((item, idx) => (
            <div 
              key={idx}
              className="group p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/60 transition-all duration-300 space-y-4 backdrop-blur-xl relative overflow-hidden"
              data-cursor="STINT"
            >
              {/* Corner tick */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/70" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold">
                      STINT 0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-clash font-extrabold text-white group-hover:text-red-400 transition-colors uppercase tracking-wide">
                      {item.role} <span className="text-slate-500 font-normal">@</span> {item.organization}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 block pl-0 sm:pl-16">
                    {item.type}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center space-x-1.5 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-red-400" />
                    <span>{item.period}</span>
                  </span>
                  <span className="hidden sm:flex items-center space-x-1.5 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              {/* HIGHLIGHT POINTS */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-mono pl-1">
                {item.highlights.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-red-500 font-bold mt-0.5 shrink-0">►</span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
