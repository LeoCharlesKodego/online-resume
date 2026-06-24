import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCpu, FiCode } from 'react-icons/fi';

const projects = [
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

const Projects = () => {
  const [filter, setFilter] = useState<'vibe' | 'traditional'>('vibe');

  const filteredProjects = projects.filter(p => p.type === filter);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Showcasing a blend of traditional engineering depth and modern AI-accelerated workflows.
          </p>
        </motion.div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass p-1 rounded-lg inline-flex">
            <button
              onClick={() => setFilter('vibe')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                filter === 'vibe' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FiCpu /> Vibe-Coded Projects
            </button>
            <button
              onClick={() => setFilter('traditional')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                filter === 'traditional' 
                  ? 'bg-slate-700 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FiCode /> Traditional Development
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
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
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    {project.badges.map((badge, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded text-xs font-semibold backdrop-blur-md ${
                        project.type === 'vibe' ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30' : 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                      }`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-6 flex-grow">{project.description}</p>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-800">
                    {project.type === 'vibe' ? (
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">AI Contribution</span>
                          <span className="text-sm text-slate-300">{project.highlights.ai}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">Human Contribution</span>
                          <span className="text-sm text-slate-300">{project.highlights.human}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">Architecture</span>
                          <span className="text-sm text-slate-300">{project.highlights.architecture}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">Engineering Complexity</span>
                          <span className="text-sm text-slate-300">{project.highlights.complexity}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
                      <FiGithub size={18} /> Source Code
                    </a>
                    {project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light flex items-center gap-2 text-sm font-medium transition-colors">
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