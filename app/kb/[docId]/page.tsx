'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UI_COPY } from '@/lib/ui-copy';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit, Tag } from 'lucide-react';
import Link from 'next/link';
import { KBDoc } from '@/lib/types';

// Simple Markdown-ish renderer
function MarkdownView({ content }: { content: string }) {
    if (!content) return null;

    // Split by lines
    const lines = content.split('\n');

    return (
        <div className="space-y-4 text-app leading-relaxed">
            {lines.map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-semibold mt-6 mb-3 border-b border-app pb-2">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-medium mt-4 mb-2">{line.replace('### ', '')}</h3>;
                if (line.startsWith('- [ ]')) return <div key={i} className="flex gap-2 items-center text-muted"><div className="w-4 h-4 border border-app rounded-sm"></div>{line.replace('- [ ]', '')}</div>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc marker:text-muted pl-1 mb-1">{line.replace('- ', '')}</li>;
                if (line.trim() === '') return <br key={i} />;

                // Bold handling (simple)
                const parts = line.split('**');
                if (parts.length > 1) {
                    return (
                        <p key={i}>
                            {parts.map((part, idx) => idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part)}
                        </p>
                    )
                }

                return <p key={i}>{line}</p>;
            })}
        </div>
    )
}

export default function KBDocPage() {
    const params = useParams();
    const [doc, setDoc] = useState<KBDoc | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.docId) {
            fetch(`/api/kb/doc/${params.docId}`)
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Not found');
                })
                .then(data => {
                    setDoc(data);
                    setLoading(false);
                })
                .catch(err => setLoading(false));
        }
    }, [params.docId]);

    if (loading) return <div className="max-w-3xl mx-auto py-12 text-center text-muted">Loading article...</div>;
    if (!doc) return <div className="max-w-3xl mx-auto py-12 text-center text-red-500">Document not found.</div>;

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link href="/kb">
                <Button variant="ghost" className="mb-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted hover:text-app">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Knowledge Base
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <Card className="card-surface border-app min-h-[600px]">
                        <CardContent className="p-8 md:p-12">
                            <MarkdownView content={doc.content} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="card-surface border-app bg-zinc-50 dark:bg-zinc-900/50">
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Metadata</h4>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-sm"><span className="text-muted">Type</span> <span className="font-medium">{doc.type}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-muted">Risk</span> <span className={`font-medium px-2 py-0.5 rounded text-xs uppercase ${doc.risk_level === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{doc.risk_level}</span></div>
                                    <div className="flex justify-between text-sm"><span className="text-muted">ID</span> <span className="font-mono text-xs">{doc.id}</span></div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2 flex items-center gap-1">
                                    <Tag size={12} /> Tags
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {doc.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-white dark:bg-black border border-app px-2 py-1 rounded-md text-muted">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full bg-zinc-200 dark:bg-zinc-800 text-app hover:bg-zinc-300 dark:hover:bg-zinc-700">
                        <Edit size={16} className="mr-2" />
                        Edit Source
                    </Button>
                </div>
            </div>
        </div>
    );
}
