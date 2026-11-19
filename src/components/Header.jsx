import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, FileText, Download, Github, Linkedin } from 'lucide-react';
import { WireframeGlobe } from './AcidIcons';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick } from '../utils/audio';

export default function Header({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'PROCESS', href: '#process' },
    { label: 'MATRIX', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 select-none">
      
      {/* TOP BRUTALIST TICKER BAR (EXACT AS IMAGE HEADER) */}
      <div className="w-full bg-[#0e0f12] border-b border-[#2a2d39] text-[#8a8d98] font-mono text-[10px] tracking-widest px-3 sm:px-6 py-1.5 flex items-center justify-between">
        
        {/* Left: Role identification */}
        <div className="flex items-center space-x-2 text-[#f4f3ee]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
          <span className="uppercase font-bold tracking-[0.18em]">
            SOFTWARE DEVELOPER // FULL-STACK ARCHITECT
          </span>
        </div>

        {/* Center: Wireframe globe + Location */}
        <div className="hidden md:flex items-center space-x-2 text-[#f4f3ee]">
          <WireframeGlobe className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>BASED IN GHAZIABAD, INDIA</span>
          <span className="text-[#ccff00] font-bold">+</span>
        </div>

        {/* Right: Year & Barcode tag */}
        <div className="flex items-center space-x-3 text-[#f4f3ee]">
          <span className="font-bold tracking-widest">2026©</span>
          <span className="hidden sm:inline-block w-8 h-3.5 acid-barcode" />
          <span className="text-[#ccff00] font-bold">[ AS-DEV ]</span>
        </div>

      </div>

      {/* FLOATING MAIN NAVIGATION BAR */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0e0f12]/95 backdrop-blur-xl border-b border-[#2a2d39] py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          
          {/* BRAND LOGO / ID */}
          <a
            href="#hero"
            onClick={playTacticalClick}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-none bg-[#ccff00] text-black font-anton font-extrabold text-base flex items-center justify-center transition-transform group-hover:scale-105 shadow-[2px_2px_0px_#fff]">
              AS
            </div>
            <div>
              <span className="font-anton tracking-wider text-xl sm:text-2xl text-[#f4f3ee] group-hover:text-[#ccff00] transition-colors uppercase leading-none block">
                AYUSH SHUKLA
              </span>
              <span className="text-[9px] font-mono text-[#8a8d98] tracking-widest block uppercase">
                ACID BRUTAL DEV // B.TECH CSE
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-1 border border-[#2a2d39] bg-[#14161c]/90 p-1 rounded-none shadow-[2px_2px_0px_#ccff00]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={playTacticalClick}
                className="px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-[#eae7dd] hover:text-black hover:bg-[#ccff00] transition-all uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* RIGHT ACTIONS: RESUME MODAL & SOCIAL */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* GitHub Quick Link */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="hidden sm:flex items-center justify-center w-9 h-9 border border-[#2a2d39] bg-[#14161c] text-[#eae7dd] hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn Quick Link */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="hidden sm:flex items-center justify-center w-9 h-9 border border-[#2a2d39] bg-[#14161c] text-[#eae7dd] hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* RESUME DOSSIER BUTTON (Acid Lime brutalist button) */}
            <button
              onClick={() => { playTacticalClick(); onOpenResume(); }}
              className="px-4 py-2 bg-[#ccff00] hover:bg-white text-black font-anton text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-1.5 transition-all shadow-[3px_3px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              <span>RESUME DOSSIER ↗</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border border-[#2a2d39] bg-[#14161c] text-[#eae7dd]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0f12] border-b border-[#2a2d39] p-4 space-y-2 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { playTacticalClick(); setMobileMenuOpen(false); }}
              className="block p-2.5 text-[#eae7dd] hover:bg-[#ccff00] hover:text-black font-bold uppercase transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

    </header>
  );
}
