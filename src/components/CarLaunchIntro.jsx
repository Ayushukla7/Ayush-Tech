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
  const [hasStarted, setHasStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(6);
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    setHasStarted(true);
    unlockAudio();
    playRealF1EngineSound(0.25);

    // 1. CAR GLIDES INTO DEAD CENTER (1.4s)
    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.fromTo(carRef.current,
      { x: '-135%', opacity: 0 },
      { 
        x: '0%', 
        opacity: 1, 
        duration: 1.4, 
        ease: 'power2.out',
        onComplete: () => {
          // Subtle gentle float animation during 6s pause
          gsap.to(carRef.current, {
            y: '-=3',
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }
    );

    // Countdown timer for the 6 seconds pause
    let remaining = 6;
    const interval = setInterval(() => {
      remaining -= 1;
      setSecondsLeft(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // 2. WAIT 6 FULL SECONDS IN CENTER WHILE ENGINE SOUND REVS
    // 3. AS SOUND IS ABOUT TO FINISH, CAR ACCELERATES & ROARS OUT
    const exitTimer = setTimeout(() => {
      // Fire launch throttle roar right as car exits
      playF1LaunchRoar();

      if (carRef.current) {
        gsap.to(carRef.current, {
          x: '150%',
          opacity: 1,
          scale: 1.02,
          duration: 0.95,
          ease: 'power3.in'
        });
      }

      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            stopRealF1EngineSound();
            if (onComplete) onComplete();
          }
        });
      }
    }, 7400); // 1.4s entry + 6.0s pause = 7.4s total sequence

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      if (timelineRef.current) timelineRef.current.kill();
      stopRealF1EngineSound();
    };
  }, []);

  // Quick skip option if user taps or wants to enter immediately
  const handleQuickSkip = () => {
    stopRealF1EngineSound();
    if (onComplete) onComplete();
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none"
    >
      {/* TOP TELEMETRY STATUS */}
      <div className="w-full max-w-6xl flex justify-between items-center z-20 font-mono text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[11px] text-slate-300 font-semibold tracking-[0.2em] uppercase">
            SCUDERIA AS-26 // AYUSH SHUKLA
          </span>
        </div>

        <button
          onClick={handleQuickSkip}
          className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-400 hover:text-white text-[10px] tracking-wider uppercase transition-all"
        >
          SKIP TO PORTFOLIO →
        </button>
      </div>

      {/* CENTER STAGE: CAR RESTS FOR 6 SECONDS IN CENTER & HEARS SOUND */}
      <div className="relative w-full max-w-5xl flex items-center justify-center my-auto">
        
        {/* PRISTINE F1 RACING CAR */}
        <div 
          ref={carRef}
          className="relative w-full flex items-center justify-center will-change-transform"
          style={{ transform: 'translateX(-135%)' }}
        >
          {/* Aero ground shadow */}
          <div className="absolute inset-x-20 bottom-3 h-6 bg-black/95 blur-md pointer-events-none" />

          {/* Clean Solid Cutout with Radial Gradient Mask for Seamless Borderless Blend */}
          <img 
            src="/f1-car-transparent.png" 
            alt="Formula 1 High-Performance Chassis" 
            className="w-full max-w-3xl sm:max-w-4xl h-auto object-contain pointer-events-none select-none filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] [mask-image:radial-gradient(ellipse_94%_84%_at_50%_45%,black_75%,transparent_100%)]"
          />
        </div>

      </div>

      {/* FOOTER SEQUENCE STATUS & 6-SECOND TIMER */}
      <div className="w-full text-center z-20 font-mono text-[11px] text-slate-500 flex items-center justify-center space-x-3">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="tracking-[0.2em] uppercase">
          F1 V8 ENGINE SEQUENCE {secondsLeft > 0 ? `// LAUNCH IN ${secondsLeft}S` : '// ACCELERATING...'}
        </span>
      </div>

    </div>
  );
}
