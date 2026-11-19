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
import FooterCTA from './components/FooterCTA';
import ProjectDetailModal from './components/ProjectDetailModal';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize Lenis Smooth Inertial Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
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
    <div className="relative min-h-screen bg-acid-dark text-acid-paper font-space selection:bg-acid-lime selection:text-black overflow-x-hidden">
      
      {/* INTERACTIVE AMBIENT FLUID CANVAS BACKGROUND (Subtle Lime Acid Glow) */}
      <FluidCanvas />

      {/* CINEMATIC DISTRESSED GRAIN OVERLAY */}
      <div className="fixed inset-0 z-30 grain-overlay pointer-events-none" />

      {/* ACID BRUTAL CUSTOM CURSOR */}
      <CustomCursor />

      {/* TOP BRUTALIST POSTER HEADER */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* MAIN POSTER SECTIONS */}
      <main className="relative z-10">
        
        {/* HERO SECTION: GIANT CONDENSED AYUSH SHUKLA TYPOGRAPHY & AVATAR DISC */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* HIGH-IMPACT POSTER TICKER */}
        <MarqueeTicker />

        {/* 2-COLUMN WORKS: SELECTED PROJECTS (LEFT) + PROCESS NOTES (RIGHT) */}
        <Works onSelectProject={(project) => setSelectedProject(project)} />

        {/* 3-BOX ROW: SKILLS MATRIX HEATMAP + PHILOSOPHY QUOTE + SOLID ACID LIME TOOLS */}
        <Capabilities />

        {/* CAREER TRAJECTORY & HONORS LEDGER */}
        <Trajectory />

        {/* GIANT FOOTER: LET'S CREATE SOMETHING REAL + WORK TOGETHER */}
        <FooterCTA onOpenResume={() => setIsResumeOpen(true)} />

      </main>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* OFFICIAL FULL RESUME DOSSIER */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
