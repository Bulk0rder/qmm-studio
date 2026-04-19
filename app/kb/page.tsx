'use client';

import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, ChevronRight, FlaskConical, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { KB_SEED } from '@/lib/kb-data';

const categories = ['All', 'Quantum Laws', 'Laws', 'Ratios', 'Local Context', 'Guardrails'];
const mostCited = ['qmm-law-13', 'qmm-law-05', 'qmm-law-16'];

export default function KBPage() {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = useMemo(() => KB_SEED.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.summary.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === 'All' || item.category === category;
        return matchesQuery && matchesCategory;
    }), [query, category]);

    const mostCitedItems = KB_SEED.filter((item) => mostCited.includes(item.id));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="grid gap-6 pt-4 lg:grid-cols-[1fr_420px] lg:items-end">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#9F94FF]">Physics</p>
                    <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">The operating laws behind every Blueprint.</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#A7A7BF]">
                        Search the laws, see which ones are most cited, and apply them directly to diagnoses and experiments.
                    </p>
                </div>
                <div className="rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-5">
                    <p className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                        <Sparkles size={17} className="text-[#CFC9FF]" /> Most cited this week
                    </p>
                    <div className="space-y-3">
                        {mostCitedItems.map((item, index) => (
                            <Link key={item.id} href={`/physics/${item.id}`} className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 p-3 transition hover:border-[#9F94FF]/60">
                                <span className="text-sm font-bold text-white">{item.title}</span>
                                <span className="text-xs text-[#CFC9FF]">Applied in {9 - index * 2} Blueprints</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 lg:grid-cols-[320px_1fr]">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                        placeholder="Search laws, proof, trust, sequencing..."
                        className="h-11 border-white/10 bg-black/20 pl-9 text-white placeholder:text-[#777791]"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition ${category === item ? 'border-[#9F94FF] bg-[#5D4FD4]/20 text-white' : 'border-white/10 text-[#A7A7BF] hover:border-white/30 hover:text-white'}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                        <BookOpen size={20} className="text-[#9F94FF]" /> Law library
                    </h2>
                    <span className="text-sm text-[#9090AA]">{filtered.length} entries</span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filtered.map((item) => (
                        <Link key={item.id} href={`/physics/${item.id}`}>
                            <article className="h-full rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-sm transition hover:border-[#5D4FD4]/60">
                                <div className="mb-3 flex justify-between gap-4">
                                    <Badge variant="outline">{item.category}</Badge>
                                    <ChevronRight className="text-[#9F94FF]" size={18} />
                                </div>
                                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#A7A7BF]">{item.summary}</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#CFC9FF]">
                                    <FlaskConical size={14} /> Apply to Diagnosis, Blueprint, or The Lab
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
