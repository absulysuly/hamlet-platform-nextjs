"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchGovernorates } from '@/lib/api';
import { FaLandmark } from 'react-icons/fa';

type Props = {
  dictionary: any;
  lang: 'en' | 'ar' | string;
};

export default function GovernoratesClient({ dictionary, lang }: Props) {
  const [governorates, setGovernorates] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const g = await fetchGovernorates();
        if (mounted) setGovernorates(Array.isArray(g) ? g : []);
      } catch (err) {
        console.error('Failed to fetch governorates:', err);
        if (mounted) setGovernorates([]);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{dictionary.page.governorates.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">{dictionary.page.governorates.description}</p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {governorates.map((gov: any, index: number) => (
          <Link
            key={gov.name || index}
            href={`/${lang}/candidates?governorate=${gov.name || gov}`}
            className="group flex flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FaLandmark className="h-8 w-8 text-gray-400 transition group-hover:text-green-600 dark:text-gray-500 dark:group-hover:text-green-400" />
            <h2 className="mt-4 font-semibold text-gray-900 dark:text-white">
              {typeof gov === 'string' ? gov : (lang === 'ar' ? gov.nameArabic : gov.name)}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

