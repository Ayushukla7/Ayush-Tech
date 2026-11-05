import React, { useState } from 'react';
import { 
  personalInfo, celestialBodies 
} from '../../data/solarData';
import { 
  Orbit, Github, Linkedin, ExternalLink, Mail, Phone, MapPin, 
  Terminal, Award, Cpu, Code2, Users, Zap, CheckCircle2, 
  ArrowRight, Sparkles, Send, Copy, Check, ChevronRight
} from 'lucide-react';
import { playClick, playSelect, playWarp } from '../../utils/audio';

export default function DossierView({ onLaunch3D, onWarpToBody, onOpenTerminal, onOpenResume }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    playClick();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 overflow-y-auto font-display pt-20 pb-24 selection:bg-cyan-500 selection:text-black">
      
      {/* BACKGROUND COSMIC AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px]" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00f2fe 1px, transparent 1px), linear-gradient(90deg, #00f2fe 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 1. HERO NEXUS */}
        <section className="space-y-6 pt-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>FULL-STACK & PREDICTIVE WORKFLOW ARCHITECT</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold tracking-tight text-white">
              AYUSH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400">SHUKLA</span>
            </h1>
            <p className="max-w-3xl text-base sm:text-xl text-slate-300 leading-relaxed font-light">
              Results-driven Software Engineering undergraduate at <span className="text-white font-medium">ABES Engineering College</span> (CGPA: 8.00/10.0). Architecting scalable web applications, slashing API latencies by 45%, and engineering predictive delay risk engines.
            </p>
          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                playWarp();
                onLaunch3D();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs tracking-wider flex items-center space-x-2 shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <Orbit className="w-4 h-4" />
              <span>LAUNCH 3D SOLAR ORRERY</span>
            </button>

            <button
              onClick={() => { playClick(); onOpenResume(); }}
              className="px-4 py-2.5 rounded-xl bg-space-900 border border-slate-700 hover:border-amber-400 text-slate-200 hover:text-amber-300 font-mono text-xs flex items-center space-x-2 transition-all"
            >
              <span>OFFICIAL RESUME</span>
            </button>

            <button
              onClick={() => { playClick(); onOpenTerminal(); }}
              className="px-4 py-2.5 rounded-xl bg-space-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-xs flex items-center space-x-2 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTERACTIVE CLI</span>
            </button>
          </div>

          {/* TELEMETRY STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
            {personalInfo.stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-3.5 rounded-xl bg-space-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-cyan-500/30 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-orbitron font-bold text-cyan-300">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. SOLAR SYSTEM ORBITS MAPPING (CELESTIAL ARCHITECTURE) */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                ARCHITECTURAL ORBITS
              </span>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mt-1">
                Solar Planetary System
              </h2>
            </div>
            <span className="hidden sm:inline font-mono text-xs text-slate-400">
              Click any planet to inspect orbit in 3D
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {celestialBodies.map((body) => (
              <div
                key={body.id}
                onClick={() => {
                  playWarp();
                  onWarpToBody(body.id);
                }}
                className="group relative p-5 rounded-2xl bg-space-900/40 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: body.color,
                        boxShadow: `0 0 12px ${body.color}`
                      }}
                    />
                    <span className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {body.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-950 text-slate-400 border border-slate-800">
                    {body.role}
                  </span>
                </div>

                <div className="mt-3 text-xs font-mono text-cyan-400">
                  {body.techCategory}
                </div>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {body.tagline}
                </p>

                <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 group-hover:text-cyan-300">
                  <span>Warp Orbit</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FLAGSHIP PRODUCTION PROJECTS */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                EARTH DEPLOYMENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mt-1">
                Flagship Projects & Architectures
              </h2>
            </div>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={playClick}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>Explore GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-6">
            {/* WORKRADAR */}
            <div className="p-6 rounded-2xl bg-space-900/40 border border-red-500/30 backdrop-blur-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                    PREDICTIVE SYSTEMS
                  </div>
                  <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white mt-1">
                    WorkRadar – Predictive Task & Workforce Platform
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-space-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Architected a predictive workforce analytics platform forecasting project delay risks with 88% accuracy before deadlines occur. Processed real-time developer metrics to prevent cross-functional engineering bottlenecks.
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB Aggregation', 'JWT Authentication', 'Tailwind CSS'].map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-space-950 border border-slate-700 text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-space-950/70 border border-slate-800">
                  <div className="text-amber-400 font-mono text-xs font-bold uppercase">Delay Risk Engine</div>
                  <p className="text-xs text-slate-300 mt-1">0–100 scale synthesizing blockers, velocity delta, workload saturation, and PR lag.</p>
                </div>
                <div className="p-3 rounded-xl bg-space-950/70 border border-slate-800">
                  <div className="text-cyan-400 font-mono text-xs font-bold uppercase">Pipeline Optimization</div>
                  <p className="text-xs text-slate-300 mt-1">Cut MongoDB latency by 45% (from 420ms down to 180ms) across 1,000+ tasks.</p>
                </div>
                <div className="p-3 rounded-xl bg-space-950/70 border border-slate-800">
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase">Bottleneck Resolution</div>
                  <p className="text-xs text-slate-300 mt-1">Reduced sprint discovery and unblocking time by 40% for cross-functional teams.</p>
                </div>
              </div>
            </div>

            {/* VACCITRACK */}
            <div className="p-6 rounded-2xl bg-space-900/40 border border-emerald-500/30 backdrop-blur-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    NATIONAL HACKATHON 2ND RUNNER-UP
                  </div>
                  <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white mt-1">
                    VacciTrack – Full-Stack Immunization Management System
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-space-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Engineered an enterprise healthcare immunization platform serving Doctors and Parents. Integrated national ABHA health standards and Twilio 2FA, cutting clinical errors by 95% and eliminating duplicate records.
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['MERN Stack', 'RESTful APIs', 'ABHA Integration', 'Twilio OTP 2FA', 'Lighthouse 98+', 'Automated Scheduling'].map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-space-950 border border-slate-700 text-emerald-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-space-950/70 border border-slate-800">
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase">ABHA Standards & 2FA</div>
                  <p className="text-xs text-slate-300 mt-1">Reduced manual clinical errors by 95% and duplicate records to &lt;0.5%.</p>
                </div>
                <div className="p-3 rounded-xl bg-space-950/70 border border-slate-800">
                  <div className="text-cyan-400 font-mono text-xs font-bold uppercase">Dual Role Workflows</div>
                  <p className="text-xs text-slate-300 mt-1">Distinct role-based access for Healthcare Professionals & Parents with SMS alerts.</p>
                </div>
                <div className="p-3 rounded-xl bg-space-950/70 border border-slate-800">
                  <div className="text-amber-400 font-mono text-xs font-bold uppercase">Sub-1.2s Page Speed</div>
                  <p className="text-xs text-slate-300 mt-1">Attained a 98+ Lighthouse score via code-splitting and dynamic route loading.</p>
                </div>
              </div>
            </div>

            {/* AYUSH-UI */}
            <div className="p-6 rounded-2xl bg-space-900/40 border border-purple-500/30 backdrop-blur-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    DESIGN SYSTEM & PERFORMANCE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white mt-1">
                    AYUSH-UI – Modern Frontend & UI/UX Design System
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={personalInfo.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-mono text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Showcase</span>
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playClick}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-space-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Engineered an interactive design system showcasing 10+ high-fidelity component prototypes, smooth 60 FPS micro-animations, and achieving 100/100 SEO & Accessibility scores on Google PageSpeed Insights.
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Figma Tokens', '100/100 PageSpeed'].map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-space-950 border border-slate-700 text-purple-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 4. TECHNICAL SKILLS & ALGORITHMIC RIGOR */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              COMPUTATIONAL CORE
            </span>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mt-1">
              Technical Proficiencies & DSA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Languages */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Code2 className="w-4 h-4" />
                <span>Languages</span>
              </div>
              <ul className="space-y-2 text-xs font-mono">
                <li className="flex justify-between items-center text-slate-200">
                  <span>Java</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">DSA & Backend</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>C / C++</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Algorithms & STL</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>JavaScript (ES6+)</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Async & V8</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>TypeScript</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Strict Typing</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Python</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Scripting</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>SQL</span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">ACID & Joins</span>
                </li>
              </ul>
            </div>

            {/* Frontend */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Frontend Systems</span>
              </div>
              <ul className="space-y-2 text-xs font-mono">
                <li className="flex justify-between items-center text-slate-200">
                  <span>React.js</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Virtual DOM</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Next.js</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">SSR & App Router</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Redux Toolkit</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">RTK Query</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Tailwind CSS</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Design Tokens</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Vite</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">ESM Bundler</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Micro-Animations</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">60 FPS</span>
                </li>
              </ul>
            </div>

            {/* Backend & DB */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-orange-400 font-mono text-xs font-bold uppercase">
                <Cpu className="w-4 h-4" />
                <span>Backend & Data</span>
              </div>
              <ul className="space-y-2 text-xs font-mono">
                <li className="flex justify-between items-center text-slate-200">
                  <span>Node.js</span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Async I/O</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Express.js</span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">REST APIs</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>MongoDB & Mongoose</span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Pipelines</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>PostgreSQL / MySQL</span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Relational</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>JWT Auth</span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">RBAC Security</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Docker (Basics)</span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Containers</span>
                </li>
              </ul>
            </div>

            {/* Tools & Design */}
            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 font-mono text-xs font-bold uppercase">
                <Zap className="w-4 h-4" />
                <span>Tools & Design</span>
              </div>
              <ul className="space-y-2 text-xs font-mono">
                <li className="flex justify-between items-center text-slate-200">
                  <span>Git & GitHub</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">CI / CD</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Postman</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">API Testing</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Figma</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">UI Prototyping</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Adobe Photoshop</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">Creative Assets</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>Vercel</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">Edge Deploy</span>
                </li>
                <li className="flex justify-between items-center text-slate-200">
                  <span>VS Code</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">Dev Setup</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5. AWARDS & HACKATHON RINGS */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              SATURN RINGS OF HONOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mt-1">
              Achievements & Hackathon Podiums
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-space-900 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  NATIONAL RANK 3 / 120+ TEAMS
                </span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-orbitron">
                National Hackathon – 2nd Runner Up
              </h3>
              <div className="text-xs font-mono text-amber-300">
                Won 1st Position in Healthcare Innovation Track
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Recognized nationally among 120+ multidisciplinary teams for designing and engineering VacciTrack, an ABHA-compliant immunization platform.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  IIT MADRAS FINALIST
                </span>
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-orbitron">
                NeuroHACK Finalist – Shaastra, IIT Madras
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Shortlisted as top finalist in Shaastra's premier hackathon at IIT Madras, tackling real-time biometric and workflow automation challenges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  HACKATHON FINALIST
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-orbitron">
                JJK Hackathon & Hack4Health Finalist
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Repeated finalist in 24-36 hour rapid product buildathons, engineering high-concurrency patient databases and real-time alerts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  BUILDATHON FINALIST
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-orbitron">
                Nirmaan Buildathon Finalist
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Recognized for architectural soundness, clean code modularity, and viability of production deployment.
              </p>
            </div>

          </div>
        </section>

        {/* 6. WORK EXPERIENCE & LEADERSHIP */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              COMMUNITY IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white mt-1">
              Work Experience & Leadership
            </h2>
          </div>

          <div className="space-y-4">
            
            <div className="p-6 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Student Ambassador • <span className="text-cyan-400 font-mono">Capgemini</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Aug 2025 – Present | Ghaziabad</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  <span>Spearheaded campus outreach for Capgemini Brand Quest, engaging 500+ students and driving a 35% increase in registrations.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  <span>Coordinated 3+ technical webinars, achieving an average participant satisfaction rating of 4.8 / 5.0.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Social Media & Community Manager • <span className="text-cyan-400 font-mono">Elixir Tech Community</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Jan 2025 – Present | Remote</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  <span>Scaled technical community to 2,000+ members across Discord and LinkedIn, boosting organic engagement by 120%.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  <span>Facilitated 8+ peer-to-peer coding sessions, mentoring 250+ students in Web Development and Git workflows.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-space-900/40 border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Lead Graphic & UI Designer • <span className="text-cyan-400 font-mono">Technovation Club, ABESEC</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Jun 2024 – Present | Ghaziabad</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                <li className="flex items-start space-x-2">
                  <span className="text-cyan-400 mt-0.5">▹</span>
                  <span>Crafted 40+ marketing and UI assets in Figma for tech fests with 1,500+ attendees, accelerating design delivery speed by 30%.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 7. DIRECT MISSION CONTROL TRANSMISSION */}
        <section className="space-y-6 pt-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-space-900/80 to-space-950 border border-cyan-500/30 backdrop-blur-xl space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                NEPTUNE SUB-SPACE RELAY
              </span>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white">
                Initiate Direct Transmission
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Interested in hiring, technical collaboration, or discussing scalable system design? Dispatch a transmission directly into Ayush's orbit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Telemetry Links */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">PRIMARY INBOX</span>
                    <span className="text-slate-100">{personalInfo.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs flex items-center space-x-1"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">DIRECT CARRIER</span>
                    <span className="text-slate-100">{personalInfo.phone}</span>
                  </div>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                  >
                    Call
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-space-950 border border-slate-800 hover:border-cyan-400 flex items-center justify-between text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-space-950 border border-slate-800 hover:border-cyan-400 flex items-center justify-between text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <span>GitHub: {personalInfo.githubUsername}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct Form */}
              <form onSubmit={handleSubmitForm} className="space-y-3 font-mono text-xs">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Organization"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Transmitting Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-500"
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Transmission details (Role, Project, or Opportunity)..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-space-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-400 placeholder-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT PACKET</span>
                </button>
                {formSent && (
                  <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-[11px]">
                    Transmission packet acknowledged. Redirecting to mailto client!
                  </div>
                )}
              </form>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
