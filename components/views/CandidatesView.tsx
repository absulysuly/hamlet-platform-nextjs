// Fix: Populating components/views/CandidatesView.tsx with a list of candidates.
import React, { useState, useEffect } from 'react';
import { Governorate, User, UserRole, Language } from '../../types.ts';
import CandidatePill from '../CandidatePill.tsx';
import * as api from '../../services/apiService.ts';
import { ResponsiveGrid } from '../UI/Responsive.tsx';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface CandidatesViewProps {
    selectedGovernorate: Governorate | 'All';
    selectedParty: string | 'All';
    selectedGender: 'Male' | 'Female' | 'All';
    onSelectCandidate: (candidate: User) => void;
    user: User | null;
    requestLogin: () => void;
    language: Language;
}

const CandidatesView: React.FC<CandidatesViewProps> = ({ selectedGovernorate, selectedParty, selectedGender, onSelectCandidate, user, requestLogin, language }) => {
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                const users = await api.getUsers({
                    role: UserRole.Candidate,
                    governorate: selectedGovernorate,
                    party: selectedParty,
                    gender: selectedGender,
                });
                setCandidates(users);
            } catch (error) {
                console.error("Failed to fetch candidates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCandidates();
    }, [selectedGovernorate, selectedParty, selectedGender]);


    return (
        <div className="mt-4">
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
                        <p className="text-theme-text-muted col-span-full text-center mt-8">{texts.noPostsFound}</p>
                    )}
                </ResponsiveGrid>
            )}
        </div>
    );
};

export default CandidatesView;