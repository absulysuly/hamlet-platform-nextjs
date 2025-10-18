import React, { useState } from 'react';
import { User, Post, PostPrivacy, Language } from '../../types.ts';
import { GlobeAltIcon, UsersIcon, LockClosedIcon, ChevronDownIcon } from '../icons/Icons.tsx';
import { UI_TEXT } from '../../translations.ts';

interface ComposeViewProps {
    user: User;
    onPost: (postDetails: Partial<Post>) => void;
    language: Language;
    postType?: 'Post' | 'Whisper';
}

const ComposeView: React.FC<ComposeViewProps> = ({ user, onPost, language, postType = 'Post' }) => {
    const [content, setContent] = useState('');
    const [privacy, setPrivacy] = useState<PostPrivacy>(PostPrivacy.Public);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const texts = UI_TEXT[language];
    const isWhisper = postType === 'Whisper';


    const handlePost = () => {
        if (content.trim()) {
            onPost({ content, type: 'Post', privacy });
            setContent('');
        }
    };
    
    const handleSaveDraft = () => {
        console.log("Saving draft:", { content, privacy });
        alert(texts.draftSaved);
    };

    const handlePreview = () => {
        alert(`${texts.previewingPost}:\n\n${content}\n\n${texts.privacy}: ${privacy}`);
    };

    const privacyOptions = [
        { value: PostPrivacy.Public, label: texts.public, icon: <GlobeAltIcon className="w-5 h-5" /> },
        { value: PostPrivacy.Friends, label: texts.friends, icon: <UsersIcon className="w-5 h-5" /> },
        { value: PostPrivacy.Private, label: texts.private, icon: <LockClosedIcon className="w-5 h-5" /> },
    ];
    const selectedPrivacyOption = privacyOptions.find(opt => opt.value === privacy)!;

    return (
        <div className="glass-card rounded-lg p-4">
            <div className="flex space-x-4">
                <img className="w-12 h-12 rounded-full ring-2 ring-white/50" src={user.avatarUrl} alt={user.name} />
                <div className="w-full">
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border-none rounded-md bg-transparent focus:ring-0 text-lg placeholder-theme-text-muted" rows={isWhisper ? 3 : 5} placeholder={texts.whatsOnYourMind} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                <div className="flex space-x-1 items-center">
                    <div className="relative">
                        <button onClick={() => setIsPrivacyOpen(!isPrivacyOpen)} className="flex items-center space-x-1 p-2 rounded-full hover:bg-white/10 text-theme-text-muted">
                            {selectedPrivacyOption.icon}
                            <span className="text-xs font-semibold hidden sm:inline">{selectedPrivacyOption.label}</span>
                            <ChevronDownIcon className="w-4 h-4" />
                        </button>
                        {isPrivacyOpen && (
                            <div className="absolute bottom-full mb-2 w-48 glass-card rounded-md shadow-lg z-10">
                                {privacyOptions.map(option => (
                                    <button key={option.value} onClick={() => { setPrivacy(option.value); setIsPrivacyOpen(false); }} className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-theme-text-base hover:bg-white/10">
                                        {option.icon} <span>{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {!isWhisper && (
                         <>
                            <button onClick={handleSaveDraft} className="px-4 py-2 text-sm font-semibold bg-white/10 text-theme-text-base rounded-full hover:bg-white/20">{texts.saveDraft}</button>
                            <button onClick={handlePreview} className="px-4 py-2 text-sm font-semibold bg-white/10 text-theme-text-base rounded-full hover:bg-white/20">{texts.preview}</button>
                         </>
                    )}
                    <button onClick={handlePost} disabled={!content.trim()} className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed">
                        {texts.post}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComposeView;