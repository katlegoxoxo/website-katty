import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';
import { motion, Variants } from 'framer-motion';

interface ExperienceProps {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Experience: React.FC<ExperienceProps> = ({ id, title }) => {
  return (
    <Section id={id} title={title}>
      <div className="relative border-l-2 border-white/10 ml-3 py-4">
        <motion.ul
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {EXPERIENCE.map((job, index) => (
            <motion.li
              key={index}
              className="relative pl-10"
              variants={itemVariants}
            >
              {/* Timeline Marker */}
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-cyan-400 rounded-full border-4 border-black ring-4 ring-cyan-400/30"></div>

              {/* Job Details */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h3 className="font-bold text-slate-100 text-lg">
                  {job.role}
                  <span className="text-cyan-400 font-semibold text-base"> @ {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-slate-500 mt-1 sm:mt-0 flex-shrink-0 sm:ml-4">{job.dateRange}</span>
              </div>
              
              <ul className="list-disc list-outside pl-5 text-slate-400 space-y-2 text-sm leading-relaxed">
                {job.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
};

export default Experience;
