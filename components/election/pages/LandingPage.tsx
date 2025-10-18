import React from 'react';
import { Language } from '../../../types.ts';
import { UI_TEXT } from '../../../translations.ts';
// Fix: Import IconProps to correctly type the icon prop in FeatureCard.
import { IconProps, UsersIcon, UserCircleIcon, EyeIcon, ChartIcon, LifebuoyIcon, ScaleIcon, SparklesIcon, IdentificationIcon, DatabaseIcon } from '../../icons/Icons.tsx';
import ApiIcon from '../icons/ApiIcon.tsx';


interface LandingPageProps {
  onNavigate: (path: string) => void;
  language: Language;
}

const PortalCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}> = ({ icon, title, description, buttonText, onClick }) => (
    <div className="management-glass-card rounded-lg p-6 text-right flex flex-col items-center text-center">
        <div className="text-5xl text-official-800 mb-3">{icon}</div>
        <h2 className="text-2xl font-bold text-official-900">{title}</h2>
        <p className="text-official-700 mt-1 mb-4 flex-grow">{description}</p>
        <button
            onClick={onClick}
            className="w-full formal-button"
        >
            {buttonText}
        </button>
    </div>
);

const FeatureCard: React.FC<{
    // Fix: Use a more specific type for the icon to allow passing style and className props.
    icon: React.ReactElement<IconProps>;
    title: string;
    description: string;
    color: string;
    onClick: () => void;
}> = ({ icon, title, description, color, onClick }) => (
    <button
        onClick={onClick}
        className="management-glass-card rounded-lg p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center border-t-4 aspect-square"
        style={{ borderTopColor: color }}
    >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${color}20` }}>
            {/* Fix: Correctly clone element with new props */}
            {React.cloneElement(icon, { style: { color }, className: "w-7 h-7" })}
        </div>
        <h3 className="font-bold text-official-900 text-base leading-tight">{title}</h3>
        <p className="text-xs text-official-700 mt-1">{description}</p>
    </button>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, language }) => {
  const texts = UI_TEXT[language];
  return (
    <div dir="rtl" className="p-4 sm:p-6 lg:p-8">
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PortalCard
                icon={<UsersIcon className="w-12 h-12" />}
                title={texts.voterCenter}
                description={texts.voterCenterDesc}
                buttonText={texts.loginToVoterPortal}
                onClick={() => onNavigate('/voter-registration')}
            />
            <PortalCard
                icon={<UserCircleIcon className="w-12 h-12" />}
                title={texts.candidateHub}
                description={texts.candidateHubDesc}
                buttonText={texts.loginToCandidatePortal}
                onClick={() => onNavigate('/dashboard')}
            />
        </main>

        <section className="mt-12">
            <h2 className="text-2xl font-bold text-center text-official-900 mb-2">{texts.mainDashboard}</h2>
            <p className="text-center text-official-700 mb-6">{texts.mainDashboardDesc}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <FeatureCard title={texts.voterCenter} description={texts.voterCenterDesc} icon={<UsersIcon />} color="#3182ce" onClick={() => onNavigate('/voter-registration')} />
                <FeatureCard title={texts.candidateHub} description={texts.candidateHubDesc} icon={<UserCircleIcon />} color="#38a169" onClick={() => onNavigate('/dashboard')} />
                <FeatureCard title={texts.observerHub} description={texts.observerHubDesc} icon={<EyeIcon />} color="#d69e2e" onClick={() => onNavigate('/international-portal')} />
                <FeatureCard title={texts.lawCompliance} description={texts.lawComplianceDesc} icon={<ScaleIcon />} color="#805ad5" onClick={() => onNavigate('/terms-of-service')} />
                <FeatureCard title={texts.electionDataBig} description={texts.electionDataDesc} icon={<ChartIcon />} color="#319795" onClick={() => onNavigate('/compare')} />
                <FeatureCard title={texts.supportResources} description={texts.supportResourcesDesc} icon={<LifebuoyIcon />} color="#e53e3e" onClick={() => onNavigate('/integrity-hub')} />
            </div>
        </section>

        <section className="mt-12">
            <h2 className="text-2xl font-bold text-center text-official-900 mb-2">{texts.dataManagement}</h2>
            <p className="text-center text-official-700 mb-6">{texts.dataManagementDesc}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                <FeatureCard title={texts.apiConfig} description={texts.apiConfigDesc} icon={<ApiIcon />} color="#0284c7" onClick={() => onNavigate('/api-config')} />
                <FeatureCard title={texts.dataCollection} description={texts.dataCollectionDesc} icon={<DatabaseIcon />} color="#059669" onClick={() => onNavigate('/data-collection')} />
                <FeatureCard title={texts.contactValidation} description={texts.contactValidationDesc} icon={<IdentificationIcon />} color="#d97706" onClick={() => onNavigate('/contact-validation')} />
                <FeatureCard title={texts.candidateEnrichment} description={texts.candidateEnrichmentDesc} icon={<SparklesIcon />} color="#9333ea" onClick={() => onNavigate('/candidate-enrichment')} />
                <FeatureCard title={texts.qualityAnalytics} description={texts.qualityAnalyticsDesc} icon={<ChartIcon />} color="#db2777" onClick={() => onNavigate('/quality-analytics')} />
            </div>
        </section>
    </div>
  );
};

export default LandingPage;