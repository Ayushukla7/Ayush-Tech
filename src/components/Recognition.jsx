import React from 'react';
import { achievementsData } from '../data/portfolioData';
import { Trophy, Award, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function Recognition() {
  return (
    <section id="awards" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold block">
              HONORS & RECOGNITION // 04
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              AWARDS & COMPETITIVE EXCELLENCE
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed">
            Proven track record in national hackathons, healthcare innovation tracks, and algorithmic problem-solving arenas.
          </p>
        </div>

        {/* AWARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, idx) => (
            <div 
              key={idx}
              className="group p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.06] hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-4"
              data-cursor="AWARD"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-cyan-400">
                  {item.rank}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-clash font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 block">
                  {item.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
