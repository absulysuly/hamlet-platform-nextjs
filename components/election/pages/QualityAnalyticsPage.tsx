import React from 'react';
import ManagementPageHeader from '../components/ManagementPageHeader.tsx';
import { ChartIcon } from '../../icons/Icons.tsx';
import { useQualityAnalyticsData } from '../hooks/useManagementData.ts';

const DoughnutChart: React.FC<{ data: { verified: number, pending: number, invalid: number } }> = ({ data }) => {
    const { verified, pending, invalid } = data;
    const total = verified + pending + invalid;
    const verifiedOffset = (verified / total) * 100;
    const pendingOffset = (pending / total) * 100;
    
    const circumference = 2 * Math.PI * 40; // 2 * pi * r
    const verifiedStroke = (verifiedOffset / 100) * circumference;
    const pendingStroke = (pendingOffset / 100) * circumference;

    return (
        <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="15" />
                {/* Data segments */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#48bb78" strokeWidth="15"
                    strokeDasharray={`${verifiedStroke} ${circumference}`}
                    transform="rotate(-90 50 50)"
                    className="chart-animated" style={{ strokeDashoffset: circumference }}
                />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f6e05e" strokeWidth="15"
                    strokeDasharray={`${pendingStroke} ${circumference}`}
                    transform={`rotate(${-90 + verifiedOffset * 3.6} 50 50)`}
                     className="chart-animated" style={{ strokeDashoffset: circumference, animationDelay: '0.5s' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-3xl font-bold text-official-900">{verified}%</span>
                 <span className="text-sm font-semibold text-official-700">Verified</span>
            </div>
        </div>
    );
};

const BarChart: React.FC<{ data: {name: string, quality: number}[] }> = ({ data }) => (
    <div className="w-full h-80 bg-official-100 rounded-lg p-4 flex items-end justify-around space-x-2">
        {data.map((item, index) => (
            <div key={item.name} className="flex-1 flex flex-col items-center h-full justify-end">
                <div 
                    className="w-full bg-formal-primary-500 rounded-t-md progress-bar-animated" 
                    style={{ height: `${item.quality}%`, animationDelay: `${index * 100}ms` }}
                    title={`${item.name}: ${item.quality}%`}
                ></div>
                <span className="text-xs font-semibold mt-2 text-official-700">{item.name}</span>
            </div>
        ))}
    </div>
);


const QualityAnalyticsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const { data, isLoading } = useQualityAnalyticsData();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ManagementPageHeader
                title="Quality Analytics Dashboard"
                description="Visualize data quality metrics to track performance, identify issues, and ensure the reliability of candidate information."
                onBack={() => onNavigate('/')}
                icon={<ChartIcon className="w-8 h-8 text-formal-primary-600" />}
            />
            
            {isLoading ? <p className="text-center">Loading analytics data...</p> : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="management-glass-card rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4 text-official-900">Overall Data Quality</h3>
                    <DoughnutChart data={data.overallQuality} />
                    <div className="flex justify-center space-x-4 mt-4 text-sm">
                        <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Verified</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>Pending</div>
                        <div className="flex items-center"><span className="w-3 h-3 bg-official-200 rounded-full mr-2"></span>Invalid</div>
                    </div>
                </div>
                 <div className="management-glass-card rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4 text-official-900">Data Completeness by Governorate</h3>
                    <BarChart data={data.qualityByGov} />
                </div>
            </div>
            )}
        </div>
    );
};

export default QualityAnalyticsPage;
