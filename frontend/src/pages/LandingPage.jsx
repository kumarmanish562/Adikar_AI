import React from 'react';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import HowItWorks from '../components/LandingPage/HowItWorks';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
    const { t } = useTranslation();

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
                        {['bns', 'bnss', 'consumer', 'family'].map((lawKey) => (
                            <div key={lawKey} className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                {t(`landing.laws.${lawKey}`)}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-4">
                        {t('landing.legalBasis')}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose max-w-3xl mx-auto">
                        {t('landing.disclaimer')}
                    </p>
                </div>
            </section>
        </main>
    );
};

export default LandingPage;
