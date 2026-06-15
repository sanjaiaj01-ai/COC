import { Compass, Sparkles, Swords, BookOpen } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-60 h-60 bg-cyan-950/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left space-y-3 mb-16">
          <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">ABOUT THE STRATEGIST</p>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Synthesizing Tactical Playbooks & Native Components
          </h2>
          <div className="h-1 w-12 bg-cyan-500 rounded-full mt-2" />
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Biography Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300">
            <h3 className="font-sans text-xl font-bold text-white tracking-tight">
              From Excel Army Calculators to Production-Ready React Systems
            </h3>
            
            <p className="font-sans text-sm sm:text-base leading-relaxed">
              My journey into programming began in a somewhat unconventional arena: competitive clan management. Managing war roster spreadsheets, computing training costs relative to loot bonuses, and drafting defense coverage matrices for my clan was my first introduction to complex data modeling.
            </p>

            <p className="font-sans text-sm sm:text-base leading-relaxed">
              I realized that static documents couldn’t scale with real-time war schedules. Thus, I built my first web applet: an interactive battle logger. That spark evolved into a profound passion for front-end architecture, rendering optimizations, state synchronization, and building elegant, developer-friendly interfaces.
            </p>

            <p className="font-sans text-sm sm:text-base leading-relaxed">
              Today, I specialize in crafting robust, cloud-aware Single Page Applications (SPAs). Every base layout has a structural perimeter, just as every code module requires deliberate scoping. I apply the exact same tactical precision to debugging complicated async states as I do to 3-starring pro-built Town Hall 16 layouts.
            </p>

            {/* Inner highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3 p-3.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
                <Compass className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-semibold text-white text-xs tracking-tight">Systems Thinking</h4>
                  <p className="font-sans text-[11px] text-slate-400 mt-0.5">Structuring codebases with complete separation of data layers and modular component hierarchies.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
                <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-semibold text-white text-xs tracking-tight">High Polish & Detail</h4>
                  <p className="font-sans text-[11px] text-slate-400 mt-0.5">Creating memorable interfaces employing responsive layouts, unified fonts, and intentional micro-transitions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual Accent Badge Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="rounded-[14px] bg-slate-900 p-8 space-y-6">
                
                {/* Header info */}
                <div className="flex items-center space-x-4 pb-4 border-b border-slate-800">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xl font-mono shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    TH16
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-lg text-white">General Axe</h4>
                    <p className="font-mono text-xs text-cyan-400">CLAN: AQUA VANGUARD</p>
                  </div>
                </div>

                {/* Sub Stats List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-slate-400">Global Clan Rank</span>
                    <span className="font-mono text-xs font-semibold text-white">#1 (Leader)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-slate-400">Preferred Unit</span>
                    <span className="font-mono text-xs font-semibold text-emerald-400">Root Rider Smash</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-slate-400">War Status</span>
                    <span className="font-mono text-xs font-semibold text-lime-400">Always Opt-In</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-slate-400">Active Achievements</span>
                    <span className="font-mono text-xs font-semibold text-cyan-400">3/5 Unlocked</span>
                  </div>
                </div>

                {/* Bottom Game Quote */}
                <div className="p-4 rounded-lg bg-teal-950/20 border border-teal-500/20 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1 font-mono text-[8px] text-teal-400 font-bold uppercase">WARDEN TIP</div>
                  <p className="font-sans text-xs text-slate-400 italic">
                    "A funnel isn't just something you create for armies; it's how you guide your user's attention seamlessly toward the core feature."
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
