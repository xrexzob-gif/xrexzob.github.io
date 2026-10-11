export type Language = 'id' | 'en';

export interface GameMapProduct {
  id: string;
  title: string;
  category: 'fivem' | 'roblox' | 'gta' | 'minecraft' | 'custom';
  categoryLabel: string;
  price?: number;
  priceLabel?: string;
  description: string;
  features: string[];
  compatibility: string;
  fileFormat: string;
  tag: string;
  accentColor: string;
  demoType: '3d' | 'interior' | 'exterior';
}

export interface SMMService {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'telegram' | 'twitter';
  platformLabel: string;
  serviceName: string;
  pricePer1k?: number;
  priceLabel?: string;
  minOrder: number;
  maxOrder: number;
  speed: string;
  guarantee: string;
  quality: string;
  placeholderTarget: string;
  unitLabel: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists?: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork?: boolean;
  homepage?: string | null;
  stargazers_count: number;
  watchers_count?: number;
  forks_count: number;
  open_issues_count?: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  pushed_at?: string;
  default_branch?: string;
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TechStackItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'tools';
  badgeSlug: string;
  color: string;
  logo: string;
}

export interface GitRecipe {
  id: string;
  category: 'undo' | 'branching' | 'remote' | 'stash' | 'advanced';
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  commandTemplate: string;
  interactiveParams?: {
    key: string;
    labelId: string;
    labelEn: string;
    defaultValue: string;
    options?: { label: string; value: string }[];
  }[];
  warningId?: string;
  warningEn?: string;
}

export interface OrderItem {
  type: 'map' | 'smm' | 'dev';
  title: string;
  detail: string;
  targetAccount?: string;
  quantity?: number;
  price?: number | string;
}
