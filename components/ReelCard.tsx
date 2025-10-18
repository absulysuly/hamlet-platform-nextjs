import React from 'react';
import { Post } from '../types.ts';
import { PlayIcon, VerifiedIcon, HeartIcon, CommentIcon } from './icons/Icons.tsx';

interface ReelCardProps {
    reel: Post;
    onSelectReel: (reel: Post) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, onSelectReel }) => {
    return (
        <div 
            onClick={() => onSelectReel(reel)}
            className="w-full aspect-[9/16] glass-card rounded-2xl overflow-hidden relative group cursor-pointer"
        >
            <video
                src={reel.mediaUrl}
                className="w-full h-full object-cover absolute inset-0"
                preload="metadata"
                muted
                playsInline
            />
            
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayIcon className="w-16 h-16 text-white drop-shadow-lg" />
            </div>

            <div className="absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                <div className="flex items-center space-x-2">
                    <img className="w-9 h-9 rounded-full border-2 border-white/80" src={reel.author.avatarUrl} alt={reel.author.name} />
                    <h3 className="font-semibold text-sm flex items-center text-white">
                        {reel.author.name}
                        {reel.author.verified && <VerifiedIcon className="w-4 h-4 ml-1 text-white" />}
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-white mb-2">{reel.content}</p>
                    <div className="flex items-center space-x-4 text-white text-xs">
                        <div className="flex items-center space-x-1">
                            <HeartIcon className="w-4 h-4" />
                            <span>{reel.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <CommentIcon className="w-4 h-4" />
                            <span>{reel.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReelCard;