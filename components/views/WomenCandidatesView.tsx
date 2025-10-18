import React, { useState, useEffect } from 'react';
import { User, UserRole, Language } from '../../types.ts';
import CandidatePill from '../CandidatePill.tsx';
import * as api from '../../services/apiService.ts';
import { ResponsiveGrid } from '../UI/Responsive.tsx';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface WomenCandidatesViewProps {
    onSelectCandidate: (candidate: User) => void;
    user: User | null;
    requestLogin: () => void;
    language: Language;
}

const WomenCandidatesView: React.FC<WomenCandidatesViewProps> = ({ onSelectCandidate, user, requestLogin, language }) => {
    const [candidates, setCandidates] = useState<User[]>([]);
    const [stats, setStats] = useState<{ total: number; women: number }>({ total: 0, women: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [femaleCandidates, candidateStats] = await Promise.all([
                    api.getUsers({ role: UserRole.Candidate, gender: 'Female' }),
                    api.getCandidateStats()
                ]);

                setCandidates(femaleCandidates);
                if (candidateStats) {
                    setStats({ total: candidateStats.total, women: candidateStats.women });
                }

            } catch (error) {
                console.error("Failed to fetch women candidates data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const womenPercentage = stats.total > 0 ? ((stats.women / stats.total) * 100).toFixed(1) : '0';

    return (
        <div className="p-4 sm:p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-arabic text-white">{texts.women}</h2>
                <p className="text-theme-text-muted mt-2 max-w-2xl mx-auto">{texts.empoweringWomenInPolitics}</p>
            </div>
            
            <div className="glass-card p-4 text-center mb-6 max-w-md mx-auto">
                 <p className="text-xl font-bold text-brand-hot-pink">{womenPercentage}%</p>
                 <p className="text-sm text-theme-text-muted">of candidates are women. Discover their profiles and platforms.</p>
            </div>

             {isLoading ? (
                <Spinner />
             ) : (
                <ResponsiveGrid>
                    {candidates.length > 0 ? (
                        candidates.map(candidate => (
                            <CandidatePill 
                                key={candidate.id} 
                                candidate={candidate} 
                                onSelect={onSelectCandidate} 
                                user={user}
                                requestLogin={requestLogin}
                                language={language}
                            />
                        ))
                    ) : (
                        <p className="text-theme-text-muted col-span-full text-center mt-8">{texts.noCandidatesFoundQR}</p>
                    )}
                </ResponsiveGrid>
            )}
        </div>
    );
};

export default WomenCandidatesView;