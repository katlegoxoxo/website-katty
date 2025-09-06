import React, { useState } from 'react';
import Section from './Section';
import { EDUCATION } from '../constants';
import { AnimatePresence } from 'framer-motion';
import type { EducationItem } from '../types';
import CertificateModal from './CertificateModal';

interface EducationProps {
  id: string;
  title: string;
}

const Education: React.FC<EducationProps> = ({ id, title }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<EducationItem | null>(null);

  return (
    <Section id={id} title={title}>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-8">
        <ul>
          {EDUCATION.map(item => (
            <li
              key={item.degree}
              className={` ${item.certificateUrl ? 'cursor-pointer group transition-all duration-300 hover:bg-white/5 rounded-lg' : ''}`}
              onClick={() => item.certificateUrl && setSelectedCertificate(item)}
            >
              <div className="p-4">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">{item.degree}</p>
                  {item.dateRange && <span className="font-mono text-xs text-slate-500">{item.dateRange}</span>}
                </div>
                <p className="text-slate-400">{item.institution}</p>
                {item.certificateUrl && (
                    <span className="text-xs font-mono text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 inline-block">
                        <i className="fas fa-eye mr-2"></i>View Certificate
                    </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal item={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Education;