import React from 'react';
import { PageShell } from '@/components/layout/PageShell';

export default function TermsPage() {
    return (
        <PageShell>
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Terms of Service</h1>
                <p className="text-sm text-muted">Last updated: December 2025</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">1. No Warranties</h2>
                    <p className="text-muted">
                        QMM Studio provides strategic frameworks and advisory tools "as is". While we strive for high-quality heuristic retrieval, business outcomes are subject to execution and market variables. We do not guarantee specific financial results.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">2. User Responsibility</h2>
                    <p className="text-muted">
                        You are responsible for the decisions you make based on QMM Studio outputs. Always apply professional judgement.
                    </p>
                </section>
            </div>
        </PageShell>
    );
}
