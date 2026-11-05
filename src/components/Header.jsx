import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick, toggleAudio, isMuted } from '../utils/audio';

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
    { label: 'Featured Work', href: '#work' },
    { label: 'Capabilities', href: '#skills' },
    { label: 'Trajectory', href: '#experience' },
    { label: 'Achievements', href: '#awards' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* BRAND LOGO & AVAILABILITY STATUS */}
        <a 
          href="#hero" 
          onClick={() => playTacticalClick()}
          className="flex items-center space-x-3 group cursor-pointer"
          data-cursor="AYUSH"
        >
          <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center font-clash font-bold text-sm text-white group-hover:border-cyan-400 group-hover:text-cyan-400 transition-all">
            AS
          </div>
          <div>
            <span className="font-clash font-bold text-base tracking-tight text-white block group-hover:text-cyan-300 transition-colors">
              AYUSH SHUKLA
            </span>
            <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Work & Innovation</span>
            </div>
          </div>
        </a>

        {/* CENTER NAVIGATION LINKS (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => playTacticalClick()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center space-x-2.5">
          {/* Audio toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-all ${
              audioActive 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]' 
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
            title={audioActive ? "Mute Sound" : "Enable Sound FX"}
            data-cursor="SFX"
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Resume button */}
          <button
            onClick={() => { playTacticalClick(); onOpenResume(); }}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-200 transition-colors"
            data-cursor="RESUME"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>RESUME</span>
          </button>

          {/* Let's Talk CTA button */}
          <a
            href="#contact"
            onClick={() => playTacticalClick()}
            className="group px-4 py-2 rounded-full bg-white text-black font-clash font-bold text-xs flex items-center space-x-1.5 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)]"
            data-cursor="TALK"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-3xl bg-dark-900/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { playTacticalClick(); setMobileMenuOpen(false); }}
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => { onOpenResume(); setMobileMenuOpen(false); }}
              className="text-xs font-mono text-amber-400 flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect Official Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
