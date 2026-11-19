import React from 'react';
import { WireframeGlobe } from './AcidIcons';
import { playTacticalClick } from '../utils/audio';

export default function Header({ onOpenResume }) {
  const navLinks = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'PROCESS', href: '#process' },
    { label: 'MATRIX', href: '#skills' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 select-none bg-[#0e0f12]/95 backdrop-blur-md border-b border-[#2a2d39]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between font-mono text-[10px] tracking-widest">
        
        {/* LEFT: DIGITAL DESIGNER / VISUAL STRATEGIST (EXACT AS POSTER) */}
        <div className="flex items-center space-x-2 text-[#eae7dd]">
          <div className="flex flex-col leading-tight">
            <span className="font-bold uppercase tracking-wider text-[#ccff00]">
              DIGITAL DESIGNER
            </span>
            <span className="text-[#8a8d98] uppercase tracking-wider">
              VISUAL STRATEGIST // AYUSH SHUKLA
            </span>
          </div>
          <WireframeGlobe className="w-4 h-4 text-[#ccff00] ml-1.5 shrink-0" />
        </div>

        {/* CENTER: BASED IN WORLDWIDE / INDIA (EXACT AS POSTER) */}
        <div className="hidden md:flex flex-col items-center leading-tight text-[#eae7dd]">
          <span className="text-[#8a8d98] uppercase">BASED IN</span>
          <span className="font-bold flex items-center space-x-1 uppercase text-[#ccff00]">
            <span>GHAZIABAD, INDIA</span>
            <span className="text-white">+</span>
          </span>
        </div>

        {/* RIGHT: NAVIGATION, RESUME & 2026© BARCODE (EXACT AS POSTER) */}
        <div className="flex items-center space-x-3 text-[#eae7dd]">
          {/* Subtle nav links */}
          <nav className="hidden lg:flex items-center space-x-3 text-[#8a8d98] font-bold">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={playTacticalClick}
                className="hover:text-[#ccff00] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick Resume Button */}
          <button
            onClick={() => { playTacticalClick(); onOpenResume(); }}
            className="px-2.5 py-1 bg-[#ccff00] hover:bg-white text-black font-anton text-xs uppercase transition-all shadow-[2px_2px_0px_#fff]"
          >
            RESUME [PDF] ↗
          </button>

          {/* Year & Barcode */}
          <span className="font-bold tracking-widest hidden sm:inline">2026©</span>
          <span className="w-8 h-3.5 acid-barcode opacity-80 hidden sm:inline-block" />
        </div>

      </div>
    </header>
  );
}
