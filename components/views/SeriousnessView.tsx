import React, { useState, useEffect } from 'react';
import { Governorate, Article, Language } from '../../types.ts';
import { LinkIcon } from '../icons/Icons.tsx';
import * as api from '../../services/apiService.ts';
import { UI_TEXT } from '../../translations.ts';
import Spinner from '../Spinner.tsx';

interface SeriousnessViewProps {
    selectedGovernorate: Governorate | 'All';
    language: Language;
}

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
    return (
        <div className="glass-card rounded-lg shadow-sm p-5 flex flex-col h-full transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-theme-text-muted">{article.source}</span>
                    <span className="text-xs text-theme-text-muted">{article.timestamp}</span>
                </div>
                <h3 className="text-lg font-bold text-theme-text-base">{article.title}</h3>
                <p className="text-sm text-theme-text-muted mt-1">by {article.authorName}</p>
                <p className="mt-3 text-theme-text-base text-sm">
                    {article.contentSnippet}
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--color-glass-border)]">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm font-semibold text-primary hover:underline">
                    <LinkIcon className="w-4 h-4" />
                    <span>Read Full Article</span>
                </a>
            </div>
        </div>
    );
}

const SeriousnessView: React.FC<SeriousnessViewProps> = ({ selectedGovernorate, language }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const texts = UI_TEXT[language];

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const data = await api.getArticles({ governorate: selectedGovernorate });
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, [selectedGovernorate]);

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-white mb-4">{texts.articles}</h2>
            {isLoading ? (
                 <Spinner />
            ) : articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map(article => <ArticleCard key={article.id} article={article} />)}
                </div>
            ) : (
                <p className="text-theme-text-muted col-span-full text-center mt-8">
                    No articles found for the selected filters.
                </p>
            )}
        </div>
    );
};

export default SeriousnessView;