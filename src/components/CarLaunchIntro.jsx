import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playTacticalClick, playEngineRev } from '../utils/audio';
import { ArrowRight } from 'lucide-react';

export default function CarLaunchIntro({ onComplete }) {
  const [carArrived, setCarArrived] = useState(false);
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Elegant, smooth entry: car glides from left into dead center on pitch-black screen
    if (carRef.current) {
      gsap.fromTo(carRef.current,
        { x: '-120%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          onComplete: () => {
            setCarArrived(true);
            // Smoothly reveal "CLICK TO OPEN PORTFOLIO" button
            if (buttonRef.current) {
              gsap.fromTo(buttonRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
              );
            }
          }
        }
      );
    }
  }, []);

  const handleOpenPortfolio = () => {
    playTacticalClick();
    playEngineRev();

    // Car drives forward out & screen fades smoothly to reveal portfolio
    if (carRef.current && containerRef.current) {
      gsap.to(carRef.current, {
        x: '140%',
        duration: 0.8,
        ease: 'power3.in',
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 overflow-hidden select-none"
    >
      {/* PURE BLACK SCREEN - ONLY CAR IN CENTER */}
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center my-auto space-y-8">
        
        {/* CAR GLIDING IN TO CENTER */}
        <div 
          ref={carRef}
          className="relative w-full flex items-center justify-center will-change-transform"
          style={{ transform: 'translateX(-120%)' }}
        >
          <img 
            src="/f1-horizontal.jpg" 
            alt="F1 Racing Chassis" 
            className="w-full max-w-2xl sm:max-w-3xl h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] pointer-events-none select-none"
          />
        </div>

        {/* CLICK TO OPEN PORTFOLIO BUTTON */}
        <div ref={buttonRef} className="opacity-0 transition-opacity flex flex-col items-center space-y-3">
          <button
            onClick={handleOpenPortfolio}
            className="group px-8 py-3.5 rounded-full bg-white text-black font-clash font-bold text-sm tracking-wider uppercase flex items-center space-x-2.5 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:bg-red-600 hover:text-white hover:shadow-[0_0_35px_rgba(225,6,0,0.6)] transition-all duration-300 transform hover:scale-105"
            data-cursor="ENTER"
          >
            <span>CLICK TO OPEN PORTFOLIO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            AYUSH SHUKLA • SCUDERIA AS-26
          </span>
        </div>

      </div>
    </div>
  );
}
