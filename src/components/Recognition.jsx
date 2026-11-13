import React from 'react';
import { achievementsData } from '../data/portfolioData';
import { Trophy, Award, Star, Medal, Zap, Flag } from 'lucide-react';

export default function Recognition() {
  return (
    <section id="awards" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* FORMAL EXECUTIVE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-red-500 font-semibold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>CHAMPIONSHIP STANDINGS</span>
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
                National Hackathon Runner-Up
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                120+ Teams Competing Across India
              </div>
            </div>

            <div className="w-full h-12 bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
              MEDAL OF DISTINCTION
            </div>
          </div>

          {/* PODIUM 1 (CENTER - TALLEST): 1ST PLACE HEALTHCARE INNOVATION */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] via-dark-900 to-black border-2 border-red-500/80 shadow-[0_0_50px_rgba(225,6,0,0.25)] space-y-5 backdrop-blur-2xl relative overflow-hidden group -mt-4">
            <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-extrabold uppercase shadow-md">
              1ST PLACE
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-red-400 font-bold">CHAMPIONSHIP P1</span>
              <span className="text-slate-300 text-xs font-bold">GOLD DISTINCTION</span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-18 h-18 rounded-full bg-red-600/20 border-2 border-red-500 mx-auto flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(225,6,0,0.35)] group-hover:scale-110 transition-transform">
                <Trophy className="w-9 h-9 text-red-500" />
              </div>
              <div className="text-4xl font-clash font-extrabold text-white uppercase">
                1ST PRIZE
              </div>
              <div className="text-sm font-mono text-slate-200 font-bold uppercase">
                Healthcare Innovation Track
              </div>
              <div className="text-xs font-mono text-slate-400">
                VacciTrack Immunization Platform
              </div>
            </div>

            <div className="w-full h-12 bg-red-600/20 rounded-xl border border-red-500/40 flex items-center justify-center font-mono text-xs font-bold text-red-300">
              NATIONAL WINNER TROPHY
            </div>
          </div>

          {/* PODIUM 3 (RIGHT): COMPETITIVE PROBLEM SOLVING */}
          <div className="p-6 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/50 transition-all space-y-4 backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-slate-400 font-bold">POS 03</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-200 text-[10px] font-bold border border-white/10">
                TOP 5% CODERS
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/15 mx-auto flex items-center justify-center text-slate-200 shadow-lg group-hover:scale-110 transition-transform">
                <Medal className="w-7 h-7 text-slate-300" />
              </div>
              <div className="text-3xl font-clash font-extrabold text-white">
                3-STAR
              </div>
              <div className="text-xs font-mono text-slate-200 font-bold uppercase">
                HackerRank C++ & Python
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                250+ Algorithmic Challenges Cleared
              </div>
            </div>

            <div className="w-full h-12 bg-white/[0.04] rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
              ALGORITHMIC BADGE
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
