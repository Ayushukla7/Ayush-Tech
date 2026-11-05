import React from 'react';
import { X, Download, Printer, ExternalLink, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { personalInfo } from '../../data/solarData';
import { playClick } from '../../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col my-auto max-h-[90vh]">
        
        {/* MODAL ACTION BAR */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
              OFFICIAL ENGINEERING RESUME DOSSIER
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => { playClick(); onClose(); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RESUME SHEET */}
        <div className="p-6 sm:p-10 overflow-y-auto text-slate-200 bg-white text-slate-900 rounded-b-2xl font-sans print:p-0 print:m-0 print:bg-white print:text-black">
          
          {/* HEADER */}
          <div className="text-center border-b border-slate-300 pb-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
              {personalInfo.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700">
              <span className="flex items-center space-x-1">
                <Phone className="w-3 h-3 text-slate-500" />
                <span>{personalInfo.phone}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Mail className="w-3 h-3 text-slate-500" />
                <span>{personalInfo.email}</span>
              </span>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                linkedin.com/in/ayushstech
              </a>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                github.com/Ayushukla7
              </a>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                <span>{personalInfo.location}</span>
              </span>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <div className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">
              Professional Summary
            </h2>
            <p className="mt-1.5 text-xs text-slate-700 leading-relaxed text-justify">
              Results-driven Software Engineering undergraduate with expertise in full-stack web development (MERN, Next.js, TypeScript) and predictive workflow systems. Proven track record of architecting scalable applications, slashing API latency by 45%, and leading tech community initiatives reaching 2,000+ developers. National Hackathon 2nd Runner-Up with 250+ DSA problems solved across LeetCode and GeeksforGeeks.
            </p>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">
              Technical Skills
            </h2>
            <div className="mt-1.5 space-y-1 text-xs text-slate-800">
              <p>
                <span className="font-semibold text-slate-900">Programming Languages:</span> Java, C, C++, JavaScript (ES6+), TypeScript, Python, SQL (MySQL, PostgreSQL)
              </p>
              <p>
                <span className="font-semibold text-slate-900">Frontend Development:</span> React.js, Next.js, Redux Toolkit, Tailwind CSS, HTML5, CSS3, Vite, React Router, Responsive UI
              </p>
              <p>
                <span className="font-semibold text-slate-900">Backend & Databases:</span> Node.js, Express.js, RESTful APIs, MongoDB, Mongoose, PostgreSQL, JWT Authentication
              </p>
              <p>
                <span className="font-semibold text-slate-900">Developer Tools & Design:</span> Git, GitHub, VS Code, Postman, Vercel, Docker (Basics), Figma, Wireframing, Adobe Photoshop
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">
              Projects
            </h2>
            
            <div className="mt-2 space-y-3">
              {/* Project 1 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    WorkRadar – Predictive Task & Workforce Platform | <span className="font-normal italic text-slate-600">React.js, Node.js, Express, MongoDB, JWT</span>
                  </h3>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-[11px] text-blue-700 hover:underline">
                    [GitHub]
                  </a>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-700">
                  <li>Architected a predictive workforce analytics platform forecasting project delay risks with 88% accuracy before deadlines.</li>
                  <li>Engineered a 0–100 Delay Risk Engine processing 6+ metrics (blockers, workload, velocity), cutting bottleneck discovery by 40%.</li>
                  <li>Optimized MongoDB aggregation pipelines across 1,000+ tasks, slashing API response latency by 45% (from 420ms to 180ms).</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    VacciTrack – Full-Stack Immunization Management System | <span className="font-normal italic text-slate-600">MERN Stack, REST APIs, ABHA, Twilio OTP</span>
                  </h3>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-[11px] text-blue-700 hover:underline">
                    [GitHub]
                  </a>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-700">
                  <li>Engineered an immunization portal for 2 user roles (Doctor & Parent) with automated multi-channel schedule workflows.</li>
                  <li>Integrated ABHA standards and OTP-verified 2FA, reducing manual clinical data errors by 95% and duplicate records to &lt;0.5%.</li>
                  <li>Achieved a 98+ Lighthouse Performance score with sub-1.2s page loads through lazy loading and component code-splitting.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    AYUSH-UI – Modern Frontend & UI/UX Design System | <span className="font-normal italic text-slate-600">React.js, Vite, Tailwind CSS, Framer Motion</span>
                  </h3>
                  <div className="text-[11px] space-x-1">
                    <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">[Live]</a>
                    <span>|</span>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">[GitHub]</a>
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-700">
                  <li>Designed and deployed an interactive portfolio showcasing 10+ high-fidelity prototypes and production web applications.</li>
                  <li>Implemented smooth 60 FPS micro-animations and responsive layout, reducing user bounce rate by 28%.</li>
                  <li>Attained 100/100 SEO and Accessibility scores on Google PageSpeed Insights through semantic HTML5 structure.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WORK EXPERIENCE & LEADERSHIP */}
          <div className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">
              Work Experience & Leadership
            </h2>
            
            <div className="mt-2 space-y-2.5">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">Student Ambassador</span>
                  <span className="font-medium text-slate-600">Aug 2025 – Present</span>
                </div>
                <div className="flex justify-between text-xs italic text-slate-700">
                  <span>Capgemini</span>
                  <span>Ghaziabad, India</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-xs text-slate-700">
                  <li>Spearheaded campus outreach for Capgemini Brand Quest, engaging 500+ students and driving a 35% increase in registrations.</li>
                  <li>Coordinated 3+ technical webinars, achieving an average participant satisfaction rating of 4.8/5.0.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">Social Media & Community Manager</span>
                  <span className="font-medium text-slate-600">Jan 2025 – Present</span>
                </div>
                <div className="flex justify-between text-xs italic text-slate-700">
                  <span>Elixir Tech Community</span>
                  <span>Remote</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-xs text-slate-700">
                  <li>Scaled technical community to 2,000+ members across Discord and LinkedIn, boosting organic engagement by 120%.</li>
                  <li>Facilitated 8+ peer-to-peer coding sessions, mentoring 250+ students in Web Development and Git workflows.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-900">Lead Graphic & UI Designer</span>
                  <span className="font-medium text-slate-600">Jun 2024 – Present</span>
                </div>
                <div className="flex justify-between text-xs italic text-slate-700">
                  <span>Technovation – The Networking Club, ABESEC</span>
                  <span>Ghaziabad, India</span>
                </div>
                <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-xs text-slate-700">
                  <li>Crafted 40+ marketing assets in Figma for tech fests with 1,500+ attendees, accelerating design delivery speed by 30%.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">
              Education
            </h2>
            <div className="mt-2 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>ABES Engineering College</span>
                <span className="font-normal text-slate-600">Ghaziabad, India</span>
              </div>
              <div className="flex justify-between italic text-slate-700">
                <span>Bachelor of Technology in Computer Science & Engineering (CGPA: 8.00/10.0)</span>
                <span>Aug 2024 – Aug 2028</span>
              </div>
              <p className="mt-0.5 text-slate-600">
                Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), DBMS, OS, Computer Networks, Web Tech.
              </p>
            </div>
          </div>

          {/* ACHIEVEMENTS & AWARDS */}
          <div className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">
              Achievements & Awards
            </h2>
            <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">National Hackathon – 2nd Runner Up (Rank 3/120+ teams):</span> Won 1st Position in Healthcare Innovation Track.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Hackathons & Competitions:</span> Finalist in NeuroHACK (Shaastra, IIT Madras), JJK Hackathon, Hack4Health, Nirmaan Buildathon.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Problem Solving & DSA:</span> Solved 250+ algorithmic problems on LeetCode and GeeksforGeeks in Java/C++.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Campus Mentorship:</span> Mentored 500+ junior students across college hackathons and UI/UX design workshops.
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
