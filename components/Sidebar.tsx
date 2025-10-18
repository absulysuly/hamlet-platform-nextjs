import React from 'react';
import { AppTab, UserRole, User, Language } from '../types.ts';
import { DashboardIcon, SettingsIcon, UsersIcon, HomeIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface SidebarProps {
    user: User | null;
    activeTab: AppTab;
    onNavigate: (tab: AppTab) => void;
    language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onNavigate, language }) => {
    const texts = UI_TEXT[language];

    const navItems = [
        { label: texts.home, icon: HomeIcon, tab: AppTab.Home, enabled: true },
        { label: texts.dashboard, icon: DashboardIcon, tab: AppTab.Dashboard, enabled: user?.role === UserRole.Candidate },
        { label: texts.myProfile, icon: UsersIcon, tab: AppTab.UserProfile, enabled: user != null },
        { label: texts.settings, icon: SettingsIcon, tab: AppTab.Settings, enabled: true },
    ];

    const getLinkClasses = (tab: AppTab) => {
        return activeTab === tab ? 'bg-primary/20 text-primary' : 'text-theme-text-muted hover:bg-primary/10 hover:text-theme-text-base';
    };

    const getIconClasses = (tab: AppTab) => {
        return activeTab === tab ? 'text-primary' : 'text-theme-text-muted group-hover:text-theme-text-base';
    };

    return (
        <aside className="fixed top-0 left-0 z-30 w-64 h-full transition-transform -translate-x-full lg:translate-x-0 pt-14" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-[var(--color-glass-bg)] backdrop-blur-[20px] border-r border-[var(--color-glass-border)]">
                <ul className="space-y-2 font-medium">
                    {navItems.map(item => item.enabled && (
                        <li key={item.label}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onNavigate(item.tab); }}
                                className={`flex items-center p-2 rounded-lg group ${getLinkClasses(item.tab)}`}
                            >
                                <item.icon className={`w-6 h-6 transition duration-75 ${getIconClasses(item.tab)}`} />
                                <span className="ml-3">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;