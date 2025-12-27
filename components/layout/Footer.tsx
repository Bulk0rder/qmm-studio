import React from 'react';
import Link from 'next/link';
import { UI_COPY } from '@/lib/ui-copy';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-app bg-zinc-50 dark:bg-zinc-950 mt-auto">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="font-bold text-xl mb-4 text-app flex items-center gap-2">
                            <div className="w-5 h-5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded shadow-sm"></div>
                            {UI_COPY.APP.NAME}
                        </div>
                        <p className="text-sm text-muted max-w-sm mb-6">
                            The Scenario Librarian. Turn unclear business situations into validated strategies using QMM (JTBD × Lean × AIDA).
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-muted">
                            <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded">v0.1.0-beta</span>
                            <span>Guest Mode Active</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/new" className="text-muted hover:text-app transition-colors">New Scenario</Link></li>
                            <li><Link href="/library" className="text-muted hover:text-app transition-colors">Scenario Library</Link></li>
                            <li><Link href="/experiments" className="text-muted hover:text-app transition-colors">Experiments</Link></li>
                            <li><Link href="/kb" className="text-muted hover:text-app transition-colors">Knowledge Base</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-muted hover:text-app transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="text-muted hover:text-app transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted hover:text-app transition-colors">Terms of Service</Link></li>
                            <li><a href="mailto:hello@antigravity.studio" className="text-muted hover:text-app transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
                    <div>
                        &copy; {currentYear} Antigravity Studios. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <span>Local Storage Mode</span>
                        <span>No Tracking</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
