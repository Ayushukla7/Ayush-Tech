import React from 'react';
import { experienceData } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, Users, Award, ChevronRight } from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            04 // PROFESSIONAL TIMELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
            Experience & Leadership
          </h2>
          <p className="text-sm text-slate-400 font-display max-w-xl">
            Driving technical impact through entrepreneurship, corporate ambassadorship, tech community scaling, and design leadership.
          </p>
        </div>

        {/* TIMELINE LIST */}
        <div className="space-y-6">
          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-7 rounded-3xl bg-space-900/40 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_4px_25px_rgba(0,0,0,0.6)] space-y-4"
            >
              {/* TOP HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role} <span className="text-slate-400 font-normal">@</span> {exp.organization}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* HIGHLIGHT POINTS */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {exp.highlights.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1 shrink-0">▹</span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
