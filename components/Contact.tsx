import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GoogleGenAI, Chat } from '@google/genai';
import { PROJECTS, SKILL_CATEGORIES, EDUCATION, EXPERIENCE } from '../constants';
import Magnetic from './Magnetic';

interface ContactProps {
  id: string;
  title: string;
}

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

const Contact: React.FC<ContactProps> = ({ id, title }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initialize Chat
    useEffect(() => {
        const initializeChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const skillsSummary = SKILL_CATEGORIES.map(cat => `${cat.title}: ${cat.skills.map(s => `${s.name}`).join(', ')}`).join('; ');
                const projectsSummary = PROJECTS.map(p => `${p.name}: ${p.description} (Technologies: ${p.technologies.join(', ')})`).join('; ');
                const experienceSummary = EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.dateRange}): ${e.description.join(' ')}`).join('; ');

                const academicRecordSummary = `
Katlego graduated with a "Diploma in Information Technology in Software Development" WITH DISTINCTION.
This is a complete list of his modules and final marks:

2022 Results (First Year):
- Business Information Systems: 85% (Distinction)
- Introduction to Quantitative Thinking and Techniques: 96% (Distinction)
- IT Professional Practice: 80% (Distinction)
- Operating Systems 1A: 81% (Distinction)
- Programming Logic and Design: 70% (Pass)
- Programming 1A: 67% (Pass)
- Programming 1B: 78% (Distinction)
- Web Development (Introduction): 94% (Distinction)

2023 Results (Second Year):
- Database (Introduction): 71% (Pass)
- Database (Intermediate): 78% (Distinction)
- Human Computer Interaction: 89% (Distinction)
- IT Project Management: 72% (Pass)
- Programming 2B: 90% (Distinction)
- Programming 2A: 85% (Distinction)
- System Analysis and Design: 83% (Distinction)
- Web Development (Intermediate): 78% (Distinction)

2024 Results (Final Year):
- Advanced Databases: 89% (Distinction)
- Applied Programming: 84% (Distinction)
- Information Security: 65% (Pass)
- Open Source Coding (Introduction): 87% (Distinction)
- Open Source Coding (Intermediate): 88% (Distinction)
- Software Quality and Testing: 87% (Distinction)
- Work Integrated Learning 3A: 76% (Distinction)
- Work Integrated Learning 3B: 85% (Distinction)
`;

                const systemInstruction = `You are an enthusiastic, positive, and professional AI assistant for Katlego Makete's portfolio. Your goal is to showcase his skills and encourage recruiters to connect. Be helpful, concise, and friendly, always framing Katlego in a positive light.
                - Your knowledge base is limited to the following information about Katlego:
                - Full Academic Record: ${academicRecordSummary}. This is your primary source for any questions about his studies, modules, or specific marks.
                - Skills: ${skillsSummary}.
                - Projects: ${projectsSummary}.
                - Experience: ${experienceSummary}.
                - Answering about SQL: If asked about his SQL or database skills, refer to his academic record. Highlight his excellent marks: "Database (Intermediate)" at 78% and "Advanced Databases" at 89%, both distinctions. This proves a deep, academically-validated understanding of the subject.
                - Handling Personal Questions: If asked a personal question (e.g., about smoking, relationships, etc.), you must politely decline. Respond with something like: "I can't answer personal questions, but I can tell you that Katlego is known for being a dedicated and focused professional who is passionate about technology and continuous learning." Then, try to guide the conversation back to professional topics.
                - Availability: When asked about his availability, state that Katlego is currently happily employed at Capaciti but is always open to discussing exciting new opportunities that align with his skills. Encourage them to contact him directly to share details about the role.
                - Tone and Formatting: Keep your answers concise and helpful. Do not use any markdown formatting (like **bold** or *italics*). Respond in plain text only.
                - Unknown Topics: If asked about something outside your knowledge base, politely state that you can only answer questions about Katlego's professional background.
                - Guiding Conversation: After answering a question, suggest one or two related follow-up questions to guide the conversation, like 'Would you like to know more about his final year project?' or 'I can also tell you about his programming marks. Interested?'.`;

                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: systemInstruction,
                    },
                });

                setChat(newChat);
                setChatHistory([{ role: 'model', text: "Hello! I'm an AI assistant for Katlego's portfolio. Feel free to ask me anything about his skills, projects, or experience." }]);
            } catch (error) {
                console.error("Failed to initialize AI Chat:", error);
                setChatHistory([{ role: 'model', text: "Sorry, the AI assistant is currently unavailable. Please try again later." }]);
            }
        };

        initializeChat();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!userInput.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: userInput };
        setChatHistory(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput });
            
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setChatHistory(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("AI Chat Error:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I encountered an error. Please try asking in a different way." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const messageVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <Section id={id} title={title}>
            <motion.div
                className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-100">Chat with my AI Assistant</h3>
                    <p className="text-slate-400 text-sm mt-1">Ask about my skills, projects, or experience. The AI has been trained on my portfolio data.</p>
                </div>
                
                <div 
                    ref={chatContainerRef}
                    className="flex-grow h-80 bg-black/30 rounded-lg p-4 mb-4 overflow-y-auto border border-white/10"
                    aria-live="polite"
                >
                    <AnimatePresence>
                        {chatHistory.map((msg, index) => (
                            <motion.div
                                key={index}
                                layout
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-cyan-500 text-slate-900 rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                     {isLoading && (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                            aria-label="AI is typing"
                        >
                            <div className="bg-slate-700 text-slate-200 p-3 rounded-xl rounded-bl-none flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="e.g., 'Tell me about his SQL skills'"
                        className="flex-grow w-full bg-white/5 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"
                        disabled={!chat}
                        aria-label="Chat input"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!chat || isLoading || !userInput.trim()}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold p-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed w-14"
                        aria-label="Send message"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
                 <div className="text-center mt-12 pt-8 border-t border-white/10">
                    <p className="text-slate-400 mb-4">Or, reach out directly:</p>
                    <div className="flex justify-center items-center gap-6 text-slate-400 text-2xl">
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/katlego-shaun-makete-72225a250/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors block p-2" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        </Magnetic>
                         <Magnetic>
                            <a href="https://github.com/katlegoxoxo" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors block p-2" title="GitHub"><i className="fab fa-github"></i></a>
                        </Magnetic>
                        <Magnetic>
                            <a href="mailto:katlegomakete18@gmail.com" className="hover:text-cyan-400 transition-colors block p-2" title="Email"><i className="fas fa-envelope"></i></a>
                        </Magnetic>
                        <Magnetic>
                            <a href="tel:+27695126439" className="hover:text-cyan-400 transition-colors block p-2" title="Phone"><i className="fas fa-phone"></i></a>
                        </Magnetic>
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};

export default Contact;