import type { Project, SkillCategory, EducationItem, Certification, Experience, TechStackCategory,CertificationCategory } from './types';

export const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Education', id: 'education' },
  { name: 'Experience', id: 'experience' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Contact', id: 'contact' },
];


export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
  {
    title: 'Frontend',
    technologies: [
      { name: 'React', icon: 'fab fa-react' },
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
    ],
  },
  {
    title: 'Backend & Databases',
    technologies: [
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Firebase', icon: 'fas fa-fire' },
      { name: 'SQL', icon: 'fas fa-database' },
    ],
  },
  {
    title: 'Languages',
    technologies: [
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'C#', icon: 'fas fa-code' },
      { name: 'Python', icon: 'fab fa-python' },
    ],
  },
  {
    title: 'Tools & Platforms',
    technologies: [
      { name: 'GitHub', icon: 'fab fa-github' },
      { name: 'Android Studio', icon: 'fab fa-android' },
      { name: 'VS Code', icon: 'fas fa-code' },
    ],
  },
];


export const PROJECTS: Project[] = [
  {
    name: 'AI Resume Builder',
    date: '08/2025',
    description: 'An intelligent resume generation system that creates customized, ATS-friendly resumes based on user inputs and job descriptions, leveraging AI to highlight key skills and experiences.',
     detailedDescription: [
      { title: 'The Challenge', icon: 'fas fa-bullseye', content: 'Manually tailoring a resume for every job application is time-consuming and often fails to pass initial screening by Applicant Tracking Systems (ATS). This project\'s goal was to automate this process, creating highly relevant, keyword-optimized resumes that capture a recruiter\'s attention.' },
      { title: 'Core Functionality', icon: 'fas fa-cogs', content: 'The application provides a clean, step-by-step interface for users to input their career history, education, and skills. By providing a target job description, users trigger an AI-powered process that analyzes the requirements and strategically rewrites their bullet points to align perfectly with the role.' },
      { title: 'Technical Breakdown', icon: 'fas fa-code-branch', content: 'Built with React and TypeScript for a type-safe frontend, the application communicates with a Node.js backend that securely handles requests to the Gemini API. The core logic involves sophisticated prompt engineering to instruct the model to act as a professional resume writer, extracting key verbs and metrics from the job description and weaving them into the user\'s experience. The final resume is then generated as a downloadable PDF.' },
      { title: 'Key Learning', icon: 'fas fa-lightbulb', content: 'The main challenge was in prompt design—ensuring the AI produced consistently high-quality, professional, and grammatically correct content. This required iterative testing and refining the instructions given to the model, which provided deep insights into the nuances of controlling generative AI outputs.' }
    ],
    technologies: ['Gemini API', 'React', 'Node.js', 'TypeScript'],
    githubUrl: 'https://github.com/katlegoxoxo/ai-resume-builder.git',
    imageUrl: `${import.meta.env.BASE_URL}images/ai-resume-builder.png`,
    demoComponent: 'resumeBuilder',
  },
  {
    name: 'Sentiment Analysis Dashboard',
    date: '09/2025',
    description: 'An interactive dashboard that analyzes sentiment in text data. Users can input text directly or upload files to understand emotional tone in customer reviews, social media posts, or other content.',
     detailedDescription: [
      { title: 'The Goal', icon: 'fas fa-bullseye', content: 'The project aimed to create an accessible tool for understanding the emotional tone within text data, transforming raw text from sources like customer reviews or social media into actionable insights. The primary objective was to present this complex analysis in a simple, visually intuitive dashboard.' },
      { title: 'User Interaction', icon: 'fas fa-mouse-pointer', content: 'The user experience is centered around a single text input area. After pasting their content and clicking "Analyze," the results are displayed almost instantly. The UI uses color-coding and clear iconography to immediately convey the overall sentiment before the user even reads the details.' },
      { title: 'Technical Implementation', icon: 'fas fa-microchip', content: 'This project leverages the Gemini API\'s JSON mode for structured data output. The React frontend sends the user\'s text and receives a clean JSON object containing the sentiment, confidence score, and influential keywords. This data is then fed into D3.js and Chart.js components to render dynamic, animated gauges and charts, providing a rich data visualization experience.' },
      { title: 'Overcoming Challenges', icon: 'fas fa-brain', content: 'A key challenge was handling a wide variety of text lengths and complexities without sacrificing performance. This was addressed by implementing frontend validation and designing the API call to be efficient. It was a great exercise in combining AI-driven data processing with effective frontend data visualization.' }
    ],
    technologies: ['Gemini API', 'React', 'D3.js', 'Chart.js'],
    githubUrl: 'https://github.com/Jozi-Navigators/Sentiment-Analysis-Dashboard.git',
    imageUrl: `${import.meta.env.BASE_URL}images/SentimentAnalysisDashboard.png`,
    demoComponent: 'sentimentAnalysis',
  },
  {
    name: 'AI School Buddy ',
    date: '09/2025',
    description: 'A collaborative learning platform for students, featuring subject-specific chat rooms, resource sharing, and a peer-to-peer tutoring scheduler to enhance academic support and engagement.',
     detailedDescription: [
      { title: 'The Vision', icon: 'fas fa-bullseye', content: 'The goal was to build more than just a chat app; it was to create a digital ecosystem that enhances collaborative learning. The project addressed the need for a centralized platform where students could connect, share resources, and support each other\'s academic journey outside the classroom.' },
      { title: 'Feature Breakdown', icon: 'fas fa-list-ul', content: 'The platform is built around three core features: 1) Real-time. 2) A shared document repository for uploading and accessing study materials.' },
      { title: 'Architecture & Tech', icon: 'fas fa-sitemap', content: 'The application was built using React for the frontend' },
      { title: 'Key Takeaway', icon: 'fas fa-lightbulb', content: 'The biggest challenge was designing a scalable data structure for the Realtime Database to efficiently manage users, chat rooms, and shared resources without performance degradation. This project provided invaluable experience in full-stack development and architecting real-time, collaborative applications.' }
    ],
    technologies: ['React', 'Firebase', 'Real-time Chat', 'UI/UX'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: `${import.meta.env.BASE_URL}images/AILearning.png`,
  },
  {
    name: 'Juta Medical & Dental Centre',
    date: '04/2024',
    description: 'Website & mobile app (Android) for a clinic. Features: booking forms, contact listing, responsive UI, basic auth, and user-role docs. Implemented with Android Studio & responsive front-end; used Git & Trello for project workflow.',
      detailedDescription: [
      { title: 'The Objective', icon: 'fas fa-bullseye', content: 'The clinic required a professional digital presence to better serve its patients. The project\'s scope was twofold: a public-facing, responsive website for information and appointment requests, and a secure native Android app for existing patients to access their records and communicate with the clinic.' },
      { title: 'Platform Features', icon: 'fas fa-desktop', content: 'The website, built with clean HTML/CSS and JavaScript, prioritizes accessibility and ease of use, ensuring patients can quickly find information or book an appointment. The Android app, developed in Java using Android Studio, provides a more personalized experience with user login, role-based document access (e.g., viewing lab results), and a secure messaging feature.' },
      { title: 'Development Process', icon: 'fas fa-tasks', content: 'This was a real-world project that demanded strong project management skills. The development lifecycle was managed using Agile principles, with Trello boards for sprint planning and task tracking. Git and GitHub were used for version control, ensuring code integrity and facilitating collaboration.' },
      { title: 'Valuable Experience', icon: 'fas fa-chart-line', content: 'This project was a crucial learning experience in translating client requirements into functional software. It involved direct communication with stakeholders, iterative feedback loops, and the challenge of developing for two distinct platforms (web and native mobile) simultaneously.' }
    ],
    technologies: ['Android Studio', 'HTML/CSS', 'Git', 'UI/UX'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: 'https://picsum.photos/seed/juta/800/600',
  },
  {
    name: 'Slatt Image Gen AI',
    date: '08/2025',
    description: 'Created an AI-powered image generation app using modern JS and APIs for creative automation.',
      detailedDescription: [
      { title: 'The Goal', icon: 'fas fa-bullseye', content: 'To create a simple, fast, and accessible interface for interacting with a powerful image generation model. The project aimed to demystify generative AI by providing a hands-on tool that allows anyone to turn their textual ideas into visual art.' },
      { title: 'User Experience', icon: 'fas fa-mouse-pointer', content: 'The UI is intentionally minimalist. It consists of a prominent prompt input field, a "Generate" button, and a display area. Loading states are clearly communicated to the user while the AI is processing the request, ensuring a smooth and transparent experience.' },
      { title: 'Technical Workflow', icon: 'fas fa-project-diagram', content: 'The application is a single-page app built with modern JavaScript (ES6+), HTML, and CSS. On form submission, it makes a direct, asynchronous call to the image generation endpoint of the Gemini API. The API returns the image data as a base64 encoded string, which is then rendered directly into an `<img>` tag on the page.' },
      { title: 'Core Lesson', icon: 'fas fa-lightbulb', content: 'This project emphasized the importance of clear error handling and user feedback in API-driven applications. Implementing robust checks for API errors and providing informative messages to the user if a prompt fails was a key part of making the tool reliable and user-friendly.' }
    ],
    technologies: ['HTML', 'JavaScript', 'APIs'],
    githubUrl: 'https://github.com/katlegoxoxo/image-gen-xo.git',
    imageUrl: `${import.meta.env.BASE_URL}images/slatt.png`,
    demoComponent: 'imageGeneration',
  },
  {
    name: 'AI Fundamentals Chatbot',
    date: '08/2025',
    description: 'Created an AI-powered chatbot using no-code tools, demonstrating an understanding of conversational AI principles and rapid prototyping.',
      detailedDescription: [
      { title: 'The Objective', icon: 'fas fa-bullseye', content: 'This project was undertaken to gain a foundational understanding of conversational AI design principles without the overhead of complex coding. The goal was to prototype a chatbot that could effectively answer common questions about AI, demonstrating an understanding of user intent and conversation flow.' },
      { title: 'Design Process', icon: 'fas fa-drafting-compass', content: 'The core of the work was in the design phase. This involved mapping out potential user questions (intents), identifying key terms (entities), and scripting a decision tree for the chatbot\'s responses. The focus was on creating a conversation that felt natural and genuinely helpful to a non-technical user.' },
      { title: 'Technology', icon: 'fas fa-tools', content: 'The chatbot was built using a leading no-code AI platform (like Dialogflow or a similar service). This allowed for a focus on the logical and UX aspects of chatbot development rather than the backend implementation, providing a clear view of the underlying concepts.' },
      { title: 'Strategic Learning', icon: 'fas fa-brain', content: 'Although a no-code project, it provided critical insights into the architecture of conversational AI. Understanding concepts like intents, entities, and context management is directly transferable to building more complex, code-based chatbots with frameworks like the Gemini API. It was a practical lesson in the importance of design-before-development.' }
    ],
    technologies: ['No-Code AI', 'Chatbot Design'],
    githubUrl: 'https://github.com/katlegoxoxo',
    imageUrl: 'https://picsum.photos/seed/chatbot/800/600',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [

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


export const EXPERIENCE: Experience[] = [
  {
    role: 'Digital Associate',
    company: 'Capaciti',
    dateRange: 'July 2025 - Present',
    description: [
      'Actively engaged in continuous learning, focusing on Python and the principles of Artificial Intelligence to contribute to modern, data-driven projects.',
      'Collaborating with teams to support digital initiatives and apply developing technical skills in a professional environment.'
    ]
  }
];



export const CERTIFICATION_CATEGORIES: CertificationCategory[] = [
{
    title: 'Artificial Intelligence & Cloud',
    certifications: [
      { name: 'Trustworthy AI: Managing Bias, Ethics, and Accountability', issuer: 'Johns Hopkins University', date: 'Sep 5, 2025', imageUrl: '/assets/certs/jhu-trustworthy-ai.png', verifyUrl: 'https://coursera.org/verify/KDZB53LMP43J' },
      { name: 'Building AI Powered Chatbots Without Programming', issuer: 'IBM', date: 'Sep 1, 2025', imageUrl: '/assets/certs/ibm-building-chatbots.png', verifyUrl: 'https://coursera.org/verify/993V6D3PJKCX' },
      { name: 'Generative AI with Large Language Models', issuer: 'AWS & DeepLearning.AI', date: 'Aug 22, 2025', imageUrl: '/assets/certs/aws-gen-ai-llm.png', verifyUrl: 'https://coursera.org/verify/2SRX3MZ2EAC2' },
      { name: 'Python for Data Science, AI & Development', issuer: 'IBM', date: 'Aug 21, 2025', imageUrl: '/assets/certs/ibm-python-for-ds.png', verifyUrl: 'https://coursera.org/verify/BLRPVE4Q019H' },
      { name: 'AI Foundations: Prompt Engineering with ChatGPT', issuer: 'Arizona State University', date: 'Aug 11, 2025', imageUrl: '/assets/certs/asu-prompt-engineering.png', verifyUrl: 'https://coursera.org/verify/B5QFU48UJRPD' },
      { name: 'Artificial Intelligence on Microsoft Azure', issuer: 'Microsoft', date: 'Aug 7, 2025', imageUrl: '/assets/certs/microsoft-ai-azure.png', verifyUrl: 'https://coursera.org/verify/6QBSFJ4RZD9P' },
      { name: 'Introduction to Artificial Intelligent', issuer: 'Capaciti', date: 'Aug 7, 2025', imageUrl: '/assets/certs/capaciti-intro-ai.png', verifyUrl: '#' },
      { name: 'Introduction to Responsible AI', issuer: 'Google Cloud', date: 'Aug 1, 2025', imageUrl: '/assets/certs/google-responsible-ai.png', verifyUrl: 'https://coursera.org/verify/A36BDVJ507MK' },
      { name: 'AI For Everyone', issuer: 'DeepLearning.AI', date: 'Jul 31, 2025', imageUrl: '/assets/certs/deeplearning-ai-for-everyone.png', verifyUrl: 'https://coursera.org/verify/2AOOUG9QY4YY' },
      { name: 'Introduction to Artificial Intelligence (AI)', issuer: 'IBM', date: 'Jul 31, 2025', imageUrl: '/assets/certs/ibm-intro-ai.png', verifyUrl: 'https://coursera.org/verify/W5GIHZV1991C' },
      { name: 'Introduction to Generative AI', issuer: 'Google Cloud', date: 'Jul 30, 2025', imageUrl: '/assets/certs/google-intro-gen-ai.png', verifyUrl: 'https://coursera.org/verify/VUY4MQ7JEG3Q' },
      { name: 'AI Essentials', issuer: 'Intel', date: 'Jul 30, 2025', imageUrl: '/assets/certs/intel-ai-essentials.png', verifyUrl: 'https://coursera.org/verify/4RNQ5TI5HC4Y' },
    ]
  },
   {
    title: 'Professional Development',
    certifications: [
      { name: 'Negotiation skills: Negotiate and resolve conflict', issuer: 'Macquarie University', date: 'Sep 9, 2025', imageUrl: '/assets/certs/macquarie-negotiation.png', verifyUrl: 'https://coursera.org/verify/T2RH269Z1XLC' },
      { name: 'Solving Problems with Creative and Critical Thinking', issuer: 'IBM', date: 'Sep 8, 2025', imageUrl: '/assets/certs/ibm-creative-thinking.png', verifyUrl: 'https://coursera.org/verify/GHMI4RDRASAT' },
      { name: 'Grit and Growth Mindset', issuer: 'Arizona State University', date: 'Sep 8, 2025', imageUrl: '/assets/certs/asu-grit-growth.png', verifyUrl: 'https://coursera.org/verify/QL702FQM4OZI' },
      { name: 'Positive Psychology: Resilience Skills', issuer: 'University of Pennsylvania', date: 'Sep 8, 2025', imageUrl: '/assets/certs/penn-positive-psychology.png', verifyUrl: 'https://coursera.org/verify/MUA9UNXE4BFA' },
      { name: 'Managing Conflicts with Cultural and Emotional Intelligence', issuer: 'University of Maryland', date: 'Sep 5, 2025', imageUrl: '/assets/certs/maryland-managing-conflicts.png', verifyUrl: 'https://coursera.org/verify/LZFJB5ZAMOUX' },
      { name: 'Psychology of the Self', issuer: 'American Psychological Association', date: 'Sep 4, 2025', imageUrl: '/assets/certs/apa-psychology-self.png', verifyUrl: 'https://coursera.org/verify/L9CYDH3CVRAQ' },
      { name: 'Financial Planning for Young Adults', issuer: 'University of Illinois', date: 'Aug 21, 2025', imageUrl: '/assets/certs/illinois-financial-planning.png', verifyUrl: 'https://coursera.org/verify/L2PXZPMIVMKG' },
      { name: 'Emotional Intelligence', issuer: 'Arizona State University', date: 'Aug 11, 2025', imageUrl: '/assets/certs/asu-emotional-intelligence.png', verifyUrl: 'https://coursera.org/verify/7724EA4BPJ85' },
      { name: 'Leading with Impact: Team Dynamics, Strategy and Ethics', issuer: 'Coursera Instructor Network', date: 'Aug 8, 2025', imageUrl: '/assets/certs/coursera-leading-with-impact.png', verifyUrl: 'https://coursera.org/verify/7WZCQGVYZE1M' },
      { name: 'Finding Your Professional Voice: Confidence & Impact', issuer: 'University of London', date: 'Aug 7, 2025', imageUrl: '/assets/certs/london-professional-voice.png', verifyUrl: 'https://coursera.org/verify/KM5BXYB81CCJ' },
      { name: 'Work Smarter, Not Harder: Time Management', issuer: 'University of California, Irvine', date: 'Aug 7, 2025', imageUrl: '/assets/certs/uci-time-management.png', verifyUrl: 'https://coursera.org/verify/ML6SABWDWJT0' },
      { name: 'Introduction to Personal Branding', issuer: 'University of Virginia', date: 'Aug 7, 2025', imageUrl: '/assets/certs/virginia-personal-branding.png', verifyUrl: 'https://coursera.org/verify/UU1UEDVUSV25' },
      { name: 'Developing Interpersonal Skills', issuer: 'IBM', date: 'Aug 6, 2025', imageUrl: '/assets/certs/ibm-interpersonal-skills.png', verifyUrl: 'https://coursera.org/verify/3QE549QL6V5M' },
      { name: 'Verbal Communications and Presentation Skills', issuer: 'Starweaver', date: 'Jul 30, 2025', imageUrl: '/assets/certs/starweaver-verbal-communication.png', verifyUrl: 'https://coursera.org/verify/H4IAVOOTJVNY' },
      { name: 'Write Professional Emails in English', issuer: 'Georgia Institute of Technology', date: 'Jul 30, 2025', imageUrl: '/assets/certs/georgia-tech-emails.png', verifyUrl: 'https://coursera.org/verify/BUIB78D2SQZ0' },
      { name: 'Active Listening: Enhancing Communication Skills', issuer: 'Coursera Instructor Network', date: 'Jul 30, 2025', imageUrl: '/assets/certs/coursera-active-listening.png', verifyUrl: 'https://coursera.org/verify/72QQM5IRJROV' },
    ]
  }
];
