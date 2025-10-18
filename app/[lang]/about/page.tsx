import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n-config';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.about.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.about.description,
  };
}

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {dictionary.page.about.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          {dictionary.page.about.description}
        </p>

        <div className="mt-12 space-y-8 text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.page.about.missionTitle}
            </h2>
            <p className="mt-4">{dictionary.page.about.missionText}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.page.about.featuresTitle}
            </h2>
            <ul className="mt-4 list-disc space-y-2 ps-6">
              <li>{dictionary.page.about.feature1}</li>
              <li>{dictionary.page.about.feature2}</li>
              <li>{dictionary.page.about.feature3}</li>
              <li>{dictionary.page.about.feature4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.page.about.commitmentTitle}
            </h2>
            <p className="mt-4">{dictionary.page.about.commitmentText}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
