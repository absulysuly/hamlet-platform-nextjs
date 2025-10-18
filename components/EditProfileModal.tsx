import React, { useState } from 'react';
import { User, Language } from '../types.ts';
import { XMarkIcon } from './icons/Icons.tsx';
import { UI_TEXT } from '../translations.ts';

interface EditProfileModalProps {
    user: User;
    onClose: () => void;
    onSave: (updates: Partial<User>) => void;
    language: Language;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave, language }) => {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio || '');
    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
    const texts = UI_TEXT[language];

    const handleSave = () => {
        if (name.trim()) {
            onSave({ name, bio, avatarUrl });
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="glass-card rounded-lg shadow-xl w-full max-w-lg p-6 relative text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{texts.editProfile}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-300">{texts.avatarUrl}</label>
                        <input
                            type="text"
                            id="avatarUrl"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-hot-pink"
                            placeholder={texts.avatarUrlPlaceholder}
                        />
                    </div>
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">{texts.name}</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                             className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-hot-pink"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-slate-300">{texts.biography}</label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full p-2 border border-white/20 rounded-md bg-white/10 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-hot-pink"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold bg-white/10 text-theme-text-base rounded-full hover:bg-white/20"
                    >
                        {texts.cancel}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!name.trim()}
                        className="px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {texts.saveChanges}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;