import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';

interface SentimentResult {
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    score: number;
    keywords: string[];
}

const SentimentAnalysisDemo: React.FC = () => {
    const [text, setText] = useState('This is an absolutely amazing and wonderful component!');
    const [result, setResult] = useState<SentimentResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!text) {
            setError('Please enter some text to analyze.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analyze the sentiment of the following text and nothing else. Text: "${text}"`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            sentiment: { 
                                type: Type.STRING,
                                description: 'The overall sentiment, either "Positive", "Negative", or "Neutral".'
                            },
                            score: { 
                                type: Type.NUMBER,
                                description: 'A score from -1 (very negative) to 1 (very positive).'
                            },
                            keywords: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: 'An array of words from the text that most influence the sentiment.'
                            }
                        },
                        required: ['sentiment', 'score', 'keywords']
                    },
                },
            });
            
            const jsonResult = JSON.parse(response.text);
            setResult(jsonResult);

        } catch (e) {
            console.error(e);
            setError('Failed to analyze sentiment. The AI may be unavailable.');
        } finally {
            setIsLoading(false);
        }
    };

    const sentimentStyles = {
        Positive: {
            icon: 'fa-smile',
            color: 'text-green-400',
            bg: 'bg-green-400/10',
            progressBg: 'bg-green-400'
        },
        Negative: {
            icon: 'fa-frown',
            color: 'text-red-400',
            bg: 'bg-red-400/10',
            progressBg: 'bg-red-400'
        },
        Neutral: {
            icon: 'fa-meh',
            color: 'text-slate-400',
            bg: 'bg-slate-400/10',
            progressBg: 'bg-slate-400'
        }
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-400">Enter some text below to see the AI analyze its emotional tone in real-time.</p>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-slate-900/70 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"
              placeholder="e.g., I love this portfolio!"
            />
            <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-4 rounded-md transition-colors w-full flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Analyzing...</>
                ) : (
                    <><i className="fas fa-magic"></i> Analyze Sentiment</>
                )}
            </button>
            {error && <p className="text-sm text-center text-red-400">{error}</p>}
            
            <AnimatePresence>
            {result && (
                <motion.div
                    className={`p-4 rounded-lg ${sentimentStyles[result.sentiment]?.bg || sentimentStyles.Neutral.bg}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex items-center gap-4 mb-3">
                        <i className={`fas ${sentimentStyles[result.sentiment]?.icon || sentimentStyles.Neutral.icon} text-2xl ${sentimentStyles[result.sentiment]?.color || sentimentStyles.Neutral.color}`}></i>
                        <div>
                            <p className={`font-bold text-lg ${sentimentStyles[result.sentiment]?.color || sentimentStyles.Neutral.color}`}>{result.sentiment}</p>
                            <p className="text-sm text-slate-300">Score: {result.score.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-600/50 rounded-full h-2.5 mb-3">
                        <div 
                            className={`${sentimentStyles[result.sentiment]?.progressBg || sentimentStyles.Neutral.progressBg} h-2.5 rounded-full`} 
                            style={{ width: `${(Math.abs(result.score) * 100)}%` }}>
                        </div>
                    </div>
                    {result.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                             <p className="text-sm text-slate-300 w-full mb-1">Keywords:</p>
                            {result.keywords.map(kw => (
                                <span key={kw} className="bg-white/10 text-slate-300 text-xs font-mono px-2 py-1 rounded">
                                    {kw}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

export default SentimentAnalysisDemo;
