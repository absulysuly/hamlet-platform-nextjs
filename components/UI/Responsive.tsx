import React from 'react';

export const ResponsiveGrid: React.FC<{ children: React.ReactNode; breakpoint?: 'sm' | 'md' }> = ({ children, breakpoint = 'md' }) => {
  return (
    <div className={`grid grid-cols-1 ${breakpoint}:grid-cols-2 lg:grid-cols-3 gap-4`}>
      {children}
    </div>
  );
};

export const MobileOptimizedCard: React.FC<{ title: string; content: string; actions: React.ReactNode }> = ({ title, content, actions }) => {
  return (
    <div className="glass-card p-4 mobile-card">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm mb-3">{content}</p>
      <div className="flex flex-col sm:flex-row gap-2">
        {actions}
      </div>
    </div>
  );
};
