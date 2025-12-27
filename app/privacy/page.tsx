'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { BackButton } from '@/components/ui/BackButton';

export default function PrivacyPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <BackButton />

                <header className="border-b border-app pb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-app mb-2">Privacy Policy</h1>
                    <p className="text-muted">Last updated: December 27, 2025</p>
                </header>

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Overview</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            QMM Studio is built to help marketers create scenarios, generate advisory blueprints, and track experiments. This Privacy Policy explains what data we collect, how we use it, and the choices you have.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Data we store in Guest Mode</h2>
                        <p className="text-sm text-muted leading-relaxed mb-3">
                            If you use QMM Studio in Guest Mode, your content is stored locally in your browser (via localStorage). This may include:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>Scenarios you create</li>
                            <li>Generated blueprints</li>
                            <li>Experiments and results you log</li>
                            <li>Knowledge Base items you add</li>
                            <li>Preferences (e.g., Delivery Voice, theme)</li>
                        </ul>
                        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">
                                Important: In Guest Mode, this data is not automatically uploaded to a server. If you clear your browser storage, switch devices, or use a private window, you may lose this data.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Data we collect automatically</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            Unless explicitly enabled, QMM Studio does not require you to submit personal information to use the core experience. If we enable analytics in the future, we may collect basic usage signals (e.g., page views, device type) to improve performance and user experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">How we use information</h2>
                        <p className="text-sm text-muted leading-relaxed mb-3">We use stored information to:</p>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>Render your scenarios, blueprints, and experiments</li>
                            <li>Improve the usability and reliability of the product</li>
                            <li>Diagnose errors and fix bugs (when you choose to share logs or feedback)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Sharing</h2>
                        <p className="text-sm text-muted leading-relaxed mb-3">
                            We do not sell your data. We do not share your scenario content with third parties unless:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>you explicitly request an integration, or</li>
                            <li>we are required by law to do so.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Data retention & deletion</h2>
                        <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                            <li>Guest Mode: You control your data. To delete it, clear your browser storage for this site.</li>
                            <li>If account-based storage is added later, we will provide an in-app deletion mechanism.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Security</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            We use reasonable safeguards, but no system is perfectly secure. Avoid entering sensitive personal data into scenario fields.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Children’s privacy</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            QMM Studio is not designed for children under 13.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-app mb-3">Contact</h2>
                        <p className="text-sm text-muted leading-relaxed">
                            Questions or requests: <a href="mailto:support@yourdomain.com" className="text-blue-600 hover:underline">support@yourdomain.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </PageShell>
    );
}
