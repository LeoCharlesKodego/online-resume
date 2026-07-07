import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

// ── CONFIG ──────────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'LeoCharlesKodego';
const TOPIC_HIDE = 'hide-portfolio';   // tag a repo with this topic → excluded entirely
const CACHE_KEY = 'gh_projects_cache_v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface PortfolioMeta {
  title?: string;
  ai?: string;
  human?: string;
  architecture?: string;
  complexity?: string;
  image?: string;
  demo?: string;
}

interface Project {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  badges: string[];
  stars: number;
  language: string | null;
  updatedAt: string;
  highlights: PortfolioMeta;
  github: string;
  demo: string;
  isPrivate?: boolean;
}

// ── PINNED / MANUAL PROJECTS ────────────────────────────────────────────
// Private repos can't be fetched from the public GitHub API, so list them
// here manually. Everything else (public repos) is pulled in automatically
// further down — you don't need to touch this file for those.
const PINNED_PROJECTS: Project[] = [
  {
    id: 'pinned-gso-system',
    title: 'GSO Inventory System',
    description:
      'Architected and maintain a full-stack inventory management system for a Philippine Local Government Unit General Services Office, supporting end-to-end asset lifecycle tracking from procurement through disposal in compliance with COA reporting standards.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
    tech: ['React', 'Laravel', 'MySQL', 'Tailwind'],
    badges: ['Private Repository'],
    stars: 0,
    language: 'PHP',
    updatedAt: new Date().toISOString(),
    highlights: {
      architecture: 'Monolithic Laravel API with a decoupled React SPA frontend',
      complexity: 'Relational database schema supporting item tracking, accountability documents (PAR/ICS), and compliance reporting',
    },
    github: '',
    demo: '',
    isPrivate: true,
  },
  {
    id: 'pinned-learnhub',
    title: 'LearnHub \u2014 Online Learning Platform',
    description:
      'A full-stack e-learning platform offering course catalogs across multiple disciplines (web development, programming, graphic design, photography, project management, social media marketing), with separate student and employee portals.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000',
    tech: ['PHP', 'HTML/CSS', 'JavaScript', 'MySQL'],
    badges: [],
    stars: 0,
    language: 'PHP',
    updatedAt: new Date().toISOString(),
    highlights: {
      architecture: 'Custom PHP API backend with role-based access separating student and employee dashboards',
      complexity: 'Built dedicated login/signup flows, course browsing, and dashboards for two distinct user roles',
    },
    github:
      'https://github.com/LeoCharlesKodego/WD24P_Leo-Charles_Quibuyen/tree/main/LeoCharles_Quibuyen/MP2/LearnHub%20-%20MP2%20-',
    demo: '',
  },
];

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  default_branch: string;
  updated_at: string;
}

// Try to fetch an optional portfolio.json from the repo root for custom highlight text.
// Silently returns null if it doesn't exist — this is a nice-to-have, not a requirement.
async function fetchPortfolioMeta(owner: string, repo: string, branch: string): Promise<PortfolioMeta | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/portfolio.json`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function techTags(repo: GithubRepo): string[] {
  const tags = (repo.topics || []).filter((t) => t !== TOPIC_HIDE);
  if (tags.length > 0) return tags.slice(0, 6);
  return repo.language ? [repo.language] : [];
}

async function loadProjects(): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=created&direction=desc`
  );
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  const repos: GithubRepo[] = await res.json();

  const visible = repos.filter(
    (r) => !r.fork && !r.archived && !r.topics?.includes(TOPIC_HIDE)
  );

  // Fetch optional portfolio.json metadata for each repo in parallel.
  const metas = await Promise.all(
    visible.map((r) => fetchPortfolioMeta(GITHUB_USERNAME, r.name, r.default_branch))
  );

  return visible.map((repo, i) => {
    const meta = metas[i] || {};
    return {
      id: repo.id,
      title:
        meta.title ||
        repo.name
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      description: repo.description || 'No description provided yet.',
      image: meta.image || `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
      tech: techTags(repo),
      badges: [],
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at,
      highlights: meta,
      github: repo.html_url,
      demo: meta.demo || repo.homepage || '',
    };
  });
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // Serve from cache instantly if it's fresh, then refresh in the background.
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          if (Date.now() - ts < CACHE_TTL_MS) {
            setProjects([...PINNED_PROJECTS, ...data]);
            setStatus('ready');
          }
        }
      } catch {
        // ignore cache read errors
      }

      try {
        const fetched = await loadProjects();
        if (cancelled) return;
        setProjects([...PINNED_PROJECTS, ...fetched]);
        setStatus('ready');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: fetched, ts: Date.now() }));
        } catch {
          // ignore cache write errors (e.g. storage full/disabled)
        }
      } catch (err) {
        if (cancelled) return;
        // If GitHub fetch fails, still show pinned projects rather than nothing.
        setProjects((prev) => (prev.length > 0 ? prev : PINNED_PROJECTS));
        setStatus((prev) => (prev === 'ready' ? 'ready' : 'error'));
        console.error('Failed to load GitHub projects:', err);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of systems I've designed, built, and maintained — pulled live from GitHub.
          </p>
        </motion.div>

        {status === 'loading' && projects.length === 0 && (
          <p className="text-center text-slate-500">Loading projects from GitHub…</p>
        )}

        {status === 'error' && projects.length === 0 && (
          <p className="text-center text-slate-500">
            Couldn't reach GitHub right now — please refresh the page.
          </p>
        )}

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {project.badges.length > 0 && (
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                      {project.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded text-xs font-semibold backdrop-blur-md bg-slate-800/70 text-slate-200 border border-slate-600/50"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-6 flex-grow">{project.description}</p>

                  <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-800">
                    {project.highlights.ai || project.highlights.human ? (
                      <div className="space-y-3">
                        {project.highlights.ai && (
                          <div>
                            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                              AI Contribution
                            </span>
                            <span className="text-sm text-slate-300">{project.highlights.ai}</span>
                          </div>
                        )}
                        {project.highlights.human && (
                          <div>
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                              Human Contribution
                            </span>
                            <span className="text-sm text-slate-300">{project.highlights.human}</span>
                          </div>
                        )}
                      </div>
                    ) : project.highlights.architecture || project.highlights.complexity ? (
                      <div className="space-y-3">
                        {project.highlights.architecture && (
                          <div>
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                              Architecture
                            </span>
                            <span className="text-sm text-slate-300">{project.highlights.architecture}</span>
                          </div>
                        )}
                        {project.highlights.complexity && (
                          <div>
                            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                              Engineering Complexity
                            </span>
                            <span className="text-sm text-slate-300">{project.highlights.complexity}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span className="flex items-center gap-1">
                          <FiStar className="text-amber-400" /> {project.stars}
                        </span>
                        {project.language && <span>{project.language}</span>}
                        <span className="text-slate-500">
                          Updated {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800">
                    {project.isPrivate ? (
                      <span className="text-slate-500 flex items-center gap-2 text-sm font-medium">
                        <FiGithub size={18} /> Private Repository
                      </span>
                    ) : (
                      project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded"
                        >
                          <FiGithub size={18} /> Source Code
                        </a>
                      )
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-light flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded"
                      >
                        <FiExternalLink size={18} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;