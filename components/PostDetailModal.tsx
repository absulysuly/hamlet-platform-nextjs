import React from 'react';
import { Post, User, Language } from '../types.ts';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, XMarkIcon } from './icons/Icons.tsx';
import AudioPlayer from './AudioPlayer.tsx';

interface PostDetailModalProps {
    post: Post;
    user: User | null;
    onClose: () => void;
    requestLogin: () => void;
    language: Language;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, user, onClose, requestLogin, language }) => {

    const handleInteraction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        if (!user) {
            e.preventDefault();
            requestLogin();
        } else {
            action();
        }
    };
    
    // Mock handlers for modal interactions
    const handleLike = () => console.log('Liked post in modal');
    const handleComment = () => console.log('Comment action placeholder in modal');
    const handleShare = () => console.log('Share action placeholder in modal');

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="glass-card rounded-xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar"
                onClick={(e) => e.stopPropagation()}
            >
                 <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-10 bg-white/10 text-white rounded-full p-1 hover:bg-white/30"
                    aria-label="Close post detail"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                
                {/* Modal Content */}
                <div className="p-4">
                    {/* Author Header */}
                    <div className="flex items-center space-x-3">
                        <img className="w-11 h-11 rounded-full ring-2 ring-white/50" src={post.author.avatarUrl} alt={post.author.name} />
                        <div>
                            <p className="text-sm font-semibold text-theme-text-base flex items-center">
                                {post.author.name}
                                {post.author.verified && <VerifiedIcon className="w-4 h-4 text-primary ml-1.5" />}
                            </p>
                            <p className="text-xs text-theme-text-muted">{post.timestamp}</p>
                        </div>
                    </div>
                    
                    {/* Content */}
                    {(post.type as string) === 'VoiceNote' ? (
                        <AudioPlayer src={post.mediaUrl || ''} governorate={post.author.governorate} />
                    ) : (
                        <div className="my-4">
                            <p className="text-theme-text-base text-base whitespace-pre-line font-arabic">{post.content}</p>
                        </div>
                    )}
                </div>

                {/* Image */}
                {post.mediaUrl && (post.type as string) !== 'VoiceNote' && (
                    <div className="px-2 pb-2">
                        <img
                            onClick={onClose}
                            className="w-full object-contain max-h-[60vh] rounded-lg cursor-pointer"
                            src={post.mediaUrl}
                            alt="Post media"
                        />
                    </div>
                )}
                
                {/* Actions */}
                <div className="px-4 pb-2 border-t border-[var(--color-glass-border)]">
                    <div className="flex justify-around items-center text-theme-text-base mt-2">
                        <button onClick={(e) => handleInteraction(e, handleLike)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center">
                            <HeartIcon className="w-6 h-6" />
                            <span className="font-semibold text-xs">Like</span>
                        </button>
                        <button onClick={(e) => handleInteraction(e, handleComment)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center">
                            <CommentIcon className="w-6 h-6" />
                            <span className="font-semibold text-xs">Comment</span>
                        </button>
                        <button onClick={(e) => handleInteraction(e, handleShare)} className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-primary/10 w-full justify-center">
                            <ShareIcon className="w-6 h-6" />
                            <span className="font-semibold text-xs">Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;