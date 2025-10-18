import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_Arabic } from 'next/font/google';
import { Locale, i18n } from '@/lib/i18n-config';
import { dir } from 'i18next';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionaries';
import '../globals.css';
// FIX: Add missing React import for React.ReactNode
import React from 'react';

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});
const noto_sans_arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: {
      default: dictionary.metadata.title,
      template: `%s | ${dictionary.metadata.title}`,
    },
    description: dictionary.metadata.description,
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <html
      lang={lang}
      dir={dir(lang)}
      className={`${noto_sans.variable} ${noto_sans_arabic.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar dictionary={dictionary.nav} lang={lang} />
          <main className="flex-grow">{children}</main>
          <Footer dictionary={dictionary.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
