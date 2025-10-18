import React, { useState } from 'react';
import { Language, User, Post } from '../types';
import { UI_TEXT } from '../translations';

interface ContactMPFormProps {
    language: Language;
    candidate: User;
    recentPosts: Partial<Post>[];
}

const ContactMPForm: React.FC<ContactMPFormProps> = ({ language, candidate, recentPosts }) => {
    const [message, setMessage] = useState('');
    const texts = UI_TEXT[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            alert((texts as any).messageSent || 'Message sent successfully!');
            setMessage('');
        }
    };
    
    return (
        <div className="glass-card rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold font-arabic text-center mb-2 text-theme-text-base">{(texts as any).contactMP || 'Contact MP'}</h3>
            <p className="text-sm text-theme-text-muted text-center mb-4 font-arabic">
                {(texts as any).contactMPDesc || 'Send a message to this candidate'}
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 text-theme-text-base placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary font-arabic"
                    placeholder={(texts as any).contactMPPlaceholder || 'Type your message here...'}
                />
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-arabic"
                    >
                        {(texts as any).sendMessage || 'Send Message'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactMPForm;