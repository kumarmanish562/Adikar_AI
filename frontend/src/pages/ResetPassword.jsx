import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Scale, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ResetPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const email = location.state?.email || '';
    const otp = location.state?.otp || '';
    
    // Redirect if no email or OTP provided
    useEffect(() => {
        if (!email || !otp) {
            navigate('/forgot-password');
        }
    }, [email, otp, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        if (!newPassword || !confirmPassword) {
            setError(t('validation.required'));
            return;
        }
        
        if (newPassword !== confirmPassword) {
            setError(t('validation.passwordMismatch'));
            return;
        }
        
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    otp, 
                    new_password: newPassword 
                }),
            });
            
            if (response.ok) {
                // Password reset successful, redirect to login
                navigate('/login', { state: { message: 'Password reset successfully. Please login with your new password.' } });
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to reset password');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
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
                            <h1 className="text-lg font-extrabold tracking-wide text-primary">Reset Password</h1>
                            <p className="mt-1 text-xs text-slate-400">Enter your new password</p>
                        </div>

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.password')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Lock className="h-4 w-4 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600">{t('auth.confirmPassword')}</label>
                                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                                    <Lock className="h-4 w-4 text-slate-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-xs text-rose-500">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
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
            </div>

            <Footer />
        </div>
    );
};

export default ResetPassword;
