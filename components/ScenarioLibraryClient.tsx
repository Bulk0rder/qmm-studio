'use client';

import React, { useState } from 'react';
import { Scenario } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface ScenarioLibraryClientProps {
    scenarios: Scenario[];
}

export default function ScenarioLibraryClient({ scenarios }: ScenarioLibraryClientProps) {
    const [filter, setFilter] = useState('');

    const filteredScenarios = scenarios.filter(s =>
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.metadata.industry.toLowerCase().includes(filter.toLowerCase()) ||
        s.metadata.objective.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HERO */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-app">
                        {UI_COPY.SCENARIOS.TITLE}
                    </h1>
                    <p className="text-lg text-muted max-w-2xl">
                        {UI_COPY.SCENARIOS.SUBTITLE}
                    </p>
                </div>
                <Link href="/new">
                    <Button size="lg" className="shadow-sm">{UI_COPY.SCENARIOS.EMPTY_CTA}</Button>
                </Link>
            </div>

            {/* SEARCH */}
            <div className="relative">
                <Search className="absolute left-3.5 top-3 text-muted" size={18} />
                <Input
                    type="text"
                    placeholder={UI_COPY.SCENARIOS.SEARCH_PLACEHOLDER}
                    className="pl-10 h-10 w-full max-w-xl bg-white dark:bg-zinc-900 shadow-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {/* GRID */}
            <div className="border-t border-app pt-8">
                {filteredScenarios.length === 0 ? (
                    <div className="text-center py-20 border border-app rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <h3 className="text-lg font-semibold text-app mb-2">{UI_COPY.SCENARIOS.EMPTY_TITLE}</h3>
                        <p className="text-muted mb-6">{UI_COPY.SCENARIOS.EMPTY_BODY}</p>
                        <Link href="/new">
                            <Button variant="outline" className="bg-white dark:bg-zinc-800 shadow-sm">{UI_COPY.SCENARIOS.EMPTY_CTA}</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredScenarios.map(scenario => (
                            <Link key={scenario.id} href={`/blueprint/${scenario.related_blueprints[0] || ''}`} className="block group">
                                <div className="h-full bg-white dark:bg-zinc-900 border border-app rounded-xl p-6 hover:shadow-md transition-all flex flex-col group-hover:border-blue-500/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[10px] uppercase font-bold text-muted bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded tracking-wider border border-zinc-200 dark:border-zinc-700">
                                            {scenario.metadata.industry}
                                        </span>
                                        <span className="text-xs font-mono text-muted group-hover:text-blue-500 transition-colors">
                                            {scenario.id}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-app mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                                        {scenario.title}
                                    </h3>
                                    <p className="text-sm text-muted line-clamp-3 mb-6 flex-grow leading-relaxed">
                                        {scenario.metadata.objective}
                                    </p>

                                    <div className="border-t border-app pt-4 flex gap-4 text-xs text-muted font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${scenario.outcomes_summary && scenario.outcomes_summary.wins > 0 ? 'bg-green-500' : 'bg-zinc-300'}`}></span>
                                            {scenario.outcomes_summary?.wins || 0} Wins
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                            Blueprints
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
