import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// ── CONFIG ──────────────────────────────────────────────────────────────
const GITHUB_USERNAME = 'LeoCharlesKodego';
const TOPIC_HIDE = 'hide-portfolio';
const CACHE_KEY = 'gh_projects_cache_v2';
const CACHE_TTL_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 5 * 60 * 1000;

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

// ── CREATIVE SVG COVER GENERATOR ────────────────────────────────────────
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

const PALETTES = [
  ['#7C3AED', '#3B82F6'],
  ['#EC4899', '#8B5CF6'],
  ['#06B6D4', '#3B82F6'],
  ['#F59E0B', '#EF4444'],
  ['#10B981', '#06B6D4'],
  ['#8B5CF6', '#EC4899'],
  ['#3B82F6', '#10B981'],
  ['#EF4444', '#F59E0B'],
  ['#06B6D4', '#8B5CF6'],
  ['#F59E0B', '#10B981'],
];

const LANG_SHAPES: Record<string, string> = {
  JavaScript: 'M 30 20 L 50 10 L 70 20 L 70 40 L 50 50 L 30 40 Z',
  TypeScript: 'M 40 10 L 70 30 L 70 50 L 40 70 L 10 50 L 10 30 Z',
  PHP: 'M 10 40 Q 40 10 70 40 Q 40 70 10 40 Z',
  Python: 'M 40 10 C 60 10 70 25 70 40 C 70 60 55 70 40 70 C 25 70 10 55 10 40 C 10 20 25 10 40 10 Z',
  'C#': 'M 20 15 L 60 15 L 75 40 L 60 65 L 20 65 L 5 40 Z',
  Java: 'M 40 10 L 65 25 L 65 55 L 40 70 L 15 55 L 15 25 Z',
  HTML: 'M 15 10 L 65 10 L 75 40 L 65 70 L 15 70 L 5 40 Z',
  CSS: 'M 40 10 L 70 30 L 60 65 L 20 65 L 10 30 Z',
  Ruby: 'M 40 8 L 68 28 L 58 64 L 22 64 L 12 28 Z',
  Go: 'M 20 10 L 60 10 L 70 40 L 60 70 L 20 70 L 10 40 Z',
  Rust: 'M 40 10 C 60 10 70 30 70 45 C 70 65 55 70 40 70 C 25 70 10 55 10 40 C 10 25 20 10 40 10 Z',
  default: 'M 40 10 L 65 25 L 65 55 L 40 70 L 15 55 L 15 25 Z',
};

function generateProjectCover(project: { title: string; language: string | null; tech: string[] }): string {
  const h = hashStr(project.title + (project.language || ''));
  const palette = PALETTES[h % PALETTES.length];
  const [c1, c2] = palette;
  const lang = project.language || project.tech[0] || 'default';
  const shape = LANG_SHAPES[lang] || LANG_SHAPES.default;

  const patternType = h % 4;
  const offsetX = (h % 60) + 20;
  const offsetY = ((h >> 6) % 60) + 20;
  const rot = h % 360;

  const circles = Array.from({ length: 5 }, (_, i) => {
    const cx = ((h * (i + 3)) % 70) + 15;
    const cy = ((h * (i + 7)) % 55) + 15;
    const r = ((h * (i + 1)) % 4) + 1.5;
    const opacity = 0.15 + ((h * (i + 2)) % 20) / 100;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="white" opacity="${opacity}"/>`;
  }).join('');

  let pattern = '';
  if (patternType === 0) {
    pattern = `<pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.8" fill="white" opacity="0.08"/></pattern><rect width="80" height="80" fill="url(#dots)"/>`;
  } else if (patternType === 1) {
    pattern = `<pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.3" opacity="0.08"/></pattern><rect width="80" height="80" fill="url(#grid)"/>`;
  } else if (patternType === 2) {
    pattern = `<pattern id="lines" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="white" stroke-width="0.4" opacity="0.07"/></pattern><rect width="80" height="80" fill="url(#lines)"/>`;
  } else {
    pattern = Array.from({ length: 4 }, (_, i) => {
      const r = 10 + i * 8;
      return `<circle cx="40" cy="40" r="${r}" fill="none" stroke="white" stroke-width="0.3" opacity="${0.06 + i * 0.01}"/>`;
    }).join('');
  }

  const techInitials = project.tech.slice(0, 2).map(t => t.charAt(0).toUpperCase()).join('');
  const fontSize = techInitials.length > 1 ? 8 : 10;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.15"/><stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="80" height="80" fill="url(#bg)"/>
  <rect width="80" height="80" fill="url(#glow)"/>
  ${pattern}
  <g transform="translate(${offsetX - 40}, ${offsetY - 40}) rotate(${rot / 10}, 40, 40)" opacity="0.2">
    <path d="${shape}" fill="none" stroke="white" stroke-width="1.2"/>
  </g>
  <g transform="translate(${offsetX + 10}, ${offsetY + 5}) rotate(${-rot / 8}, 40, 40)" opacity="0.12">
    <path d="${shape}" fill="white" fill-opacity="0.1"/>
  </g>
  ${circles}
  <text x="40" y="43" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="${fontSize}" fill="white" opacity="0.9">${techInitials}</text>
  <text x="40" y="54" text-anchor="middle" font-family="Inter,sans-serif" font-weight="400" font-size="3.5" fill="white" opacity="0.5">${lang}</text>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ── PINNED / MANUAL PROJECTS ────────────────────────────────────────────
const PINNED_PROJECTS: Project[] = [
  {
    id: 'pinned-gso-system',
    title: 'GSO Inventory System',
    description: 'Architected and maintain a full-stack inventory management system for a Philippine Local Government Unit General Services Office, supporting end-to-end asset lifecycle tracking from procurement through disposal in compliance with COA reporting standards.',
    image: '',
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
    title: 'LearnHub — Online Learning Platform',
    description: 'A full-stack e-learning platform offering course catalogs across multiple disciplines (web development, programming, graphic design, photography, project management, social media marketing), with separate student and employee portals.',
    image: '',
    tech: ['PHP', 'HTML/CSS', 'JavaScript', 'MySQL'],
    badges: [],
    stars: 0,
    language: 'PHP',
    updatedAt: new Date().toISOString(),
    highlights: {
      architecture: 'Custom PHP API backend with role-based access separating student and employee dashboards',
      complexity: 'Built dedicated login/signup flows, course browsing, and dashboards for two distinct user roles',
    },
    github: 'https://github.com/LeoCharlesKodego/WD24P_Leo-Charles_Quibuyen/tree/main/LeoCharles_Quibuyen/MP2/LearnHub%20-%20MP2%20-',
    demo: '',
  },
  {
    id: 'pinned-church-manager',
    title: 'Church Manager Offline App',
    description: 'An offline-first desktop application for managing church activities, member records, and localized resources without requiring internet connectivity.',
    image: '',
    tech: ['Electron', 'React', 'SQLite'],
    badges: ['Private Repository'],
    stars: 0,
    language: 'JavaScript',
    updatedAt: new Date().toISOString(),
    highlights: {
      architecture: 'Local-first desktop application with an embedded SQLite database and no external server dependency',
      complexity: 'Designed offline state management and data-sync/conflict-resolution handling for a fully disconnected environment',
    },
    github: '',
    demo: '',
    isPrivate: true,
  },
  {
    id: 'pinned-pkbgame',
    title: 'Pickleball Championship (Unity)',
    description: 'A Unity-based Android sports game built as a full systems clone of Virtua Tennis, adapted for pickleball gameplay, including ball physics, opponent AI, and shot mechanics.',
    image: '',
    tech: ['Unity', 'C#', 'Android'],
    badges: ['Private Repository'],
    stars: 0,
    language: 'C#',
    updatedAt: new Date().toISOString(),
    highlights: {
      architecture: 'Unity-based mobile game with custom physics simulation and rule-based opponent AI',
      complexity: 'Engineered realistic ball physics, bot decision-making, and positional shot-selection logic for varied gameplay',
    },
    github: '',
    demo: '',
    isPrivate: true,
  },
];

const PINNED_WITH_COVERS: Project[] = PINNED_PROJECTS.map((p) => ({
  ...p,
  image: generateProjectCover(p),
}));

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

async function fetchPortfolioMeta(owner: string, repo: string, branch: string): Promise<PortfolioMeta | null> {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/portfolio.json`);
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
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const repos: GithubRepo[] = await res.json();

  const visible = repos.filter((r) => !r.fork && !r.archived && !r.topics?.includes(TOPIC_HIDE));
  const metas = await Promise.all(visible.map((r) => fetchPortfolioMeta(GITHUB_USERNAME, r.name, r.default_branch)));

  return visible.map((repo, i) => {
    const meta = metas[i] || {};
    const title = meta.title || repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const tech = techTags(repo);
    const lang = repo.language;

    return {
      id: repo.id,
      title,
      description: repo.description || 'No description provided yet.',
      image: meta.image || generateProjectCover({ title, language: lang, tech }),
      tech,
      badges: [],
      stars: repo.stargazers_count,
      language: lang,
      updatedAt: repo.updated_at,
      highlights: meta,
      github: repo.html_url,
      demo: meta.demo || repo.homepage || '',
    };
  });
}

// ── 3D CAROUSEL COMPONENT ───────────────────────────────────────────────
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeIndex, setActiveIndex] = useState(0);

  const n = projects.length;

  // 3D geometry
  const CARD_WIDTH = 340;
  const ANGLE_STEP = n > 0 ? 360 / n : 0;
  const RADIUS = n > 2 ? CARD_WIDTH / (2 * Math.tan(Math.PI / n)) : 500;

  const goNext = useCallback(() => {
    if (n === 0) return;
    setActiveIndex((prev) => (prev + 1) % n);
  }, [n]);

  const goPrev = useCallback(() => {
    if (n === 0) return;
    setActiveIndex((prev) => (prev - 1 + n) % n);
  }, [n]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Auto-rotate
  useEffect(() => {
    if (n < 3) return;
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext, n]);

  // Data loading + polling
  useEffect(() => {
    let cancelled = false;

    async function run(isPoll = false) {
      try {
        if (!isPoll) {
          const cached = sessionStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data, ts } = JSON.parse(cached);
            if (Date.now() - ts < CACHE_TTL_MS) {
              setProjects([...PINNED_WITH_COVERS, ...data]);
              setStatus('ready');
            }
          }
        }
        const fetched = await loadProjects();
        if (cancelled) return;
        setProjects([...PINNED_WITH_COVERS, ...fetched]);
        setStatus('ready');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: fetched, ts: Date.now() }));
        } catch { /* ignore */ }
      } catch (err) {
        if (cancelled) return;
        setProjects((prev) => (prev.length > 0 ? prev : PINNED_WITH_COVERS));
        setStatus((prev) => (prev === 'ready' ? 'ready' : 'error'));
        console.error('Failed to load GitHub projects:', err);
      }
    }

    run();
    const interval = setInterval(() => run(true), POLL_INTERVAL_MS);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // Compute per-card transforms & opacity
  const cardStyles = useMemo(() => {
    return projects.map((_, i) => {
      const angle = ANGLE_STEP * (i - activeIndex);
      const rad = (angle * Math.PI) / 180;
      // Scale: front=1, sides ~0.7, back ~0.5
      const cosVal = Math.cos(rad);
      const scale = 0.55 + 0.45 * Math.max(0, cosVal);
      // Opacity: front=1, sides ~0.6, back ~0.2
      const opacity = 0.2 + 0.8 * Math.max(0, cosVal);
      // z-index by depth
      const zIndex = Math.round(50 + cosVal * 50);

      return {
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scale})`,
        opacity,
        zIndex,
      };
    });
  }, [projects, activeIndex, ANGLE_STEP, RADIUS]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
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
          <div className="flex justify-center gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[340px] h-[420px] glass-card animate-pulse">
                <div className="h-48 bg-slate-800/50 rounded-t-2xl" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-slate-800/50 rounded w-3/4" />
                  <div className="h-3 bg-slate-800/50 rounded w-full" />
                  <div className="h-3 bg-slate-800/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && projects.length === 0 && (
          <p className="text-center text-slate-500">Couldn't reach GitHub right now — please refresh the page.</p>
        )}

        {n > 0 && (
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[200] w-12 h-12 rounded-full bg-dark-card/90 border border-dark-border/60 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              aria-label="Previous"
            >
              <FiChevronLeft size={22} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[200] w-12 h-12 rounded-full bg-dark-card/90 border border-dark-border/60 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-white hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              aria-label="Next"
            >
              <FiChevronRight size={22} />
            </button>

            {/* 3D Carousel */}
            <div
              className="relative mx-auto overflow-visible"
              style={{
                perspective: '1200px',
                perspectiveOrigin: '50% 50%',
                height: '480px',
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(-${RADIUS}px)`,
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {projects.map((project, i) => {
                  const style = cardStyles[i];
                  return (
                    <div
                      key={project.id}
                      className="absolute glass-card overflow-hidden flex flex-col group"
                      style={{
                        width: `${CARD_WIDTH}px`,
                        transform: style.transform,
                        opacity: style.opacity,
                        zIndex: style.zIndex,
                        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                        left: `calc(50% - ${CARD_WIDTH / 2}px)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {/* SVG Cover */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 via-transparent to-transparent z-10" />
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        {project.badges.length > 0 && (
                          <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
                            {project.badges.map((badge, bIdx) => (
                              <span key={bIdx} className="px-2.5 py-1 rounded text-xs font-semibold backdrop-blur-md bg-slate-800/70 text-slate-200 border border-slate-600/50">
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>

                        <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-slate-800 text-sm">
                          {project.highlights.ai || project.highlights.human ? (
                            <div className="space-y-2">
                              {project.highlights.ai && (
                                <div>
                                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-0.5">AI Contribution</span>
                                  <span className="text-xs text-slate-300">{project.highlights.ai}</span>
                                </div>
                              )}
                              {project.highlights.human && (
                                <div>
                                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-0.5">Human Contribution</span>
                                  <span className="text-xs text-slate-300">{project.highlights.human}</span>
                                </div>
                              )}
                            </div>
                          ) : project.highlights.architecture || project.highlights.complexity ? (
                            <div className="space-y-2">
                              {project.highlights.architecture && (
                                <div>
                                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-0.5">Architecture</span>
                                  <span className="text-xs text-slate-300">{project.highlights.architecture}</span>
                                </div>
                              )}
                              {project.highlights.complexity && (
                                <div>
                                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-0.5">Engineering Complexity</span>
                                  <span className="text-xs text-slate-300">{project.highlights.complexity}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 text-xs text-slate-300">
                              <span className="flex items-center gap-1">
                                <FiStar className="text-amber-400" /> {project.stars}
                              </span>
                              {project.language && <span>{project.language}</span>}
                              <span className="text-slate-500">{new Date(project.updatedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{t}</span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-800">
                          {project.isPrivate ? (
                            <span className="text-slate-500 flex items-center gap-1.5 text-xs font-medium">
                              <FiGithub size={14} /> Private
                            </span>
                          ) : (
                            project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-medium transition-colors">
                                <FiGithub size={14} /> Source
                              </a>
                            )
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer"
                              className="text-primary hover:text-primary-light flex items-center gap-1.5 text-xs font-medium transition-colors">
                              <FiExternalLink size={14} /> Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dot indicators */}
            {n > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-8 bg-primary shadow-lg shadow-primary/30'
                        : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
