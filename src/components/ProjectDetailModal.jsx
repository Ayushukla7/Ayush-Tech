import React from 'react';
import { X, ExternalLink, Github, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#111216] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-slate-100 my-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{project.award}</span>
            </span>
          </div>

          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TITLE & DESCRIPTION */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white">
            {project.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cyan-400">
            {project.tagline}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed font-display pt-1">
            {project.description}
          </p>
        </div>

        {/* TECH STACK BADGES */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Technologies Used
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* KEY FEATURES */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            Key Architectural Highlights
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

        {/* MY CONTRIBUTION */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
          <span className="text-xs font-mono text-amber-300 uppercase font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>My Contribution</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {project.contribution}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-mono text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Project</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
