import React from 'react';
import Hero from '../components/LandingPage/Hero';
import Features from '../components/LandingPage/Features';
import HowItWorks from '../components/LandingPage/HowItWorks';
import { CheckCircle2, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const LandingPage = () => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    return (
        <main className={theme === 'white' ? 'white-theme' : ''}>
            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="fixed bottom-6 right-6 z-50 p-4 bg-white border-2 border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                title={theme === 'color' ? 'Switch to White Theme' : 'Switch to Color Theme'}
            >
                <Palette className={`w-6 h-6 ${theme === 'color' ? 'text-primary' : 'text-slate-700'}`} />
            </button>

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
