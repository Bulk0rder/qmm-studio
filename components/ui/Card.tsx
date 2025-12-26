import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`card-surface rounded-xl overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return <h3 className={`text-lg font-semibold text-app leading-none tracking-tight ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return <p className={`text-sm text-muted ${className}`}>{children}</p>;
}
