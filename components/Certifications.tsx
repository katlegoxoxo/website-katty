import React from 'react';
import Section from './Section';
import { CERTIFICATIONS } from '../constants';
import { motion, Variants } from 'framer-motion';

interface CertificationsProps {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Certifications: React.FC<CertificationsProps> = ({ id, title }) => {
  return (
    <Section id={id} title={title}>
      <motion.div 
        className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ul className="space-y-4">
          {CERTIFICATIONS.map(cert => (
            <motion.li 
              key={cert.name}
              variants={itemVariants}
            >
              <a 
                href={cert.verifyUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors duration-300 group"
              >
                <i className="fas fa-award text-cyan-400 text-xl w-6 text-center"></i>
                <span className="font-medium group-hover:underline underline-offset-4 decoration-cyan-400/50">
                  {cert.name}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
};

export default Certifications;