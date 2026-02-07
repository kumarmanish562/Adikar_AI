import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Users, Shield, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <section className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
                    >
                        About <span className="text-secondary italic">Adikar AI</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Adikar AI is a mission-driven legal technology platform dedicated to making legal information accessible, understandable, and actionable for every citizen of India.
                    </motion.p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Shield className="text-primary w-6 h-6" /> Our Mission
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We believe that justice begins with awareness. Our mission is to democratize legal knowledge by translating complex legal statutes into simple, everyday language, ensuring that no one is left behind due to a lack of legal literacy.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Gavel className="text-primary w-6 h-6" /> Our Tech
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Using state-of-the-art Retrieval-Augmented Generation (RAG) and Neural Search, Adikar AI cross-references thousands of documents, including the new Bharatiya Nyaya Sanhita (BNS) and BNSS, to provide accurate citations.
                        </p>
                    </motion.div>
                </div>

                <section className="text-center mb-20 bg-slate-50 py-16 rounded-3xl border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8">
                        <div className="p-6">
                            <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">Accuracy</h3>
                            <p className="text-slate-500 text-sm">Every answer is backed by verified legal documents and citations.</p>
                        </div>
                        <div className="p-6">
                            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">Accessibility</h3>
                            <p className="text-slate-500 text-sm">Designed for both urban and rural users, with multi-language support.</p>
                        </div>
                        <div className="p-6">
                            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">Privacy</h3>
                            <p className="text-slate-500 text-sm">Your legal queries are handled with the highest level of encryption and privacy.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
