// Fix: Populating components/CandidatePill.tsx with a reusable candidate component.
import React, { useState } from 'react';
import { User, Language } from '../types.ts';
import { VerifiedIcon, PlusIcon, CheckIcon, FemaleIcon } from './icons/Icons.tsx';
import * as api from '../services/apiService.ts';
import { UI_TEXT } from '../translations.ts';

interface CandidatePillProps {
    candidate: User;
    onSelect: (candidate: User) => void;
    user: User | null;
    requestLogin: () => void;
    language: Language;
}

const CandidatePill: React.FC<CandidatePillProps> = ({ candidate, onSelect, user, requestLogin, language }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const texts = UI_TEXT[language];

    const handleFollow = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click-through to profile
        if (!user) {
            requestLogin();
            return;
        }
        if (isFollowing) return;

        setIsSubmitting(true);
        api.followCandidate(candidate.id).then(response => {
            if (response.success) {
                console.log(`Followed ${candidate.name}`);
                setIsFollowing(true);
            }
        }).finally(() => {
            setIsSubmitting(false);
        });
    };
    
    const buttonClasses = `flex items-center space-x-1 px-3 py-1 text-xs font-semibold rounded-full transition-all disabled:opacity-70`;
    const followClasses = `bg-primary text-on-primary hover:brightness-110`;
    const followingClasses = `bg-secondary/80 text-on-primary cursor-default`;

    return (
        <div 
            onClick={() => onSelect(candidate)}
            className="glass-card rounded-lg p-4 flex items-center justify-between cursor-pointer"
        >
            <div className="flex items-center space-x-4 overflow-hidden">
                <img loading="lazy" className="w-12 h-12 rounded-full ring-2 ring-white/50 flex-shrink-0" src={candidate.avatarUrl} alt={candidate.name} />
                <div className="overflow-hidden">
                    <p className="font-bold flex items-center text-theme-text-base truncate">
                        {candidate.name}
                        {candidate.verified && <VerifiedIcon className="w-4 h-4 text-primary ml-1.5 flex-shrink-0" />}
                        {candidate.gender === 'Female' && <FemaleIcon className="w-4 h-4 text-brand-hot-pink ml-1.5 flex-shrink-0" />}
                    </p>
                    <p className="text-sm text-theme-text-muted truncate">{candidate.party}</p>
                </div>
            </div>
            <button 
                onClick={handleFollow}
                disabled={isSubmitting || isFollowing}
                className={`${buttonClasses} ${isFollowing ? followingClasses : followClasses}`}
            >
                {isFollowing ? (
                    <>
                        <CheckIcon className="w-3 h-3"/>
                        <span>{texts.following}</span>
                    </>
                ) : (
                     <>
                        <PlusIcon className="w-3 h-3"/>
                        <span>{texts.follow}</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default CandidatePill;