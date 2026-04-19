'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-border mt-auto bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-14 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-foreground">QMM Studio</h4>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            The Scenario Librarian. Turning market ambiguity into boardroom strategy.
                        </p>
                        <div className="text-xs text-muted-foreground">
                            Guest Mode • v1.0
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-3">
                            <h5 className="font-semibold text-sm">Studio</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/diagnose" className="hover:text-primary transition-colors">Diagnose</Link></li>
                                <li><Link href="/memory" className="hover:text-primary transition-colors">Memory</Link></li>
                                <li><Link href="/physics" className="hover:text-primary transition-colors">Physics</Link></li>
                                <li><Link href="/lab" className="hover:text-primary transition-colors">The Lab</Link></li>
                                <li><Link href="/blueprint" className="hover:text-primary transition-colors">Blueprint</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h5 className="font-semibold text-sm">Legal & About</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} QMM Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
