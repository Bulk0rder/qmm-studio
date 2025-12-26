import React from 'react';

export function TimelineArc({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.08] dark:opacity-[0.15] text-app ${className}`}>
            <path d="M20 180 C100 20, 300 20, 380 180" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="180" r="6" fill="currentColor" />
            <circle cx="380" cy="180" r="6" fill="currentColor" />
            <circle cx="200" cy="65" r="8" fill="currentColor" />
            <path d="M200 65 L200 180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
    );
}
