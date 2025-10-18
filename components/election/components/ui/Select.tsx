import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    id: string;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
            <select
                id={id}
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand-teal [&>option]:bg-mocha-black"
                {...props}
            >
                {children}
            </select>
        </div>
    );
};

export default Select;
