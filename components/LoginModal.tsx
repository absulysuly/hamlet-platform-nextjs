import React, { useState } from 'react';
import { User, UserRole, Language } from '../types.ts';
import { XMarkIcon, ArrowLeftIcon, GoogleIcon, FacebookIcon, EnvelopeIcon } from './icons/Icons.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';
import { UI_TEXT } from '../translations.ts';
import * as api from '../services/apiService.ts';

interface LoginModalProps {
    onLogin: (user: User) => void;
    onClose: () => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

type ModalView = 'selection' | 'voter' | 'candidate' | 'verify';

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, language, onLanguageChange }) => {
    const [view, setView] = useState<ModalView>('selection');
    const [pendingUser, setPendingUser] = useState<User | null>(null);
    const [resentMessage, setResentMessage] = useState('');
    const texts = UI_TEXT[language];

    const handleApiResponse = (user: User) => {
        if (user.emailVerified) {
            onLogin(user);
        } else {
            setPendingUser(user);
            setView('verify');
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        const user = await api.socialLogin(provider);
        if (user) {
            handleApiResponse(user);
        } else {
            alert(texts.socialLoginFailed);
        }
    };

    const handleRegister = async (details: { name: string; email: string; role: UserRole }) => {
        const newUser = await api.registerUser(details);
        if (newUser) {
            handleApiResponse(newUser);
        } else {
            alert(texts.registrationFailed);
        }
    };

    const handleCheckVerification = async () => {
        if (!pendingUser) return;
        const user = await api.checkVerificationStatus(pendingUser.id);
        if (user && user.emailVerified) {
            onLogin(user);
        } else {
            alert(texts.emailNotVerified);
        }
    };

    const handleResend = async () => {
        if (!pendingUser) return;
        await api.resendVerificationEmail(pendingUser.id);
        setResentMessage(texts.emailResent);
        setTimeout(() => setResentMessage(''), 3000); // Clear message after 3 seconds
    };

    const RegistrationForm: React.FC<{ role: UserRole }> = ({ role }) => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            handleRegister({ name, email, role });
        };

        return (
            <div>
                <button onClick={() => setView('selection')} className="flex items-center space-x-2 text-sm text-theme-text-muted hover:text-theme-text-base mb-4">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>{texts.back}</span>
                </button>
                <h2 className="text-xl font-bold mb-4 text-theme-text-base font-arabic">
                    {role === UserRole.Voter ? texts.registerAsVoter : texts.registerAsCandidate}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-medium text-theme-text-muted font-arabic">{texts.fullName}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-theme-text-muted font-arabic">{texts.emailAddress}</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <button type="submit" className="w-full mt-2 px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50">
                        {texts.createAccount}
                    </button>
                </form>
            </div>
        );
    };

    const renderContent = () => {
        switch (view) {
            case 'voter':
                return <RegistrationForm role={UserRole.Voter} />;
            case 'candidate':
                return <RegistrationForm role={UserRole.Candidate} />;
            case 'verify':
                return (
                     <div className="text-center">
                        <EnvelopeIcon className="w-12 h-12 mx-auto text-primary mb-4" />
                        <h2 className="text-xl font-bold mb-2 text-theme-text-base font-arabic">{texts.verifyYourEmail}</h2>
                        <p className="text-theme-text-muted mb-6 text-sm">{texts.verificationSentMessage}</p>
                        <button onClick={handleCheckVerification} className="w-full px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110">
                            {texts.checkVerification}
                        </button>
                        <div className="mt-4 text-xs text-theme-text-muted">
                            <span>{texts.didNotReceiveEmail} </span>
                            <button onClick={handleResend} className="font-semibold text-primary hover:underline">{texts.resendVerificationEmail}</button>
                            {resentMessage && <p className="text-green-400 mt-2">{resentMessage}</p>}
                        </div>
                    </div>
                );
            case 'selection':
            default:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-2 mt-4 text-theme-text-base font-arabic">{texts.welcomeToApp.replace('{appName}', texts.appName)}</h2>
                        <div className="space-y-3 my-6">
                            <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center space-x-2 p-3 border border-[var(--color-glass-border)] rounded-lg hover:bg-white/10 transition-colors">
                                <GoogleIcon className="w-5 h-5" />
                                <span className="font-semibold text-sm text-theme-text-base">{texts.signInWithGoogle}</span>
                            </button>
                             <button onClick={() => handleSocialLogin('facebook')} className="w-full flex items-center justify-center space-x-2 p-3 border border-[var(--color-glass-border)] rounded-lg hover:bg-white/10 transition-colors">
                                <FacebookIcon className="w-5 h-5" />
                                <span className="font-semibold text-sm text-theme-text-base">{texts.signInWithFacebook}</span>
                            </button>
                        </div>
                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-t border-[var(--color-glass-border)]" />
                            <span className="mx-4 text-xs text-theme-text-muted">{texts.orContinueWithEmail}</span>
                            <hr className="flex-grow border-t border-[var(--color-glass-border)]" />
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => setView('voter')} className="w-full text-left p-4 border border-[var(--color-glass-border)] rounded-lg hover:bg-primary/10 transition-colors">
                                <h3 className="font-bold text-md text-theme-text-base font-arabic">{texts.iAmVoter}</h3>
                                <p className="text-sm text-theme-text-muted font-arabic">{texts.voterDescription}</p>
                            </button>
                            <button onClick={() => setView('candidate')} className="w-full text-left p-4 border border-[var(--color-glass-border)] rounded-lg hover:bg-primary/10 transition-colors">
                                <h3 className="font-bold text-md text-theme-text-base font-arabic">{texts.iAmCandidate}</h3>
                                <p className="text-sm text-theme-text-muted font-arabic">{texts.candidateDescription}</p>
                            </button>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="glass-card rounded-lg shadow-xl w-full max-w-sm p-6 text-center relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/10">
                    <XMarkIcon className="w-6 h-6 text-theme-text-base" />
                </button>
                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
                {renderContent()}
            </div>
        </div>
    );
};

export default LoginModal;