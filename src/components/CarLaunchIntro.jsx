import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  playRealF1EngineSound, 
  stopRealF1EngineSound, 
  playTacticalClick,
  toggleAudio,
  isMuted
} from '../utils/audio';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

export default function CarLaunchIntro({ onComplete }) {
  const [carArrived, setCarArrived] = useState(false);
  const [muted, setMutedState] = useState(isMuted());
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Play minimal, soft, subdued engine sound (low volume 0.10 - never loud or startling)
    playRealF1EngineSound(0.10);

    // Car drives smoothly into dead center of pitch-black screen
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

            // Subtle gentle float animation
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

    return () => {
      stopRealF1EngineSound();
    };
  }, []);

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    const newMuted = toggleAudio();
    setMutedState(newMuted);
  };

  const handleOpenPortfolio = () => {
    playTacticalClick();
    stopRealF1EngineSound();

    // Car smoothly drives forward out & screen fades smoothly to reveal portfolio
    if (carRef.current && containerRef.current) {
      gsap.to(carRef.current, {
        x: '140%',
        duration: 0.85,
        ease: 'power3.in',
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
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
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* TOP CONTROLS: SUBTLE MUTE TOGGLE */}
      <div className="w-full max-w-5xl flex justify-between items-center z-20 font-mono text-xs">
        <span className="text-[10px] text-slate-600 uppercase tracking-widest">
          AYUSH SHUKLA // CHASSIS AS-26
        </span>

        <button
          onClick={handleMuteToggle}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center space-x-1.5"
          title={muted ? "Unmute Sound" : "Mute Sound"}
        >
          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          <span className="text-[10px] hidden sm:inline">{muted ? "MUTED" : "AUDIO"}</span>
        </button>
      </div>

      {/* PURE BLACK SCREEN - ONLY ISOLATED CAR IN CENTER WITH ZERO RECTANGULAR BOX */}
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center my-auto space-y-8">
        
        {/* CAR GLIDING IN SMOOTHLY ON BLACK BACKGROUND */}
        <div 
          ref={carRef}
          className="relative w-full flex items-center justify-center will-change-transform"
          style={{ transform: 'translateX(-130%)' }}
        >
          {/* Subtle soft shadow under car */}
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
            className="group px-8 py-3.5 rounded-full bg-white text-black font-clash font-bold text-sm tracking-wider uppercase flex items-center space-x-2.5 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:bg-red-600 hover:text-white hover:shadow-[0_0_35px_rgba(225,6,0,0.6)] transition-all duration-300 transform hover:scale-105"
            data-cursor="ENTER"
          >
            <span>CLICK TO OPEN PORTFOLIO</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            SCUDERIA AS-26 • TOUCH TO ENTER
          </span>
        </div>

      </div>

      {/* FOOTER PADDOCK BADGE */}
      <div className="w-full text-center z-20 font-mono text-[10px] text-slate-600">
        <span>MINIMAL AMBIENT AUDIO ACTIVE</span>
      </div>

    </div>
  );
}
