import React from 'react';

interface PageShellProps {
    children: React.ReactNode;
    className?: string;
    as?: 'main' | 'div' | 'section';
}

/**
 * STRICT PAGE SHELL
 * Enforces consistent horizontal padding and max-width across the application.
 * prevents content from touching viewport borders.
 */
export function PageShell({ children, className = '', as = 'main' }: PageShellProps) {
    const Component = as;

    return (
        <Component
            className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-14 py-10 md:py-12 ${className}`}
        >
            {children}
        </Component>
    );
}
