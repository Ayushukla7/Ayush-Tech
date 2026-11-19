import React, { useState } from 'react';
import { WireframeGlobe, BrutalStar } from './AcidIcons';
import { playTouchSelect } from '../utils/audio';

export default function Capabilities() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: 'JAVA & C++ (DSA)', level: 9 },
    { name: 'FULL-STACK (MERN)', level: 8 },
    { name: 'REACT.JS / NEXT.JS', level: 9 },
    { name: 'NODE & EXPRESS.JS', level: 8 },
    { name: 'MONGODB & SQL', level: 8 },
    { name: 'UI/UX & FIGMA', level: 9 },
    { name: 'TAILWIND & CSS3', level: 9 },
  ];

  const toolsList = [
    'FIGMA',
    'JAVA (350+ DSA)',
    'REACT.JS / NEXT.JS',
    'NODE.JS / EXPRESS',
    'MONGODB / POSTGRESQL',
    'TAILWIND CSS',
    'C++ STL ALGORITHMS',
    'POSTMAN & REST APIS',
    'GIT & VERCEL'
  ];

  return (
    <section 
      id="skills" 
      className="relative py-20 px-3 sm:px-6 lg:px-8 border-b border-[#2a2d39] acid-grid select-none"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* LOWER SECTION: 3-BOX GRID (SKILLS MATRIX + QUOTE CARD + SOLID TOOLS BOX) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* BOX 1 (LEFT 5 COLS): SKILLS MATRIX & INTERACTIVE HEATMAP */}
          <div className="md:col-span-5 border border-[#2a2d39] bg-[#14161c] p-6 space-y-5 flex flex-col justify-between shadow-[4px_4px_0px_#000]">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2d39]">
              <span className="font-anton tracking-wider text-xl uppercase text-[#f4f3ee]">
                SKILLS MATRIX
              </span>
              <span className="w-2 h-2 bg-[#ccff00] rounded-none animate-pulse" />
            </div>

            {/* Matrix Rows: Skill Label on Left + 10-Block Heatmap on Right */}
            <div className="space-y-3 font-mono text-xs">
              {skills.map((skill, rowIdx) => {
                const isHovered = hoveredSkill === skill.name;
                return (
                  <div 
                    key={skill.name}
                    onMouseEnter={() => { playTouchSelect(); setHoveredSkill(skill.name); }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    {/* Skill Label */}
                    <span className={`text-[11px] font-bold tracking-wider truncate w-36 transition-colors ${
                      isHovered ? 'text-[#ccff00]' : 'text-[#cfd2dc]'
                    }`}>
                      {skill.name}
                    </span>

                    {/* 10-Block Matrix Grid (Exact as image heatmap) */}
                    <div className="flex items-center space-x-1 shrink-0">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((block) => {
                        const isFilled = block <= skill.level;
                        const isAccent = isFilled && (block >= 7 || block === skill.level);
                        return (
                          <div
                            key={block}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border transition-all ${
                              isFilled
                                ? isAccent
                                  ? 'bg-[#ccff00] border-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.5)]'
                                  : 'bg-[#e4e2d8] border-[#e4e2d8]'
                                : 'bg-[#0a0b0e] border-[#2a2d39] group-hover:border-[#424756]'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scale Footer: BASIC -> EXPERT */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2a2d39] font-mono text-[10px] text-[#8a8d98] uppercase font-bold">
              <span>BASIC</span>
              <div className="flex-1 mx-3 border-t border-dashed border-[#2a2d39]" />
              <span className="text-[#ccff00]">EXPERT [98%]</span>
            </div>

          </div>

          {/* BOX 2 (CENTER 4 COLS): DISTRESSED QUOTE CARD (EXACT AS IMAGE) */}
          <div className="md:col-span-4 border border-[#2a2d39] bg-[#0e0f12] p-6 flex flex-col justify-between relative overflow-hidden shadow-[4px_4px_0px_#ccff00]">
            
            {/* Top Crosshair */}
            <div className="flex items-center justify-between font-mono text-xs text-[#8a8d98]">
              <span className="text-[#ccff00] font-bold">+</span>
              <span className="text-[10px] tracking-widest uppercase">PHILOSOPHY</span>
              <span className="text-[#ccff00] font-bold">+</span>
            </div>

            {/* Central Giant Acid Quote */}
            <div className="my-auto py-6 space-y-2">
              <p className="font-anton text-2xl sm:text-3xl text-[#ccff00] uppercase leading-tight tracking-wide">
                “DESIGN IS INTELLIGENCE MADE VISIBLE.”
              </p>
              <p className="font-mono text-xs text-[#eae7dd] leading-relaxed">
                Code is architecture in motion. Algorithms turn complexity into speed.
              </p>
            </div>

            {/* Bottom Wireframe Globe (As in image) */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2a2d39]">
              <WireframeGlobe className="w-8 h-8 text-[#ccff00]" />
              <span className="font-mono text-[10px] text-[#8a8d98] tracking-widest uppercase">
                AS-STUDIO // 2026
              </span>
            </div>

          </div>

          {/* BOX 3 (RIGHT 3 COLS): SOLID ACID LIME TOOLS BOX (EXACT AS IMAGE) */}
          <div className="md:col-span-3 bg-[#ccff00] text-black p-6 flex flex-col justify-between shadow-[4px_4px_0px_#fff]">
            
            <div>
              {/* Box Top Title */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <span className="font-anton tracking-wider text-xl uppercase text-black">
                  TOOLS
                </span>
                <span className="font-mono text-xs font-bold">[09]</span>
              </div>

              {/* Tools List in Bold Monospace Typewriter Font */}
              <div className="space-y-1.5 pt-4 font-mono text-xs font-extrabold uppercase tracking-wider text-black">
                {toolsList.map((tool, i) => (
                  <div key={i} className="flex items-center space-x-1.5">
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Black Asterisk Star (Exact as image) */}
            <div className="pt-6 flex justify-end">
              <BrutalStar className="w-8 h-8 text-black" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
