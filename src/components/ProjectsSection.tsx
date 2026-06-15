import { PORTFOLIO_PROJECTS } from '../data';
import { ExternalLink, CheckCircle, Flame, Sword } from 'lucide-react';

interface ProjectsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const handleLaunchDashboard = () => {
    onNavigate('dashboard');
    const dashboardElement = document.getElementById('dashboard');
    if (dashboardElement) {
      const offset = 80;
      const elementPosition = dashboardElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Visual background lines */}
      <div className="absolute top-1/3 left-0 w-80 h-[2px] bg-gradient-to-r from-cyan-500/20 to-transparent" />
      <div className="absolute top-2/3 right-0 w-80 h-[2px] bg-gradient-to-l from-teal-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3 mb-16">
          <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">ENGINEERING DEPLOYMENTS</p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Flagship Engineering Repositories
          </h2>
          <div className="h-1 w-12 bg-cyan-500 rounded-full mt-2" />
        </div>

        {/* Dynamic Project Grid */}
        <div className="space-y-12">
          {PORTFOLIO_PROJECTS.map((project) => {
            const isClashHub = project.id === 'coc-tactics';

            return (
              <div
                key={project.id}
                className={`group rounded-2xl bg-slate-900/60 border ${
                  isClashHub
                    ? 'border-cyan-500/40 shadow-[0_4px_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/10'
                    : 'border-slate-800/80 hover:border-slate-700/80'
                } p-6 sm:p-8 backdrop-blur-sm lg:grid lg:grid-cols-12 gap-8 items-center transition-all duration-300`}
              >
                {/* Left: Project Details */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Title Bar */}
                  <div className="space-y-2">
                    {isClashHub && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
                        ⭐ INTERACTIVE HIGHLIGHT CODE
                      </span>
                    )}
                    <h3 className="font-sans font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  {/* Long descriptive text */}
                  <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {project.longDescription}
                  </p>

                  {/* Feature lists */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-sans truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] text-slate-400 px-2 py-1 rounded bg-slate-950 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Custom Action Interactive Block */}
                <div className="lg:col-span-5 mt-6 lg:mt-0 flex flex-col justify-center items-center p-6 rounded-xl bg-slate-950 border border-slate-805 text-center relative overflow-hidden">
                  {isClashHub ? (
                    <>
                      {/* Special glow for flag project */}
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                      <Flame className="w-10 h-10 text-cyan-400 animate-pulse mb-3" />
                      <h4 className="font-sans font-bold text-white text-sm">Experience it Live</h4>
                      <p className="font-sans text-xs text-slate-400 mt-1 max-w-xs">
                        This advanced clan tactic planner and database is integrated natively into this webpage directly below.
                      </p>
                      
                      {/* Launch Trigger */}
                      <button
                        onClick={handleLaunchDashboard}
                        className="mt-5 w-full flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer"
                      >
                        <Sword className="w-4 h-4" />
                        <span>Launch Dynamic Suite</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                        <ExternalLink className="w-5 h-5 text-slate-400" />
                      </div>
                      <h4 className="font-sans font-semibold text-slate-300 text-sm">Github Repository</h4>
                      <p className="font-sans text-xs text-slate-500 mt-1 max-w-xs">
                        Source code structure, test suites, and Docker compilation files are archived in secure repositories.
                      </p>
                      <button
                        disabled
                        className="mt-5 w-full py-2.5 px-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-md font-sans text-xs font-semibold select-none cursor-not-allowed"
                      >
                        Repository Private
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
