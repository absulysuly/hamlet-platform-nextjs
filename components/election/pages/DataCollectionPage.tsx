import React from 'react';
import ManagementPageHeader from '../components/ManagementPageHeader.tsx';
import { DatabaseIcon, PlayIcon, PauseIcon, XMarkIcon } from '../../icons/Icons.tsx';
import { useDataCollection } from '../hooks/useManagementData.ts';
import Button from '../components/ui/Button.tsx';

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="management-glass-card p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-formal-primary-600">{value.toLocaleString()}</p>
        <p className="text-sm font-semibold text-official-800 mt-1">{title}</p>
    </div>
);

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div>
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-official-800">Overall Progress</span>
            <span className="text-sm font-medium text-official-800">{Math.round(value)}%</span>
        </div>
        <div className="w-full bg-official-200 rounded-full h-4">
            <div className="bg-formal-primary-500 h-4 rounded-full progress-bar-animated" style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

const DataCollectionPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const { data: stats, isLoading } = useDataCollection();

    if (isLoading || !stats) {
        return <div className="p-8 text-center">Loading collection data...</div>;
    }

    const isRunning = stats.status === 'Running';

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ManagementPageHeader
                title="Data Collection Dashboard"
                description="Monitor and control the automated process of collecting candidate data from various online sources in real-time."
                onBack={() => onNavigate('/')}
                icon={<DatabaseIcon className="w-8 h-8 text-formal-primary-600" />}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Stats & Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="management-glass-card rounded-lg p-6">
                        <h3 className="font-bold text-lg mb-4 text-official-900 border-b border-official-300 pb-2">Controls</h3>
                        <div className="flex justify-around items-center">
                             <button className={`p-4 rounded-full transition-colors ${isRunning ? 'bg-green-500/20 text-green-700' : 'bg-official-200 text-official-700'}`} aria-label="Start Collection">
                                <PlayIcon className="w-6 h-6" />
                            </button>
                            <button className="p-4 rounded-full bg-official-200 text-official-700 hover:bg-official-300 transition-colors" aria-label="Pause Collection">
                                <PauseIcon className="w-6 h-6" />
                            </button>
                             <button className="p-4 rounded-full bg-red-500/20 text-red-700 hover:bg-red-500/30 transition-colors" aria-label="Stop Collection">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <StatCard title="Candidates Found" value={stats.candidatesFound} />
                        <StatCard title="Profiles Scraped" value={stats.profilesScraped} />
                        <StatCard title="Contacts Collected" value={stats.contactsCollected} />
                         <div className="management-glass-card p-4 rounded-lg text-center bg-green-500/10">
                            <p className="text-3xl font-bold text-green-700">{stats.status}</p>
                            <p className="text-sm font-semibold text-green-800 mt-1">Status</p>
                        </div>
                    </div>
                     <div className="management-glass-card rounded-lg p-6">
                        <ProgressBar value={stats.progress} />
                    </div>
                </div>

                {/* Right Column: Log */}
                <div className="lg:col-span-2 management-glass-card rounded-lg p-6 min-h-[400px] flex flex-col">
                    <h3 className="font-bold text-lg mb-4 text-official-900 border-b border-official-300 pb-2">Activity Log</h3>
                    <div className="flex-grow bg-official-900 rounded-md p-4 font-mono text-sm text-slate-200 overflow-y-auto h-96">
                        {stats.log.map((entry: string, i: number) => (
                            <p key={i} className={`${entry.startsWith('ERROR') ? 'text-red-400' : entry.startsWith('WARN') ? 'text-yellow-400' : 'text-slate-300'}`}>
                                {entry}
                            </p>
                        )).reverse()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataCollectionPage;
