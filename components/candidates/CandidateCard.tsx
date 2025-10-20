import Link from 'next/link';
import Image from 'next/image';
import { Candidate } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';
import { FaLandmark, FaUserTie, FaHashtag } from 'react-icons/fa';
// FIX: Import React to define the component as a React.FC
import React from 'react';

type CandidateCardProps = {
  candidate: Candidate;
  dictionary: any;
  lang: Locale;
};

// FIX: Define as a React.FC to resolve type issues with the 'key' prop.
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, dictionary, lang }) => {
  return (
    <Link href={`/${lang}/candidates/${candidate.id}`}>
      <div className="flex h-full items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500 rtl:space-x-reverse">
        <Image
          src={`https://avatar.iran.liara.run/public/${candidate.gender === 'Female' ? 'girl' : 'boy'}?username=${candidate.id}`}
          alt={candidate.name || 'Candidate'}
          width={64}
          height={64}
          className="h-16 w-16 flex-shrink-0 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white">{candidate.name || 'Unknown'}</h3>
          <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaLandmark />
              <span>{candidate.governorate || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserTie />
              <span>{candidate.party || 'Independent'}</span>
            </div>
             <div className="flex items-center gap-2">
              <FaHashtag />
              <span>{dictionary?.candidate?.ballotNumber || "Ballot"}: {candidate?.ballot_number || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CandidateCard;
