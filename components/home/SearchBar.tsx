'use client';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
// FIX: Add missing React import for React.FormEvent type
import React from 'react';

type SearchBarProps = {
    dictionary: any;
    lang: string;
}

export default function SearchBar({ dictionary, lang }: SearchBarProps) {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query') as string;
        router.push(`/${lang}/candidates?query=${encodeURIComponent(query)}`);
    }

    return (
        <form onSubmit={handleSearch} className="mt-8 w-full max-w-md">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="search"
                    name="query"
                    id="search"
                    className="block w-full rounded-md border-0 bg-white p-4 ps-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600"
                    placeholder={dictionary.searchPlaceholder}
                />
            </div>
            <button
                type="submit"
                className="mt-4 w-full rounded-md bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
                {dictionary.search}
            </button>
        </form>
    )
}
