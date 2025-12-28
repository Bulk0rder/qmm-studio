'use client';

import React, { useState, useEffect } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Search, BookOpen, AlertCircle, Sparkles, Filter, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import { Database } from 'lucide-react';
import { getAllScenarios, getAllBlueprints, generateMockBlueprint } from '@/lib/scenario-service';
import { getLargeScenarioSeed } from '@/lib/seed-data';
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

    useEffect(() => {
        // Load data
        if (typeof window !== 'undefined') {
            const scData = getAllScenarios();
            const bpData = getAllBlueprints();
            setScenarios(scData);
            setBlueprints(bpData);
        }
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

    const getLinkForScenario = (scenario: Scenario) => {
        const bpId = scenario.related_blueprints?.[scenario.related_blueprints.length - 1];
        const foundBp = blueprints.find(b => b.scenario_id === scenario.id || b.id === bpId);

        if (foundBp) {
            return `/advisory?scenario=${scenario.id}&blueprint=${foundBp.id}`;
        }
        return `/advisory?scenario=${scenario.id}`;
    };

    const handleSeed60 = () => {
        if (!confirm('This will seed 60 sample scenarios and blueprints. Continue?')) return;

        const largeSeed = getLargeScenarioSeed();
        const newScenarios: Scenario[] = largeSeed.map(s => ({
            id: s.scenario_id,
            workspace_id: 'guest',
            title: s.title,
            description: s.symptom,
            status: 'completed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            metadata: {
                industry: s.industry,
                market: s.market,
                customer_state: s.customer_state as any,
                objective: s.objective as any,
                budget_band: s.budget_band as any,
                symptom: s.symptom,
                constraint: s.constraint,
                tried: s.what_tried,
                baseline_signals: s.baseline_signals,
                time_horizon: s.constraint,
                risk_level: 'medium'
            },
            inputs: {
                baseline_signals: s.baseline_signals,
                what_was_tried: s.what_tried,
                channel_constraints: []
            },
            related_blueprints: [`BP-${s.scenario_id}`],
            related_experiments: [],
            outcomes_summary: { wins: Math.floor(Math.random() * 5), losses: Math.floor(Math.random() * 3), inconclusive: 0, learning_notes: [] }
        }));

        const newBlueprints = newScenarios.map(s =>
            generateMockBlueprint(s.id, s.title, s.metadata.industry)
        ).map((b, i) => ({ ...b, id: `BP-${newScenarios[i].id}` }));

        storage.set(STORAGE_KEYS.SCENARIOS, newScenarios);
        storage.set(STORAGE_KEYS.BLUEPRINTS, newBlueprints);

        setScenarios(newScenarios);
        setBlueprints(newBlueprints);
        alert('60 Sample Scenarios Populated.');
    };

    return (
        <PageShell>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-app">
                            <BookOpen className="text-blue-600" size={24} />
                            <h1 className="text-3xl font-bold tracking-tight">Institutional Memory</h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Search the collective wisdom of your organization. Find patterns, avoid mistakes.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleSeed60} className="hidden md:flex">
                            <Database size={16} className="mr-2" /> Populate 60 Sample Scenarios
                        </Button>
                        <Link href="/new">
                            <Button size="lg" className="shadow-sm">
                                <Sparkles size={16} className="mr-2" /> New Diagnosis
                            </Button>
                        </Link>
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
                                <div className="h-full border border-border bg-card rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all flex flex-col relative overflow-hidden">
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
                                        {(scenario.outcomes_summary?.wins || 0) > 0 && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">Winner</Badge>}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </PageShell>
    );
}
