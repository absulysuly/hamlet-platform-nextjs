

import React from 'react';
import Card from '../components/ui/Card.tsx';
import Button from '../components/ui/Button.tsx';
import ApiIcon from '../icons/ApiIcon.tsx';
import DocumentTextIcon from '../icons/DocumentTextIcon.tsx';
import UsersIcon from '../icons/UsersIcon.tsx';
import { Language } from '../../../types.ts';
import { UI_TEXT } from '../../../translations.ts';

interface InternationalPortalPageProps {
    language: Language;
}

const InternationalPortalPage: React.FC<InternationalPortalPageProps> = ({ language }) => {
    const texts = UI_TEXT[language];
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">{texts.intlPortalTitle}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                           {texts.intlPortalDesc}
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="flex flex-col">
                            <div className="flex-grow">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-blue-500/10 rounded-full">
                                        <ApiIcon className="w-10 h-10 text-brand-teal" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center mb-3">{texts.apiAccess}</h2>
                                <p className="text-slate-300 text-center">
                                    {texts.apiAccessDesc}
                                </p>
                            </div>
                            <Button variant="outline" className="mt-6 w-full">{texts.requestApiAccess}</Button>
                        </Card>
                        <Card className="flex flex-col">
                           <div className="flex-grow">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-green-500/10 rounded-full">
                                        <DocumentTextIcon className="w-10 h-10 text-brand-teal" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center mb-3">{texts.downloadReports}</h2>
                                <p className="text-slate-300 text-center">
                                    {texts.downloadReportsDesc}
                                </p>
                           </div>
                            <Button variant="outline" className="mt-6 w-full">{texts.browseReports}</Button>
                        </Card>
                    </div>
                    
                    <div className="mt-8">
                        <Card>
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                 <div className="p-4 bg-purple-500/10 rounded-full">
                                    <UsersIcon className="w-10 h-10 text-brand-teal" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{texts.observerResources}</h2>
                                    <p className="text-slate-300">
                                        {texts.observerResourcesDesc}
                                    </p>
                                    <Button className="mt-4">{texts.registerOrg}</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternationalPortalPage;