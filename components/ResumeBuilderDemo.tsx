import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';

interface SummaryResult {
    summary: string;
}

const ResumeBuilderDemo: React.FC = () => {
    const [userSkills, setUserSkills] = useState('React, TypeScript, Gemini API, Node.js, REST APIs, Agile methodologies, UI/UX Design');
    const [jobDescription, setJobDescription] = useState('Seeking a skilled Frontend Developer with 3+ years of experience in React and TypeScript. Responsibilities include building responsive user interfaces, collaborating with backend teams, and integrating with RESTful APIs. Experience with state management libraries like Redux and modern CSS frameworks like Tailwind is a plus.');
    const [result, setResult] = useState<SummaryResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!userSkills || !jobDescription) {
            setError('Please fill in both your skills and the job description.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Act as a professional career coach. Write a compelling, 2-3 sentence professional summary for a resume. The summary should be tailored to the following job description and highlight the candidate's key skills provided. Job Description: "${jobDescription}". Candidate's Skills: "${userSkills}".`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            summary: {
                                type: Type.STRING,
                                description: 'A 2-3 sentence professional summary for a resume.'
                            }
                        },
                        required: ['summary']
                    },
                },
            });
            
            const jsonResult = JSON.parse(response.text);
            setResult(jsonResult);

        } catch (e) {
            console.error(e);
            setError('Failed to generate summary. The AI may be unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-400">Provide your skills and a job description to see the AI generate a tailored professional summary for your resume.</p>
            <div className="space-y-4">
                <div>
                    <label htmlFor="userSkills" className="block text-xs font-medium text-slate-300 mb-1">Your Skills</label>
                    <textarea
                        id="userSkills"
                        rows={3}
                        value={userSkills}
                        onChange={(e) => setUserSkills(e.target.value)}
                        className="w-full bg-slate-900/70 p-2 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"
                        placeholder="e.g., React, TypeScript, Node.js"
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
                    <><i className="fas fa-magic"></i> Generate Summary</>
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
                    <h4 className="font-semibold text-slate-200 mb-2">Generated Professional Summary:</h4>
                    <motion.p
                        className="text-slate-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {result.summary}
                    </motion.p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeBuilderDemo;