import React from 'react';

export function OrbitNodes({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={`opacity-[0.08] dark:opacity-[0.15] text-app ${className}`}>
            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="270" cy="270" r="8" fill="currentColor" />
            <circle cx="130" cy="130" r="6" fill="currentColor" />
            <circle cx="310" cy="200" r="4" fill="currentColor" />
        </svg>
    );
}
