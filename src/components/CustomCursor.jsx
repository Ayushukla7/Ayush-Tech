import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseRef = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor');
        setCursorText(text || 'VIEW');
        setIsHovered(true);
      } else if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth follower animation loop
    let animId;
    const animateFollower = () => {
      animId = requestAnimationFrame(animateFollower);
      followerPos.current.x += (mouseRef.current.x - followerPos.current.x) * 0.15;
      followerPos.current.y += (mouseRef.current.y - followerPos.current.y) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }
    };
    animateFollower();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Central pinpoint dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cyan-400 mix-blend-difference transition-opacity duration-300"
      />

      {/* Smooth trailing interactive ring */}
      <div
        ref={followerRef}
        className={`pointer-events-none fixed top-0 left-0 z-40 flex items-center justify-center rounded-full transition-all duration-200 ${
          isHovered
            ? cursorText
              ? '-ml-10 -mt-10 w-20 h-20 bg-cyan-400 text-black font-clash font-bold text-[10px] tracking-widest uppercase shadow-[0_0_25px_rgba(0,242,254,0.6)] scale-100'
              : '-ml-6 -mt-6 w-12 h-12 bg-white/20 backdrop-blur-sm border border-cyan-400/60 scale-100'
            : '-ml-4 -mt-4 w-8 h-8 border border-white/30 scale-75'
        }`}
      >
        {cursorText && (
          <span className="animate-pulse">{cursorText}</span>
        )}
      </div>
    </>
  );
}
