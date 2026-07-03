import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiRefreshCw, FiFolder, FiAlertCircle } from 'react-icons/fi';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import type { ProjectData } from '../hooks/useGitHubProjects';

/* ─── hardcoded backup (kept for reference until live version is confirmed) ──
const staticProjects = [
  {
    id: 1,
    title: 'GSO Inventory System',
    description: 'A comprehensive full-stack inventory management system designed to handle resource tracking, reporting, and equipment lifecycle management.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
    type: 'traditional',
    tech: ['React', 'Laravel', 'MySQL', 'Tailwind'],
    badges: ['Traditional Development', 'Manual Engineering'],
    highlights: {
      architecture: 'Monolithic API with decoupled SPA frontend',
      complexity: 'Complex relational database schema for item tracking and reporting',
    },
    github: 'https://github.com/LeoCharlesKodego/gso',
    demo: '#'
  },
  {
    id: 2,
    title: 'Church Manager Offline App',
    description: 'An offline-first desktop application designed to help manage church activities, member records, and localized resources without requiring internet connectivity.',
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000',
    type: 'traditional',
    tech: ['Electron', 'React', 'SQLite'],
    badges: ['Traditional Development', 'Hand Crafted Code'],
    highlights: {
      architecture: 'Local-first database sync strategy',
      complexity: 'Handling offline state management and conflict resolution',
    },
    github: 'https://github.com/LeoCharlesKodego/church_manager',
    demo: '#'
  },
  {
    id: 3,
    title: 'AI-Enhanced Analytics Dashboard',
    description: 'A modern business intelligence dashboard that aggregates multiple data sources, utilizing AI for rapid UI scaffolding and automated chart generation.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    type: 'vibe',
    tech: ['Next.js', 'TypeScript', 'Tremor', 'Supabase'],
    badges: ['Vibe Coded', 'AI Accelerated', 'Human Curated'],
    highlights: {
      ai: 'Boilerplate generation, UI scaffolding, utility functions',
      human: 'Data security logic, complex state management, database schema design',
    },
    github: '#',
    demo: '#'
  },
  {
    id: 4,
    title: 'My Yogurt House Online',
    description: 'An online platform for a local yogurt shop with customer ordering capabilities, featuring an optimized checkout flow.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    type: 'traditional',
    tech: ['HTML/CSS', 'JavaScript', 'PHP'],
    badges: ['Traditional Development', 'Manual Engineering'],
    highlights: {
      architecture: 'Classic MVC pattern',
      complexity: 'Custom cart and checkout session management',
    },
    github: 'https://github.com/LeoCharlesKodego/yogurt-e-hauz',
    demo: '#'
  }
];
─────────────────────────────────────────────────────────────────── */

/* ─── Loading skeleton ─────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden flex flex-col animate-pulse">
      <div className="h-2 w-full bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30" />
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-7 bg-slate-700/50 rounded w-3/4 mb-3" />
        <div className="h-4 bg-slate-700/50 rounded w-full mb-2" />
        <div className="h-4 bg-slate-700/50 rounded w-5/6 mb-6" />
        <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-800">
          <div className="h-3 bg-slate-700/50 rounded w-1/4 mb-3" />
          <div className="h-3 bg-slate-700/50 rounded w-3/4" />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 bg-slate-700/50 rounded w-14" />
          ))}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
          <div className="h-4 bg-slate-700/50 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card ─────────────────────────────────────────────── */
function ProjectCard({ project }: { project: ProjectData }) {
  const tags =
    project.tech.length > 0
      ? project.tech
      : project.language
        ? [project.language]
        : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden flex flex-col group"
    >
      {/* Accent bar */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-primary-light to-blue-400" />

      <div className="p-6 flex-grow flex flex-col">
        {/* Title row with optional star count */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          {project.stars > 0 && (
            <span className="flex items-center gap-1 text-xs text-amber-400/80 whitespace-nowrap shrink-0 mt-1">
              <FiStar size={14} className="fill-amber-400/80" />
              {project.stars}
            </span>
          )}
        </div>

        <p className="text-slate-400 mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
          {project.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              {project.language}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <FiRefreshCw size={12} />
            Updated {project.updatedAt}
          </span>
        </div>

        {/* Tech tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((t, i) => (
              <span
                key={i}
                className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded"
          >
            <FiGithub size={18} /> Source Code
          </a>
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
  );
}

/* ─── Main component ───────────────────────────────────────────── */
const Projects = () => {
  const { projects, loading, error } = useGitHubProjects();

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
            Open-source repositories automatically synced from GitHub. Tag a repo
            with <code className="text-primary">portfolio</code> to feature it here.
          </p>
        </motion.div>

        {error && !loading && (
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs text-amber-400/70 bg-amber-400/5 px-3 py-1.5 rounded-full border border-amber-400/10">
              <FiAlertCircle size={12} />
              {error}
            </span>
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <AnimatePresence mode="popLayout">
              {projects.length === 0 && !loading && !error ? (
                <div className="col-span-full flex items-center justify-center p-12">
                  <div className="glass rounded-2xl p-8 text-center max-w-md">
                    <FiFolder size={40} className="mx-auto mb-4 text-slate-500" />
                    <p className="text-slate-400 mb-2">
                      No projects tagged with <code className="text-primary">portfolio</code> yet.
                    </p>
                    <p className="text-sm text-slate-500">
                      Add the topic to any GitHub repo to feature it here.
                    </p>
                  </div>
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
