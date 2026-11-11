import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Flag, Calendar, MapPin, Gauge } from 'lucide-react';

export default function Trajectory() {
  return (
    <section id="experience" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER (20% TEXT) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-sm bg-red-500 animate-pulse" />
              <span>CAREER STINTS & TRACK LAPS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              RACE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white">STRATEGY</span>
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
                <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-bold text-xs">
                  LAP 0{idx + 1}
                </span>
                <span className="text-xs text-slate-400">
                  {item.period}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-clash font-extrabold text-white uppercase group-hover:text-red-400 transition-colors">
                  {item.role}
                </h3>
                <div className="text-xs font-mono text-cyan-400 font-semibold">
                  @{item.organization} • {item.location}
                </div>
              </div>

              {/* PUNCHY METRICS CHIPS */}
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                {idx === 0 && (
                  <>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-200">Tech Roadmap Leadership</span>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-200">Product Architecture</span>
                  </>
                )}
                {idx === 1 && (
                  <>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-200">Enterprise Liaison</span>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-200">Campus Tech Growth</span>
                  </>
                )}
                {idx === 2 && (
                  <>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-emerald-400 font-bold">2,000+ Community</span>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-200">Developer Paddock</span>
                  </>
                )}
                {idx === 3 && (
                  <>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-cyan-300">UI & Graphic Systems</span>
                    <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-slate-200">Event Branding</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
