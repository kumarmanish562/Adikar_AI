import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, FileText, ExternalLink } from 'lucide-react';

const resources = [
    {
        title: "The Constitution of India",
        type: "Document",
        size: "1.2 MB",
        link: "#",
        icon: <FileText className="w-6 h-6 text-primary" />
    },
    {
        title: "Bharatiya Nyaya Sanhita (BNS) 2023",
        type: "Full Act",
        size: "4.5 MB",
        link: "#",
        icon: <Gavel className="w-6 h-6 text-primary" />
    },
    {
        title: "Consumer Protection Act 2019",
        type: "Guide",
        size: "800 KB",
        link: "#",
        icon: <BookOpen className="w-6 h-6 text-primary" />
    },
    {
        title: "Family Law Handbook",
        type: "Brochure",
        size: "2.1 MB",
        link: "#",
        icon: <Users className="w-6 h-6 text-primary" />
    }
];

import { Gavel, Users } from 'lucide-react';

const Resources = () => {
    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
                    >
                        Legal <span className="text-secondary italic">Resources</span>
                    </motion.h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Access official legal documents, simplified guides, and downloadable resources to help you understand your rights.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {resources.map((res, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card flex flex-col justify-between"
                        >
                            <div>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        {res.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.type}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{res.title}</h3>
                                <p className="text-slate-500 text-sm mb-6">Size: {res.size}</p>
                            </div>
                            <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-bold text-slate-700">
                                <Download className="w-4 h-4" /> Download PDF
                            </button>
                        </motion.div>
                    ))}
                </div>

                <section className="bg-primary text-white p-12 rounded-3xl text-center">
                    <h2 className="text-3xl font-bold mb-4">Official Portals</h2>
                    <p className="text-blue-100 mb-10 max-w-2xl mx-auto">Visit these official government websites for comprehensive legal information.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://indiankanoon.org" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-bold border border-white/10 backdrop-blur-md">
                            Indian Kanoon <ExternalLink className="w-4 h-4" />
                        </a>
                        <a href="https://legislative.gov.in" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-bold border border-white/10 backdrop-blur-md">
                            Legislative Department <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Resources;
