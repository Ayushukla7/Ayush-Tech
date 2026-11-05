import React, { useState, useEffect } from 'react';
import { 
  Orbit, Volume2, VolumeX, FileText, Menu, X, 
  Github, Linkedin, Compass, ArrowUpRight 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick, toggleAudio, isMuted } from '../utils/audio';

export default function Navbar({ 
  onOpenResume, 
  isInOrbitMode, 
  onToggleOrbitMode,
  onReplayIntro 
}) {
  const [activeSection, setActiveSection] = useState('home');
  const [audioActive, setAudioActive] = useState(!isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleAudio();
    setAudioActive(active);
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id) => {
    playTacticalClick();
    if (isInOrbitMode) {
      onToggleOrbitMode();
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* LEFT: Branding & Telemetry */}
        <div className="flex items-center space-x-3">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-space-950/85 backdrop-blur-md border border-cyan-500/25 shadow-[0_0_20px_rgba(0,0,0,0.6)] group hover:border-cyan-400 transition-all"
          >
            <div className="relative w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full rounded-lg bg-space-950 flex items-center justify-center font-orbitron font-bold text-xs text-cyan-400 group-hover:scale-105 transition-transform">
                AS
              </div>
            </div>
            <div className="font-orbitron font-bold text-xs tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
              AYUSH <span className="text-cyan-400">SHUKLA</span>
            </div>
          </a>

          {/* Coordinate Pill */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-space-950/75 border border-slate-800 backdrop-blur-md font-mono text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SAT_LOC: {personalInfo.coordinates.lat}, {personalInfo.coordinates.lng}</span>
          </div>
        </div>

        {/* CENTER: Floating Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-2xl bg-space-950/85 backdrop-blur-md border border-cyan-500/25 shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-xs font-mono">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id && !isInOrbitMode;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_10px_rgba(0,242,254,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-space-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Actions (Orbit Toggle, Resume, Sound, Mobile Menu) */}
        <div className="flex items-center space-x-2">
          
          {/* Orbit View Toggle */}
          <button
            onClick={() => {
              playTacticalClick();
              onToggleOrbitMode();
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono border backdrop-blur-md transition-all ${
              isInOrbitMode
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'bg-space-950/85 border-slate-700 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
            }`}
            title={isInOrbitMode ? "Exit 3D Orbit View" : "Explore Full 3D Satellite Earth"}
          >
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">{isInOrbitMode ? 'EXIT ORBIT' : 'EARTH ORBIT'}</span>
          </button>

          {/* Official Resume Modal Button */}
          <button
            onClick={() => {
              playTacticalClick();
              onOpenResume();
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-space-950/85 hover:bg-space-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-300 text-xs font-mono backdrop-blur-md transition-all"
            title="Open Printable Resume Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">RESUME</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
              audioActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,242,254,0.3)]'
                : 'bg-space-950/85 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={audioActive ? "Mute Web Audio SFX" : "Enable Web Audio SFX"}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-space-950/85 border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-space-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-2xl flex flex-col space-y-2 pointer-events-auto">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="px-4 py-2.5 rounded-xl text-left font-mono text-xs text-slate-300 hover:text-cyan-300 hover:bg-space-900 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onToggleOrbitMode();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-cyan-400 flex items-center space-x-1"
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>Toggle Earth Orbit</span>
            </button>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-amber-400 flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
