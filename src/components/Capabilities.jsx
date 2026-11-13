import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Cpu, Zap, Activity, Layers, Database, Terminal, ShieldCheck } from 'lucide-react';
import { playTacticalClick, playTouchSelect } from '../utils/audio';

const ICONS = [Cpu, Zap, Activity, Database, Terminal];

export default function Capabilities() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="skills" className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* FORMAL EXECUTIVE HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-red-500 font-semibold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>SUBSYSTEM MATRIX // 05 RIGS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              POWERTRAIN <span className="text-white">STACK</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ ALL HARDWARE & SOFTWARE SUBSYSTEMS CALIBRATED ]
          </span>
        </div>

        {/* 70% VISUAL INTERACTIVE CHIPS & TELEMETRY GAUGES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 4 COLS: Visual Subsystem Selector Tabs */}
          <div className="lg:col-span-5 space-y-2 font-mono">
            {skillsData.map((cat, idx) => {
              const isSelected = activeIdx === idx;
              const IconComp = ICONS[idx] || Cpu;

              return (
                <button
                  key={cat.category}
                  onClick={() => {
                    playTacticalClick();
                    playTouchSelect();
                    setActiveIdx(idx);
                  }}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-red-600/20 border-red-500/70 shadow-[0_0_25px_rgba(225,6,0,0.2)]'
                      : 'bg-dark-900/80 hover:bg-dark-850 border-white/10 text-slate-400 hover:text-white'
                  }`}
                  data-cursor="SUBSYSTEM"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                      isSelected 
                        ? 'bg-red-600 text-white border-red-400 shadow-md' 
                        : 'bg-black/60 border-white/10 text-slate-400'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">
                        SUBSYSTEM 0{idx + 1}
                      </span>
                      <span className="font-clash font-extrabold text-lg text-white uppercase tracking-wide">
                        {cat.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold block ${isSelected ? 'text-red-400' : 'text-slate-500'}`}>
                      {isSelected ? '● ACTIVE' : 'CALIBRATED'}
                    </span>
                    <span className="text-[9px] text-slate-400">{cat.skills.length} MODULES</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT 7 COLS: 70% VISUAL COMPONENT TILES WITH LIVE METERS */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-black/90 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* CORNER BRACKETS */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/80" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/80" />

            {/* TOP DIAGNOSTIC BAR */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/15 text-slate-200 font-bold uppercase">
                  {skillsData[activeIdx].category}
                </span>
                <span className="text-slate-400 hidden sm:inline">// HARDWARE BENCHMARK</span>
              </div>
              <span className="text-slate-300 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>BENCHMARK OPTIMAL</span>
              </span>
            </div>

            {/* GRID OF SKILL COMPONENTS WITH LIVE SVG GAUGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillsData[activeIdx].skills.map((skill, i) => {
                const skillName = typeof skill === 'object' ? skill.name : skill;
                const skillLevel = typeof skill === 'object' ? skill.level : 'CORE PROFICIENCY';
                return (
                  <div 
                    key={i}
                    className="p-3.5 rounded-xl bg-dark-900/90 border border-white/10 hover:border-red-500/50 transition-all flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="font-clash font-bold text-sm text-white uppercase group-hover:text-red-400 transition-colors">
                          {skillName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block">
                        {skillLevel}
                      </span>
                    </div>

                    {/* MINI SPEEDOMETER GAUGE PER SKILL */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-white/10"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-red-500 transition-all duration-700"
                          strokeDasharray={`${85 + (i * 3) % 15}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute font-mono text-[8px] font-bold text-white">
                        {88 + (i * 2) % 12}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PADDOCK STATUS FOOTNOTE */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>ARCHITECTURE: FAULT-TOLERANT DISTRIBUTED</span>
              <span>SCUDERIA AS-26</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
