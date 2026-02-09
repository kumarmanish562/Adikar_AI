import React from 'react';
import { MessageSquare, Camera, Mic, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Features = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <MessageSquare className="w-8 h-8 text-primary" />,
            title: t('landing.feature1Title'),
            description: t('landing.feature1Desc')
        },
        {
            icon: <Camera className="w-8 h-8 text-primary" />,
            title: t('landing.feature2Title'),
            description: t('landing.feature2Desc')
        },
        {
            icon: <Mic className="w-8 h-8 text-primary" />,
            title: t('landing.feature3Title'),
            description: t('landing.feature3Desc')
        },
        {
            icon: <Gavel className="w-8 h-8 text-primary" />,
            title: t('landing.feature4Title'),
            description: t('landing.feature4Desc')
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('landing.featuresTitle')}</h2>
                <p className="text-slate-600 mb-16 max-w-2xl mx-auto">
                    {t('landing.featuresSubtitle')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 bg-slate-50 rounded-2xl text-left border border-slate-100 hover:shadow-md transition-shadow group"
                        >
                            <div className="mb-6 p-3 inline-block bg-white rounded-xl shadow-sm group-hover:bg-primary/5 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
