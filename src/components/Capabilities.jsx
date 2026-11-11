import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Cpu, Zap, Activity, ChevronRight, Terminal, CheckCircle2, ShieldAlert } from 'lucide-react';
import { playTacticalClick, playTelemetryBlip } from '../utils/audio';

const SUBSYSTEM_CODES = [
  'SUBSYSTEM 01 // POWERTRAIN & COMPUTE',
  'SUBSYSTEM 02 // AERO & COCKPIT INTERFACES',
  'SUBSYSTEM 03 // TRANSMISSION & PIPELINES',
  'SUBSYSTEM 04 // DATA STORAGE & TELEMETRY',
  'SUBSYSTEM 05 // PITWALL & DIAGNOSTIC TOOLS'
];

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 racing-grid">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
                SUBSYSTEM DIAGNOSTICS // POWERTRAIN MATRIX
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              POWERTRAIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">MATRIX</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
            Full-spectrum telemetry matrix across algorithmic computation, aerodynamic client architectures, backend transmission pipelines, and high-throughput databases.
          </p>
        </div>

        {/* ACCORDION SUBSYSTEM DIAGNOSTICS */}
        <div className="divide-y divide-white/10">
          {skillsData.map((category, index) => {
            const isActive = activeTab === index;
            const subCode = SUBSYSTEM_CODES[index] || `SUBSYSTEM 0${index + 1}`;

            return (
              <div
                key={category.category}
                onClick={() => {
                  playTacticalClick();
                  playTelemetryBlip(index * 60);
                  setActiveTab(isActive ? -1 : index);
                }}
                className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer group rounded-xl ${
                  isActive ? 'bg-white/[0.03] px-4 sm:px-6 border border-white/10 my-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)]' : 'hover:px-3'
                }`}
                data-cursor="DIAGNOSTIC"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <span className="font-mono text-xs sm:text-sm text-red-500 font-bold px-2 py-0.5 rounded bg-red-600/10 border border-red-500/30">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                        {subCode}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-extrabold text-white group-hover:text-red-400 transition-colors uppercase">
                        {category.category}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      {category.description}
                    </span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_#ef4444]' 
                        : 'bg-black/60 border-white/20 text-slate-400 group-hover:border-red-400 group-hover:text-white'
                    }`}>
                      {isActive ? '−' : '+'}
                    </div>
                  </div>
                </div>

                {/* EXPANDED TELEMETRY COMPONENT TILES */}
                {isActive && (
                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="p-4 rounded-xl bg-dark-900 border border-white/10 space-y-2 hover:border-red-500/50 hover:bg-dark-850 transition-all relative overflow-hidden"
                      >
                        {/* Micro telemetry indicator */}
                        <div className="absolute top-2 right-2 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[8px] font-mono text-emerald-400 uppercase">ONLINE</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                            SPEC: {skill.badge}
                          </span>
                          <h4 className="font-clash font-extrabold text-lg text-white">
                            {skill.name}
                          </h4>
                        </div>

                        <p className="text-xs font-mono text-slate-400 border-t border-white/[0.06] pt-2">
                          {skill.level}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
