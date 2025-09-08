import type { Project, SkillCategory, EducationItem, Certification } from './types';

export const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Education', id: 'education' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Contact', id: 'contact' },
];

export const PROJECTS: Project[] = [
  {
    name: 'AI Resume Builder',
    date: '10/2025',
    description: 'An intelligent resume generation system that creates customized, ATS-friendly resumes based on user inputs and job descriptions, leveraging AI to highlight key skills and experiences.',
    technologies: ['Gemini API', 'React', 'Node.js', 'TypeScript'],
    githubUrl: 'https://github.com/katlegoxoxo/ai-resume-builder.git',
    imageUrl: `${import.meta.env.BASE_URL}images/ai-resume-builder.png`,
  },
  {
    name: 'Sentiment Analysis Dashboard',
    date: '09/2025',
    description: 'An interactive dashboard that analyzes sentiment in text data. Users can input text directly or upload files to understand emotional tone in customer reviews, social media posts, or other content.',
    technologies: ['Gemini API', 'React', 'D3.js', 'Chart.js'],
    githubUrl: 'https://github.com/Jozi-Navigators/Sentiment-Analysis-Dashboard.git',
    imageUrl: `${import.meta.env.BASE_URL}images/SentimentAnalysisDashboard.png`,
    demoComponent: 'sentimentAnalysis',
  },
  {
    name: 'AI School Buddy ',
    date: '06/2025',
    description: 'A collaborative learning platform for students, featuring subject-specific chat rooms, resource sharing, and a peer-to-peer tutoring scheduler to enhance academic support and engagement.',
    technologies: ['React', 'Firebase', 'Real-time Chat', 'UI/UX'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: `${import.meta.env.BASE_URL}images/AILearning.png`,
  },
  {
    name: 'Juta Medical & Dental Centre',
    date: '04/2024',
    description: 'Website & mobile app (Android) for a clinic. Features: booking forms, contact listing, responsive UI, basic auth, and user-role docs. Implemented with Android Studio & responsive front-end; used Git & Trello for project workflow.',
    technologies: ['Android Studio', 'HTML/CSS', 'Git', 'UI/UX'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: 'https://picsum.photos/seed/juta/800/600',
  },
  {
    name: 'Slatt Image Gen AI',
    date: '08/2025',
    description: 'Created an AI-powered image generation app using modern JS and APIs for creative automation.',
    technologies: ['HTML', 'JavaScript', 'APIs'],
    githubUrl: 'https://github.com/katlegoxoxo/image-gen-xo.git',
    imageUrl: `${import.meta.env.BASE_URL}images/slatt.png`,
    demoComponent: 'imageGeneration',
  },
  {
    name: 'AI Fundamentals Chatbot',
    date: '08/2025',
    description: 'Created an AI-powered chatbot using no-code tools, demonstrating an understanding of conversational AI principles and rapid prototyping.',
    technologies: ['No-Code AI', 'Chatbot Design'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: 'https://picsum.photos/seed/chatbot/800/600',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming & Data',
    skills: [
      { name: 'Java', icon: 'fab fa-java', description: 'Leveraged Java for core coursework, focusing on object-oriented principles, data structures, and algorithms. Built console-based applications and have a foundational understanding of its use in backend systems.' },
      { name: 'C#', icon: 'fas fa-code', description: 'Developed applications using C# and the .NET framework. My experience includes building robust logic and understanding its application in enterprise-level software.' },
      { name: 'Python (basic)', icon: 'fab fa-python', description: 'Used Python for introductory data analysis and scripting tasks. Familiar with its clean syntax and powerful libraries for quick prototyping and automation.' },
      { name: 'SQL', icon: 'fas fa-database', description: 'Proficient in writing SQL queries for data retrieval, manipulation, and management in relational databases. Experienced in designing simple database schemas and ensuring data integrity.' },
      { name: 'HTML & CSS', icon: 'fab fa-html5', description: 'Built responsive and semantic front-end layouts for web and mobile applications. Focused on creating clean, user-friendly interfaces that are accessible and cross-browser compatible.' },
      { name: 'TypeScript', icon: 'fas fa-code', description: 'Utilized TypeScript to bring static typing to JavaScript projects, improving code quality, maintainability, and developer experience by catching errors early in the development process.' },
    ],
  },
  {
    title: 'Tools & Cloud',
    skills: [
      { name: 'Git & GitHub', icon: 'fab fa-github', description: 'Experienced in using Git for version control and GitHub for collaborative development. Proficient with core concepts like branching, merging, pull requests, and resolving conflicts.' },
      { name: 'Android Studio', icon: 'fab fa-android', description: 'Used Android Studio to develop a native Android application for a real-world clinic. Handled UI design with XML, implemented core logic in Java, and managed the project build process.' },
      { name: 'VS Code', icon: 'fas fa-code', description: 'My primary code editor for web development and scripting. Proficient in using its integrated debugger, terminal, and a wide range of extensions to boost productivity.' },
      { name: 'Power BI (basic)', icon: 'fas fa-chart-line', description: 'Familiar with Power BI for creating simple dashboards and visualizing data. Able to connect data sources and generate basic reports to extract insights.' },
      { name: 'Google Cloud & AI', icon: 'fab fa-google', description: 'Completed introductory courses on Google Cloud\'s core infrastructure and Generative AI services. Eager to apply this knowledge to build and deploy intelligent applications.' },
      { name: 'Trello', icon: 'fab fa-trello', description: 'Used Trello for agile project management, organizing tasks, tracking progress, and collaborating with team members in a Kanban-style workflow.' },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Diploma in Software Development',
    institution: 'IIE Rosebank College',
    dateRange: '2022-2024',
    certificateUrl: `${import.meta.env.BASE_URL}files/Qualification.pdf`
  }
];


export const CERTIFICATIONS: Certification[] = [
  { name: 'Generative AI with Large Language Models', issuer: 'AWS & DeepLearning.AI', date: 'Aug 22, 2025', imageUrl: '/assets/certs/aws-gen-ai-llm.png', verifyUrl: 'https://coursera.org/verify/2SRX3MZ2EAC2' },
  { name: 'Python for Data Science, AI & Development', issuer: 'IBM', date: 'Aug 21, 2025', imageUrl: `${import.meta.env.BASE_URL}files/GenerativeAIwithLargeLanguageModelsCoursera.pdf`, verifyUrl: 'https://coursera.org/verify/BLRPVE4Q019H' },
  { name: 'AI Foundations: Prompt Engineering with ChatGPT', issuer: 'Arizona State University', date: 'Aug 11, 2025', imageUrl: '/assets/certs/asu-prompt-engineering.png', verifyUrl: 'https://coursera.org/verify/B5QFU48UJRPD' },
  { name: 'Artificial Intelligence on Microsoft Azure', issuer: 'Microsoft', date: 'Aug 7, 2025', imageUrl: '/assets/certs/microsoft-ai-azure.png', verifyUrl: 'https://coursera.org/verify/6QBSFJ4RZD9P' },
  { name: 'Introduction to Artificial Intelligent', issuer: 'Capaciti', date: 'Aug 7, 2025', imageUrl: '/assets/certs/capaciti-intro-ai.png', verifyUrl: '#' },
  { name: 'Introduction to Responsible AI', issuer: 'Google Cloud', date: 'Aug 1, 2025', imageUrl: '/assets/certs/google-responsible-ai.png', verifyUrl: 'https://coursera.org/verify/A36BDVJ507MK' },
  { name: 'AI For Everyone', issuer: 'DeepLearning.AI', date: 'Jul 31, 2025', imageUrl: '/assets/certs/deeplearning-ai-for-everyone.png', verifyUrl: 'https://coursera.org/verify/2AOOUG9QY4YY' },
  { name: 'Introduction to Artificial Intelligence (AI)', issuer: 'IBM', date: 'Jul 31, 2025', imageUrl: '/assets/certs/ibm-intro-ai.png', verifyUrl: 'https://coursera.org/verify/W5GIHZV1991C' },
  { name: 'Introduction to Generative AI', issuer: 'Google Cloud', date: 'Jul 30, 2025', imageUrl: '/assets/certs/google-intro-gen-ai.png', verifyUrl: 'https://coursera.org/verify/VUY4MQ7JEG3Q' },
  { name: 'AI Essentials', issuer: 'Intel', date: 'Jul 30, 2025', imageUrl: '/assets/certs/intel-ai-essentials.png', verifyUrl: 'https://coursera.org/verify/4RNQ5TI5HC4Y' },
];

export const BADGES: Certification[] = [
  { name: 'Python for Data Science and AI', issuer: 'IBM', date: '', imageUrl: '/assets/certs/badge-python-ds-ai.png', verifyUrl: '#', isBadge: true },
  { name: 'Artificial Intelligence Essentials V2', issuer: 'IBM', date: '', imageUrl: '/assets/certs/badge-ai-essentials.png', verifyUrl: '#', isBadge: true },
];