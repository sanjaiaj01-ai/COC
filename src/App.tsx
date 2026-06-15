import { useState } from 'react';
import Navigation from './components/Navigation';
import HomeHero from './components/HomeHero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Dashboard from './components/Dashboard';
import ContactSection from './components/ContactSection';
import { Shield, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased">
      
      {/* Dynamic Header menu */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow">
        {/* Home Block */}
        <HomeHero onNavigate={setActiveTab} />

        {/* Story Bio Block */}
        <AboutSection />

        {/* Upgrades Lab (Skills) Block */}
        <SkillsSection />

        {/* Works (Projects) Block */}
        <ProjectsSection onNavigate={setActiveTab} />

        {/* Master Strategy Control Center Dashboard */}
        <Dashboard />

        {/* Communications Roster (Contact) Block */}
        <ContactSection />
      </main>

      {/* Footer Branding block */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-black font-mono">
              ★
            </div>
            <div>
              <p className="font-sans font-extrabold text-sm text-white tracking-tight">AXE<span className="text-cyan-400">.DEV</span></p>
              <p className="font-mono text-[9px] text-slate-500">ENGINEERED AT TOWN HALL 16 CAPACITY</p>
            </div>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono font-bold text-slate-500">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              WAR ROOM HOME
            </button>
            <span className="select-none text-slate-800">|</span>
            <a
              href="https://supercell.com/en/games/clashofclans/"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-cyan-400 transition-colors"
            >
              OFFICIAL CLASH
            </a>
            <span className="select-none text-slate-800">|</span>
            <a
              href="https://www.clash.ninja/"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="hover:text-cyan-400 transition-colors"
            >
              NINJA CALCULATORS
            </a>
          </div>

          <div className="text-center md:text-right font-mono text-[10px] text-slate-500">
            <p className="flex items-center justify-center md:justify-end gap-1 font-semibold text-cyan-455">
              <Shield className="w-3 h-3 text-cyan-400" /> SECURED ENCRYPTED CORE
            </p>
            <p className="mt-1">© 2026 Axe Dev Inc. All strategic assets protected.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
