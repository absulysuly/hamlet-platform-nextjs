import React, { useState, useEffect } from 'react';
import { User, UserRole, Post, Language } from '../../types.ts';
import { VerifiedIcon, WhatsAppIcon, PhoneIcon, EmailIcon, MessageIcon, ShareIcon, FemaleIcon } from '../icons/Icons.tsx';
import PostCard from '../PostCard.tsx';
import * as api from '../../services/apiService.ts';
import QRCodeModal from '../QRCodeModal.tsx';
import { UI_TEXT } from '../../translations.ts';

interface CandidateProfileViewProps {
    candidate: User;
    user: User | null;
    requestLogin: () => void;
    language: Language;
    onSelectProfile: (profile: User) => void;
    onSelectPost: (post: Post) => void;
}

const CandidateProfileView: React.FC<CandidateProfileViewProps> = ({ candidate, user, requestLogin, language, onSelectProfile, onSelectPost }) => {
    const [candidatePosts, setCandidatePosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isQrModalOpen, setQrModalOpen] = useState(false);
    const texts = UI_TEXT[language];

    useEffect(() => {
        if (candidate.role !== UserRole.Candidate) return;

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await api.getPosts({ authorId: candidate.id });
                setCandidatePosts(posts);
            } catch (error) {
                console.error("Failed to fetch candidate posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [candidate.id, candidate.role]);

    if (candidate.role !== UserRole.Candidate) {
        return <p className="p-6 text-center">{texts.notACandidate}</p>;
    }
    
    const handleInteraction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            requestLogin();
        }
        // TODO: Wire up contact actions to backend
    };

    const qrUrl = `https://civic-social.yoursite.web.app/discover?party=${candidate.partySlug}&gov=${candidate.governorateSlug}&candidate=${candidate.id}`;

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-white">
            <div className="glass-card rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                        <img loading="lazy" className="w-24 h-24 rounded-full ring-4 ring-white/50 shadow-md" src={candidate.avatarUrl} alt={candidate.name} />
                        <div>
                            <h2 className="text-2xl font-bold flex items-center">
                                {candidate.name}
                                {candidate.verified && <VerifiedIcon className="w-6 h-6 text-brand-hot-pink ml-2" />}
                                {candidate.gender === 'Female' && <FemaleIcon className="w-6 h-6 text-brand-hot-pink ml-2" />}
                            </h2>
                            <p className="text-md text-slate-400">{candidate.party} - {candidate.governorate}</p>
                            <p className="text-sm mt-2 text-slate-200">{candidate.bio || texts.noBio}</p>
                            <div className="flex space-x-2 mt-4 text-slate-200">
                                <button onClick={handleInteraction} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><WhatsAppIcon className="w-5 h-5" /></button>
                                <button onClick={handleInteraction} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><PhoneIcon className="w-5 h-5" /></button>
                                <button onClick={handleInteraction} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><EmailIcon className="w-5 h-5" /></button>
                                <button onClick={handleInteraction} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><MessageIcon className="w-5 h-5" /></button>
                                <button onClick={() => setQrModalOpen(true)} className="p-2 bg-white/10 rounded-full hover:bg-white/20" title="Share with QR Code"><ShareIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 className="text-xl font-bold mb-4">{texts.postsBy.replace('{name}', candidate.name)}</h3>
                {isLoading ? (
                    <p className="text-center py-10 text-slate-400">{texts.loadingPosts}</p>
                ) : candidatePosts.length > 0 ? (
                    candidatePosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={requestLogin} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />)
                ) : (
                    <p className="text-center py-10 text-slate-400">{texts.noPostsYetCandidate}</p>
                )}
            </div>
             {isQrModalOpen && (
                <QRCodeModal
                    url={qrUrl}
                    onClose={() => setQrModalOpen(false)}
                    title={`Share ${candidate.name}'s Party Info`}
                />
            )}
        </div>
    );
};

export default CandidateProfileView;