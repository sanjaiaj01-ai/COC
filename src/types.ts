export interface AttackLog {
  id: string;
  playerName: string;
  defenderTownHall: number;
  attackerTownHall: number;
  strategy: string;
  stars: number;
  percentage: number;
  gold: number;
  elixir: number;
  darkElixir: number;
  date: string;
  notes: string;
}

export interface ClanMember {
  id: string;
  name: string;
  rank: number;
  role: 'Leader' | 'Co-Leader' | 'Elder' | 'Member';
  trophies: number;
  warStars: number;
  badgesCount: number;
  attacksSucceeded: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeName: string;
  unlocked: boolean;
  criteria: string;
  category: 'attack' | 'stars' | 'loot' | 'tactics';
}

export interface SeriesReview {
  id: string;
  title: string;
  author: string;
  type: 'Video Series' | 'Guide Article' | 'Esports Breakdowns';
  rating: number; // 1-5 stars
  summary: string;
  lessonsLearned: string[];
  redirectUrl: string;
  category: 'base-building' | 'attacking' | 'clash-basics';
}

export interface CoCRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'Strategy Guide' | 'Layout Hub' | 'Calculators' | 'News Hub';
  redirectUrl: string;
  authoritativeSource: string;
}

export interface NewsFeedItem {
  id: string;
  title: string;
  date: string;
  category: 'Balance Update' | 'Major Patch' | 'Future Leak' | 'Community Event';
  description: string;
  isRealTimeTweet?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  gloveAccent: string;
}
