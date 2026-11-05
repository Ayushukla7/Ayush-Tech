import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, ExternalLink, Github, 
  Terminal, ShieldCheck, Zap, Activity, Cpu, Award, 
  Users, CheckCircle2, ArrowUpRight, Copy, Check
} from 'lucide-react';
import { celestialBodies, personalInfo } from '../../data/solarData';
import { playClick, playSelect } from '../../utils/audio';

export default function PlanetDetailDrawer({
  selectedBodyId,
  onClose,
  onSelectBody,
  onOpenTerminal
}) {
  const [activeTab, setActiveTab] = useState('data'); // 'data', 'overview', 'raw'
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!selectedBodyId) return null;

  const currentIndex = celestialBodies.findIndex(b => b.id === selectedBodyId);
  const currentBody = celestialBodies[currentIndex];
  if (!currentBody) return null;

  const handlePrev = () => {
    playSelect();
    const prevIndex = (currentIndex - 1 + celestialBodies.length) % celestialBodies.length;
    onSelectBody(celestialBodies[prevIndex].id);
  };

  const handleNext = () => {
    playSelect();
    const nextIndex = (currentIndex + 1) % celestialBodies.length;
    onSelectBody(celestialBodies[nextIndex].id);
  };

  const copyEmail = () => {
    playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[600px] flex flex-col bg-space-950/95 backdrop-blur-2xl border-l border-cyan-500/30 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] text-slate-100 transition-all duration-300">
      
      {/* DRAWER TOP BAR */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-space-900/40">
        <div className="flex items-center space-x-2.5">
          <div 
            className="w-3.5 h-3.5 rounded-full"
            style={{
              backgroundColor: currentBody.color,
              boxShadow: `0 0 10px ${currentBody.color}`
            }}
          />
          <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
            SECTOR: {currentBody.role}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Previous / Next orbital navigators */}
          <button
            onClick={handlePrev}
            className="p-1 rounded bg-space-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Previous Orbit"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded bg-space-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Next Orbit"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Close button */}
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-1 rounded bg-space-900 border border-slate-700 hover:border-red-400 text-slate-400 hover:text-red-400 transition-colors ml-1"
            title="Close Drawer (Return to Orbit)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="p-5 sm:p-6 border-b border-slate-800/80 bg-gradient-to-b from-space-900/30 to-transparent">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              {currentBody.techCategory}
            </span>
            <h2 className="text-xl sm:text-2xl font-orbitron font-bold text-white mt-0.5">
              {currentBody.name}
            </h2>
          </div>
          <span 
            className="px-2.5 py-1 rounded-full text-[11px] font-mono border"
            style={{
              borderColor: `${currentBody.color}66`,
              backgroundColor: `${currentBody.color}15`,
              color: currentBody.glowColor || currentBody.color
            }}
          >
            ORBIT_LOCK
          </span>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-300 font-display leading-relaxed">
          {currentBody.tagline}
        </p>

        {/* TAB BUTTONS */}
        <div className="mt-4 flex items-center space-x-2 border-b border-slate-800">
          <button
            onClick={() => { playClick(); setActiveTab('data'); }}
            className={`pb-2 px-3 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'data'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ENGINEERING_DATA
          </button>
          <button
            onClick={() => { playClick(); setActiveTab('overview'); }}
            className={`pb-2 px-3 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ORBIT_SPECS
          </button>
          <button
            onClick={() => { playClick(); setActiveTab('raw'); }}
            className={`pb-2 px-3 text-xs font-mono border-b-2 transition-all ${
              activeTab === 'raw'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SYS_LOG
          </button>
        </div>
      </div>

      {/* CONTENT SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

        {/* 1. ENGINEERING DATA TAB (Contextual per body) */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            
            {/* SUN: Personal Profile & Stats */}
            {currentBody.id === 'sun' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-space-900/60 border border-amber-500/30">
                  <h4 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                    Computational Nexus
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {personalInfo.tagline}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    <div className="p-2 rounded bg-space-950/60 border border-slate-800">
                      <span className="text-slate-500 block">EDUCATION</span>
                      <span className="text-amber-300 font-bold">ABES Engineering College</span>
                      <span className="text-[10px] text-slate-400 block">B.Tech CSE (CGPA: 8.00)</span>
                    </div>
                    <div className="p-2 rounded bg-space-950/60 border border-slate-800">
                      <span className="text-slate-500 block">COHORT</span>
                      <span className="text-cyan-300 font-bold">2024 – 2028</span>
                      <span className="text-[10px] text-slate-400 block">Lucknow / Ghaziabad</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {personalInfo.stats.map((stat, i) => (
                    <div key={i} className="p-3 rounded-lg bg-space-900/40 border border-slate-800">
                      <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">
                        {stat.value}
                      </div>
                      <div className="text-xs font-medium text-slate-200 mt-0.5">
                        {stat.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {stat.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MERCURY & JUPITER & VENUS: Skills array */}
            {currentBody.skills && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Verified Technical Matrix
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentBody.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-space-900/50 border border-slate-800/90 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-100 text-sm">
                          {skill.name}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {skill.badge}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-space-800 text-slate-300">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400 leading-normal">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EARTH: Production Projects */}
            {currentBody.projects && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Flagship Software Deployments
                </h4>
                {currentBody.projects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="p-4 rounded-xl bg-space-900/60 border border-slate-800 hover:border-cyan-400/50 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-bold text-base text-slate-100 font-display">
                          {proj.title}
                        </h5>
                        <p className="text-xs text-slate-300 mt-1">
                          {proj.summary}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-space-950 border border-slate-700 text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {proj.points.map((pt, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-cyan-400 mt-0.5">▹</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Links */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono bg-space-800 hover:bg-slate-700 text-slate-200 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={playClick}
                          className="flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MARS: Delay Risk Engine Deep Dive */}
            {currentBody.id === 'mars' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-space-900/60 border border-red-500/30">
                  <h4 className="text-xs font-mono uppercase text-red-400 tracking-wider">
                    Predictive Algorithm Engine
                  </h4>
                  <div className="mt-3 p-3 rounded bg-space-950 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                    <code>RiskScore = (0.35 * Blockers) + (0.25 * VelocityDelta) + (0.20 * WorkloadRatio) + (0.20 * ReviewLag)</code>
                  </div>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    Processes 6+ continuous metrics across development cycles, anticipating critical project bottlenecks 7 days prior to deadline with 88% verified accuracy.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-space-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">LATENCY PROFILE (1,000+ TASKS)</span>
                    <span className="text-emerald-400 font-bold">-45% FASTER</span>
                  </div>
                  <div className="w-full bg-space-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                    <div className="bg-red-500/70 h-full w-[43%]" title="Optimized: 180ms" />
                    <div className="bg-slate-700 h-full w-[57%]" title="Baseline: 420ms" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Optimized: 180ms</span>
                    <span>Legacy: 420ms</span>
                  </div>
                </div>
              </div>
            )}

            {/* ASTEROID BELT: DSA Topics */}
            {currentBody.topics && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  250+ Algorithmic Problems Solved
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentBody.topics.map((top, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-space-900/50 border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-200 text-sm">
                          {top.name}
                        </span>
                        <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {top.problems}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {top.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SATURN: Hackathon Awards */}
            {currentBody.awards && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Hackathon Rings & Podiums
                </h4>
                {currentBody.awards.map((award, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-space-900/50 border border-amber-500/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {award.badge}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-100 font-display">
                      {award.title}
                    </h5>
                    <div className="text-xs text-amber-400 font-mono">
                      {award.track}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">
                      {award.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* URANUS: Experiences */}
            {currentBody.experiences && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Community Leadership & Growth
                </h4>
                {currentBody.experiences.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-space-900/50 border border-cyan-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-100 font-display">
                        {exp.role}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-cyan-300">
                      {exp.organization} • {exp.location}
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300 pt-1">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-cyan-400 mt-0.5">▹</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* NEPTUNE: Mission Control & Contact Uplink */}
            {currentBody.id === 'neptune' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-space-900/60 border border-blue-500/30 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-blue-400 tracking-wider">
                    Transmission Channels
                  </h4>
                  
                  {/* Email row with one-click copy */}
                  <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">PRIMARY INBOX</span>
                      <span className="font-mono text-xs text-slate-200">{personalInfo.email}</span>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="px-2.5 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-mono flex items-center space-x-1 transition-colors"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Phone row */}
                  <div className="p-3 rounded-lg bg-space-950/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">DIRECT CARRIER</span>
                      <span className="font-mono text-xs text-slate-200">{personalInfo.phone}</span>
                    </div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      onClick={playClick}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                    >
                      Call
                    </a>
                  </div>

                  {/* External handles */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="p-2.5 rounded-lg bg-space-950 border border-slate-800 hover:border-cyan-400 flex items-center justify-between text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                    >
                      <span>GitHub: {personalInfo.githubUsername}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="p-2.5 rounded-lg bg-space-950 border border-slate-800 hover:border-cyan-400 flex items-center justify-between text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors"
                    >
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Direct email quick action */}
                <a
                  href={`mailto:${personalInfo.email}?subject=Initiating%20Contact%20with%20Ayush%20Shukla`}
                  onClick={playClick}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:brightness-110 transition-all"
                >
                  <span>LAUNCH SECURE TRANSMISSION</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* SECTIONS / NOTES */}
            {currentBody.sections && (
              <div className="space-y-3 pt-2">
                {currentBody.sections.map((sec, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-space-900/40 border border-slate-800">
                    <h5 className="text-xs font-mono text-cyan-300 font-bold uppercase">
                      {sec.title}
                    </h5>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. ORBIT SPECS TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Celestial Orbital Parameters
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs font-mono">
              {currentBody.specs && Object.entries(currentBody.specs).map(([key, value]) => (
                <div key={key} className="p-3 rounded-lg bg-space-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400 uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-cyan-300 font-bold">{value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-space-900/40 border border-slate-800 space-y-2 text-xs text-slate-300">
              <h5 className="font-mono text-amber-300 uppercase font-bold">Orbital Mechanics</h5>
              <p>
                Orbit Radius: <span className="text-cyan-400 font-mono">{currentBody.orbitRadius} AU</span>
              </p>
              <p>
                Angular Velocity: <span className="text-cyan-400 font-mono">{currentBody.orbitSpeed || 0} rad/s</span>
              </p>
              <p>
                Visual Spectrum: <span className="text-cyan-400 font-mono">{currentBody.color}</span>
              </p>
            </div>
          </div>
        )}

        {/* 3. RAW SYSTEM LOG TAB */}
        {activeTab === 'raw' && (
          <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
            <pre className="text-[11px] leading-relaxed">
              {JSON.stringify(currentBody, null, 2)}
            </pre>
          </div>
        )}

      </div>

      {/* DRAWER FOOTER */}
      <div className="p-3.5 sm:p-4 border-t border-slate-800 flex items-center justify-between bg-space-900/60 text-xs font-mono">
        <button
          onClick={() => {
            playClick();
            onOpenTerminal();
          }}
          className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>QUERY VIA TERMINAL</span>
        </button>

        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="px-3 py-1.5 rounded bg-space-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          DISENGAGE
        </button>
      </div>

    </div>
  );
}
