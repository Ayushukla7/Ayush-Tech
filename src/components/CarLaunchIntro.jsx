import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playRealF1EngineSound, playTacticalClick } from '../utils/audio';
import { ArrowRight, Volume2 } from 'lucide-react';

export default function CarLaunchIntro({ onComplete }) {
  const [carArrived, setCarArrived] = useState(false);
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Play authentic high-quality racing car engine sound as car arrives
    playRealF1EngineSound();

    // Car drives smoothly into dead center of pitch-black screen (Zero Box, Zero Borders)
    if (carRef.current) {
      gsap.fromTo(carRef.current,
        { x: '-130%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1.8,
          ease: 'power3.out',
          onComplete: () => {
            setCarArrived(true);

            // Subtle driving float/idle engine rumble animation
            gsap.to(carRef.current, {
              y: '-=3',
              duration: 1.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });

            // Smoothly fade in "CLICK TO OPEN PORTFOLIO" button
            if (buttonRef.current) {
              gsap.fromTo(buttonRef.current,
                { opacity: 0, y: 16 },
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
    playRealF1EngineSound();

    // Car smoothly drives forward out & screen fades smoothly to reveal portfolio
    if (carRef.current && containerRef.current) {
      gsap.to(carRef.current, {
        x: '140%',
        duration: 0.9,
        ease: 'power3.in',
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.45,
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
      {/* PURE BLACK SCREEN - ONLY ISOLATED CAR IN CENTER WITH ZERO RECTANGULAR BOX */}
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center my-auto space-y-8">
        
        {/* CAR GLIDING IN SMOOTHLY ON BLACK BACKGROUND */}
        <div 
          ref={carRef}
          className="relative w-full flex items-center justify-center will-change-transform"
          style={{ transform: 'translateX(-130%)' }}
        >
          {/* Subtle tire track under car */}
          <div className="absolute inset-x-16 bottom-0 h-4 bg-black/80 blur-sm pointer-events-none" />

          {/* CLEAN TRANSPARENT CAR (ZERO GREY BOX, ZERO BORDERS) */}
          <img 
            src="/f1-car-transparent.png" 
            alt="F1 Racing Car" 
            className="w-full max-w-2xl sm:max-w-3xl h-auto object-contain pointer-events-none select-none filter drop-shadow-[0_20px_40px_rgba(225,6,0,0.35)]"
          />
        </div>

        {/* MINIMAL CLICK TO OPEN PORTFOLIO BUTTON */}
        <div ref={buttonRef} className="opacity-0 transition-opacity flex flex-col items-center space-y-3 z-10">
          <button
            onClick={handleOpenPortfolio}
            className="group px-8 py-3.5 rounded-full bg-white text-black font-clash font-bold text-sm tracking-wider uppercase flex items-center space-x-2.5 shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:bg-red-600 hover:text-white hover:shadow-[0_0_40px_rgba(225,6,0,0.7)] transition-all duration-300 transform hover:scale-105"
            data-cursor="ENTER"
          >
            <span>CLICK TO OPEN PORTFOLIO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            AYUSH SHUKLA • SCUDERIA AS-26
          </span>
        </div>

      </div>
    </div>
  );
}
