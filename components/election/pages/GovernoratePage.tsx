// Fix: Implementing the GovernoratePage component to display local election data.
import React from 'react';
import Card from '../components/ui/Card.tsx';
import { useGovernorateData } from '../hooks/useGovernorateData.ts';
import { Candidate, NewsArticle } from '../types.ts';
import { VerifiedIcon, ArrowLeftIcon } from '../../icons/Icons.tsx';

interface GovernoratePageProps {
    name: string;
    onNavigate: (path: string) => void;
}

const CandidatePill: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div className="glass-card rounded-lg p-3 flex items-center space-x-4 rtl:space-x-reverse">
        <img src={candidate.imageUrl} alt={candidate.name} className="w-12 h-12 rounded-full ring-2 ring-white/30" />
        <div>
            <h4 className="font-bold text-white flex items-center">
                {candidate.name}
                {candidate.verified && <VerifiedIcon className="w-4 h-4 text-brand-teal mr-2 rtl:ml-2 rtl:mr-0" />}
            </h4>
            <p className="text-sm text-slate-400">{candidate.party}</p>
        </div>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
    <Card className="h-full">
        <h4 className="font-bold text-lg text-white">{article.title}</h4>
        <p className="text-xs text-slate-400 mb-2">{article.date}</p>
        <p className="text-sm text-slate-300">{article.summary}</p>
    </Card>
);

const GovernoratePage: React.FC<GovernoratePageProps> = ({ name, onNavigate }) => {
    const { data, isLoading, error } = useGovernorateData(name);

    if (isLoading) {
        return <div className="text-center py-20 text-white">Loading governorate data...</div>;
    }

    if (error || !data) {
        return <div className="text-center py-20 text-red-400">Error: {error?.message || 'Governorate not found.'}</div>;
    }

    const { governorate, candidates, news } = data;

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <button onClick={() => onNavigate('/')} className="flex items-center space-x-2 text-brand-teal mb-8 hover:underline">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>العودة إلى الخريطة</span>
                    </button>
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">محافظة {governorate.name}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                            المرشحون والأخبار لـ {governorate.enName}.
                        </p>
                    </div>

                    <section id="candidates" className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">المرشحون في المحافظة</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {candidates.map(candidate => (
                                <CandidatePill key={candidate.id} candidate={candidate} />
                            ))}
                        </div>
                    </section>

                    <section id="news">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">آخر الأخبار المحلية</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {news.map(article => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default GovernoratePage;
