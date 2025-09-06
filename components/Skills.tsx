import React, { useState } from 'react';
import Section from './Section';
import { SKILL_CATEGORIES } from '../constants';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SkillsProps {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Skills: React.FC<SkillsProps> = ({ id, title }) => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const handleSkillClick = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <Section id={id} title={title}>
      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SKILL_CATEGORIES.map(category => (
          <motion.div
            key={category.title}
            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            variants={itemVariants}
          >
            <h3 className="font-bold text-lg mb-4 text-slate-200">{category.title}</h3>
            <div className="grid grid-cols-2 gap-4">
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
                        ? 'bg-white/10'
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
    </Section>
  );
};

export default Skills;