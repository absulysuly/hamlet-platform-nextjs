import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData.ts';
import { UsersGroupIcon, ClipboardCheckIcon, ClockIcon, ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from '../../icons/Icons.tsx';
import { Language } from '../../../types.ts';
import { UI_TEXT } from '../../../translations.ts';


interface DashboardPageProps {
    language: Language;
}
// --- SUB-COMPONENTS for FORMAL DASHBOARD ---

const FormalHeader: React.FC<{ language: Language }> = ({ language }) => {
    const texts = UI_TEXT[language];
    return (
        <div className="formal-header rounded-lg p-6 mb-8 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{texts.electionDashboard}</h1>
                    <p className="text-lg text-slate-300 font-arabic">{texts.dashboardSubtitle}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">{texts.iraqiElections}</p>
                    <p className="text-slate-300">{texts.electionYear}</p>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="management-glass-card p-4 rounded-lg">
        <div className="flex items-center">
            <div className="p-3 bg-formal-primary-500/20 rounded-full text-formal-primary-600 mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-official-700">{title}</p>
                <p className="text-2xl font-bold text-official-900">{value}</p>
            </div>
        </div>
    </div>
);

const TimelineItem: React.FC<{ date: string; title: string; isComplete: boolean }> = ({ date, title, isComplete }) => (
    <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full mr-4 ${isComplete ? 'bg-formal-primary-500' : 'bg-official-300'}`}></div>
        <div>
            <p className={`font-bold ${isComplete ? 'text-official-900' : 'text-official-700'}`}>{title}</p>
            <p className="text-sm text-official-700">{date}</p>
        </div>
    </div>
);

const useSortableData = (items: any[], config = null) => {
    const [sortConfig, setSortConfig] = React.useState<{key: string, direction: 'ascending' | 'descending'} | null>(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const GovernorateTable: React.FC<{ data: any[], language: Language }> = ({ data, language }) => {
    const { items, requestSort, sortConfig } = useSortableData(data);
    const texts = UI_TEXT[language];

    const getSortIcon = (name: string) => {
        if (!sortConfig || sortConfig.key !== name) {
            return <ChevronUpDownIcon className="w-4 h-4" />;
        }
        return sortConfig.direction === 'ascending' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent text-right">
                <thead className="bg-official-800/5">
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide">
                             <button onClick={() => requestSort('governorateName')} className="flex items-center gap-1">{texts.table.governorate} {getSortIcon('governorateName')}</button>
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide">
                            <button onClick={() => requestSort('estimatedTurnout')} className="flex items-center gap-1">{texts.table.turnout} {getSortIcon('estimatedTurnout')}</button>
                        </th>
                        <th className="p-3 text-sm font-semibold tracking-wide">{texts.table.status}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-official-300/50">
                    {items.map(gov => (
                        <tr key={gov.governorateId} className="hover:bg-official-800/5">
                            <td className="p-3 text-sm text-official-800 font-bold">{gov.governorateName}</td>
                            <td className="p-3 text-sm text-official-800">{gov.estimatedTurnout}%</td>
                            <td className="p-3">
                                <span className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${gov.estimatedTurnout > 50 ? 'status-active' : 'status-pending'}`}>
                                    {gov.estimatedTurnout > 50 ? texts.status.active : texts.status.medium}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const DashboardPage: React.FC<DashboardPageProps> = ({ language }) => {
  const { data, isLoading, error } = useDashboardData();
  const texts = UI_TEXT[language];

  if (isLoading) {
    return <div className="p-8 text-center">{texts.loading}</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  }

  const stats = data!.stats;
  const participation = data!.participation;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <FormalHeader language={language} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title={texts.totalVoters} value={stats.totalRegisteredVoters.toLocaleString()} icon={<UsersGroupIcon className="w-6 h-6"/>} />
        <StatCard title={texts.approvedCandidates} value={stats.approvedCandidatesCount.toLocaleString()} icon={<ClipboardCheckIcon className="w-6 h-6"/>} />
        <StatCard title={texts.expectedTurnout} value={`${stats.expectedTurnoutPercentage}%`} icon={<ClockIcon className="w-6 h-6"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 management-glass-card p-6">
             <h2 className="text-xl font-bold text-official-900 mb-4">{texts.governorateStats}</h2>
             <GovernorateTable data={participation} language={language} />
        </div>
        <div className="management-glass-card p-6">
            <h2 className="text-xl font-bold text-official-900 mb-4">{texts.electionTimeline}</h2>
            <div className="space-y-4">
                <TimelineItem date="August 1, 2024" title={texts.timeline.voterRegistration} isComplete={true} />
                <TimelineItem date="September 15, 2024" title={texts.timeline.candidateDeadline} isComplete={true} />
                <TimelineItem date="October 1, 2024" title={texts.timeline.campaignPeriod} isComplete={false} />
                <TimelineItem date="November 5, 2024" title={texts.timeline.electionDay} isComplete={false} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;