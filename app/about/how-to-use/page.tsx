'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Compass, Layers, Zap } from 'lucide-react';
import Link from 'next/link';
import { UI_COPY } from '@/lib/ui-copy';

export default function HowToUsePage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in delay-100 duration-700">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-app">How to Operate QMM Studio</h1>
                    <p className="text-xl text-muted">A manual for the strategic decision operating system.</p>
                </div>

                <div className="grid gap-8">
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                            <Compass size={24} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">1. Diagnosis</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Start every cycle at <strong>/new</strong>. The system needs to understand the physics of your battlefield: Industry, Market, Constraints, and Entropy (The Problem). The more honest you are about your constraints (Budget, Time), the better the output.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shrink-0">
                            <Layers size={24} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">2. The Blueprint</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                The engine generates a 7-part strategic document. You must view this through three lenses in the Advisory room:
                            </p>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-2">
                                <li><strong>Boardroom:</strong> For high-level governance and ROI alignment.</li>
                                <li><strong>Operator:</strong> For the actual execution and 30-day plan.</li>
                                <li><strong>Creative:</strong> For the narrative arc and brand voice.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                            <Zap size={24} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">3. Experiments</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A strategy is just a hypothesis until tested. Push your Blueprint's "Big Bets" into the Experiments log. Track them as "Known Winners" to build your organization's institutional memory.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
                    <h3 className="font-semibold text-lg">Ready to start?</h3>
                    <div className="flex justify-center gap-4">
                        <Link href="/new">
                            <Button size="lg">Start New Diagnosis <ArrowRight size={16} className="ml-2" /></Button>
                        </Link>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
