
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
// FIX: Import Variants to explicitly type framer-motion variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Active section logic
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
      
      // Scrolled state for transparent navbar
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on mount to set initial state based on scroll position (e.g., on refresh)
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-2">
      {NAV_LINKS.map(link => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            onClick={() => setIsOpen(false)}
            className={`font-semibold text-sm px-3 py-2 rounded-md transition-colors duration-300 ${
              activeSection === link.id
                ? 'text-cyan-400 bg-cyan-400/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );

  const backdropVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  // FIX: Explicitly type menuVariants with Variants to fix TypeScript error with transition properties.
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: '-50%' },
    visible: { 
      opacity: 1, 
      y: '0%',
      transition: { type: 'spring', stiffness: 300, damping: 30 } 
    },
    exit: { 
      opacity: 0, 
      y: '-50%',
      transition: { duration: 0.2 }
    },
  };

  const showBackground = isScrolled || isOpen;

  return (
    <header className={`sticky top-0 z-50 h-20 transition-all duration-300 ease-in-out ${showBackground ? 'backdrop-blur-lg bg-black/60 border-b border-white/5 shadow-lg shadow-black/20' : 'border-b border-transparent'}`}>
      <div className="mx-auto max-w-6xl px-6 h-full flex justify-between items-center">
        <a href="#home" className="font-mono text-cyan-400 font-bold tracking-wide">
          KATLEGO MAKETE
        </a>
        <nav className="hidden md:block">
          {navLinks}
        </nav>
        <button
          className="md:hidden text-cyan-400 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}></i>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              key="menu"
              className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 shadow-lg z-40"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="mx-auto max-w-6xl px-6 pt-4 pb-6">{navLinks}</nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;