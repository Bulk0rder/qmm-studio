import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ArrowRight, Brain, Target, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-12">
                {/* Hero */}
                <section className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-app">The Scenario Librarian</h1>
                    <p className="text-xl text-muted leading-relaxed">
                        QMM Studio is a strategic memory system for founders and marketers. It replaces the tribal knowledge and repeated mistakes of strategy with a repeatable, retrieval-first engine.
                    </p>
                </section>

                <hr className="border-app" />

                {/* Who it's for */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Target className="text-blue-600" size={20} />
                            For Founders
                        </h3>
                        <p className="text-muted">
                            Stop guessing about growth. Validate your market hypothesis with structural rigor before spending capital.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Brain className="text-purple-600" size={20} />
                            For Strategists
                        </h3>
                        <p className="text-muted">
                            Move from "I think" to "We know". Use the library to retrieve proven patterns and avoid historical failures.
                        </p>
                    </div>
                </section>

                {/* How it works */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-app">How it works</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 rounded-xl border border-app card-surface">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                            <div>
                                <h4 className="font-semibold mb-1">Scenario Input</h4>
                                <p className="text-sm text-muted">You describe the messy business reality (market, customer, constraints).</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl border border-app card-surface">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                            <div>
                                <h4 className="font-semibold mb-1">Retrieval & Blueprint</h4>
                                <p className="text-sm text-muted">The engine retrieves relevant laws (KB) and historical scenarios to generate a 90-day strategy.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl border border-app card-surface">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                            <div>
                                <h4 className="font-semibold mb-1">Experiments</h4>
                                <p className="text-sm text-muted">The blueprint is broken down into testable experiments. You run them, log results, and update the library.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Guest Mode */}
                <section className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-800/30">
                    <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Guest Mode & Privacy</h3>
                    <p className="text-amber-800/80 dark:text-amber-300/70 text-sm leading-relaxed">
                        You are currently exploring in Guest Mode. All scenarios and data you create are stored **locally in your browser** (localStorage). No data is sent to our servers until you choose to sync to a workspace.
                    </p>
                </section>

                <div className="flex justify-center pt-8">
                    <Link href="/new" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                        Start your first Scenario <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
