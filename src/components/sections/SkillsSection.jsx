import React, { useState } from 'react';
import { skillsData } from '../../data/portfolioData';
import { 
  Code2, Layout, Server, Database, Terminal, 
  Cpu, Binary, Code, FileCode2, Palette, FileJson, 
  Atom, Workflow, GitBranch, Github, Layers, Sparkles 
} from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

// Helper to render icon by name
const renderSkillIcon = (iconName) => {
  switch (iconName) {
    case 'FileCode2': return <FileCode2 className="w-4 h-4 text-cyan-400" />;
    case 'Cpu': return <Cpu className="w-4 h-4 text-amber-400" />;
    case 'Binary': return <Binary className="w-4 h-4 text-emerald-400" />;
    case 'Code': return <Code className="w-4 h-4 text-blue-400" />;
    case 'Layout': return <Layout className="w-4 h-4 text-orange-400" />;
    case 'Palette': return <Palette className="w-4 h-4 text-cyan-400" />;
    case 'FileJson': return <FileJson className="w-4 h-4 text-yellow-400" />;
    case 'Atom': return <Atom className="w-4 h-4 text-cyan-400" />;
    case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
    case 'Workflow': return <Workflow className="w-4 h-4 text-green-400" />;
    case 'Database': return <Database className="w-4 h-4 text-blue-400" />;
    case 'GitBranch': return <GitBranch className="w-4 h-4 text-red-400" />;
    case 'Github': return <Github className="w-4 h-4 text-purple-400" />;
    case 'Terminal': return <Terminal className="w-4 h-4 text-cyan-400" />;
    default: return <Code2 className="w-4 h-4 text-cyan-400" />;
  }
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', ...skillsData.map(c => c.category)];

  const displayedGroups = activeCategory === 'ALL' 
    ? skillsData 
    : skillsData.filter(c => c.category === activeCategory);

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              02 // TECHNICAL MATRIX
            </span>
            <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
              Technical Skills
            </h2>
            <p className="text-sm text-slate-400 font-display max-w-xl">
              Verified technical competencies categorized across programming, frontend engineering, backend services, databases, and developer tooling.
            </p>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-space-950/80 border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playTacticalClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_10px_rgba(0,242,254,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-space-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SKILLS DISPLAY GRID */}
        <div className="space-y-8">
          {displayedGroups.map((group) => (
            <div key={group.category} className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="font-orbitron font-bold text-lg text-white">
                  {group.category}
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  — {group.description}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group p-4 rounded-2xl bg-space-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-space-950 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                          {renderSkillIcon(skill.icon)}
                        </div>
                        <span className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {skill.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-mono leading-normal pt-1">
                      {skill.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
