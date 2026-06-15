import { useState, useEffect, FormEvent } from 'react';
import {
  INITIAL_ATTACK_LOGS,
  INITIAL_CLAN_MEMBERS,
  INITIAL_ACHIEVEMENTS,
  SERIES_REVIEWS,
  COC_RECOMMENDATIONS,
  INITIAL_NEWS_FEED
} from '../data';
import { AttackLog, ClanMember, Achievement, SeriesReview, NewsFeedItem } from '../types';
import {
  TrendingUp,
  Plus,
  Trash2,
  Trophy,
  Award,
  BookOpen,
  Globe,
  PlusCircle,
  Sparkles,
  Swords,
  Flame,
  Shield,
  Search,
  ExternalLink,
  MessageSquare,
  Newspaper,
  Calendar,
  Layers
} from 'lucide-react';

export default function Dashboard() {
  // Tabs: 'tactics' | 'logs' | 'leaderboard' | 'badges' | 'news'
  const [activeSubTab, setActiveSubTab] = useState<'tactics' | 'logs' | 'leaderboard' | 'badges' | 'news'>('tactics');

  // --- PERSISTENT STATE MANAGEMENT via LocalStorage ---
  const [logs, setLogs] = useState<AttackLog[]>(() => {
    const saved = localStorage.getItem('coc_attack_logs');
    return saved ? JSON.parse(saved) : INITIAL_ATTACK_LOGS;
  });

  const [members, setMembers] = useState<ClanMember[]>(() => {
    const saved = localStorage.getItem('coc_clan_members');
    return saved ? JSON.parse(saved) : INITIAL_CLAN_MEMBERS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('coc_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  // Keep state for drafts
  const [draftPlans, setDraftPlans] = useState<{ name: string; army: Record<string, number>; spells: Record<string, number> }[]>(() => {
    const saved = localStorage.getItem('coc_draft_plans');
    return saved ? JSON.parse(saved) : [
      {
        name: "Yeti Clone Smash TH16",
        army: { "Yeti": 12, "Root Rider": 4, "Witch": 4 },
        spells: { "Rage": 2, "Freeze": 3, "Clone": 1 }
      }
    ];
  });

  // Save states to localStorage on change
  useEffect(() => {
    localStorage.setItem('coc_attack_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('coc_clan_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('coc_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('coc_draft_plans', JSON.stringify(draftPlans));
  }, [draftPlans]);

  // --- AUTOMATED GAMIFICATION ALGORITHM ---
  // Evaluate achievements on logs changes
  useEffect(() => {
    let triggeredChange = false;
    const updatedAchievements = achievements.map(ach => {
      if (ach.unlocked) return ach;

      // Check Criteria
      if (ach.id === 'ach-1') {
        // perfect 3 star
        const hasPerfect = logs.some(l => l.stars === 3);
        if (hasPerfect) { triggeredChange = true; return { ...ach, unlocked: true }; }
      }
      if (ach.id === 'ach-2') {
        // Loot Accumulator
        const totalLootCombined = logs.reduce((sum, l) => sum + l.gold + l.elixir, 0);
        if (totalLootCombined >= 1500000) { triggeredChange = true; return { ...ach, unlocked: true }; }
      }
      if (ach.id === 'ach-3') {
        // Dark Elixir
        const hasDEHuge = logs.some(l => l.darkElixir >= 9000);
        if (hasDEHuge) { triggeredChange = true; return { ...ach, unlocked: true }; }
      }
      if (ach.id === 'ach-5') {
        // veteran raider 10+ attacks
        if (logs.length >= 10) { triggeredChange = true; return { ...ach, unlocked: true }; }
      }
      return ach;
    });

    if (triggeredChange) {
      setAchievements(updatedAchievements);
    }

    // Also sync the badges count in clan member Axe
    const unlockedCount = updatedAchievements.filter(a => a.unlocked).length;
    setMembers(prev => prev.map(m => {
      if (m.name.includes('Axe')) {
        return { ...m, badgesCount: unlockedCount, attacksSucceeded: logs.filter(l => l.playerName.includes('Axe') && l.stars > 0).length };
      }
      return m;
    }));
  }, [logs]);

  // --- TAB 1: TROOP STRATEGY & ARMY COMPOSER STATE ---
  const TROOP_DATABASE = [
    { name: 'Root Rider', space: 20, description: 'Smashes through walls.' },
    { name: 'Barbarian', space: 1, description: 'Standard front line.' },
    { name: 'Archer', space: 1, description: 'Ranged cleaner.' },
    { name: 'Giant', space: 5, description: 'High health distraction.' },
    { name: 'Balloons', space: 5, description: 'Targets defenses first.' },
    { name: 'Wizard', space: 4, description: 'High damage fire analyst.' },
    { name: 'Healer', space: 14, description: 'Sustains Hero health.' },
    { name: 'Dragon', space: 20, description: 'Brutal aerial breath.' },
    { name: 'P.E.K.K.A', space: 25, description: 'Destructive steel shield.' },
    { name: 'Electro Dragon', space: 30, description: 'Lightning chain utility.' },
    { name: 'Yeti', space: 18, description: 'Spawns Yetimites over targets.' },
    { name: 'Super Archer', space: 12, description: 'Piercing arrow lines.' }
  ];

  const SPELL_DATABASE = [
    { name: 'Rage', slots: 2 },
    { name: 'Healing', slots: 2 },
    { name: 'Freeze', slots: 1 },
    { name: 'Jump', slots: 2 },
    { name: 'Invisibility', slots: 1 },
    { name: 'Clone', slots: 3 },
    { name: 'Poison', slots: 1 }
  ];

  const TH16_MAX_HOUSING = 320;
  const TH16_MAX_SPELLS = 11;

  const [activeArmy, setActiveArmy] = useState<Record<string, number>>({
    'Root Rider': 4,
    'Healer': 5,
    'Yeti': 6,
    'Super Archer': 2,
    'Balloons': 4
  });

  const [activeSpells, setActiveSpells] = useState<Record<string, number>>({
    'Rage': 2,
    'Freeze': 3,
    'Invisibility': 2,
    'Poison': 1
  });

  const [plannerPlanName, setPlannerPlanName] = useState('My Custom War Setup');

  const currentArmySpace = Object.entries(activeArmy).reduce((sum, [name, qty]) => {
    const tr = TROOP_DATABASE.find(t => t.name === name);
    return sum + (tr ? tr.space * (qty as number) : 0);
  }, 0);

  const currentSpellSlots = Object.entries(activeSpells).reduce((sum, [name, qty]) => {
    const sp = SPELL_DATABASE.find(s => s.name === name);
    return sum + (sp ? sp.slots * (qty as number) : 0);
  }, 0);

  const updateTroopCount = (troopName: string, change: number) => {
    setActiveArmy(prev => {
      const current = prev[troopName] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [troopName]: next };
    });
  };

  const updateSpellCount = (spellName: string, change: number) => {
    setActiveSpells(prev => {
      const current = prev[spellName] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [spellName]: next };
    });
  };

  const handleSaveArmyPreset = () => {
    if (currentArmySpace > TH16_MAX_HOUSING) {
      alert("Warning: Custom army exceeds Town hall space limit!");
    }
    const newDraft = {
      name: plannerPlanName || `Draft Setup #${draftPlans.length + 1}`,
      army: { ...activeArmy },
      spells: { ...activeSpells }
    };
    setDraftPlans(prev => [newDraft, ...prev]);
    // Auto unlock achievement progress checking
    setAchievements(prev => prev.map(ach => {
      if (ach.id === 'ach-4') {
        const plansThreshold = draftPlans.length + 1 >= 4;
        return { ...ach, unlocked: plansThreshold };
      }
      return ach;
    }));
  };

  const handleApplyPreset = (preset: { name: string; army: Record<string, number>; spells: Record<string, number> }) => {
    setActiveArmy(preset.army);
    setActiveSpells(preset.spells);
    setPlannerPlanName(preset.name);
  };

  const handleDeletePreset = (index: number) => {
    setDraftPlans(prev => prev.filter((_, i) => i !== index));
  };


  // --- TAB 2: ATTACK LOGS FORM & FILTER STATES ---
  const [filterStrVal, setFilterStrVal] = useState('');
  const [filterStars, setFilterStars] = useState<number | 'ALL'>('ALL');
  
  // New Log inputs
  const [newLogAttacker, setNewLogAttacker] = useState('Axe (You)');
  const [newLogDefenderTH, setNewLogDefenderTH] = useState(16);
  const [newLogAttackerTH, setNewLogAttackerTH] = useState(16);
  const [newLogStrategy, setNewLogStrategy] = useState('Super Archer Blimp Clone Root Riders');
  const [newLogStars, setNewLogStars] = useState(3);
  const [newLogPct, setNewLogPct] = useState(100);
  const [newLogGold, setNewLogGold] = useState(800000);
  const [newLogElixir, setNewLogElixir] = useState(800000);
  const [newLogDE, setNewLogDE] = useState(8500);
  const [newLogNotes, setNewLogNotes] = useState('');

  const handleAddLogSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newLog: AttackLog = {
      id: `log-${Date.now()}`,
      playerName: newLogAttacker || 'Clasher',
      defenderTownHall: Number(newLogDefenderTH),
      attackerTownHall: Number(newLogAttackerTH),
      strategy: newLogStrategy,
      stars: Number(newLogStars),
      percentage: Number(newLogPct),
      gold: Number(newLogGold),
      elixir: Number(newLogElixir),
      darkElixir: Number(newLogDE),
      date: new Date().toISOString().split('T')[0],
      notes: newLogNotes || 'Logged from strategy panel draft.'
    };

    setLogs(prev => [newLog, ...prev]);

    // Also update leaderboard ranking scores to make the page dynamic
    setMembers(prev => prev.map(m => {
      if (m.name.toLowerCase() === newLog.playerName.toLowerCase()) {
        const addedWarStars = newLog.stars;
        const newScore = m.trophies + (newLog.stars === 3 ? 30 : newLog.stars === 2 ? 15 : newLog.stars === 1 ? 5 : -15);
        return {
          ...m,
          trophies: Math.max(0, newScore),
          warStars: m.warStars + addedWarStars,
          attacksSucceeded: m.attacksSucceeded + (newLog.stars > 0 ? 1 : 0)
        };
      }
      return m;
    }));

    // Reset fields
    setNewLogNotes('');
    setNewLogPct(100);
    setNewLogStars(3);
  };

  const handleRemoveLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };


  // --- TAB 3: LEADERBOARD MEMBER ADDITION ---
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Leader' | 'Co-Leader' | 'Elder' | 'Member'>('Member');
  const [newMemberTrophies, setNewMemberTrophies] = useState(5000);

  const handleAddMember = (e: FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: ClanMember = {
      id: `member-${Date.now()}`,
      name: newMemberName,
      rank: members.length + 1,
      role: newMemberRole,
      trophies: Number(newMemberTrophies),
      warStars: Math.floor(Math.random() * 500) + 100,
      badgesCount: 0,
      attacksSucceeded: Math.floor(Math.random() * 50) + 10
    };

    const reSorted = [...members, newMember].sort((a, b) => b.trophies - a.trophies);
    const withRanks = reSorted.map((item, index) => ({ ...item, rank: index + 1 }));

    setMembers(withRanks);
    setNewMemberName('');
  };


  // --- TAB 5: NEWS FILTER ---
  const [newsFilter, setNewsFilter] = useState<'ALL' | 'Balance Update' | 'Major Patch' | 'Future Leak' | 'Community Event'>('ALL');


  // Computed stats for logging
  const filteredLogs = logs.filter(l => {
    const matchSearch = l.playerName.toLowerCase().includes(filterStrVal.toLowerCase()) ||
                        l.strategy.toLowerCase().includes(filterStrVal.toLowerCase());
    const matchStars = filterStars === 'ALL' || l.stars === Number(filterStars);
    return matchSearch && matchStars;
  });

  const totalGoldLogged = logs.reduce((sum, l) => sum + l.gold, 0);
  const totalElixirLogged = logs.reduce((sum, l) => sum + l.elixir, 0);
  const totalDELogged = logs.reduce((sum, l) => sum + l.darkElixir, 0);
  const totalStarsLogged = logs.reduce((sum, l) => sum + l.stars, 0);
  const successCount = logs.filter(l => l.stars >= 2).length;
  const successRatio = logs.length > 0 ? (successCount / logs.length) * 100 : 0;

  return (
    <section id="dashboard" className="py-24 bg-slate-900 border-t border-cyan-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Intro Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 border border-cyan-500/30 overflow-hidden mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Decorative Backing Accent text */}
          <div className="absolute -right-6 -top-12 text-cyan-500 opacity-5 text-9xl sm:text-[11rem] font-black pointer-events-none select-none tracking-tighter font-sans italic">
            COC
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            <div className="space-y-3 max-w-2xl text-left">
              <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-cyan-405" /> CLAN CONTROL CENTER
              </p>
              <h2 className="font-sans font-black text-2xl sm:text-4xl text-cyan-300 italic tracking-tighter uppercase leading-none">
                War Strategy & Tactical Dashboard
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Configure dynamic, elite army structures, catalog warfare activities securely, trace automated achievements, and inspect real-time Balance guidelines and official resource redirects.
              </p>
            </div>

            {/* Quick Metrics from the target design */}
            <div className="flex gap-4 shrink-0 w-full md:w-auto min-w-[280px]">
              <div className="bg-black/30 p-3 rounded-lg flex-1 border border-cyan-500/10 backdrop-blur-sm">
                <p className="text-[9px] font-mono text-cyan-400 uppercase font-bold mb-1">Active War Status</p>
                <div className="flex justify-between items-end gap-2">
                  <span className="text-base font-bold text-white tracking-widest font-mono">42 - 38</span>
                  <span className="text-[8px] font-mono bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded uppercase font-semibold">Ends in 04:12:10</span>
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-lg flex-1 border border-cyan-500/10 backdrop-blur-sm">
                <p className="text-[9px] font-mono text-cyan-400 uppercase font-bold mb-1">Current Active Tactic</p>
                <span className="text-xs italic text-slate-100 block mt-1">"Zap-Titan Hybrid Split"</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN DASHBOARD NAVIGATION SUB-TABS --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-2 border-b border-slate-800">
          <button
            onClick={() => setActiveSubTab('tactics')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeSubTab === 'tactics'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Army Composer</span>
          </button>

          <button
            onClick={() => setActiveSubTab('logs')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeSubTab === 'logs'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Attack Logs Journal</span>
          </button>

          <button
            onClick={() => setActiveSubTab('leaderboard')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeSubTab === 'leaderboard'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Top Clan Standings</span>
          </button>

          <button
            onClick={() => setActiveSubTab('badges')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeSubTab === 'badges'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Achievements</span>
          </button>

          <button
            onClick={() => setActiveSubTab('news')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeSubTab === 'news'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>News & Releases</span>
          </button>
        </div>


        {/* --- TAB CONTENT 1: ARMY SETUP PLANNER --- */}
        {activeSubTab === 'tactics' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Split Screen Panel for Composer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Config Panel */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Heading name plan */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest">TACTICAL PLAN TITLE</span>
                  <input
                    type="text"
                    value={plannerPlanName}
                    onChange={(e) => setPlannerPlanName(e.target.value)}
                    className="mt-2 block w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 text-white rounded-md px-4 py-2.5 font-sans font-bold text-sm"
                    placeholder="E.g., Queen Charge Miner Hybrid TH16"
                  />
                </div>

                {/* Troop Selector Grid */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="font-sans font-bold text-white text-sm">Select Clash Troops</span>
                    <span className={`font-mono text-xs ${currentArmySpace > TH16_MAX_HOUSING ? 'text-rose-400 font-extrabold animate-pulse' : 'text-cyan-400'}`}>
                      CAPACITY: {currentArmySpace} / {TH16_MAX_HOUSING} HOUSING
                    </span>
                  </div>

                  {/* Composer list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {TROOP_DATABASE.map(t => {
                      const count = activeArmy[t.name] || 0;
                      return (
                        <div key={t.name} className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-sans font-semibold text-white text-xs">{t.name}</span>
                              <span className="font-mono text-[9px] text-slate-500">Space: {t.space}</span>
                            </div>
                            <p className="font-sans text-[10px] text-slate-500 truncate mt-0.5">{t.description}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <button
                              onClick={() => updateTroopCount(t.name, -1)}
                              className="font-mono font-black text-xs hover:text-cyan-400 w-7 h-7 rounded border border-slate-800 hover:border-cyan-500/30 flex items-center justify-center cursor-pointer select-none"
                            >
                              -
                            </button>
                            <span className="font-mono text-sm font-bold text-white">{count}</span>
                            <button
                              onClick={() => updateTroopCount(t.name, 1)}
                              className="font-mono font-black text-xs hover:text-cyan-400 w-7 h-7 rounded border border-slate-800 hover:border-cyan-500/30 flex items-center justify-center cursor-pointer select-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Spell Selector Grid */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="font-sans font-bold text-white text-sm">Select Spell Spells</span>
                    <span className={`font-mono text-xs ${currentSpellSlots > TH16_MAX_SPELLS ? 'text-rose-400 font-extrabold animate-pulse' : 'text-cyan-400'}`}>
                      SPELLS CAPACITY: {currentSpellSlots} / {TH16_MAX_SPELLS} SLOTS
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {SPELL_DATABASE.map(s => {
                      const count = activeSpells[s.name] || 0;
                      return (
                        <div key={s.name} className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                          <div>
                            <span className="font-sans font-semibold text-white text-xs">{s.name}</span>
                            <p className="font-mono text-[9px] text-slate-500 mt-1">Slots: {s.slots}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <button
                              onClick={() => updateSpellCount(s.name, -1)}
                              className="font-mono font-black text-xs hover:text-cyan-400 w-6 h-6 rounded border border-slate-800 hover:border-cyan-500/30 flex items-center justify-center cursor-pointer select-none"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold text-white">{count}</span>
                            <button
                              onClick={() => updateSpellCount(s.name, 1)}
                              className="font-mono font-black text-xs hover:text-cyan-400 w-6 h-6 rounded border border-slate-800 hover:border-cyan-500/30 flex items-center justify-center cursor-pointer select-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Previews and Active Presets Output */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Active Army Output summary card */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-950/20 to-teal-950/20 border border-cyan-800/20 shadow-xl space-y-4">
                  <h3 className="font-sans font-bold text-white text-base flex items-center gap-1.5 border-b border-slate-800/50 pb-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> Active Tally Output
                  </h3>

                  <div className="space-y-4">
                    {/* Active Troops summaries */}
                    <div>
                      <span className="font-mono text-[9px] text-slate-400 font-bold block mb-1">CONSTRUCTED ARMY:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(activeArmy).filter(([_, qty]) => (qty as number) > 0).map(([nom, qty]) => (
                          <span key={nom} className="inline-flex items-center px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                            {nom} <span className="font-mono text-cyan-400 font-bold ml-1.5">x{qty as number}</span>
                          </span>
                        ))}
                        {Object.values(activeArmy).every(v => v === 0) && (
                          <span className="font-sans text-xs text-slate-500 italic">No troops selected yet. Use composer controls left.</span>
                        )}
                      </div>
                    </div>

                    {/* Active Spells summaries */}
                    <div>
                      <span className="font-mono text-[9px] text-slate-400 font-bold block mb-1">CONSTRUCTED SPELLS:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(activeSpells).filter(([_, qty]) => (qty as number) > 0).map(([nom, qty]) => (
                          <span key={nom} className="inline-flex items-center px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                            {nom} <span className="font-mono text-teal-400 font-bold ml-1.5">x{qty as number}</span>
                          </span>
                        ))}
                        {Object.values(activeSpells).every(v => v === 0) && (
                          <span className="font-sans text-xs text-slate-500 italic">No spells selected yet.</span>
                        )}
                      </div>
                    </div>

                    {/* Capacity indicators */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/40 font-mono text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>Attacking Units Space</span>
                        <span className="font-bold text-white">{currentArmySpace}/320</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Spell Utility Capacity</span>
                        <span className="font-bold text-white">{currentSpellSlots}/11</span>
                      </div>
                    </div>

                    {/* Button trigger draft */}
                    <button
                      onClick={handleSaveArmyPreset}
                      className="w-full flex items-center justify-center space-x-1.5 py-3 bg-cyan-500 text-slate-950 font-sans text-xs font-bold uppercase tracking-wider rounded-md hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Draft Planning Presets</span>
                    </button>
                  </div>
                </div>

                {/* Draft Presets Storage */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
                  <h3 className="font-sans font-bold text-white text-xs tracking-wider uppercase">Saved Strategy drafts</h3>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {draftPlans.map((pl, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/10 transition-colors flex items-center justify-between">
                        <div className="space-y-1">
                          <p onClick={() => handleApplyPreset(pl)} className="font-sans font-bold text-white text-xs cursor-pointer hover:text-cyan-400 transition-colors">{pl.name}</p>
                          <p className="font-mono text-[9px] text-slate-500">
                            {Object.entries(pl.army).filter(([_, q]) => (q as number) > 0).slice(0, 3).map(([n, q]) => `${q} ${n}`).join(', ')}...
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeletePreset(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-950 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {draftPlans.length === 0 && (
                      <p className="font-sans text-xs text-slate-500 italic text-center py-4">No draft presets logged yet.</p>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Curated Reviews Section (Specifically highlights user requests) */}
            <div className="pt-8 border-t border-slate-800/60">
              <div className="space-y-3 mb-8 text-center md:text-left">
                <p className="font-mono text-[10px] text-cyan-400 tracking-widest font-semibold uppercase">ESPORT AUDITS</p>
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-white">Favorite Video Series, Guides & Reviews</h3>
                <p className="font-sans text-xs text-slate-400">Deep qualitative reviews of authoritative Clash of Clans tutorials from Esports competitors.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERIES_REVIEWS.map(rev => (
                  <div key={rev.id} className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      {/* Badge / Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[9px] text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/30">
                          {rev.type}
                        </span>
                        {/* Rating stars */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(rev.rating) ? 'text-amber-400' : 'text-slate-700'}`}>⭐</span>
                          ))}
                        </div>
                      </div>

                      <h4 className="font-sans font-bold text-white text-sm sm:text-base">{rev.title}</h4>
                      <p className="font-mono text-[9px] text-slate-500 mt-0.5">AUTHOR: {rev.author}</p>
                      
                      <p className="font-sans text-xs text-slate-400 mt-3 leading-relaxed">
                        {rev.summary}
                      </p>

                      {/* Lessons bullets */}
                      <div className="mt-4 pt-3 border-t border-slate-900/60">
                        <span className="font-mono text-[9px] text-slate-500 font-bold block mb-1.5">STRATEGIC KEY TAKEAWAYS:</span>
                        <ul className="space-y-1">
                          {rev.lessonsLearned.map((les, i) => (
                            <li key={i} className="font-sans text-[11px] text-slate-300 flex items-start gap-1">
                              <span className="text-cyan-400 shrink-0 select-none">•</span>
                              <span>{les}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={rev.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="mt-6 flex items-center justify-center space-x-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-cyan-300 font-semibold rounded transition-colors text-center"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Inspect Series Guide</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions & Helper Links / Redirects */}
            <div className="pt-8 border-t border-slate-800/60">
              <div className="space-y-3 mb-6">
                <h3 className="font-sans font-bold text-base text-white text-center md:text-left">Suggested Clan Builders & Calculators</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {COC_RECOMMENDATIONS.map(rec => (
                  <div key={rec.id} className="p-4 rounded-lg bg-slate-900 border border-slate-800/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] text-teal-400 uppercase font-bold">{rec.category}</span>
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <h4 className="font-sans font-bold text-white text-xs">{rec.title}</h4>
                      <p className="font-sans text-[11px] text-slate-400 mt-1 lines-clamp-2">
                        {rec.description}
                      </p>
                    </div>

                    <a
                      href={rec.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="mt-4 flex items-center justify-between text-[10px] text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                    >
                      <span className="font-mono text-[9px] text-slate-500 tracking-tight">{rec.authoritativeSource}</span>
                      <span className="flex items-center">Apply template <ExternalLink className="w-2.5 h-2.5 ml-1" /></span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}


        {/* --- TAB CONTENT 2: ATTACK LOGS --- */}
        {activeSubTab === 'logs' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Loot & Star Analytics Ticker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-mono text-[9px] text-slate-500 font-bold block">TOTAL BATTLES LOGGED</span>
                <span className="font-sans text-2xl font-black text-white mt-1 block">{logs.length}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-mono text-[9px] text-slate-500 font-bold block">AVG STARS EARNED</span>
                <span className="font-sans text-2xl font-black text-cyan-400 mt-1 block">
                  {logs.length > 0 ? (totalStarsLogged / logs.length).toFixed(1) : '0.0'} ★
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-mono text-[9px] text-slate-500 font-bold block">ACCUMULATED HAULS</span>
                <span className="font-sans text-lg font-black text-teal-400 mt-2 block truncate">
                  Gold: {(totalGoldLogged / 1000000).toFixed(2)}M
                </span>
                <span className="font-sans text-lg font-black text-cyan-400 block truncate">
                  Elixir: {(totalElixirLogged / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-mono text-[9px] text-slate-500 font-bold block">DARK ELIXIR PIPED</span>
                <span className="font-sans text-2xl font-black text-fuchsia-400 mt-1 block truncate">
                  {totalDELogged.toLocaleString()} DE
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="font-mono text-[9px] text-slate-500 font-bold block">WAR SUCCESS RATE</span>
                <span className="font-sans text-2xl font-black text-emerald-400 mt-1 block">
                  {successRatio.toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form to submit Logs */}
              <div className="lg:col-span-4 p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-6">
                <h3 className="font-sans font-bold text-white text-base">Journal New Combat Log</h3>
                
                <form onSubmit={handleAddLogSubmit} className="space-y-4">
                  
                  {/* Attacker */}
                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1">ATTACKER MEMBER</label>
                    <select
                      value={newLogAttacker}
                      onChange={(e) => setNewLogAttacker(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-200 rounded px-3 py-2 text-xs"
                    >
                      {members.map(m => (
                        <option key={m.id} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* TH layouts */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] text-slate-400 block mb-1">ATTACKER TH</label>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={newLogAttackerTH}
                        onChange={(e) => setNewLogAttackerTH(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-850 text-slate-200 rounded px-3 py-1.5 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-slate-400 block mb-1">DEFENDER TH</label>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        value={newLogDefenderTH}
                        onChange={(e) => setNewLogDefenderTH(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-850 text-slate-200 rounded px-3 py-1.5 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Strategy */}
                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1">TACTICAL ARMY STRATEGY</label>
                    <select
                      value={newLogStrategy}
                      onChange={(e) => setNewLogStrategy(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-200 rounded px-3 py-2 text-xs"
                    >
                      <option value="Super Archer Blimp Clone Root Riders">Super Archer Blimp Clone Root Riders</option>
                      <option value="Blimp Electro Titan Smash">Blimp Electro Titan Smash</option>
                      <option value="Queen Charge Hybrid (Miner/Hog)">Queen Charge Hybrid (Miner/Hog)</option>
                      <option value="Zap Lalo (LavaLoon)">Zap Lalo (LavaLoon)</option>
                      <option value="Electro Dragon Chain Rage">Electro Dragon Chain Rage</option>
                      <option value="Golem Yeti Witch Smash">Golem Yeti Witch Smash</option>
                    </select>
                  </div>

                  {/* Stars & Percentage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] text-slate-400 block mb-1">STARS EARNED</label>
                      <select
                        value={newLogStars}
                        onChange={(e) => setNewLogStars(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-850 text-slate-200 rounded px-3 py-1.5 text-xs font-bold"
                      >
                        <option value="0">0 Stars (Fail)</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars (Flawless)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-slate-400 block mb-1">PERCENTAGE (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={newLogPct}
                        onChange={(e) => setNewLogPct(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-850 text-slate-200 rounded px-3 py-1.5 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Loot resources */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-slate-400 block">RECOVERED RESOURCES</label>
                    
                    <div>
                      <div className="flex justify-between text-[8px] font-mono mb-0.5 text-slate-500">
                        <span>GOLD CAPTURED</span>
                        <span>{newLogGold.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="100000"
                        max="1200000"
                        step="20000"
                        value={newLogGold}
                        onChange={(e) => setNewLogGold(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[8px] font-mono mb-0.5 text-slate-500">
                        <span>ELIXIR CAPTURED</span>
                        <span>{newLogElixir.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="100000"
                        max="1200000"
                        step="20000"
                        value={newLogElixir}
                        onChange={(e) => setNewLogElixir(Number(e.target.value))}
                        className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[8px] font-mono mb-0.5 text-slate-500">
                        <span>DARK ELIXIR HAUL</span>
                        <span>{newLogDE.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="12000"
                        step="100"
                        value={newLogDE}
                        onChange={(e) => setNewLogDE(Number(e.target.value))}
                        className="w-full accent-fuchsia-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1">RECONNAISSANCE NOTES</label>
                    <textarea
                      value={newLogNotes}
                      onChange={(e) => setNewLogNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-200 rounded p-2 text-xs font-sans placeholder-slate-600"
                      placeholder="Comment on Warden ability, CC responses or funnel pitfalls..."
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-sans text-xs font-bold uppercase tracking-wider rounded transition-all hover:scale-[1.01] hover:shadow-[0_4px_15px_rgba(6,182,212,0.25)] cursor-pointer"
                  >
                    Commit Combat Record
                  </button>

                </form>
              </div>

              {/* Right Column: List of logged battles */}
              <div className="lg:col-span-8 flex flex-col space-y-4">
                
                {/* Search / Filters Bar */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-850 text-slate-300 rounded-md pl-9 pr-4 py-2 font-sans text-xs placeholder-slate-550"
                      placeholder="Search player or army strategy..."
                      value={filterStrVal}
                      onChange={(e) => setFilterStrVal(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="font-mono text-[10px] text-slate-500 font-bold uppercase">FILTER BY STARS:</span>
                    <div className="flex rounded-md bg-slate-905 overflow-hidden border border-slate-850 p-[1px]">
                      {['ALL', '3', '2', '1', '0'].map(stars => (
                        <button
                          key={stars}
                          onClick={() => setFilterStars(stars === 'ALL' ? 'ALL' : Number(stars))}
                          className={`px-3 py-1.5 font-mono text-xs font-bold cursor-pointer transition-colors ${
                            (filterStars === 'ALL' && stars === 'ALL') || filterStars === Number(stars)
                              ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 rounded'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {stars === 'ALL' ? 'ALL' : `${stars}★`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logs Listing block */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  {filteredLogs.map(log => (
                    <div key={log.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Header metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-sans font-bold text-white text-xs sm:text-sm">{log.playerName}</span>
                            <span className="font-mono text-[10px] text-slate-500">logged a raid</span>
                          </div>
                          
                          {/* Trash button */}
                          <button
                            onClick={() => handleRemoveLog(log.id)}
                            className="text-slate-600 hover:text-rose-400 p-1.5 rounded hover:bg-slate-900 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Middle strategy stats tier */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-y border-slate-900">
                          <div>
                            <span className="font-mono text-[8px] text-slate-500 block">TACTICS DEPLOYED</span>
                            <span className="font-sans text-xs font-bold text-white mt-0.5 block truncate">{log.strategy}</span>
                          </div>
                          <div>
                            <span className="font-mono text-[8px] text-slate-500 block">ENGAGEMENT TIER</span>
                            <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5 block">TH {log.attackerTownHall} vs TH {log.defenderTownHall}</span>
                          </div>
                          <div>
                            <span className="font-mono text-[8px] text-slate-500 block">DESTRUCTION SPEED</span>
                            <span className="font-sans text-xs font-bold text-white mt-0.5 block">{log.percentage}% Damage</span>
                          </div>
                          <div>
                            <span className="font-mono text-[8px] text-slate-500 block">STARS WON</span>
                            <span className="font-sans text-xs font-bold text-amber-400 mt-0.5 block">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <span key={i} className={i < log.stars ? "text-amber-400" : "text-slate-800"}>★</span>
                              ))}
                            </span>
                          </div>
                        </div>

                        {/* Loot values */}
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-400">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> {log.gold.toLocaleString()} Gold</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> {log.elixir.toLocaleString()} Elixir</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-fuchsia-400" /> {log.darkElixir.toLocaleString()} Dark Elixir</span>
                          <span className="text-[9px] text-slate-500 ml-auto flex items-center gap-1"><Calendar className="w-3 h-3" /> {log.date}</span>
                        </div>

                        {/* Recon notes text */}
                        <p className="font-sans text-xs text-slate-400 italic bg-slate-900/40 border-l border-cyan-800/30 p-2.5 rounded-r">
                          "{log.notes}"
                        </p>
                      </div>
                    </div>
                  ))}

                  {filteredLogs.length === 0 && (
                    <div className="p-12 rounded-xl bg-slate-950 border border-slate-805 text-center text-slate-500 space-y-2">
                      <p className="font-sans text-sm italic">No matching raid logs recorded in database.</p>
                      <p className="font-sans text-xs">Try adjusting keywords or submit custom battle statistics on the left panel.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}


        {/* --- TAB CONTENT 3: LEADERBOARD --- */}
        {activeSubTab === 'leaderboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Table layout splits */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Register New Contestant */}
              <div className="lg:col-span-4 p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-6">
                <h3 className="font-sans font-bold text-white text-base">Affiliate Clan Clasher</h3>
                
                <form onSubmit={handleAddMember} className="space-y-4">
                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1">CLASHER USERNAME</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-850 text-slate-350 rounded-md px-3 py-2 text-xs"
                      placeholder="E.g., CarbonFinChamp"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1">CLAN ROLE</label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-850 text-slate-350 rounded-md px-3 py-2 text-xs"
                    >
                      <option value="Leader">Leader</option>
                      <option value="Co-Leader">Co-Leader</option>
                      <option value="Elder">Elder</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1">INITIAL TROPHIES SCORE</label>
                    <input
                      type="number"
                      className="w-full bg-slate-900 border border-slate-850 text-slate-350 rounded-md px-3 py-1.5 font-mono text-xs"
                      min="1000"
                      max="6000"
                      value={newMemberTrophies}
                      onChange={(e) => setNewMemberTrophies(Number(e.target.value))}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold font-sans text-xs tracking-wide rounded transition-colors uppercase cursor-pointer"
                  >
                    Recruit Member
                  </button>
                </form>
              </div>

              {/* Right Column: Leaderboard Table */}
              <div className="lg:col-span-8 p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-sans font-bold text-white text-base">Aqua Vanguard Roster Standing</h3>
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Lvl 16 Clan League</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-slate-300">
                    <thead>
                      <tr className="font-mono text-[9px] text-slate-500 uppercase tracking-wider border-b border-slate-900">
                        <th className="py-3 px-2">RANK</th>
                        <th className="py-3 px-2">CLASHER</th>
                        <th className="py-3 px-2">CLAN CARD</th>
                        <th className="py-3 px-2">WAR STARS</th>
                        <th className="py-3 px-2">BADGES COUNT</th>
                        <th className="py-3 px-2 text-right">TROPHIES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-xs">
                      {members.map(mb => {
                        const isYou = mb.name.includes('Axe');
                        return (
                          <tr key={mb.id} className={`hover:bg-slate-900/40 transition-colors ${isYou ? 'bg-cyan-950/15' : ''}`}>
                            <td className="py-4 px-2 font-mono font-bold text-cyan-450">
                              {mb.rank === 1 ? '🥇' : mb.rank === 2 ? '🥈' : mb.rank === 3 ? '🥉' : `#${mb.rank}`}
                            </td>
                            <td className="py-4 px-2 font-bold text-white">
                              {mb.name} {isYou ? <span className="text-[9px] font-mono font-bold text-cyan-400 ml-1">(YOU)</span> : ''}
                            </td>
                            <td className="py-4 px-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-905 border border-slate-800">
                                {mb.role}
                              </span>
                            </td>
                            <td className="py-4 px-2 font-mono font-semibold">{mb.warStars}</td>
                            <td className="py-4 px-2">
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-cyan-400">
                                ⭐ {mb.badgesCount}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-right font-mono font-black text-white flex items-center justify-end gap-1.5 mt-1 border-t-0">
                              <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" /> {mb.trophies}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

          </div>
        )}


        {/* --- TAB CONTENT 4: BADGES & ACHIEVEMENTS --- */}
        {activeSubTab === 'badges' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(ach => (
                <div
                  key={ach.id}
                  className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    ach.unlocked
                      ? 'bg-radial-[ellipse_at_top_right] from-cyan-950/20 via-slate-950 to-slate-950 border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                      : 'bg-slate-950 border-slate-900 opacity-60'
                  }`}
                >
                  {/* Subtle watermarked glow for unlocked badges */}
                  {ach.unlocked && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />
                  )}

                  <div className="space-y-4">
                    {/* Visual Stamp Icon */}
                    <div className="flex items-center justify-between">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg font-mono ${
                        ach.unlocked
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        🛡️
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${
                        ach.unlocked
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}>
                        {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-base text-white">{ach.title}</h4>
                      <p className="font-mono text-[10px] text-cyan-450 mt-0.5">AWARDED BADGE: {ach.badgeName}</p>
                      <p className="font-sans text-xs text-slate-400 mt-2 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  {/* Criteria info footer */}
                  <div className="mt-6 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                    <span>CRITERION:</span>
                    <span className={ach.unlocked ? 'text-slate-350' : 'text-slate-500'}>{ach.criteria}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement dynamic tip notice */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center max-w-2xl mx-auto space-y-1">
              <span className="font-mono text-[9px] text-cyan-400 tracking-widest font-bold block">GAMIFIED REWARDS MECHANISM</span>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Unlock the <span className="text-white font-semibold">"Loot Millionaire"</span> badge by logging cumulative raid earnings above 1.5M resources, or the <span className="text-white font-semibold">"Three-Star Specialist"</span> badge by archiving a flawless 3-star victory in the Battle Journals tab! Actions trigger real-time unlock calibrations.
              </p>
            </div>

          </div>
        )}


        {/* --- TAB CONTENT 5: NEWS, RELEASES & MOCK SOCIAL FEED --- */}
        {activeSubTab === 'news' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: News Articles & Speculation leaks */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* News Sub Navigation Filter */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-805 flex flex-wrap gap-1.5">
                  {['ALL', 'Balance Update', 'Major Patch', 'Future Leak', 'Community Event'].map(filterItem => (
                    <button
                      key={filterItem}
                      onClick={() => setNewsFilter(filterItem as any)}
                      className={`px-3 py-1.5 font-sans text-xs font-semibold rounded cursor-pointer transition-colors ${
                        newsFilter === filterItem
                          ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filterItem === 'ALL' ? 'All Bulletins' : filterItem}
                    </button>
                  ))}
                </div>

                {/* Bulletins lists */}
                <div className="space-y-4">
                  {INITIAL_NEWS_FEED
                    .filter(item => newsFilter === 'ALL' || item.category === newsFilter)
                    .map(bullet => (
                      <div key={bullet.id} className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 border rounded font-mono text-[9px] font-bold uppercase ${
                            bullet.category === 'Future Leak'
                              ? 'bg-rose-950/40 text-rose-400 border-rose-900/30'
                              : bullet.category === 'Balance Update'
                              ? 'bg-cyan-950/45 text-cyan-450 border-cyan-850'
                              : 'bg-emerald-950/40 text-emerald-400 border-emerald-900/20'
                          }`}>
                            {bullet.category}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500">{bullet.date}</span>
                        </div>

                        <h4 className="font-sans font-bold text-white text-base">{bullet.title}</h4>
                        <p className="font-sans text-xs text-slate-450 leading-relaxed">{bullet.description}</p>
                      </div>
                    ))}
                </div>

              </div>

              {/* Right Column: Social Announcements Mock Integration & future release calendar */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Simulated Social Announcement Feed (X/Twitter style) */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
                  <h3 className="font-sans font-bold text-white text-xs tracking-wider uppercase border-b border-slate-900 pb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Webhook Social Alerts
                  </h3>

                  <div className="space-y-4">
                    {/* Simulated Tweet 1 */}
                    <div className="p-4 rounded bg-slate-900/60 border border-slate-850 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full bg-cyan-500 font-mono text-[10px] text-slate-950 font-bold flex items-center justify-center">
                          SC
                        </div>
                        <div>
                          <p className="font-sans text-xs font-bold text-white">Supercell Devs <span className="font-mono text-[9px] text-cyan-400">@clashofclans</span></p>
                          <p className="font-mono text-[8px] text-slate-500">2 hours ago</p>
                        </div>
                      </div>
                      <p className="font-sans text-xs text-slate-350 leading-relaxed">
                        🔥 High-fidelity testing for TH17 balance mechanics is active! We are looking into spell storage allocations for the Blizzard strategy parameters. Retweet if you love Root Riders! #Clash2026
                      </p>
                    </div>

                    {/* Simulated Tweet 2 */}
                    <div className="p-4 rounded bg-slate-900/60 border border-slate-850 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-full bg-cyan-500 font-mono text-[10px] text-slate-950 font-bold flex items-center justify-center">
                          AV
                        </div>
                        <div>
                          <p className="font-sans text-xs font-bold text-white">Aqua Vanguard Clan <span className="font-mono text-[9px] text-cyan-400">@vanguard_coc</span></p>
                          <p className="font-mono text-[8px] text-slate-500">Yesterday at 14:30</p>
                        </div>
                      </div>
                      <p className="font-sans text-xs text-slate-350 leading-relaxed">
                        Our General Axe registered perfect 3-star totals on the latest championship rounds! If you are a TH16 attacker looking for active war spreadsheets, apply through the portal below. 🛡️🏆
                      </p>
                    </div>
                  </div>

                </div>

                {/* Speculative Release Timeline */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
                  <h3 className="font-sans font-bold text-white text-xs tracking-wider uppercase">Future Upgrade Leaks</h3>
                  
                  <div className="space-y-4 text-xs">
                    <div className="border-l-2 border-cyan-500 pl-3 py-1">
                      <p className="font-mono text-[9px] text-slate-500">JULY 2026</p>
                      <h4 className="font-sans font-semibold text-white mt-0.5">Town Hall 17 Engine Preview</h4>
                      <p className="font-sans text-[11px] text-slate-400">Official developer stream hints layout specs for upcoming defense blocks.</p>
                    </div>

                    <div className="border-l-2 border-slate-800 pl-3 py-1">
                      <p className="font-mono text-[9px] text-slate-500">AUGUST 2026</p>
                      <h4 className="font-sans font-semibold text-slate-300 mt-0.5">Summer Elite Championship</h4>
                      <p className="font-sans text-[11px] text-slate-505">Aqua Vanguard qualify thresholds calculated for standard regional bracket playoffs.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
