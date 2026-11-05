import React from 'react';
import { aboutData, personalInfo } from '../data/portfolioData';
import { GraduationCap, BookOpen, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold block">
              ENGINEERING PHILOSOPHY // 05
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              ABOUT AYUSH
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed">
            Committed to building digital infrastructure that scales seamlessly without unnecessary latency or visual compromise.
          </p>
        </div>

        {/* EDITORIAL STATEMENT & DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-4xl font-clash font-bold text-white leading-tight">
              "Building digital experiences through technology, creativity and disciplined problem-solving."
            </h3>

            <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
              {aboutData.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {aboutData.highlights.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-dark-900 border border-white/[0.06] space-y-1.5">
                  <span className="font-clash font-bold text-sm text-cyan-300 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{item.title}</span>
                  </span>
                  <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ACADEMICS & INSTITUTION CARD */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.08] space-y-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 border-b border-white/[0.06] pb-4">
              <GraduationCap className="w-4 h-4" />
              <span className="uppercase font-bold tracking-wider">ACADEMIC FOUNDATION</span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-2xl font-clash font-bold text-white">
                {aboutData.education.institution}
              </h4>
              <p className="text-xs font-mono text-cyan-300">
                {aboutData.education.degree}
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                <span className="text-amber-300 font-bold">CGPA: {aboutData.education.cgpa}</span>
                <span>{aboutData.education.duration}</span>
              </div>
            </div>

            {/* Coursework Matrix */}
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                Key Computer Science Disciplines
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aboutData.education.coursework.map((course, i) => (
                  <span 
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-dark-800 border border-white/[0.06] text-xs font-mono text-slate-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
