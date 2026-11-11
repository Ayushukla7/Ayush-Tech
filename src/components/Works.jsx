import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/portfolioData';
import { ArrowUpRight, Github, ExternalLink, Trophy, Cpu, Zap, Activity, ShieldCheck, Terminal } from 'lucide-react';
import { playTacticalClick, playTelemetryBlip } from '../utils/audio';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Works({ onSelectProject }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.paddock-card-wrapper', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        stagger: 0.14,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 racing-grid"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-red-500 font-bold">
                PADDOCK WORKSHOP // CHASSIS BUILDS 01–04
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              PADDOCK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">BUILDS</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
            High-stress software chassis engineered for mission-critical reliability, predictive risk mitigation, and low-latency execution.
          </p>
        </div>

        {/* PROJECTS GRID: F1 TELEMETRY CHASSIS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project, idx) => (
            <div key={project.id} className="paddock-card-wrapper">
              <TiltCard
                onClick={() => {
                  playTacticalClick();
                  playTelemetryBlip(idx * 70);
                  onSelectProject(project);
                }}
                maxTilt={5}
                scale={1.015}
                className="group relative rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,6,0,0.2)] cursor-pointer h-full backdrop-blur-xl overflow-hidden"
                data-cursor="TELEMETRY"
              >
                {/* SCHEMATIC CORNER TICKS */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/70" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/70" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-red-500/70" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-red-500/70" />

                {/* TOP ROW: CHASSIS NUMBER & PODIUM STATUS */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-bold">
                      CHASSIS RIG-0{idx + 1}
                    </span>
                    <span className="text-slate-500 hidden sm:inline">// DEPLOYED</span>
                  </div>

                  <span className="px-3 py-1 rounded text-xs font-mono bg-white/[0.04] border border-white/10 text-amber-300 flex items-center space-x-1.5 font-semibold">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span className="line-clamp-1">{project.award}</span>
                  </span>
                </div>

                {/* CARD PREVIEW GRAPHIC BOX */}
                <div className="my-6 w-full h-56 sm:h-64 rounded-xl bg-dark-950 border border-white/10 overflow-hidden relative flex flex-col justify-between p-6 group-hover:border-red-500/50 transition-all duration-300">
                  {/* Subtle telemetry grid inside preview */}
                  <div className="absolute inset-0 racing-grid-dense opacity-30 pointer-events-none" />
                  
                  {/* Ambient accent flare */}
                  <div 
                    className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ background: project.accentColor || '#e10600' }}
                  />

                  {/* Top Schematic Status */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>TELEMETRY VERIFIED</span>
                    </span>

                    <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-400 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center Name & Tagline */}
                  <div className="relative z-10 space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-clash font-extrabold text-white tracking-wide group-hover:text-red-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-300 leading-normal">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* BOTTOM DETAILS & TECH SPECS */}
                <div className="space-y-4 pt-1">
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center space-x-4 pt-3 border-t border-white/10 text-xs font-mono">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                        className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Chassis Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                        className="flex items-center space-x-1.5 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Telemetry</span>
                      </a>
                    )}
                    <span className="ml-auto text-[11px] text-slate-400 group-hover:text-cyan-400 transition-colors font-bold">
                      INSPECT TELEMETRY →
                    </span>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
