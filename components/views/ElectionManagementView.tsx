import React from 'react';
import { Language } from '../../types.ts';

// Election portal components
import LandingPage from '../election/pages/LandingPage.tsx';
import DashboardPage from '../election/pages/DashboardPage.tsx';
import IntegrityHubPage from '../election/pages/IntegrityHubPage.tsx';
import InternationalPortalPage from '../election/pages/InternationalPortalPage.tsx';
import GovernoratePage from '../election/pages/GovernoratePage.tsx';
import PoliticalPartyPage from '../election/pages/PoliticalPartyPage.tsx';
import PartiesPage from '../election/pages/PartiesPage.tsx';
import ElectionHubPage from '../election/pages/ElectionHubPage.tsx';
import PrivacyPolicyPage from '../election/pages/PrivacyPolicyPage.tsx';
import TermsOfServicePage from '../election/pages/TermsOfServicePage.tsx';
import PricingPage from '../election/pages/PricingPage.tsx';
import CandidateComparisonPage from '../election/pages/CandidateComparisonPage.tsx';
import VoterRegistrationPage from '../election/pages/VoterRegistrationPage.tsx';
import ApiConfigPage from '../election/pages/ApiConfigPage.tsx';
import DataCollectionPage from '../election/pages/DataCollectionPage.tsx';
import ContactValidationPage from '../election/pages/ContactValidationPage.tsx';
import CandidateEnrichmentPage from '../election/pages/CandidateEnrichmentPage.tsx';
import QualityAnalyticsPage from '../election/pages/QualityAnalyticsPage.tsx';


interface ElectionManagementViewProps {
    path: string;
    onNavigate: (path: string) => void;
    language: Language;
}

const ElectionManagementView: React.FC<ElectionManagementViewProps> = ({ path, onNavigate, language }) => {

    const renderPage = () => {
        const pageProps = { onNavigate, language };
        // A simple router based on the path prop
        if (path.startsWith('/governorate/')) {
            const name = path.split('/')[2];
            return <GovernoratePage name={name} {...pageProps} />;
        }
         if (path.startsWith('/party/')) {
            const id = path.split('/')[2];
            return <PoliticalPartyPage id={id} {...pageProps} />;
        }
        
        switch (path) {
            case '/':
                return <LandingPage {...pageProps} />;
            case '/dashboard':
                return <DashboardPage {...pageProps} />;
            case '/integrity-hub':
                return <IntegrityHubPage {...pageProps} />;
            case '/international-portal':
                return <InternationalPortalPage {...pageProps} />;
            case '/parties':
                return <PartiesPage {...pageProps} />;
            case '/election-hub':
                return <ElectionHubPage {...pageProps} />;
             case '/privacy-policy':
                return <PrivacyPolicyPage {...pageProps} />;
            case '/terms-of-service':
                return <TermsOfServicePage {...pageProps} />;
            case '/pricing':
                return <PricingPage {...pageProps} />;
            case '/compare':
                return <CandidateComparisonPage {...pageProps} />;
             case '/voter-registration':
                return <VoterRegistrationPage {...pageProps} />;
            // New Data Management Routes
            case '/api-config':
                return <ApiConfigPage {...pageProps} />;
            case '/data-collection':
                return <DataCollectionPage {...pageProps} />;
            case '/contact-validation':
                return <ContactValidationPage {...pageProps} />;
            case '/candidate-enrichment':
                return <CandidateEnrichmentPage {...pageProps} />;
            case '/quality-analytics':
                return <QualityAnalyticsPage {...pageProps} />;
            default:
                return <LandingPage {...pageProps} />;
        }
    }

    return (
        <div className="font-arabic">
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

export default ElectionManagementView;