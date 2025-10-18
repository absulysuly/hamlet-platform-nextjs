
import React from 'react';
import Card from '../components/ui/Card.tsx';
import { usePartyData } from '../hooks/usePartyData.ts';
import { Candidate } from '../types.ts';
import { VerifiedIcon } from '../../icons/Icons.tsx';

interface PoliticalPartyPageProps {
    id: string;
    onNavigate: (path: string) => void;
}

const CandidatePill: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div className="glass-card rounded-lg p-3 flex items-center space-x-4">
        <img src={candidate.imageUrl} alt={candidate.name} className="w-12 h-12 rounded-full ring-2 ring-white/30" />
        <div>
            <h4 className="font-bold text-white flex items-center">
                {candidate.name}
                {candidate.verified && <VerifiedIcon className="w-4 h-4 text-brand-teal ml-2" />}
            </h4>
            <p className="text-sm text-slate-400">{candidate.party}</p>
        </div>
    </div>
);


const PoliticalPartyPage: React.FC<PoliticalPartyPageProps> = ({ id, onNavigate }) => {
    const { data, isLoading, error } = usePartyData(id);

    if (isLoading) {
        return <div className="text-center py-20 text-white">Loading party data...</div>;
    }

    if (error || !data) {
        return <div className="text-center py-20 text-red-400">Error: {error?.message || 'Party not found.'}</div>;
    }

    const { party, candidates } = data;

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="mb-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <img src={party.logoUrl} alt={`${party.name} logo`} className="w-32 h-32 rounded-full bg-white p-2" />
                            <div className="text-center md:text-right">
                                <h1 className="text-4xl font-extrabold text-white">{party.name}</h1>
                                <p className="mt-2 text-xl text-slate-300">{party.description}</p>
                                <div className="mt-4 text-slate-400">
                                    <span><strong>الزعيم:</strong> {party.leader}</span> | <span><strong>تأسس:</strong> {party.founded}</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <section id="candidates">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">مرشحو الحزب</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {candidates.map(candidate => (
                                <CandidatePill key={candidate.id} candidate={candidate} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PoliticalPartyPage;
