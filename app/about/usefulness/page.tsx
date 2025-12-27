'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { BrainCircuit, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function UsefulnessPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in delay-100 duration-700">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-app">Why This Exists</h1>
                    <p className="text-xl text-muted">Combating the entropy of bad decision making.</p>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                        Most marketing teams suffer from "Strategic Drift". They start with a goal, but get distracted by new channels, competitor noise, and internal politics.
                        QMM Studio acts as a <strong className="text-blue-600">Strategic Governor</strong>. It forces every decision to pass through the immutable laws of marketing physics.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <BrainCircuit className="text-blue-500 mb-4" size={32} />
                        <h3 className="font-bold mb-2">Pattern Matching</h3>
                        <p className="text-sm text-muted-foreground">Don't reinvent the wheel. We match your symptom to 30+ proven solved scenarios.</p>
                    </div>
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <TrendingUp className="text-emerald-500 mb-4" size={32} />
                        <h3 className="font-bold mb-2">Velocity</h3>
                        <p className="text-sm text-muted-foreground">Skip the 3-week "strategy planning" phase. Get to a testable hypothesis in 3 minutes.</p>
                    </div>
                    <div className="p-6 border border-border rounded-xl bg-card">
                        <ShieldCheck className="text-purple-500 mb-4" size={32} />
                        <h3 className="font-bold mb-2">Governance</h3>
                        <p className="text-sm text-muted-foreground">Standardized output formats (Boardroom, Operator, Creative) ensure alignment across the org.</p>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
