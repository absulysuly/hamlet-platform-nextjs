import React from 'react';
import ManagementPageHeader from '../components/ManagementPageHeader.tsx';
import { IdentificationIcon } from '../../icons/Icons.tsx';
import { useContactValidationData } from '../hooks/useManagementData.ts';

const QualityScore: React.FC<{ score: number }> = ({ score }) => {
    const getColor = () => {
        if (score > 90) return 'bg-green-500 text-green-800';
        if (score > 75) return 'bg-yellow-400 text-yellow-800';
        return 'bg-red-500 text-red-800';
    };
    return <span className={`px-2 py-1 text-xs font-bold rounded-full ${getColor()}`}>{score}%</span>;
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getClasses = () => {
        switch (status) {
            case 'Verified': return 'status-active';
            case 'Invalid': return 'status-inactive';
            case 'Pending': return 'status-pending';
            default: return 'bg-gray-200 text-gray-800';
        }
    };
     return <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${getClasses()}`}>{status}</span>;
}

const ContactValidationPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const { data: contacts, isLoading } = useContactValidationData();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ManagementPageHeader
                title="Contact Validation Interface"
                description="Review and manage the quality of phone numbers and email addresses collected for candidates to ensure data accuracy."
                onBack={() => onNavigate('/')}
                icon={<IdentificationIcon className="w-8 h-8 text-formal-primary-600" />}
            />

            <div className="management-glass-card rounded-lg shadow-lg overflow-hidden">
                 <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Contact List</h3>
                    {/* Add Filter Buttons Here */}
                 </div>
                 <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-official-800/20">
                            <tr>
                                <th className="p-3 text-sm font-semibold tracking-wide">Contact Details</th>
                                <th className="p-3 text-sm font-semibold tracking-wide hidden md:table-cell">Type</th>
                                <th className="p-3 text-sm font-semibold tracking-wide hidden md:table-cell">Candidate</th>
                                <th className="p-3 text-sm font-semibold tracking-wide">Quality Score</th>
                                <th className="p-3 text-sm font-semibold tracking-wide">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-official-300">
                             {isLoading ? (
                                <tr><td colSpan={5} className="p-8 text-center">Loading contact data...</td></tr>
                            ) : (
                                contacts?.map((contact: any) => (
                                    <tr key={contact.id} className="hover:bg-official-200/50">
                                        <td className="p-3 text-sm font-mono">{contact.contact}</td>
                                        <td className="p-3 text-sm hidden md:table-cell">{contact.type}</td>
                                        <td className="p-3 text-sm hidden md:table-cell">{contact.candidate}</td>
                                        <td className="p-3"><QualityScore score={contact.quality} /></td>
                                        <td className="p-3"><StatusBadge status={contact.status} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
    );
};

export default ContactValidationPage;
