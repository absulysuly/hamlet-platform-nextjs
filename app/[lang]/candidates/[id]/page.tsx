import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata, ResolvingMetadata } from 'next';
import ClientActions from '@/components/ClientActions';
import CandidateProfileClient from '@/components/candidates/CandidateProfileClient';

type Props = {
  params: { id: string; lang: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: `${dictionary.nav.candidates} | ${dictionary.metadata.title}`,
    description: dictionary.metadata.description,
  };
}

export default async function CandidateProfilePage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <CandidateProfileClient id={params.id} lang={params.lang} dictionary={dictionary} />
      {/* ClientActions left mounted; it should handle client-only actions */}
    </div>
  );
}
