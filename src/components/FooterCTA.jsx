import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight, Copy, Check, Send, ArrowUp, Github, Linkedin, FileText, Phone } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

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
    playTacticalClick();
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
    <footer id="contact" className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-dark-950 overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[30rem] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* GIANT EDITORIAL CALL TO ACTION (Trionn signature style) */}
        <div className="space-y-6">
          <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold block">
            INITIATE COLLABORATION // 06
          </span>

          <div className="space-y-2">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-extrabold uppercase tracking-tight text-white leading-[0.92]">
              HAVE AN IDEA?
            </h2>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-400 to-blue-500 leading-[0.92]">
              LET'S TALK.
            </h2>
          </div>
        </div>

        {/* TWO COLUMN INTERACTIVE FORM & DIRECT LINKS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 6 COLS: Giant Email & Handles */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block">
                DIRECT TRANSMISSION INBOX
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-2xl sm:text-4xl lg:text-5xl font-clash font-bold text-white hover:text-cyan-400 transition-colors block break-all"
                data-cursor="EMAIL"
              >
                {personalInfo.email}
              </a>
              <div className="flex items-center space-x-3 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-slate-300 flex items-center space-x-1.5 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email Address'}</span>
                </button>
                <span className="text-slate-600 font-mono">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {personalInfo.phone}
                </span>
              </div>
            </div>

            {/* Social handles list with animated hover arrows */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block">
                GLOBAL NETWORKS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTacticalClick}
                  className="group p-4 rounded-2xl bg-dark-900 border border-white/[0.06] hover:border-cyan-400 flex items-center justify-between text-slate-200 transition-all"
                  data-cursor="VISIT"
                >
                  <span className="font-clash font-bold text-sm">LinkedIn Profile</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playTacticalClick}
                  className="group p-4 rounded-2xl bg-dark-900 border border-white/[0.06] hover:border-cyan-400 flex items-center justify-between text-slate-200 transition-all"
                  data-cursor="VISIT"
                >
                  <span className="font-clash font-bold text-sm">GitHub: @{personalInfo.githubUsername}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: Minimal High-End Contact Form */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-dark-900 border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="font-clash font-bold text-lg text-white">
                Send a Message
              </span>
              <span className="text-xs font-mono text-cyan-400">
                QUICK RESPONSE
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name or entity"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Project / Role Scope</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell me about your project, timeline, or open role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-white text-black font-clash font-bold text-sm tracking-wide flex items-center justify-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(0,242,254,0.4)]"
                data-cursor="SEND"
              >
                <span>TRANSMIT MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>

              {formSent && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-mono text-xs">
                  Message received! I will review and reply promptly.
                </div>
              )}
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
        <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 AYUSH SHUKLA • DESIGNED & CODED WITH DISCIPLINE
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
              data-cursor="TOP"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>BACK TO TOP</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
