import React, { useState } from 'react';
import Section from './Section';
import { motion, Variants } from 'framer-motion';

interface ContactProps {
  id: string;
  title: string;
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom * 0.2 }
    })
  };

const Contact: React.FC<ContactProps> = ({ id, title }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Sending...');
        // Here you would integrate with an email service like EmailJS
        console.log('Form data submitted:', formData);
        
        // Simulate API call
        setTimeout(() => {
            setStatus('Message sent successfully! Thank you.');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 5000);
        }, 1000);
    };

    return (
        <Section id={id} title={title}>
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3"
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="font-bold text-lg text-slate-200">Contact Info</h3>
                    <p className="text-slate-400">Email: <a href="mailto:katlegomakete18@gmail.com" className="text-cyan-400 hover:underline">katlegomakete18@gmail.com</a></p>
                    <p className="text-slate-400">Phone: <a href="tel:+27695126439" className="text-cyan-400 hover:underline">+27 69 512 6439</a></p>
                    <p className="text-slate-400">GitHub: <a href="https://github.com/katlegoxoxo" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/katlegoxoxo</a></p>
                    <p className="text-slate-400">LinkedIn: <a href="https://www.linkedin.com/in/katlego-shaun-makete-72225a250/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">katlego-shaun-makete</a></p>
                </motion.div>
                <motion.form 
                    onSubmit={handleSubmit} 
                    className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-4"
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    variants={itemVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="font-bold text-lg text-slate-200">Send a message</h3>
                    <div>
                        <input type="text" name="name" placeholder="Your name" required value={formData.name} onChange={handleChange} className="w-full bg-white/5 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"/>
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Your email" required value={formData.email} onChange={handleChange} className="w-full bg-white/5 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"/>
                    </div>
                    <div>
                        <textarea name="message" rows={5} placeholder="Your message" required value={formData.message} onChange={handleChange} className="w-full bg-white/5 p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-5 rounded-md transition-colors w-full flex items-center justify-center gap-2">
                            Send Message <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    {status && <p className="text-sm text-center text-slate-400 mt-2">{status}</p>}
                </motion.form>
            </div>
        </Section>
    );
};

export default Contact;