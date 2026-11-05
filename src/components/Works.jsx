import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/portfolioData';
import { ArrowUpRight, Github, ExternalLink, Award, Sparkles } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';
import TiltCard from './TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Works({ onSelectProject }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-card-wrapper', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold block">
              PORTFOLIO ARCHITECTURE // 01
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              SELECTED WORKS
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed">
            Production-grade web platforms, predictive analytics engines, and design systems built to solve tangible engineering challenges.
          </p>
        </div>

        {/* PROJECTS GRID WITH 3D TILT CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project, idx) => (
            <div key={project.id} className="work-card-wrapper">
              <TiltCard
                onClick={() => {
                  playTacticalClick();
                  onSelectProject(project);
                }}
                maxTilt={6}
                scale={1.015}
                className="group rounded-3xl bg-dark-900 border border-white/[0.08] hover:border-cyan-400/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)] cursor-pointer h-full"
                data-cursor="CASE"
              >
                {/* TOP ROW: Number & Award Pill */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <span className="text-xs font-mono text-slate-500 font-bold tracking-widest">
                    [ 0{idx + 1} / 04 ]
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-cyan-300 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.award}</span>
                  </span>
                </div>

                {/* CARD PREVIEW GRAPHIC BOX */}
                <div className="my-6 w-full h-60 sm:h-72 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-950 border border-white/[0.06] overflow-hidden relative flex flex-col justify-between p-6 group-hover:scale-[1.01] transition-transform duration-300">
                  {/* Subtle abstract background mesh */}
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${project.accentColor || '#00f2fe'} 0%, transparent 65%)`
                    }}
                  />

                  {/* Top Badge */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                      SYSTEM_DEPLOY // VERIFIED
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-black transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Center Title Display */}
                  <div className="relative z-10 space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-clash font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-slate-400">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* BOTTOM DETAILS */}
                <div className="space-y-4 pt-2">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light">
                    {project.description}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2 py-1 rounded-lg bg-white/[0.02] border border-white/5 text-[10px] font-mono text-slate-500">
                        +{project.techStack.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                        className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors"
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
                        className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                      </a>
                    )}
                    <span className="ml-auto text-slate-500 group-hover:text-cyan-400 transition-colors">
                      View Case Study →
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
