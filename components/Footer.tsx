
import React from 'react';
import Magnetic from './Magnetic';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 mt-12 text-center border-t border-white/10 relative">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-8">
        
        <button 
          onClick={handleScrollToTop}
          className="bg-zinc-800 hover:bg-cyan-500 hover:text-black transition-all duration-300 w-12 h-12 rounded-full flex items-center justify-center absolute -top-6 left-1/2 -translate-x-1/2 border-4 border-black group"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up transform group-hover:-translate-y-0.5 transition-transform"></i>
        </button>

        

        <p className="font-mono text-sm text-cyan-400/80 italic">
          "Stay learning, stay building, stay relentless"
        </p>

        <p className="text-sm text-slate-500">
          © {currentYear} Katlego Makete — Built with <i className="fas fa-heart text-cyan-400"></i> using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;