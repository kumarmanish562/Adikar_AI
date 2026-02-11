import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, MessageSquare, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Help = () => {
    const { t } = useTranslation();

    const faqs = [
        {
            q: t('help.faq1Q'),
            a: t('help.faq1A')
        },
        {
            q: t('help.faq2Q'),
            a: t('help.faq2A')
        },
        {
            q: t('help.faq3Q'),
            a: t('help.faq3A')
        },
        {
            q: t('help.faq4Q'),
            a: t('help.faq4A')
        }
    ];

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-primary mb-6"
                    >
                        {t('help.title')}
                    </motion.h1>
                    <div className="max-w-xl mx-auto relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('help.searchPlaceholder')}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="glass-card text-center">
                        <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">{t('help.emailTitle')}</h3>
                        <p className="text-slate-500 text-sm mb-4">{t('help.emailDesc')}</p>
                        <a href="mailto:support@adikari.ai" className="text-primary font-bold hover:underline italic underline-offset-4">support@adikari.ai</a>
                    </div>
                    <div className="glass-card text-center">
                        <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">{t('help.chatTitle')}</h3>
                        <p className="text-slate-500 text-sm mb-4">{t('help.chatDesc')}</p>
                        <button className="text-primary font-bold hover:underline italic underline-offset-4">{t('help.chatButton')}</button>
                    </div>
                    <div className="glass-card text-center">
                        <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                        <h3 className="font-bold text-slate-900 mb-2">{t('help.phoneTitle')}</h3>
                        <p className="text-slate-500 text-sm mb-4">{t('help.phoneDesc')}</p>
                        <a href="tel:1800ADIKARAI" className="text-primary font-bold hover:underline italic underline-offset-4">1-800-ADIKAR-AI</a>
                    </div>
                </div>

                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
                        <HelpCircle className="text-primary w-8 h-8" /> {t('help.faqTitle')}
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
