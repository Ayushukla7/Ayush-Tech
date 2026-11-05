import React, { useState } from 'react';
import { 
  projectsData, skillsData, experienceData, 
  achievementsData, aboutData, personalInfo 
} from '../data/portfolioData';
import { 
  FolderGit2, Code2, Briefcase, User, ExternalLink, 
  ChevronRight, Award, Trophy, Sparkles, Send, Copy, 
  Check, ShieldCheck, Mail, Phone, MapPin 
} from 'lucide-react';
import { playTacticalClick } from '../utils/audio';

// Visual preview icon generator for each project item (matching video screenshot)
const getProjectVisual = (id) => {
  switch (id) {
    case 'vaccitrack':
      return (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-400 p-[1.5px] shadow-[0_0_12px_rgba(6,182,212,0.35)] shrink-0">
          <div className="w-full h-full rounded-xl bg-[#121318] flex items-center justify-center font-orbitron font-bold text-sm text-cyan-300">
            VT
          </div>
        </div>
      );
    case 'workradar':
      return (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 p-[1.5px] shadow-[0_0_12px_rgba(239,68,68,0.35)] shrink-0">
          <div className="w-full h-full rounded-xl bg-[#121318] flex items-center justify-center font-orbitron font-bold text-sm text-amber-400">
            WR
          </div>
        </div>
      );
    case 'portfolio':
      return (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-400 p-[1.5px] shadow-[0_0_12px_rgba(59,130,246,0.35)] shrink-0">
          <div className="w-full h-full rounded-xl bg-[#121318] flex items-center justify-center font-orbitron font-bold text-sm text-blue-300">
            3D
          </div>
        </div>
      );
    case 'skillledger':
      return (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 p-[1.5px] shadow-[0_0_12px_rgba(168,85,247,0.35)] shrink-0">
          <div className="w-full h-full rounded-xl bg-[#121318] flex items-center justify-center font-orbitron font-bold text-sm text-purple-300">
            SL
          </div>
        </div>
      );
    default:
      return (
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shrink-0">
          <div className="w-full h-full rounded-xl bg-[#121318] flex items-center justify-center font-orbitron font-bold text-sm text-white">
            UI
          </div>
        </div>
      );
  }
};

export default function ProjectListCard({ onSelectProject }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'skills', 'experience', 'about'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    playTacticalClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    playTacticalClick();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#101115] border border-white/10 backdrop-blur-xl shadow-2xl p-5 sm:p-6 flex flex-col flex-1 overflow-hidden">
      
      {/* CARD HEADER & TAB SWITCHER (Exact title style from video) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-orbitron font-bold text-white tracking-tight">
            Latest projects
          </h2>
          <span className="text-[11px] font-mono text-slate-400">
            Engineering Shipments & Practical Solutions
          </span>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-[#17181f] border border-white/10 text-xs font-mono self-start sm:self-auto">
          <button
            onClick={() => { playTacticalClick(); setActiveTab('projects'); }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'projects'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => { playTacticalClick(); setActiveTab('skills'); }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'skills'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => { playTacticalClick(); setActiveTab('experience'); }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'experience'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => { playTacticalClick(); setActiveTab('about'); }}
            className={`px-3 py-1 rounded-lg transition-all ${
              activeTab === 'about'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            About
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-2">

        {/* 1. PROJECTS TAB (Matching reference screenshot project list) */}
        {activeTab === 'projects' && (
          <div className="space-y-2">
            {projectsData.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  playTacticalClick();
                  onSelectProject(project);
                }}
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  {/* App icon preview */}
                  {getProjectVisual(project.id)}

                  {/* Title & Subtitle */}
                  <div className="min-w-0">
                    <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-display truncate">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 pl-2">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Case study
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            {skillsData.map((cat) => (
              <div key={cat.category} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-cyan-300 uppercase">{cat.category}</span>
                  <span className="text-[10px] text-slate-500">{cat.description}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-lg bg-[#15161d] border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {skill.name} • <span className="text-slate-400 text-[10px]">{skill.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. LEADERSHIP & ACHIEVEMENTS TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            {/* National Hackathon Podium Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/30 space-y-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold">
                NATIONAL RANK 3 / 120+ TEAMS
              </span>
              <h4 className="font-orbitron font-bold text-sm text-white pt-1">
                National Hackathon 2nd Runner-Up (1st in Healthcare)
              </h4>
              <p className="text-xs text-slate-300">
                Awarded for VacciTrack immunization tracking platform with ABHA standards and 2FA.
              </p>
            </div>

            {/* Experience list */}
            {experienceData.map((exp, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-100 font-orbitron">
                    {exp.role} <span className="text-slate-500 font-normal">@</span> {exp.organization}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {exp.highlights.map((pt, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-cyan-400 mt-0.5">▹</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* 4. ABOUT & DIRECT CONTACT TAB */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <h4 className="font-orbitron font-bold text-sm text-white">
                Ayush Shukla
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-display">
                {aboutData.summary}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                <span className="bg-[#15161d] px-2 py-1 rounded border border-white/10 text-cyan-300">
                  ABES Engineering College
                </span>
                <span className="bg-[#15161d] px-2 py-1 rounded border border-white/10 text-amber-300">
                  B.Tech CSE (CGPA: 8.00)
                </span>
                <span className="bg-[#15161d] px-2 py-1 rounded border border-white/10 text-emerald-300">
                  250+ DSA Problems
                </span>
              </div>
            </div>

            {/* Contact quick actions */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold block">
                Direct Contact Telemetry
              </span>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#15161d] border border-white/10 text-xs font-mono">
                <span className="text-slate-300">{personalInfo.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors flex items-center space-x-1"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#15161d] border border-white/10 text-xs font-mono">
                <span className="text-slate-300">{personalInfo.phone}</span>
                <a
                  href={`tel:${personalInfo.phone}`}
                  onClick={playTacticalClick}
                  className="px-2 py-0.5 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
