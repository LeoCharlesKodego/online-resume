import { motion } from 'framer-motion';
import { FiCpu, FiBarChart2, FiLayers, FiZap } from 'react-icons/fi';

const features = [
  {
    icon: <FiCpu className="text-primary" size={24} />,
    title: 'AI-Native Engineering',
    description: 'Leveraging AI-assisted workflows to increase productivity, write boilerplate, and focus on core architecture and business logic.'
  },
  {
    icon: <FiZap className="text-blue-400" size={24} />,
    title: 'Rapid Prototyping',
    description: 'Transforming ideas into functional prototypes and iterating quickly to deliver value-driven operational systems.'
  },
  {
    icon: <FiBarChart2 className="text-emerald-400" size={24} />,
    title: 'Data-Driven Solutions',
    description: 'Applying data analytics to drive decision making, business process optimization, and insightful KPI reporting.'
  },
  {
    icon: <FiLayers className="text-purple-400" size={24} />,
    title: 'Practical Systems',
    description: 'Building maintainable full-stack applications with robust architectures tailored to solve real-world business challenges.'
  }
];

const About = () => {
  const profileImageUrl = `${import.meta.env.BASE_URL}profile.png`;

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-gradient">Me</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A practical problem solver blending traditional software engineering with modern AI workflows.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 overflow-hidden rounded-3xl border border-slate-700/50 glass-card"
        >
          <div
            className="h-48 sm:h-56 md:h-64 w-full bg-center bg-cover"
            style={{ backgroundImage: `url(${profileImageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-dark-bg/40" />
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-[70px]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-slate-200">
              <span className="h-2 w-2 rounded-full bg-primary glow" />
              Puerto Princesa City, Palawan, Philippines
            </div>
            <p className="mt-3 max-w-2xl text-slate-300 text-lg leading-relaxed">
              Building practical systems through AI-assisted development and data-driven decision making.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Summary Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Professional Profile</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Based in Puerto Princesa City, Palawan, I am a developer who believes in working smarter. As a "Vibe Coder", I embrace AI coding agents and generative tools to accelerate delivery without compromising engineering discipline.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Whether it's building a complete React + Laravel system from scratch, setting up CI/CD pipelines, or analyzing data trends, I focus on delivering tangible business impact through continuous learning and workflow automation.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-2xl font-bold text-white">2+</p>
                  <p className="text-sm text-slate-400">Years Experience</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="text-2xl font-bold text-white">10+</p>
                  <p className="text-sm text-slate-400">Projects Completed</p>
                </div>
                <div className="border-l-2 border-emerald-500 pl-4">
                  <p className="text-sm font-medium text-white">Available</p>
                  <p className="text-sm text-slate-400">For Freelance & Remote</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <p className="text-sm font-medium text-white">Location</p>
                  <p className="text-sm text-slate-400">Palawan, PH</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card p-6 border-slate-700/50 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-dark-bg flex items-center justify-center mb-4 border border-slate-800">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
