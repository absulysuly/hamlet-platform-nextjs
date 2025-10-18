import React, { useState, useEffect } from 'react';
import ManagementPageHeader from '../components/ManagementPageHeader.tsx';
import { SparklesIcon } from '../../icons/Icons.tsx';
import { useEnrichmentData, useAllCandidates } from '../hooks/useManagementData.ts';

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-formal-primary-100 p-4 rounded-lg text-center border-l-4 border-formal-primary-500">
        <p className="text-2xl font-bold text-formal-primary-700">{value}{typeof value === 'number' && '%'}</p>
        <p className="text-sm font-semibold text-official-700 mt-1">{title}</p>
    </div>
);

const CandidateEnrichmentPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const candidates = useAllCandidates();
    const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');
    const { data: enrichmentData, isLoading } = useEnrichmentData(selectedCandidateId);

    // Set default selection once candidates load
    useEffect(() => {
        if (candidates.length > 0 && !selectedCandidateId) {
            setSelectedCandidateId(candidates[0].id);
        }
    }, [candidates]);

    const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ManagementPageHeader
                title="Candidate Enrichment Tools"
                description="View enriched data profiles for candidates, including political stances, demographic analysis, and social media influence scores."
                onBack={() => onNavigate('/')}
                icon={<SparklesIcon className="w-8 h-8 text-formal-primary-600" />}
            />
            
            <div className="management-glass-card rounded-lg p-6 mb-6">
                <label htmlFor="candidate-select" className="block text-sm font-bold mb-2">Select a Candidate</label>
                <select 
                    id="candidate-select"
                    value={selectedCandidateId}
                    onChange={e => setSelectedCandidateId(e.target.value)}
                    className="w-full p-3 border border-official-300 rounded-md bg-official-100 text-official-900 focus:outline-none focus:ring-2 focus:ring-formal-primary-500"
                    disabled={candidates.length === 0}
                >
                    {candidates.map(c => <option key={c.id} value={c.id}>{c.name} - {c.party}</option>)}
                </select>
            </div>

            {isLoading ? <p className="text-center">Loading enrichment data...</p> : (
            selectedCandidate && enrichmentData ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile */}
                    <div className="lg:col-span-1 management-glass-card rounded-lg p-6 text-center">
                        <img src={selectedCandidate.avatarUrl} alt={selectedCandidate.name} className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-formal-primary-500" />
                        <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                        <p className="text-formal-primary-600 font-semibold">{selectedCandidate.party}</p>
                        <p className="text-sm text-official-700 mt-1">{selectedCandidate.governorate}</p>
                    </div>
                    {/* Middle Column: Enriched Data */}
                    <div className="lg:col-span-2 management-glass-card rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-2 border-b border-official-300 pb-2">Political Profile</h3>
                        <p className="text-sm mb-6">{enrichmentData.politicalProfile}</p>
                         <h3 className="font-bold text-lg mb-2 border-b border-official-300 pb-2">Influence Score</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <StatCard title="Social Reach" value={enrichmentData.influence.socialReach.toLocaleString()} />
                            <StatCard title="Engagement" value={enrichmentData.influence.engagementRate} />
                            <StatCard title="Sentiment" value={enrichmentData.influence.sentiment} />
                        </div>
                    </div>
                </div>
             ) : <p className="text-center management-glass-card p-8 rounded-lg">No enrichment data available for this candidate.</p>
            )}
        </div>
    );
};

export default CandidateEnrichmentPage;