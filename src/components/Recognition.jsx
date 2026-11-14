import React from 'react';
import { achievementsData } from '../data/portfolioData';
import { Trophy, Award, Star, Medal, Zap, Flag } from 'lucide-react';

export default function Recognition() {
  return (
    <section id="awards" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid overflow-hidden">
      {/* FINISH LINE CHEQUERED FLAG BORDER */}
      <div className="absolute top-0 inset-x-0 h-2 chequered-flag-strip opacity-90" />
      <div className="absolute bottom-0 inset-x-0 h-2 chequered-flag-strip opacity-90" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* FORMAL FINISH LINE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>FINISH LINE // CHAMPIONSHIP PODIUM</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              PODIUM <span className="text-white">HONORS</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ NATIONAL HACKATHONS & COMPETITIVE ARENAS ]
          </span>
        </div>

        {/* 70% VISUAL PODIUM SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          
          {/* PODIUM 2 (LEFT): NATIONAL RUNNER UP */}
          <div className="p-6 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/50 transition-all space-y-4 backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-slate-400 font-bold">POS 02</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-200 text-[10px] font-bold border border-white/10">
                P3 OVERALL
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 mx-auto flex items-center justify-center text-slate-200 shadow-lg group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-slate-300" />
              </div>
              <div className="text-3xl font-clash font-extrabold text-white">
                RANK 3
              </div>
              <div className="text-xs font-mono text-slate-200 font-bold uppercase">
                National Hackathon 2nd Runner-Up
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                120+ Engineering Teams Competing Across India
              </div>
            </div>

            <div className="w-full h-12 bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
              NATIONAL MEDAL OF DISTINCTION
            </div>
          </div>

          {/* PODIUM 1 (CENTER - TALLEST): 1ST PLACE CHAMPION */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] via-dark-900 to-black border-2 border-red-500/80 shadow-[0_0_50px_rgba(225,6,0,0.25)] space-y-5 backdrop-blur-2xl relative overflow-hidden group -mt-4">
            <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-extrabold uppercase shadow-md">
              1ST PLACE
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-red-400 font-bold">CHAMPIONSHIP P1</span>
              <span className="text-slate-300 text-xs font-bold">BUILDSPRINT WINNER</span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-18 h-18 rounded-full bg-red-600/20 border-2 border-red-500 mx-auto flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(225,6,0,0.35)] group-hover:scale-110 transition-transform">
                <Trophy className="w-9 h-9 text-red-500" />
              </div>
              <div className="text-4xl font-clash font-extrabold text-white uppercase">
                1ST PRIZE
              </div>
              <div className="text-sm font-mono text-slate-200 font-bold uppercase">
                BuildSprint Winner (Rank 1 / 85+)
              </div>
              <div className="text-xs font-mono text-slate-400">
                1st Position Healthcare Innovation Track
              </div>
            </div>

            <div className="w-full h-12 bg-red-600/20 rounded-xl border border-red-500/40 flex items-center justify-center font-mono text-xs font-bold text-red-300">
              GOLD CHAMPIONSHIP TROPHY
            </div>
          </div>

          {/* PODIUM 3 (RIGHT): 350+ DSA PROBLEMS */}
          <div className="p-6 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/50 transition-all space-y-4 backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-slate-400 font-bold">POS 03</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-200 text-[10px] font-bold border border-white/10">
                DSA MASTERY
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 mx-auto flex items-center justify-center text-slate-200 shadow-lg group-hover:scale-110 transition-transform">
                <Medal className="w-7 h-7 text-slate-300" />
              </div>
              <div className="text-3xl font-clash font-extrabold text-white">
                350+ DSA
              </div>
              <div className="text-xs font-mono text-slate-200 font-bold uppercase">
                LeetCode & GeeksforGeeks
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Java & C++ STL Algorithmic Challenges
              </div>
            </div>

            <div className="w-full h-12 bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
              ALGORITHMIC BADGE
            </div>
          </div>

        </div>

        {/* ADDITIONAL NATIONAL FINALIST BADGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
          <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">IIT MADRAS SHAASTRA</span>
              <span className="font-clash font-bold text-sm text-white">NeuroHACK Finalist</span>
              <p className="text-[11px] text-slate-400 font-sans">National finalist among top engineering cohorts</p>
            </div>
            <Star className="w-6 h-6 text-red-500 shrink-0" />
          </div>

          <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">OPEN INNOVATION CHALLENGE</span>
              <span className="font-clash font-bold text-sm text-white">Code for Bharat Season 2 Finalist</span>
              <p className="text-[11px] text-slate-400 font-sans">Selected national-level finalist across open domains</p>
            </div>
            <Flag className="w-6 h-6 text-red-500 shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
