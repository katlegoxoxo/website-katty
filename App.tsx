import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import { NAV_LINKS } from './constants';
import { AnimatePresence } from 'framer-motion';
import type { Project, EducationItem } from './types';
import Modal from './components/Modal';
import CertificateModal from './components/CertificateModal';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<EducationItem | null>(null);

  return (
    <div className="relative z-10">
      <ParticleCanvas />
      <Header />
      <main className="relative z-20 mx-auto max-w-6xl px-6">
        <Hero />
        <About id={NAV_LINKS[1].id} title="About" />
        <Projects id={NAV_LINKS[2].id} title="Projects" onProjectSelect={setSelectedProject} />
        <Skills id={NAV_LINKS[3].id} title="Skills & Tools" />
        <Education id={NAV_LINKS[4].id} title="Education" onCertificateSelect={setSelectedCertificate} />
        <Certifications id={NAV_LINKS[5].id} title="Certifications & Badges" />
        <Contact id={NAV_LINKS[6].id} title="Get In Touch" />
      </main>
      <Footer />
      <AnimatePresence>
        {selectedProject && (
          <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedCertificate && (
          <CertificateModal item={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
