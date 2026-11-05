import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

export default function Trajectory() {
  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold block">
              CAREER TRAJECTORY & IMPACT // 03
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-clash font-extrabold text-white tracking-tight uppercase">
              LEADERSHIP & EXPERIENCE
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-sans font-light leading-relaxed">
            Scaling tech communities, corporate ambassadorship, UI design leadership, and fostering campus innovation.
          </p>
        </div>

        {/* TIMELINE TABLE */}
        <div className="space-y-4">
          {experienceData.map((item, idx) => (
            <div 
              key={idx}
              className="group p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/[0.06] hover:border-cyan-400/40 transition-all duration-300 space-y-4"
              data-cursor="EXP"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-clash font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role} <span className="text-slate-500 font-normal">@</span> {item.organization}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 block pl-8">
                    {item.type}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-slate-400 pl-8 lg:pl-0">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              {/* POINTS */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans font-light pl-2">
                {item.highlights.map((pt, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
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
