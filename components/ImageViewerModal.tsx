import React from 'react';
import { motion, Variants } from 'framer-motion';
import type { Certification } from '../types';

interface ImageViewerModalProps {
  certificate: Certification;
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

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ certificate, onClose }) => {
  if (!certificate.imageUrl) return null;

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
        layoutId={`cert-card-${certificate.name}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-zinc-900/80 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900">
            <div>
                <h3 className="text-lg font-bold text-cyan-400">{certificate.name}</h3>
                <p className="text-sm text-slate-400">{certificate.issuer}</p>
            </div>
            <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors ml-4"
                aria-label="Close certificate viewer"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
        <div className="flex-grow p-4 bg-black/20 overflow-auto flex items-center justify-center">
          <img
            src={certificate.imageUrl}
            alt={`${certificate.name} certificate`}
            className="max-w-full max-h-full object-contain shadow-2xl shadow-black/50"
          />
        </div>
        {certificate.verifyUrl && certificate.verifyUrl !== '#' && (
          <div className="p-4 border-t border-white/10 text-center flex-shrink-0 bg-zinc-900">
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors inline-flex items-center gap-2"
            >
              <i className="fas fa-external-link-alt"></i> Verify Certificate
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImageViewerModal;
