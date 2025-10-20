"use client";
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { fetchCandidates } from '@/lib/api';
import { FaUser } from 'react-icons/fa';

type Props = {
  dictionary: any;
  lang: 'en' | 'ar' | string;
};

export default function CandidatesClient({ dictionary, lang }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');
  const query = searchParams.get('query') || '';
  const governorate = searchParams.get('governorate') || '';
  const gender = searchParams.get('gender') || undefined;

  const [data, setData] = useState<{ data: any[]; total: number }>({ data: [], total: 0 });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchCandidates({ page, limit, query, governorate, gender });
        if (mounted) setData({ data: Array.isArray(res?.data) ? res.data : [], total: Number(res?.total || 0) });
      } catch (err) {
        console.error('Failed to fetch candidates:', err);
        if (mounted) setData({ data: [], total: 0 });
      }
    })();
    return () => { mounted = false };
  }, [page, limit, query, governorate, gender]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((data.total || 0) / limit)), [data.total, limit]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {dictionary.nav?.candidates || 'Candidates'}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Showing {data.data.length} of {data.total} candidates
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((candidate: any) => (
          <Link
            key={candidate.id}
            href={`/${lang}/candidates/${candidate.id}`}
            className="group flex flex-col rounded-lg bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <FaUser className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {candidate.name || 'Unknown'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {candidate.party || 'Independent'}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>{candidate.governorate}</p>
              <p>#{candidate.ballot_number}</p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {page > 1 && (
            <Link
              href={`/${lang}/candidates?page=${page - 1}&limit=${limit}`}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Previous
            </Link>
          )}
          <span className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/${lang}/candidates?page=${page + 1}&limit=${limit}`}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

