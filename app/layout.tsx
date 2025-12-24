import React from 'react';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                <nav className="border-b bg-white">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="font-bold text-xl tracking-tight text-blue-900">
                            QMM Studio
                        </Link>
                        <div className="flex gap-6 text-sm font-medium text-gray-600">
                            <Link href="/new" className="hover:text-blue-600">New Scenario</Link>
                            <Link href="/tracker" className="hover:text-blue-600">Experiments</Link>
                            <Link href="/kb" className="hover:text-blue-600">Knowledge Base</Link>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                            MI
                        </div>
                    </div>
                </nav>
                <main className="container mx-auto px-4 py-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
