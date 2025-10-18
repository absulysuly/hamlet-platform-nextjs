import React, { useState, useEffect } from 'react';
import { Post, User, Language } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import PostCard from '../PostCard.tsx';
import Spinner from '../Spinner.tsx';
import { UI_TEXT } from '../../translations.ts';
import SkeletonPostCard from '../SkeletonPostCard.tsx';


interface WhisperViewProps {
    user: User | null;
    requestLogin: () => void;
    language: Language;
    onSelectAuthor: (author: User) => void;
    onSelectPost: (post: Post) => void;
}

const WhisperView: React.FC<WhisperViewProps> = ({ user, requestLogin, language, onSelectAuthor, onSelectPost }) => {
    const [whispers, setWhispers] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchWhispers = async () => {
            setIsLoading(true);
            try {
                // Simulate network delay for better UX
                await new Promise(resolve => setTimeout(resolve, 500));
                const data = await api.getWhispers({});
                setWhispers(data);
            } catch (error) {
                console.error("Failed to fetch whispers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWhispers();
    }, []);

    if (isLoading) {
        return (
            <div className="mt-4">
                {[...Array(3)].map((_, i) => <SkeletonPostCard key={i} />)}
            </div>
        );
    }

    return (
        <div className="mt-4">
            {whispers.length > 0 ? (
                whispers.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        user={user}
                        requestLogin={requestLogin}
                        language={language}
                        onSelectAuthor={onSelectAuthor}
                        onSelectPost={onSelectPost}
                    />
                ))
            ) : (
                <p className="text-center py-10 text-theme-text-muted">{texts.noPostsFound}</p>
            )}
        </div>
    );
};

export default WhisperView;