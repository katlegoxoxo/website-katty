import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface CertificateModalProps {
  url: string;
  title: string;
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

const CertificateModal: React.FC<CertificateModalProps> = ({ url, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!url) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-zinc-900/80 border border-white/10 rounded-xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900">
            <h3 className="text-lg font-bold text-cyan-400 truncate pr-4">{title}</h3>
            <div className="flex items-center gap-4">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-slate-200 font-bold py-1 px-3 rounded-md transition-colors text-sm flex items-center gap-2"
            >
                <span>Open</span>
                <i className="fas fa-external-link-alt text-xs"></i>
            </a>
            <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close certificate viewer"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
            </div>
        </div>
        <div className="flex-grow relative bg-black/50">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center" aria-live="polite">
                    <i className="fas fa-spinner fa-spin text-cyan-400 text-4xl"></i>
                    <span className="sr-only">Loading certificate...</span>
                </div>
            )}
            <iframe
                src={url}
                title={`${title} Certificate`}
                className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificateModal;
