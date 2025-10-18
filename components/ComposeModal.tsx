import React from 'react';
import { User, Post, Language } from '../types.ts';
import { XMarkIcon } from './icons/Icons.tsx';
import ComposeView from './views/ComposeView.tsx';

interface ComposeModalProps {
    user: User;
    onClose: () => void;
    // Fix: Added language prop to be passed down to ComposeView.
    language: Language;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ user, onClose, language }) => {
    const handlePost = (postDetails: Partial<Post>) => {
        console.log("New post created:", postDetails);
        // In a real app, this would call an API to save the post.
        // For this prototype, it correctly receives the data and closes.
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4">
            <div 
                className="glass-card rounded-lg shadow-xl w-full max-w-2xl relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center p-4 border-b border-[var(--color-glass-border)]">
                    <h2 className="text-xl font-bold">Compose Post</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                        <XMarkIcon className="w-6 h-6 text-theme-text-base" />
                    </button>
                </div>
                <div className="p-2">
                    {/* Fix: Passed the language prop to ComposeView. */}
                    <ComposeView user={user} onPost={handlePost} language={language} />
                </div>
            </div>
        </div>
    );
};

export default ComposeModal;