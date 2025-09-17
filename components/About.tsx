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
          As a detail-oriented professional with a Diploma with Distinction in IT (Software Development),
          I bring a solid foundation in programming, databases, and problem-solving.
          My current role as a Digital Associate at Capaciti allows me to expand my skills in Python and AI,
          while nurturing a growing passion for data analytics and turning information into actionable insights.
        </p>

        <p className="text-slate-300 leading-relaxed">
          Beyond my academic background, I have actively pursued certifications in Generative AI,
          Large Language Models, and cloud platforms from industry leaders like Google, AWS, and IBM.
          These experiences have equipped me not only with technical knowledge but also with the practical ability
          to apply data-driven and intelligent solutions to real-world challenges.
        </p>

        <div className="border-t border-white/10 pt-6">
          <p className="text-slate-400 font-semibold mb-3">Core Competencies:</p>
          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li><span className="font-semibold text-slate-300">Languages:</span> C#, Java, TypeScript, SQL, HTML/CSS, Python (basic)</li>
            <li><span className="font-semibold text-slate-300">Frameworks & Tools:</span> .NET, React, GitHub, Android Studio, VS Code, Trello</li>
            <li><span className="font-semibold text-slate-300">Cloud & AI:</span> Gemini API, Google Cloud (Intro), Microsoft Azure (Intro), Prompt Engineering</li>
          </ul>
        </div>
      </motion.div>
    </Section>
  );
};

export default About;
