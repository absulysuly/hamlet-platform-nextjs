import React from 'react';
import { AppTab, User, Language } from '../types';
import { HomeIcon, UserCircleIcon, UsersIcon } from './icons/Icons';
import { UI_TEXT } from '../translations';

interface BottomBarProps {
    user: User | null;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
    language: Language;
}

const BottomBar: React.FC<BottomBarProps> = ({ 
    user, 
    activeTab, 
    onNavigate, 
    language 
}) => {
    const texts = UI_TEXT[language];
    const barClasses = 'bg-[var(--color-glass-bg)] backdrop-blur-lg border-t border-[var(--color-glass-border)]';

    const navItems = [
        { label: texts.home, icon: HomeIcon, tab: AppTab.Home, enabled: true },
        { label: texts.candidates, icon: UsersIcon, tab: AppTab.Discover, enabled: true },
        { label: texts.myProfile, icon: UserCircleIcon, tab: AppTab.UserProfile, enabled: user != null },
    ];

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 h-16 lg:hidden ${barClasses}`}>
            <div className="grid grid-cols-3 h-full max-w-lg mx-auto font-medium">
                {navItems.map(item => (item.enabled) && (
                    <button
                        key={item.label}
                        onClick={() => onNavigate(item.tab)}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-2 group hover:bg-primary/10 ${activeTab === item.tab ? 'text-primary' : 'text-theme-text-muted'}`}
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-[10px] leading-tight text-center font-arabic">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomBar;