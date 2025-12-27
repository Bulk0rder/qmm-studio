'use client';

import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { KB_SEED } from '@/lib/kb-data';


export default function KBDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        // In a real app, fetch from API. strict lookup for now.
        const found = KB_SEED.find(k => k.id === params.id);
        if (found) {
            setItem(found);
        }
    }, [params.id]);

    if (!item) {
        return (
            <PageShell>
                <div className="py-20 text-center">
                    <p className="text-muted">Loading or Article Not Found...</p>
                    <Link href="/kb" className="mt-4 inline-block text-blue-600 hover:underline">Back to Library</Link>
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Nav */}
                <div className="flex items-center justify-between">
                    <Link href="/kb">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
                            <ArrowLeft size={16} /> Back to Physics
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                            <Share2 size={14} className="mr-2" /> Share
                        </Button>
                    </div>
                </div>

                {/* Header */}
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Badge>{item.category}</Badge>
                        <Badge variant="outline" className="text-muted-foreground">ID: {item.id}</Badge>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-app leading-tight">
                        {item.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {item.summary}
                    </p>
                </div>

                <hr className="border-border" />

                {/* Content Body */}
                <div className="prose dark:prose-invert max-w-none text-foreground">
                    <p className="whitespace-pre-wrap leading-7">
                        {item.content}
                    </p>

                    {/* Placeholder for richer content */}
                    <div className="my-8 p-6 bg-secondary/30 rounded-lg border border-border">
                        <h4 className="flex items-center gap-2 font-bold mb-2">
                            <BookOpen size={16} className="text-blue-500" />
                            Applied QMM Principle
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            This principle is often triggered when "Diagnosis" detects high friction in the "Trust" phase.
                            The algorithm uses this to prescribe "Social Proof" sequences before "Conversion" asks.
                        </p>
                    </div>
                </div>

            </div>
        </PageShell>
    );
}
