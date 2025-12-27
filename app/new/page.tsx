'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UI_COPY } from '@/lib/ui-copy';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input, Label, Textarea } from '@/components/ui/Input';
import { Loader2, ArrowRight, Pin, Search } from 'lucide-react';
import { Scenario } from '@/lib/types';
import { LibraryStacks } from '@/components/illustrations/LibraryStacks';
import { BackButton } from '@/components/ui/BackButton';

// Simple debounce hook if not exists
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function NewScenarioPage() {
    const router = useRouter();
    const { PAGE_TITLE, SUBTITLE, PLACEHOLDERS, HELPERS, CTA_RETRIEVE, CTA_GENERATE, LIBRARIAN, CTA_DRAFT_ANYWAY } = UI_COPY.NEW_SCENARIO;

    const [formData, setFormData] = useState({
        title: '',
        industry: '',
        market: '',
        customerState: '',
        budget: '',
        risk: '',
        constraints: '',
        baseline: '',
        tried: ''
    });

    const [isRetrieving, setIsRetrieving] = useState(false);
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [pinnedId, setPinnedId] = useState<string | null>(null);

    const debouncedTitle = useDebounceValue(formData.title, 800);
    const debouncedIndustry = useDebounceValue(formData.industry, 800);

    // Live retrieval effect
    useEffect(() => {
        if (debouncedTitle.length > 5) {
            handleRetrieve(true);
        }
    }, [debouncedTitle, debouncedIndustry]);

    const handleRetrieve = async (silent = false) => {
        if (!silent) setIsRetrieving(true);
        try {
            const res = await fetch('/api/retrieve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: formData.title,
                    industry: formData.industry
                })
            });
            const data = await res.json();
            setScenarios(data.scenarios || []);
            setHasSearched(true);
        } catch (e) {
            console.error(e);
        } finally {
            if (!silent) setIsRetrieving(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/blueprints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    objective: formData.title,
                    industry: formData.industry,
                    market: formData.market,
                    customerState: formData.customerState,
                    budget: formData.budget,
                    risk: formData.risk,
                    constraints: formData.constraints,
                    baseline: formData.baseline,
                    tried: formData.tried,
                    similarScenarioId: pinnedId
                })
            });

            if (res.ok) {
                const bp = await res.json();
                router.push(`/blueprint/${bp.id}`);
            }
        } catch (e) {
            alert('Failed to generate blueprint');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                {/* Left Column: Intake */}

                {/* Left Column: Intake */}
                <div className="lg:col-span-7 space-y-8">
                    <BackButton />
                    <header>
                        <h1 className="text-3xl font-semibold tracking-tight text-app">{PAGE_TITLE}</h1>
                        <p className="text-muted text-lg mt-2 leading-relaxed">{SUBTITLE}</p>
                    </header>

                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <Label className="text-base font-medium">What’s happening?</Label>
                            <Textarea
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder={PLACEHOLDERS.WHATS_HAPPENING}
                                className="min-h-[140px] text-lg leading-relaxed p-4 resize-none shadow-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Industry</Label>
                                <Input name="industry" value={formData.industry} onChange={handleChange} placeholder={PLACEHOLDERS.INDUSTRY} />
                            </div>
                            <div className="space-y-2">
                                <Label>Market</Label>
                                <Input name="market" value={formData.market} onChange={handleChange} placeholder={PLACEHOLDERS.MARKET} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Customer State</Label>
                            <Input name="customerState" value={formData.customerState} onChange={handleChange} placeholder={HELPERS.CUSTOMER_STATE} />
                        </div>

                        <div className="space-y-2">
                            <Label>What have you tried?</Label>
                            <Textarea
                                name="tried"
                                value={formData.tried}
                                onChange={handleChange}
                                placeholder={PLACEHOLDERS.TRIED}
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Budget Band</Label>
                                <Input name="budget" value={formData.budget} onChange={handleChange} placeholder={HELPERS.BUDGET_BAND} />
                            </div>
                            <div className="space-y-2">
                                <Label>Baseline Signals</Label>
                                <Input name="baseline" value={formData.baseline} onChange={handleChange} placeholder={PLACEHOLDERS.BASELINE_SIGNALS} />
                            </div>
                        </div>

                        <div className="pt-6">
                            <ActionPanel
                                hasSearched={hasSearched}
                                isRetrieving={isRetrieving}
                                onRetrieve={() => handleRetrieve()}
                                onGenerate={handleSubmit}
                                labels={{ CTA_RETRIEVE, CTA_DRAFT_ANYWAY, CTA_GENERATE }}
                            />
                        </div>
                    </form>
                </div>

                {/* Right Column: Librarian Panel */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-24">
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`w-2 h-2 rounded-full ${isRetrieving ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted">Librarian Active</span>
                        </div>

                        <Card className="min-h-[400px] border-app shadow-sm bg-zinc-50/50 dark:bg-zinc-900/50">
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-app">{LIBRARIAN.HEADER}</h3>
                                    <p className="text-sm text-muted">{LIBRARIAN.SUBTEXT}</p>
                                </div>

                                <div className="min-h-[300px] relative">
                                    {scenarios.length > 0 ? (
                                        <div className="space-y-3 relative z-10">
                                            {scenarios.map(sc => (
                                                <div
                                                    key={sc.id}
                                                    className={`p-4 rounded-lg border transition-all cursor-pointer ${pinnedId === sc.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-500/20' : 'bg-white dark:bg-black border-app hover:shadow-md'}`}
                                                    onClick={() => setPinnedId(sc.id)}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-medium text-sm line-clamp-2">{sc.title}</h4>
                                                        {pinnedId === sc.id && <Pin size={14} className="text-blue-600 fill-blue-600" />}
                                                    </div>
                                                    <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">{sc.description}</p>
                                                    <div className="mt-3 flex gap-2">
                                                        <span className="text-[10px] uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-muted border border-app">{(sc as any).industry || 'General'}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : hasSearched ? (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-muted">
                                                <Search size={20} />
                                            </div>
                                            <div className="space-y-1 max-w-xs">
                                                <h4 className="font-medium text-app">{LIBRARIAN.NONE_FOUND.TITLE}</h4>
                                                <p className="text-sm text-muted">{LIBRARIAN.NONE_FOUND.BODY}</p>
                                            </div>
                                            <div className="pt-2 w-full max-w-xs space-y-2">
                                                <Button size="sm" variant="outline" onClick={handleSubmit} className="w-full">
                                                    {LIBRARIAN.NONE_FOUND.CTA_GENERATE}
                                                </Button>
                                                <Button size="sm" variant="ghost" className="w-full text-xs text-muted">
                                                    {LIBRARIAN.NONE_FOUND.CTA_SAVE}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-60">
                                            <LibraryStacks className="w-48 h-48 mb-4 text-slate-300 dark:text-slate-700" />
                                            <p className="text-sm text-muted italic">Type your scenario to see matches...</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionPanel({ hasSearched, isRetrieving, onRetrieve, onGenerate, labels }: any) {
    if (!hasSearched) {
        return (
            <div className="flex items-center gap-4 pt-4 border-t border-app">
                <Button onClick={onRetrieve} disabled={isRetrieving} className="h-11 px-6 text-base shadow-sm">
                    {isRetrieving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Search className="mr-2" size={16} />}
                    {labels.CTA_RETRIEVE}
                </Button>
                <Button variant="ghost" onClick={onGenerate} className="h-11 px-6 text-muted hover:text-app">
                    {labels.CTA_DRAFT_ANYWAY}
                </Button>
            </div>
        )
    }

    return (
        <div className="pt-4 border-t border-app">
            <Button onClick={onGenerate} className="w-full h-12 text-lg font-medium shadow-sm">
                {labels.CTA_GENERATE} <ArrowRight className="ml-2" size={18} />
            </Button>
        </div>
    )
}
