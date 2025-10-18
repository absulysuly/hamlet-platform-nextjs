import SearchBar from './SearchBar';

type HeroProps = {
    dictionary: any;
    lang: string;
}

export default function Hero({ dictionary, lang }: HeroProps) {
    return (
        <div className="relative bg-gray-900">
            <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/images/iraq-parliament.jpg")', filter: 'blur(3px)' }}
                ></div>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
            </div>

            <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-48 lg:px-8">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
                    {dictionary.heroTitle}
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                    {dictionary.heroSubtitle}
                </p>
                <SearchBar dictionary={dictionary} lang={lang} />
            </div>
        </div>
    )
}
