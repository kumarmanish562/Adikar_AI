import React from 'react';
import { MessageSquare, Camera, Mic, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <MessageSquare className="w-8 h-8 text-primary" />,
        title: "Legal Chat Assistant",
        description: "Simple Q&A interface for all your legal needs. No jargon, just clear answers."
    },
    {
        icon: <Camera className="w-8 h-8 text-primary" />,
        title: "Snap & Simplify",
        description: "Upload a photo of any legal document to get an instant summary in your language."
    },
    {
        icon: <Mic className="w-8 h-8 text-primary" />,
        title: "Voice Support",
        description: "Speak to the AI in your native dialect. Perfect for hands-free or low-literacy usage."
    },
    {
        icon: <Gavel className="w-8 h-8 text-primary" />,
        title: "Trusted Sources",
        description: "Citations directly from the Constitution, BNS, BNSS, and Consumer Protection laws."
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Empowering Every Citizen</h2>
                <p className="text-slate-600 mb-16 max-w-2xl mx-auto">
                    Designed for high accessibility and low digital literacy across India's diverse population.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-slate-50 rounded-2xl text-left border border-slate-100 hover:shadow-md transition-shadow group"
                        >
                            <div className="mb-6 p-3 inline-block bg-white rounded-xl shadow-sm group-hover:bg-primary/5 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
