'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input, Label, Textarea } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowRight, ArrowLeft, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { generateBlueprint } from '@/lib/blueprint-engine';
import { Badge } from '@/components/ui/Badge';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';
import { Scenario } from '@/lib/types';

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
    return (
        <PageShell>
            <div className="max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Progress */}
                <div className="mb-8 flex justify-between items-center text-sm text-muted">
                    <span>Step {step} of 5</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                        ))}
                    </div>
                </div>

                <Card className="border-app shadow-sm bg-white dark:bg-zinc-900/50">
                    <CardContent className="p-8 space-y-6">

                        {/* STEP 1: ARENA */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">The Arena</h1>
                                    <p className="text-muted">Define the physics of the battlefield.</p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label>Industry</Label>
                                        <Input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. SaaS, Fintech, CPG..." autoFocus />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Market Dynamics</Label>
                                        <select
                                            name="market"
                                            value={form.market}
                                            onChange={handleChange}
                                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            <option value="B2B">B2B (High Trust)</option>
                                            <option value="B2C">B2C (High Volume)</option>
                                            <option value="D2C">D2C (Brand Heavy)</option>
                                            <option value="Enterprise">Enterprise (Complex Sales)</option>
                                        </select>
                                    </div>
                                </div>
                                <Button onClick={handleNext} className="w-full mt-4" disabled={!form.industry}>
                                    Next: The Problem <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </div>
                        )}

                        {/* STEP 2: PROBLEM */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">The Entropy</h1>
                                    <p className="text-muted">What is breaking or needs to grow?</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>The Symptom</Label>
                                        <Textarea name="symptom" value={form.symptom} onChange={handleChange} placeholder="We are getting traffic but no conversions..." rows={3} autoFocus />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>The Objective</Label>
                                        <Input name="objective" value={form.objective} onChange={handleChange} placeholder="Increase conversion rate by 20%" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handleBack}>Back</Button>
                                    <Button onClick={handleNext} className="w-full" disabled={!form.symptom}>
                                        Next: The Friction <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: FRICTION */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">The Friction</h1>
                                    <p className="text-muted">What have you already tried?</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Failed Experiments</Label>
                                        <Textarea name="tried" value={form.tried} onChange={handleChange} placeholder="We ran FB ads, changed the headline..." rows={4} autoFocus />
                                    </div>
                                    {/* Contradiction Check (Mock) */}
                                    {form.symptom.toLowerCase().includes('traffic') && form.tried.toLowerCase().includes('seo') && (
                                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg flex items-start gap-3">
                                            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                                            <p className="text-xs text-amber-800 dark:text-amber-200">
                                                <strong>Contradiction Warning:</strong> You mentioned SEO issues but your objective is short-term growth. SEO is a long-term compounder. The Studio will adjust for this.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handleBack}>Back</Button>
                                    <Button onClick={handleNext} className="w-full">
                                        Next: The Fuel <ArrowRight size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: FUEL */}
                        {step === 4 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">The Fuel</h1>
                                    <p className="text-muted">Constraints breed creativity.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Time Horizon</Label>
                                        <select name="time_horizon" value={form.time_horizon} onChange={handleChange} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                                            <option>1 month</option>
                                            <option>3 months</option>
                                            <option>6 months</option>
                                            <option>1 year+</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Budget Band</Label>
                                        <select name="budget_band" value={form.budget_band} onChange={handleChange} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                                            <option>{"< $10k"}</option>
                                            <option>{"$10k - $50k"}</option>
                                            <option>{"$50k - $200k"}</option>
                                            <option>{"> $200k"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={handleBack}>Back</Button>
                                    <Button onClick={handleRetrievalReview} className="w-full" disabled={retrieving}>
                                        {retrieving ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" size={16} />}
                                        Run Retrieval
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: RETRIEVAL REVIEW */}
                        {step === 5 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold">Pattern Match</h1>
                                    <p className="text-muted">The Studio found similar cases in the library.</p>
                                </div>

                                <div className="space-y-3">
                                    {retrieved.map((r, i) => (
                                        <div key={i} className="p-3 border border-app rounded-lg bg-zinc-50 dark:bg-zinc-800/50 flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-sm">{r.title}</div>
                                                <div className="text-xs text-muted">{r.industry}</div>
                                            </div>
                                            <Badge variant="outline" className="bg-white dark:bg-black">{r.similarity}</Badge>
                                        </div>
                                    ))}
                                    <div className="text-xs text-center text-muted pt-2">
                                        The engine will use these patterns to inform your custom blueprint.
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="outline" onClick={handleBack}>Back</Button>
                                    <Button onClick={handleGenerate} className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700 font-bold" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" /> Generating Strategy...
                                            </>
                                        ) : (
                                            <>
                                                Generate Blueprint <ArrowRight className="ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>
            </div>
        </PageShell>
    );
}
