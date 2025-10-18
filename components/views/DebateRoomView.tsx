// Fix: Populating components/views/DebateRoomView.tsx with a placeholder component.
import React from 'react';
import { Language } from '../../types.ts';
import { UI_TEXT } from '../../translations.ts';

interface DebateRoomViewProps {
    language: Language;
}

const DebateRoomView: React.FC<DebateRoomViewProps> = ({ language }) => {
    const texts = UI_TEXT[language];
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold">{texts.debates}</h1>
            <div className="mt-4 glass-card rounded-lg p-6 text-center">
                <p className="text-theme-text-muted">{texts.underConstruction}</p>
                <p>{texts.featureComingSoon}</p>
            </div>
        </div>
    );
};

export default DebateRoomView;