import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  playRealF1EngineSound, 
  stopRealF1EngineSound, 
  playF1LaunchRoar,
  unlockAudio,
  isMuted
} from '../utils/audio';

export default function CarLaunchIntro({ onComplete }) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const speedLinesRef = useRef(null);
  const promptRef = useRef(null);
  const timelineRef = useRef(null);

  // Starts the synchronized sound + car motion sequence
  const startSequence = () => {
    if (hasStarted) return;
    setHasStarted(true);
    setIsRunning(true);

    unlockAudio();
    playRealF1EngineSound(0.22);

    // Fade out any prompt immediately
    if (promptRef.current) {
      gsap.to(promptRef.current, { opacity: 0, duration: 0.3 });
    }

    // Master animation timeline: Sound starts -> Car enters -> Glides -> Roars out with end sound -> Resume opens
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out screen cleanly as car exits
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            stopRealF1EngineSound();
            if (onComplete) onComplete();
          }
        });
      }
    });

    timelineRef.current = tl;

    // 1. CAR ENTERS with initial engine sound (0.0s to 1.7s)
    tl.fromTo(carRef.current,
      { x: '-140%', opacity: 0.7, scale: 0.98 },
      { x: '0%', opacity: 1, scale: 1, duration: 1.7, ease: 'power2.out' }
    );

    // 2. SPEED STREAKS illuminate subtly across the black background
    if (speedLinesRef.current) {
      tl.fromTo(speedLinesRef.current,
        { opacity: 0 },
        { opacity: 0.25, duration: 0.6, ease: 'sine.inOut' },
        '-=1.2'
      );
    }

    // 3. BRIEF HIGH-VELOCITY GLIDE IN CENTER (1.7s to 2.3s)
    tl.to(carRef.current, {
      y: '-=4',
      duration: 0.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1
    });

    // 4. ENGINE THROTTLES UP & CAR ACCELERATES OUT with end sound (2.3s to 3.3s)
    tl.call(() => {
      playF1LaunchRoar();
    });

    tl.to(carRef.current, {
      x: '150%',
      opacity: 1,
      scale: 1.02,
      duration: 1.0,
      ease: 'power3.in'
    }, '+=0.1');

    if (speedLinesRef.current) {
      tl.to(speedLinesRef.current, {
        opacity: 0,
        duration: 0.4
      }, '-=0.6');
    }
  };

  useEffect(() => {
    // Attempt automatic start
    let autoTimer = setTimeout(() => {
      startSequence();
    }, 200);

    return () => {
      clearTimeout(autoTimer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      stopRealF1EngineSound();
    };
  }, []);

  // Screen click handler: if not started, starts immediately; if running, clicking skips directly to resume
  const handleScreenClick = () => {
    if (!hasStarted) {
      startSequence();
    } else {
      // User tapped while running -> quick skip directly into resume
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      stopRealF1EngineSound();
      if (onComplete) onComplete();
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleScreenClick}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none cursor-pointer"
    >
      {/* MINIMAL TOP TELEMETRY HEADER */}
      <div className="w-full max-w-6xl flex justify-between items-center z-20 font-mono text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] text-slate-400 font-semibold tracking-[0.2em] uppercase">
            SCUDERIA AS-26 // AYUSH SHUKLA
          </span>
        </div>

        <span className="text-[10px] text-slate-600 tracking-widest uppercase font-mono">
          HIGH-VELOCITY TELEMETRY
        </span>
      </div>

      {/* CENTER STAGE: CAR GLIDES IN & ACCELERATES OUT */}
      <div className="relative w-full max-w-5xl flex items-center justify-center my-auto">
        
        {/* Subtle Horizontal Speed Streaks */}
        <div 
          ref={speedLinesRef}
          className="absolute inset-0 flex flex-col justify-around opacity-0 pointer-events-none"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="w-5/6 mx-auto h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        </div>

        {/* PRISTINE F1 RACING CAR */}
        <div 
          ref={carRef}
          className="relative w-full flex items-center justify-center will-change-transform"
          style={{ transform: 'translateX(-140%)' }}
        >
          {/* Aero ground shadow */}
          <div className="absolute inset-x-20 bottom-3 h-6 bg-black/95 blur-md pointer-events-none" />

          {/* Clean Solid Cutout (Zero Box, Solid Tires & Carbon Body) */}
          <img 
            src="/f1-car-transparent.png" 
            alt="Formula 1 High-Performance Chassis" 
            className="w-full max-w-3xl sm:max-w-4xl h-auto object-contain pointer-events-none select-none filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          />
        </div>

      </div>

      {/* MINIMAL ELEGANT PROMPT IF USER GESTURE NEEDED BY BROWSER */}
      <div 
        ref={promptRef}
        className="w-full text-center z-20 font-mono text-[11px] text-slate-400 transition-opacity"
      >
        <span className="tracking-[0.25em] uppercase text-slate-400 hover:text-white transition-colors">
          [ TOUCH SCREEN TO LAUNCH ]
        </span>
      </div>

    </div>
  );
}
