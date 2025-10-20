import React, { useState } from 'react';
import Card from '../components/ui/Card.tsx';
import Select from '../components/ui/Select.tsx';
import { useAllCandidatesData } from '../hooks/useAllCandidatesData.ts';
import { Candidate } from '../types.ts';
import ScaleIcon from '../icons/ScaleIcon.tsx';

const ComparisonColumn: React.FC<{ candidate: Candidate | null }> = ({ candidate }) => {
    if (!candidate) {
        return (
            <div className="border-2 border-dashed border-white/20 rounded-lg p-4 h-full flex items-center justify-center min-h-[300px]">
                <p className="text-slate-400">اختر مرشحًا</p>
            </div>
        );
    }
    return (
        <Card className="h-full">
            <div className="text-center">
                <img src={candidate.imageUrl} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto mb-4 ring-2 ring-brand-teal" />
                <h3 className="text-2xl font-bold text-white">{candidate.name}</h3>
                <p className="text-lg text-brand-teal">{candidate.party}</p>
            </div>
            <div className="mt-6 space-y-3 text-right border-t border-white/10 pt-4">
                <p><strong>الأولوية 1:</strong> تحسين الخدمات</p>
                <p><strong>الأولوية 2:</strong> مكافحة الفساد</p>
                <p><strong>الأولوية 3:</strong> دعم الشباب</p>
                 <p><strong>الخبرة:</strong> 5 سنوات في العمل البلدي</p>
            </div>
        </Card>
    );
};


const CandidateComparisonPage: React.FC<{ onNavigate?: (path: string) => void; language?: any }> = () => {
    const { candidates, isLoading } = useAllCandidatesData();
    const [candidate1Id, setCandidate1Id] = useState<string>('');
    const [candidate2Id, setCandidate2Id] = useState<string>('');

    const candidate1 = candidates.find(c => c.id === candidate1Id) || null;
    const candidate2 = candidates.find(c => c.id === candidate2Id) || null;
    
    const availableCandidatesFor1 = candidates.filter(c => c.id !== candidate2Id);
    const availableCandidatesFor2 = candidates.filter(c => c.id !== candidate1Id);

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-white">قارن بين المرشحين</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                        اختر مرشحين لعرض مقارنة جنبًا إلى جنب لبرامجهم الانتخابية وخبراتهم.
                    </p>
                </div>
                
                {isLoading ? (
                    <p className="text-center text-slate-300">جاري تحميل بيانات المرشحين...</p>
                ) : (
                    <>
                        <Card className="mb-8">
                             <div className="grid md:grid-cols-2 gap-8 items-end">
                                <Select
                                    id="candidate1"
                                    label="المرشح الأول"
                                    value={candidate1Id}
                                    onChange={(e) => setCandidate1Id(e.target.value)}
                                >
                                    <option value="">اختر المرشح الأول</option>
                                    {availableCandidatesFor1.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} - {c.party}</option>
                                    ))}
                                </Select>
                                 <Select
                                    id="candidate2"
                                    label="المرشح الثاني"
                                    value={candidate2Id}
                                    onChange={(e) => setCandidate2Id(e.target.value)}
                                >
                                    <option value="">اختر المرشح الثاني</option>
                                    {availableCandidatesFor2.map(c => (
                                        <option key={c.id} value={c.id}>{c.name} - {c.party}</option>
                                    ))}
                                </Select>
                            </div>
                        </Card>
                        
                        <div className="grid md:grid-cols-2 gap-8 relative">
                            <ComparisonColumn candidate={candidate1} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                                <div className="p-4 bg-gray-800 rounded-full border-2 border-brand-teal">
                                    <ScaleIcon className="w-8 h-8 text-brand-teal" />
                                </div>
                            </div>
                            <ComparisonColumn candidate={candidate2} />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default CandidateComparisonPage;