import { fetchCandidates, fetchGovernorates } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import CandidateCard from '@/components/candidates/CandidateCard';
import FilterPanel from '@/components/candidates/FilterPanel';
import Pagination from '@/components/candidates/Pagination';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.candidates.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.candidates.description,
  };
}

type CandidatesPageProps = {
  params: { lang: Locale };
  searchParams: {
    page?: string;
    query?: string;
    governorate?: string;
    gender?: 'Male' | 'Female';
    sort?: string;
  };
};

export default async function CandidatesPage({
  params: { lang },
  searchParams,
}: CandidatesPageProps) {
  const dictionary = await getDictionary(lang);
  const page = Number(searchParams.page) || 1;
  const limit = 12;

  // FIX: Explicitly pass search parameters to fetchCandidates to ensure correct types.
  const [candidatesResponse, governorates] = await Promise.all([
    fetchCandidates({
      page,
      limit,
      query: searchParams.query,
      governorate: searchParams.governorate,
      gender: searchParams.gender,
      sort: searchParams.sort,
    }),
    fetchGovernorates(),
  ]);
  
  const { data: candidates, pagination } = candidatesResponse;
  const totalPages = pagination.pages;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        {dictionary.page.candidates.title}
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <FilterPanel governorates={governorates} dictionary={dictionary} />
        </aside>
        <main className="lg:col-span-3">
          {candidates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} dictionary={dictionary} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-600 dark:bg-gray-800/50">
              <p className="text-gray-500 dark:text-gray-400">{dictionary.page.candidates.noResults}</p>
            </div>
          )}

          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </main>
      </div>
    </div>
  );
}
