import React, { useState, useEffect } from 'react';
import { Governorate, Debate, UserRole, User, Language } from '../../types.ts';
import { DebateIcon, CalendarIcon, ChevronDownIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface DebatesViewProps {
    selectedGovernorate: Governorate | 'All';
    selectedParty: string | 'All';
    language: Language;
}

const DebateCard: React.FC<{ debate: Debate, language: Language }> = ({ debate, language }) => {
    const debateDate = new Date(debate.scheduledTime);
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' };
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const texts = UI_TEXT[language];
    
    const [reactions, setReactions] = useState(debate.reactions || { justice: 0, idea: 0, warning: 0 });

    const handleReaction = (type: 'justice' | 'idea' | 'warning') => {
        setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    };

    return (
        <div className="glass-card rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{debate.title}</h3>
                    {debate.isLive && (
                        <span className="flex items-center text-xs font-bold text-white bg-flag-red px-2 py-1 rounded-full">
                            <span className="w-2 h-2 mr-1.5 bg-white rounded-full animate-pulse"></span>
                            LIVE
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-400 mt-1">{debate.topic}</p>

                <div className="mt-4 flex items-center space-x-3 text-sm text-slate-300">
                    <CalendarIcon className="w-5 h-5 flex-shrink-0" />
                    <span>{debateDate.toLocaleDateString(undefined, dateOptions)} at {debateDate.toLocaleTimeString(undefined, timeOptions)}</span>
                </div>

                <div className="mt-4">
                    <p className="text-sm font-semibold mb-2 text-slate-200">Participants:</p>
                    <div className="flex -space-x-2">
                        {debate.participants.map(p => (
                            <img key={p.id} className="w-8 h-8 rounded-full border-2 border-white/50" src={p.avatarUrl} alt={p.name} title={p.name} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Reactions */}
            <div className="px-5 pb-4">
                <div className="flex justify-between items-center text-sm text-slate-400 mb-2 font-arabic">
                    <span>{reactions.justice} عدالة</span>
                    <span>{reactions.idea} فكرة</span>
                    <span>{reactions.warning} تحذير</span>
                </div>
                <div className="flex justify-around items-center bg-black/20 rounded-lg p-1">
                    <button onClick={() => handleReaction('justice')} className="p-2 text-2xl rounded-lg hover:bg-white/10">🙏</button>
                    <button onClick={() => handleReaction('idea')} className="p-2 text-2xl rounded-lg hover:bg-white/10">💡</button>
                    <button onClick={() => handleReaction('warning')} className="p-2 text-2xl rounded-lg hover:bg-white/10">⚠️</button>
                </div>
            </div>

            <div className="bg-black/20 px-5 py-3">
                <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-brand-hot-pink rounded-full transition-all hover:brightness-110 flex items-center justify-center space-x-2">
                    <DebateIcon className="w-5 h-5" />
                    <span>{debate.isLive ? texts.joinLiveDebate : texts.setReminder}</span>
                </button>
            </div>
        </div>
    );
};


const DebatesView: React.FC<DebatesViewProps> = ({ selectedGovernorate, selectedParty, language }) => {
    const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const texts = UI_TEXT[language];
    
    const [allCandidates, setAllCandidates] = useState<User[]>([]);
    const [filteredDebates, setFilteredDebates] = useState<Debate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getUsers({ role: UserRole.Candidate }).then(setAllCandidates);
    }, []);

    useEffect(() => {
        const fetchDebates = async () => {
            setIsLoading(true);
            try {
                const debates = await api.getDebates({
                    governorate: selectedGovernorate,
                    party: selectedParty,
                    participantIds: selectedCandidateIds,
                });
                setFilteredDebates(debates);
            } catch (error) {
                console.error("Failed to fetch debates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDebates();
    }, [selectedGovernorate, selectedParty, selectedCandidateIds]);
    
    const handleCandidateSelection = (candidateId: string) => {
        setSelectedCandidateIds(prev =>
            prev.includes(candidateId)
                ? prev.filter(id => id !== candidateId)
                : [...prev, candidateId]
        );
    };

    const selectedCandidates = allCandidates.filter(c => selectedCandidateIds.includes(c.id));

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h2 className="text-2xl font-bold text-white">{texts.debates}</h2>

                {/* Candidate Filter */}
                <div className="relative mt-4 sm:mt-0 w-full sm:w-72">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full flex justify-between items-center p-2 text-sm text-white border border-white/20 rounded-lg bg-white/10 focus:ring-brand-hot-pink focus:border-brand-hot-pink"
                    >
                        <span className="truncate pr-2">
                            {selectedCandidates.length > 0 ? selectedCandidates.map(c => c.name).join(', ') : texts.filterByCandidate}
                        </span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isFilterOpen && (
                        <div className="absolute z-10 top-full mt-1 w-full glass-card rounded-lg shadow-lg max-h-60 overflow-y-auto">
                           {selectedCandidateIds.length > 0 && (
                                <button
                                    onClick={() => setSelectedCandidateIds([])}
                                    className="w-full text-left px-3 py-2 text-sm font-semibold text-brand-hot-pink hover:bg-white/10 border-b border-white/20"
                                >
                                    {texts.clearSelection}
                                </button>
                           )}
                            {allCandidates.map(candidate => (
                                <label key={candidate.id} className="flex items-center px-3 py-2 hover:bg-white/10 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCandidateIds.includes(candidate.id)}
                                        onChange={() => handleCandidateSelection(candidate.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-brand-hot-pink focus:ring-brand-hot-pink bg-transparent"
                                    />
                                    <img src={candidate.avatarUrl} alt={candidate.name} className="w-6 h-6 rounded-full mx-2" />
                                    <span className="text-sm font-medium text-slate-200">{candidate.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDebates.length > 0 ? (
                        filteredDebates.map(debate => <DebateCard key={debate.id} debate={debate} language={language} />)
                    ) : (
                        <p className="text-theme-text-muted col-span-full text-center mt-8">
                            {texts.noDebatesFound}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DebatesView;