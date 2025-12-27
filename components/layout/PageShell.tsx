import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

export const PageShell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
            <Navbar />
            <main className={`flex-1 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14 py-8 ${className}`}>
                {children}
            </main>
            <Footer />
        </div>
    );
};
