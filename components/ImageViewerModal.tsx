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
        className="bg-zinc-900/80 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 md:p-6 border-b border-white/10 flex-shrink-0">
          <h3 className="text-lg font-bold text-cyan-400">{certificate.name}</h3>
          <p className="text-sm text-slate-400">{certificate.issuer}</p>
        </div>
        <div className="flex-grow p-4 bg-black/20 overflow-auto flex items-center justify-center">
          <img
            src={certificate.imageUrl}
            alt={`${certificate.name} certificate`}
            className="max-w-full max-h-full object-contain shadow-2xl shadow-black/50"
          />
        </div>
        {certificate.verifyUrl && certificate.verifyUrl !== '#' && (
          <div className="p-4 border-t border-white/10 text-center flex-shrink-0">
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-200 bg-zinc-800 rounded-full w-10 h-10 flex items-center justify-center border-2 border-zinc-700 hover:bg-cyan-500 hover:text-slate-900 hover:border-cyan-500 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          aria-label="Close certificate viewer"
        >
          <i className="fas fa-times text-lg"></i>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ImageViewerModal;