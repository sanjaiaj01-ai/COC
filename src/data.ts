import { AttackLog, ClanMember, Achievement, SeriesReview, CoCRecommendation, NewsFeedItem, Project } from './types';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'coc-tactics',
    title: 'Clash Tactics & War Dashboard',
    description: 'A comprehensive visual suite built to optimize Clan War Leagues, track battle strategies, audit loot efficiency, and catalog strategy achievements.',
    longDescription: 'This application addresses structural coordination challenges in Clash of Clans wars. Features interactive troop-spell calculators, local attack history engines, auto-calculating trophy leaderboards, and gamified achievement badging to elevate standard gaming logs into high-fidelity data visualization dashboards.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Local Storage'],
    features: ['Interactive Troop Composer', 'Full Attack Logger', 'Gamified Achievement Badges', 'Dynamic Leaderboards'],
    gloveAccent: '#06b6d4'
  },
  {
    id: 'base-planner',
    title: 'GridCraft: Live Base Layout Compartmentalizer',
    description: 'An interactive HTML5 Canvas editor designed for drafting defensive wall layouts, visual range calculations, and optimal trap placement structures.',
    longDescription: 'Features multi-layered grid architectures, real-time radius indicators for Scattershots, Monoliths, and Eagle Artillery, and exportable layout codes compatible with official template formats.',
    tags: ['HTML5 Canvas', 'React', 'Context API', 'SVG Rendering'],
    features: ['Radius Sweep Preview', 'Drag-and-Drop Editor', 'Export Vector Coordinates', 'Custom Defense Configs'],
    gloveAccent: '#14b8a6'
  },
  {
    id: 'api-proxy',
    title: 'TrophyTrail: High-Performance Clash API Adapter',
    description: 'A modular backend adapter designed with cached proxies and data formatting engines to seamlessly consume developer endpoints of Supercell APIs.',
    longDescription: 'Constructs custom GraphQL layers over standard REST endpoints to deliver instant player achievements, clan trophies status changes, and war leagues standings securely.',
    tags: ['Node.js', 'Express', 'GraphQL', 'Redis Caching'],
    features: ['API Rate Limit Guard', 'Custom Query Filtration', 'Instant Webhook Integrations', 'Visual Stats Aggregator'],
    gloveAccent: '#0ea5e9'
  }
];

export const INITIAL_ATTACK_LOGS: AttackLog[] = [
  {
    id: 'log-1',
    playerName: 'Axe (You)',
    attackerTownHall: 16,
    defenderTownHall: 16,
    strategy: 'Blimp Electro Titan Smash',
    stars: 3,
    percentage: 100,
    gold: 750000,
    elixir: 810000,
    darkElixir: 8200,
    date: '2026-06-12',
    notes: 'Triggered warden ability perfectly right before the Blimp popped on top of the Town Hall. Super Wizards cloned nicely and cleared the entire core.'
  },
  {
    id: 'log-2',
    playerName: 'HogRider99',
    attackerTownHall: 15,
    defenderTownHall: 16,
    strategy: 'Zap Lalo (LavaLoon)',
    stars: 2,
    percentage: 92,
    gold: 580000,
    elixir: 640000,
    darkElixir: 4500,
    date: '2026-06-13',
    notes: 'A minor slip with an early Freeze spell left Heaters targeted by the air sweepers. Managed a high 2-star but ran out of cleanup troops.'
  },
  {
    id: 'log-3',
    playerName: 'QueenWarden',
    attackerTownHall: 16,
    defenderTownHall: 16,
    strategy: 'Super Archer Blimp Clone Root Riders',
    stars: 3,
    percentage: 100,
    gold: 920000,
    elixir: 950000,
    darkElixir: 9500,
    date: '2026-06-14',
    notes: 'Extremely clean funnel created by Barbarian King with Giant Gauntlet on the 3rd compartment, allowing the Root Riders to march straight into the Monolith.'
  },
  {
    id: 'log-4',
    playerName: 'Spellslinger',
    attackerTownHall: 14,
    defenderTownHall: 14,
    strategy: 'Queen Charge Hybrid (Miner/Hog)',
    stars: 1,
    percentage: 58,
    gold: 400000,
    elixir: 420000,
    darkElixir: 2100,
    date: '2026-06-14',
    notes: 'The Queen turned outward and failed to execute the charge. Triggered giant bomb trap early which devastated the massive Hog Rider clump.'
  }
];

export const INITIAL_CLAN_MEMBERS: ClanMember[] = [
  {
    id: 'member-1',
    name: 'Axe (You)',
    rank: 1,
    role: 'Leader',
    trophies: 5650,
    warStars: 2470,
    badgesCount: 4,
    attacksSucceeded: 120
  },
  {
    id: 'member-2',
    name: 'QueenWarden',
    rank: 2,
    role: 'Co-Leader',
    trophies: 5410,
    warStars: 1980,
    badgesCount: 3,
    attacksSucceeded: 98
  },
  {
    id: 'member-3',
    name: 'HogRider99',
    rank: 3,
    role: 'Elder',
    trophies: 5120,
    warStars: 1450,
    badgesCount: 2,
    attacksSucceeded: 74
  },
  {
    id: 'member-4',
    name: 'Spellslinger',
    rank: 4,
    role: 'Member',
    trophies: 4980,
    warStars: 820,
    badgesCount: 1,
    attacksSucceeded: 45
  },
  {
    id: 'member-5',
    name: 'GigaTesla',
    rank: 5,
    role: 'Member',
    trophies: 4850,
    warStars: 640,
    badgesCount: 1,
    attacksSucceeded: 38
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Perfect Strike',
    description: 'Execute and record your first flawless 3-Star attack against a matching or higher Town Hall level.',
    badgeName: 'Three-Star Specialist',
    unlocked: true,
    criteria: 'Stars must equal 3',
    category: 'stars'
  },
  {
    id: 'ach-2',
    title: 'Loot Extractor',
    description: 'Amass a total recorded combined Gold and Elixir haul of over 1.5M resources.',
    badgeName: 'Loot Millionaire',
    unlocked: true,
    criteria: 'Cumulative Gold + Elixir >= 1,500,000',
    category: 'loot'
  },
  {
    id: 'ach-3',
    title: 'Dark Elixir Alchemist',
    description: 'Raid and log more than 9,000 Dark Elixir in a single battle.',
    badgeName: 'DE Vaporizer',
    unlocked: true,
    criteria: 'Logged DE in single attack >= 9,000',
    category: 'loot'
  },
  {
    id: 'ach-4',
    title: 'Grand Command',
    description: 'Draft and schedule more than 4 warfare planning layouts of custom armies.',
    badgeName: 'Tactical Genius',
    unlocked: false,
    criteria: 'Hone war planning drafts in the editor',
    category: 'tactics'
  },
  {
    id: 'ach-5',
    title: 'Veteran Raider',
    description: 'Expand your warfare journal to contain 10 or more recorded battle logs.',
    badgeName: 'Veteran General',
    unlocked: false,
    criteria: 'Total logged attacks >= 10',
    category: 'attack'
  }
];

export const SERIES_REVIEWS: SeriesReview[] = [
  {
    id: 'review-1',
    title: 'CarbonFin Esports Breakdowns - Clash World Championship Series',
    author: 'CarbonFin',
    type: 'Esports Breakdowns',
    rating: 5,
    summary: 'A definitive, high-level analysis of how pro teams execute precision strikes under tournament stress. CarbonFin breaks down pathfinding math, target prioritization, spell timings, and how micro-tilts can ruin a funnel.',
    lessonsLearned: [
      'Visual compartmentalization: Always funnel hero components on the path edges beforehand.',
      'Rage / Invisibility placement: Spell duration overlapping is key to keeping Super Archers active in the blimp.',
      'Warden Recovery: Protect healers against backend Multi-Inferno zones utilizing early Grand Warden abilities.'
    ],
    redirectUrl: 'https://youtube.com/playlist?list=PL46o9K9F-0-f70O3ItoM5A0ZfVnCj0Yy_&si=CoC_CarbonFin_Playlist',
    category: 'attacking'
  },
  {
    id: 'review-2',
    title: 'Queen Charge Comprehensive Layouts & Mechanics Guide',
    author: 'Itzu',
    type: 'Video Series',
    rating: 5,
    summary: 'Itzu provides an incredible pedagogical breakdown of Queen pathfinding, heal ranges, Wall Breaker targeting algorithms, and Rage Spell ranges. An essential video sequence for master-level players aiming for competitive esports leagues.',
    lessonsLearned: [
      'Queen aggro rules: The Archer Queen targets the closest building unless she is provoked by enemy Clan Castle troops or Heroes.',
      'seeking mine defense: Always dispatch a test Coconut Balloon to detonate Seeking Air Mines before spawning your healer train.',
      'Poison placement: Save Poison spells for dynamic CC targets (Super Minions / Headhunters) to reduce their attack speed.'
    ],
    redirectUrl: 'https://youtube.com/c/ItzuCoC',
    category: 'attacking'
  },
  {
    id: 'review-3',
    title: 'Anti-3 Star Base Building Fundamentals for Town Hall 15/16',
    author: 'Clash Champs Builder Guild',
    type: 'Guide Article',
    rating: 4,
    summary: 'A masterclass design article detailing high-level base building. It centers around breaking spell value: sizing compartments to deny clone-spell value, offsetting the Clan Castle to force bad entries, and placing Seeking Shield heroes against smash layouts.',
    lessonsLearned: [
      'Deny value chains: Scattershots and Air Defenses must be isolated by at least 4 horizontal blocks to prevent Electro Dragon chains.',
      'Dead zones: Use high-health storages as shields around primary single-target defenses to absorb incoming melee damage.'
    ],
    redirectUrl: 'https://www.clashchamps.com/category/clash-of-clans-guides/',
    category: 'base-building'
  }
];

export const COC_RECOMMENDATIONS: CoCRecommendation[] = [
  {
    id: 'ninja',
    title: 'Clash Ninja Upgrade Tracker',
    description: 'An outstanding tool to plan your upgrades, track research times, and optimize your developer builders for maximum efficiency.',
    category: 'Calculators',
    redirectUrl: 'https://www.clash.ninja/',
    authoritativeSource: 'Clash Ninja Official'
  },
  {
    id: 'champs',
    title: 'Clash Champs Pro Base Layouts',
    description: 'An authoritative directory compiled of thousands of active War, Trophy, and Farming layouts sorted by Town Hall, complete with direct copying links.',
    category: 'Layout Hub',
    redirectUrl: 'https://www.clashchamps.com/i-need-a-base/',
    authoritativeSource: 'Clash Champs Builder Guild'
  },
  {
    id: 'coc-wiki',
    title: 'Clash of Clans Fandom Wiki',
    description: 'The supreme encyclopedia of raw numbers. Offers complete damage tables, training costs, visual level progressions, and hidden game behaviors.',
    category: 'News Hub',
    redirectUrl: 'https://clashofclans.fandom.com/wiki/Clash_of_Clans_Wiki',
    authoritativeSource: 'Fandom Community'
  },
  {
    id: 'clashofclans-official',
    title: 'Supercell Esports & Official Store',
    description: 'Keep tabs on official seasonal battle passes, the global championship leaderboards, and exclusive developer gameplay trailers.',
    category: 'Strategy Guide',
    redirectUrl: 'https://supercell.com/en/games/clashofclans/',
    authoritativeSource: 'Supercell Official Portal'
  }
];

export const INITIAL_NEWS_FEED: NewsFeedItem[] = [
  {
    id: 'news-1',
    title: 'Town Hall 17 Rumors & Super Troop Leaks',
    date: '2026-06-10',
    category: 'Future Leak',
    description: 'Reliable insider community leak files hint at an upcoming Ice-themed Town Hall 17 defense weapon, possibly named the "Frigid Blast". Additionally, datamines reveal a potential new "Super Miner" or "Super Electro Titan" balancing phase.'
  },
  {
    id: 'news-2',
    title: 'Summer 2026 Balance Changes & Apprentice Warden Updates',
    date: '2026-06-05',
    category: 'Balance Update',
    description: 'Supercell officially rolled out a patch buffing the Healer HP by 7.5% at the max tier, while reducing the damage radius of Electro Titan. The Apprentice Warden range has been adjusted slightly to avoid early target acquisitions.'
  },
  {
    id: 'news-3',
    title: 'Clan Games Rewards Announced: 8th Anniversary Elite Runes',
    date: '2026-06-01',
    category: 'Community Event',
    description: 'Prepare your builders! June Clan games return with a massive Book of Heroes at the 50,000 clan-points tier, along with an absolute abundance of Gold Runes and Elixir potions.'
  },
  {
    id: 'news-4',
    title: '📢 LIVE Balance Patch: Archer Queen Giant Gauntlet Synergy',
    date: 'Today at 09:00 UTC',
    category: 'Major Patch',
    description: 'Emergency patch deployed to resolve a rare animation clipping bug with the Barbarian Kings Giant Gauntlet overlay. Hit speeds should now function natively as designed without splash overlap. Clash on!',
    isRealTimeTweet: true
  }
];
