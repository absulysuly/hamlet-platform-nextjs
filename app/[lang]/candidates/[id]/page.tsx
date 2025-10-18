import { fetchCandidateById } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata, ResolvingMetadata } from 'next';
import { FaLandmark, FaUserTie, FaHashtag, FaVenusMars } from 'react-icons/fa';
import Image from 'next/image';
import ClientActions from '@/components/ClientActions';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string; lang: Locale };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  try {
    const candidate = await fetchCandidateById(params.id);

    return {
      title: `${candidate.name} | ${dictionary.metadata.title}`,
      description: `${dictionary.page.profile.profileOf} ${candidate.name}, ${dictionary.page.profile.candidateIn} ${candidate.governorate}.`,
    };
  } catch (error) {
     return {
      title: `Candidate Not Found | ${dictionary.metadata.title}`,
      description: `The requested candidate could not be found.`,
    };
  }
}

export default async function CandidateProfilePage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  
  try {
    const candidate = await fetchCandidateById(params.id);

    const details = [
      {
        icon: FaLandmark,
        label: dictionary.candidate.governorate,
        value: candidate.governorate,
      },
      { icon: FaUserTie, label: dictionary.candidate.party, value: candidate.party },
      {
        icon: FaHashtag,
        label: dictionary.candidate.ballotNumber,
        value: candidate.ballot_number,
      },
      {
        icon: FaVenusMars,
        label: dictionary.candidate.gender,
        value: dictionary.candidate[candidate.gender.toLowerCase() as 'male' | 'female'],
      },
    ];

    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
            <div className="relative h-48 w-full bg-gradient-to-r from-red-500 via-white to-green-500 dark:from-red-700 dark:via-gray-800 dark:to-green-700">
              <Image
                src={`https://avatar.iran.liara.run/public/${candidate.gender === 'Female' ? 'girl' : 'boy'}?username=${candidate.id}`}
                alt={candidate.name}
                width={128}
                height={128}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-gray-800"
              />
            </div>
            <div className="pt-20 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {candidate.name}
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
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6">
              <ClientActions candidate={candidate} dictionary={dictionary} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
