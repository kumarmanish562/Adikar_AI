import React from 'react';
import { MessageSquare, ScanLine, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="pt-32 pb-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-primary uppercase bg-slate-100 rounded-full border border-slate-200"
                >
                    Government-grade Legal AI
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-tight"
                >
                    Know Your Rights. <br />
                    <span className="text-secondary italic">Instantly.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Ask legal questions in simple language. Powered by the latest Indian laws including BNS and BNSS.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="btn-primary w-full sm:w-auto justify-center">
                        <MessageSquare className="w-5 h-5" />
                        Ask a Legal Question
                    </button>
                    <button className="btn-secondary w-full sm:w-auto justify-center">
                        <ScanLine className="w-5 h-5" />
                        Scan a Document
                    </button>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        </section>
    );
};

export default Hero;
