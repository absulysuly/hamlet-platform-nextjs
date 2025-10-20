import React from 'react';
import ManagementPageHeader from '../components/ManagementPageHeader.tsx';
import ApiIcon from '../icons/ApiIcon.tsx';
import { useApiConfig } from '../hooks/useManagementData.ts';
import Button from '../components/ui/Button.tsx';

const ApiConnectionRow: React.FC<{ api: { id: string, name: string, status: string, lastChecked: string } }> = ({ api }) => {
    const isConnected = api.status === 'Connected';
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border-b border-official-300">
            <div>
                <h3 className="font-bold text-official-800">{api.name}</h3>
                <div className="flex items-center mt-1">
                    <span className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`text-sm font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>{api.status}</span>
                </div>
            </div>
            <div className="md:col-span-2">
                <div className="flex flex-col md:flex-row gap-2">
                     <input
                        type="password"
                        defaultValue="••••••••••••••••••••"
                        className="w-full p-2 border border-official-300 rounded-md bg-official-100 placeholder-official-700 focus:outline-none focus:ring-2 focus:ring-formal-primary-500"
                        aria-label={`${api.name} API Key`}
                    />
                     <Button variant='secondary' className="flex-shrink-0">Test Connection</Button>
                </div>
            </div>
        </div>
    );
};

const ApiConfigPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
    const { data: apiData, isLoading } = useApiConfig();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ManagementPageHeader
                title="API Configuration"
                description="Manage and test connections to social media APIs for candidate data collection. Ensure all APIs are connected and functional."
                onBack={() => onNavigate('/')}
                icon={<ApiIcon className="w-8 h-8 text-formal-primary-600" />}
            />

            <div className="management-glass-card rounded-lg shadow-lg">
                <div className="p-4 border-b border-white/10 text-lg font-bold">
                    Social Media APIs
                </div>
                {isLoading ? (
                    <p className="p-8 text-center">Loading API statuses...</p>
                ) : (
                    <div>
                        {apiData?.map((api: any) => <ApiConnectionRow key={api.id} api={api} />)}
                    </div>
                )}
                 <div className="p-4 flex justify-end">
                    <Button>Save Configuration</Button>
                </div>
            </div>
        </div>
    );
};

export default ApiConfigPage;
