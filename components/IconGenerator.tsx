import React, { useState } from 'react';
import Section from './Section';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'framer-motion';

interface IconGeneratorProps {
  id: string;
  title: string;
}

const IconGenerator: React.FC<IconGeneratorProps> = ({ id, title }) => {
  const [prompt, setPrompt] = useState('A minimalist, futuristic monogram logo with the letters KM, cyan and dark blue, digital circuit style');
  const [generatedIcon, setGeneratedIcon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleGenerateIcon = async () => {
    // FIX: Removed unnecessary API_KEY check to align with guidelines, assuming it's always available.
    if (!prompt) {
        setError('Please enter a prompt.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedIcon(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // FIX: Updated to use the recommended 'imagen-4.0-generate-001' model.
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
      });
      
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
      setGeneratedIcon(imageUrl);

    } catch (e) {
      console.error(e);
      setError('Failed to generate icon. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetFavicon = () => {
    if (!generatedIcon) return;
    
    // Remove any existing favicon links
    document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
    
    // Create new link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = generatedIcon;
    
    // Append to head
    document.head.appendChild(link);
    
    setStatusMessage('Favicon updated successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <Section id={id} title={title}>
      <motion.div 
        className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">Icon Description Prompt</label>
            <textarea
              id="prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-white/5 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"
              placeholder="e.g., A glowing brain made of circuits"
            />
          </div>
          <button
            onClick={handleGenerateIcon}
            disabled={isLoading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors w-full flex items-center justify-center gap-2 disabled:bg-slate-500 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <i className="fas fa-magic"></i>
                <span>Generate Icon</span>
              </>
            )}
          </button>
          {error && <p className="text-sm text-center text-red-400 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col items-center justify-center h-full bg-white/5 p-4 rounded-md min-h-[200px]">
          {generatedIcon ? (
            <div className="text-center">
              <img src={generatedIcon} alt="Generated Icon" className="w-40 h-40 rounded-lg mx-auto mb-4 border-2 border-cyan-400/50" />
              <button
                onClick={handleSetFavicon}
                className="bg-white/10 hover:bg-white/20 text-slate-200 font-bold py-2 px-5 rounded-md transition-colors flex items-center gap-2"
              >
                <i className="fas fa-check"></i>
                Set as Favicon
              </button>
              {statusMessage && <p className="text-sm text-cyan-400 mt-3">{statusMessage}</p>}
            </div>
          ) : (
             <div className="text-slate-500 text-center">
                <i className="fas fa-image text-4xl mb-2"></i>
                <p>Your generated icon will appear here.</p>
             </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
};

export default IconGenerator;