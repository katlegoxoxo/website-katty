import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.name}`}
        className="bg-slate-800/80 border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex-shrink-0">
            {project.imageUrl && (
                <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="w-full h-64 object-cover rounded-t-xl" 
                />
            )}
        </div>
        
        <div className="p-8 flex-grow overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-cyan-400">{project.name}</h2>
                <span className="font-mono text-sm text-slate-500 flex-shrink-0 ml-4">{project.date}</span>
            </div>
            
            <p className="text-slate-300 mb-6">{project.description}</p>
            
            <h3 className="font-semibold text-slate-200 mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map(tech => (
                    <span key={tech} className="bg-cyan-400/10 text-cyan-300 text-xs font-mono px-2 py-1 rounded">
                    {tech}
                    </span>
                ))}
            </div>

             <div className="mt-auto border-t border-white/10 pt-6">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-slate-200 font-bold py-2 px-5 rounded-md transition-colors flex items-center gap-2 w-full justify-center">
                <i className="fab fa-github"></i> View Source on GitHub
              </a>
            </div>
        </div>

         <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
            <i className="fas fa-times text-2xl"></i>
        </button>

      </motion.div>
    </motion.div>
  );
};

export default Modal;
