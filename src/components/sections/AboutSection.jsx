import React from 'react';
import { aboutData, personalInfo } from '../../data/portfolioData';
import { 
  GraduationCap, BookOpen, Code2, Users, Lightbulb, 
  Trophy, ShieldCheck, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            01 // DOSSIER & PROFILE
          </span>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-display max-w-2xl">
            Engineering digital solutions at the intersection of scalable full-stack architecture, algorithmic problem-solving, and community impact.
          </p>
        </div>

        {/* MAIN ABOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Narrative & Strategic Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-space-900/40 border border-slate-800 backdrop-blur-md space-y-4">
              <h3 className="text-lg font-orbitron font-bold text-white flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Executive Summary</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-display leading-relaxed">
                {aboutData.summary}
              </p>
            </div>

            {/* Core Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.highlights.map((highlight, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-space-900/30 border border-slate-800/80 hover:border-cyan-500/40 transition-colors space-y-2"
                >
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{highlight.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 5 COLS: Academic Credentials & Coursework Matrix */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-space-900/70 to-space-950 border border-cyan-500/30 backdrop-blur-md space-y-5">
              
              <div className="flex items-center space-x-2.5 text-xs font-mono text-cyan-400 border-b border-slate-800 pb-3">
                <GraduationCap className="w-4 h-4" />
                <span className="font-bold uppercase">ACADEMIC FOUNDATION</span>
              </div>

              <div>
                <h4 className="text-lg font-orbitron font-bold text-white">
                  {aboutData.education.institution}
                </h4>
                <p className="text-xs font-mono text-cyan-300 mt-1">
                  {aboutData.education.degree}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-amber-300 font-bold">CGPA: {aboutData.education.cgpa}</span>
                  <span>{aboutData.education.duration}</span>
                </div>
              </div>

              {/* Coursework Badges */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified Coursework & Disciplines</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aboutData.education.coursework.map((course, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-space-950 border border-slate-700/80 text-[11px] font-mono text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem Solving Telemetry */}
              <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800 text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">DSA PROBLEM SOLVING</span>
                  <span className="text-emerald-400 font-bold">250+ Solved in Java / C++</span>
                </div>
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
