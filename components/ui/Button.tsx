import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-sm",
        secondary: "bg-transparent border border-app text-app hover:bg-zinc-100 dark:hover:bg-zinc-800",
        outline: "border border-app bg-transparent text-app hover:bg-zinc-50 dark:hover:bg-zinc-800",
        ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted hover:text-app",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 text-base",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
