import React from 'react';
import { PageShell } from '@/components/layout/PageShell';

export default function PrivacyPage() {
    return (
        <PageShell>
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-muted">Last updated: December 2025</p>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">1. Local Storage</h2>
                    <p className="text-muted">
                        QMM Studio operates in a "Local First" mode for guest users. All scenarios, experiments, and blueprints you create are stored securely in your browser's LocalStorage. This data does not leave your device unless you explicitly sign in and choose to sync.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">2. Data Collection</h2>
                    <p className="text-muted">
                        We collect minimal anonymous usage data to improve the application performance. We do not inspect the contents of your strategic scenarios without your consent.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">3. Contact</h2>
                    <p className="text-muted">
                        For any privacy concerns, please contact privacy@antigravity.studio.
                    </p>
                </section>
            </div>
        </PageShell>
    );
}
