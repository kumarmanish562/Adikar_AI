import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Phone, Scale, EyeOff, Eye, ShieldCheck, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateAccount = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleToggle = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.checked }));
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        const nextErrors = {};

        if (!form.fullName.trim()) {
            nextErrors.fullName = "Full name is required";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is required";
        }

        if (!form.mobile.trim()) {
            nextErrors.mobile = "Mobile number is required";
        }

        if (!form.password.trim()) {
            nextErrors.password = "Password is required";
        }

        if (!form.confirmPassword.trim()) {
            nextErrors.confirmPassword = "Confirm password is required";
        } else if (form.password !== form.confirmPassword) {
            nextErrors.confirmPassword = "Passwords do not match";
        }

        if (!form.terms) {
            nextErrors.terms = "Please accept the Terms & Privacy Policy";
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            navigate('/verify');
        }
    };

    return (
        <div className="auth-shell min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">

            {/* Background Blur */}
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute top-24 -right-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />

            <Navbar />

            <div className="relative z-10 flex flex-1 flex-col pt-16">

                <div className="flex flex-1 items-center justify-center px-4 py-12">

                    <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-slate-200/60 backdrop-blur">

                        {/* Header */}
                        <div className="flex flex-col items-center text-center">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                                <Scale className="h-6 w-6 text-primary" />
                            </div>

                            <h1 className="text-lg font-extrabold tracking-wide text-primary">
                                {t('auth.createAccountTitle')}
                            </h1>

                            <p className="mt-1 text-xs text-slate-400">
                                {t('auth.createAccountSubtitle')}
                            </p>

                        </div>

                        {/* FORM */}
                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                            {/* FULL NAME */}
                            <div>
                                <label className="text-xs font-semibold text-slate-600">
                                    {t('auth.fullName')}
                                </label>

                                <input
                                    type="text"
                                    placeholder={t('auth.fullNamePlaceholder')}
                                    value={form.fullName}
                                    onChange={handleChange('fullName')}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:outline-none"
                                />

                                {errors.fullName &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                                }

                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="text-xs font-semibold text-slate-600">
                                    {t('auth.emailAddress')}
                                </label>

                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">

                                    <Mail className="h-4 w-4 text-slate-400" />

                                    <input
                                        type="email"
                                        placeholder={t('auth.emailPlaceholder')}
                                        value={form.email}
                                        onChange={handleChange('email')}
                                        className="w-full text-sm text-slate-700 focus:outline-none"
                                    />

                                </div>

                                {errors.email &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                                }

                            </div>

                            {/* MOBILE */}
                            <div>

                                <label className="text-xs font-semibold text-slate-600">
                                    {t('auth.mobileNumber')}
                                </label>

                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">

                                    <Phone className="h-4 w-4 text-slate-400" />

                                    <input
                                        type="tel"
                                        placeholder={t('auth.mobilePlaceholder')}
                                        value={form.mobile}
                                        onChange={handleChange('mobile')}
                                        className="w-full text-sm text-slate-700 focus:outline-none"
                                    />

                                </div>

                                {errors.mobile &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.mobile}</p>
                                }

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="text-xs font-semibold text-slate-600">
                                    {t('auth.password')}
                                </label>

                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">

                                    <Lock className="h-4 w-4 text-slate-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="********"
                                        value={form.password}
                                        onChange={handleChange('password')}
                                        className="w-full text-sm text-slate-700 focus:outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword
                                            ? <Eye className="h-4 w-4 text-slate-400" />
                                            : <EyeOff className="h-4 w-4 text-slate-400" />
                                        }
                                    </button>

                                </div>

                                {errors.password &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
                                }

                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="text-xs font-semibold text-slate-600">
                                    {t('auth.confirmPassword')}
                                </label>

                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">

                                    <Lock className="h-4 w-4 text-slate-400" />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="********"
                                        value={form.confirmPassword}
                                        onChange={handleChange('confirmPassword')}
                                        className="w-full text-sm text-slate-700 focus:outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword
                                            ? <Eye className="h-4 w-4 text-slate-400" />
                                            : <EyeOff className="h-4 w-4 text-slate-400" />
                                        }
                                    </button>

                                </div>

                                {errors.confirmPassword &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword}</p>
                                }

                            </div>

                            {/* TERMS */}
                            <div className="space-y-3 text-xs text-slate-500">

                                <label className="flex items-start gap-2">

                                    <input
                                        type="checkbox"
                                        className="mt-0.5 h-4 w-4 rounded border-slate-300"
                                        checked={form.terms}
                                        onChange={handleToggle('terms')}
                                    />

                                    <span>{t('auth.agreeTerms')}</span>

                                </label>

                                {errors.terms &&
                                    <p className="text-xs text-rose-500">{errors.terms}</p>
                                }

                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary/90"
                            >
                                {t('auth.createAccount')}
                            </button>

                            {/* PRIVACY */}
                            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-500">

                                <ShieldCheck className="mr-2 h-3.5 w-3.5 text-slate-400" />

                                {t('auth.dataPrivacy')}

                            </div>

                        </form>

                        {/* SECURITY NOTE */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">

                            <ShieldCheck className="h-3.5 w-3.5" />

                            <span>{t('auth.secureNote')}</span>

                        </div>

                        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300">
                            {t('auth.encryptionActive')}
                        </p>

                    </div>

                </div>

                {/* LOGIN LINK */}
                <div className="pb-8 text-center text-xs text-slate-500">

                    {t('auth.haveAccount')}

                    <Link
                        to="/login"
                        className="ml-2 font-semibold text-primary hover:text-primary/80"
                    >
                        {t('auth.loginLink')}
                    </Link>

                </div>

            </div>

            <Footer />

        </div>
    );
};

export default CreateAccount;