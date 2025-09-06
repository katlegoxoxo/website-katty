import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

interface AboutProps {
  id: string;
  title: string;
}

const About: React.FC<AboutProps> = ({ id, title }) => {
  return (
    <Section id={id} title={title}>
      <motion.div 
        className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-slate-300 mb-4">
          IT graduate with hands-on experience in software development, data analysis, and cloud-based AI tools.
          Built and deployed a full-stack web & mobile app for a real-world clinic, focusing on responsive UI,
          booking features, version control with Git/GitHub, and stakeholder-driven requirements. Strong in documentation,
          testing, and collaboration.
        </p>
        <ul className="list-disc list-inside text-slate-400 space-y-2">
          <li>Languages: C#, Java, Python (basic), HTML, CSS, SQL, TypeScript</li>
          <li>Tools: Git, GitHub, Android Studio, VS Code, Power BI, Trello</li>
          <li>Cloud & AI: Intro to Google Cloud LLMs, Generative AI (Google badges)</li>
        </ul>
      </motion.div>
    </Section>
  );
};

export default About;