import React from 'react';

const SkeletonPostCard: React.FC = () => {
    return (
        <div className="glass-card rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="p-4 animate-pulse">
                {/* Header */}
                <div className="flex items-center">
                    <div className="w-11 h-11 rounded-full bg-slate-700/50"></div>
                    <div className="ml-3 space-y-2 flex-grow">
                        <div className="h-3 w-32 rounded bg-slate-700/50"></div>
                        <div className="h-2 w-20 rounded bg-slate-700/50"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="my-4 space-y-2">
                    <div className="h-3 rounded bg-slate-700/50"></div>
                    <div className="h-3 w-5/6 rounded bg-slate-700/50"></div>
                </div>

                {/* Image Placeholder */}
                <div className="w-full aspect-video rounded-lg bg-slate-700/50"></div>

                {/* Footer Actions */}
                <div className="border-t border-[var(--color-glass-border)] mt-4 pt-3">
                    <div className="flex justify-around items-center">
                        <div className="h-8 w-20 rounded-lg bg-slate-700/50"></div>
                        <div className="h-8 w-20 rounded-lg bg-slate-700/50"></div>
                        <div className="h-8 w-20 rounded-lg bg-slate-700/50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonPostCard;
