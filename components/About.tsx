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
        className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-slate-300 leading-relaxed">
          As a passionate and detail-oriented Software Developer, I leverage my recent Diploma with Distinction in IT to transform complex problems into elegant, user-centric digital solutions. Currently, as a Digital Associate at Capaciti, I am actively expanding my skill set in AI and Python, applying my foundational knowledge to real-world digital initiatives.
        </p>
       
        <p className="text-slate-300 leading-relaxed">
          Beyond my core academic skills, I am deeply fascinated by the potential of Artificial Intelligence. I have proactively pursued this interest through self-study and numerous certifications in Generative AI, Large Language Models, and cloud platforms from industry leaders like Google, AWS, and IBM. This has equipped me not only with theoretical knowledge but also with the practical skills to build and integrate intelligent features into modern applications.
        </p>
        <div className="border-t border-white/10 pt-6">
          <p className="text-slate-400 font-semibold mb-3">Core Competencies:</p>
          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li><span className="font-semibold text-slate-300">Languages:</span> C#, Java, TypeScript, SQL, HTML/CSS, Python (basic)</li>
            <li><span className="font-semibold text-slate-300">Frameworks & Tools:</span> .NET, React, Git/GitHub, Android Studio, VS Code, Trello</li>
            <li><span className="font-semibold text-slate-300">Cloud & AI:</span> Gemini API, Google Cloud (Intro), Microsoft Azure (Intro), Prompt Engineering</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
};

export default About;
