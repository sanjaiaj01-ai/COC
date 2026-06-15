import { useState, useEffect } from 'react';
import { Menu, X, Shield, Swords } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'dashboard', label: 'Clash Strategy Hub' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-cyan-900/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="flex items-center justify-center w-full h-full rounded-[7px] bg-slate-950">
                <Swords className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-500 text-[8px] font-bold text-slate-950">
                16
              </span>
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                AXE<span className="text-cyan-400">.DEV</span>
              </span>
              <p className="font-mono text-[9px] text-cyan-500 leading-none tracking-wider">TOWN HALL 16 MAX</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-md font-sans text-xs font-medium cursor-pointer tracking-wide transition-all duration-300 relative ${
                  activeTab === item.id
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span
                    className="absolute bottom-1 left-4 right-4 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] rounded-full"
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="ml-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 hover:from-cyan-500 hover:to-teal-500 border border-cyan-500/50 hover:border-transparent text-cyan-400 hover:text-slate-950 rounded-md font-sans text-xs font-semibold cursor-pointer tracking-wider transition-all duration-300 ease-out shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>WAR ROOM</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/65 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-slate-950 border-b border-cyan-900/40 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-md font-sans text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-cyan-950/40 text-cyan-400 border-l-2 border-cyan-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-slate-950 font-bold rounded-md font-sans text-sm tracking-wider"
          >
            <Shield className="w-4 h-4" />
            <span>ENTER WAR ROOM</span>
          </button>
        </div>
      )}
    </nav>
  );
}
