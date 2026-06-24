import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer & Data Analytics Practitioner',
    company: 'Freelance / Remote',
    date: '2023 - Present',
    description: 'Delivering end-to-end web applications and data-driven solutions for various clients.',
    highlights: [
      'Built and deployed full-stack inventory systems reducing manual tracking errors by 40%.',
      'Leveraged AI-assisted workflows (Cursor, Copilot) to accelerate boilerplate creation and focus on core business logic.',
      'Designed data dashboards for client KPI reporting, improving business process visibility.',
      'Automated repetitive workflow tasks using custom scripts and APIs.'
    ]
  },
  {
    id: 2,
    role: 'Full Stack Web Development Trainee',
    company: 'Kodego Bootcamp',
    date: '2022 - 2023',
    description: 'Intensive training in modern web development technologies and software engineering practices.',
    highlights: [
      'Developed multiple full-stack projects including e-commerce and management systems.',
      'Collaborated in agile team environments using Git and GitHub.',
      'Gained proficiency in React, Laravel, PHP, and database architecture.',
      'Applied data-driven problem solving to complex programming challenges.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional <span className="text-gradient">Experience</span></h2>
          <p className="text-slate-400">
            A track record of building operational systems and continuous learning.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-slate-800"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-dark-bg z-10"></div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${
                  index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                }`}>
                  <div className="glass-card p-6 border-slate-700/50 hover:border-primary/30 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    <span className="text-sm font-mono text-primary-light mb-2 block">{exp.date}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-lg text-slate-400 font-medium mb-4">{exp.company}</h4>
                    
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                          <span className="text-primary mt-1 text-xs">▹</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;