import React, { useState, useEffect } from 'react';
import EarthCanvas from './components/EarthCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ContactSection from './components/sections/ContactSection';
import ResumeModal from './components/ResumeModal';
import { personalInfo } from './data/portfolioData';
import { Orbit, Compass, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { playTacticalClick } from './utils/audio';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isInOrbitMode, setIsInOrbitMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Escape') {
        if (isResumeOpen) setIsResumeOpen(false);
        else if (isInOrbitMode) setIsInOrbitMode(false);
        else if (!introCompleted) setIntroCompleted(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeOpen, isInOrbitMode, introCompleted]);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
  };

  const handleReplayIntro = () => {
    playTacticalClick();
    setIntroCompleted(false);
    setIsInOrbitMode(false);
  };

  const scrollTo = (id) => {
    playTacticalClick();
    setIsInOrbitMode(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 font-display selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      
      {/* 3D EARTH WEBGL CANVAS (Fixed background or Fullscreen Orbit) */}
      <div 
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${
          isInOrbitMode ? 'opacity-100 pointer-events-auto' : 'opacity-85 pointer-events-none'
        }`}
      >
        <EarthCanvas
          introCompleted={introCompleted}
          onIntroComplete={handleIntroComplete}
          isInOrbitMode={isInOrbitMode}
          onToggleOrbitMode={() => setIsInOrbitMode(!isInOrbitMode)}
        />
      </div>

      {/* BACKGROUND COSMIC SCANLINES */}
      <div className="fixed inset-0 pointer-events-none z-10 scanlines opacity-30" />

      {/* FLOATING HUD NAVIGATION */}
      {introCompleted && (
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          isInOrbitMode={isInOrbitMode}
          onToggleOrbitMode={() => setIsInOrbitMode(!isInOrbitMode)}
          onReplayIntro={handleReplayIntro}
        />
      )}

      {/* MAIN PORTFOLIO CONTENT (Scrollable over ambient 3D Earth) */}
      {introCompleted && (
        <main 
          className={`relative z-20 transition-opacity duration-500 ${
            isInOrbitMode ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {/* 1. HERO SECTION */}
          <HeroSection
            onOpenResume={() => setIsResumeOpen(true)}
            onExploreProjects={() => scrollTo('projects')}
            onContactClick={() => scrollTo('contact')}
          />

          {/* 2. ABOUT ME */}
          <AboutSection />

          {/* 3. TECHNICAL SKILLS */}
          <SkillsSection />

          {/* 4. FEATURED PROJECTS */}
          <ProjectsSection />

          {/* 5. EXPERIENCE & LEADERSHIP */}
          <ExperienceSection />

          {/* 6. ACHIEVEMENTS */}
          <AchievementsSection />

          {/* 7. CONTACT AREA */}
          <ContactSection onOpenResume={() => setIsResumeOpen(true)} />

          {/* FOOTER */}
          <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-space-950/80 backdrop-blur-md text-xs font-mono text-slate-400">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                <span className="font-orbitron font-bold text-slate-200">AYUSH SHUKLA</span>
                <span>— DIGITAL IDENTITY // 2026</span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => scrollTo('home')}
                  className="flex items-center space-x-1 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>BACK TO ORBIT</span>
                </button>
                <span>•</span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* OFFICIAL RESUME MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
