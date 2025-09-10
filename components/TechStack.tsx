import React from 'react';
import Section from './Section';
// FIX: Changed import from non-existent TECH_STACK to TECH_STACK_CATEGORIES.
import { TECH_STACK_CATEGORIES } from '../constants';
import { motion, Variants } from 'framer-motion';

interface TechStackProps {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const TechStack: React.FC<TechStackProps> = ({ id, title }) => {
  return (
    <Section id={id} title={title}>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        A collection of the primary languages, frameworks, and tools I use to bring ideas to life.
      </p>
      <motion.div
        className="flex flex-wrap justify-center gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* FIX: Use flatMap to iterate over the nested technologies array within TECH_STACK_CATEGORIES. */}
        {TECH_STACK_CATEGORIES.flatMap(category => category.technologies).map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-3 w-28 h-28 sm:w-32 sm:h-32 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl text-center p-2 sm:p-4 group"
            whileHover={{ 
              scale: 1.1, 
              y: -8, 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(0, 189, 212, 0.5)'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <i className={`${tech.icon} text-3xl sm:text-4xl text-slate-400 group-hover:text-cyan-400 transition-colors duration-300`}></i>
            <p className="text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">{tech.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default TechStack;
