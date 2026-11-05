import React from 'react';
import { projectsData, personalInfo } from '../../data/portfolioData';
import { 
  Github, ExternalLink, ShieldCheck, Zap, Layers, 
  Sparkles, CheckCircle2, ArrowUpRight, Award, Cpu, Orbit 
} from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              03 // PRODUCTION SHIPMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
              Featured Projects
            </h2>
            <p className="text-sm text-slate-400 font-display max-w-xl">
              Architecting practical, scalable technology solutions across healthcare accessibility, decentralized verification, predictive analytics, and 3D WebGL experiences.
            </p>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            onClick={playTacticalClick}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-space-950 border border-slate-800 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors self-start md:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>View All GitHub Repositories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* PROJECTS SHOWCASE CARDS */}
        <div className="space-y-10">
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-space-900/60 to-space-950/90 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.8)] space-y-6"
            >
              
              {/* TOP ROW: Award Pill & Quick Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.award}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    // BUILD_ID: PRJ-0{idx + 1}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playTacticalClick}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-space-900 hover:bg-space-800 text-xs font-mono text-slate-200 border border-slate-700 hover:border-cyan-400 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playTacticalClick}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-xs font-mono text-cyan-300 border border-cyan-500/40 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Showcase</span>
                    </a>
                  )}
                </div>
              </div>

              {/* MAIN CONTENT: Name, Tagline & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-cyan-400">
                  {project.tagline}
                </p>
                <p className="text-sm sm:text-base text-slate-300 font-display leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* TECH STACK BADGES */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-space-950 border border-slate-700/80 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* TWO COLUMN GRID: Key Features & Personal Contribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3 border-t border-slate-800/80">
                
                {/* Features (7 cols) */}
                <div className="lg:col-span-7 space-y-2.5">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    Key Architectural Features
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1 shrink-0">▹</span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* My Contribution (5 cols) */}
                <div className="lg:col-span-5 p-4 rounded-2xl bg-space-950/70 border border-slate-800 space-y-2 self-start">
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-wider font-bold block flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>My Core Contribution</span>
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-display">
                    {project.contribution}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
