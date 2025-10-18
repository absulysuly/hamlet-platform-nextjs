import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
            <textarea
                id={id}
                rows={5}
                className="w-full p-3 border border-white/20 rounded-md bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                {...props}
            />
        </div>
    );
};

export default Textarea;
