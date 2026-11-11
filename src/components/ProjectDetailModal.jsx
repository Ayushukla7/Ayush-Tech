import React from 'react';
import { X, ExternalLink, Github, Trophy, Sparkles, Crosshair } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-dark-900 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(225,6,0,0.25)] text-slate-100 my-auto space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CORNER BRACKETS */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500" />

        {/* TOP BAR */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded text-xs font-mono bg-red-600/20 border border-red-500/40 text-red-300 font-bold flex items-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.award}</span>
            </span>
          </div>

          <button
            onClick={() => { playTacticalClick(); onClose(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            data-cursor="CLOSE"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TITLE & DESCRIPTION */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            CHASSIS ARCHITECTURE SPECIFICATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-clash font-extrabold text-white uppercase tracking-wide">
            {project.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-red-400 font-semibold">
            {project.tagline}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono pt-1">
            {project.description}
          </p>
        </div>

        {/* TECH STACK BADGES */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            POWERTRAIN & COMPONENT STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-xs font-mono text-cyan-300 font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* KEY FEATURES */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
            KEY SYSTEM HIGHLIGHTS
          </span>
          <ul className="space-y-2 text-xs font-mono text-slate-300">
            {project.features.map((feat, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">►</span>
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* MY CONTRIBUTION */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Driver Contribution</span>
          </span>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
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
              className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Chassis GitHub</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(225,6,0,0.4)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Telemetry</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
