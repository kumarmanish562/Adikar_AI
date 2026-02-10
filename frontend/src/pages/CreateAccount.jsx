import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Phone, Scale, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateAccount = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const activeLanguage = i18n.language;
    const [form, setForm] = useState({
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: Array(6).fill(''),
        voice: false,
        terms: false,
        preferredLanguage: activeLanguage
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setForm((prev) => ({ ...prev, preferredLanguage: i18n.language }));
    }, [i18n.language]);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleCodeChange = (index, value) => {
        const numericValue = value.replace(/\D/g, '').slice(-1);
        setForm((prev) => {
            const nextCode = [...prev.code];
            nextCode[index] = numericValue;
            return { ...prev, code: nextCode };
        });
    };

    const handleToggle = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.checked }));
    };

    const handleLanguageChange = (event) => {
        const nextLanguage = event.target.value;
        setForm((prev) => ({ ...prev, preferredLanguage: nextLanguage }));
        i18n.changeLanguage(nextLanguage);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = {};
        const mobileDigits = form.mobile.replace(/\D/g, '');
        const codeValue = form.code.join('');

        if (!form.fullName.trim()) {
            nextErrors.fullName = t('validation.required');
        }

        if (!form.mobile.trim()) {
            nextErrors.mobile = t('validation.required');
        } else if (mobileDigits.length < 10) {
            nextErrors.mobile = t('validation.mobileInvalid');
        }

        if (!codeValue) {
            nextErrors.code = t('validation.required');
        } else if (codeValue.length < 6) {
            nextErrors.code = t('validation.codeInvalid');
        }

        if (!form.password.trim()) {
            nextErrors.password = t('validation.required');
        }

        if (!form.confirmPassword.trim()) {
            nextErrors.confirmPassword = t('validation.required');
        } else if (form.password && form.password !== form.confirmPassword) {
            nextErrors.confirmPassword = t('validation.passwordMismatch');
        }

        if (!form.terms) {
            nextErrors.terms = t('validation.termsRequired');
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            navigate('/verify');
        }
    };

    return (
        <div className="auth-shell min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
            <Navbar />

            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute top-24 -right-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />

            <div className="relative z-10 flex flex-1 flex-col pt-20">
                <div className="flex flex-1 items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-slate-200/60 backdrop-blur">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                                <Scale className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-lg font-extrabold text-primary">{t('auth.createAccountTitle')}</h1>
                            <p className="mt-1 text-xs text-slate-400">{t('auth.createAccountSubtitle')}</p>
                        </div>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.fullName')}</label>
                                <input
                                    type="text"
                                    placeholder={t('auth.fullNamePlaceholder')}
                                    value={form.fullName}
                                    onChange={handleChange('fullName')}
                                    aria-invalid={Boolean(errors.fullName)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:outline-none"
                                />
                                {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.mobileNumber')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        placeholder={t('auth.mobilePlaceholder')}
                                        value={form.mobile}
                                        onChange={handleChange('mobile')}
                                        aria-invalid={Boolean(errors.mobile)}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                </div>
                                {errors.mobile && <p className="mt-1 text-xs text-rose-500">{errors.mobile}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                                    <label>{t('auth.verificationCode')}</label>
                                    <button type="button" className="text-primary hover:text-primary/80 transition-colors">{t('auth.resendCode')}</button>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <input
                                            key={`code-${index}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={form.code[index]}
                                            onChange={(event) => handleCodeChange(index, event.target.value)}
                                            aria-invalid={Boolean(errors.code)}
                                            className="h-10 w-10 rounded-xl border border-slate-200 text-center text-sm font-semibold text-slate-700 shadow-sm focus:outline-none"
                                        />
                                    ))}
                                </div>
                                {errors.code && <p className="mt-1 text-xs text-rose-500">{errors.code}</p>}
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.emailOptional')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder={t('auth.emailPlaceholder')}
                                        value={form.email}
                                        onChange={handleChange('email')}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-semibold text-slate-600">{t('auth.password')}</label>
                                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                        <Lock className="h-4 w-4 text-slate-400" />
                                        <input
                                            type="password"
                                            placeholder="********"
                                            value={form.password}
                                            onChange={handleChange('password')}
                                            aria-invalid={Boolean(errors.password)}
                                            className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                        />
                                    </div>
                                    {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-600">{t('auth.confirmPassword')}</label>
                                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                        <Lock className="h-4 w-4 text-slate-400" />
                                        <input
                                            type="password"
                                            placeholder="********"
                                            value={form.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            aria-invalid={Boolean(errors.confirmPassword)}
                                            className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.userPreferences')}</label>
                                <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-400">
                                    {t('auth.preferredLanguage')}
                                </div>
                                <select
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:outline-none"
                                    value={form.preferredLanguage}
                                    onChange={handleLanguageChange}
                                >
                                    <option value="en">{t('auth.languageEnglish')}</option>
                                    <option value="hi">{t('auth.languageHindi')}</option>
                                    <option value="cg">{t('auth.languageChhattisgarhi')}</option>
                                </select>
                            </div>

                            <div className="space-y-3 text-xs text-slate-500">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300"
                                        checked={form.voice}
                                        onChange={handleToggle('voice')}
                                    />
                                    {t('auth.voiceAssist')}
                                </label>
                                <label className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="mt-0.5 h-4 w-4 rounded border-slate-300"
                                        checked={form.terms}
                                        onChange={handleToggle('terms')}
                                    />
                                    <span>{t('auth.agreeTerms')}</span>
                                </label>
                                {errors.terms && <p className="text-xs text-rose-500">{errors.terms}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-primary/90"
                            >
                                {t('auth.createAccount')}
                            </button>

                            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
                                <ShieldCheck className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                {t('auth.dataPrivacy')}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="pb-8 text-center text-xs text-slate-500">
                    {t('auth.haveAccount')}
                    <Link to="/login" className="ml-2 font-semibold text-primary hover:text-primary/80 transition-colors">
                        {t('auth.loginLink')}
                    </Link>
                </div>

                <div className="pb-8 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300">
                    <span>{t('auth.sslNote')}</span>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CreateAccount;

