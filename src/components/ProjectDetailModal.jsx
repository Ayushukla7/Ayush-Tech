import React from 'react';
import { X, ExternalLink, Github, Trophy, Sparkles } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-acid-charcoal border-2 border-acid-lime/40 text-acid-paper p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00] my-auto space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CORNER BRUTALIST ACCENTS */}
        <div className="absolute top-0 right-0 bg-acid-lime text-black font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
          PROJECT DOSSIER
        </div>

        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b border-acid-paper/20 pb-4 pt-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-xs font-mono bg-acid-lime/10 border border-acid-lime text-acid-lime font-bold flex items-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5 text-acid-lime" />
              <span>{project.award}</span>
            </span>
          </div>

          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="p-1.5 text-acid-paper/60 hover:text-black hover:bg-acid-lime border border-acid-paper/30 hover:border-acid-lime transition-all"
            data-cursor="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TITLE & DESCRIPTION */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-acid-lime uppercase tracking-widest block font-bold">
            ↳ SYSTEM SPECIFICATION // {project.id?.toUpperCase()}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bebas font-black text-white uppercase tracking-wider">
            {project.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-acid-lime font-semibold">
            {project.tagline}
          </p>
          <p className="text-xs sm:text-sm text-acid-paper/80 leading-relaxed font-mono pt-1">
            {project.description}
          </p>
        </div>

        {/* TECH STACK BADGES */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-acid-paper/60 uppercase tracking-wider block font-bold">
            TECHNOLOGY STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-black/60 border border-acid-paper/20 text-xs font-mono text-acid-paper font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* KEY HIGHLIGHTS */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-acid-paper/60 uppercase tracking-wider block font-bold">
            CORE CAPABILITIES & HIGHLIGHTS
          </span>
          <ul className="space-y-2 text-xs font-mono text-acid-paper/90">
            {project.features.map((feat, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-acid-lime font-bold shrink-0 mt-0.5">►</span>
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTRIBUTION */}
        <div className="p-4 bg-acid-card border border-acid-paper/20 space-y-1.5">
          <span className="text-[10px] font-mono text-acid-lime uppercase font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-acid-lime" />
            <span>Developer Contribution</span>
          </span>
          <p className="text-xs text-acid-paper/80 font-mono leading-relaxed">
            {project.contribution}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-acid-paper/20">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTacticalClick}
              className="flex-1 py-3 bg-black hover:bg-acid-paper/10 border-2 border-acid-paper/40 text-acid-paper font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all hover:border-acid-paper"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo ↗</span>
            </a>
          )}
          {(project.liveUrl || project.live) && (
            <a
              href={project.liveUrl || project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playTacticalClick}
              className="flex-1 py-3 bg-acid-lime hover:bg-[#b8e600] text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[4px_4px_0px_#ffffff]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Site ↗</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
