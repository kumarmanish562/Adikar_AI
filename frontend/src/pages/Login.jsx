import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Phone, Scale, EyeOff, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="auth-shell min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
            <Navbar />

            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute top-24 -right-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />

            <div className="relative z-10 flex flex-1 flex-col pt-20">
                <div className="flex flex-1 items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-slate-200/60 backdrop-blur">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                                <Scale className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-lg font-extrabold tracking-wide text-primary">{t('auth.appName')}</h1>
                            <p className="mt-1 text-xs text-slate-400">{t('auth.tagline')}</p>
                        </div>

                        <form className="mt-8 space-y-5">
                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.mobileNumber')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        placeholder={t('auth.mobilePlaceholder')}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="relative flex items-center justify-center">
                                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-100" />
                                <span className="relative bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{t('auth.or')}</span>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.emailAddress')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder={t('auth.emailPlaceholder')}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                                    <label>{t('auth.password')}</label>
                                    <button type="button" className="text-primary hover:text-primary/80 transition-colors">{t('auth.forgotPassword')}</button>
                                </div>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Lock className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                    <EyeOff className="h-4 w-4 text-slate-300" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-primary/90"
                            >
                                {t('auth.login')}
                            </button>

                            <button
                                type="button"
                                className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary/30 hover:text-primary"
                            >
                                {t('auth.loginWithOtp')}
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>{t('auth.secureNote')}</span>
                        </div>
                        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300">
                            {t('auth.encryptionActive')}
                        </p>
                    </div>
                </div>

                <div className="pb-8 text-center text-xs text-slate-500">
                    {t('auth.noAccount')}
                    <Link to="/signup" className="ml-2 font-semibold text-primary hover:text-primary/80 transition-colors">
                        {t('auth.createAccount')}
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;

