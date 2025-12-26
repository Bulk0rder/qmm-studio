import React from 'react';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`flex h-10 w-full rounded-lg border border-app bg-transparent px-3 py-2 text-sm text-app placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
            {...props}
        />
    );
}

export function Label({ children, htmlFor, className = '' }: { children: React.ReactNode, htmlFor?: string, className?: string }) {
    return (
        <label htmlFor={htmlFor} className={`text-sm font-medium text-app leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block ${className}`}>
            {children}
        </label>
    );
}

export function Textarea({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={`flex min-h-[120px] w-full rounded-lg border border-app bg-transparent px-3 py-2 text-sm text-app placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
            {...props}
        />
    );
}
