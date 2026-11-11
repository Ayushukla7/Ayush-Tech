import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/portfolioData';
import { ArrowUpRight, Github, ExternalLink, Trophy, Activity, ShieldCheck, Cpu, Terminal } from 'lucide-react';
import { playTacticalClick, playTelemetryBlip } from '../utils/audio';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Works({ onSelectProject }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.paddock-visual-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-white/10 racing-grid"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* MINIMAL VISUAL HEADER (20% TEXT) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-sm bg-red-500 animate-pulse" />
              <span>CHASSIS REPOSITORY // 01–04</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white uppercase tracking-tight">
              PADDOCK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-white">BUILDS</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            [ 04 VERIFIED HIGH-VELOCITY PLATFORMS ]
          </span>
        </div>

        {/* 70% VISUAL PROJECTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projectsData.map((project, idx) => (
            <div key={project.id} className="paddock-visual-card">
              <TiltCard
                onClick={() => {
                  playTacticalClick();
                  playTelemetryBlip(idx * 70);
                  onSelectProject(project);
                }}
                maxTilt={4}
                scale={1.012}
                className="group relative rounded-2xl bg-dark-900/90 border border-white/15 hover:border-red-500/70 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(225,6,0,0.25)] cursor-pointer h-full backdrop-blur-xl overflow-hidden"
                data-cursor="INSPECT"
              >
                {/* CORNER TICKS */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-red-500/80" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500/80" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-red-500/80" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-red-500/80" />

                {/* TOP CHASSIS BAR */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-red-600/20 border border-red-500/40 text-red-400 font-bold">
                    RIG 0{idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center space-x-1.5 font-bold text-[11px]">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>{project.award}</span>
                  </span>
                </div>

                {/* ======================================================== */}
                {/* 70% VISUAL HOLOGRAPHIC CHASSIS DISPLAY BOX */}
                {/* ======================================================== */}
                <div className="my-4 w-full h-56 sm:h-64 rounded-xl bg-black border border-white/10 overflow-hidden relative flex flex-col justify-between p-5 group-hover:border-red-500/50 transition-all">
                  
                  {/* Subtle telemetry wireframe background */}
                  <div className="absolute inset-0 racing-grid-dense opacity-40 pointer-events-none" />

                  {/* Ambient glowing radial flare */}
                  <div 
                    className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full blur-[50px] opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none"
                    style={{ background: project.accentColor || '#e10600' }}
                  />

                  {/* Top status bar inside visual box */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[10px]">
                    <span className="flex items-center space-x-1.5 text-cyan-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span>TELEMETRY VERIFIED</span>
                    </span>

                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:bg-red-600 group-hover:border-red-400 transition-all shadow-md">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* CENTER GRAPHICAL TELEMETRY WIDGET (PURE VISUAL PER PROJECT) */}
                  <div className="relative z-10 my-auto flex items-center justify-between">
                    {idx === 0 && (
                      /* VacciTrack: Heartbeat ECG wave visual */
                      <div className="w-full flex items-center justify-between space-x-4 font-mono">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">HEALTHCARE TELEMETRY</span>
                          <div className="text-2xl font-clash font-extrabold text-white">95% ERROR CUT</div>
                        </div>
                        <div className="w-28 h-10 flex items-center">
                          <svg className="w-full h-full text-red-500 animate-pulse" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M0 15 H30 L38 5 L46 25 L54 10 L60 18 L68 15 H100" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      /* WorkRadar: Latency & Risk Radar visual */
                      <div className="w-full flex items-center justify-between space-x-4 font-mono">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">PREDICTIVE ENGINE</span>
                          <div className="text-2xl font-clash font-extrabold text-cyan-400">-45% LATENCY</div>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                          180ms PIPELINE
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      /* SkillLedger: Cryptographic blockchain visual */
                      <div className="w-full flex items-center justify-between space-x-4 font-mono">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">CRYPTOGRAPHIC LEDGER</span>
                          <div className="text-2xl font-clash font-extrabold text-sky-400">HASH VERIFIED</div>
                        </div>
                        <div className="px-2.5 py-1 rounded bg-white/10 text-[10px] text-slate-300 border border-white/15">
                          0x7F...A26
                        </div>
                      </div>
                    )}

                    {idx === 3 && (
                      /* Portfolio: 3D Earth WebGL Telemetry visual */
                      <div className="w-full flex items-center justify-between space-x-4 font-mono">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase">WEBGL 3D EXPERIENCE</span>
                          <div className="text-2xl font-clash font-extrabold text-white">60 FPS ENGINE</div>
                        </div>
                        <div className="px-2.5 py-1 rounded bg-red-600/20 text-red-400 text-xs font-bold border border-red-500/40">
                          THREE.JS
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Title on Visual Box */}
                  <div className="relative z-10 space-y-0.5">
                    <h3 className="text-xl sm:text-2xl font-clash font-extrabold text-white uppercase tracking-wide group-hover:text-red-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-300">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* COMPACT BOTTOM: 4 TECH PILLS + 2 BUTTONS (30% TEXT) */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-xs">
                    <div className="flex items-center space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                          className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                          className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                    
                    <span className="text-[11px] text-slate-400 group-hover:text-cyan-400 transition-colors font-bold">
                      INSPECT →
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
