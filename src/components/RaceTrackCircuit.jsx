import React, { useState } from 'react';
import { Flag, Gauge, Trophy, Layers, Radio, ArrowUpRight, Zap, Play } from 'lucide-react';
import { playTacticalClick, playTouchSelect } from '../utils/audio';

export default function RaceTrackCircuit({ activeSector, onSelectSector }) {
  const [hoveredSector, setHoveredSector] = useState(null);

  const sectors = [
    {
      id: 'grid',
      label: 'START GRID',
      sub: 'Pole Position',
      href: '#hero',
      color: '#e10600',
      icon: Gauge,
      detail: 'Ayush Shukla (ABESEC CSE • CGPA 7.89)'
    },
    {
      id: 'sector1',
      label: 'SECTOR 01',
      sub: 'Powertrain Stack',
      href: '#skills',
      color: '#3b82f6',
      icon: Zap,
      detail: '350+ DSA • Java & C++ • React & Node.js'
    },
    {
      id: 'sector2',
      label: 'SECTOR 02',
      sub: 'Chassis Builds',
      href: '#work',
      color: '#ef4444',
      icon: Layers,
      detail: 'HR Pulse (-35% Latency) • WorkRadar • AYUSH-UI'
    },
    {
      id: 'sector3',
      label: 'SECTOR 03',
      sub: 'Race Strategy',
      href: '#experience',
      color: '#10b981',
      icon: Radio,
      detail: 'ONI Cares Intern • Technovation • 2000+ Community'
    },
    {
      id: 'finish',
      label: 'FINISH LINE',
      sub: 'Championship Podium',
      href: '#awards',
      color: '#f59e0b',
      icon: Trophy,
      detail: 'Rank 3 National Hackathon • BuildSprint Winner'
    }
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 my-10 select-none">
      
      {/* CIRCUIT TRACK TELEMETRY WRAPPER */}
      <div className="relative rounded-2xl bg-black/95 border border-white/15 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden tarmac-surface">
        
        {/* TOP RED & WHITE F1 KERB BORDER STRIP */}
        <div className="absolute top-0 inset-x-0 h-2 f1-kerb-h opacity-90" />
        <div className="absolute bottom-0 inset-x-0 h-2 f1-kerb-h opacity-90" />

        {/* TOP STATUS BAR: 5 START LIGHTS & TRACK METADATA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 font-mono text-xs">
          
          {/* TRACK IDENTITY */}
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-clash font-extrabold text-sm sm:text-base text-white uppercase tracking-wider">
              CIRCUIT AS-2026 // GRAND PRIX TRACK
            </span>
            <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 text-[10px] text-slate-300">
              5.412 KM • 16 TURNS
            </span>
          </div>

          {/* 5 RED STARTING LIGHTS (ICONIC FORMULA 1 VISUAL) */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-black/80 border border-white/15">
            <span className="text-[9px] text-slate-400 font-bold uppercase mr-1 hidden sm:inline">START LIGHTS:</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <span 
                key={i} 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-600 shadow-[0_0_10px_#ef4444] animate-pulse" 
              />
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CENTER VISUAL: STYLIZED 2D F1 RACE TRACK CIRCUIT SCHEMATIC */}
        {/* ========================================================================= */}
        <div className="relative py-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* SVG F1 CIRCUIT SCHEMATIC WITH ANIMATED TELEMETRY CAR */}
          <div className="relative w-full lg:w-7/12 flex items-center justify-center p-2">
            
            <svg 
              viewBox="0 0 600 280" 
              className="w-full h-auto max-h-[240px] drop-shadow-[0_0_25px_rgba(225,6,0,0.35)]"
            >
              <defs>
                {/* Circuit Track Gradient */}
                <linearGradient id="trackGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Tarmac Underlay Path */}
              <path
                id="circuitTarmac"
                d="M 60 200 L 220 200 C 260 200, 280 230, 320 230 L 480 230 C 530 230, 560 190, 560 140 C 560 90, 520 50, 460 50 L 320 50 C 280 50, 260 90, 220 90 L 140 90 C 80 90, 40 130, 40 170 Z"
                fill="none"
                stroke="#1e222d"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Outer Neon Apex Track Line */}
              <path
                id="circuitMainTrack"
                d="M 60 200 L 220 200 C 260 200, 280 230, 320 230 L 480 230 C 530 230, 560 190, 560 140 C 560 90, 520 50, 460 50 L 320 50 C 280 50, 260 90, 220 90 L 140 90 C 80 90, 40 130, 40 170 Z"
                fill="none"
                stroke="url(#trackGlow)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />

              {/* Start / Finish Grid Line (Chequered Pattern Marking) */}
              <line x1="120" y1="188" x2="120" y2="212" stroke="#ffffff" strokeWidth="6" strokeDasharray="3 3" />

              {/* Pole Position Car Dot marker */}
              <circle cx="120" cy="200" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
              <circle cx="120" cy="200" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />

              {/* Sector 1 Checkpoint */}
              <circle cx="340" cy="230" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
              <text x="340" y="252" fill="#93c5fd" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">S1: STACK</text>

              {/* Sector 2 Checkpoint */}
              <circle cx="560" cy="140" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
              <text x="545" y="125" fill="#fca5a5" fontSize="10" fontFamily="monospace" textAnchor="end" fontWeight="bold">S2: BUILDS</text>

              {/* Sector 3 Checkpoint */}
              <circle cx="320" cy="50" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
              <text x="320" y="40" fill="#6ee7b7" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">S3: STRATEGY</text>

              {/* Finish Line Checkpoint */}
              <circle cx="60" cy="180" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
              <text x="45" y="165" fill="#fde68a" fontSize="10" fontFamily="monospace" textAnchor="end" fontWeight="bold">FINISH: PODIUM</text>

              {/* Animated Telemetry Racing Dot moving along the circuit */}
              <circle r="5" fill="#00f2fe" filter="url(#glow)">
                <animateMotion 
                  path="M 60 200 L 220 200 C 260 200, 280 230, 320 230 L 480 230 C 530 230, 560 190, 560 140 C 560 90, 520 50, 460 50 L 320 50 C 280 50, 260 90, 220 90 L 140 90 C 80 90, 40 130, 40 170 Z" 
                  dur="7s" 
                  repeatCount="indefinite" 
                />
              </circle>
            </svg>

            {/* Circuit Legend Badge */}
            <div className="absolute bottom-1 left-2 flex items-center space-x-2 font-mono text-[9px] text-slate-400 bg-black/80 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>LIVE RACING TELEMETRY TRACKER</span>
            </div>

          </div>

          {/* RIGHT SECTOR CHECKPOINTS: QUICK INTERACTIVE NAV */}
          <div className="w-full lg:w-5/12 space-y-2 font-mono">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center space-x-1.5 pb-1">
              <Flag className="w-3.5 h-3.5 text-red-500" />
              <span>GRAND PRIX SECTOR CHECKPOINTS</span>
            </div>

            <div className="space-y-1.5">
              {sectors.map((sec, idx) => {
                const IconComponent = sec.icon;
                return (
                  <a
                    key={sec.id}
                    href={sec.href}
                    onClick={() => {
                      playTacticalClick();
                      playTouchSelect();
                    }}
                    onMouseEnter={() => setHoveredSector(sec.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                    className="p-3 rounded-xl bg-black/60 hover:bg-white/[0.08] border border-white/10 hover:border-red-500/60 flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-red-400 group-hover:border-red-500/50 transition-all">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-xs group-hover:text-red-400 transition-colors">
                            {sec.label}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • {sec.sub}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block font-sans">
                          {sec.detail}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
