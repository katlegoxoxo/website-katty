import React, { useState } from 'react';
import Section from './Section';
import { SKILL_CATEGORIES, TECH_STACK } from '../constants';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SkillsProps {
  id: string;
  title: string;
}

const skillContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const skillItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const techStackContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const techStackItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const Skills: React.FC<SkillsProps> = ({ id, title }) => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const handleSkillClick = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <Section id={id} title={title}>
      {/* Detailed Skills Section */}
      <motion.div
        className="grid grid-cols-1 md:max-w-3xl md:mx-auto gap-8"
        variants={skillContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SKILL_CATEGORIES.map(category => (
          <motion.div
            key={category.title}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            variants={skillItemVariants}
          >
            <h3 className="font-bold text-lg mb-4 text-slate-200">{category.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.skills.map(skill => {
                const isExpanded = expandedSkill === skill.name;
                return (
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    key={skill.name}
                    onClick={() => handleSkillClick(skill.name)}
                    className={`p-3 rounded-lg cursor-pointer ${
                      isExpanded
                        ? 'bg-white/10 col-span-2 md:col-span-3'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    style={{ overflow: 'hidden' }}
                  >
                    <motion.div layout="position" className="flex items-center gap-3">
                      <i className={`${skill.icon} text-cyan-400 w-5 text-center`}></i>
                      <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '12px' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="text-xs text-slate-400"
                          >
                            {skill.description}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Tech Stack Grid Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3 className="font-mono text-cyan-400/80 font-bold text-xl mb-8 text-center">My Tech Stack</h3>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto -mt-6">
          A collection of the primary languages, frameworks, and tools I use to bring ideas to life.
        </p>
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
          variants={techStackContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.name}
              variants={techStackItemVariants}
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
      </motion.div>
    </Section>
  );
};

export default Skills;