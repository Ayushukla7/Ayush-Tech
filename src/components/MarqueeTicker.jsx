import React from 'react';
import { BrutalStar } from './AcidIcons';

export default function MarqueeTicker() {
  const items = [
    'AYUSH SHUKLA // FULL-STACK DEV',
    '350+ DSA PROBLEMS (JAVA/C++)',
    'HR PULSE: -35% SERVER LATENCY',
    'WORKRADAR: 0–100 RISK ENGINE',
    'AYUSH-UI: 10+ DESIGN PROTOTYPES',
    'RANK 3 NATIONAL HACKATHON',
    'BUILDSPRINT WINNER (RANK 1/85+)',
    'ABESEC B.TECH CSE (CGPA 7.89)',
    'UPMSP 88% (MATHEMATICS)'
  ];

  return (
    <div className="relative py-4 overflow-hidden border-y border-[#2a2d39] bg-[#0e0f12] select-none marquee-mask">
      <div className="flex w-fit whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center space-x-6 mx-5">
            <span className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-[#eae7dd] hover:text-[#ccff00] transition-colors">
              {text}
            </span>
            <BrutalStar className="w-4 h-4 text-[#ccff00] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
