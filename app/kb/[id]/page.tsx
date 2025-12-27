'use client';

import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock Data (matches the KB page list)
const KB_ITEMS: any[] = [
    { id: '1', title: 'The Law of Double Jeopardy', category: 'Laws', summary: 'Smaller brands have fewer buyers who buy less often.', content: 'Marketing science dictates that loyalty is a function of penetration. Brands with lower market share suffer twice: they have fewer buyers, and those buyers buy slightly less often. Therefore, the strategic implication is to focus 100% of resources on penetration (acquiring new customers) rather than loyalty schemes, until you are the market leader.' },
    { id: '2', title: '60/40 Rule (Brand vs Activation)', category: 'Ratios', summary: 'The optimal split for long-term efficiency.', content: 'Field and Binet research suggests that for maximum long-term growth, brands should spend 60% of budget on brand building (broad reach, emotional, long-term memory structures) and 40% on sales activation (tight targeting, rational, buy-now). In digital-only businesses, this ratio often shifts to 50/50, but the principle remains: you cannot activate demand you have not created.' },
    { id: '3', title: 'Trust Equation in High-Fraud Markets', category: 'Local Context', summary: 'Why verify-first works in Nigeria.', content: 'In low trust markets like Nigeria, verification signals must precede value propositions. The consumer equation is: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. If they suspect you are a scam, your "Value" is irrelevant. Tactics include: Physical address verification, faces of founders, COD options, and 3rd party endorsements.' },
    { id: '4', title: 'Greenwashing Guardrails', category: 'Guardrails', summary: 'Avoid vague sustainability claims.', content: 'Do not use terms like "Eco-friendly" without specific verifiable attributes. Use specific claims: "Made from 100% recycled polyester" instead of "Green clothing". This protects against regulatory backlash and consumer skepticism.' },
    { id: '5', title: 'Pricing Anchoring', category: 'Laws', summary: 'Humans compare to the nearest reference point.', content: 'Price is relative. Consumers do not know what something "should" cost. They compare it to the nearest anchor. Strategy: Always present a higher-priced "Decoy" option to make the middle option feel like a bargain.' },
];

export default function KBDetail() {
    const params = useParams();
    const item = KB_ITEMS.find(k => k.id === params.id);

    if (!item) {
        return (
            <PageShell>
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold">Document Not Found</h1>
                    <Link href="/kb"><Button className="mt-4">Back to Library</Button></Link>
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell>
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Link href="/kb" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft size={14} className="mr-1" /> Back to Physics
                </Link>

                <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <Badge>{item.category}</Badge>
                        <Button variant="ghost" size="sm" className="hidden"><Share2 size={16} /></Button>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{item.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8">
                        {item.summary}
                    </p>

                    <div className="prose dark:prose-invert max-w-none">
                        <h3 className="flex items-center gap-2">
                            <BookOpen size={20} className="text-blue-600" />
                            Core Principle
                        </h3>
                        <p className="text-lg leading-relaxed">
                            {item.content}
                        </p>

                        <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg mt-8 not-prose border border-zinc-100 dark:border-zinc-800">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Applied Strategy</h4>
                            <p className="text-foreground">
                                When building a Blueprint, this principle dictates that we should ignore any tactics that violate {item.title}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
