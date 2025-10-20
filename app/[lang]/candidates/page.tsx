import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import CandidatesClient from '@/components/candidates/CandidatesClient';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.nav.candidates} | ${dictionary.metadata.title}`,
    description: dictionary.metadata.description,
  };
}

export default async function CandidatesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <CandidatesClient dictionary={dictionary} lang={lang} />;
}
