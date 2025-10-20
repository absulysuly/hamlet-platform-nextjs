"use client";
import { useEffect, useState } from 'react';
import { fetchCandidates } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import CandidateCard from '../candidates/CandidateCard';
import Link from 'next/link';

type FeaturedCandidatesProps = {
    dictionary: any;
    lang: Locale;
}

export default function FeaturedCandidates({ dictionary, lang }: FeaturedCandidatesProps) {
    const [candidates, setCandidates] = useState<any[]>([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const response = await fetchCandidates({ limit: 6 });
                if (mounted) setCandidates(Array.isArray(response?.data) ? response.data : []);
            } catch (err) {
                console.error('Failed to fetch candidates:', err);
                if (mounted) setCandidates([]);
            }
        })();
        return () => { mounted = false };
    }, []);

    const validCandidates = candidates
        .filter(candidate => candidate && typeof candidate === 'object' && candidate.id)
        .slice(0, 6);

    return (
        <section className="bg-white py-16 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {dictionary?.featuredCandidates || 'Featured Candidates'}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        {dictionary?.featuredCandidatesDesc || 'Discover the most popular candidates in the election'}
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {validCandidates.length > 0 ? (
                        validCandidates.map((candidate) => (
                            <CandidateCard 
                                key={candidate.id} 
                                candidate={candidate} 
                                dictionary={dictionary} 
                                lang={lang} 
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">
                                {dictionary?.noCandidatesFound || 'No candidates available at the moment'}
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        href={`/${lang}/candidates`}
                        className="inline-block rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-green-700"
                    >
                        {dictionary?.browseAll || 'Browse All Candidates'}
                    </Link>
                </div>
            </div>
        </section>
    )
}
