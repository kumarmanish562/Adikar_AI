import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Scale, ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPassword = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim()) {
            setError(t('validation.required'));
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            if (response.ok) {
                // Redirect to OTP verification page with email
                navigate('/verify-otp', { state: { email, purpose: 'password_reset' } });
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to send reset email');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="auth-shell min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute top-24 -right-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
            <div className="absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-slate-200/40 blur-3xl" />

            <Navbar />

            <div className="relative z-10 flex flex-1 flex-col pt-16">
                <div className="flex flex-1 items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl shadow-slate-200/60 backdrop-blur">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                                <Scale className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-lg font-extrabold tracking-wide text-primary">{t('auth.forgotPasswordTitle')}</h1>
                            <p className="mt-1 text-xs text-slate-400">{t('auth.forgotPasswordSubtitle')}</p>
                        </div>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.emailAddress')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder={t('auth.emailPlaceholder')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                </div>
                                {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : t('auth.sendResetCode')}
                            </button>

                            <Link
                                to="/login"
                                className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                {t('auth.backToLogin')}
                            </Link>
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
            </div>

            <Footer />
        </div>
    );
};

export default ForgotPassword;
