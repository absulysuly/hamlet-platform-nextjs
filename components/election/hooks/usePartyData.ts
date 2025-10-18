import { useState, useEffect } from 'react';
import { Candidate, PoliticalParty } from '../types.ts';
import * as api from '../../../services/apiService.ts';

export const usePartyData = (id: string | undefined) => {
    const [data, setData] = useState<{ party: PoliticalParty; candidates: Candidate[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) {
            setError(new Error("Party ID is required."));
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const partyData = await api.getPartyById(id);
                setData(partyData);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { data, isLoading, error };
};