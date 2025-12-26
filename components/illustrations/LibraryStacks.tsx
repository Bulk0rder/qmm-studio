import React from 'react';

export function LibraryStacks({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.08] dark:opacity-[0.15] text-app ${className}`}>
            <rect x="100" y="100" width="200" height="240" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <rect x="120" y="80" width="200" height="240" rx="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
            <rect x="140" y="60" width="200" height="240" rx="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
            <line x1="130" y1="160" x2="270" y2="160" stroke="currentColor" strokeWidth="1" />
            <line x1="130" y1="200" x2="270" y2="200" stroke="currentColor" strokeWidth="1" />
            <line x1="130" y1="240" x2="200" y2="240" stroke="currentColor" strokeWidth="1" />
        </svg>
    );
}
