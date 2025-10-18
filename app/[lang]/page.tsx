import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import Hero from '@/components/home/Hero';
import HomeStats from '@/components/home/HomeStats';
import FeaturedCandidates from '@/components/home/FeaturedCandidates';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero dictionary={dictionary.page.home} lang={lang} />
      <HomeStats dictionary={dictionary.page.home} />
      <FeaturedCandidates dictionary={dictionary.page.home} lang={lang} />
    </>
  );
}
