import React, { useState } from 'react';
import { User } from '../../../types.ts';

interface ReelComposerProps {
    user: User;
    onCreateReel: (reelDetails: { caption: string; }) => void;
}

const ReelComposer: React.FC<ReelComposerProps> = ({ user, onCreateReel }) => {
    const [caption, setCaption] = useState('');

    const handleSubmit = () => {
        if (caption.trim()) {
            onCreateReel({ caption });
            setCaption('');
        }
    };

    return (
        <div className="glass-card rounded-lg p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                <div className="w-full space-y-3">
                     <h3 className="font-semibold text-theme-text-base">Create a New Reel</h3>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-2 border-none rounded-md bg-transparent focus:ring-0 placeholder-theme-text-muted"
                        rows={2}
                        placeholder="Reel caption..."
                    />
                </div>
            </div>
            <div className="flex justify-end items-center mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={!caption.trim()}
                    className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Post Reel
                </button>
            </div>
        </div>
    );
};

export default ReelComposer;