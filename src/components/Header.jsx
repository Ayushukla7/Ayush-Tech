import React, { useState, useEffect } from 'react';
import { FileText, Volume2, VolumeX, Menu, X, Radio, Gauge, Zap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick, playRadioBeep, toggleAudio, isMuted, playEngineRev } from '../utils/audio';

export default function Header({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(!isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleAudio();
    setAudioActive(active);
  };

  const navLinks = [
    { label: 'PADDOCK BUILDS', href: '#work', sub: 'Featured Projects' },
    { label: 'POWERTRAIN MATRIX', href: '#skills', sub: 'Technical Stack' },
    { label: 'RACE STRATEGY', href: '#experience', sub: 'Leadership' },
    { label: 'PODIUM HONORS', href: '#awards', sub: 'Achievements' },
    { label: 'DRIVER DOSSIER', href: '#about', sub: 'About Me' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-2.5 bg-dark-950/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.85)]' 
          : 'py-4 bg-dark-950/40 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* BRAND & CHASSIS TELEMETRY ID */}
        <a 
          href="#hero" 
          onClick={() => { playTacticalClick(); }}
          className="flex items-center space-x-3 group cursor-pointer"
          data-cursor="TELEMETRY"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/60 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:bg-red-600 group-hover:text-black group-hover:border-red-400 transition-all shadow-[0_0_15px_rgba(225,6,0,0.3)]">
              AS
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-clash font-extrabold text-sm sm:text-base tracking-wider uppercase text-white group-hover:text-cyan-400 transition-colors">
                AYUSH SHUKLA
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-red-500/10 border border-red-500/30 text-red-400 font-semibold tracking-wider">
                CHASSIS AS-26
              </span>
            </div>
            
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">PITWALL ONLINE</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">SECTOR 1 OPTIMAL</span>
            </div>
          </div>
        </a>

        {/* CENTER NAVIGATION LINKS (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => playTacticalClick()}
              className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              data-cursor="NAV"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT TELEMETRY CONTROLS & RESUME DOSSIER */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* THROTTLE / ENGINE REV BUTTON */}
          <button
            onClick={() => { playEngineRev(); }}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-red-600/15 hover:bg-red-600/30 border border-red-500/40 text-[10px] font-mono text-red-300 tracking-wider transition-all group"
            title="Fire Up V6 Turbo Hybrid Throttle"
            data-cursor="REV"
          >
            <Gauge className="w-3.5 h-3.5 text-red-400 group-hover:rotate-45 transition-transform" />
            <span className="font-bold">REV V6</span>
          </button>

          {/* RADIO COMMS AUDIO TOGGLE */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-lg border transition-all ${
              audioActive 
                ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
            title={audioActive ? "Mute Radio Audio" : "Enable Radio SFX"}
            data-cursor="AUDIO"
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* OFFICIAL RESUME DOSSIER BUTTON */}
          <button
            onClick={() => { playTacticalClick(); onOpenResume(); }}
            className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono text-slate-100 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-cyan-400/60"
            data-cursor="DOSSIER"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold tracking-wider">DOSSIER</span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
            data-cursor="MENU"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-dark-950/95 backdrop-blur-2xl px-4 py-5 space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  playTacticalClick();
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-200 hover:bg-red-600/10 hover:border-red-500/40"
              >
                <div>
                  <div className="font-bold text-white tracking-wider">{link.label}</div>
                  <div className="text-[10px] text-slate-400">{link.sub}</div>
                </div>
                <span className="text-red-400 font-bold">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/[0.06]">
            <button
              onClick={() => { playEngineRev(); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-lg bg-red-600/20 border border-red-500/40 text-xs font-mono text-red-300 font-bold flex items-center justify-center space-x-1.5"
            >
              <Gauge className="w-4 h-4" />
              <span>REV V6 TURBO</span>
            </button>
            <button
              onClick={() => { onOpenResume(); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-lg bg-white/10 border border-white/20 text-xs font-mono text-white font-bold flex items-center justify-center space-x-1.5"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>FULL RESUME</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
