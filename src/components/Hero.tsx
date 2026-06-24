import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiFacebook, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const profileImageUrl = `${import.meta.env.BASE_URL}profile.png`;

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary via-blue-500 to-cyan-400 blur opacity-60"></div>
                  <img
                    src={profileImageUrl}
                    alt="Leo Charles Quibuyen"
                    decoding="async"
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-white/10"
                  />
                </div>
                <p className="text-primary font-mono text-sm md:text-base tracking-wider">
                  Hi, I'm
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                Leo Charles Quibuyen
              </h1>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 rounded-full glass text-xs font-medium text-blue-300 border-blue-500/30">
                  Full Stack Developer
                </span>
                <span className="px-3 py-1 rounded-full glass text-xs font-medium text-purple-300 border-purple-500/30 glow">
                  Vibe Coder
                </span>
                <span className="px-3 py-1 rounded-full glass text-xs font-medium text-emerald-300 border-emerald-500/30">
                  Data Analytics Practitioner
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
              I build practical and scalable digital solutions using modern full-stack technologies, AI-assisted development workflows, and data analytics methodologies to solve real-world business problems.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-medium transition-all glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
              >
                View My Work <FiArrowRight />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-dark-border text-slate-300 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
              >
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-dark-border/50 max-w-md">
              <SocialLink href="https://github.com/LeoCharlesKodego" icon={<FiGithub size={20} />} label="GitHub" />
              <SocialLink href="https://linkedin.com/in/leocharlesquibuyen" icon={<FiLinkedin size={20} />} label="LinkedIn" />
              <SocialLink href="mailto:chryslee18@gmail.com" icon={<FiMail size={20} />} label="Email" />
              <SocialLink href="https://www.facebook.com/leo.charles.868326" icon={<FiFacebook size={20} />} label="Facebook" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full"></div>
            
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 relative z-10"
            >
              <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-700/50 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="mx-auto flex gap-2">
                  <span className="text-xs text-slate-400 font-mono">developer.ts</span>
                </div>
              </div>
              
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="text-slate-300">
                  <code className="text-primary-light">const</code> <code className="text-amber-300">developer</code> <code className="text-blue-400">=</code> {'{'}
                  <br/>
                  {'  '}name: <code className="text-emerald-400">"Leo Charles Quibuyen"</code>,
                  <br/>
                  {'  '}roles: [
                  <br/>
                  {'    '}<code className="text-emerald-400">"Full Stack Developer"</code>,
                  <br/>
                  {'    '}<code className="text-emerald-400">"Vibe Coder"</code>,
                  <br/>
                  {'    '}<code className="text-emerald-400">"Data Analytics Practitioner"</code>
                  <br/>
                  {'  '}],
                  <br/>
                  {'  '}stack: [
                  <br/>
                  {'    '}<code className="text-emerald-400">"React"</code>, <code className="text-emerald-400">"Laravel"</code>,
                  <br/>
                  {'    '}<code className="text-emerald-400">"MySQL"</code>, <code className="text-emerald-400">"Docker"</code>
                  <br/>
                  {'  '}],
                  <br/>
                  {'  '}philosophy: 
                  <br/>
                  {'    '}<code className="text-emerald-400">"Transforming ideas into systems 
    through AI-assisted engineering."</code>
                  <br/>
                  {'}'};
                </pre>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-slate-400 hover:text-primary transition-colors hover:scale-110 transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg rounded"
  >
    {icon}
  </a>
);

export default Hero;
