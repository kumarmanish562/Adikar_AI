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
    const [resending, setResending] = useState(false);
    
    const email = location.state?.email || '';
    const purpose = location.state?.purpose || 'password_reset';
    
    // Redirect if no email provided
    useEffect(() => {
        if (!email) {
            if (purpose === 'registration') {
                navigate('/create-account');
            } else {
                navigate('/forgot-password');
            }
        }
    }, [email, navigate, purpose]);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const handleResendOtp = async () => {
        setResending(true);
        setError('');
        
        try {
            let endpoint = '/api/auth/forgot-password';
            let body = { email };
            
            if (purpose === 'registration') {
                endpoint = '/api/auth/register';
                body = location.state?.user_data || { email };
            }
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            
            if (response.ok) {
                setTimer(30); // Reset timer
                setCode(Array(6).fill('')); // Clear code
                // Success message could be shown here
            } else {
                setError('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setResending(false);
        }
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
            if (purpose === 'registration') {
                // Handle registration OTP verification
                const response = await fetch('/api/auth/verify-registration-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        email, 
                        otp: otpCode,
                        user_data: location.state?.user_data
                    }),
                });
                
                if (response.ok) {
                    // Registration completed, redirect to login
                    navigate('/login', { 
                        state: { 
                            message: 'Account created successfully! Please login.' 
                        } 
                    });
                } else {
                    const errorData = await response.json();
                    setError(errorData.detail || 'Invalid or expired OTP');
                }
            } else {
                // Handle password reset OTP verification
                const response = await fetch('/api/auth/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp: otpCode }),
                });
                
                if (response.ok) {
                    // OTP verified, redirect to reset password page
                    navigate('/reset-password', { state: { email, otp: otpCode } });
                } else {
                    const errorData = await response.json();
                    setError(errorData.detail || 'Invalid or expired OTP');
                }
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
                            <div className="flex justify-center gap-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <input
                                        key={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={code[index]}
                                        onChange={(event) => handleCodeChange(index, event.target.value)}
                                        className="h-14 w-14 rounded-xl border-2 border-slate-300 text-center text-lg font-bold text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {error && <p className="mt-4 text-center text-sm text-red-500 font-medium">{error}</p>}

                            <button
                                type="button"
                                onClick={handleVerify}
                                disabled={loading}
                                className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? 'Verifying...' : t('auth.verify')}
                            </button>

                            <div className="mt-6 text-center text-sm text-slate-600">
                                {timer > 0 ? (
                                    <span>Resend OTP in {formattedTimer}</span>
                                ) : (
                                    <button 
                                        type="button" 
                                        onClick={handleResendOtp}
                                        disabled={resending}
                                        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
                                    >
                                        {resending ? 'Resending...' : 'Resend OTP'}
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 text-center text-sm text-slate-500">
                                <span>Didn't receive the code? </span>
                                <button type="button" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                    Contact Support
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
