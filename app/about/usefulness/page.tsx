'use client';

import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function UsefulnessPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Usefulness Statement</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Why this tool exists and the philosophy of "The Librarian".
                    </p>
                </div>

                <hr className="border-border" />

                <div className="prose dark:prose-invert max-w-none text-foreground leading-7">
                    <h3 className="text-2xl font-bold">The Problem: Strategic Amnesia</h3>
                    <p>
                        Organizations suffer from "Strategic Amnesia." They solve the same problems over and over again, forgetting what worked and what failed.
                        New leaders arrive and replay the "Cautionary Tales" of their predecessors because the data is buried in PDFs and slide decks nobody reads.
                    </p>

                    <h3 className="text-2xl font-bold mt-8">The Solution: An Operating System</h3>
                    <p>
                        QMM Studio is not just a form; it is an Operating System for decision making. It forces a structured "Physics" (QMM) onto messy market data.
                        By standardizing the inputs (Arena, Entropy, Friction) and structuralizing the outputs (Blueprints), we make strategy <strong>comparable</strong> and <strong>retrievable</strong>.
                    </p>

                    <h3 className="text-2xl font-bold mt-8">The Librarian Archetype</h3>
                    <p>
                        We do not "generate" creative writing. We "retrieve" successful patterns. The Librarian is a dispassionate observer of the market physics.
                        It does not care about your ego or your "pet project." It cares about what has historically worked in this specific configuration of variables.
                    </p>
                </div>
            </div>
        </PageShell>
    );
}
