import React from 'react';
import { User } from '../../types.ts';

const DiscoverView: React.FC<{
    user: User | null;
    requestLogin: () => void;
    onSelectCandidate: (candidate: User) => void;
}> = () => {
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-slate-100">Discover</h1>
            <div className="mt-4 glass-card rounded-lg p-6 text-center">
                <p className="text-slate-300">Discover candidates and topics here.</p>
                <p>This feature is under construction.</p>
            </div>
        </div>
    );
};

export default DiscoverView;
