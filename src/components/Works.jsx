import React from 'react';
import { ArrowUpRight, Github, ExternalLink, Terminal, Layers } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { 
  IconResearch, 
  IconConcept, 
  IconDesign, 
  IconDevelop, 
  IconDeliver,
  BrutalStar 
} from './AcidIcons';
import { playTacticalClick } from '../utils/audio';

export default function Works({ onSelectProject }) {
  const processSteps = [
    {
      step: '01',
      title: 'RESEARCH',
      desc: 'Understand technical constraints, system bottlenecks, and user journey friction points.',
      icon: IconResearch
    },
    {
      step: '02',
      title: 'CONCEPT',
      desc: 'Explore algorithmic architectures, schema models, and low-latency API contracts.',
      icon: IconConcept
    },
    {
      step: '03',
      title: 'DESIGN',
      desc: 'Build atomic design systems with purposeful typography, high-contrast layouts, and micro-interactions.',
      icon: IconDesign
    },
    {
      step: '04',
      title: 'DEVELOP',
      desc: 'Engineer full-stack applications with MERN stack, optimized MongoDB aggregations, and REST APIs.',
      icon: IconDevelop
    },
    {
      step: '05',
      title: 'DELIVER',
      desc: 'Polish every detail, achieve sub-second TTFB on Vercel, and launch with measurable performance impact.',
      icon: IconDeliver
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-[#2a2d39] acid-grid select-none"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* ========================================================================= */}
        {/* 2-COLUMN BRUTALIST POSTER ROW: SELECTED PROJECTS (LEFT) & PROCESS NOTES (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 7 COLS: SELECTED PROJECTS (01, 02, 03) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SECTION HEADER */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2d39]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-none bg-[#ccff00]" />
                <h2 className="font-anton tracking-wider text-2xl sm:text-3xl uppercase text-[#eae7dd]">
                  SELECTED PROJECTS
                </h2>
              </div>
              <span className="font-mono text-xs text-[#8a8d98] uppercase">
                [ 03 VERIFIED BUILDS ]
              </span>
            </div>

            {/* PROJECT CARDS (01, 02, 03) */}
            <div className="space-y-6">
              {projectsData.map((project, idx) => {
                const projectNum = `0${idx + 1}`;
                return (
                  <div 
                    key={project.id}
                    className="group border border-[#2a2d39] bg-[#14161c] hover:border-[#ccff00] p-4 sm:p-5 transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_#ccff00]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      
                      {/* GIANT ACID LIME NUMBERS (01, 02, 03) WITH BARCODE */}
                      <div className="flex sm:flex-col items-baseline sm:items-center justify-between sm:justify-center shrink-0 sm:w-16">
                        <span className="font-bebas text-5xl sm:text-6xl text-[#ccff00] leading-none group-hover:scale-105 transition-transform">
                          {projectNum}
                        </span>
                        <div className="w-12 h-2.5 acid-barcode opacity-80 mt-1" />
                      </div>

                      {/* CENTER PROJECT MOCKUP PREVIEW BOX */}
                      <div 
                        onClick={() => { playTacticalClick(); onSelectProject(project); }}
                        className="w-full sm:w-56 h-36 rounded-none bg-[#0a0b0e] border border-[#2a2d39] group-hover:border-[#ccff00]/60 overflow-hidden relative flex flex-col justify-between p-3.5 cursor-pointer shrink-0 transition-all"
                      >
                        {/* Mock Title on dark preview */}
                        <div className="flex items-center justify-between font-mono text-[9px] text-[#8a8d98]">
                          <span className="flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 bg-[#ccff00] rounded-none animate-pulse" />
                            <span>LIVE VERIFIED</span>
                          </span>
                          <span className="text-[#ccff00] font-bold">{project.metric}</span>
                        </div>

                        {/* Center Branding name in preview */}
                        <div className="my-auto text-center space-y-0.5">
                          <span className="font-bebas text-2xl sm:text-3xl text-white group-hover:text-[#ccff00] transition-colors tracking-wide block uppercase">
                            {project.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#8a8d98] block">
                            {project.award}
                          </span>
                        </div>

                        {/* Bottom preview tech chip */}
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#eae7dd] pt-1 border-t border-white/10">
                          <span>{project.techStack[0]}</span>
                          <span className="text-[#ccff00]">INSPECT ↗</span>
                        </div>
                      </div>

                      {/* RIGHT INFO & DIRECT EXTERNAL LINKS */}
                      <div className="flex-1 space-y-2.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-anton text-xl sm:text-2xl text-[#f4f3ee] group-hover:text-[#ccff00] transition-colors uppercase tracking-wide">
                              {project.name}
                            </h3>
                            
                            {/* Top Right Direct Live Launch Icon */}
                            <a
                              href={project.liveUrl || project.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                              className="w-7 h-7 border border-[#2a2d39] bg-[#191b22] hover:bg-[#ccff00] hover:text-black text-[#f4f3ee] flex items-center justify-center transition-all"
                              title="Open Live Website"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>

                          <p className="text-xs font-mono text-[#8a8d98] uppercase tracking-wider pt-0.5">
                            {project.tagline}
                          </p>

                          <p className="text-xs font-sans text-[#cfd2dc] leading-relaxed line-clamp-2 pt-1">
                            {project.description}
                          </p>
                        </div>

                        {/* TECH PILLS & DIRECT BUTTONS */}
                        <div className="space-y-2 pt-1 border-t border-[#2a2d39]">
                          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                            {project.techStack.slice(0, 4).map((tech, i) => (
                              <span 
                                key={i}
                                className="px-2 py-0.5 bg-[#0e0f12] border border-[#2a2d39] text-[#cfd2dc]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center space-x-3 pt-1 font-mono text-xs">
                            <a
                              href={project.liveUrl || project.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                              className="px-3 py-1 bg-[#ccff00] hover:bg-white text-black font-bold uppercase flex items-center space-x-1 transition-all"
                            >
                              <span>LIVE DEMO ↗</span>
                            </a>

                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => { e.stopPropagation(); playTacticalClick(); }}
                              className="px-3 py-1 border border-[#2a2d39] bg-[#0e0f12] text-[#eae7dd] hover:text-black hover:bg-[#ccff00] font-bold uppercase flex items-center space-x-1 transition-all"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>CODE</span>
                            </a>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* VIEW FULL ARCHIVE FOOTER */}
            <div className="pt-2">
              <a
                href="https://github.com/Ayushukla7"
                target="_blank"
                rel="noreferrer"
                onClick={playTacticalClick}
                className="font-mono text-xs font-bold uppercase text-[#eae7dd] hover:text-[#ccff00] flex items-center space-x-1.5 transition-colors group cursor-pointer"
              >
                <span>VIEW FULL PROJECT ARCHIVE ON GITHUB</span>
                <ArrowUpRight className="w-4 h-4 text-[#ccff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

          {/* RIGHT 5 COLS: PROCESS NOTES (EXACT AS IMAGE) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* SECTION HEADER */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2d39]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-none bg-[#ccff00]" />
                <h2 className="font-anton tracking-wider text-2xl sm:text-3xl uppercase text-[#ccff00]">
                  PROCESS NOTES
                </h2>
              </div>
              <BrutalStar className="w-4 h-4 text-[#ccff00]" />
            </div>

            {/* 5 GEOMETRIC PROCESS STEPS */}
            <div className="border border-[#2a2d39] bg-[#14161c] p-6 space-y-6">
              {processSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.title}
                    className="flex items-start space-x-4 pb-5 border-b border-[#2a2d39] last:border-b-0 last:pb-0 group"
                  >
                    {/* Outline Wireframe Geometric Icon */}
                    <div className="p-2 border border-[#2a2d39] bg-[#0e0f12] text-[#ccff00] group-hover:border-[#ccff00] transition-colors shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-anton tracking-wider text-lg sm:text-xl text-[#f4f3ee] group-hover:text-[#ccff00] transition-colors uppercase">
                          {step.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#8a8d98]">
                          [{step.step}]
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#a5a9b8] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PROCESS BANNER BADGE */}
            <div className="p-4 border border-[#2a2d39] bg-[#0e0f12] flex items-center justify-between font-mono text-xs">
              <span className="text-[#cfd2dc]">METHODOLOGY // AGILE ARCHITECTURE</span>
              <span className="text-[#ccff00] font-bold">100% RELIABLE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
