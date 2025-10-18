'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Governorate } from '@/lib/types';
import { useDebouncedCallback } from 'use-debounce';

type FilterPanelProps = {
  governorates: Governorate[];
  dictionary: any;
};

export default function FilterPanel({ governorates, dictionary }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    handleFilterChange('query', term);
  }, 300);

  return (
    <aside className="sticky top-24 space-y-6 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {dictionary.filters.searchByName}
        </label>
        <input
          type="text"
          id="search"
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={dictionary.filters.searchPlaceholder}
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label htmlFor="governorate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {dictionary.filters.filterByGovernorate}
        </label>
        <select
          id="governorate"
          defaultValue={searchParams.get('governorate')?.toString()}
          onChange={(e) => handleFilterChange('governorate', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">{dictionary.filters.allGovernorates}</option>
          {governorates.map((gov, index) => (
            <option key={gov.name || index} value={gov.name}>
              {pathname.includes('/ar') ? gov.nameArabic : gov.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {dictionary.filters.filterByGender}
        </label>
        <select
          id="gender"
          defaultValue={searchParams.get('gender')?.toString()}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">{dictionary.filters.allGenders}</option>
          <option value="Male">{dictionary.candidate.male}</option>
          <option value="Female">{dictionary.candidate.female}</option>
        </select>
      </div>
    </aside>
  );
}
