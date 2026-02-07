import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, MessageSquare, Search } from 'lucide-react';

const faqs = [
    {
        q: "Is Adikar AI a replacement for a lawyer?",
        a: "No. Adikar AI provides educational information and helps you understand legal statutes. It is not a substitute for professional legal advice from a registered advocate."
    },
    {
        q: "Does Adikar AI support regional languages?",
        a: "Currently, we support English and Hindi for both queries and document analysis. Support for more regional languages is coming soon."
    },
    {
        q: "How accurate is the legal information provided?",
        a: "Adikar AI uses a Retrieval-Augmented Generation (RAG) system that cross-references actual legal documents like the BNS, BNSS, and the Constitution. Every answer includes citations to the source document for verification."
    },
    {
        q: "How do I scan a physical legal document?",
        a: "You can use the 'Scan a Document' button on the homepage to upload a photo of your document. Our AI will extract the text and provide a simplified summary."
    }
];

const Help = () => {
    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
                    >
                        How can we <span className="text-secondary italic">Help?</span>
                    </motion.h1>
                    <div className="max-w-xl mx-auto relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help articles, FAQs..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="glass-card text-center">
                        <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Email Support</h3>
                        <p className="text-slate-500 text-sm mb-4">Response within 24 hours</p>
                        <a href="mailto:support@adikari.ai" className="text-primary font-bold hover:underline italic underline-offset-4">support@adikari.ai</a>
                    </div>
                    <div className="glass-card text-center">
                        <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Live Chat</h3>
                        <p className="text-slate-500 text-sm mb-4">Available 10 AM - 6 PM IST</p>
                        <button className="text-primary font-bold hover:underline italic underline-offset-4">Start Chatting</button>
                    </div>
                    <div className="glass-card text-center">
                        <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">Phone</h3>
                        <p className="text-slate-500 text-sm mb-4">Emergency legal assistance</p>
                        <a href="tel:1800ADIKARAI" className="text-primary font-bold hover:underline italic underline-offset-4">1-800-ADIKAR-AI</a>
                    </div>
                </div>

                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
                        <HelpCircle className="text-primary w-8 h-8" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-6 bg-slate-50 rounded-2xl border border-slate-100"
                            >
                                <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Help;
