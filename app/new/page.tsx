'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input, Label, Textarea } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowRight, ArrowLeft, Loader2, Sparkles, AlertTriangle, XCircle } from 'lucide-react';
import { generateBlueprint } from '@/lib/blueprint-engine';
import { Badge } from '@/components/ui/Badge';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';
import { Scenario } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';

// Mock Seed Data for Retrieval (since we rely on initial seed)
// Real app would fetch from /api/retrieve
const MOCK_RETRIEVAL = [
    { title: "SaaS Churn Reduction", industry: "SaaS", similarity: "High" },
    { title: "Enterprise Sales Velocity", industry: "B2B", similarity: "Medium" }
];

export default function NewScenarioPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [retrieving, setRetrieving] = useState(false);
    const [retrieved, setRetrieved] = useState<any[]>([]);
    const [selectedPattern, setSelectedPattern] = useState<any>(null);

    const [form, setForm] = useState({
        industry: '',
        market: 'B2B',
        customerState: 'Aware',
        symptom: '',
        objective: '',
        tried: '',
        time_horizon: '3 months',
        budget_band: '< $50k'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleRetrievalReview = () => {
        setRetrieving(true);
        // Simulate retrieval
        setTimeout(() => {
            setRetrieved(MOCK_RETRIEVAL); // In real app, fetch matches based on form
            setRetrieving(false);
            setStep(step + 1); // Go to retrieval step
        }, 800);
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            // 1. Generate Blueprint
            const bp = await generateBlueprint({
                industry: form.industry,
                market: form.market,
                situation: form.symptom,
                objective: form.objective,
                customer_state: form.customerState,
                time_horizon: form.time_horizon,
                budget_band: form.budget_band,
                // Defaults for required fields not in form
                primary_kpi: form.objective,
                compliance_risk: 'medium',
                channel_constraints: [],
                baseline_signals: "Self-Diagnosis",
                what_was_tried: form.tried
            });
            // 2. Create Scenario
            const newScenarioId = bp.scenario_id || `SC-${Date.now()}`;
            const newScenario: Scenario = {
                id: newScenarioId,
                workspace_id: 'guest',
                title: `${form.objective}: ${form.industry}`,
                description: form.symptom,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                metadata: {
                    industry: form.industry,
                    market: form.market,
                    objective: form.objective,
                    budget_band: form.budget_band,
                    risk_level: 'medium',
                    time_horizon: form.time_horizon,
                    customer_state: form.customerState
                },
                inputs: {
                    baseline_signals: "Self-diagnosis",
                    what_was_tried: form.tried,
                    channel_constraints: []
                },
                related_blueprints: [bp.id],
                related_experiments: [],
                outcomes_summary: { wins: 0, losses: 0, learning_notes: [] }
            };

            // 3. Persist
            if (typeof window !== 'undefined') {
                const existingScenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
                storage.set(STORAGE_KEYS.SCENARIOS, [newScenario, ...existingScenarios]);

                const existingBPs = storage.get<any[]>(STORAGE_KEYS.BLUEPRINTS) || [];
                storage.set(STORAGE_KEYS.BLUEPRINTS, [bp, ...existingBPs]);
            }

            // 4. Redirect
            router.push(`/advisory?scenario=${newScenarioId}&blueprint=${bp.id}`);

        } catch (error) {
            console.error(error);
            alert("Failed to generate blueprint. Please try again.");
            setLoading(false);
        }
    };

    // Render Steps
    const PCT = (step / 5) * 100;

    return (
        <PageShell>
            <div className="max-w-xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Progress */}
                <div className="mb-10 space-y-2">
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${PCT}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        <span>{UI_COPY.NEW_SCENARIO.PAGE_TITLE}</span>
                        <span>Step {step} / 4</span>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* STEP 1: ARENA */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">{UI_COPY.NEW_SCENARIO.STEPS.ARENA}</h1>
                                <p className="text-lg text-muted-foreground">{UI_COPY.NEW_SCENARIO.SUBTITLE}</p>
                            </div>
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Industry</Label>
                                    <Input name="industry" value={form.industry} onChange={handleChange} placeholder={UI_COPY.NEW_SCENARIO.PLACEHOLDERS.INDUSTRY} autoFocus className="h-12 text-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Market Dynamics</Label>
                                    <select
                                        name="market"
                                        value={form.market}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="B2B">B2B (High Trust)</option>
                                        <option value="B2C">B2C (High Volume)</option>
                                        <option value="D2C">D2C (Brand Heavy)</option>
                                        <option value="Enterprise">Enterprise (Complex Sales)</option>
                                    </select>
                                </div>
                            </div>
                            <Button onClick={handleNext} className="w-full h-12 text-base mt-4" disabled={!form.industry}>
                                Continue <ArrowRight size={16} className="ml-2" />
                            </Button>
                        </div>
                    )}

                    {/* STEP 2: ENTROPY (Problem) */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">{UI_COPY.NEW_SCENARIO.STEPS.ENTROPY}</h1>
                                <p className="text-lg text-muted-foreground">What is the constraint breaking your growth?</p>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">The Symptom</Label>
                                    <Textarea name="symptom" value={form.symptom} onChange={handleChange} placeholder={UI_COPY.NEW_SCENARIO.PLACEHOLDERS.WHATS_HAPPENING} rows={4} autoFocus className="text-base resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">The Objective</Label>
                                    <Input name="objective" value={form.objective} onChange={handleChange} placeholder="e.g. Increase conversion rate by 20%" className="h-12 text-base" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={handleBack} className="h-12 px-6">Back</Button>
                                <Button onClick={handleNext} className="w-full h-12 text-base" disabled={!form.symptom}>
                                    Continue <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: FRICTION */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">{UI_COPY.NEW_SCENARIO.STEPS.FRICTION}</h1>
                                <p className="text-lg text-muted-foreground">What have you tried that failed?</p>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Failed Experiments</Label>
                                    <Textarea name="tried" value={form.tried} onChange={handleChange} placeholder={UI_COPY.NEW_SCENARIO.PLACEHOLDERS.TRIED} rows={5} autoFocus className="text-base resize-none" />
                                </div>
                                {form.symptom.toLowerCase().includes('traffic') && form.tried.toLowerCase().includes('seo') && (
                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex items-start gap-3">
                                        <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                                        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                                            <strong>Contradiction Warning:</strong> SEO is a long-term compounder, but your objective implies short-term growth needs. The Studio will adjust for this logic gap.
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={handleBack} className="h-12 px-6">Back</Button>
                                <Button onClick={handleNext} className="w-full h-12 text-base">
                                    Continue <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: FUEL */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold">{UI_COPY.NEW_SCENARIO.STEPS.FUEL}</h1>
                                <p className="text-lg text-muted-foreground">Constraints breed creativity.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Time Horizon</Label>
                                    <select name="time_horizon" value={form.time_horizon} onChange={handleChange} className="w-full h-12 rounded-lg border border-input bg-background px-3 py-2 text-base">
                                        <option>1 month</option>
                                        <option>3 months</option>
                                        <option>6 months</option>
                                        <option>1 year+</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base font-semibold">Budget Band</Label>
                                    <select name="budget_band" value={form.budget_band} onChange={handleChange} className="w-full h-12 rounded-lg border border-input bg-background px-3 py-2 text-base">
                                        <option>{"< $10k"}</option>
                                        <option>{"$10k - $50k"}</option>
                                        <option>{"$50k - $200k"}</option>
                                        <option>{"> $200k"}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-6">
                                <Button onClick={handleRetrievalReview} className="w-full h-14 text-lg shadow-md" disabled={retrieving}>
                                    {retrieving ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" size={18} />}
                                    {UI_COPY.NEW_SCENARIO.CTA_RETRIEVE}
                                </Button>
                            </div>
                            <Button variant="ghost" onClick={handleBack} className="w-full">Back</Button>
                        </div>
                    )}

                    {/* STEP 5: RETRIEVAL REVIEW */}
                    {step === 5 && (
                        <div className="space-y-8">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold">{UI_COPY.NEW_SCENARIO.LIBRARIAN.HEADER}</h1>
                                <p className="text-lg text-muted-foreground">{UI_COPY.NEW_SCENARIO.LIBRARIAN.SUBTEXT}</p>
                            </div>

                            <div className="space-y-3">
                                {/* Pattern Detail Modal */}
                                {selectedPattern && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
                                        <div className="bg-background border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-6 relative m-4">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <h3 className="text-2xl font-bold">{selectedPattern.title}</h3>
                                                    <Badge variant="outline">{selectedPattern.industry} · {selectedPattern.similarity} Match</Badge>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => setSelectedPattern(null)}><XCircle size={20} /></Button>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                                                    <div className="flex items-center gap-2 font-semibold text-primary">
                                                        <Sparkles size={16} />
                                                        Why this matched
                                                    </div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        This scenario shares <strong>{form.industry}</strong> dynamics and a similar goal of <strong>{form.objective}</strong>.
                                                        The system detected a high correlation in the "Friction" vectors you described.
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Pattern Summary</h4>
                                                    <p className="text-base text-foreground">
                                                        Historic data shows that when {form.industry} companies face {form.symptom || "this issue"} under {form.budget_band} constraints,
                                                        the root cause is often <strong>Misaligned Activation</strong> rather than Traffic.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <Button onClick={() => setSelectedPattern(null)} className="w-full">
                                                    Use This Pattern <ArrowRight size={16} className="ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {retrieved.map((r, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelectedPattern(r)}
                                            className="group p-4 border border-border rounded-xl bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-bold text-base text-foreground mb-1">{r.title}</div>
                                                    <div className="text-sm text-muted-foreground">{r.industry} · {r.similarity} Match</div>
                                                </div>
                                                <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">View Details</Badge>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="px-4 py-3 bg-secondary/50 rounded-lg text-sm text-center text-muted-foreground italic">
                                        The engine will use these patterns to inform your custom blueprint.
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-4">
                                    <Button onClick={handleGenerate} className="w-full h-14 text-lg font-bold shadow-lg" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" /> Generating Strategy...
                                            </>
                                        ) : (
                                            <>
                                                {UI_COPY.NEW_SCENARIO.CTA_GENERATE} <ArrowRight className="ml-2" />
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="ghost" onClick={handleBack}>Back to Inputs</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageShell>
    );
}
