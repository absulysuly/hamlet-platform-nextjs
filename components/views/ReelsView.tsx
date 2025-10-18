import React, { useState, useEffect } from 'react';
import { Governorate, Post, User, Language } from '../../types.ts';
import * as api from '../../services/apiService.ts';
import ReelCard from '../ReelCard.tsx';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface ReelsViewProps {
  selectedGovernorate: Governorate | 'All';
  selectedParty: string | 'All';
  onSelectReel: (reel: Post) => void;
  user: User | null;
  requestLogin: () => void;
  language: Language;
}

const ReelsView: React.FC<ReelsViewProps> = ({ selectedGovernorate, selectedParty, onSelectReel, user, requestLogin, language }) => {
  const [reelPosts, setReelPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const texts = UI_TEXT[language];

  useEffect(() => {
    const fetchReels = async () => {
      setIsLoading(true);
      try {
        const reels = await api.getPosts({ type: 'Reel', governorate: selectedGovernorate, party: selectedParty });
        setReelPosts(reels);
      } catch (error) {
        console.error("Failed to fetch reels:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReels();
  }, [selectedGovernorate, selectedParty]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 sm:p-6">
      {reelPosts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {reelPosts.map(post => (
                <ReelCard 
                    key={post.id} 
                    reel={post} 
                    onSelectReel={onSelectReel} 
                />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-center text-theme-text-muted py-16">
          <p>{texts.noReelsFound}</p>
        </div>
      )}
    </div>
  );
};

export default ReelsView;