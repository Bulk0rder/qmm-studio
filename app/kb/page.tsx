'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Library, Search, ChevronRight, Book } from 'lucide-react';
import Link from 'next/link';

import { KB_SEED } from '@/lib/kb-data';

interface KBItem {
    id: string;
    title: string;
    category: 'Laws' | 'Ratios' | 'Local Context' | 'Guardrails';
    summary: string;
    content: string;
}

export default function KBPage() {
    const [query, setQuery] = useState('');

    const filtered = KB_SEED.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <PageShell>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-app">
                            <Library className="text-purple-600" size={24} />
                            <h1 className="text-3xl font-bold tracking-tight">The Physics of Marketing</h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            First principles and mental models that drive our algorithms. These are the laws of gravity for your strategy.
                        </p>
                    </div>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        placeholder="Search physics..."
                        className="pl-9 bg-white dark:bg-zinc-900"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map(item => (
                        <Link key={item.id} href={`/kb/${item.id}`}>
                            <div className="p-6 h-full border border-border bg-card rounded-xl hover:border-purple-500/30 transition-all group cursor-pointer shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="mb-2">{item.category}</Badge>
                                    <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600" size={18} />
                                </div>
                                <h3 className="text-lg font-bold mb-1 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.summary}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </PageShell>
    );
}
