import React from 'react';
import { Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';

interface TopNavBarProps<T extends string> {
    tabs: T[];
    activeTab: T;
    onTabChange: (tab: T) => void;
    language: Language;
}

const tabTranslationKeys: { [key: string]: keyof (typeof UI_TEXT)['en'] } = {
    'Feed': 'feed',
    'Real': 'real',
    'Candidates': 'candidates',
    'Whisper': 'whisper',
    'Women': 'women',
    'Minorities': 'minorities',
    'Components': 'components',
};


function TopNavBar<T extends string>({ tabs, activeTab, onTabChange, language }: TopNavBarProps<T>) {
    const texts = UI_TEXT[language];
    const navBarClasses = 'border-b border-[var(--color-glass-border)] top-nav-bar';

    const getTabClasses = (tab: T) => {
        const isActive = activeTab === tab;
        return isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-theme-text-muted hover:text-theme-text-base hover:border-theme-text-muted';
    };

    return (
        <div className={navBarClasses}>
            <nav className="flex space-x-6 rtl:space-x-reverse px-4 sm:px-6 overflow-x-auto no-scrollbar -mb-px" aria-label="Tabs">
                {tabs.map((tab) => {
                    const translationKey = tabTranslationKeys[tab];
                    const label = translationKey && typeof texts[translationKey] === 'string' ? texts[translationKey] : tab;

                    return (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors font-arabic ${getTabClasses(tab)}`}
                        >
                            {label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default TopNavBar;