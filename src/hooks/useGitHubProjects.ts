import { useState, useEffect } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  github: string;
  demo: string | null;
  tech: string[];
  language: string | null;
  stars: number;
  updatedAt: string;
}

interface CacheEntry {
  timestamp: number;
  projects: ProjectData[];
}

const GITHUB_USERNAME = 'LeoCharlesKodego';
const CACHE_KEY = 'github-portfolio-projects';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const updated = new Date(dateString).getTime();
  const diffMs = now - updated;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function mapRepo(repo: GitHubRepo): ProjectData {
  return {
    id: repo.id,
    title: formatRepoName(repo.name),
    description: repo.description || 'No description provided.',
    github: repo.html_url,
    demo: repo.homepage,
    tech: repo.topics.filter((t) => t !== 'portfolio'),
    language: repo.language,
    stars: repo.stargazers_count,
    updatedAt: getRelativeTime(repo.updated_at),
  };
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(projects: ProjectData[]): void {
  try {
    const entry: CacheEntry = { timestamp: Date.now(), projects };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage full or unavailable — non-critical
  }
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      // 1. Try fresh cache first
      const cached = readCache();
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        if (!cancelled) {
          setProjects(cached.projects);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
          { headers: { Accept: 'application/vnd.github+json' } },
        );

        if (!response.ok) {
          throw new Error(`GitHub API responded with ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();

        const mapped = repos
          .filter((repo) => !repo.fork && repo.topics?.includes('portfolio'))
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          )
          .map(mapRepo);

        writeCache(mapped);

        if (!cancelled) {
          setProjects(mapped);
          setLoading(false);
        }
      } catch (err) {
        // 2. Fall back to stale cache on error
        const stale = readCache();
        if (stale) {
          if (!cancelled) {
            setProjects(stale.projects);
            setLoading(false);
            setError('Could not reach GitHub — showing previously cached data.');
            return;
          }
        }

        // 3. Nothing to show
        if (!cancelled) {
          setError('Unable to load projects. Please try again later.');
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}
