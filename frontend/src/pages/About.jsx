import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Users, Shield, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <section className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
                    >
                        {t('about.title')} <span className="text-secondary italic">{t('auth.appName')}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t('about.intro')}
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
                            <Shield className="text-primary w-6 h-6" /> {t('about.missionTitle')}
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            {t('about.missionDesc')}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Gavel className="text-primary w-6 h-6" /> {t('about.techTitle')}
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            {t('about.techDesc')}
                        </p>
                    </motion.div>
                </div>

                <section className="text-center mb-20 bg-slate-50 py-16 rounded-3xl border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">{t('about.coreValues')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8">
                        <div className="p-6">
                            <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">{t('about.accuracy')}</h3>
                            <p className="text-slate-500 text-sm">{t('about.accuracyDesc')}</p>
                        </div>
                        <div className="p-6">
                            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">{t('about.accessibility')}</h3>
                            <p className="text-slate-500 text-sm">{t('about.accessibilityDesc')}</p>
                        </div>
                        <div className="p-6">
                            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">{t('about.privacy')}</h3>
                            <p className="text-slate-500 text-sm">{t('about.privacyDesc')}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
