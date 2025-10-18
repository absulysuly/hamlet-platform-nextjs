import React, { useState, useEffect } from 'react';
import { User, UserRole, Post, Language } from '../../types.ts';
import { VerifiedIcon, EditIcon } from '../icons/Icons.tsx';
import PostCard from '../PostCard.tsx';
import ComposeView from './ComposeView.tsx';
import EditProfileModal from '../EditProfileModal.tsx';
import * as api from '../../services/apiService.ts';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface UserProfileViewProps {
    user: User;
    onUpdateUser: (user: User) => void;
    language: Language;
    onSelectProfile: (profile: User) => void;
    onSelectPost: (post: Post) => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user, onUpdateUser, language, onSelectProfile, onSelectPost }) => {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await api.getPosts({ authorId: user.id });
                setUserPosts(posts);
            } catch (error) {
                console.error("Failed to fetch user posts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [user.id]);

    const handlePost = (postDetails: Partial<Post>) => {
        api.createPost(postDetails, user).then(newPost => {
            setUserPosts(prevPosts => [newPost, ...prevPosts]);
        });
    };

    const handleSaveProfile = async (updates: Partial<User>) => {
        const updatedUser = await api.updateUser(user.id, updates);
        if (updatedUser) {
            onUpdateUser(updatedUser);
        }
        setEditModalOpen(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 text-white">
            {/* Profile Header */}
            <div className="glass-card p-6 mb-6 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <img loading="lazy" className="w-24 h-24 rounded-full ring-4 ring-white/50 shadow-md" src={user.avatarUrl} alt={user.name} />
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                             <h2 className="text-2xl font-bold flex items-center">
                                {user.name}
                                {user.verified && <VerifiedIcon className="w-6 h-6 text-brand-hot-pink ml-2" />}
                            </h2>
                            <button
                                onClick={() => setEditModalOpen(true)}
                                className="flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-md hover:bg-primary/20"
                            >
                                <EditIcon className="w-4 h-4"/>
                                <span>{texts.editProfile}</span>
                            </button>
                        </div>
                        <p className="text-md text-slate-400">{user.party} - {user.governorate}</p>
                        <p className="text-sm mt-2 text-slate-200">{user.bio || texts.noBio}</p>
                    </div>
                </div>
            </div>

            {/* Post Composer */}
            {user.role === UserRole.Candidate && (
                <div className="mb-6">
                    <ComposeView user={user} onPost={handlePost} language={language} />
                </div>
            )}


            {/* User's Post Feed */}
            <div>
                <h3 className="text-xl font-bold mb-4">{texts.myWall}</h3>
                {isLoading ? (
                    <Spinner />
                ) : userPosts.length > 0 ? (
                    userPosts.map(post => <PostCard key={post.id} post={post} user={user} requestLogin={() => {}} language={language} onSelectAuthor={onSelectProfile} onSelectPost={onSelectPost} />)
                ) : (
                    <p className="text-center py-10 text-slate-400">{texts.noPostsYetUser}</p>
                )}
            </div>

            {isEditModalOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveProfile}
                    language={language}
                />
            )}
        </div>
    );
};

export default UserProfileView;