"use client";
import { useEffect, useState } from 'react';
import { fetchCandidateById } from '@/lib/api';
import { FaLandmark, FaUserTie, FaHashtag, FaVenusMars } from 'react-icons/fa';
import Image from 'next/image';

type Props = {
  id: string;
  lang: 'en' | 'ar' | string;
  dictionary: any;
};

export default function CandidateProfileClient({ id, lang, dictionary }: Props) {
  const [candidate, setCandidate] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCandidateById(id);
        if (mounted) setCandidate(data);
      } catch (err: any) {
        console.error('Failed to fetch candidate:', err);
        if (mounted) setError('Not found');
      }
    })();
    return () => { mounted = false };
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 dark:text-gray-300">{dictionary?.errors?.notFound || 'Candidate not found.'}</p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 dark:text-gray-300">{dictionary?.loading || 'Loading...'}</p>
      </div>
    );
  }

  const details = [
    { icon: FaLandmark, label: dictionary.candidate.governorate, value: candidate.governorate || 'Unknown' },
    { icon: FaUserTie, label: dictionary.candidate.party, value: candidate.party || 'Independent' },
    { icon: FaHashtag, label: dictionary.candidate.ballotNumber, value: candidate.ballot_number },
    { icon: FaVenusMars, label: dictionary.candidate.gender, value: candidate.gender ? dictionary.candidate[candidate.gender.toLowerCase() as 'male' | 'female'] : 'Unknown' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div className="relative h-48 w-full bg-gradient-to-r from-red-500 via-white to-green-500 dark:from-red-700 dark:via-gray-800 dark:to-green-700">
            <Image
              src={`https://avatar.iran.liara.run/public/${candidate.gender === 'Female' ? 'girl' : 'boy'}?username=${candidate.id}`}
              alt={candidate.name || 'Candidate'}
              width={128}
              height={128}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
          <div className="pt-20 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {candidate.name || 'Unknown Candidate'}
            </h1>
            <p className="mt-1 text-lg font-medium text-green-600 dark:text-green-400">
              {dictionary.page.profile.candidateForParliament}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px border-y border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/50 mt-6 sm:grid-cols-4">
            {details.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

