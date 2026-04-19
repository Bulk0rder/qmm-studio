import React from 'react';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, BookOpen, Compass, Share2 } from 'lucide-react';
import Link from 'next/link';
import { KB_SEED } from '@/lib/kb-data';

interface KBDetailPageProps {
    params: {
        id: string;
    };
}

export function generateStaticParams() {
    return KB_SEED.map(item => ({ id: item.id }));
}

export function generateMetadata({ params }: KBDetailPageProps) {
    const item = KB_SEED.find(k => k.id === params.id);
    if (!item) {
        return {
            title: 'Knowledge Base | QMM Studio'
        };
    }

    return {
        title: `${item.title} | QMM Studio`,
        description: item.summary
    };
}

export default function KBDetailPage({ params }: KBDetailPageProps) {
    const item = KB_SEED.find(k => k.id === params.id);

    if (!item) {
        notFound();
    }

    const sections = item.content
        .split('\n\n')
        .map(section => section.trim())
        .filter(Boolean);

    const isQuantumLaw = item.category === 'Quantum Laws';

    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/kb">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
                            <ArrowLeft size={16} /> Back to Physics
                        </Button>
                    </Link>
                    <Button variant="outline" size="sm" disabled className="opacity-70">
                        <Share2 size={14} className="mr-2" /> Share
                    </Button>
                </div>

                <header className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge>{item.category}</Badge>
                        <Badge variant="outline" className="text-muted-foreground">ID: {item.id}</Badge>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-app leading-tight">
                        {item.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {item.summary}
                    </p>
                </header>

                <hr className="border-border" />

                <article className="space-y-5 text-foreground">
                    {sections.map((section, index) => {
                        const [label, ...rest] = section.split(':');
                        const hasLabel = rest.length > 0 && label.length < 40;
                        return (
                            <section key={`${item.id}-${index}`} className="rounded-xl border border-border bg-card p-5">
                                {hasLabel ? (
                                    <>
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">
                                            {label}
                                        </h2>
                                        <p className="leading-7 text-app/90 whitespace-pre-wrap">{rest.join(':').trim()}</p>
                                    </>
                                ) : (
                                    <p className="leading-7 text-app/90 whitespace-pre-wrap">{section}</p>
                                )}
                            </section>
                        );
                    })}
                </article>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40">
                        <h3 className="flex items-center gap-2 font-bold mb-2 text-blue-900 dark:text-blue-200">
                            <Compass size={16} />
                            Blueprint Trigger
                        </h3>
                        <p className="text-sm text-blue-900/70 dark:text-blue-200/70 leading-relaxed">
                            Use this law when a scenario shows uncertainty, sequencing risk, trust fragility, or a gap between stated intent and observed behavior.
                        </p>
                    </div>
                    <div className="p-5 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/40">
                        <h3 className="flex items-center gap-2 font-bold mb-2 text-purple-900 dark:text-purple-200">
                            <BookOpen size={16} />
                            Law In Action
                        </h3>
                        <p className="text-sm text-purple-900/70 dark:text-purple-200/70 leading-relaxed">
                            {isQuantumLaw
                                ? 'Attach this law to Blueprint recommendations and experiment cards so every strategy has a cited governing principle.'
                                : 'Use this entry as supporting context when it sharpens the diagnosis, risk review, or experiment design.'}
                        </p>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
