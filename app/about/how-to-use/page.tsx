'use client';

import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { UI_COPY } from '@/lib/ui-copy';

export default function HowToUsePage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">How to Use QMM Studio</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        The Scenario Librarian Strategic Decision OS is designed to remove ambiguity from decision making.
                    </p>
                </div>

                <hr className="border-border" />

                <div className="space-y-12">
                    <section className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                            <h3 className="text-2xl font-bold text-foreground">Diagnosis (The Arena)</h3>
                        </div>
                        <p className="text-lg text-muted-foreground ml-14">
                            Start at <strong>New Scenario</strong>. Define your market conditions, the entropy (chaos/competitors), and the friction stopping your growth. Be honest—garbage in, garbage out.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                            <h3 className="text-2xl font-bold text-foreground">Retrieval</h3>
                        </div>
                        <p className="text-lg text-muted-foreground ml-14">
                            The system searches the <strong>Institutional Memory</strong> (Knowledge Base & Library) for similar historical patterns. Review these matches to verify that the system "understands" your context.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                            <h3 className="text-2xl font-bold text-foreground">The Advisory Board</h3>
                        </div>
                        <p className="text-lg text-muted-foreground ml-14">
                            Receive a 7-part Strategic Blueprint. Use the <strong>Voice Toggle</strong> to translate the strategy for different stakeholders:
                        </p>
                        <ul className="ml-14 space-y-2 list-disc pl-5 text-muted-foreground">
                            <li><strong>Boardroom:</strong> High-level executive brief. "Why are we doing this?"</li>
                            <li><strong>Operator:</strong> 30-day tactical roadmap. "What do I do Monday?"</li>
                            <li><strong>Creative:</strong> The "Angle" and hook. "How do we make it weird?"</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                            <h3 className="text-2xl font-bold text-foreground">Experiments</h3>
                        </div>
                        <p className="text-lg text-muted-foreground ml-14">
                            Deploy the strategy. Log experiments directly from the Blueprint. Track Wins and Losses. Winning experiments are promoted back to the <strong>Scenario Library</strong>, making the system smarter for the next user.
                        </p>
                    </section>
                </div>

                <div className="pt-8 text-center">
                    <Link href="/new">
                        <Button size="lg">Start a Diagnosis</Button>
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
