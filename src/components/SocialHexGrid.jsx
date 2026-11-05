import React from 'react';
import { 
  Github, Linkedin, Globe, FileText, Mail, 
  Code2, Sparkles, Send, Award, Compass 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick } from '../utils/audio';

export default function SocialHexGrid({ onOpenResume, onOpenContact }) {
  const links = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: personalInfo.linkedin,
      icon: <Linkedin className="w-5 h-5 text-blue-400" />,
      color: 'hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]'
    },
    {
      id: 'github',
      label: 'GitHub',
      href: personalInfo.github,
      icon: <Github className="w-5 h-5 text-slate-100" />,
      color: 'hover:border-slate-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]'
    },
    {
      id: 'portfolio',
      label: 'Live Web',
      href: personalInfo.portfolio,
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      color: 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.35)]'
    },
    {
      id: 'resume',
      label: 'Resume',
      onClick: onOpenResume,
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      color: 'hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]'
    },
    {
      id: 'contact',
      label: 'Email',
      href: `mailto:${personalInfo.email}`,
      icon: <Mail className="w-5 h-5 text-purple-400" />,
      color: 'hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]'
    },
    {
      id: 'dsa',
      label: '250+ DSA',
      href: personalInfo.github,
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      color: 'hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]'
    }
  ];

  return (
    <div className="relative w-full p-5 sm:p-6 rounded-3xl bg-[#101115] border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center">
      
      {/* Top subtle label */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3 px-1">
        <span className="flex items-center space-x-1.5 text-cyan-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>CONNECT & CHANNELS</span>
        </span>
        <span className="text-slate-500">AS // DEV</span>
      </div>

      {/* Hexagonal / Circular Link Grid matching the reference screenshot */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 w-full py-2">
        {links.map((item) => {
          const content = (
            <div className="relative flex flex-col items-center group">
              <div 
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#17181f] border border-white/10 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 ${item.color}`}
              >
                {item.icon}
              </div>
              <span className="mt-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.id}
                onClick={() => { playTacticalClick(); item.onClick(); }}
                className="focus:outline-none"
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="focus:outline-none"
            >
              {content}
            </a>
          );
        })}
      </div>

    </div>
  );
}
