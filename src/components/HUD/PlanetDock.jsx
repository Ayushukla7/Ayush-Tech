import React from 'react';
import { 
  Play, Pause, FastForward, RotateCcw, 
  Orbit, Compass, Sparkles, CircleDot
} from 'lucide-react';
import { celestialBodies } from '../../data/solarData';
import { playClick, playSelect } from '../../utils/audio';

export default function PlanetDock({
  selectedBodyId,
  onSelectBody,
  isOrbitPaused,
  onToggleOrbitPause,
  orbitSpeedMultiplier,
  onChangeOrbitSpeed
}) {
  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-2 sm:px-4 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* TIME / ORBIT MECHANICS CONTROLS */}
        <div className="pointer-events-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-space-950/85 backdrop-blur-md border border-cyan-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-xs font-mono">
          <button
            onClick={() => {
              playClick();
              onToggleOrbitPause();
            }}
            className={`p-1.5 rounded-lg border transition-all ${
              isOrbitPaused
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                : 'bg-space-900 border-slate-700 text-slate-300 hover:text-cyan-300'
            }`}
            title={isOrbitPaused ? "Resume Planetary Orbits" : "Pause Planetary Orbits"}
          >
            {isOrbitPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Speed cycle button */}
          <button
            onClick={() => {
              playClick();
              const next = orbitSpeedMultiplier === 1 ? 2 : orbitSpeedMultiplier === 2 ? 0.5 : 1;
              onChangeOrbitSpeed(next);
            }}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-space-900 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
            title="Cycle Orbit Time Warp Speed"
          >
            <FastForward className="w-3 h-3 text-cyan-400" />
            <span className="text-[11px]">{orbitSpeedMultiplier}x</span>
          </button>

          {/* Reset Overview Camera */}
          <button
            onClick={() => {
              playClick();
              onSelectBody(null);
            }}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-all ${
              !selectedBodyId
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,242,254,0.3)]'
                : 'bg-space-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Full Solar System Overview"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[11px]">ORRERY</span>
          </button>
        </div>

        {/* CELESTIAL BODIES DOCK */}
        <div className="pointer-events-auto overflow-x-auto max-w-full no-scrollbar flex items-center space-x-1 sm:space-x-1.5 px-3 py-2 rounded-2xl bg-space-950/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          {celestialBodies.map((body) => {
            const isSelected = selectedBodyId === body.id;
            const displayName = body.name.split(' ')[0];

            return (
              <button
                key={body.id}
                onClick={() => {
                  playSelect();
                  onSelectBody(isSelected ? null : body.id);
                }}
                className={`group relative flex flex-col items-center px-2 py-1.5 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-cyan-500/20 border border-cyan-400/80 shadow-[0_0_12px_rgba(0,242,254,0.4)] scale-105'
                    : 'hover:bg-space-800/80 border border-transparent'
                }`}
                title={`${body.name} - ${body.role}`}
              >
                {/* Planet Circle Indicator */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-transform group-hover:scale-125"
                    style={{
                      backgroundColor: body.color,
                      boxShadow: isSelected
                        ? `0 0 14px ${body.color}, 0 0 24px ${body.glowColor}`
                        : `0 0 6px ${body.color}88`
                    }}
                  />
                  {/* Active lock ring */}
                  {isSelected && (
                    <span 
                      className="absolute -inset-1 rounded-full border border-cyan-300 animate-ping opacity-60"
                    />
                  )}
                </div>

                {/* Name Label */}
                <span
                  className={`mt-1 font-mono text-[9px] sm:text-[10px] tracking-tight uppercase transition-colors whitespace-nowrap ${
                    isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {displayName}
                </span>

                {/* Role tooltip on hover */}
                <div className="pointer-events-none absolute bottom-full mb-2 hidden group-hover:block z-50 px-2 py-1 rounded bg-space-900 border border-cyan-500/40 text-[10px] font-mono text-cyan-200 whitespace-nowrap shadow-lg">
                  {body.role}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
