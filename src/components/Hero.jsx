import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, ArrowUpRight, Sparkles, Trophy, Zap, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick } from '../utils/audio';
import MagneticButton from './MagneticButton';
import Counter from './Counter';

export default function Hero({ onOpenResume }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline();

      tl.from('.hero-status', {
        y: -30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      })
      .from('.hero-line-1 span', {
        y: '110%',
        opacity: 0,
        stagger: 0.05,
        duration: 1.1,
        ease: 'power4.out'
      }, '-=0.5')
      .from('.hero-line-2 span', {
        y: '110%',
        opacity: 0,
        stagger: 0.04,
        duration: 1.1,
        ease: 'power4.out'
      }, '-=0.8')
      .from('.hero-badge-stamp', {
        scale: 0,
        rotation: -90,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=0.8')
      .from('.hero-manifesto', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.7')
      .from('.hero-actions', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-stat-card', {
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.7');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        
        {/* TOP STATUS ROW */}
        <div className="hero-status flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-cyan-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>DIGITAL INNOVATION & FULL-STACK DEVELOPMENT</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
              // BASED IN INDIA (NCR / LUCKNOW)
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span className="text-white font-medium">B.Tech CSE @ ABESEC</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400 font-bold">CGPA: 8.00 / 10.0</span>
          </div>
        </div>

        {/* MASSIVE EDITORIAL TYPOGRAPHY */}
        <div className="space-y-2 sm:space-y-4">
          
          {/* LINE 1: AYUSH SHUKLA */}
          <div className="overflow-hidden">
            <h1 className="hero-line-1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-clash font-extrabold tracking-tight uppercase leading-[0.92] text-white flex flex-wrap gap-x-4">
              <span className="inline-block will-change-transform">AYUSH</span>
              <span className="inline-block will-change-transform">SHUKLA</span>
            </h1>
          </div>

          {/* LINE 2: SOFTWARE ENGINEER + SPINNING STAMP */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="overflow-hidden">
              <h2 className="hero-line-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-clash font-bold tracking-tight uppercase leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-400 to-blue-500 flex flex-wrap gap-x-3">
                <span className="inline-block will-change-transform">SOFTWARE</span>
                <span className="inline-block will-change-transform">ENGINEER</span>
              </h2>
            </div>

            {/* SPINNING CIRCULAR STAMP BADGE */}
            <div className="hero-badge-stamp hidden lg:flex items-center justify-center shrink-0">
              <MagneticButton
                onClick={onOpenResume}
                strength={0.4}
                className="relative w-28 h-28 flex items-center justify-center cursor-pointer group"
                data-cursor="RESUME"
              >
                {/* Rotating Circular Text SVG */}
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-mono tracking-[2.5px] uppercase fill-slate-400 group-hover:fill-cyan-400 transition-colors">
                    <textPath xlinkHref="#circlePath">
                      • NATIONAL RUNNER UP • 250+ DSA • MERN STACK
                    </textPath>
                  </text>
                </svg>
                {/* Center Star / Arrow */}
                <div className="absolute w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:bg-cyan-400 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* MANIFESTO NARRATIVE & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
          
          <div className="lg:col-span-7 space-y-6">
            <p className="hero-manifesto text-lg sm:text-2xl text-slate-300 font-sans font-light leading-relaxed max-w-2xl">
              Architecting scalable applications, predictive workflow engines, and high-performance design systems. Slashed API latencies by <span className="text-white font-semibold">45%</span> and leading developer communities reaching <span className="text-cyan-400 font-semibold">2,000+ engineers</span>.
            </p>

            <div className="hero-actions flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton
                href="#work"
                onClick={() => playTacticalClick()}
                className="px-8 py-4 rounded-full bg-white text-black font-clash font-bold text-sm tracking-wide flex items-center space-x-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:bg-cyan-400 hover:shadow-[0_0_35px_rgba(0,242,254,0.45)] transition-all transform hover:-translate-y-0.5"
                data-cursor="EXPLORE"
              >
                <span>EXPLORE FEATURED WORKS</span>
                <ArrowDownRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={() => { playTacticalClick(); onOpenResume(); }}
                className="px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-white font-clash font-bold text-sm tracking-wide flex items-center space-x-2 transition-all"
                data-cursor="PDF"
              >
                <span>INSPECT RESUME</span>
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT 5 COLS: KEY IMPACT METRIC PILLS WITH DYNAMIC COUNTER */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="hero-stat-card p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-1 hover:border-cyan-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-clash font-bold text-cyan-400">
                <Counter value="250+" />
              </div>
              <div className="text-slate-300 font-medium">DSA Problems Solved</div>
              <div className="text-[10px] text-slate-500">LeetCode & GFG in Java/C++</div>
            </div>

            <div className="hero-stat-card p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-1 hover:border-emerald-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-clash font-bold text-emerald-400">
                <Counter value="-45%" />
              </div>
              <div className="text-slate-300 font-medium">API Latency Slashed</div>
              <div className="text-[10px] text-slate-500">420ms to 180ms via Aggregation</div>
            </div>

            <div className="hero-stat-card p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-1 hover:border-amber-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-clash font-bold text-amber-400">
                Rank <Counter value="3" />
              </div>
              <div className="text-slate-300 font-medium">National Hackathon</div>
              <div className="text-[10px] text-slate-500">1st in Healthcare (120+ teams)</div>
            </div>

            <div className="hero-stat-card p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-1 hover:border-purple-400/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-clash font-bold text-purple-400">
                <Counter value="88%" />
              </div>
              <div className="text-slate-300 font-medium">Predictive Accuracy</div>
              <div className="text-[10px] text-slate-500">WorkRadar Delay Risk Engine</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
