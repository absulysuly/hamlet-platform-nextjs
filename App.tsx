import React, { useState, useEffect, Suspense, lazy } from 'react';
import { User, UserRole, Governorate, Language, AppTab, Post, ThemeName, MainContentTab } from './types';
import * as api from './services/apiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';
import LoginModal from './components/LoginModal';
import ComposeModal from './components/ComposeModal';
import { colorThemes } from './utils/colorThemes';
import LanguageSwitcher from './components/LanguageSwitcher';
import PostDetailModal from './components/PostDetailModal';
import Countdown from './components/Countdown';
import Spinner from './components/Spinner';

// --- Lazy-loaded Components ---
const HomeView = lazy(() => import('./components/views/HomeView'));
const PublicDiscoverView = lazy(() => import('./components/views/PublicDiscoverView'));
const SettingsView = lazy(() => import('./components/views/SettingsView'));
const UserProfileView = lazy(() => import('./components/views/UserProfileView'));
const CandidateProfileView = lazy(() => import('./components/views/CandidateProfileView'));
const CandidateDashboardView = lazy(() => import('./components/views/CandidateDashboardView'));
const FullScreenReelView = lazy(() => import('./components/views/FullScreenReelView'));
const StoryViewModal = lazy(() => import('./components/views/StoryViewModal'));
const HeroSection = lazy(() => import('./components/HeroSection'));


const App: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Home);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isComposeModalOpen, setComposeModalOpen] = useState(false);
    const [isHighContrast, setHighContrast] = useState(false);
    const [language, setLanguage] = useState<Language>('ar');
    const [activeTheme, setActiveTheme] = useState<ThemeName>('euphratesTeal');

    // Filters
    const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | 'All'>('All');
    const [selectedParty, setSelectedParty] = useState<string | 'All'>('All');
    const [parties, setParties] = useState<string[]>([]);

    // View-specific state
    const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
    const [selectedReel, setSelectedReel] = useState<Post | null>(null);
    const [selectedPostForDetail, setSelectedPostForDetail] = useState<Post | null>(null);
    const [selectedStoryUser, setSelectedStoryUser] = useState<User | null>(null);
    const [mainHomeTab, setMainHomeTab] = useState<MainContentTab>(AppTab.Feed);
    
    // --- ROUTING ---
    const [isPublicDiscoverPage, setIsPublicDiscoverPage] = useState(false);
    useEffect(() => {
        if (window.location.pathname === '/discover') {
            setIsPublicDiscoverPage(true);
        }
    }, []);


    // --- EFFECTS ---
    useEffect(() => {
        api.getParties().then(setParties);
    }, []);

    useEffect(() => {
        const isRtl = language === 'ar' || language === 'ku';
        document.documentElement.lang = language;
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }, [language]);

    useEffect(() => {
        const root = document.documentElement;
        const theme = colorThemes[activeTheme];
            
        for (const [key, value] of Object.entries(theme)) {
            root.style.setProperty(key, value as string);
        }
    }, [activeTheme]);
    
    // --- HANDLERS ---
    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        setLoginModalOpen(false);
        if (loggedInUser.role === UserRole.Candidate) {
            setActiveTab(AppTab.Dashboard);
        } else {
            setActiveTab(AppTab.Home);
        }
    };

    const handleUpdateUser = (updatedUser: User) => {
        setUser(updatedUser);
    }
    
    const handleNavigate = (tab: AppTab) => {
        setSelectedProfile(null);
        setActiveTab(tab);
    };

    const handleSelectProfile = (profile: User) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        if (profile.id === user.id) {
            setActiveTab(AppTab.UserProfile);
            return;
        }
        if (profile.role === UserRole.Candidate) {
            setSelectedProfile(profile);
            setActiveTab(AppTab.CandidateProfile);
        }
    };

    const handleSelectReel = (reel: Post) => {
        if (!user) {
            setLoginModalOpen(true);
            return;
        }
        setSelectedReel(reel);
    };
    
    const handleSelectPost = (post: Post) => {
        setSelectedPostForDetail(post);
    };
    
    const handleSelectStory = (storyUser: User) => {
        setSelectedStoryUser(storyUser);
    };
    
    const handleClosePostDetail = () => {
        setSelectedPostForDetail(null);
    };
    
    // --- RENDER LOGIC ---
    if (isPublicDiscoverPage) {
        return (
             <div className="min-h-screen font-sans">
                <Suspense fallback={<Spinner />}>
                    <PublicDiscoverView language={language} />
                </Suspense>
            </div>
        )
    }
    
    const renderContent = () => {
         if (selectedReel) {
            return <FullScreenReelView reel={selectedReel} onClose={() => setSelectedReel(null)} user={user} requestLogin={() => setLoginModalOpen(true)} />
        }
        
        const homeViewProps = {
            user: user,
            requestLogin: () => setLoginModalOpen(true),
            selectedGovernorate: selectedGovernorate,
            onGovernorateChange: setSelectedGovernorate,
            selectedParty: selectedParty,
            onPartyChange: setSelectedParty,
            parties: parties,
            onSelectProfile: handleSelectProfile,
            onSelectReel: handleSelectReel,
            onSelectPost: handleSelectPost,
            onSelectStory: handleSelectStory,
            language: language,
            activeTab: mainHomeTab,
            onTabChange: setMainHomeTab,
            onCompose: () => setComposeModalOpen(true),
        };

        switch (activeTab) {
            case AppTab.Home:
            case AppTab.Discover:
                return <HomeView {...homeViewProps} />;
            case AppTab.Settings:
                return <SettingsView isHighContrast={isHighContrast} onToggleContrast={() => setHighContrast(p => !p)} activeTheme={activeTheme} onChangeTheme={setActiveTheme} language={language} />;
            case AppTab.UserProfile:
                return user ? <UserProfileView user={user} onUpdateUser={handleUpdateUser} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.CandidateProfile:
                 return selectedProfile ? <CandidateProfileView candidate={selectedProfile} user={user} requestLogin={() => setLoginModalOpen(true)} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            case AppTab.Dashboard:
                return user?.role === UserRole.Candidate ? <CandidateDashboardView user={user} language={language} onSelectProfile={handleSelectProfile} onSelectPost={handleSelectPost} /> : <HomeView {...homeViewProps} />;
            default:
                return <HomeView {...homeViewProps} />;
        }
    }
    
    return (
        <div className={`min-h-screen font-sans ${isHighContrast ? 'high-contrast' : ''}`}>
            <Header 
                user={user} 
                onRequestLogin={() => setLoginModalOpen(true)}
                onNavigate={handleNavigate}
                language={language}
            />
            
            <Sidebar 
                user={user} 
                activeTab={activeTab} 
                onNavigate={handleNavigate}
                language={language}
            />
            
            <main className="lg:pl-64 pt-14 pb-16 lg:pb-0">
                 <div className="px-4 sm:px-6 py-4 flex flex-col items-center gap-4">
                    <LanguageSwitcher
                        language={language}
                        onLanguageChange={setLanguage}
                    />
                </div>
                
                <Suspense fallback={<div className="w-full h-32 flex justify-center items-center"><Spinner /></div>}>
                    <HeroSection />
                </Suspense>

                <div className="px-4 sm:px-6 flex flex-col items-center gap-4 my-4">
                    <Countdown language={language} />
                </div>
                
                <Suspense fallback={<div className="flex justify-center items-center p-10"><Spinner /></div>}>
                    {renderContent()}
                </Suspense>
            </main>
            
            <BottomBar 
                user={user} 
                activeTab={activeTab} 
                onNavigate={handleNavigate} 
                language={language}
            />

            {isLoginModalOpen && <LoginModal onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} language={language} onLanguageChange={setLanguage} />}
            {isComposeModalOpen && user && <ComposeModal user={user} onClose={() => setComposeModalOpen(false)} language={language} />}
            {selectedPostForDetail && <PostDetailModal post={selectedPostForDetail} user={user} onClose={handleClosePostDetail} requestLogin={() => setLoginModalOpen(true)} language={language} />}
            {selectedStoryUser && (
                <Suspense fallback={null}>
                    <StoryViewModal storyUser={selectedStoryUser} onClose={() => setSelectedStoryUser(null)} onSelectProfile={(user) => { setSelectedStoryUser(null); handleSelectProfile(user);}} user={user} requestLogin={() => setLoginModalOpen(true)} language={language}/>
                </Suspense>
            )}
        </div>
    );
};

export default App;