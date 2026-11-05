import React from 'react';
import { achievementsData } from '../../data/portfolioData';
import { Trophy, Award, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { playTacticalClick } from '../../utils/audio';

const renderAchievementIcon = (iconName) => {
  switch (iconName) {
    case 'Trophy': return <Trophy className="w-5 h-5 text-amber-400" />;
    case 'Award': return <Award className="w-5 h-5 text-cyan-400" />;
    case 'Star': return <Star className="w-5 h-5 text-yellow-400" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
    default: return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  }
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            05 // HONORS & RECOGNITION
          </span>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white">
            Key Achievements
          </h2>
          <p className="text-sm text-slate-400 font-display max-w-xl">
            National hackathon podiums, healthcare innovation crowns, competitive algorithmic certifications, and engineering finals.
          </p>
        </div>

        {/* ACHIEVEMENTS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-3xl bg-gradient-to-b from-space-900/50 to-space-950/80 border border-slate-800 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-space-950 border border-slate-800 group-hover:scale-110 transition-transform">
                  {renderAchievementIcon(item.icon)}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">
                  {item.rank}
                </span>
                <h3 className="text-lg font-orbitron font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-slate-400 block">
                  {item.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-display">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
