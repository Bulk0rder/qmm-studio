'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';

export default function PrivacyPage() {
    return (
        <PageShell>
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last updated: December 2025</p>
                </div>

                <div className="prose dark:prose-invert">
                    <h3>1. Guest Mode Privacy</h3>
                    <p>
                        QMM Studio currently operates in a "Guest Mode" configuration.
                        <strong>We store your scenarios, blueprints, and experiments directly in your browser's local storage.</strong>
                        This means:
                    </p>
                    <ul>
                        <li>Your data does not leave your device in this mode.</li>
                        <li>If you clear your browser cache, your data will be lost.</li>
                        <li>We do not have access to your strategic inputs.</li>
                    </ul>

                    <h3>2. Data Usage</h3>
                    <p>
                        If you choose to use our cloud features in the future, your data will be encrypted at rest and in transit.
                        We do not sell your data to third parties.
                    </p>

                    <h3>3. AI Processing</h3>
                    <p>
                        Inputs provided to the Diagnostic Wizard are processed by our algorithm to generate Blueprints.
                        This data is ephemeral during the generation process and is not used to train global models without your explicit consent.
                    </p>

                    <h3>4. Contact</h3>
                    <p>
                        For privacy concerns, please contact <a href="mailto:support@qmmstudio.app">support@qmmstudio.app</a>.
                    </p>
                </div>
            </div>
        </PageShell>
    );
}
