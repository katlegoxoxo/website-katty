import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GoogleGenAI, Chat } from '@google/genai';
import { PROJECTS, SKILL_CATEGORIES, EDUCATION } from '../constants';
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
                
                // Create a summary of portfolio content for the AI's context
                const skillsSummary = SKILL_CATEGORIES.map(cat => `${cat.title}: ${cat.skills.map(s => s.name).join(', ')}`).join('. ');
                const projectsSummary = PROJECTS.map(p => `${p.name} (${p.technologies.join(', ')})`).join('. ');
                const educationSummary = EDUCATION.map(e => `${e.degree} from ${e.institution}`).join('. ');

                const systemInstruction = `You are a friendly and professional AI assistant for Katlego Makete's personal portfolio website. Your goal is to answer questions about him and encourage recruiters or collaborators to get in touch.
                - Your knowledge base is limited to the following information about Katlego:
                - Skills: ${skillsSummary}.
                - Projects: ${projectsSummary}.
                - Education: ${educationSummary}.
                - Availability: When asked about his availability or start date, explain that Katlego is currently working at Capaciti but is always open to hearing about exciting new opportunities. Encourage the user to share details about the role and to contact Katlego directly to discuss specifics.
                - Keep your answers concise and helpful.
                - Do not use any markdown formatting (like **bold** or *italics*). Respond in plain text only.
                - If asked about something you don't know, politely state that you can only answer questions about Katlego's professional background.
                - If a user wants to send a message, ask for their name, email, and message, then format it nicely and tell them you've "forwarded it to Katlego".
                - Start the conversation with a friendly greeting.`;

                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
                setChat(newChat);

                // Start with an initial message from the model
                setChatHistory([{ role: 'model', text: "Hello! I'm Katlego's AI assistant. Feel free to ask me about his skills, projects, or how to get in touch." }]);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                setChatHistory([{ role: 'model', text: "Sorry, I'm having trouble connecting right now. Please use the links below to contact Katlego." }]);
            }
        };
        initializeChat();
    }, []);

    // Auto-scroll chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, isLoading]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            console.error("Chat API error:", error);
            const errorMessage: ChatMessage = { role: 'model', text: "I'm sorry, I encountered an error. Please try again or use the links below." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };
    
    return (
        <Section id={id} title={title}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6"
                >
                    {/* Chat Window */}
                    <div ref={chatContainerRef} className="h-80 overflow-y-auto pr-2 space-y-4 mb-4">
                        <AnimatePresence initial={false}>
                            {chatHistory.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'model' && <i className="fas fa-robot text-cyan-400 bg-zinc-700 p-2 rounded-full w-8 h-8 flex-shrink-0 text-center"></i>}
                                    <div className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-cyan-500 text-slate-900' : 'bg-zinc-700 text-slate-200'}`}>
                                        {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isLoading && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-end gap-2 justify-start"
                            >
                                <i className="fas fa-robot text-cyan-400 bg-zinc-700 p-2 rounded-full w-8 h-8 flex-shrink-0 text-center"></i>
                                <div className="bg-zinc-700 p-3 rounded-lg flex items-center gap-1.5">
                                    <motion.span className="w-2 h-2 bg-zinc-400 rounded-full" animate={{ y: [0, -4, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }}} />
                                    <motion.span className="w-2 h-2 bg-zinc-400 rounded-full" animate={{ y: [0, -4, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}} />
                                    <motion.span className="w-2 h-2 bg-zinc-400 rounded-full" animate={{ y: [0, -4, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}} />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask a question or type a message..."
                            aria-label="Chat message"
                            disabled={!chat}
                            className="w-full bg-white/5 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow disabled:bg-zinc-700/50"
                        />
                        <motion.button 
                            type="submit" 
                            disabled={isLoading || !chat} 
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold p-3 rounded-md transition-colors h-full aspect-square disabled:bg-slate-600 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9, rotate: -5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </motion.button>
                    </form>
                </motion.div>
                
                {/* Direct Contact Links */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-center"
                >
                    <p className="text-slate-400 mb-4">Or, reach out directly:</p>
                    <div 
                        className="flex justify-center items-center gap-6 text-slate-400 text-3xl"
                    >
                        <Magnetic>
                            <a href="mailto:katlegomakete18@gmail.com" className="hover:text-cyan-400 transition-colors block p-2" title="Email"><i className="fas fa-envelope"></i></a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/katlego-shaun-makete-72225a250/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors block p-2" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://github.com/katlegoxoxo" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors block p-2" title="GitHub"><i className="fab fa-github"></i></a>
                        </Magnetic>
                        <Magnetic>
                            <a href="tel:+27695126439" className="hover:text-cyan-400 transition-colors block p-2" title="Phone"><i className="fas fa-phone"></i></a>
                        </Magnetic>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default Contact;