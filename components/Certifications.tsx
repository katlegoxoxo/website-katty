import React, { useState } from 'react';
import Section from './Section';
import { CERTIFICATION_CATEGORIES } from '../constants';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import type { Certification } from '../types';

interface CertificationsProps {
  id: string;
  title: string;
  onViewCertificate: (cert: Certification) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
};

const CERTS_TO_SHOW = 8;

const Certifications: React.FC<CertificationsProps> = ({ id, title, onViewCertificate }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  return (
    <Section id={id} title={title}>
      <div className="space-y-16">
        {CERTIFICATION_CATEGORIES.map(category => {
          const isExpanded = expandedCategories[category.title] || false;
          const visibleCerts = isExpanded ? category.certifications : category.certifications.slice(0, CERTS_TO_SHOW);

          return (
            <motion.div
              key={category.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold text-xl mb-8 text-slate-200">{category.title}</h3>
              <motion.ul
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence>
                  {visibleCerts.map(cert => (
                    <motion.li
                      key={cert.name}
                      onClick={() => {
                        if (cert.imageUrl || cert.certificateUrl) {
                          onViewCertificate(cert);
                        } else if (cert.verifyUrl && cert.verifyUrl !== '#') {
                          window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      layout
                      variants={itemVariants}
                      exit="exit"
                      whileHover={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(0, 189, 212, 0.5)',
                        y: -3
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex justify-between items-center group cursor-pointer shadow-lg shadow-black/20"
                    >
                      <div>
                        <h4 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                          {cert.name}
                        </h4>
                        <div className="mt-1 text-sm text-slate-500 font-mono">
                          <span>{cert.issuer}</span>
                          <span className="mx-2">&bull;</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                      <div className="text-slate-500 group-hover:text-cyan-400 transition-all transform group-hover:scale-110 pl-4">
                          <i className="fas fa-eye"></i>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              {category.certifications.length > CERTS_TO_SHOW && (
                <div className="mt-12 text-center">
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