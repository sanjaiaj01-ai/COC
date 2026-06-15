import { Flame } from 'lucide-react';

interface TechSkill {
  name: string;
  level: number;
  maxLevel: number;
  percentage: number;
  trophyRequirement: number;
  tier: 'Elite (Maxed)' | 'Champion' | 'Grand Warden Tier' | 'Super Troop';
  description: string;
}

const SKILLS_DATA: TechSkill[] = [
  {
    name: 'React & Next.js Ecosystems',
    level: 16,
    maxLevel: 16,
    percentage: 100,
    trophyRequirement: 5000,
    tier: 'Elite (Maxed)',
    description: 'Expert integration of modular components, customized hooks, server-side data fetching, and state management (Zustand, Context API).'
  },
  {
    name: 'TypeScript & Typings Architecture',
    level: 15,
    maxLevel: 16,
    percentage: 95,
    trophyRequirement: 4800,
    tier: 'Champion',
    description: 'Strict type safety architectures, advanced generics, utility types, and full static validation across full-stack applications.'
  },
  {
    name: 'Tailwind CSS & Canvas Layouts',
    level: 16,
    maxLevel: 16,
    percentage: 100,
    trophyRequirement: 5000,
    tier: 'Elite (Maxed)',
    description: 'Bespoke UI layouts, custom CSS-variable theme mapping, complex responsiveness breakpoints, and raw design execution.'
  },
  {
    name: 'Node.js, Express, & WebSockets',
    level: 14,
    maxLevel: 16,
    percentage: 88,
    trophyRequirement: 4200,
    tier: 'Grand Warden Tier',
    description: 'High-speed event-servers, secured route proxies, real-time telemetry streaming, and modular controller separations.'
  },
  {
    name: 'HTML5 Canvas & Vector Drafting Engines',
    level: 13,
    maxLevel: 16,
    percentage: 80,
    trophyRequirement: 3800,
    tier: 'Super Troop',
    description: 'Custom layered map grids, real-time radar sweep calculations, interactive coordinate trackers, and SVG vector mapping.'
  },
  {
    name: 'Firestore, PostgreSQL & SQL Databases',
    level: 14,
    maxLevel: 16,
    percentage: 85,
    trophyRequirement: 4000,
    tier: 'Grand Warden Tier',
    description: 'NoSQL document schemas, indexed lookup models, relational database mapping, and highly compliant security rule deployments.'
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-slate-905 relative border-y border-cyan-950/40">
      {/* Mesh Background */}
      <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(ellipse_at_bottom_left,#08334415,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">WAR TRAINING TACTICS</p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Developer Upgrade Laboratory
          </h2>
          <p className="font-sans text-sm text-slate-400 max-w-2xl mx-auto mt-2">
            Just like research labs in Clash of Clans, these tech skills have been grinded, upgraded, and leveled up through countless active development campaigns.
          </p>
          <div className="h-1 w-12 bg-cyan-500 rounded-full mx-auto" />
        </div>

        {/* Grid of Leveled Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((skill, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="font-mono text-[9px] text-cyan-400 tracking-wider uppercase font-semibold mt-0.5">
                      {skill.tier}
                    </p>
                  </div>
                  {/* Skill level indicator bubble */}
                  <div className="flex flex-col items-center justify-center h-11 w-11 rounded-lg bg-cyan-950/60 border border-cyan-700/50 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                    <span className="font-mono text-xs font-bold leading-none">LVL</span>
                    <span className="font-sans text-sm font-black leading-none mt-0.5">{skill.level}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Progress bar info */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-500">LAB RESEARCH PROGRESS</span>
                  <span className={`font-semibold ${skill.percentage === 100 ? 'text-cyan-400' : 'text-slate-300'}`}>
                    {skill.percentage}% {skill.percentage === 100 ? '(MAX)' : ''}
                  </span>
                </div>
                
                {/* ProgressBar */}
                <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800/60 p-[1px]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all duration-550 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>

                {/* Requirements / Stats footer */}
                <div className="flex items-center justify-between text-[9px] font-mono font-semibold pt-1 text-slate-500 border-t border-slate-800/40">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-cyan-400" /> TROPHY REQ: {skill.trophyRequirement}
                  </span>
                  <span>BUILD RATIO: {skill.level}/16</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Level-Up Notice */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-cyan-950/20 via-slate-900 to-teal-950/20 border border-cyan-900/30 text-center max-w-3xl mx-auto">
          <p className="font-sans text-xs text-slate-300">
            🛡️ <span className="text-cyan-400 font-semibold font-mono">LAB STATUS: READY.</span> Inactive project buffers have been cleared. Daily deployments continue. All code operates under rigorous lint verification guidelines.
          </p>
        </div>

      </div>
    </section>
  );
}
