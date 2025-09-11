# Katlego Makete - Interactive Developer Portfolio

This is the source code for my personal portfolio website, designed to showcase my skills, projects, and journey as a software engineer. It's a modern, fully responsive, single-page application built with React, TypeScript, and Tailwind CSS, featuring interactive elements and integrated AI-powered demos using the Google Gemini API.

## ✨ Key Features

- **Interactive UI/UX**: Smooth animations and micro-interactions powered by Framer Motion, including magnetic buttons and seamless modal transitions.
- **Dynamic Particle Background**: A lightweight, animated starfield background that reacts to scrolling for a parallax effect.
- **AI-Powered Chatbot**: An integrated chatbot, powered by the Gemini API, that can answer questions about my skills, projects, and experience based on the portfolio's content.
- **Live AI Demos**: Interactive components within project modals that allow visitors to test live AI functionality, such as:
    - **Resume Builder**: Generates professional resume bullet points.
    - **Sentiment Analysis**: Analyzes the emotional tone of text.
    - **Image Generation**: Creates images from text prompts.
- **Categorized & Collapsible Sections**: Projects and certifications are neatly organized and feature "Show More/Less" functionality to keep the UI clean and user-friendly.
- **Fully Responsive Design**: A mobile-first approach ensures a seamless experience across all devices, from desktops to smartphones.
- **Component-Based Architecture**: Built with reusable React components for maintainability and scalability.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Icons**: Font Awesome

## 📂 Project Structure

The project follows a standard React application structure, with all main components organized within the `src/components` directory.

```
/
├── public/
│   └── files/         # Static assets like CV, images, certificates
├── src/
│   ├── components/     # Reusable React components
│   ├── constants.ts    # Centralized data (projects, skills, etc.)
│   ├── types.ts        # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Entry point for React
├── index.html          # Main HTML file
└── README.md           # This file
```

## ⚙️ Getting Started

To run this project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/katlegoxoxo/website-katty.git
    cd website-katt
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    The AI-powered features (chatbot, demos) require a Google Gemini API key.

    -   Create a file named `.env` in the root of the project.
    -   Add your API key to this file as shown below:

    ```.env
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    *Note: The application is configured to use `process.env.API_KEY` to access this value. Ensure it is set correctly for the AI features to function.*

4.  **Run the development server:**
    ```bash
    npm start
    ```
    This will start the application, and you can view it in your browser at `http://localhost:3000` (or another port if 3000 is in use).

## 📫 Contact

- **LinkedIn**: [Katlego Shaun Makete](https://www.linkedin.com/in/katlego-shaun-makete-72225a250/)
- **Email**: [katlegomakete18@gmail.com](mailto:katlegomakete18@gmail.com)
