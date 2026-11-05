import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { Code2, ArrowUpRight, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold block">
              CAPABILITIES & EXPERTISE // 02
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              TECHNICAL MATRIX
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed">
            Full-spectrum software engineering: low-overhead algorithmic code to reactive, accessible frontend architectures and robust backend services.
          </p>
        </div>

        {/* ACCORDION / EDITORIAL CAPABILITIES LIST (Trionn Signature Style) */}
        <div className="divide-y divide-white/[0.08]">
          {skillsData.map((category, index) => {
            const isActive = activeTab === index;
            return (
              <div
                key={category.category}
                onClick={() => {
                  playTacticalClick();
                  setActiveTab(isActive ? -1 : index);
                }}
                className={`py-8 sm:py-10 transition-all duration-300 cursor-pointer group ${
                  isActive ? 'bg-white/[0.02] px-6 sm:px-8 rounded-3xl' : 'hover:px-4'
                }`}
                data-cursor="EXPAND"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-6">
                    <span className="font-mono text-xs sm:text-sm text-cyan-400 font-bold">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-clash font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {category.category}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs sm:text-sm font-sans font-light text-slate-400">
                      {category.description}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 ${isActive ? 'rotate-45 bg-cyan-400 text-black border-cyan-400' : 'group-hover:border-cyan-400'}`}>
                      +
                    </div>
                  </div>
                </div>

                {/* EXPANDED SKILLS BADGES */}
                {isActive && (
                  <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
                    {category.skills.map((skill) => (
                      <div 
                        key={skill.name}
                        className="p-4 rounded-2xl bg-dark-850 border border-white/[0.08] space-y-1.5 hover:border-cyan-400/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-clash font-bold text-base text-white">
                            {skill.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {skill.badge}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-slate-400">
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
