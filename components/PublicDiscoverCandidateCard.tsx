import React from 'react';
import { User, Language } from '../types.ts';
import { VerifiedIcon, FemaleIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface PublicDiscoverCandidateCardProps {
    candidate: User;
    language: Language;
}

const PublicDiscoverCandidateCard: React.FC<PublicDiscoverCandidateCardProps> = ({ candidate, language }) => {
    const texts = UI_TEXT[language];
    // This is the URL for the other application, as specified.
    const civicShellProfileUrl = `https://civic-shell.yoursite.web.app/candidate/${candidate.id}`;

    return (
        <div className="glass-card rounded-lg p-4 flex flex-col items-center text-center">
            <img className="w-20 h-20 rounded-full ring-4 ring-white/50" src={candidate.avatarUrl} alt={candidate.name} />
            <p className="font-bold flex items-center text-white mt-3">
                {candidate.name}
                {candidate.verified && <VerifiedIcon className="w-4 h-4 text-brand-hot-pink ml-1.5" />}
                {candidate.gender === 'Female' && <FemaleIcon className="w-4 h-4 text-brand-hot-pink ml-1.5" />}
            </p>
            <p className="text-sm text-slate-300">{candidate.party}</p>
            <p className="text-xs text-slate-400 mt-2 h-8 overflow-hidden">{candidate.bio?.substring(0, 50) || 'Candidate for the upcoming election.'}{candidate.bio && candidate.bio.length > 50 ? '...' : ''}</p>
            
            <a
                href={civicShellProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full block text-center px-4 py-2 text-sm font-semibold text-white bg-brand-hot-pink rounded-full transition-all hover:brightness-110 font-arabic"
            >
                {texts.viewProfile}
            </a>
        </div>
    );
};

export default PublicDiscoverCandidateCard;