import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-400',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'Framer Motion']
  },
  {
    title: 'Backend',
    color: 'from-red-500 to-orange-400',
    skills: ['Laravel', 'PHP', 'Node.js', 'Express', 'RESTful APIs']
  },
  {
    title: 'Database & DevOps',
    color: 'from-emerald-500 to-teal-400',
    skills: ['MySQL', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Linux']
  },
  {
    title: 'AI-Assisted Development',
    color: 'from-purple-500 to-pink-400',
    skills: ['Cursor', 'Claude', 'ChatGPT', 'GitHub Copilot', 'Prompt Engineering', 'Agentic Development', 'AI Workflow Design']
  },
  {
    title: 'Data Analytics',
    color: 'from-yellow-500 to-amber-400',
    skills: ['SQL Analytics', 'Data Visualization', 'Dashboard Development', 'Business Intelligence', 'KPI Reporting', 'Data Cleaning']
  },
  {
    title: 'Tools & Design',
    color: 'from-slate-500 to-slate-400',
    skills: ['Git', 'Figma', 'Postman', 'VS Code', 'Jira']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-gradient">Arsenal</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive stack enabling end-to-end development, data analysis, and AI-accelerated delivery.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="glass-card p-6 border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${category.color}`}></div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-md text-sm text-slate-300 hover:text-white hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;