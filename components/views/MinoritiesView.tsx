import React from 'react';
import { Language } from '../../types.ts';
import { UI_TEXT } from '../../translations.ts';

const MinoritiesView: React.FC<{ language: Language }> = ({ language }) => {
    const texts = UI_TEXT[language];
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-white text-center">{texts.minorities}</h1>
            <div className="mt-4 glass-card rounded-lg p-6 text-center">
                <p className="text-theme-text-muted">{texts.underConstruction}</p>
                <p>A dedicated space to discover and support candidates from minority groups.</p>
            </div>
        </div>
    );
};

export default MinoritiesView;