import React from 'react';
import { achievementsData } from '../data/portfolioData';
import { Trophy, Award, Star, Medal, Zap, Flag } from 'lucide-react';

export default function Recognition() {
  return (
    <section id="awards" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER (20% TEXT) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-sm bg-amber-400 animate-pulse" />
              <span>CHAMPIONSHIP STANDINGS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              PODIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-white">HONORS</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ NATIONAL HACKATHONS & COMPETITIVE ARENAS ]
          </span>
        </div>

        {/* 70% VISUAL PODIUM SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          
          {/* PODIUM 2 (LEFT): NATIONAL RUNNER UP */}
          <div className="p-6 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-amber-400/60 transition-all space-y-4 backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-slate-400 font-bold">POS 02</span>
              <span className="px-2 py-0.5 rounded bg-slate-500/20 text-slate-200 text-[10px] font-bold border border-slate-500/30">
                P3 OVERALL
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 rounded-full bg-slate-300/10 border border-slate-300/30 mx-auto flex items-center justify-center text-slate-200 shadow-lg group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-slate-300" />
              </div>
              <div className="text-3xl font-clash font-extrabold text-white">
                RANK 3
              </div>
              <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                National Hackathon Runner-Up
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                120+ Teams Competing Across India
              </div>
            </div>

            <div className="w-full h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
              MEDAL OF DISTINCTION
            </div>
          </div>

          {/* PODIUM 1 (CENTER - TALLEST & GOLD): 1ST PLACE HEALTHCARE INNOVATION */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-amber-500/15 via-dark-900 to-black border-2 border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.25)] space-y-5 backdrop-blur-2xl relative overflow-hidden group -mt-4">
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-400 text-black font-mono text-[9px] font-extrabold uppercase">
              1ST PLACE
            </div>

            <div className="flex items-center justify-between border-b border-amber-400/30 pb-3 font-mono">
              <span className="text-xs text-amber-400 font-bold">CHAMPIONSHIP P1</span>
              <span className="text-amber-400 text-xs font-bold">GOLD LAUREL</span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-18 h-18 rounded-full bg-amber-400/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform">
                <Trophy className="w-9 h-9 text-amber-400" />
              </div>
              <div className="text-4xl font-clash font-extrabold text-amber-300 uppercase">
                1ST PRIZE
              </div>
              <div className="text-sm font-mono text-white font-bold uppercase">
                Healthcare Innovation Track
              </div>
              <div className="text-xs font-mono text-slate-300">
                VacciTrack Immunization Platform
              </div>
            </div>

            <div className="w-full h-14 bg-amber-500/20 rounded-xl border border-amber-400/50 flex items-center justify-center font-mono text-xs font-extrabold text-amber-300 shadow-md">
              ★ GRAND PRIZE WINNER ★
            </div>
          </div>

          {/* PODIUM 3 (RIGHT): HACKERRANK 3-STAR & IIT MADRAS */}
          <div className="p-6 rounded-2xl bg-dark-900/90 border border-white/15 hover:border-amber-400/60 transition-all space-y-4 backdrop-blur-xl relative overflow-hidden group">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
              <span className="text-xs text-slate-400 font-bold">POS 03</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                3-STAR RATING
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="w-14 h-14 rounded-full bg-amber-600/10 border border-amber-600/30 mx-auto flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-3xl font-clash font-extrabold text-white">
                3-STAR C
              </div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                HackerRank Problem Solving
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                NeuroHACK IIT Madras Finalist
              </div>
            </div>

            <div className="w-full h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
              ALGORITHMIC CERTIFICATION
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
