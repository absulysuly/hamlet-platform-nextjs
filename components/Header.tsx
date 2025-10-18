import React from 'react';
import { User, AppTab, Language } from '../types.ts';
import { UsersIcon, SearchIcon, BellIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface HeaderProps {
    user: User | null;
    onRequestLogin: () => void;
    onNavigate: (tab: AppTab) => void;
    language: Language;
}

const Header: React.FC<HeaderProps> = ({ user, onRequestLogin, onNavigate, language }) => {
    const texts = UI_TEXT[language];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-4 sm:px-6 glass-nav">
            <div className="flex items-center justify-between w-full">
                {/* Left side: Logo */}
                <div>
                    <button onClick={() => { onNavigate(AppTab.Home); }} className="text-2xl font-bold font-arabic text-theme-text-base whitespace-nowrap">
                        {texts.appName}
                    </button>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                    <button 
                        className="p-2 rounded-full hover:bg-white/10 text-theme-text-base"
                        aria-label={texts.search}
                    >
                        <SearchIcon className="w-6 h-6" />
                    </button>
                    <button 
                        className="p-2 rounded-full hover:bg-white/10 text-theme-text-base"
                        aria-label={texts.notifications}
                    >
                        <BellIcon className="w-6 h-6" />
                    </button>
                    {user ? (
                         <button onClick={() => onNavigate(AppTab.UserProfile)} aria-label={texts.myProfile}>
                            <img className="w-9 h-9 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                         </button>
                    ) : (
                        <button onClick={onRequestLogin} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <UsersIcon className="w-5 h-5 text-theme-text-muted" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;