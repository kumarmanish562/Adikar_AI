import React from 'react';
import { MessageSquare, ScanLine, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="pt-32 pb-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-primary uppercase bg-slate-100 rounded-full border border-slate-200"
                >
                    {t('landing.badge')}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-tight"
                >
                    {t('landing.title1')} <br />
                    <span className="text-secondary italic">{t('landing.title2')}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {t('landing.subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="btn-primary w-full sm:w-auto justify-center">
                        <MessageSquare className="w-5 h-5" />
                        {t('landing.askButton')}
                    </button>
                    <button className="btn-secondary w-full sm:w-auto justify-center">
                        <ScanLine className="w-5 h-5" />
                        {t('landing.scanButton')}
                    </button>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        </section>
    );
};

export default Hero;
