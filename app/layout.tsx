import React from 'react';
import './globals.css';
import { getSession } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UI_COPY } from '@/lib/ui-copy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: UI_COPY.APP.NAME,
    description: UI_COPY.APP.TAGLINE,
};

import { PageShell } from '@/components/layout/PageShell';
import { Footer } from '@/components/layout/Footer';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = getSession();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-app text-app font-sans antialiased selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
                <ThemeProvider defaultTheme="system" storageKey="qmm-theme">
                    <Navbar session={session} />
                    <PageShell className={session ? "pt-24 md:pt-32 fade-in" : "fade-in pt-24"}>
                        {children}
                    </PageShell>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
