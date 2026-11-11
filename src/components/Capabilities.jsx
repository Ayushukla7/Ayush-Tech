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
        
        {/* HEADER (20% TEXT) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse" />
              <span>SUBSYSTEM MATRIX // 05 RIGS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              POWERTRAIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white">STACK</span>
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
                      ? 'bg-red-600/20 border-red-500/70 shadow-[0_0_25px_rgba(225,6,0,0.25)]'
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
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">
                        SUBSYSTEM 0{idx + 1}
                      </span>
                      <span className="font-clash font-extrabold text-lg text-white uppercase tracking-wide">
                        {cat.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold block ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
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
                <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-bold uppercase">
                  {skillsData[activeIdx].category}
                </span>
                <span className="text-slate-400 hidden sm:inline">// HARDWARE BENCHMARK</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% OPERATIONAL</span>
              </span>
            </div>

            {/* VISUAL COMPONENT TILES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillsData[activeIdx].skills.map((skill, i) => (
                <div 
                  key={skill.name}
                  className="p-4 rounded-xl bg-dark-900 border border-white/10 hover:border-red-500/50 transition-all space-y-2 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-clash font-extrabold text-base text-white tracking-wide">
                      {skill.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/10 text-cyan-300 border border-white/15">
                      {skill.badge}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-slate-300 leading-normal">
                    {skill.level}
                  </p>

                  {/* VISUAL TELEMETRY STATUS BAR (PURE VISUAL) */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-cyan-400 rounded-full group-hover:shadow-[0_0_8px_#00f2fe] transition-all"
                      style={{ width: `${88 + (i % 3) * 5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
