import React, { useState } from 'react';
import Section from './Section';
import { CERTIFICATION_CATEGORIES } from '../constants';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import type { Certification } from '../types';
import ImageViewerModal from './ImageViewerModal';

interface CertificationsProps {
  id: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.3 } }
};

const CERTS_TO_SHOW = 8;

const Certifications: React.FC<CertificationsProps> = ({ id, title }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle]
    }));
  };

  const handleViewCertificate = (cert: Certification) => {
    setSelectedCertificate(cert);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, cert: Certification) => {
    console.error(`❌ Failed to load image for ${cert.name}:`, cert.imageUrl);
    e.currentTarget.src = "https://via.placeholder.com/400x200?text=No+Image";
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
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {visibleCerts.map(cert => (
                    <motion.div
                      key={cert.name}
                      layoutId={`cert-card-${cert.name}`}
                      variants={itemVariants}
                      exit="exit"
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col group overflow-hidden shadow-lg shadow-black/20"
                    >
                      <button
                        onClick={() => handleViewCertificate(cert)}
                        className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset rounded-xl"
                        aria-label={`View certificate for ${cert.name}`}
                      ></button>
                      
                      {cert.imageUrl ? (
                        <img
                          src={cert.imageUrl}
                          alt={`${cert.name} certificate`}
                          className="w-full aspect-video object-cover border-b border-white/10"
                          onError={(e) => handleImageError(e, cert)}
                        />
                      ) : (
                        <div className="w-full aspect-video bg-black/20 border-b border-white/10 flex items-center justify-center p-4">
                          <div className="text-center text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                            <i className="fas fa-file-pdf text-4xl"></i>
                            <p className="text-xs font-mono mt-2">View PDF</p>
                          </div>
                        </div>
                      )}
                      <div className="p-4 flex flex-col flex-grow">
                        <h4 className="font-bold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors flex-grow">
                          {cert.name}
                        </h4>
                        <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-500">
                          <span>{cert.issuer}</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

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

      {/* Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <ImageViewerModal
            certificate={selectedCertificate}
            onClose={() => setSelectedCertificate(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Certifications;
