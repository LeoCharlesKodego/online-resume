import { FiGithub, FiLinkedin, FiFacebook, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark-card border-t border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-gradient tracking-tighter">LCQ.</span>
            <p className="text-slate-500 text-sm text-center md:text-left">
              Building practical systems through AI-assisted development.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SocialIcon href="https://github.com/LeoCharlesKodego" icon={<FiGithub />} />
            <SocialIcon href="https://linkedin.com/in/leocharlesquibuyen" icon={<FiLinkedin />} />
            <SocialIcon href="https://www.facebook.com/leo.charles.868326" icon={<FiFacebook />} />
            <SocialIcon href="mailto:chryslee18@gmail.com" icon={<FiMail />} />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Leo Charles Quibuyen. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Built with <span className="text-blue-400">React</span> + <span className="text-purple-400">Vite</span> + <span className="text-cyan-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-primary/20 hover:text-primary transition-colors border border-slate-700 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
  >
    {icon}
  </a>
);

export default Footer;
