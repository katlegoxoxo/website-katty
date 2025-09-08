import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeResult {
    bulletPoints: string[];
}

const ResumeBuilderDemo: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('Frontend Developer');
    const [jobDescription, setJobDescription] = useState('Seeking a skilled Frontend Developer with 3+ years of experience in React and TypeScript. Responsibilities include building responsive user interfaces, collaborating with backend teams, and integrating with RESTful APIs. Experience with state management libraries like Redux and modern CSS frameworks like Tailwind is a plus.');
    const [result, setResult] = useState<ResumeResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!jobTitle || !jobDescription) {
            setError('Please fill in both job title and the job description.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Act as a professional resume writer. Create exactly 3 impactful, concise, and quantifiable resume bullet points for a candidate applying for the job title "${jobTitle}". The bullet points should highlight skills and experiences that align with the following job description: "${jobDescription}". Focus on action verbs and tangible outcomes.`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            bulletPoints: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: 'An array of 3 professional resume bullet points.'
                            }
                        },
                        required: ['bulletPoints']
                    },
                },
            });
            
            const jsonResult = JSON.parse(response.text);
            setResult(jsonResult);

        } catch (e) {
            console.error(e);
            setError('Failed to generate bullet points. The AI may be unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-400">Provide a job title and description to see the AI generate professional resume bullet points.</p>
            <div className="space-y-4">
                <div>
                    <label htmlFor="jobTitle" className="block text-xs font-medium text-slate-300 mb-1">Job Title</label>
                    <input
                        id="jobTitle"
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full bg-slate-900/70 p-2 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"
                        placeholder="e.g., Software Engineer"
                    />
                </div>
                <div>
                    <label htmlFor="jobDescription" className="block text-xs font-medium text-slate-300 mb-1">Job Description</label>
                    <textarea
                        id="jobDescription"
                        rows={5}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full bg-slate-900/70 p-2 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"
                        placeholder="Paste a job description here..."
                    />
                </div>
            </div>
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-4 rounded-md transition-colors w-full flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Generating...</>
                ) : (
                    <><i className="fas fa-magic"></i> Generate Bullet Points</>
                )}
            </button>
            {error && <p className="text-sm text-center text-red-400">{error}</p>}
            
            <AnimatePresence>
            {result && (
                <motion.div
                    className="p-4 rounded-lg bg-slate-900/70 border border-white/10 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <h4 className="font-semibold text-slate-200 mb-3">Generated Bullet Points:</h4>
                    <ul className="space-y-2 list-disc list-inside text-slate-300">
                        {result.bulletPoints.map((point, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {point}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeBuilderDemo;