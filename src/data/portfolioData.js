export const personalInfo = {
  name: "Ayush Shukla",
  title: "Software Developer | Full-Stack Developer | Problem Solver",
  tagline: "Building digital experiences through technology, creativity and problem-solving.",
  email: "ayush.apply41@gmail.com",
  phone: "+91-9369657005",
  location: "Ghaziabad / Lucknow, Uttar Pradesh, India",
  coordinates: {
    lat: "28.6692° N",
    lng: "77.4538° E",
    city: "Ghaziabad (Delhi-NCR)",
    region: "India",
    elevation: "214m",
    satelliteTrack: "SAT-IND-01"
  },
  college: "ABES Engineering College, Ghaziabad",
  degree: "Bachelor of Technology in Computer Science & Engineering",
  cgpa: "8.00 / 10.0",
  period: "Aug 2024 – Aug 2028",
  github: "https://github.com/Ayushukla7",
  githubUsername: "Ayushukla7",
  linkedin: "https://www.linkedin.com/in/ayushstech/",
  linkedinHandle: "ayushstech",
  portfolio: "https://ayush-portfolio.vercel.app",
  stats: [
    { label: "DSA Problems Solved", value: "250+", detail: "LeetCode & GFG in Java / C++", icon: "Code2" },
    { label: "API Latency Slashed", value: "45%", detail: "420ms to 180ms via Aggregation", icon: "Zap" },
    { label: "Delay Forecast Accuracy", value: "88%", detail: "WorkRadar Delay Risk Engine", icon: "TrendingUp" },
    { label: "National Hackathon", value: "Rank 3", detail: "2nd Runner-Up (120+ teams)", icon: "Trophy" },
    { label: "Developer Community", value: "2,000+", detail: "Discord, LinkedIn & Campus", icon: "Users" },
    { label: "Lighthouse Performance", value: "98+", detail: "Sub-1.2s page load speed", icon: "Gauge" }
  ]
};

export const aboutData = {
  summary: "I am a Software Developer and Computer Science undergraduate at ABES Engineering College with a strong passion for architecting scalable full-stack applications, solving complex algorithmic challenges, and building practical technology solutions.",
  highlights: [
    {
      title: "Full-Stack Development",
      description: "Proven experience building responsive, accessible web applications using modern React ecosystems, Node.js, and scalable database architectures."
    },
    {
      title: "Algorithmic Problem Solving",
      description: "Solved 250+ algorithmic problems across LeetCode and GeeksforGeeks in Java and C++, with HackerRank 3-Star Problem Solving recognition in C."
    },
    {
      title: "Predictive & Practical Engineering",
      description: "Engineered high-impact solutions like VacciTrack (ABHA-compliant immunization platform) and WorkRadar (predictive delay risk forecasting engine)."
    },
    {
      title: "Leadership & Community Impact",
      description: "Co-Founder at ZenYukti, Student Ambassador at Capgemini, and Community Manager scaling technical networks to 2,000+ developers."
    }
  ],
  education: {
    institution: "ABES Engineering College",
    degree: "B.Tech in Computer Science & Engineering",
    cgpa: "8.00 / 10.0",
    duration: "Aug 2024 – Aug 2028",
    location: "Ghaziabad, Uttar Pradesh, India",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Computer Networks",
      "Web Technologies"
    ]
  }
};

export const skillsData = [
  {
    category: "Programming",
    description: "Core languages for high-performance systems and algorithms",
    skills: [
      { name: "Python", level: "Scripting & Automation", badge: "Core", icon: "FileCode2" },
      { name: "Java", level: "DSA & OOP Architecture", badge: "Primary", icon: "Cpu" },
      { name: "C", level: "Low-level Systems & Pointers", badge: "Systems", icon: "Binary" },
      { name: "C++", level: "STL & Algorithmic Problem Solving", badge: "Competitive", icon: "Code" }
    ]
  },
  {
    category: "Frontend",
    description: "Building responsive, accessible 60 FPS user interfaces",
    skills: [
      { name: "HTML", level: "Semantic HTML5 & Accessibility", badge: "Standard", icon: "Layout" },
      { name: "CSS", level: "Modern CSS3, Flexbox & Grid", badge: "Design", icon: "Palette" },
      { name: "JavaScript", level: "ES6+, Async/Await & Event Loop", badge: "Web Engine", icon: "FileJson" },
      { name: "React.js", level: "Hooks, Virtual DOM & Component Architecture", badge: "Framework", icon: "Atom" }
    ]
  },
  {
    category: "Backend",
    description: "Server architecture, API routing and business logic",
    skills: [
      { name: "Node.js", level: "Asynchronous Event-Driven Runtime", badge: "Runtime", icon: "Server" },
      { name: "Django", level: "Python Web Framework & ORM", badge: "Framework", icon: "Workflow" }
    ]
  },
  {
    category: "Database",
    description: "Relational data modeling, querying and optimization",
    skills: [
      { name: "SQL", level: "Relational Modeling, MySQL, PostgreSQL & ACID", badge: "Relational", icon: "Database" }
    ]
  },
  {
    category: "Developer Tools",
    description: "Version control, workflow efficiency and development environments",
    skills: [
      { name: "Git", level: "Branching, Merging & Version Control", badge: "VCS", icon: "GitBranch" },
      { name: "GitHub", level: "CI/CD, Pull Requests & Open-Source", badge: "Collaboration", icon: "Github" },
      { name: "VS Code", level: "Integrated Development & Tooling", badge: "IDE", icon: "Terminal" }
    ]
  }
];

export const projectsData = [
  {
    id: "vaccitrack",
    name: "VacciTrack / Medi-Vahak",
    tagline: "Child Immunization Tracking & Healthcare Accessibility Platform",
    description: "A child vaccination tracking platform designed to improve immunization management and healthcare accessibility for doctors and parents. Won 1st Position in Healthcare Innovation Track at the National Hackathon.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "ABHA Standards", "Twilio OTP 2FA", "Tailwind CSS"],
    imageType: "healthcare",
    features: [
      "Dual user roles for Healthcare Professionals (Doctors) and Parents with distinct tailored dashboards.",
      "Integrated national ABHA standards and OTP-verified 2-Factor Authentication, cutting clinical entry errors by 95%.",
      "Automated multi-channel schedule workflows reducing duplicate patient records to <0.5%.",
      "Attained a 98+ Lighthouse Performance score with sub-1.2s page loads through lazy loading and code-splitting."
    ],
    contribution: "Architected the full-stack MERN workflow, integrated national ABHA standards and Twilio OTP 2FA verification, and optimized frontend performance to achieve sub-1.2s load speeds.",
    github: "https://github.com/Ayushukla7",
    live: "https://ayush-portfolio.vercel.app",
    award: "National Hackathon Runner-Up (1st in Healthcare)",
    accentColor: "#00f2fe"
  },
  {
    id: "skillledger",
    name: "SkillLedger",
    tagline: "Blockchain-Based Skill Verification & Micro-Certification Concept",
    description: "A blockchain-based skill verification and micro-certification platform concept designed to provide tamper-proof credential validation for students, educational institutions, and recruiters.",
    techStack: ["React.js", "Node.js", "Cryptographic Hashing", "Distributed Ledger Concept", "RESTful APIs", "Tailwind CSS"],
    imageType: "blockchain",
    features: [
      "Tamper-proof verifiable skill badges backed by immutable cryptographic proof of achievement.",
      "Decentralized credential checking interface allowing recruiters to instantly verify student micro-certifications.",
      "Secure student credential locker organizing coursework and verified project achievements into a unified digital portfolio.",
      "Zero-knowledge validation protocols ensuring privacy compliance for student records."
    ],
    contribution: "Designed the system architecture, structured the verification logic and cryptographic hash verification flow, and developed the interactive React user interface prototype.",
    github: "https://github.com/Ayushukla7",
    live: "https://ayush-portfolio.vercel.app",
    award: "Engineering Innovation Concept",
    accentColor: "#38bdf8"
  },
  {
    id: "portfolio",
    name: "Personal Portfolio (3D Earth Identity)",
    tagline: "Cinematic 3D WebGL Digital Identity & Engineering Showcase",
    description: "My interactive 3D digital identity and developer portfolio inspired by Google Earth satellite imagery and NASA orbital telemetry, built with Three.js, React, GSAP, and Tailwind CSS.",
    techStack: ["React.js", "Three.js", "WebGL", "GSAP", "Tailwind CSS", "Web Audio API", "Vite"],
    imageType: "satellite",
    features: [
      "Cinematic orbital camera descent from deep outer space zooming into India (NCR / Lucknow hub).",
      "Realistic procedural Earth rendering with specular ocean reflections, cloud layers, and city night lights.",
      "Native Web Audio API sound synthesizer producing tactile sci-fi HUD audio with zero external MP3 latency.",
      "Fully responsive architecture with fallback modes respecting reduced-motion accessibility preferences."
    ],
    contribution: "Sole architect and developer: engineered the custom 3D WebGL shaders, camera interpolation timelines, audio synthesis engine, and responsive HUD design system.",
    github: "https://github.com/Ayushukla7",
    live: "https://ayush-portfolio.vercel.app",
    award: "Digital Identity 2026",
    accentColor: "#2563eb"
  },
  {
    id: "workradar",
    name: "WorkRadar",
    tagline: "Predictive Task & Workforce Analytics Platform",
    description: "A predictive workforce analytics platform forecasting project delay risks with 88% accuracy before deadlines occur, cutting bottleneck discovery time across engineering teams by 40%.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB Aggregation", "JWT Auth", "Tailwind CSS"],
    imageType: "analytics",
    features: [
      "Engineered a 0–100 Delay Risk Engine processing 6+ key metrics (active blockers, developer workload, sprint velocity).",
      "Optimized MongoDB aggregation pipelines across 1,000+ tasks, slashing API latency by 45% (from 420ms to 180ms).",
      "Interactive risk distribution matrix alerting tech leads to scheduling hazards 7 days prior to deadline milestones."
    ],
    contribution: "Architected the delay forecasting algorithms, built the real-time risk dashboard, and optimized MongoDB multi-stage aggregation queries.",
    github: "https://github.com/Ayushukla7",
    live: "https://ayush-portfolio.vercel.app",
    award: "Production Analytics Platform",
    accentColor: "#06b6d4"
  }
];

export const experienceData = [
  {
    role: "Co-Founder",
    organization: "ZenYukti",
    period: "2024 – Present",
    location: "Ghaziabad, India",
    type: "Entrepreneurship & Innovation",
    highlights: [
      "Co-founded ZenYukti to pioneer student technology initiatives, hackathon prototypes, and collaborative software projects.",
      "Spearheaded technical development workflows, system architecture, and product design for real-world campus and industrial solutions."
    ],
    badge: "Leadership"
  },
  {
    role: "Student Ambassador",
    organization: "Capgemini",
    period: "Aug 2025 – Present",
    location: "Ghaziabad, India",
    type: "Corporate Community Leadership",
    highlights: [
      "Spearheaded campus outreach for Capgemini Brand Quest, engaging 500+ students and driving a 35% increase in registrations.",
      "Coordinated 3+ technical webinars on modern enterprise engineering, achieving an average participant satisfaction rating of 4.8 / 5.0."
    ],
    badge: "Enterprise Ambassador"
  },
  {
    role: "Social Media & Community Manager",
    organization: "Elixir Tech Community",
    period: "Jan 2025 – Present",
    location: "Remote",
    type: "Community Growth & Mentorship",
    highlights: [
      "Scaled technical community to 2,000+ members across Discord and LinkedIn, boosting organic engagement by 120%.",
      "Facilitated 8+ peer-to-peer coding sessions, mentoring 250+ students in Web Development, Git workflows, and open-source contributions."
    ],
    badge: "Community Growth"
  },
  {
    role: "Lead Graphic & UI Designer",
    organization: "Technovation – The Networking Club",
    period: "Jun 2024 – Present",
    location: "ABESEC, Ghaziabad",
    type: "UI/UX & Design Systems",
    highlights: [
      "Crafted 40+ marketing assets and UI prototypes in Figma for tech fests with 1,500+ attendees.",
      "Accelerated design delivery speed by 30% through modular component libraries and reusable UI tokens."
    ],
    badge: "Design Lead"
  },
  {
    role: "Campus Mentorship & Hackathons",
    organization: "ABES Engineering College",
    period: "2024 – Present",
    location: "Ghaziabad, India",
    type: "Mentorship",
    highlights: [
      "Mentored 500+ junior students across college hackathons and UI/UX design workshops, guiding fundamental Git and React workflows."
    ],
    badge: "Mentorship"
  }
];

export const achievementsData = [
  {
    title: "National Hackathon – 2nd Runner Up",
    rank: "Rank 3 / 120+ Teams",
    category: "1st Position – Healthcare Innovation Track",
    description: "Awarded 2nd Runner-Up nationally for VacciTrack. Recognized by the jury for innovative ABHA standard integration, bilingual workflows, and cutting clinical error rates.",
    badge: "National Podium",
    icon: "Trophy"
  },
  {
    title: "First Prize in Healthcare Innovation",
    rank: "Category Champion",
    category: "Healthcare Track Winner",
    description: "Won First Prize in Healthcare Innovation for engineering the VacciTrack immunization management platform, solving pediatric immunization drop-off challenges.",
    badge: "1st Position",
    icon: "Award"
  },
  {
    title: "HackerRank 3-Star Problem Solving",
    rank: "3-Star Gold Badge",
    category: "C Programming & Problem Solving",
    description: "Demonstrated strong command over algorithmic problem solving, pointer manipulation, and memory management in C on HackerRank.",
    badge: "Verified Skill",
    icon: "Star"
  },
  {
    title: "NeuroHACK Finalist – Shaastra, IIT Madras",
    rank: "National Finalist",
    category: "Biomedical & Engineering Fest",
    description: "Selected as national finalist in Shaastra's prestigious NeuroHACK at IIT Madras, tackling real-time biomedical and automated workflow challenges.",
    badge: "IIT Madras",
    icon: "Sparkles"
  },
  {
    title: "250+ Algorithmic Problems Solved",
    rank: "DSA Rigor",
    category: "LeetCode & GeeksforGeeks",
    description: "Solved 250+ problems in Java and C++ covering Dynamic Programming, Graph Traversals (BFS/DFS, Dijkstra), Trees, and Binary Search.",
    badge: "Problem Solving",
    icon: "CheckCircle2"
  }
];
