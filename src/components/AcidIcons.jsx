import React from 'react';

// Wireframe 3D Globe seen in top header and quote card
export function WireframeGlobe({ className = "w-6 h-6 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="50" cy="50" r="45" />
      <ellipse cx="50" cy="50" rx="45" ry="18" />
      <ellipse cx="50" cy="50" rx="18" ry="45" />
      <line x1="5" y1="50" x2="95" y2="50" />
      <line x1="50" y1="5" x2="50" y2="95" />
    </svg>
  );
}

// Brutalist 8-Point Asterisk Star
export function BrutalStar({ className = "w-5 h-5 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14 9L23 5L17 12L23 19L14 15L12 24L10 15L1 19L7 12L1 5L10 9L12 0Z" />
    </svg>
  );
}

// Geometric Outline Icons for the 5 Process Notes
// 1. Research: Stacked Wireframe Isometric Planes
export function IconResearch({ className = "w-6 h-6 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 2 L28 8 L16 14 L4 8 Z" />
      <path d="M4 14 L16 20 L28 14" />
      <path d="M4 20 L16 26 L28 20" />
    </svg>
  );
}

// 2. Concept: Radiating Asterisk Star
export function IconConcept({ className = "w-6 h-6 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <line x1="16" y1="3" x2="16" y2="29" />
      <line x1="3" y1="16" x2="29" y2="16" />
      <line x1="6.8" y1="6.8" x2="25.2" y2="25.2" />
      <line x1="6.8" y1="25.2" x2="25.2" y2="6.8" />
    </svg>
  );
}

// 3. Design: Orbital Rings / Atom
export function IconDesign({ className = "w-6 h-6 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(-30 16 16)" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(30 16 16)" />
    </svg>
  );
}

// 4. Develop: Wireframe Globe Mesh
export function IconDevelop({ className = "w-6 h-6 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="13" />
      <ellipse cx="16" cy="16" rx="13" ry="5" />
      <ellipse cx="16" cy="16" rx="5" ry="13" />
      <line x1="3" y1="16" x2="29" y2="16" />
      <line x1="16" y1="3" x2="16" y2="29" />
    </svg>
  );
}

// 5. Deliver: Sunburst Radiating Gear
export function IconDeliver({ className = "w-6 h-6 text-[#ccff00]" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="6" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <line
          key={i}
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
    </svg>
  );
}
