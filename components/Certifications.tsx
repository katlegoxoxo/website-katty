import React, { useState } from 'react';
import Section from './Section';
import { CERTIFICATION_CATEGORIES } from '../constants';
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface CertificationsProps {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const CERTS_TO_SHOW = 5;

const Certifications: React.FC<CertificationsProps> = ({ id, title }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  return (
    <Section id={id} title={title}>
      <div className="space-y-12">
        {CERTIFICATION_CATEGORIES.map(category => {
          const isExpanded = expandedCategories[category.title] || false;
          const visibleCerts = isExpanded ? category.certifications : category.certifications.slice(0, CERTS_TO_SHOW);

          return (
            <motion.div
              key={category.title}
              layout
              className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold text-lg mb-6 text-slate-200">{category.title}</h3>
              <motion.ul 
                layout
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence initial={false}>
                  {visibleCerts.map(cert => (
                    <motion.li 
                      key={cert.name}
                      layout
                      variants={itemVariants}
                      exit="exit"
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
                        <span className="font-mono text-xs text-slate-500 ml-auto hidden sm:block">{cert.issuer}</span>
                      </a>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              {category.certifications.length > CERTS_TO_SHOW && (
                <div className="mt-8 text-center">
                  <motion.button
                    onClick={() => toggleCategory(category.title)}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 font-bold py-2 px-6 rounded-md transition-colors flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isExpanded ? 'Show Less' : `Show ${category.certifications.length - CERTS_TO_SHOW} More`}
                    <i className={`fas fa-chevron-down ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                  </motion.button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default Certifications;