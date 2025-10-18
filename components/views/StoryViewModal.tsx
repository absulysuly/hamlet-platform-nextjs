import React, { useState, useEffect, useRef } from 'react';
import { User, Post, Language } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import { XMarkIcon } from '../icons/Icons.tsx';
import { UI_TEXT } from '../../translations.ts';

interface StoryViewModalProps {
    storyUser: User;
    onClose: () => void;
    onSelectProfile: (user: User) => void;
    user: User | null;
    requestLogin: () => void;
    language: Language;
}

const StoryViewModal: React.FC<StoryViewModalProps> = ({ storyUser, onClose, onSelectProfile, user, requestLogin, language }) => {
    const [stories, setStories] = useState<Post[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef<number | null>(null);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchStories = async () => {
            setIsLoading(true);
            const userPosts = await api.getPosts({ authorId: storyUser.id });
            const storyPosts = userPosts.filter(p => p.mediaUrl).slice(0, 8); // Limit to 8 stories
            
            if (storyPosts.length === 0) {
                 // If no stories, close modal after a short delay
                setTimeout(onClose, 500);
            } else {
                setStories(storyPosts);
                setIsLoading(false);
                setCurrentIndex(0);
            }
        };
        fetchStories();
    }, [storyUser, onClose]);

    const goToNext = () => {
        setCurrentIndex(prev => {
            if (prev < stories.length - 1) {
                return prev + 1;
            }
            onClose(); // Close after the last story
            return prev;
        });
    };

    const goToPrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
    };

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (stories.length === 0 || isLoading) return;

        const currentStory = stories[currentIndex];
        // Treat Reels as video stories, anything else with media as an image story
        if (currentStory.type !== 'Reel') {
            timerRef.current = window.setTimeout(() => {
                goToNext();
            }, 5000); // 5 seconds for images
        }
        
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [currentIndex, stories, isLoading, goToNext]);

    const handleVideoEnd = () => {
        goToNext();
    };

    const ProgressBar = () => (
        <div className="absolute top-4 left-2 right-2 z-20 flex gap-1">
            {stories.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    {index < currentIndex && <div className="h-1 bg-white rounded-full w-full" />}
                    {index === currentIndex && (
                        <div
                            key={currentIndex} // Reset animation on change
                            className="h-1 bg-white rounded-full story-progress-bar"
                            style={{ animationDuration: stories[currentIndex].type === 'Reel' ? '0s' : '5s' }}
                        />
                    )}
                </div>
            ))}
        </div>
    );

    const currentStory = stories[currentIndex];

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">
                {texts.loadingStories}
            </div>
        );
    }
    
    if (stories.length === 0) {
        // This state is brief before onClose is called, but good to handle
        return (
             <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">
                {texts.noStories}
             </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50">
            {currentStory && (
                <>
                    <ProgressBar />

                    <div className="absolute top-6 left-2 right-2 z-20 flex items-center justify-between p-2">
                        <button onClick={() => onSelectProfile(storyUser)} className="flex items-center gap-2 group">
                            <img src={storyUser.avatarUrl} className="w-8 h-8 rounded-full" alt={storyUser.name} />
                            <span className="text-white font-bold text-sm group-hover:underline">{storyUser.name}</span>
                        </button>
                        <button onClick={onClose} className="p-1 rounded-full bg-black/30 hover:bg-black/60">
                            <XMarkIcon className="w-6 h-6 text-white"/>
                        </button>
                    </div>

                    <div className="w-full h-full flex items-center justify-center p-2">
                        {currentStory.type === 'Reel' ? (
                            <video 
                                key={currentStory.id} 
                                src={currentStory.mediaUrl} 
                                className="max-w-full max-h-full rounded-lg" 
                                autoPlay 
                                onEnded={handleVideoEnd}
                                playsInline
                            />
                        ) : (
                            <img src={currentStory.mediaUrl} className="max-w-full max-h-full rounded-lg" alt="Story content" />
                        )}
                    </div>
                    
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-full flex justify-between">
                        <button onClick={goToPrev} className="w-1/3 h-full" aria-label="Previous story"></button>
                        <button onClick={goToNext} className="w-1/3 h-full" aria-label="Next story"></button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StoryViewModal;