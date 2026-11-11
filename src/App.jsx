import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import FluidCanvas from './components/FluidCanvas';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import Works from './components/Works';
import Capabilities from './components/Capabilities';
import Trajectory from './components/Trajectory';
import Recognition from './components/Recognition';
import AboutSection from './components/AboutSection';
import FooterCTA from './components/FooterCTA';
import ProjectDetailModal from './components/ProjectDetailModal';
import ResumeModal from './components/ResumeModal';
import CarLaunchIntro from './components/CarLaunchIntro';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize Lenis Smooth Inertial Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // When Crazy F1 Car Launch finishes, reveal the Hero Portfolio directly (NO auto-resume popup!)
  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsResumeOpen(false); // Keeps user on the exciting Hero portfolio!
  };

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. HIGH-ADRENALINE F1 TURBO BURN & FLYBY LAUNCH INTRO */}
      {showIntro && (
        <CarLaunchIntro onComplete={handleIntroComplete} />
      )}

      {/* INTERACTIVE AMBIENT FLUID CANVAS BACKGROUND (F1 Red & Cyan Liquid Waves) */}
      <FluidCanvas />

      {/* CINEMATIC NOISE GRAIN OVERLAY */}
      <div className="fixed inset-0 z-30 grain-overlay pointer-events-none" />

      {/* ZERO-LATENCY HIGH-PRECISION F1 TELEMETRY CURSOR */}
      <CustomCursor />

      {/* FIXED FLOATING PITWALL HEADER */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* MAIN SECTIONS */}
      <main className="relative z-10">
        
        {/* HERO SECTION: MASSIVE CENTRAL CAR TELEMETRY HUD & TACHOMETER */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* HIGH-VELOCITY MARQUEE TICKER */}
        <MarqueeTicker />

        {/* PADDOCK BUILDS (70% VISUAL CHASSIS SPECIFICATIONS) */}
        <Works onSelectProject={(project) => setSelectedProject(project)} />

        {/* POWERTRAIN & COMPONENT MATRIX (70% VISUAL LIVE TELEMETRY TILES) */}
        <Capabilities />

        {/* RACE STRATEGY & CAREER LAPS (LEADERSHIP TIMELINE) */}
        <Trajectory />

        {/* CHAMPIONSHIP PODIUM STAND (3-STEP VISUAL PODIUM) */}
        <Recognition />

        {/* FIA DRIVER DOSSIER PASS (3D VISUAL PADDOCK PASS) */}
        <AboutSection />

        {/* PITWALL DIRECT RADIO COMMS (FOOTER CTA) */}
        <FooterCTA onOpenResume={() => setIsResumeOpen(true)} />

      </main>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 2. OFFICIAL FULL RESUME DOSSIER & EMBEDDED ORIGINAL PDF (SLIDES SMOOTHLY ON DEMAND) */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
