import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import GovernoratesClient from '@/components/governorates/GovernoratesClient';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.governorates.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.governorates.description,
  };
}

export default async function GovernoratesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <GovernoratesClient dictionary={dictionary} lang={lang} />;
}
