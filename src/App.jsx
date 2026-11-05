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

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize Lenis Smooth Inertial Scrolling (Trionn award-winning smooth scroll)
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

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 font-sans selection:bg-cyan-400 selection:text-black">
      
      {/* INTERACTIVE AMBIENT FLUID CANVAS BACKGROUND (Liquid Cursor Waves) */}
      <FluidCanvas />

      {/* TRIONN CINEMATIC NOISE GRAIN OVERLAY */}
      <div className="fixed inset-0 z-30 grain-overlay pointer-events-none" />

      {/* CUSTOM TRAILING CURSOR */}
      <CustomCursor />

      {/* FIXED FLOATING HEADER */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* MAIN SECTIONS */}
      <main className="relative z-10">
        
        {/* HERO SECTION WITH ENTRANCE TIMELINE */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* KINETIC MARQUEE TYPOGRAPHY TICKER */}
        <MarqueeTicker />

        {/* SELECTED WORKS (04) WITH 3D TILT CARDS */}
        <Works onSelectProject={(project) => setSelectedProject(project)} />

        {/* CAPABILITIES / TECHNICAL MATRIX */}
        <Capabilities />

        {/* TRAJECTORY / LEADERSHIP & EXPERIENCE */}
        <Trajectory />

        {/* RECOGNITION & AWARDS */}
        <Recognition />

        {/* ABOUT & PHILOSOPHY */}
        <AboutSection />

        {/* FOOTER CTA & CONTACT */}
        <FooterCTA onOpenResume={() => setIsResumeOpen(true)} />

      </main>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* PRINTABLE OFFICIAL RESUME DOSSIER */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
