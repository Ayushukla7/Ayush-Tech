import React from 'react';
import { 
  personalInfo 
} from '../../data/portfolioData';
import { 
  ArrowRight, Download, Mail, Github, Linkedin, 
  Code2, Zap, TrendingUp, Trophy, Users, Gauge, 
  ShieldCheck, Terminal, MapPin, Sparkles, Orbit
} from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

export default function HeroSection({ onOpenResume, onExploreProjects, onContactClick }) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        
        {/* TOP HUD TELEMETRY BADGE */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="font-semibold tracking-wider uppercase">SATELLITE ORBITAL IDENTIFIER: AS-2026</span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR: {personalInfo.coordinates.city} [{personalInfo.coordinates.lat}, {personalInfo.coordinates.lng}]</span>
          </div>
        </div>

        {/* HERO MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT 7 COLS: Name, Title, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 font-bold block">
                FULL-STACK SOFTWARE ENGINEER // CSE @ ABESEC
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-extrabold tracking-tight text-white leading-[1.08]">
                AYUSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400">SHUKLA</span>
              </h1>
              <p className="text-base sm:text-xl font-mono text-cyan-300/90 font-medium">
                {personalInfo.title}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-display leading-relaxed max-w-2xl font-light">
              "{personalInfo.tagline}"
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { playTacticalClick(); onExploreProjects(); }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs tracking-wider flex items-center space-x-2 shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { playTacticalClick(); onOpenResume(); }}
                className="px-4 py-3 rounded-xl bg-space-950/80 hover:bg-space-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-300 font-mono text-xs flex items-center space-x-2 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>DOWNLOAD RESUME</span>
              </button>

              <button
                onClick={() => { playTacticalClick(); onContactClick(); }}
                className="px-4 py-3 rounded-xl bg-space-950/80 hover:bg-space-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-xs flex items-center space-x-2 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>CONTACT ME</span>
              </button>
            </div>

            {/* VERIFIED SOCIAL HANDLES */}
            <div className="flex items-center space-x-4 pt-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">UPLINKS:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={playTacticalClick}
                className="flex items-center space-x-1.5 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playTacticalClick}
                className="flex items-center space-x-1.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* RIGHT 5 COLS: High-Tech Biometric Avatar & Verification Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-space-900/90 to-space-950/95 border border-cyan-500/30 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] space-y-5">
              
              {/* Scanline top radar bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="text-cyan-400 flex items-center space-x-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>BIOMETRIC ID: AS-9369</span>
                </span>
                <span className="text-emerald-400 font-bold">VERIFIED STATUS</span>
              </div>

              {/* Profile Avatar Frame with animated radar ring */}
              <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-[0_0_30px_rgba(0,242,254,0.3)]">
                <div className="w-full h-full rounded-2xl bg-space-950 flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
                  
                  {/* Subtle animated scanline */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-70 top-2" />
                  
                  {/* Futuristic Monogram / Avatar Graphic */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-900 to-space-900 border border-cyan-500/40 flex items-center justify-center shadow-inner">
                    <span className="font-orbitron font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 to-amber-300">
                      AS
                    </span>
                  </div>

                  <span className="font-orbitron font-bold text-xs text-white mt-2.5">
                    Ayush Shukla
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Full-Stack Engineer
                  </span>
                </div>
              </div>

              {/* Verified Credentials Pills */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">INSTITUTION</span>
                  <span className="text-cyan-300 font-bold">ABES Engineering College</span>
                </div>
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">ACADEMICS</span>
                  <span className="text-amber-300 font-bold">B.Tech CSE (CGPA: 8.00)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-space-950 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">ACHIEVEMENT</span>
                  <span className="text-emerald-400 font-bold">National Hackathon Podiums</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* TELEMETRY STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-slate-800/80">
          {personalInfo.stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-4 rounded-2xl bg-space-900/40 border border-slate-800/80 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl font-orbitron font-bold text-cyan-300">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
