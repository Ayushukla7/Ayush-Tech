import React, { useState } from 'react';
import Badge3D from './components/Badge3D';
import SocialHexGrid from './components/SocialHexGrid';
import ProjectListCard from './components/ProjectListCard';
import ProjectDetailModal from './components/ProjectDetailModal';
import ResumeModal from './components/ResumeModal';
import { personalInfo } from './data/portfolioData';
import { FileText, Volume2, VolumeX, Sparkles, Orbit } from 'lucide-react';
import { toggleAudio, isMuted, playTacticalClick } from './utils/audio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(!isMuted());

  const handleAudioToggle = () => {
    const active = toggleAudio();
    setAudioActive(active);
  };

  return (
    <div className="relative min-h-screen bg-[#060709] text-slate-100 flex flex-col justify-between p-3 sm:p-6 lg:p-8 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* VIBRANT AMBIENT AURORA GLOW (Exact gradient from the video screenshot!) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left emerald/cyan aurora blur */}
        <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-emerald-500/20 rounded-full blur-[140px]" />
        {/* Top-center royal blue blur */}
        <div className="absolute top-10 left-1/3 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[160px]" />
        {/* Right / bottom-right vibrant magenta/coral glow */}
        <div className="absolute -bottom-32 -right-32 w-[38rem] h-[38rem] bg-gradient-to-tr from-pink-500/25 to-purple-600/25 rounded-full blur-[150px]" />
      </div>

      {/* TOP HEADER BAR */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between py-2 px-1">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[1.5px] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <div className="w-full h-full rounded-xl bg-[#090a0f] flex items-center justify-center font-orbitron font-bold text-xs text-cyan-300">
              AS
            </div>
          </div>
          <div>
            <div className="font-orbitron font-bold text-sm tracking-wide text-white">
              AYUSH SHUKLA
            </div>
            <div className="text-[10px] font-mono text-cyan-400">
              Full-Stack Software Engineer • CSE @ ABESEC
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Resume Modal Button */}
          <button
            onClick={() => { playTacticalClick(); setIsResumeOpen(true); }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">OFFICIAL RESUME</span>
          </button>

          {/* Web Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-xl border transition-all ${
              audioActive
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={audioActive ? "Mute Web Audio SFX" : "Enable Web Audio SFX"}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN BENTO GRID CONTAINER (Matching the exact video screenshot!) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto my-auto py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* LEFT COLUMN (6 COLS): 3D Digital ID Pass Card with cross-grid */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0f1014] border border-white/10 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden cross-grid">
            <Badge3D />
          </div>

          {/* RIGHT COLUMN (6 COLS): Social Hexagon Grid on Top + Latest Projects on Bottom */}
          <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
            
            {/* Top Right Card: Honeycomb / Circular Social Grid */}
            <SocialHexGrid
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenContact={() => {}}
            />

            {/* Bottom Right Card: Latest Projects & Engineering Showcase */}
            <ProjectListCard
              onSelectProject={(project) => setSelectedProject(project)}
            />

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between py-2 px-1 text-[11px] font-mono text-slate-500 gap-2">
        <div>
          © 2026 Ayush Shukla • Built with 3D WebGL, React & Tailwind CSS
        </div>
        <div className="flex items-center space-x-3 text-slate-400">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            github.com/{personalInfo.githubUsername}
          </a>
          <span>•</span>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
            linkedin.com/in/{personalInfo.linkedinHandle}
          </a>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* OFFICIAL RESUME MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
