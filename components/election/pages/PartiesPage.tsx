import React from 'react';
import PoliticalPartyPortalPage from './PoliticalPartyPortalPage.tsx';

interface PartiesPageProps {
    onNavigate: (path: string) => void;
}

const PartiesPage: React.FC<PartiesPageProps> = ({ onNavigate }) => {
    // This component acts as a wrapper to maintain the routing structure
    return <PoliticalPartyPortalPage onNavigate={onNavigate} />;
};

export default PartiesPage;
