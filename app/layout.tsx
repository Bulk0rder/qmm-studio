import React from 'react';
import './globals.css';
import { getSession } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UI_COPY } from '@/lib/ui-copy';
import type { Metadata } from 'next';
import { AutoSeed } from '@/components/AutoSeed';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: UI_COPY.APP.NAME,
    description: UI_COPY.APP.TAGLINE,
};

import { PageShell } from '@/components/layout/PageShell';
import { Footer } from '@/components/layout/Footer';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession();

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-app text-app font-sans antialiased selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
                <ThemeProvider defaultTheme="dark" storageKey="qmm-theme">
                    <Suspense fallback={null}>
                        <AnalyticsProvider>
                            <AutoSeed />
                            <Navbar session={session} />
                            <PageShell className="fade-in">
                                {children}
                            </PageShell>
                            <Footer />
                        </AnalyticsProvider>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
