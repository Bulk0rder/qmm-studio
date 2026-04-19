'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Search, Database, Sparkles, Filter, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getAllScenarios, getAllBlueprints, seedSampleData } from '@/lib/scenario-service';
import { Scenario, Blueprint } from '@/lib/types';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';

export default function LibraryPage() {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [blueprints, setBlueprints] = useState<Blueprint[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    // Simple Filters
    const [industryFilter, setIndustryFilter] = useState<string>('All');
    const industries = ['All', 'SaaS', 'Fintech', 'Ecommerce', 'Healthcare', 'FMCG', 'General'];

    const loadLibraryData = async () => {
        if (typeof window === 'undefined') return;

        let scData = getAllScenarios();
        let bpData = getAllBlueprints();

        if (scData.length === 0 || bpData.length === 0) {
            await seedSampleData(15);
            scData = getAllScenarios();
            bpData = getAllBlueprints();
        }

        setScenarios(scData);
        setBlueprints(bpData);
    };

    useEffect(() => {
        loadLibraryData();
    }, []);

    // Filter logic
    const filtered = scenarios.filter(s => {
        // Search Text
        const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.metadata.industry.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Industry Filter
        if (industryFilter !== 'All' && s.metadata.industry !== industryFilter) return false;

        // Tabs
        const hasWins = (s.outcomes_summary?.wins || 0) > 0;
        const hasLosses = (s.outcomes_summary?.losses || 0) > 0;

        if (activeTab === 'winners') return hasWins;
        if (activeTab === 'cautionary') return hasLosses;
        if (activeTab === 'drafts') return !hasWins && !hasLosses;

        return true;
    });
    const knownWinners = storage.get<any[]>(STORAGE_KEYS.KNOWN_WINNERS) || [];
    const totalWins = scenarios.reduce((sum, scenario) => sum + (scenario.outcomes_summary?.wins || 0), 0) + knownWinners.length;
    const totalLosses = scenarios.reduce((sum, scenario) => sum + (scenario.outcomes_summary?.losses || 0), 0);
    const winRate = totalWins + totalLosses ? Math.round((totalWins / (totalWins + totalLosses)) * 100) : 0;

    const getLinkForScenario = (scenario: Scenario) => {
        const bpId = scenario.related_blueprints?.[scenario.related_blueprints.length - 1];
        const foundBp = blueprints.find(b => b.scenario_id === scenario.id || b.id === bpId);

        if (foundBp) {
            return `/blueprint?scenario=${scenario.id}&blueprint=${foundBp.id}`;
        }
        return `/blueprint?scenario=${scenario.id}`;
    };

    const handleSeedMemory = async () => {
        await seedSampleData(30);
        await loadLibraryData();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-app">
                            <Database className="text-[#9F94FF]" size={24} />
                            <h1 className="text-3xl font-black tracking-tight text-white">Memory</h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Strategy Memory shows the system getting smarter: scenarios, Blueprints, outcomes, Known Winners, and cautionary tales.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/wins">
                            <Button variant="outline" className="hidden md:flex">
                                <Database size={16} className="mr-2" /> Share Win Wall
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleSeedMemory} className="hidden">
                            Refresh Starter Memory
                        </Button>
                        <Link href="/diagnose">
                            <Button size="lg" className="shadow-sm">
                                <Sparkles size={16} className="mr-2" /> New Diagnosis
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                    <div className="rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-5">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-[#CFC9FF]" />
                            <div>
                                <h2 className="font-bold text-white">Compounding signal</h2>
                                <p className="text-sm text-[#CFCFE6]">Future Blueprints now cite {Math.max(9, scenarios.length)} pattern records and {totalWins} promoted wins.</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border border-yellow-300/25 bg-yellow-300/10 p-5">
                        <div className="flex items-center gap-3">
                            <Trophy className="text-yellow-200" />
                            <div>
                                <h2 className="font-bold text-white">Known Winner example</h2>
                                <p className="text-sm text-yellow-50">Proof-before-permission sequence lifted trust-stage completion in high-risk onboarding.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                        ['Scenarios', scenarios.length],
                        ['Known Winners', totalWins],
                        ['Cautionary Tales', totalLosses],
                        ['Win Rate', `${winRate}%`],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-lg border border-border bg-card p-4">
                            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                            <div className="mt-2 text-2xl font-black text-foreground">{value}</div>
                        </div>
                    ))}
                </div>

                <div className="rounded-lg border border-border bg-card p-5">
                    <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="font-bold text-foreground">Memory Growth Indicator</span>
                        <span className="text-muted-foreground">Win rate over time</span>
                    </div>
                    <div className="flex h-24 items-end gap-2">
                        {[18, 24, 31, 37, Math.max(42, winRate || 42)].map((height, index) => (
                            <div key={index} className="flex-1 rounded-t bg-[#5D4FD4]/80" style={{ height: `${height}%` }} />
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-4 pb-6 border-b border-border">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <Input
                                placeholder="Search by title, industry, or problem..."
                                className="pl-9 bg-white dark:bg-zinc-900"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                            <TabsList>
                                <TabsTrigger value="all">All Records</TabsTrigger>
                                <TabsTrigger value="winners">Known Winners</TabsTrigger>
                                <TabsTrigger value="cautionary">Cautionary Tales</TabsTrigger>
                                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Secondary Filters */}
                    <div className="flex gap-2 flex-wrap items-center">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mr-2">Filter by Industry:</span>
                        {industries.map(ind => (
                            <button
                                key={ind}
                                onClick={() => setIndustryFilter(ind)}
                                className={`px-3 py-1 rounded-full text-xs border transition-colors ${industryFilter === ind ? 'bg-zinc-800 text-white border-zinc-800 dark:bg-white dark:text-black' : 'bg-transparent border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'}`}
                            >
                                {ind}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.length === 0 ? (
                        <div className="col-span-full py-20 text-center border border-dashed border-border rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                            <Filter className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No patterns found</h3>
                            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
                            <Button variant="outline" onClick={() => { setSearchQuery(''); setIndustryFilter('All'); setActiveTab('all'); }}>
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        filtered.map(scenario => (
                            <Link href={getLinkForScenario(scenario)} key={scenario.id} className="group block h-full">
                                <div className="h-full border border-border bg-card rounded-lg p-5 shadow-sm hover:shadow-md hover:border-[#5D4FD4]/50 transition-all flex flex-col relative overflow-hidden">
                                    {/* Status Stripe */}
                                    <div className={`absolute top-0 left-0 w-1 h-full ${(scenario.outcomes_summary?.wins || 0) > 0 ? 'bg-yellow-500' : (scenario.outcomes_summary?.losses || 0) > 0 ? 'bg-orange-500' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>

                                    <div className="pl-3 flex justify-between items-start mb-3">
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{scenario.metadata.industry}</Badge>
                                        <div className="text-xs text-muted-foreground">{new Date(scenario.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <h3 className="pl-3 font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {scenario.title}
                                    </h3>
                                    <p className="pl-3 text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                                        {scenario.description}
                                    </p>
                                    <div className="pl-3 flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                                        {scenario.metadata.objective && <Badge variant="secondary" className="text-xs">{scenario.metadata.objective}</Badge>}
                                        {scenario.confidence_score_preview && <Badge variant="outline" className="text-xs">{scenario.confidence_score_preview}% certainty</Badge>}
                                        <Badge variant="outline" className="text-xs">{scenario.related_experiments?.length || 0} experiments</Badge>
                                        {(scenario.outcomes_summary?.wins || 0) > 0 && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">Winner</Badge>}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
    );
}
