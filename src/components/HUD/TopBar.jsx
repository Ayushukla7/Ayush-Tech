import React, { useState, useEffect } from 'react';
import { 
  Volume2, VolumeX, Terminal, Compass, 
  FileText, Github, Linkedin, Mail, ExternalLink, 
  Layers, Sparkles, Orbit
} from 'lucide-react';
import { personalInfo } from '../../data/solarData';
import { playClick, toggleAmbientSound, isMuted } from '../../utils/audio';

export default function TopBar({ 
  viewMode, 
  onToggleViewMode, 
  onOpenTerminal, 
  onOpenResume,
  selectedBody
}) {
  const [audioActive, setAudioActive] = useState(!isMuted());
  const [stardate, setStardate] = useState('');

  useEffect(() => {
    const updateStardate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const dayOfYear = Math.floor((now - new Date(year, 0, 0)) / 1000 / 60 / 60 / 24);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setStardate(`SD-${year}.${dayOfYear}:${hours}${minutes}${seconds}`);
    };
    updateStardate();
    const interval = setInterval(updateStardate, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleAmbientSound();
    setAudioActive(active);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2.5 sm:px-6 sm:py-3.5 flex items-center justify-between backdrop-blur-md bg-space-950/75 border-b border-cyan-500/20 text-xs sm:text-sm">
      {/* LEFT: Identity & Status */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <a 
          href="#nexus" 
          onClick={(e) => { e.preventDefault(); playClick(); }}
          className="group flex items-center space-x-2.5 cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-amber-500 p-[1.5px] shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center font-orbitron font-bold text-cyan-400 group-hover:scale-110 transition-transform">
              AS
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-bold tracking-wider text-slate-100 group-hover:text-cyan-400 transition-colors">
                AYUSH SHUKLA
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                SYS_VER: 2026.4
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ORBITAL TELEMETRY ONLINE</span>
              <span className="hidden lg:inline text-slate-600">|</span>
              <span className="hidden lg:inline text-cyan-300/80">{stardate}</span>
            </div>
          </div>
        </a>
      </div>

      {/* CENTER: Selected body pill (if in 3D view) */}
      {viewMode === '3d' && selectedBody && (
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-space-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_12px_rgba(0,242,254,0.2)]">
          <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>LOCKED ON:</span>
          <span className="font-bold text-amber-400 uppercase">{selectedBody.name}</span>
          <span className="text-[10px] text-slate-400">({selectedBody.techCategory})</span>
        </div>
      )}

      {/* RIGHT: View Modes & Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* View Switcher Button */}
        <button
          onClick={() => {
            playClick();
            onToggleViewMode();
          }}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-mono text-xs border transition-all ${
            viewMode === '3d'
              ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(0,242,254,0.25)]'
              : 'bg-amber-500/10 border-amber-500/50 text-amber-300 hover:bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
          }`}
          title="Switch between 3D Solar Orrery and Structured Dossier View"
        >
          {viewMode === '3d' ? (
            <>
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOSSIER VIEW</span>
              <span className="sm:hidden">DOSSIER</span>
            </>
          ) : (
            <>
              <Orbit className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">3D SOLAR ORRERY</span>
              <span className="sm:hidden">3D ORRERY</span>
            </>
          )}
        </button>

        {/* Terminal Button */}
        <button
          onClick={() => {
            playClick();
            onOpenTerminal();
          }}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-mono text-xs bg-space-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all"
          title="Open Sci-Fi Interactive Terminal (~)"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">CLI</span>
        </button>

        {/* Resume Button */}
        <button
          onClick={() => {
            playClick();
            onOpenResume();
          }}
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md font-mono text-xs bg-space-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 transition-all"
          title="View Official Resume"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>RESUME</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={handleSoundToggle}
          className={`p-1.5 rounded-md border transition-all ${
            audioActive 
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,242,254,0.3)]' 
              : 'bg-space-900 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
          title={audioActive ? "Audio Telemetry Enabled (Click to Mute)" : "Audio Muted (Click for Web Audio SFX)"}
        >
          {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* External Social Links */}
        <div className="hidden lg:flex items-center space-x-1 pl-2 border-l border-slate-800">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-space-800 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="p-1.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-space-800 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
