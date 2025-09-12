import React from 'react';
import { motion, Variants } from 'framer-motion';
import Magnetic from './Magnetic';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Variants for the name animation
const nameContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};


const Hero: React.FC = () => {
  const name = "Katlego  \u00A0 Makete";

  return (
    <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={nameContainerVariants}
            className="text-4xl lg:text-5xl font-bold leading-tight mb-2"
            aria-label={name}
          >
            {name.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-xl mx-auto md:mx-0 mb-8">
            A passionate software developer focused on creating clean, efficient, and user-friendly digital experiences. I enjoy turning complex problems into simple, beautiful, and intuitive solutions.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
            <Magnetic>
              {/* FIX: Replaced import.meta.env.BASE_URL with a static root path "/" to fix TypeScript error and align with existing path conventions. */}
              <a
                href={`${import.meta.env.BASE_URL}files/KatlegoShaunMaketeCV.docx`}
                download
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors flex items-center gap-2"
              >
                Download CV <i className="fas fa-download"></i>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/katlegoxoxo" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-slate-200 font-bold py-2 px-5 rounded-md transition-colors flex items-center gap-2">
                <i className="fab fa-github"></i> GitHub
              </a>
            </Magnetic>
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start items-center gap-4 text-slate-400 text-2xl">
            <Magnetic>
              <a href="https://www.linkedin.com/in/katlego-shaun-makete-72225a250/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors block p-2" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:katlegomakete18@gmail.com" className="hover:text-cyan-400 transition-colors block p-2" title="Email"><i className="fas fa-envelope"></i></a>
            </Magnetic>
            <Magnetic>
              <a href="tel:+27695126439" className="hover:text-cyan-400 transition-colors block p-2" title="Phone"><i className="fas fa-phone"></i></a>
            </Magnetic>
          </motion.div>
          <motion.p variants={itemVariants} className="text-xs text-slate-500 mt-6">Based in Johannesburg, South Africa.</motion.p>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl shadow-black/50 w-72 h-72 sm:w-80 sm:h-80 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/giphy.gif`}
              alt="Katlego Makete"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="font-bold text-lg">Aspiring Software Developer</p>
            <p className="text-slate-400 text-sm mt-1">at Capaciti</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;