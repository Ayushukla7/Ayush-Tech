import React from 'react';

export default function MarqueeTicker() {
  const items = [
    'SCUDERIA AS-26',
    'POWERTRAIN: 350+ DSA SOLVED',
    'HR PULSE: -35% LATENCY CUT',
    'WORKRADAR PREDICTIVE ENGINE',
    'NATIONAL HACKATHON P3',
    'BUILDSPRINT WINNER (RANK 1/85+)',
    '2,000+ TECH COMMUNITY',
    'AYUSH-UI: 10+ PROTOTYPES',
    'ABESEC B.TECH CSE (CGPA 7.89)'
  ];

  return (
    <div className="relative py-6 overflow-hidden border-y border-white/10 bg-black/80 backdrop-blur-md select-none marquee-mask">
      
      {/* Track 1: High speed F1 Telemetry marquee */}
      <div className="flex w-fit whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center space-x-6 mx-5">
            <span className="font-clash font-extrabold text-xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-red-400 hover:text-cyan-400 transition-colors">
              {text}
            </span>
            <span className="w-2 h-2 rounded-sm bg-red-500 shrink-0 rotate-45" />
          </div>
        ))}
      </div>

    </div>
  );
}
