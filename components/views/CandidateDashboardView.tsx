import React, { useState, useEffect } from 'react';
import { User, UserRole, Post, Language } from '../../types.ts';
import { VerifiedIcon, WhatsAppIcon, PhoneIcon, EmailIcon, MessageIcon, TikTokIcon, InstagramIcon, FacebookIcon, XIcon, YouTubeIcon, LinkIcon, DownloadIcon } from '../icons/Icons.tsx';
import PostCard from '../PostCard.tsx';
import * as api from '../../services/apiService.ts';
import QRCodeDisplay from '../QRCodeDisplay.tsx';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface CandidateDashboardViewProps {
    user: User;
    language: Language;
    onSelectProfile: (profile: User) => void;
    onSelectPost: (post: Post) => void;
}

const CandidateDashboardView: React.FC<CandidateDashboardViewProps> = ({ user, language, onSelectProfile, onSelectPost }) => {
    const [candidatePosts, setCandidatePosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [socialPlatforms, setSocialPlatforms] = useState([
        { name: 'TikTok', icon: <TikTokIcon className="w-6 h-6" />, linked: true },
        { name: 'Instagram', icon: <InstagramIcon className="w-6 h-6" />, linked: true },
        { name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" />, linked: false },
        { name: 'X', icon: <XIcon className="w-6 h-6" />, linked: true },
        { name: 'YouTube', icon: <YouTubeIcon className="w-6 h-6" />, linked: false },
    ]);
    const texts = UI_TEXT[language];
    
    // Ensure this view is only for candidates
    if (user.role !== UserRole.Candidate) {
        return <p>{texts.accessDenied}</p>;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await api.getPosts({ authorId: user.id });
                setCandidatePosts(posts);
            } catch (error) {
                console.error("Failed to fetch candidate posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [user.id]);

    const handleLinkToggle = (platformName: string) => {
        setSocialPlatforms(prevPlatforms =>
            prevPlatforms.map(p =>
                p.name === platformName ? { ...p, linked: !p.linked } : p
            )
        );
        // In a real app, an API call would be made here to update the user's settings.
    };
    
    const qrUrl = `https://civic-social.yoursite.web.app/discover?party=${user.partySlug}&gov=${user.governorateSlug}&candidate=${user.id}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrUrl)}`;

    const handleDownloadQr = async () => {
        try {
            const response = await fetch(qrImageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `qr-code-${user.partySlug}-${user.governorateSlug}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Failed to download QR code:', error);
            alert(texts.downloadQrFailed);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="glass-card rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <img className="w-24 h-24 rounded-full ring-4 ring-white/50 shadow-md" src={user.avatarUrl} alt={user.name} />
                        <div className="text-white">
                            <h2 className="text-2xl font-bold flex items-center">
                                {user.name}
                                {user.verified && <VerifiedIcon className="w-6 h-6 text-brand-hot-pink ml-2" />}
                            </h2>
                            <p className="text-md text-slate-400">{user.party} - {user.governorate}</p>
                            <div className="flex space-x-2 mt-4 text-slate-200">
                                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20"><WhatsAppIcon className="w-5 h-5" /></button>
                                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20"><PhoneIcon className="w-5 h-5" /></button>
                                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20"><EmailIcon className="w-5 h-5" /></button>
                                <button className="p-2 bg-white/10 rounded-full hover:bg-white/20"><MessageIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="border-t border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white">{texts.promoTools}</h3>
                    <p className="text-sm text-slate-400 mb-4 font-arabic">{texts.promoToolsDesc}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="bg-white p-4 rounded-lg inline-block">
                           <QRCodeDisplay url={qrUrl} />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="font-bold font-arabic text-lg">{texts.scanToSee}</p>
                             <button
                                onClick={handleDownloadQr}
                                className="mt-4 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold bg-primary text-on-primary rounded-full transition-all hover:brightness-110"
                            >
                                <DownloadIcon className="w-4 h-4" />
                                <span className="font-arabic">{texts.downloadQr}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-white">{texts.socialConnections}</h3>
                    <p className="text-sm text-slate-400 mb-4">{texts.socialConnectionsDesc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {socialPlatforms.map(platform => (
                            <div key={platform.name} className="flex items-center justify-between p-3 glass-card rounded-lg">
                                <div className="flex items-center space-x-3 text-white">
                                    {platform.icon}
                                    <span className="font-medium">{platform.name}</span>
                                </div>
                                {platform.linked ? (
                                    <button onClick={() => handleLinkToggle(platform.name)} className="text-xs font-semibold text-flag-red hover:underline">{texts.unlink}</button>
                                ) : (
                                    <button onClick={() => handleLinkToggle(platform.name)} className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold text-white bg-brand-hot-pink rounded-full transition-all hover:brightness-110">
                                        <LinkIcon className="w-3 h-3"/>
                                        <span>{texts.link}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4 text-white">{texts.myPosts}</h3>
                {isLoading ? (
                    <Spinner />
                ) : candidatePosts.length > 0 ? (
                    candidatePosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={() => {}} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />)
                ) : (
                    <p className="text-center py-10 text-slate-400">{texts.noPostsYet}</p>
                )}
            </div>
        </div>
    );
};

export default CandidateDashboardView;