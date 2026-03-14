import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VerifyOtp = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [timer, setTimer] = useState(30);
    const [code, setCode] = useState(Array(6).fill(''));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const email = location.state?.email || '';
    const purpose = location.state?.purpose || 'password_reset';
    
    // Redirect if no email provided
    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const handleVerify = async () => {
        const otpCode = code.join('');
        
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: otpCode }),
            });
            
            if (response.ok) {
                // OTP verified, redirect to reset password page or login
                if (purpose === 'password_reset') {
                    navigate('/reset-password', { state: { email, otp: otpCode } });
                } else {
                    navigate('/login');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Invalid or expired OTP');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timer <= 0) {
            return undefined;
        }
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleCodeChange = (index, value) => {
        const numericValue = value.replace(/\D/g, '').slice(-1);
        setCode((prev) => {
            const nextCode = [...prev];
            nextCode[index] = numericValue;
            return nextCode;
        });
    };

    const formattedTimer = `00:${String(timer).padStart(2, '0')}`;

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
                            <h1 className="text-lg font-extrabold text-primary">{t('auth.verifyTitle')}</h1>
                            <p className="mt-2 text-xs text-slate-400">{t('auth.verifySubtitle')}</p>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <input
                                        key={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={code[index]}
                                        onChange={(event) => handleCodeChange(index, event.target.value)}
                                        className="h-12 w-12 rounded-2xl border border-slate-200 text-center text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-primary"
                                    />
                                ))}
                            </div>
                            
                            {error && <p className="mt-3 text-center text-xs text-rose-500">{error}</p>}

                            <button
                                type="button"
                                onClick={handleVerify}
                                disabled={loading}
                                className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : t('auth.verify')}
                            </button>

                            <div className="mt-4 text-center text-xs text-slate-500">
                                {t('auth.resendIn', { time: formattedTimer })}
                            </div>

                            <div className="mt-4 text-center text-xs text-slate-500">
                                <span className="text-slate-400">{t('auth.noCode')}</span>
                                <button type="button" className="ml-2 font-semibold text-primary hover:text-primary/80 transition-colors">
                                    {t('auth.contactSupport')}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>{t('auth.secureNote')}</span>
                        </div>
                        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.2em] text-slate-300">
                            {t('auth.sslNote')}
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VerifyOtp;
