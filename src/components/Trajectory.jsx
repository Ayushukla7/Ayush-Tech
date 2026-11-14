import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Flag, Calendar, MapPin, Gauge } from 'lucide-react';

export default function Trajectory() {
  return (
    <section id="experience" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* FORMAL EXECUTIVE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-red-500 font-semibold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>CAREER STINTS & TRACK LAPS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              RACE <span className="text-white">STRATEGY</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ LEADERSHIP & COMMUNITY IMPACT ]
          </span>
        </div>

        {/* 70% VISUAL STINT TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {experienceData.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/60 transition-all space-y-4 backdrop-blur-xl relative overflow-hidden group"
              data-cursor="LAP"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
                <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-slate-200 font-bold text-xs">
                  LAP 0{idx + 1}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {item.period}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-clash font-extrabold text-white uppercase group-hover:text-red-400 transition-colors">
                  {item.role}
                </h3>
                <div className="text-xs font-mono text-slate-300 font-semibold">
                  @{item.organization} • {item.location}
                </div>
              </div>

              {/* PUNCHY METRICS CHIPS & HIGHLIGHTS */}
              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-red-600/20 border border-red-500/40 text-red-300 font-bold">
                    {item.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-300">
                    {item.type}
                  </span>
                </div>
                
                {item.highlights && item.highlights.length > 0 && (
                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
                    {item.highlights[0]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
