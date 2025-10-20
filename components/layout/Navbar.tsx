import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { Locale } from '@/lib/i18n-config';

export default function Navbar({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: Locale;
}) {
  const navLinks = [
    { href: '/', label: dictionary?.home || 'Home' },
    { href: '/candidates', label: dictionary?.candidates || 'Candidates' },
    { href: '/governorates', label: dictionary?.governorates || 'Governorates' },
    { href: '/stats', label: dictionary?.statistics || 'Statistics' },
    { href: '/about', label: dictionary?.about || 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex-shrink-0">
              <Image
                src="/images/iraq-flag.svg"
                alt="Iraqi Flag Logo"
                width={32}
                height={21}
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 rtl:space-x-reverse">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={`/${lang}${link.href}`}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </nav>
    </header>
  );
}


