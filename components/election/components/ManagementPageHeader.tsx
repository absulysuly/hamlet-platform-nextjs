import React from 'react';
import { ArrowLeftIcon } from '../../icons/Icons.tsx';

interface ManagementPageHeaderProps {
    title: string;
    description: string;
    onBack: () => void;
    icon: React.ReactNode;
}

const ManagementPageHeader: React.FC<ManagementPageHeaderProps> = ({ title, description, onBack, icon }) => {
    return (
        <div className="mb-8">
            <button onClick={onBack} className="flex items-center space-x-2 text-formal-primary-500 mb-4 hover:underline">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>العودة إلى لوحة التحكم</span>
            </button>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-formal-primary-100 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-official-900">{title}</h1>
                    <p className="mt-1 text-official-700 max-w-2xl">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ManagementPageHeader;
