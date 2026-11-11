import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  Github,
  Linkedin
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playTacticalClick } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('dossier'); // 'dossier' or 'pdf'

  if (!isOpen) return null;

  const handlePrint = () => {
    playTacticalClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      
      {/* FULL RESUME CONTAINER */}
      <div 
        className="relative w-full max-w-5xl bg-dark-900 border border-white/20 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col my-auto h-[94vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ========================================================================= */}
        {/* TOP COMMAND BAR (DOWNLOAD, PRINT, VIEW TOGGLES, CLOSE) */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-black/90 z-20 font-mono text-xs">
          
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500 animate-pulse" />
            <div>
              <span className="font-clash font-extrabold text-sm sm:text-base text-white uppercase tracking-wider block">
                OFFICIAL RESUME DOSSIER // AYUSH SHUKLA
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:block">
                VERIFIED B.TECH CSE • FULL-STACK SOFTWARE ENGINEER
              </span>
            </div>
          </div>

          {/* VIEW MODE TABS: DOSSIER vs EMBEDDED PDF */}
          <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/15">
            <button
              onClick={() => { playTacticalClick(); setViewMode('dossier'); }}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all flex items-center space-x-1.5 ${
                viewMode === 'dossier'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dossier View</span>
            </button>

            <button
              onClick={() => { playTacticalClick(); setViewMode('pdf'); }}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all flex items-center space-x-1.5 ${
                viewMode === 'pdf'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Original PDF Embed</span>
            </button>
          </div>

          {/* ACTIONS: DOWNLOAD PDF, PRINT, EXPLORE PORTFOLIO */}
          <div className="flex items-center space-x-2">
            
            {/* Direct PDF Download button */}
            <a
              href="/Ayush_Shukla_Resume.pdf"
              download="Ayush_Shukla_Resume.pdf"
              onClick={playTacticalClick}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              title="Download Original PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Open in New Window */}
            <a
              href="/Ayush_Shukla_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={playTacticalClick}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
              title="Open PDF in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Explore Portfolio / Close button */}
            <button
              onClick={() => { playTacticalClick(); onClose(); }}
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md"
              title="Enter Interactive F1 Portfolio"
            >
              <span>ENTER PORTFOLIO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { playTacticalClick(); onClose(); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: EITHER EMBEDDED ORIGINAL PDF OR CRISP HIGH-RES DOSSIER */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto bg-slate-100 text-slate-900 p-4 sm:p-8 md:p-10 select-text">
          
          {viewMode === 'pdf' ? (
            /* EMBEDDED ORIGINAL PDF VIEWER */
            <div className="w-full h-full min-h-[78vh] flex flex-col bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
              <iframe
                src="/Ayush_Shukla_Resume.pdf#view=FitH"
                className="w-full flex-1 rounded-xl"
                title="Ayush Shukla Official Resume PDF"
              />
            </div>
          ) : (
            /* CRISP, COMPREHENSIVE PRINTABLE DOSSIER (100% COMPLETE & SCROLLABLE) */
            <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-200 space-y-6 font-sans print:p-0 print:shadow-none print:border-none">
              
              {/* HEADER */}
              <div className="text-center border-b-2 border-slate-800 pb-5 space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-serif">
                  {personalInfo.name}
                </h1>
                
                <p className="text-xs sm:text-sm font-semibold text-slate-700 font-mono">
                  Full-Stack Software Engineer • B.Tech Computer Science & Engineering
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-slate-700 font-mono pt-1">
                  <a href={`tel:${personalInfo.phone}`} className="flex items-center space-x-1 hover:text-blue-700">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{personalInfo.phone}</span>
                  </a>
                  <span>•</span>
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-1 hover:text-blue-700">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{personalInfo.email}</span>
                  </a>
                  <span>•</span>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-blue-700 hover:underline">
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>linkedin.com/in/{personalInfo.linkedinHandle}</span>
                  </a>
                  <span>•</span>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-blue-700 hover:underline">
                    <Github className="w-3.5 h-3.5" />
                    <span>github.com/{personalInfo.githubUsername}</span>
                  </a>
                  <span>•</span>
                  <span className="flex items-center space-x-1 text-slate-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{personalInfo.location}</span>
                  </span>
                </div>
              </div>

              {/* PROFESSIONAL SUMMARY */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between">
                  <span>Professional Summary</span>
                  <span className="text-[10px] font-mono text-slate-500 font-normal">MERN • Next.js • Low-Latency Systems</span>
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  Results-driven Software Engineering undergraduate at ABES Engineering College with strong expertise in full-stack web development (React.js, Node.js, Express, MongoDB, Next.js) and algorithmic problem solving. Proven track record of architecting scalable applications, slashing API latency by 45%, and leading developer community initiatives reaching 2,000+ members. National Hackathon 2nd Runner-Up with 250+ DSA problems solved across LeetCode and GeeksforGeeks in Java and C++.
                </p>
              </div>

              {/* TECHNICAL SKILLS */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Technical Skills
                </h2>
                <div className="space-y-1 text-xs text-slate-800">
                  <p>
                    <strong className="text-slate-950 font-semibold">Programming Languages:</strong> Java, C, C++, JavaScript (ES6+), TypeScript, Python, SQL (MySQL, PostgreSQL)
                  </p>
                  <p>
                    <strong className="text-slate-950 font-semibold">Frontend Technologies:</strong> React.js, Next.js, Redux Toolkit, Tailwind CSS, HTML5, CSS3, Vite, GSAP, Responsive Design
                  </p>
                  <p>
                    <strong className="text-slate-950 font-semibold">Backend & Databases:</strong> Node.js, Express.js, Django, RESTful APIs, MongoDB, Mongoose, JWT Authentication
                  </p>
                  <p>
                    <strong className="text-slate-950 font-semibold">Developer Tools & Environments:</strong> Git, GitHub, VS Code, Postman, Vercel, Docker (Basics), Figma, Wireframing
                  </p>
                </div>
              </div>

              {/* PROJECTS */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Flagship Engineering Projects
                </h2>

                {/* VacciTrack */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-950">
                      VacciTrack / Medi-Vahak – Child Immunization Platform <span className="font-normal italic text-slate-600">| MERN Stack, ABHA, Twilio OTP 2FA</span>
                    </span>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-mono text-[11px]">
                      [GitHub Repo]
                    </a>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700 leading-normal">
                    <li><strong>National Hackathon 2nd Runner-Up:</strong> Won 1st Position in Healthcare Innovation Track among 120+ competing engineering teams.</li>
                    <li>Engineered an immunization portal for 2 user roles (Doctor & Parent) with automated multi-channel schedule workflows.</li>
                    <li>Integrated national ABHA standards and OTP-verified 2FA, reducing clinical data entry errors by 95% and duplicate records to &lt;0.5%.</li>
                    <li>Attained a 98+ Lighthouse Performance score with sub-1.2s page loads through lazy loading and component code-splitting.</li>
                  </ul>
                </div>

                {/* WorkRadar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-950">
                      WorkRadar – Predictive Task & Workforce Platform <span className="font-normal italic text-slate-600">| React.js, Node.js, Express, MongoDB, JWT</span>
                    </span>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-mono text-[11px]">
                      [GitHub Repo]
                    </a>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700 leading-normal">
                    <li>Architected a predictive workforce analytics platform forecasting project delay risks with 88% accuracy before deadlines.</li>
                    <li>Engineered a 0–100 Delay Risk Engine processing 6+ key metrics (blockers, workload, velocity), cutting bottleneck discovery by 40%.</li>
                    <li>Optimized MongoDB aggregation pipelines across 1,000+ tasks, slashing API response latency by 45% (from 420ms to 180ms).</li>
                  </ul>
                </div>

                {/* SkillLedger */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold text-slate-950">
                      SkillLedger – Blockchain-Based Skill Verification Platform <span className="font-normal italic text-slate-600">| React.js, Node.js, Cryptographic Hashing</span>
                    </span>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline font-mono text-[11px]">
                      [GitHub Repo]
                    </a>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700 leading-normal">
                    <li>Engineered verifiable digital credential workflows to validate student technical skills and micro-certifications with immutable cryptographic proofs.</li>
                    <li>Designed recruiter verification portals allowing instant tamper-proof credential validation.</li>
                  </ul>
                </div>
              </div>

              {/* WORK EXPERIENCE & LEADERSHIP */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Work Experience & Leadership
                </h2>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-950">Co-Founder</span>
                    <span className="font-medium text-slate-600">2024 – Present</span>
                  </div>
                  <div className="flex justify-between text-xs italic text-slate-700">
                    <span>ZenYukti</span>
                    <span>Ghaziabad, India</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-0.5 text-xs text-slate-700">
                    <li>Pioneered student technology initiatives, hackathon prototypes, UI design architectures, and collaborative project engineering.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-950">Student Ambassador</span>
                    <span className="font-medium text-slate-600">Aug 2025 – Present</span>
                  </div>
                  <div className="flex justify-between text-xs italic text-slate-700">
                    <span>Capgemini</span>
                    <span>Ghaziabad, India</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-0.5 text-xs text-slate-700">
                    <li>Spearheaded campus outreach for Capgemini Brand Quest, engaging 500+ students and driving a 35% increase in registrations.</li>
                    <li>Coordinated 3+ technical webinars, achieving an average participant satisfaction rating of 4.8/5.0.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-950">Social Media & Community Manager</span>
                    <span className="font-medium text-slate-600">Jan 2025 – Present</span>
                  </div>
                  <div className="flex justify-between text-xs italic text-slate-700">
                    <span>Elixir Tech Community</span>
                    <span>Remote</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 mt-0.5 text-xs text-slate-700">
                    <li>Scaled technical community to 2,000+ members across Discord and LinkedIn, boosting organic engagement by 120%.</li>
                    <li>Facilitated 8+ peer-to-peer coding sessions, mentoring 250+ students in Web Development and Git workflows.</li>
                  </ul>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Education
                </h2>
                <div className="flex justify-between font-bold text-xs text-slate-950">
                  <span>ABES Engineering College</span>
                  <span className="font-normal text-slate-600">Ghaziabad, Uttar Pradesh</span>
                </div>
                <div className="flex justify-between italic text-xs text-slate-700">
                  <span>Bachelor of Technology in Computer Science & Engineering <strong>(CGPA: 8.00 / 10.0)</strong></span>
                  <span>Aug 2024 – Aug 2028</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems, Computer Networks, Web Technologies.
                </p>
              </div>

              {/* ACHIEVEMENTS & CERTIFICATIONS */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  Honors & Competitive Excellence
                </h2>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700">
                  <li>
                    <strong className="text-slate-950">National Hackathon – 2nd Runner Up (Rank 3 out of 120+ teams):</strong> Awarded 1st Position in Healthcare Innovation Track.
                  </li>
                  <li>
                    <strong className="text-slate-950">HackerRank 3-Star Problem Solving in C:</strong> Verified problem-solving foundations and low-level algorithmic mastery.
                  </li>
                  <li>
                    <strong className="text-slate-950">NeuroHACK Finalist:</strong> Shaastra, Indian Institute of Technology (IIT) Madras.
                  </li>
                  <li>
                    <strong className="text-slate-950">250+ Algorithmic Problems Solved:</strong> LeetCode & GeeksforGeeks in Java and C++.
                  </li>
                </ul>
              </div>

              {/* BOTTOM FOOTER CALLOUT */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-slate-600">
                  OFFICIAL SIGNED DOSSIER • AYUSH SHUKLA (CHASSIS AS-2026)
                </span>
                <a
                  href="/Ayush_Shukla_Resume.pdf"
                  download="Ayush_Shukla_Resume.pdf"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold flex items-center space-x-1.5 hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DOWNLOAD VERIFIED PDF</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
