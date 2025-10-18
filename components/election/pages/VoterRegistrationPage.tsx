import React, { useState } from 'react';
import Card from '../components/ui/Card.tsx';
import Input from '../components/ui/Input.tsx';
import Select from '../components/ui/Select.tsx';
import Button from '../components/ui/Button.tsx';
import { IRAQI_GOVERNORATES_INFO } from '../../../constants.ts';
import CheckCircleIcon from '../icons/CheckCircleIcon.tsx';
import { Language } from '../../../types.ts';
import { UI_TEXT } from '../../../translations.ts';

interface VoterRegistrationPageProps {
    language: Language;
}

const VoterRegistrationPage: React.FC<VoterRegistrationPageProps> = ({ language }) => {
    const [submissionState, setSubmissionState] = useState<{ status: 'idle' | 'submitting' | 'success' | 'error', message: string, confirmationId?: string }>({ status: 'idle', message: '' });
    const texts = UI_TEXT[language];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionState({ status: 'submitting', message: '' });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate success
        setSubmissionState({ 
            status: 'success', 
            message: texts.registrationSuccess, 
            confirmationId: `IQ-VOTE-${Date.now()}` 
        });
    };

    return (
        <div className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-white">{texts.voterRegistrationTitle}</h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300">
                           {texts.voterRegistrationDesc}
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
                            <p className="text-slate-300 mb-2">{texts.confirmationId}</p>
                            <p className="font-mono bg-black/20 p-2 rounded text-lg">{submissionState.confirmationId}</p>
                            <p className="text-slate-300 mt-4">{texts.submissionThanks}</p>
                            <Button onClick={() => setSubmissionState({ status: 'idle', message: '' })} className="mt-6">
                                {texts.registerAnotherVoter}
                            </Button>
                        </Card>
                    ) : (
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-2xl font-bold text-white border-b border-white/20 pb-4">{texts.voterInfo}</h2>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    label={texts.fullNameNationalId}
                                    type="text"
                                    required
                                    placeholder={texts.fullName}
                                />
                                <Input
                                    id="nationalId"
                                    name="nationalId"
                                    label={texts.nationalId}
                                    type="text"
                                    required
                                    pattern="\d{12}"
                                    title={texts.nationalIdHint}
                                    placeholder="XXXXXXXXXXXX"
                                />
                                <Input
                                    id="dob"
                                    name="dob"
                                    label={texts.dob}
                                    type="date"
                                    required
                                />
                                <Select id="governorate" name="governorate" label={texts.selectGovernorate} required>
                                    <option value="">{texts.selectYourGovernorate}</option>
                                    {IRAQI_GOVERNORATES_INFO.map(gov => (
                                        <option key={gov.id} value={gov.enName}>{gov.name}</option>
                                    ))}
                                </Select>
                                <div className="pt-4 text-center">
                                    <Button type="submit" className="w-full md:w-auto" disabled={submissionState.status === 'submitting'}>
                                        {submissionState.status === 'submitting' ? texts.submitting : texts.registerButton}
                                    </Button>
                                </div>
                                 <p className="text-center text-sm text-slate-400 pt-4">
                                    {texts.simulationNotice}
                                </p>
                            </form>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoterRegistrationPage;