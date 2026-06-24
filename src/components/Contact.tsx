import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiBriefcase, FiArrowRight } from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's <span className="text-gradient">Connect</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I'm currently available for freelance projects, remote opportunities, and collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 border-slate-700/50"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <FiMail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Email</p>
                  <a
                    href="mailto:chryslee18@gmail.com"
                    className="text-white hover:text-primary transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded"
                  >
                    chryslee18@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <FiMapPin className="text-blue-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Location</p>
                  <p className="text-white font-medium">Puerto Princesa City, Palawan, Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  <FiBriefcase className="text-emerald-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-2">Availability</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Freelance Projects</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Remote Opportunities</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Data Analytics</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Consulting</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 border-slate-700/50 flex flex-col justify-center text-center"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Start a Conversation</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Have an idea for a system? Need data-driven insights? Let's discuss how AI-assisted development and robust engineering can bring your vision to life.
            </p>
            
            <a 
              href="mailto:chryslee18@gmail.com?subject=Project Inquiry - Portfolio" 
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-lg bg-primary hover:bg-primary-light text-white font-medium transition-all glow text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
            >
              Send an Email <FiArrowRight />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
