'use client';

import React, { useState } from 'react';
import { KBDoc } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';
import { Button } from '@/components/ui/Button';

interface KBClientViewProps {
    initialDocs: KBDoc[];
}

export default function KBClientView({ initialDocs }: KBClientViewProps) {
    const [filter, setFilter] = useState('');

    const filteredDocs = initialDocs.filter(d =>
        d.title.toLowerCase().includes(filter.toLowerCase()) ||
        d.tags.some(t => t.includes(filter.toLowerCase())) ||
        d.content.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* HERO */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {UI_COPY.KB.TITLE}
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl">
                    {UI_COPY.KB.SUBTITLE}
                </p>
            </div>

            {/* SEARCH */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder={UI_COPY.KB.SEARCH_PLACEHOLDER}
                    className="flex-grow bg-slate-900/50 border border-white/10 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-slate-600"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <Button size="lg" className="bg-purple-600 hover:bg-purple-500 hidden md:block">
                    Add Doc
                </Button>
            </div>

            {/* COVERAGE GAPS */}
            <div className="p-6 rounded-xl bg-yellow-950/10 border border-dashed border-yellow-500/20">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-yellow-500 font-bold uppercase tracking-widest text-xs">{UI_COPY.HOME.COVERAGE_GAPS.HEADER}</h3>
                    <span className="text-slate-500 text-xs">Based on recent searches (Simulated)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {['SaaS Pricing', 'B2B Cold Outreach', 'Retention Loops'].map(gap => (
                        <div key={gap} className="px-3 py-1 bg-yellow-900/20 border border-yellow-500/10 rounded-full text-yellow-200 text-sm flex items-center gap-2">
                            <span>{gap}</span>
                            <button className="w-4 h-4 rounded-full bg-yellow-500/20 hover:bg-yellow-500 text-yellow-500 hover:text-black flex items-center justify-center text-[10px] font-bold">+</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map(doc => (
                    <div key={doc.id} className="bg-slate-900 border border-white/5 rounded-xl p-6 hover:border-purple-500/30 hover:bg-slate-900/80 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${doc.type === 'Methodology' ? 'bg-blue-900/50 text-blue-300' :
                                doc.type === 'Principle' ? 'bg-purple-900/50 text-purple-300' :
                                    'bg-green-900/50 text-green-300'
                                }`}>
                                {doc.type}
                            </span>
                            {doc.risk_level === 'high' && (
                                <span className="text-[10px] uppercase font-bold text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">
                                    High Risk
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                            {doc.title}
                        </h3>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {doc.tags.map(t => (
                                <span key={t} className="text-slate-500 text-xs text-mono">#{t}</span>
                            ))}
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-3">
                            {doc.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
