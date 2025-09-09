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
        className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-slate-300 leading-relaxed">
          As a recent IT graduate who earned a Diploma with Distinction, I am a passionate and detail-oriented Software Developer committed to building impactful digital experiences. My foundation is grounded in object-oriented programming, algorithms, and data structures, which allows me to approach problem-solving with both creativity and precision. I thrive on turning abstract ideas into functional, user-friendly applications that provide real value.
        </p>
       
        <p className="text-slate-300 leading-relaxed">
          Beyond my academic training, I have developed a strong interest in Artificial Intelligence and emerging technologies. Through self-study and industry certifications, I’ve explored Generative AI, Large Language Models, and cloud computing platforms from leaders such as Google, AWS, and IBM. This journey has expanded my skill set, enabling me to integrate AI-powered features into applications and better understand the role of intelligent systems in shaping the future of software development.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Ultimately, I see myself as a lifelong learner, constantly pushing the boundaries of my skills and exploring new tools that make development smarter and more efficient. Whether working independently or as part of a team, my goal is to craft solutions that are scalable, elegant, and aligned with user needs while also staying adaptable to the rapidly evolving tech landscape.
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
