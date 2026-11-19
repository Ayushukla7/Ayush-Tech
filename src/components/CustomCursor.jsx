import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    // Zero-lag 1:1 direct tracking using pure mousemove events
    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        // Fast direct tracking without laggy lerp
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Check hovered element for telemetry cursor label
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor');
        setCursorText(text || 'TARGET');
        setIsHovered(true);
      } else if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Zero-latency high-precision center acid lime dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 w-2 h-2 rounded-none bg-[#ccff00] shadow-[0_0_8px_#ccff00]"
      />

      {/* Zero-latency outer acid brutalist bracket ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-40 flex items-center justify-center transition-all duration-100 ease-out ${
          isHovered
            ? cursorText
              ? '-ml-9 -mt-9 w-[72px] h-[72px] rounded-none bg-[#ccff00]/15 border-2 border-[#ccff00] backdrop-blur-[2px] shadow-[0_0_20px_rgba(204,255,0,0.4)]'
              : '-ml-5 -mt-5 w-10 h-10 rounded-none border border-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.4)] scale-110'
            : '-ml-3.5 -mt-3.5 w-7 h-7 rounded-none border border-white/25 scale-75 opacity-60'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold text-[#ccff00] tracking-wider uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
