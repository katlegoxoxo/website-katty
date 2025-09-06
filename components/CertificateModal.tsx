import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import type { EducationItem } from '../types';

interface CertificateModalProps {
  item: EducationItem;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
};

const CertificateModal: React.FC<CertificateModalProps> = ({ item, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!item.certificateUrl) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className="bg-slate-800/80 border border-white/10 rounded-xl w-full max-w-4xl h-[85vh] flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow p-1 md:p-2 relative bg-slate-900/50">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center" aria-live="polite">
                    <i className="fas fa-spinner fa-spin text-cyan-400 text-4xl"></i>
                    <span className="sr-only">Loading certificate...</span>
                </div>
            )}
            <iframe
                src={item.certificateUrl}
                title={`${item.degree} Certificate`}
                className={`w-full h-full border-0 rounded-md transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
         <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-slate-900/60 rounded-full w-10 h-10 flex items-center justify-center z-10"
            aria-label="Close certificate viewer"
        >
            <i className="fas fa-times"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CertificateModal;