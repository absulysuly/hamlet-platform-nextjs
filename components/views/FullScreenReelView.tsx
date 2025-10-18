import React from 'react';
import { Post, User } from '../../types.ts';
import { VerifiedIcon, HeartIcon, CommentIcon, ShareIcon, DonateIcon, ArrowLeftIcon } from '../icons/Icons.tsx';

interface FullScreenReelViewProps {
    reel: Post;
    onClose: () => void;
    user: User | null;
    requestLogin: () => void;
}

const FullScreenReelView: React.FC<FullScreenReelViewProps> = ({ reel, onClose, user, requestLogin }) => {
    
    const handleInteraction = (e: React.MouseEvent) => {
        if (!user) {
            e.preventDefault();
            e.stopPropagation();
            requestLogin();
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in">
            <div className="relative h-full w-full max-w-md bg-black">
                
                <video
                    src={reel.mediaUrl}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    loop
                    playsInline
                />

                {/* Back Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 left-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors z-20"
                    aria-label="Close reel view"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>

                {/* Overlaid UI */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white z-10">
                    <div className="flex items-end">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <img className="w-10 h-10 rounded-full border-2 border-white" src={reel.author.avatarUrl} alt={reel.author.name} />
                                <div>
                                    <h3 className="font-semibold text-sm flex items-center">{reel.author.name} {reel.author.verified && <VerifiedIcon className="w-4 h-4 ml-1 text-white" />}</h3>
                                    <button onClick={handleInteraction} className="px-3 py-0.5 text-xs font-bold bg-white text-mocha-black rounded-md mt-1 hover:bg-neutral-gray-light">Follow</button>
                                </div>
                            </div>
                            <p className="text-sm mt-2">{reel.content}</p>
                            {reel.isSponsored && <p className="text-xs font-bold mt-1 bg-yellow-400 text-black inline-block px-2 py-0.5 rounded">Sponsored</p>}
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                             <button onClick={handleInteraction} className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30"><HeartIcon className="w-7 h-7" /></div>
                                <span className="text-xs font-bold drop-shadow-md">{reel.likes}</span>
                            </button>
                            <button onClick={handleInteraction} className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30"><CommentIcon className="w-7 h-7" /></div>
                                <span className="text-xs font-bold drop-shadow-md">{reel.comments}</span>
                            </button>
                            <button onClick={handleInteraction} className="flex flex-col items-center">
                               <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30"><ShareIcon className="w-7 h-7" /></div>
                                <span className="text-xs font-bold drop-shadow-md">{reel.shares}</span>
                            </button>
                            <button onClick={handleInteraction} className="flex flex-col items-center">
                                <div className="w-12 h-12 flex items-center justify-center bg-flag-green rounded-full hover:bg-green-700"><DonateIcon className="w-7 h-7" /></div>
                                <span className="text-xs font-bold drop-shadow-md">Donate</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullScreenReelView;