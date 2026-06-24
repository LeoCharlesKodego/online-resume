import { motion } from 'framer-motion';

const particles = [
  { x: '12%', y: '18%', size: 3, delay: 0.2, duration: 6.5, opacity: 0.35 },
  { x: '24%', y: '68%', size: 2, delay: 0.9, duration: 7.2, opacity: 0.25 },
  { x: '38%', y: '42%', size: 2, delay: 0.5, duration: 8.0, opacity: 0.2 },
  { x: '56%', y: '22%', size: 3, delay: 1.1, duration: 7.4, opacity: 0.3 },
  { x: '68%', y: '58%', size: 2, delay: 0.3, duration: 6.8, opacity: 0.22 },
  { x: '82%', y: '30%', size: 2, delay: 1.6, duration: 7.8, opacity: 0.25 },
  { x: '90%', y: '74%', size: 3, delay: 0.7, duration: 8.6, opacity: 0.28 },
];

const Background = () => {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-[#090914] to-dark-bg" />
      <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/18 blur-[120px]" />
      <div className="absolute top-[18%] -right-32 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="absolute bottom-[-180px] left-[28%] h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-[150px]" />

      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/80"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}
    </div>
  );
};

export default Background;
