'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { BackButton } from '@/components/ui/BackButton';

export default function TermsPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <BackButton />

                <header className="border-b border-app pb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-app mb-2">Terms of Service</h1>
                    <p className="text-muted">Last updated: December 27, 2025</p>
                </header>

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Agreement</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            By using QMM Studio, you agree to these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">What QMM Studio provides</h2>
                        <p className="text-sm text-muted leading-relaxed mb-3">QMM Studio helps you:</p>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1 mb-4">
                            <li>Capture marketing scenarios</li>
                            <li>Generate advisory blueprints using the Quantum Marketing Model (QMM)</li>
                            <li>Track experiments and learnings over time</li>
                        </ul>
                        <p className="text-sm text-muted italic">
                            Outputs are advisory in nature and should be evaluated by your team before implementation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">No professional guarantee</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            QMM Studio provides guidance and structured thinking tools. We do not guarantee outcomes (e.g., revenue growth, conversion uplift, cost reduction). You are responsible for decisions made using the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Acceptable use</h2>
                        <p className="text-sm text-muted leading-relaxed mb-3">You agree not to:</p>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>Use the product to break laws or violate regulations</li>
                            <li>Upload content you don’t have the right to use</li>
                            <li>Attempt to disrupt, hack, or reverse engineer the service</li>
                            <li>Use the platform to generate deceptive or harmful campaigns</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Intellectual property</h2>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>QMM Studio’s design, code, and brand belong to its creators.</li>
                            <li>You retain rights to the scenarios and original content you create.</li>
                            <li>Generated outputs may be used by you for your work, subject to these Terms.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Availability and changes</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            We may update, modify, or discontinue features at any time. We will aim to minimize disruption.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Disclaimer</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            QMM Studio is provided “as is” without warranties of any kind (express or implied). Use is at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Limitation of liability</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            To the maximum extent permitted by law, QMM Studio will not be liable for indirect, incidental, or consequential damages arising from use of the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Termination</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            We may suspend or terminate access if these Terms are violated.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Contact</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            Support and inquiries: <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </PageShell>
    );
}
