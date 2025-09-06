
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-center border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm text-slate-500">
          © {currentYear} Katlego Shaun Makete — Built with <i className="fas fa-heart text-cyan-400"></i> using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
