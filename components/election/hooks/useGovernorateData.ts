import { useState, useEffect } from 'react';
import * as api from '../../../services/apiService.ts';
import { Candidate, NewsArticle } from '../types.ts';

export const useGovernorateData = (name: string | undefined) => {
    const [data, setData] = useState<{ governorate: any; candidates: Candidate[]; news: NewsArticle[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!name) {
            setError(new Error("Governorate name is required."));
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const governorateData = await api.getGovernorateDataByName(name);
                setData(governorateData);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [name]);

    return { data, isLoading, error };
};