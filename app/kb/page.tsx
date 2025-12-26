'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UI_COPY } from '@/lib/ui-copy';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Search, Plus, ShieldCheck, Zap } from 'lucide-react';
import { KBDoc } from '@/lib/types';
import { Button } from '@/components/ui/Button';

import { BackButton } from '@/components/ui/BackButton';

export default function KBPage() {
    const { TITLE, SUBTITLE, SEARCH_PLACEHOLDER, COVERAGE_EMPTY_TITLE, COVERAGE_EMPTY_BODY, ADD_DOC } = UI_COPY.KB;
    const [docs, setDocs] = useState<KBDoc[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/kb/list')
            .then(res => res.json())
            .then(data => {
                setDocs(data);
                setLoading(false);
            });
    }, []);

    const filtered = docs.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BackButton />
            <header className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-app">{TITLE}</h1>
                        <p className="text-muted text-lg mt-1">{SUBTITLE}</p>
                    </div>
                    <Button className="rounded-lg h-10 px-4">
                        <Plus className="mr-2" size={16} />
                        {ADD_DOC}
                    </Button>
                </div>

                <div className="relative max-w-xl">
                    <Search className="absolute left-3.5 top-3 text-muted" size={18} />
                    <Input
                        placeholder={SEARCH_PLACEHOLDER}
                        className="pl-10 h-10 bg-white dark:bg-zinc-900 border-app text-app rounded-lg shadow-sm"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse"></div>)
                ) : filtered.length > 0 ? (
                    filtered.map(doc => (
                        <Link href={`/kb/${doc.id}`} key={doc.id}>
                            <Card className="h-full hover:shadow-md transition-all cursor-pointer border-app group bg-white dark:bg-zinc-900">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`p-1.5 rounded-md ${doc.type === 'Governance' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                            {doc.type === 'Governance' ? <ShieldCheck size={16} /> : <Zap size={16} />}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${doc.risk_level === 'high' ? 'border-red-200 text-red-600 bg-red-50' : 'border-zinc-200 text-muted bg-zinc-50'}`}>
                                            {doc.risk_level} RISK
                                        </span>
                                    </div>
                                    <CardTitle className="group-hover:text-blue-600 transition-colors text-lg leading-tight">{doc.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {doc.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-muted">#{tag}</span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-app rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <p className="text-muted font-medium">No documents found matching "{search}"</p>
                    </div>
                )}
            </div>

            {!loading && filtered.length > 0 && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-900/30 p-6 flex gap-4 items-center">
                    <ShieldCheck className="text-emerald-500 flex-shrink-0" size={24} />
                    <div>
                        <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 text-sm">{COVERAGE_EMPTY_TITLE}</h4>
                        <p className="text-sm text-emerald-800 dark:text-emerald-200 opacity-80 mt-1">{COVERAGE_EMPTY_BODY}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
