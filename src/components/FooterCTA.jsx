import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, Copy, Check, Send, ArrowUp, Github, Linkedin, Radio, Phone } from 'lucide-react';
import { playTacticalClick, playRadioBeep } from '../utils/audio';

export default function FooterCTA({ onOpenResume }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    playTacticalClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playRadioBeep();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4500);
  };

  const scrollToTop = () => {
    playTacticalClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-dark-950 overflow-hidden racing-grid">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* GIANT EDITORIAL F1 PITWALL CALL TO ACTION */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase text-red-500 font-bold">
              PITWALL DIRECT COMMS // CHANNEL AS-26
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-extrabold uppercase tracking-tight text-white leading-[0.9]">
              BOX, BOX.
            </h2>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-extrabold uppercase tracking-tight text-white leading-[0.9]">
              LET'S TALK<span className="text-red-500">.</span>
            </h2>
          </div>
        </div>

        {/* TWO COLUMN INTERACTIVE FORM & DIRECT LINKS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 6 COLS: Direct Radio Transmission & Social Handles */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
                DIRECT PIT TRANSMISSION INBOX
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-2xl sm:text-4xl lg:text-5xl font-clash font-extrabold text-white hover:text-red-400 transition-colors block break-all"
                data-cursor="EMAIL"
              >
                {personalInfo.email}
              </a>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-300 flex items-center space-x-1.5 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-red-400" />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                </button>
                <span className="text-slate-600 font-mono">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {personalInfo.phone}
                </span>
              </div>
            </div>

            {/* Social handles list with animated hover arrows */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
                PADDOCK NETWORKS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTacticalClick}
                  className="group p-4 rounded-xl bg-dark-900 border border-white/15 hover:border-red-500/70 flex items-center justify-between text-slate-200 transition-all"
                  data-cursor="VISIT"
                >
                  <div>
                    <span className="font-clash font-extrabold text-sm block">LinkedIn Driver Hub</span>
                    <span className="text-[10px] font-mono text-slate-400">/in/{personalInfo.linkedinHandle}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTacticalClick}
                  className="group p-4 rounded-xl bg-dark-900 border border-white/15 hover:border-red-500/70 flex items-center justify-between text-slate-200 transition-all"
                  data-cursor="VISIT"
                >
                  <div>
                    <span className="font-clash font-extrabold text-sm block">GitHub Repository</span>
                    <span className="text-[10px] font-mono text-slate-400">@{personalInfo.githubUsername}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: Minimal High-End Contact Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-red-500" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-red-500" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-clash font-extrabold text-lg text-white uppercase tracking-wide">
                Direct Radio Dispatch
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                SECTOR 1 RESPONSE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name or team"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-950 border border-white/10 text-slate-100 focus:outline-none focus:border-red-500 placeholder-slate-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Radio Return Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-950 border border-white/10 text-slate-100 focus:outline-none focus:border-red-500 placeholder-slate-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Project / Strategy Brief</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe project scope, timeline, engineering role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-950 border border-white/10 text-slate-100 focus:outline-none focus:border-red-500 placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_0_25px_rgba(225,6,0,0.5)]"
                data-cursor="DISPATCH"
              >
                <span>TRANSMIT RADIO MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>

              {formSent && (
                <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-mono text-xs">
                  Radio packet received! I will review and reply promptly.
                </div>
              )}
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 AYUSH SHUKLA • SCUDERIA CHASSIS AS-26 • ALL SYSTEMS OPERATIONAL
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-slate-400 hover:text-red-400 transition-colors font-bold"
              data-cursor="TOP"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>RETURN TO PADDOCK (TOP)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
