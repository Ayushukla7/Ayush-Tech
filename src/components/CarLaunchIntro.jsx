import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { playEngineRev, playRadioBeep, playTelemetryBlip } from '../utils/audio';
import { FastForward, Gauge, Zap } from 'lucide-react';

export default function CarLaunchIntro({ onComplete }) {
  const [lightsCount, setLightsCount] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [launchText, setLaunchText] = useState('SYSTEM CHECK // TELEMETRY INITIALIZING');
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const speedIntervalRef = useRef(null);

  useEffect(() => {
    let timer1, timer2, timer3, timer4, timer5, timerOut, timerCar;

    // Sequence of 5 red F1 starting lights
    timer1 = setTimeout(() => { setLightsCount(1); playTelemetryBlip(100); }, 400);
    timer2 = setTimeout(() => { setLightsCount(2); playTelemetryBlip(200); }, 800);
    timer3 = setTimeout(() => { setLightsCount(3); playTelemetryBlip(300); }, 1200);
    timer4 = setTimeout(() => { setLightsCount(4); playTelemetryBlip(400); }, 1600);
    timer5 = setTimeout(() => { setLightsCount(5); playTelemetryBlip(500); setLaunchText('ENGINE SPOOLING // FULL THROTTLE'); }, 2000);

    // Lights out & launch!
    timerOut = setTimeout(() => {
      setLightsOut(true);
      setLaunchText('LIGHTS OUT & AWAY WE GO!');
      playRadioBeep();
      playEngineRev();

      // Animate speed meter from 0 to 352 KM/H
      let currentSpeed = 0;
      speedIntervalRef.current = setInterval(() => {
        currentSpeed += 14;
        if (currentSpeed >= 352) {
          currentSpeed = 352;
          clearInterval(speedIntervalRef.current);
        }
        setSpeed(currentSpeed);
      }, 40);

      // Animate car speeding across black screen
      if (carRef.current) {
        gsap.fromTo(carRef.current, 
          { x: '-120%', opacity: 0, scale: 0.8 },
          { 
            x: '140%', 
            opacity: 1, 
            scale: 1.05, 
            duration: 1.6, 
            ease: 'power3.in',
            onComplete: () => {
              // Fade out intro and reveal resume
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                  if (onComplete) onComplete();
                }
              });
            }
          }
        );
      }
    }, 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timerOut);
      clearTimeout(timerCar);
      if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    if (onComplete) onComplete();
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between py-8 px-4 overflow-hidden select-none"
    >
      {/* SKIP INTRO BUTTON */}
      <div className="w-full max-w-6xl flex justify-between items-center z-30 font-mono text-xs">
        <div className="flex items-center space-x-2 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>F1 LAUNCH PROTOCOL // AYUSH SHUKLA</span>
        </div>

        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTER STAGE: F1 STARTING LIGHTS & CAR RUN */}
      <div className="relative w-full max-w-5xl flex-1 flex flex-col items-center justify-center">
        
        {/* F1 GANTRY STARTING LIGHTS */}
        <div className="flex flex-col items-center space-y-4 mb-6 z-20">
          <div className="px-6 py-3 rounded-2xl bg-dark-900 border-2 border-white/20 flex items-center space-x-4 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
            {[1, 2, 3, 4, 5].map((lightIdx) => {
              const isOn = !lightsOut && lightsCount >= lightIdx;
              return (
                <div key={lightIdx} className="flex flex-col items-center space-y-1">
                  <div 
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-150 ${
                      isOn 
                        ? 'bg-red-600 border-red-400 shadow-[0_0_25px_#ef4444] scale-110' 
                        : lightsOut
                          ? 'bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-black/80 border-white/20'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-slate-600">0{lightIdx}</span>
                </div>
              );
            })}
          </div>

          <div className={`font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
            lightsOut ? 'text-emerald-400 animate-pulse text-sm' : 'text-slate-400'
          }`}>
            {launchText}
          </div>
        </div>

        {/* SPEED READOUT & TACHOMETER */}
        <div className="flex items-center space-x-4 font-mono z-20 mb-8">
          <div className="px-4 py-2 rounded-xl bg-dark-900/80 border border-white/15 flex items-center space-x-2">
            <span className="text-xs text-slate-400">TELEMETRY VELOCITY:</span>
            <span className="text-2xl sm:text-3xl font-clash font-extrabold text-white">{speed}</span>
            <span className="text-xs text-red-500 font-bold">KM/H</span>
          </div>
          {lightsOut && (
            <span className="px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold animate-pulse">
              FULL THROTTLE
            </span>
          )}
        </div>

        {/* SPEED TRACK RUNWAY (BLACK SCREEN WITH RETROFITTED ASPHALT SPEED LINES) */}
        <div className="relative w-full h-44 sm:h-52 flex items-center justify-center overflow-hidden">
          
          {/* SPEED STREAKS / RACING TRACK LINES */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* THE F1 CAR RUNNING ACROSS BLACK SCREEN */}
          <div 
            ref={carRef}
            className="absolute flex items-center justify-center will-change-transform"
            style={{ transform: 'translateX(-120%)' }}
          >
            {/* Speed Light Trails */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-48 h-6 bg-gradient-to-l from-red-600 to-transparent blur-sm rounded-full pointer-events-none" />
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 h-2 bg-gradient-to-l from-white to-transparent blur-[1px] pointer-events-none" />

            <img 
              src="/f1-horizontal.jpg" 
              alt="F1 Car Accelerating Across Screen" 
              className="w-[320px] sm:w-[460px] md:w-[580px] h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(225,6,0,0.6)] select-none pointer-events-none"
            />
          </div>

        </div>

      </div>

      {/* FOOTER NOTICE */}
      <div className="w-full text-center z-30 font-mono text-[11px] text-slate-500">
        <span>INITIALIZING CHASSIS AS-2026 // OPENING OFFICIAL RESUME DOSSIER</span>
      </div>

    </div>
  );
}
