import React from 'react';
import { experienceData, achievementsData } from '../data/portfolioData';
import { BrutalStar } from './AcidIcons';
import { ArrowUpRight, Trophy, Award, Star } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function Trajectory() {
  return (
    <section 
      id="experience" 
      className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-[#2a2d39] acid-grid select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#2a2d39]">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#ccff00]">
              <span className="w-2 h-2 bg-[#ccff00]" />
              <span className="uppercase font-bold tracking-widest">RECORD & CAREER LEDGER</span>
            </div>
            <h2 className="font-anton tracking-wider text-4xl sm:text-5xl uppercase text-[#eae7dd]">
              EXPERIENCE <span className="text-[#ccff00]">& HONORS</span>
            </h2>
          </div>
          <span className="font-mono text-xs text-[#8a8d98]">
            [ VERIFIED TECHNICAL APPOINTMENTS ]
          </span>
        </div>

        {/* 2-COLUMN BRUTALIST GRID: EXPERIENCE (LEFT) & HONORS (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 6 COLS: EXPERIENCE CARDS */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2a2d39] font-mono text-xs">
              <span className="text-[#ccff00] font-bold uppercase">WORK EXPERIENCE & LEADERSHIP</span>
              <span className="text-[#8a8d98]">[04 ROLES]</span>
            </div>

            <div className="space-y-3">
              {experienceData.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 border border-[#2a2d39] bg-[#14161c] hover:border-[#ccff00] transition-all space-y-2 group shadow-[3px_3px_0px_#000]"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#ccff00] font-bold tracking-wider">
                      ROLE 0{idx + 1} // {item.badge}
                    </span>
                    <span className="text-[#8a8d98]">
                      {item.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-anton text-xl sm:text-2xl text-[#eae7dd] group-hover:text-[#ccff00] transition-colors uppercase tracking-wide">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono text-[#a5a9b8] uppercase">
                      @{item.organization} • {item.location}
                    </p>
                  </div>

                  {item.highlights && item.highlights.length > 0 && (
                    <p className="text-xs font-sans text-[#cfd2dc] leading-relaxed pt-1 border-t border-[#2a2d39]">
                      {item.highlights[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 6 COLS: HONORS & HACKATHON ACCOLADES */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2a2d39] font-mono text-xs">
              <span className="text-[#ccff00] font-bold uppercase">HONORS & COMPETITIONS</span>
              <span className="text-[#8a8d98]">[PODIUM STANDINGS]</span>
            </div>

            <div className="space-y-3">
              {achievementsData.map((achieve, idx) => (
                <div 
                  key={idx}
                  className="p-5 border border-[#2a2d39] bg-[#14161c] hover:border-[#ccff00] transition-all space-y-2 group shadow-[3px_3px_0px_#000]"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2 py-0.5 bg-[#ccff00] text-black font-bold uppercase text-[10px]">
                      {achieve.badge}
                    </span>
                    <span className="text-[#8a8d98] font-mono text-[11px]">
                      {achieve.rank}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-anton text-xl sm:text-2xl text-[#eae7dd] group-hover:text-[#ccff00] transition-colors uppercase tracking-wide">
                      {achieve.title}
                    </h3>
                    <p className="text-xs font-mono text-[#a5a9b8] uppercase">
                      {achieve.category}
                    </p>
                  </div>

                  <p className="text-xs font-sans text-[#cfd2dc] leading-relaxed pt-1 border-t border-[#2a2d39]">
                    {achieve.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
