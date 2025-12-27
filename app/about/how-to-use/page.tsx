import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ArrowRight, PlayCircle, PenTool, Database, Beaker } from 'lucide-react';
import Link from 'next/link';

export default function HowToUsePage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-12">
                <section>
                    <h1 className="text-3xl font-bold tracking-tight text-app mb-4">How to use QMM Studio</h1>
                    <p className="text-lg text-muted">A step-by-step guide to turning ambiguity into validated strategy.</p>
                </section>

                <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="group relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-blue-600 group-hover:bg-blue-600 transition-colors"></div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <PenTool size={20} className="text-blue-600" />
                            1. Define the Scenario
                        </h3>
                        <p className="text-muted mb-4">
                            Go to <Link href="/new" className="text-blue-600 hover:underline">New Scenario</Link>. Be specific about your market conditions, customer segment, and the core problem. "We are a B2B SaaS losing deals to a cheaper competitor" is better than "Growth is slow".
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="group relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-purple-600 group-hover:bg-purple-600 transition-colors"></div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <Database size={20} className="text-purple-600" />
                            2. Review Retrieval
                        </h3>
                        <p className="text-muted mb-4">
                            The Studio will find familiar patterns in the Knowledge Base. Review these matches to understand the "Physics" of your situation before acting.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="group relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-emerald-600 group-hover:bg-emerald-600 transition-colors"></div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <PlayCircle size={20} className="text-emerald-600" />
                            3. Generate Blueprint
                        </h3>
                        <p className="text-muted mb-4">
                            Click <strong>Generate Blueprint</strong>. You will get a 7-part advisory report including a Diagnosis, Strategy, and Roadmap. Toggle between <strong>Boardroom</strong> voice (for executives) and <strong>Operator</strong> voice (for execution).
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="group relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-orange-600 group-hover:bg-orange-600 transition-colors"></div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <Beaker size={20} className="text-orange-600" />
                            4. Run Experiments
                        </h3>
                        <p className="text-muted mb-4">
                            The blueprint suggests experiments. Go to the <Link href="/experiments" className="text-blue-600 hover:underline">Experiments</Link> tab to log them. Track your hypothesis, run the test, and log the result to learn what actually works.
                        </p>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
