import Image from 'next/image';

export default function Footer({ dictionary }: { dictionary: any }) {
  return (
    <footer className="bg-white dark:bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {dictionary.title}
      </h2>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              src="/images/iraq-flag.svg"
              alt="Iraqi Flag"
              width={40}
              height={27}
            />
            <p className="text-base text-gray-500 dark:text-gray-400">
              {dictionary.description}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {/* Can add more link columns here */}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} {dictionary.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
