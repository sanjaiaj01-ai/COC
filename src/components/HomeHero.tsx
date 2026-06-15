import { Swords, ArrowRight, Code } from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function HomeHero({ onNavigate }: HomeHeroProps) {
  const handleAction = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c4a6e12_1px,transparent_1px),linear-gradient(to_bottom,#0c4a6e12_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Outer Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest font-semibold">
              Ready for War leagues & Development Sprints
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-sans font-bold tracking-tight text-white leading-[1.1]">
            <span className="block text-4xl sm:text-6xl md:text-7xl text-slate-100">
              Senior Frontend Engineer &
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mt-1 pb-1">
              Clash Strategy Tactician
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-slate-400 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            I craft responsive, modular React web architectures with clean code, while drafting 3-star competitive warfare blueprints at Town Hall 16. Welcome to my creative war room.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleAction('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-md shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <Swords className="w-4 h-4" />
              <span>Explore Strategy Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => handleAction('projects')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-white font-semibold text-xs tracking-wider uppercase rounded-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Inspect Web Portfolios</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="font-mono text-xl md:text-2xl font-bold text-cyan-400">5+ YEARS</p>
              <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">React Core Exp</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="font-mono text-xl md:text-2xl font-bold text-teal-400">TH16 MAX</p>
              <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">Clash Army Tier</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="font-mono text-xl md:text-2xl font-bold text-cyan-400">2,470+</p>
              <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">War Stars Won</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="font-mono text-xl md:text-2xl font-bold text-teal-400">100% SUCCESS</p>
              <p className="font-sans text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">Clean Code Delivery</p>
            </div>
          </div>

        </div>
      </div>

      {/* Ambient Floor Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
    </section>
  );
}
