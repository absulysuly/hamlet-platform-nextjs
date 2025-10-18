import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
            <input
                id={id}
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                {...props}
            />
        </div>
    );
};

export default Input;
