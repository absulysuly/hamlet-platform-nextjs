
import React from 'react';
import Card from '../components/ui/Card.tsx';
import Button from '../components/ui/Button.tsx';

// Mock data, in a real app this would come from an API.
const MOCK_PARTIES = [
    { id: '1', name: 'Future Alliance', description: 'A forward-thinking party focused on technology and youth.', logoUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?Text=FA' },
    { id: '2', name: 'Progress Party', description: 'Dedicated to economic growth and infrastructure.', logoUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=PP' },
    { id: '3', name: 'National Unity', description: 'Fostering unity and rebuilding communities.', logoUrl: 'https://via.placeholder.com/150/008000/FFFFFF?Text=NU' },
    { id: '4', name: 'Kurdistan Future', description: 'Championing modern education for the next generation.', logoUrl: 'https://via.placeholder.com/150/FFFF00/000000?Text=KF' },
];


interface PoliticalPartyPortalPageProps {
    onNavigate: (path: string) => void;
}

const PoliticalPartyPortalPage: React.FC<PoliticalPartyPortalPageProps> = ({ onNavigate }) => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">بوابة الأحزاب السياسية</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                            استكشف الأحزاب المشاركة في الانتخابات، وتعرف على برامجها ومرشحيها.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {MOCK_PARTIES.map(party => (
                            <Card key={party.id}>
                                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                                    <img src={party.logoUrl} alt={`${party.name} logo`} className="w-20 h-20 rounded-full bg-white p-1 flex-shrink-0" />
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{party.name}</h2>
                                        <p className="text-slate-300 mt-1">{party.description}</p>
                                    </div>
                                </div>
                                <div className="mt-6 text-left">
                                    <Button variant="outline" onClick={() => onNavigate(`/party/${party.id}`)}>
                                        عرض التفاصيل والمرشحين
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoliticalPartyPortalPage;
