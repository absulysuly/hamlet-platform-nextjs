import React, { useState } from 'react';
import { XMarkIcon } from './icons/Icons.tsx';
import { Language } from '../types.ts';
import { UI_TEXT } from '../translations.ts';

interface CreateTopicModalProps {
    onClose: () => void;
    onCreate: (data: { title: string; firstMessage: string; category: string; language: Language }) => Promise<void>;
    defaultLanguage?: Language | null;
    language: Language;
}

const categories = ['Politics', 'Services & Infrastructure', 'Community', 'Economy', 'General'];
const languages: { code: Language, name: string }[] = [
    { code: 'ar', name: 'Arabic' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'en', name: 'English' },
];

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ onClose, onCreate, defaultLanguage, language: currentLanguage }) => {
    const [title, setTitle] = useState('');
    const [firstMessage, setFirstMessage] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [language, setLanguage] = useState<Language>(defaultLanguage || 'ar');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const texts = UI_TEXT[currentLanguage];

    const handleSubmit = async () => {
        if (title.trim() && firstMessage.trim() && !isSubmitting) {
            setIsSubmitting(true);
            await onCreate({ title, firstMessage, category, language });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="glass-card rounded-lg shadow-xl w-full max-w-lg p-6 relative text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold font-arabic">{texts.createNewDiscussionTitle}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="space-y-4 font-arabic">
                    <div>
                        <label htmlFor="topicTitle" className="block text-sm font-medium text-theme-text-muted">{texts.topicTitle}</label>
                        <input
                            type="text"
                            id="topicTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder={texts.topicTitlePlaceholder}
                        />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="topicCategory" className="block text-sm font-medium text-theme-text-muted">{texts.category}</label>
                            <select
                                id="topicCategory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                         <div>
                           <label htmlFor="topicLanguage" className="block text-sm font-medium text-theme-text-muted">{texts.mainLanguage}</label>
                           <select
                                id="topicLanguage"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as Language)}
                                className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="firstMessage" className="block text-sm font-medium text-theme-text-muted">{texts.firstMessage}</label>
                        <textarea
                            id="firstMessage"
                            value={firstMessage}
                            onChange={(e) => setFirstMessage(e.target.value)}
                            rows={4}
                            className="mt-1 block w-full p-2 border border-[var(--color-glass-border)] rounded-md bg-white/10 placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder={texts.firstMessagePlaceholder}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={!title.trim() || !firstMessage.trim() || isSubmitting}
                        className="px-6 py-2 font-bold bg-primary text-on-primary rounded-full transition-all hover:brightness-110 disabled:opacity-50"
                    >
                        {isSubmitting ? texts.submitting : texts.create}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTopicModal;