import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types.ts';
import * as api from '../services/apiService.ts';
import Spinner from './Spinner.tsx';

const HeroSection: React.FC = () => {
    const [candidates, setCandidates] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                // Fetch a good number of candidates for the carousel
                const users = await api.getUsers({ role: UserRole.Candidate });
                setCandidates(users.slice(0, 20)); // Limit to 20 for performance
            } catch (error) {
                console.error("Failed to fetch candidates for hero:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    if (isLoading) {
        return <div className="w-full h-40 flex justify-center items-center"><Spinner /></div>;
    }

    if (candidates.length === 0) {
        return null;
    }

    // Duplicate the candidates to create a seamless loop
    const carouselItems = [...candidates, ...candidates];

    return (
        <div className="w-full overflow-hidden relative py-4 bg-black/10">
            <div className="flex animate-marquee whitespace-nowrap">
                {carouselItems.map((candidate, index) => (
                    <div key={`${candidate.id}-${index}`} className="flex flex-col items-center flex-shrink-0 w-28 mx-4">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-secondary via-primary to-accent">
                                <img
                                    loading="lazy"
                                    className="w-full h-full rounded-full object-cover border-2 border-[var(--color-background)]"
                                    src={candidate.avatarUrl}
                                    alt={candidate.name}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-center text-theme-text-base truncate w-full mt-2">{candidate.name}</p>
                    </div>
                ))}
            </div>
            {/* Fading overlays for edges */}
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[var(--color-background)] to-transparent"></div>
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[var(--color-background)] to-transparent"></div>
        </div>
    );
};

export default HeroSection;