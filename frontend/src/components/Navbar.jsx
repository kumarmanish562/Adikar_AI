import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ur', name: 'اردو' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'mai', name: 'मैथिली' },
    { code: 'sat', name: 'संताली' },
    { code: 'ks', name: 'کأشُر' },
    { code: 'ne', name: 'नेपाली' },
    { code: 'sd', name: 'سنڌي' },
    { code: 'kok', name: 'कोंकणी' },
    { code: 'doi', name: 'डोगरी' },
    { code: 'mni', name: 'মণিপুরী' },
    { code: 'brx', name: 'बड़ो' },
    { code: 'sa', name: 'संस्कृतम्' },
    { code: 'cg', name: 'छत्तीसगढ़ी' }
];

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsLangOpen(false);
    };

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="bg-primary p-1.5 rounded-md">
                            <Globe className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary uppercase">{t('auth.appName')}</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('nav.home')}</Link>
                        <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('nav.about')}</Link>
                        <Link to="/resources" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('nav.resources')}</Link>
                        <Link to="/help" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">{t('nav.help')}</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 text-sm font-medium border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                {currentLanguage.name}
                                <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-48 max-h-64 overflow-y-auto bg-white border border-slate-100 rounded-lg shadow-xl z-50">
                                    <div className="py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => changeLanguage(lang.code)}
                                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                            >
                                                <span>{lang.name}</span>
                                                {i18n.language === lang.code && <Check className="w-3.5 h-3.5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to="/login" className="bg-primary text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-primary/90 transition-all flex items-center gap-2">
                            {t('nav.login')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
