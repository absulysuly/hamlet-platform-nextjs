



import React, { useState } from 'react';
import Card from '../components/ui/Card.tsx';
import Input from '../components/ui/Input.tsx';
import Select from '../components/ui/Select.tsx';
import Textarea from '../components/ui/Textarea.tsx';
import Button from '../components/ui/Button.tsx';
import { IRAQI_GOVERNORATES_INFO } from '../../../constants.ts';
import { submitIntegrityReport } from '../../../services/apiService.ts';
import CheckCircleIcon from '../icons/CheckCircleIcon.tsx';
import { Language } from '../../../types.ts';
import { UI_TEXT } from '../../../translations.ts';

interface IntegrityHubPageProps {
    language: Language;
}

const IntegrityHubPage: React.FC<IntegrityHubPageProps> = ({ language }) => {
    const [submissionState, setSubmissionState] = useState<{ status: 'idle' | 'submitting' | 'success' | 'error', message: string, trackingId?: string }>({ status: 'idle', message: '' });
    const texts = UI_TEXT[language];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionState({ status: 'submitting', message: '' });
        
        try {
            const formData = new FormData(e.currentTarget);
            const response = await submitIntegrityReport(formData);
            if (response.success) {
                setSubmissionState({ 
                    status: 'success', 
                    message: texts.submissionSuccess, 
                    trackingId: response.trackingId 
                });
            } else {
                setSubmissionState({ status: 'error', message: texts.submissionError });
            }
        } catch (error) {
            setSubmissionState({ status: 'error', message: texts.networkError });
        }
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">{texts.integrityHubTitle}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                            {texts.integrityHubDesc}
                        </p>
                    </div>
                    
                    {submissionState.status === 'success' ? (
                        <Card className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-green-500/10 rounded-full">
                                   <CheckCircleIcon className="w-12 h-12 text-brand-teal" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">{submissionState.message}</h2>
                            <p className="text-slate-300 mb-2">{texts.trackingId}</p>
                            <p className="font-mono bg-black/20 p-2 rounded text-lg">{submissionState.trackingId}</p>
                            <p className="text-slate-300 mt-4">{texts.submissionThanks}</p>
                            <Button onClick={() => setSubmissionState({ status: 'idle', message: '' })} className="mt-6">
                                {texts.submitNewReport}
                            </Button>
                        </Card>
                    ) : (
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">{texts.reportDetails}</h2>
                                <Select id="reportType" name="reportType" label={texts.reportType} required>
                                    <option value="">{texts.selectReportType}</option>
                                    <option value="buying_votes">{texts.reportTypes.buying_votes}</option>
                                    <option value="propaganda_violation">{texts.reportTypes.propaganda_violation}</option>
                                    <option value="voter_intimidation">{texts.reportTypes.voter_intimidation}</option>
                                    <option value="misinformation">{texts.reportTypes.misinformation}</option>
                                    <option value="other">{texts.reportTypes.other}</option>
                                </Select>

                                <Select id="governorate" name="governorate" label={texts.governorate} required>
                                    <option value="">{texts.selectYourGovernorate}</option>
                                    {IRAQI_GOVERNORATES_INFO.map(gov => (
                                        <option key={gov.id} value={gov.enName}>{gov.name}</option>
                                    ))}
                                </Select>

                                <Textarea
                                    id="description"
                                    name="description"
                                    label={texts.violationDesc}
                                    required
                                    placeholder={texts.violationDescPlaceholder}
                                />

                                <div className="pt-4 text-center">
                                    <Button type="submit" className="w-full md:w-auto" disabled={submissionState.status === 'submitting'}>
                                        {submissionState.status === 'submitting' ? texts.submitting : texts.submitReport}
                                    </Button>
                                </div>
                                <p className="text-center text-sm text-slate-400 pt-4">
                                    {texts.confidentialNotice}
                                </p>
                            </form>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IntegrityHubPage;