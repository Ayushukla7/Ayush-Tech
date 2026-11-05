import React from 'react';

export default function MarqueeTicker() {
  const items = [
    'FULL-STACK ARCHITECTURE',
    'VACCITRACK',
    '45% LATENCY REDUCTION',
    'WORKRADAR',
    '250+ DSA PROBLEMS',
    'MERN & NEXT.JS',
    'NATIONAL HACKATHON RUNNER-UP',
    'AYUSH-UI DESIGN SYSTEM',
    '2,000+ DEVELOPER COMMUNITY'
  ];

  return (
    <div className="relative py-8 overflow-hidden border-y border-white/[0.08] bg-dark-900/60 backdrop-blur-md select-none marquee-mask">
      
      {/* Track 1: Normal Direction */}
      <div className="flex w-fit whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center space-x-6 mx-4">
            <span className="font-clash font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 hover:text-cyan-400 transition-colors">
              {text}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
          </div>
        ))}
      </div>

    </div>
  );
}
