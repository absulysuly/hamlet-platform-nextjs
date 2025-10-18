import React, { useState, useEffect } from 'react';
import { User, Language, TeaHouseTopic, TeaHouseMessage } from '../../types.ts';
import { TeaHouseIcon, ArrowLeftIcon, MicIcon, DocumentIcon, PhotoIcon, PencilIcon } from '../icons/Icons.tsx';
import CreateTopicModal from '../CreateTopicModal.tsx';
import { UI_TEXT } from '../../translations.ts';
import * as api from '../../services/apiService.ts';
import Spinner from '../Spinner.tsx';

interface TeaHouseViewProps {
    user: User | null;
    requestLogin: () => void;
    language: Language;
}

const TeaHouseView: React.FC<TeaHouseViewProps> = ({ user, requestLogin, language }) => {
    const [topics, setTopics] = useState<TeaHouseTopic[]>([]);
    const [messages, setMessages] = useState<TeaHouseMessage[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<TeaHouseTopic | null>(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [isLoadingTopics, setIsLoadingTopics] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchTopics = async () => {
            setIsLoadingTopics(true);
            try {
                const fetchedTopics = await api.getTeaHouseTopics(language);
                setTopics(fetchedTopics);
            } catch (error) {
                console.error("Failed to fetch Tea House topics:", error);
            } finally {
                setIsLoadingTopics(false);
            }
        };

        fetchTopics();
        setSelectedTopic(null);
    }, [language]);

    useEffect(() => {
        if (selectedTopic) {
            const fetchMessages = async () => {
                setIsLoadingMessages(true);
                try {
                    const fetchedMessages = await api.getTeaHouseMessages(selectedTopic.id);
                    setMessages(fetchedMessages);
                } catch (error) {
                    console.error("Failed to fetch messages for topic:", selectedTopic.id, error);
                } finally {
                    setIsLoadingMessages(false);
                }
            };
            fetchMessages();
        }
    }, [selectedTopic]);


    const handleCreateTopic = async (data: { title: string; firstMessage: string; category: string; language: Language }) => {
        try {
            const newTopic = await api.createTeaHouseTopic(data);
            setTopics(prev => [newTopic, ...prev]);
            setCreateModalOpen(false);
        } catch (error) {
            console.error("Failed to create topic:", error);
            alert("Failed to create topic. Please try again.");
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedTopic) return;
        console.log("Sending message (simulation):", newMessage);
        // In a real app, you'd call an API to send the message.
        setNewMessage('');
    };
    
    // --- RENDER LOGIC ---

    if (selectedTopic) {
        // Conversation View
        return (
            <div className="flex flex-col h-full max-w-2xl mx-auto pb-24">
                <header className="p-4 flex items-center space-x-4 sticky top-0 bg-[var(--color-glass-bg)] backdrop-blur-md">
                    <button onClick={() => setSelectedTopic(null)} className="p-2 rounded-full hover:bg-white/10">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div>
                        <h2 className="font-bold text-lg">{selectedTopic.title}</h2>
                        <p className="text-xs text-theme-text-muted">{selectedTopic.participants} participants</p>
                    </div>
                </header>

                <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                    {isLoadingMessages ? <Spinner /> : messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.author.id === user?.id ? 'justify-end' : 'justify-start'}`}>
                            {msg.author.id !== user?.id && <img src={msg.author.avatarUrl} alt={msg.author.name} className="w-8 h-8 rounded-full" />}
                            <div className={`message-bubble ${msg.author.id === user?.id ? 'is-user' : 'is-other'}`}>
                                {msg.type === 'text' && <p>{msg.content}</p>}
                                {msg.type === 'image' && <img src={msg.mediaUrl} alt="shared" className="rounded-lg max-w-xs" />}
                                {msg.type === 'document' && msg.mediaUrl && (
                                     <a href={msg.mediaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-2 bg-black/20 rounded-lg hover:bg-black/40">
                                        <DocumentIcon className="w-6 h-6 flex-shrink-0" />
                                        <span className="text-sm font-medium truncate">{msg.content}</span>
                                     </a>
                                )}
                                <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </main>

                <footer className="fixed bottom-0 left-0 right-0 lg:left-64 teahouse-composer p-2">
                     <div className="max-w-2xl mx-auto flex items-center space-x-2">
                        <button className="p-3 rounded-full hover:bg-white/10 text-theme-text-muted"><PhotoIcon className="w-6 h-6"/></button>
                        <button className="p-3 rounded-full hover:bg-white/10 text-theme-text-muted"><DocumentIcon className="w-6 h-6"/></button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={texts.typeAMessage}
                            className="flex-grow p-3 border border-[var(--color-glass-border)] rounded-full bg-white/10 placeholder-theme-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button onClick={handleSendMessage} className="p-3 rounded-full bg-primary text-on-primary hover:brightness-110">
                            <PencilIcon className="w-6 h-6" />
                        </button>
                    </div>
                </footer>
            </div>
        );
    }

    // Topic List View
    return (
        <div className="p-4 sm:p-6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-arabic">{texts.teaHouse}</h1>
                <p className="text-theme-text-muted mt-1">
                    {texts.discussionsInLang}
                </p>
            </div>
            
            <div className="text-center mb-6">
                 <button 
                    onClick={() => user ? setCreateModalOpen(true) : requestLogin()}
                    className="send-btn max-w-xs"
                 >
                    {texts.createNewDiscussion}
                </button>
            </div>
            
            {isLoadingTopics ? <Spinner /> : (
                <div className="space-y-3">
                    {topics.map(topic => (
                        <div key={topic.id} onClick={() => user ? setSelectedTopic(topic) : requestLogin()} className="glass-card p-4 rounded-lg cursor-pointer hover:border-primary">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{topic.title}</h3>
                                    <p className="text-sm text-theme-text-muted">{topic.lastMessage}</p>
                                </div>
                                <span className="text-xs text-theme-text-muted whitespace-nowrap">{topic.lastActivity}</span>
                            </div>
                            <div className="text-xs text-theme-text-muted mt-2">{topic.participants} participants</div>
                        </div>
                    ))}
                    {topics.length === 0 && (
                        <p className="text-center text-theme-text-muted py-10">{texts.noDiscussionsFound}</p>
                    )}
                </div>
            )}
            
            {isCreateModalOpen && <CreateTopicModal onClose={() => setCreateModalOpen(false)} onCreate={handleCreateTopic} defaultLanguage={language} language={language} />}
        </div>
    );
};

export default TeaHouseView;