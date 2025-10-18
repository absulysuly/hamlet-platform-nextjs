import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
    const baseClasses = "px-6 py-2 font-bold rounded-md transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-formal-primary-600 text-white hover:bg-formal-primary-700 shadow-md",
        secondary: "bg-official-200 text-official-800 hover:bg-official-300",
        outline: "bg-transparent border-2 border-formal-primary-600 text-formal-primary-600 hover:bg-formal-primary-600 hover:text-white",
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;