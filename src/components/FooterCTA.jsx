import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { WireframeGlobe } from './AcidIcons';
import { playTacticalClick } from '../utils/audio';

export default function FooterCTA({ onOpenResume }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    playTacticalClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playTacticalClick();
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 px-3 sm:px-6 lg:px-8 bg-[#0e0f12] border-t border-[#2a2d39] acid-grid select-none">
      
      {/* AMBIENT UNDERGLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[25rem] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* ========================================================================= */}
        {/* GIANT EDITORIAL HEADLINE: "LET'S CREATE SOMETHING REAL. ↗" */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#ccff00] font-bold">
            <span className="w-2 h-2 bg-[#ccff00]" />
            <span className="uppercase tracking-[0.2em]">DIRECT DISPATCH // CHANNEL 2026</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-0 leading-none">
              <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight text-[#eae7dd] uppercase leading-[0.80] distressed-title">
                LET'S CREATE
              </h2>
              <div className="flex items-baseline space-x-3">
                <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight text-[#ccff00] uppercase leading-[0.80] distressed-title">
                  SOMETHING REAL.
                </h2>
                <ArrowUpRight className="w-12 h-12 sm:w-20 sm:h-20 text-[#ccff00] shrink-0" />
              </div>
            </div>

            {/* SOLID ACID LIME BUTTON: WORK TOGETHER (WITH HAZARD TAPE BOTTOM) */}
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={playTacticalClick}
              className="group block border-2 border-black bg-[#ccff00] text-black w-full sm:w-56 overflow-hidden shadow-[6px_6px_0px_#fff] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <div className="p-4 flex flex-col justify-between h-36">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-black">
                    START PROJECT
                  </span>
                  <div className="w-8 h-8 bg-black text-[#ccff00] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <span className="font-anton text-3xl uppercase tracking-wider text-black leading-none">
                  WORK TOGETHER
                </span>
              </div>

              {/* HAZARD STRIPES FOOTER ON BUTTON (AS IN IMAGE) */}
              <div className="h-3.5 acid-hazard w-full border-t border-black" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LOWER 2-COLUMN: CONTACT INFO (LEFT) & DIRECT QUICK MESSAGE (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#2a2d39] pt-10">
          
          {/* LEFT 6 COLS: CONTACT & SOCIAL HANDLES */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#8a8d98] uppercase tracking-widest block font-bold">
                CONTACT DIRECTORY
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-anton text-2xl sm:text-3xl lg:text-4xl text-[#eae7dd] hover:text-[#ccff00] transition-colors block break-all tracking-wide uppercase"
              >
                {personalInfo.email}
              </a>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 border border-[#2a2d39] bg-[#14161c] hover:bg-[#ccff00] hover:text-black font-mono text-xs text-[#eae7dd] flex items-center space-x-1.5 transition-all"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#ccff00]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
                </button>
                <span className="font-mono text-xs text-[#8a8d98]">
                  • {personalInfo.phone}
                </span>
              </div>
            </div>

            {/* Social Grid */}
            <div className="space-y-2 pt-4 border-t border-[#2a2d39]">
              <span className="text-[10px] font-mono text-[#8a8d98] uppercase tracking-widest block font-bold">
                NETWORK CHANNELS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTacticalClick}
                  className="p-3 border border-[#2a2d39] bg-[#14161c] hover:border-[#ccff00] flex items-center justify-between text-[#eae7dd] group transition-all"
                >
                  <div>
                    <span className="font-bold block text-[#ccff00]">LINKEDIN</span>
                    <span className="text-[10px] text-[#8a8d98]">/in/{personalInfo.linkedinHandle}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8a8d98] group-hover:text-[#ccff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTacticalClick}
                  className="p-3 border border-[#2a2d39] bg-[#14161c] hover:border-[#ccff00] flex items-center justify-between text-[#eae7dd] group transition-all"
                >
                  <div>
                    <span className="font-bold block text-[#ccff00]">GITHUB</span>
                    <span className="text-[10px] text-[#8a8d98]">@{personalInfo.githubUsername}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8a8d98] group-hover:text-[#ccff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: QUICK TRANSMISSION FORM */}
          <div className="lg:col-span-6 border border-[#2a2d39] bg-[#14161c] p-6 space-y-4 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2d39] font-mono text-xs">
              <span className="text-[#f4f3ee] font-bold uppercase">QUICK TRANSMISSION</span>
              <span className="text-[#ccff00]">[DIRECT DISPATCH]</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-[10px] text-[#8a8d98] uppercase block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satya Nadella"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#0e0f12] border border-[#2a2d39] text-[#eae7dd] focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8a8d98] uppercase block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="satya@microsoft.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#0e0f12] border border-[#2a2d39] text-[#eae7dd] focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8a8d98] uppercase block mb-1">Project Brief / Message</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Tell me about the engineering challenge..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-[#0e0f12] border border-[#2a2d39] text-[#eae7dd] focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ccff00] hover:bg-white text-black font-anton tracking-wider text-sm uppercase flex items-center justify-center space-x-2 transition-all shadow-[3px_3px_0px_#fff]"
              >
                <span>{msgSent ? 'TRANSMISSION DISPATCHED ✓' : 'TRANSMIT MESSAGE ↗'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM COLOPHON BAR (EXACT AS IMAGE: ACID BRUTAL STUDIO ... THANKS FOR SCROLLING) */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-[#2a2d39] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-[#8a8d98] uppercase">
          <div className="flex items-center space-x-2 text-[#eae7dd]">
            <span className="w-1.5 h-1.5 bg-[#ccff00]" />
            <span className="font-bold">AYUSH SHUKLA STUDIO</span>
          </div>

          <div className="hidden md:flex items-center space-x-3 text-[#cfd2dc]">
            <span>DESIGN.</span>
            <span>STRATEGY.</span>
            <span>IMPACT.</span>
          </div>

          <div className="flex items-center space-x-3 text-[#eae7dd]">
            <span>THANKS FOR SCROLLING</span>
            <span className="text-[#ccff00] font-bold">[2026©]</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
