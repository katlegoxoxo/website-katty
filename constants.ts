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
  },
  {
    name: 'School Buddy Learning System',
    date: '06/2025',
    description: 'A collaborative learning platform for students, featuring subject-specific chat rooms, resource sharing, and a peer-to-peer tutoring scheduler to enhance academic support and engagement.',
    technologies: ['React', 'Firebase', 'Real-time Chat', 'UI/UX'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: 'https://picsum.photos/seed/school-buddy/800/600',
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
        certificateUrl: '/assets/Software_Development_Diploma.pdf'
    }
];

export const CERTIFICATIONS: Certification[] = [
    { name: 'Introduction to Generative AI', imageUrl: 'https://picsum.photos/seed/genai/100/100', verifyUrl: 'https://www.cloudskillsboost.google/public_profiles/28ea05c6-984f-4824-9941-2e9a745a386e/badges/8636638' },
    { name: 'Innovating with Google Cloud AI', imageUrl: 'https://picsum.photos/seed/gcai/100/100', verifyUrl: '#' },
    { name: 'Java & Python Certificates', imageUrl: 'https://picsum.photos/seed/javacert/100/100', verifyUrl: '#' },
];