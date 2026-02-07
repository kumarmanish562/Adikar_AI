import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "1",
        title: "ASK OR SCAN",
        text: "Type your query, record your voice, or upload a photo of a document."
    },
    {
        number: "2",
        title: "AI ANALYZES",
        text: "Our neural engine cross-references thousands of Indian legal statutes instantly."
    },
    {
        number: "3",
        title: "GET GUIDANCE",
        text: "Receive simple, actionable advice with links to official sources."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">How It Works</h2>
                <div className="w-16 h-1 bg-secondary mx-auto mb-16"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (hidden on mobile) */}
                    <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-slate-200 -z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10">
                            <div className="w-20 h-20 bg-primary text-white text-2xl font-bold flex items-center justify-center rounded-full mx-auto mb-6 shadow-lg border-4 border-white">
                                {step.number}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 text-sm max-w-[250px] mx-auto leading-relaxed">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
