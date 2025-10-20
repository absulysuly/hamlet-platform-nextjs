import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import React from 'react';
import StatsPageClient from '@/components/stats/StatsPageClient';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.stats.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.stats.description,
  };
}

// FIX: Define StatCard as a React.FC to correctly type it as a React component, which resolves the error with the 'key' prop.
const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number }> = ({ icon: Icon, title, value }) => (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-800/50">
                <Icon className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{typeof value === 'number' ? value.toLocaleString(undefined) : value}</p>
            </div>
        </div>
    </div>
)

export default async function StatsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <StatsPageClient dictionary={dictionary} />;
}
