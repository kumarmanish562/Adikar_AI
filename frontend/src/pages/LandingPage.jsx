import React from 'react';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import HowItWorks from '../components/LandingPage/HowItWorks';
import { CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
    return (
        <main>
            <Hero />

            {/* Features Section */}
            <Features />

            {/* How It Works Section */}
            <HowItWorks />

            {/* Law Badges Section (from image) */}
            <section className="py-16 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {['BNS 2023', 'BNSS 2023', 'Consumer Laws', 'Family Law'].map((law) => (
                            <div key={law} className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                {law}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-4">
                        Based on the Constitution of India, Bharatiya Nyaya Sanhita (BNS), BNSS, and Specialized Acts.
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose max-w-3xl mx-auto">
                        Disclaimer: Adikar AI provides information for educational purposes only. It is not a substitute for professional legal advice from a qualified advocate. Please consult with a registered legal practitioner for specific cases.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
