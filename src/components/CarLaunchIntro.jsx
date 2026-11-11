import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playCrazyLaunchFX, playTelemetryBlip } from '../utils/audio';
import { FastForward, Gauge, Zap } from 'lucide-react';

export default function CarLaunchIntro({ onComplete }) {
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState('N');
  const [shiftLights, setShiftLights] = useState(0); // 0 to 10
  const containerRef = useRef(null);
  const carWrapperRef = useRef(null);
  const headlightsRef = useRef(null);
  const screenShakeRef = useRef(null);
  const intervalRef = useRef(null);

  // Trigger launch sequence
  const startCrazyLaunch = () => {
    if (started) return;
    setStarted(true);

    // Audio effects: Starter motor crank, twin-turbo spool whistle, and V6 roar!
    playCrazyLaunchFX();

    // Stage 1: Headlights blaze through the darkness
    gsap.to(headlightsRef.current, {
      opacity: 1,
      scale: 1.4,
      duration: 0.35,
      ease: 'power4.out',
    });

    // Stage 2: F1 RPM Shift lights ignite sequentially
    let lightCount = 0;
    const lightInterval = setInterval(() => {
      lightCount++;
      setShiftLights(lightCount);
      playTelemetryBlip(lightCount * 120);
      if (lightCount >= 10) clearInterval(lightInterval);
    }, 80);

    // Stage 3: Speedometer violently spikes & gear shifts
    setTimeout(() => {
      setGear('1');
      let currentSpeed = 0;
      intervalRef.current = setInterval(() => {
        currentSpeed += 24;
        if (currentSpeed > 360) {
          currentSpeed = 360;
          clearInterval(intervalRef.current);
        }
        setSpeed(currentSpeed);
        if (currentSpeed > 80 && currentSpeed < 180) setGear('4');
        if (currentSpeed >= 180 && currentSpeed < 280) setGear('6');
        if (currentSpeed >= 280) setGear('8');
      }, 35);
    }, 400);

    // Stage 4: Violent screen shake & F1 Car Hypersonic Flyby
    setTimeout(() => {
      // Screen shake timeline
      gsap.to(screenShakeRef.current, {
        x: '+=12',
        y: '-=8',
        repeat: 14,
        yoyo: true,
        duration: 0.04,
        ease: 'none',
      });

      // Car zooms past camera with motion blur
      gsap.fromTo(carWrapperRef.current,
        { x: '-130%', scale: 0.7, opacity: 0 },
        {
          x: '140%',
          scale: 1.15,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.in',
          onComplete: () => {
            // Flash wipe screen and transition straight to Hero!
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.05,
              duration: 0.45,
              ease: 'power2.out',
              onComplete: () => {
                if (onComplete) onComplete();
              }
            });
          }
        }
      );
    }, 600);
  };

  // Auto trigger launch after brief delay if user doesn't click immediately
  useEffect(() => {
    const autoTimer = setTimeout(() => {
      startCrazyLaunch();
    }, 700);

    return () => {
      clearTimeout(autoTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSkip = (e) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (onComplete) onComplete();
  };

  return (
    <div 
      ref={containerRef}
      onClick={startCrazyLaunch}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between py-6 px-4 overflow-hidden select-none cursor-pointer"
    >
      <div ref={screenShakeRef} className="w-full h-full flex flex-col items-center justify-between relative">
        
        {/* TOP STATUS BAR & SKIP BUTTON */}
        <div className="w-full max-w-6xl flex justify-between items-center z-30 font-mono text-xs">
          <div className="flex items-center space-x-2 text-red-500 font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>F1 TURBO IGNITION // AYUSH SHUKLA</span>
          </div>

          <button
            onClick={handleSkip}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-all"
            data-cursor="SKIP"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CENTER STAGE: XENON HEADLIGHTS, RPM SHIFT LIGHTS & CAR FLYBY */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-5xl flex-1 flex flex-col items-center justify-center">
          
          {/* F1 STEERING WHEEL RPM SHIFT LIGHTS (10 LEDS) */}
          <div className="flex items-center space-x-2 sm:space-x-3 mb-6 p-2 rounded-xl bg-dark-950/80 border border-white/10 shadow-2xl z-20">
            {[...Array(10)].map((_, i) => {
              const isLit = shiftLights > i;
              let colorClass = 'bg-emerald-500 shadow-[0_0_15px_#10b981]';
              if (i >= 4 && i < 7) colorClass = 'bg-yellow-400 shadow-[0_0_15px_#facc15]';
              if (i >= 7 && i < 9) colorClass = 'bg-red-500 shadow-[0_0_20px_#ef4444]';
              if (i >= 9) colorClass = 'bg-purple-500 shadow-[0_0_25px_#a855f7]';

              return (
                <div 
                  key={i} 
                  className={`w-3.5 h-5 sm:w-5 sm:h-7 rounded-sm border transition-all duration-75 ${
                    isLit 
                      ? `${colorClass} border-white` 
                      : 'bg-white/5 border-white/10'
                  }`}
                />
              );
            })}
          </div>

          {/* DUAL XENON HEADLIGHTS FLARE EFFECT */}
          <div 
            ref={headlightsRef}
            className="absolute flex items-center justify-center space-x-44 pointer-events-none opacity-0 transition-opacity"
          >
            <div className="w-36 h-36 rounded-full bg-cyan-300/40 blur-[45px] shadow-[0_0_80px_#00f2fe]" />
            <div className="w-36 h-36 rounded-full bg-cyan-300/40 blur-[45px] shadow-[0_0_80px_#00f2fe]" />
          </div>

          {/* TELEMETRY HUD OVERLAY (SPEED + GEAR + RPM REDLINE) */}
          <div className="flex flex-col items-center space-y-2 font-mono z-20 mb-4">
            <div className="flex items-center space-x-4">
              <div className="px-5 py-2.5 rounded-xl bg-black/90 border border-white/20 flex items-center space-x-2 shadow-2xl">
                <span className="text-xs text-slate-400">VELOCITY</span>
                <span className="text-3xl sm:text-5xl font-clash font-extrabold text-white tracking-tight">{speed}</span>
                <span className="text-xs text-red-500 font-bold">KM/H</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-red-600/30 border border-red-500/50 text-red-400 font-bold text-lg sm:text-xl">
                GEAR {gear}
              </div>
            </div>

            <div className="text-[11px] font-bold tracking-widest uppercase text-slate-400">
              {started ? '★ FULL THROTTLE // REDLINE 15,000 RPM ★' : 'CLICK ANYWHERE TO IGNITE V6 TURBO'}
            </div>
          </div>

          {/* ASPHALT HIGHWAY RUNWAY & HYPERSONIC F1 FLYBY */}
          <div className="relative w-full h-44 sm:h-56 flex items-center justify-center overflow-hidden">
            
            {/* Speed streaks & track grid */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

            {/* FLYING F1 CAR */}
            <div 
              ref={carWrapperRef}
              className="absolute flex items-center justify-center will-change-transform z-10"
              style={{ transform: 'translateX(-130%)' }}
            >
              {/* Afterburner flame trail */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-72 h-8 bg-gradient-to-l from-red-600 via-orange-500 to-transparent blur-md rounded-full pointer-events-none" />
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-48 h-3 bg-gradient-to-l from-cyan-400 to-transparent blur-[2px] pointer-events-none" />

              <img 
                src="/f1-horizontal.jpg" 
                alt="F1 Turbo Launch" 
                className="w-[340px] sm:w-[480px] md:w-[620px] h-auto object-contain filter drop-shadow-[0_20px_45px_rgba(225,6,0,0.8)] select-none pointer-events-none"
              />
            </div>

          </div>

        </div>

        {/* BOTTOM PROMPT */}
        <div className="w-full text-center z-30 font-mono text-[11px] text-slate-500">
          <span>ENTERING SCUDERIA AS-26 PADDOCK • INITIALIZING HIGH-VELOCITY SYSTEMS</span>
        </div>

      </div>
    </div>
  );
}
