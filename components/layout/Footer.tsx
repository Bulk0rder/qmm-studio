import React from 'react';
import { UI_COPY } from '@/lib/ui-copy';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-app bg-zinc-50 dark:bg-zinc-900/50 py-12 px-6">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-md shadow-sm"></div>
                        <span className="font-semibold text-app">{UI_COPY.APP.NAME}</span>
                    </div>
                    <p className="text-sm text-muted">
                        AI-powered Qualitative Model Management Studio.
                    </p>
                    <p className="text-xs text-muted">v0.1.0 Beta</p>
                </div>

                <div>
                    <h4 className="font-semibold text-sm mb-4 text-app">Product</h4>
                    <ul className="space-y-2 text-sm text-muted">
                        <li><Link href="/new" className="hover:text-app transition-colors">New Scenario</Link></li>
                        <li><Link href="/library" className="hover:text-app transition-colors">Library</Link></li>
                        <li><Link href="/experiments" className="hover:text-app transition-colors">Experiments</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-sm mb-4 text-app">Resources</h4>
                    <ul className="space-y-2 text-sm text-muted">
                        <li><Link href="/kb" className="hover:text-app transition-colors">Knowledge Base</Link></li>
                        <li><Link href="/about/how-to-use" className="hover:text-app transition-colors">How to Use</Link></li>
                        <li><Link href="/about/usefulness" className="hover:text-app transition-colors">Usefulness</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-sm mb-4 text-app">Legal</h4>
                    <ul className="space-y-2 text-sm text-muted">
                        <li><span className="cursor-not-allowed">Privacy Policy</span></li>
                        <li><span className="cursor-not-allowed">Terms of Service</span></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-muted">
                &copy; {new Date().getFullYear()} {UI_COPY.APP.NAME}. All rights reserved.
            </div>
        </footer>
    );
}
