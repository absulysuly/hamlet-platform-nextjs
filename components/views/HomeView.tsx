import React, { useState, useEffect, Suspense, lazy } from 'react';
import { User, UserRole, Governorate, Language, MainContentTab, AppTab, Post } from '../../types.ts';
import { GOVERNORATES, GOVERNORATE_AR_MAP } from '../../constants.ts';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';

import ComposeView from './ComposeView.tsx';
import PostCard from '../PostCard.tsx';
import TopNavBar from '../TopNavBar.tsx';
import Spinner from '../Spinner.tsx';
import ReelsView from './ReelsView.tsx';
import CandidatesView from './CandidatesView.tsx';
import SkeletonPostCard from '../SkeletonPostCard.tsx';

// Lazy load views
const WhisperView = lazy(() => import('./WhisperView.tsx'));
const WomenCandidatesView = lazy(() => import('./WomenCandidatesView.tsx'));
const MinoritiesView = lazy(() => import('./MinoritiesView.tsx'));
const CrossPlatformNavigationView = lazy(() => import('./CrossPlatformNavigationView.tsx'));


interface HomeViewProps {
    user: User | null;
    requestLogin: () => void;
    selectedGovernorate: Governorate | 'All';
    onGovernorateChange: (gov: Governorate | 'All') => void;
    selectedParty: string | 'All';
    onPartyChange: (party: string | 'All') => void;
    parties: string[];
    onSelectProfile: (profile: User) => void;
    onSelectReel: (reel: Post) => void;
    onSelectPost: (post: Post) => void;
    onSelectStory: (user: User) => void;
    language: Language;
    activeTab: MainContentTab;
    onTabChange: (tab: MainContentTab) => void;
    onCompose: () => void;
}

const SUB_TABS: MainContentTab[] = [AppTab.Feed, AppTab.Real, AppTab.Candidates, AppTab.Women, AppTab.Whisper, AppTab.Components];

const getThemeClassForTab = (tab: MainContentTab) => {
    switch (tab) {
        case AppTab.Real: return 'theme-reels';
        case AppTab.Candidates: return 'theme-candidates';
        case AppTab.Whisper: return 'theme-whisper';
        default: return 'theme-default';
    }
};

const HomeView: React.FC<HomeViewProps> = ({ user, requestLogin, selectedGovernorate, onGovernorateChange, selectedParty, onPartyChange, parties, onSelectProfile, onSelectReel, onSelectPost, onSelectStory, language, activeTab, onTabChange, onCompose }) => {
    
    const [socialPosts, setSocialPosts] = useState<Post[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);
    const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');

    useEffect(() => {
        if (activeTab === AppTab.Feed) {
            const fetchFeedData = async () => {
                setIsLoadingPosts(true);
                try {
                    const postsData = await api.getPosts({ governorate: selectedGovernorate, party: selectedParty });
                    setSocialPosts(postsData);
                } catch (error) {
                    console.error("Failed to fetch feed data:", error);
                } finally {
                    setIsLoadingPosts(false);
                }
            };
            fetchFeedData();
        }
    }, [activeTab, selectedGovernorate, selectedParty]);

    const handlePost = (postDetails: Partial<Post>) => {
        if (!user) return;
        api.createPost(postDetails, user).then(newPost => {
            if (activeTab === AppTab.Feed) {
                setSocialPosts(prevPosts => [newPost, ...prevPosts]);
            }
            alert("Post created successfully (simulation).");
        });
    };
    
    const handleFollow = (e: React.MouseEvent, candidateId: string) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            api.followCandidate(candidateId);
        }
    };

    const texts = UI_TEXT[language];
    
    const CandidateFilters = () => (
        <div className="flex flex-col gap-4 p-4 glass-card my-4 rounded-lg shadow-lg w-full max-w-md mx-auto">
             <h2 className="text-xl font-bold text-center text-theme-text-base font-arabic">
                Iraqi National Election Candidates
             </h2>
            <div>
                <label htmlFor="gov-filter" className="block text-sm font-medium text-theme-text-muted font-arabic">{texts.governorate}</label>
                <select id="gov-filter" value={selectedGovernorate} onChange={(e) => onGovernorateChange(e.target.value as Governorate | 'All')} className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.allIraq}</option>
                    {GOVERNORATES.map(gov => <option key={gov} value={gov}>{GOVERNORATE_AR_MAP[gov]}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="party-filter" className="block text-sm font-medium text-theme-text-muted font-arabic">{texts.party}</label>
                <select id="party-filter" value={selectedParty} onChange={(e) => onPartyChange(e.target.value)} className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.all}</option>
                    {parties.map(party => <option key={party} value={party}>{party}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="gender-filter" className="block text-sm font-medium text-theme-text-muted font-arabic">{texts.gender}</label>
                <select id="gender-filter" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value as 'All' | 'Male' | 'Female')} className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 text-theme-text-base focus:outline-none focus:ring-1 focus:ring-primary font-arabic text-right">
                    <option value="All">{texts.all}</option>
                    <option value="Male">{texts.male}</option>
                    <option value="Female">{texts.female}</option>
                </select>
            </div>
        </div>
    );
    
    const renderTabContent = () => {
        switch (activeTab) {
            case AppTab.Feed:
                return (
                    <>
                        <div className="mt-4">
                            {user ? <ComposeView user={user} onPost={handlePost} language={language} postType="Post" />
                                : <div onClick={requestLogin} className="glass-card rounded-lg p-3 flex items-center space-x-4 cursor-pointer hover:border-primary"><div className="flex-1 text-theme-text-muted font-arabic">{texts.whatsOnYourMind}</div><button className="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-full">{texts.post}</button></div>
                            }
                        </div>
                        <div className="mt-4">
                            {isLoadingPosts ? [...Array(3)].map((_, i) => <SkeletonPostCard key={i} />)
                                : socialPosts.length > 0 ? socialPosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />)
                                : <p className="text-center py-10 text-theme-text-muted">{texts.noPostsFound}</p>
                            }
                        </div>
                    </>
                );
            case AppTab.Real:
                return (
                    <div className="mt-4">
                        <ReelsView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} onSelectReel={onSelectReel} user={user} requestLogin={requestLogin} language={language} />
                    </div>
                );
            case AppTab.Candidates:
                 return (
                    <div className="mt-6">
                        <CandidatesView selectedGovernorate={selectedGovernorate} selectedParty={selectedParty} selectedGender={genderFilter} onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} language={language}/>
                    </div>
                );
            case AppTab.Women:
                return (
                    <Suspense fallback={<Spinner />}>
                        <WomenCandidatesView onSelectCandidate={onSelectProfile} user={user} requestLogin={requestLogin} language={language} />
                    </Suspense>
                );
            case AppTab.Minorities:
                return (
                    <Suspense fallback={<Spinner />}>
                        <MinoritiesView language={language} />
                    </Suspense>
                );
            case AppTab.Whisper:
                return (
                     <div className="mt-4">
                        {user && <div className="mb-4"><ComposeView user={user} onPost={handlePost} language={language} postType="Whisper" /></div>}
                         <Suspense fallback={<Spinner/>}>
                            <WhisperView user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />
                         </Suspense>
                    </div>
                );
            case AppTab.Components:
                return (
                    <Suspense fallback={<Spinner />}>
                        <CrossPlatformNavigationView onNavigateToCandidates={() => onTabChange(AppTab.Candidates)} onQrScan={() => alert('QR Scan not implemented yet.')} />
                    </Suspense>
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-0 sm:p-6">
            <main className="lg:col-span-3">
                 <div className="flex flex-col items-center">
                    <CandidateFilters />
                 </div>
                <div className="z-10 py-2 sticky top-14 lg:top-0 glass-nav lg:glass-card lg:rounded-t-xl">
                    <TopNavBar<MainContentTab>
                        tabs={SUB_TABS}
                        activeTab={activeTab}
                        onTabChange={onTabChange}
                        language={language}
                    />
                </div>
                
                <div className={`tab-content-wrapper ${getThemeClassForTab(activeTab)} px-4 sm:px-0`}>
                    {renderTabContent()}
                </div>
            </main>

            <aside className="hidden lg:block lg:col-span-1 space-y-6 pt-2">
                <div className="glass-card rounded-lg p-4">
                    <h3 className="font-bold mb-3 font-arabic">{texts.whoToFollow}</h3>
                    <div className="space-y-3">
                        <p className="text-xs text-theme-text-muted">{texts.noCandidatesToShow}</p>
                    </div>
                </div>

                <div className="glass-card rounded-lg p-4">
                    <h3 className="font-bold mb-3 font-arabic">{texts.platformRules}</h3>
                    <ul className="text-sm space-y-2 list-disc list-inside text-theme-text-muted font-arabic">
                        <li>{texts.rule1}</li>
                        <li>{texts.rule2}</li>
                        <li>{texts.rule3}</li>
                        <li>{texts.rule4}</li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default HomeView;