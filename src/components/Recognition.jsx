import React from 'react';
import { achievementsData } from '../data/portfolioData';
import { Trophy, Award, Star, Medal, Zap, Flag } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function Recognition() {
  return (
    <section id="awards" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold">
                CHAMPIONSHIP STANDINGS // PODIUM HONORS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              PODIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-white">HONORS</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
            Proven engineering track record in national hackathons, healthcare innovation tracks, and algorithmic problem-solving arenas.
          </p>
        </div>

        {/* PODIUM CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, idx) => (
            <div 
              key={idx}
              className="group relative p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(245,158,11,0.2)] space-y-4 backdrop-blur-xl overflow-hidden"
              data-cursor="PODIUM"
            >
              {/* Corner tick */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-400/70" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-400/70" />

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.badge}</span>
                </span>
                <span className="text-xs font-mono font-bold text-red-400">
                  {item.rank}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-clash font-extrabold text-white group-hover:text-amber-300 transition-colors uppercase tracking-wide">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-cyan-400 block font-semibold">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed border-t border-white/[0.06] pt-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
