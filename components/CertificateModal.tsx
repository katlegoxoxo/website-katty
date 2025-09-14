import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface CertificateModalProps {
  title: string;
  imageUrl?: string;
  pdfUrl?: string;
  verifyUrl?: string;
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

const CertificateModal: React.FC<CertificateModalProps> = ({ title, imageUrl, pdfUrl, verifyUrl, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!imageUrl && !pdfUrl) return null;

  const hasValidVerifyUrl = verifyUrl && verifyUrl !== '#';

  const isImage = !!imageUrl;
  // Use a different max-width for images vs PDFs for better viewing
  const maxWidthClass = isImage ? 'max-w-3xl' : 'max-w-5xl';
  // Images can be flexible height, PDFs should take up most of the screen
  const heightClass = isImage ? 'max-h-[90vh]' : 'h-[90vh]';

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
        className={`bg-zinc-900 border border-white/10 rounded-xl w-full ${maxWidthClass} ${heightClass} flex flex-col relative overflow-hidden shadow-2xl shadow-black/50`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center bg-zinc-900">
            <h3 className="font-bold text-slate-200 truncate pr-10">{title}</h3>
            <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-white transition-colors flex-shrink-0 z-10"
                aria-label="Close certificate viewer"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>

        <div className="flex-grow p-1 md:p-2 relative bg-black/50 overflow-auto">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center" aria-live="polite">
                    <i className="fas fa-spinner fa-spin text-cyan-400 text-4xl"></i>
                    <span className="sr-only">Loading certificate...</span>
                </div>
            )}
            {imageUrl && (
                 <img
                    src={imageUrl}
                    alt={`${title} Certificate`}
                    className={`w-full h-auto object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                />
            )}
            {pdfUrl && (
                 <iframe
                    src={pdfUrl}
                    title={`${title} Certificate`}
                    className={`w-full h-full border-0 rounded-md transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                />
            )}
        </div>
        
        {hasValidVerifyUrl && (
            <div className="flex-shrink-0 p-4 border-t border-white/10 bg-zinc-900 text-center">
                <a
                    href={verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-6 rounded-md transition-colors inline-flex items-center gap-2"
                >
                    <i className="fas fa-check-circle"></i>
                    <span>Verify Certificate</span>
                </a>
            </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CertificateModal;