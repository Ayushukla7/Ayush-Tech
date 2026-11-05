import React, { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { 
  Mail, Phone, MapPin, Github, Linkedin, Send, 
  Copy, Check, FileText, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

export default function ContactSection({ onOpenResume }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopyEmail = () => {
    playTacticalClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playTacticalClick();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            06 // DIRECT TRANSMISSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
            Get In Touch
          </h2>
          <p className="text-sm text-slate-400 font-display max-w-xl">
            Open for Software Engineering opportunities, full-stack development roles, hackathons, and innovative technology ventures.
          </p>
        </div>

        {/* CONTACT MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 5 COLS: Channels & Direct Info */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                PRIMARY INBOX
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm text-slate-100 select-all">
                  {personalInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center space-x-1 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                DIRECT CARRIER
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm text-slate-100">
                  {personalInfo.phone}
                </span>
                <a
                  href={`tel:${personalInfo.phone}`}
                  onClick={playTacticalClick}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
                >
                  Call
                </a>
              </div>
            </div>

            {/* Geographical Coordinates */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                GEOGRAPHICAL REGION
              </span>
              <p className="text-slate-200 font-bold">
                {personalInfo.location}
              </p>
              <p className="text-[11px] text-cyan-400">
                Coordinates: {personalInfo.coordinates.lat}, {personalInfo.coordinates.lng} (Elevation: {personalInfo.coordinates.elevation})
              </p>
            </div>

            {/* Uplink Buttons: GitHub, LinkedIn, Resume */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={playTacticalClick}
                className="p-3.5 rounded-2xl bg-space-950 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-between transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={playTacticalClick}
                className="p-3.5 rounded-2xl bg-space-950 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-between transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => { playTacticalClick(); onOpenResume(); }}
              className="w-full py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>INSPECT OFFICIAL RESUME DOSSIER</span>
            </button>

          </div>

          {/* RIGHT 7 COLS: Interactive Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-space-900/60 to-space-950/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-orbitron font-bold text-base text-white">
                Dispatch Digital Transmission
              </span>
              <span className="text-[11px] font-mono text-cyan-400">
                ENCRYPTED PACKET
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name or entity"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400 uppercase">Subject / Objective</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400 uppercase">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide scope, role requirements, or collaboration goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND TRANSMISSION</span>
              </button>

              {formSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs">
                  Transmission packet dispatched successfully! Acknowledgment received.
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
