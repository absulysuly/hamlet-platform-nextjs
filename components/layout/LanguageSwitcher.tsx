'use client';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/lib/i18n-config';
import { FaGlobe } from 'react-icons/fa';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700">
          <FaGlobe className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute end-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-600">
          <div className="py-1">
            {i18n.locales.map((locale) => (
              <Menu.Item key={locale}>
                {({ active }) => (
                  <button
                    onClick={() => router.push(redirectedPathName(locale))}
                    className={cn(
                      'block w-full px-4 py-2 text-start text-sm',
                      active ? 'bg-gray-100 dark:bg-gray-700' : '',
                      lang === locale
                        ? 'font-bold text-green-600'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {locale === 'en' ? 'English' : 'العربية'}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
