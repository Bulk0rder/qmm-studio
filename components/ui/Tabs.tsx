'use client';

import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{
    value: string;
    onValueChange: (value: string) => void;
} | null>(null);

interface TabsProps {
    defaultValue: string;
    className?: string;
    children: React.ReactNode;
}

export function Tabs({ defaultValue, className = '', children }: TabsProps) {
    const [value, setValue] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, onValueChange: setValue }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({ className = '', children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`inline-flex h-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 text-muted ${className}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({ value, className = '', children }: { value: string, className?: string, children: React.ReactNode }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const isActive = context.value === value;

    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 
            ${isActive ? 'bg-white dark:bg-black text-app shadow-sm border border-black/5 dark:border-white/5' : 'hover:bg-black/5 dark:hover:bg-white/5 hover:text-app'} 
            ${className}`}
            onClick={() => context.onValueChange(value)}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, className = '', children }: { value: string, className?: string, children: React.ReactNode }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    if (context.value !== value) return null;

    return (
        <div className={`mt-2 focus-visible:outline-none ${className}`}>
            {children}
        </div>
    );
}
