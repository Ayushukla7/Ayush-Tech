import React, { useState, useEffect } from 'react';
import { FileText, Volume2, VolumeX, Menu, X, Radio, Gauge } from 'lucide-react';
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
    { label: 'BUILDS', href: '#work' },
    { label: 'STACK', href: '#skills' },
    { label: 'STRATEGY', href: '#experience' },
    { label: 'HONORS', href: '#awards' },
    { label: 'DOSSIER', href: '#about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-dark-950/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.85)]' 
          : 'py-4 bg-dark-950/50 backdrop-blur-md border-b border-white/[0.04]'
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
            <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:bg-red-600 group-hover:border-red-400 transition-all shadow-[0_0_15px_rgba(225,6,0,0.25)]">
              AS
            </div>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-clash font-extrabold text-sm sm:text-base tracking-wider uppercase text-white group-hover:text-red-400 transition-colors">
                AYUSH SHUKLA
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-white/[0.06] border border-white/10 text-slate-300 font-semibold tracking-wider">
                CHASSIS AS-26
              </span>
            </div>
            
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-slate-300 font-medium">PITWALL ONLINE</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">TELEMETRY OPTIMAL</span>
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
              className="px-3.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-[0.12em] text-slate-300 hover:text-white hover:bg-white/10 transition-all"
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
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-red-600/20 border border-white/10 hover:border-red-500/40 text-[10px] font-mono text-slate-300 hover:text-red-400 tracking-wider transition-all group"
            title="Fire Up V6 Turbo Hybrid Throttle"
            data-cursor="REV"
          >
            <Gauge className="w-3.5 h-3.5 text-red-500 group-hover:rotate-45 transition-transform" />
            <span className="font-semibold">REV V6</span>
          </button>

          {/* RADIO COMMS AUDIO TOGGLE */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-lg border transition-all ${
              audioActive 
                ? 'bg-red-600/15 border-red-500/40 text-red-400 shadow-[0_0_12px_rgba(225,6,0,0.2)]' 
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
            title={audioActive ? "Mute Audio" : "Enable Audio"}
            data-cursor="AUDIO"
          >
            {audioActive ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* OFFICIAL RESUME DOSSIER BUTTON */}
          <button
            onClick={() => { playTacticalClick(); onOpenResume(); }}
            className="px-3.5 py-1.5 rounded-lg bg-white text-black font-clash font-bold text-xs tracking-wider uppercase flex items-center space-x-1.5 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-red-600 hover:text-white hover:shadow-[0_0_25px_rgba(225,6,0,0.5)] transition-all"
            data-cursor="DOSSIER"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESUME</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/95 border-b border-white/10 px-4 py-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { playTacticalClick(); setMobileMenuOpen(false); }}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
