'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Label, Textarea } from '@/components/ui/Input';
import { generateBlueprint } from '@/lib/blueprint-engine';
import { Scenario } from '@/lib/types';
import { storage, STORAGE_KEYS, trackEvent, writeThroughCache } from '@/lib/storage-client';

export default function NewScenarioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        industry: '',
        market: 'B2B_HIGH_TRUST',
        symptom: '',
        winCondition: '',
        dmu: '',
        trustBarrier: '',
        tried: '',
        budgetRange: '< $50k',
        timeHorizon: '90 days',
    });

    useEffect(() => {
        const prefill = sessionStorage.getItem('qmm_prefill_symptom');
        if (prefill) {
            setForm((current) => ({ ...current, symptom: prefill }));
            sessionStorage.removeItem('qmm_prefill_symptom');
        }
        trackEvent('diagnosis_started', {});
    }, []);

    const precision = useMemo(() => {
        let score = 0;
        if (form.industry.trim()) score += 12;
        if (form.market) score += 8;
        if (form.symptom.length > 40) score += 24;
        if (/\d/.test(form.symptom)) score += 14;
        if (form.winCondition.length > 20) score += 16;
        if (form.dmu.length > 10) score += 10;
        if (form.trustBarrier.length > 10) score += 10;
        if (form.tried.length > 20) score += 6;
        return Math.min(100, score);
    }, [form]);

    const precisionLabel = precision <= 30
        ? 'Add more detail'
        : precision <= 60
            ? 'Blueprint will be directional'
            : precision <= 80
                ? 'Blueprint will be precise'
                : 'Maximum precision — Blueprint will cite specific patterns';

    const vagueTip = /\b(grow|better|improve)\b/i.test(form.symptom) && !/\d/.test(form.symptom);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleGenerate = async () => {
        setLoading(true);
        trackEvent('diagnosis_submitted', { precisionScore: precision, marketType: form.market });

        try {
            const bp = await generateBlueprint({
                industry: form.industry,
                market: form.market,
                situation: form.symptom,
                objective: form.winCondition,
                customer_state: form.dmu,
                time_horizon: form.timeHorizon,
                budget_band: form.budgetRange,
                primary_kpi: form.winCondition,
                compliance_risk: 'medium',
                channel_constraints: [],
                baseline_signals: form.trustBarrier,
                what_was_tried: form.tried,
            });

            const scenarioId = bp.scenario_id || `SC-${Date.now()}`;
            const scenario: Scenario = {
                id: scenarioId,
                workspace_id: 'guest',
                title: `${form.industry || 'Market'} · ${form.market.replaceAll('_', ' ')}`,
                description: form.symptom,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                metadata: {
                    industry: form.industry || 'Unspecified',
                    market: form.market,
                    objective: form.winCondition || 'Clarify the winning condition',
                    budget_band: form.budgetRange,
                    risk_level: 'medium',
                    time_horizon: form.timeHorizon,
                    customer_state: form.dmu || 'Unknown DMU',
                },
                inputs: {
                    baseline_signals: form.trustBarrier,
                    what_was_tried: form.tried,
                    channel_constraints: [],
                },
                decision_making_unit: 'growth_lead',
                primary_trust_barrier: 'proof_gap',
                confidence_score_preview: bp.confidence.score,
                related_blueprints: [bp.id],
                related_experiments: [],
                outcomes_summary: { wins: 0, losses: 0, learning_notes: [] },
            };

            const scenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
            const blueprints = storage.get<any[]>(STORAGE_KEYS.BLUEPRINTS) || [];
            writeThroughCache(STORAGE_KEYS.SCENARIOS, [scenario, ...scenarios]);
            writeThroughCache(STORAGE_KEYS.BLUEPRINTS, [{ ...bp, input: form }, ...blueprints]);
            writeThroughCache(STORAGE_KEYS.ACTIVE_BLUEPRINT, { ...bp, input: form });
            storage.set(STORAGE_KEYS.STRATEGY_SCORE, Math.min(10, (storage.get<number>(STORAGE_KEYS.STRATEGY_SCORE) || 3) + 1));

            trackEvent('blueprint_generated', {
                precisionScore: precision,
                confidenceScore: bp.confidence.score,
                patternCount: Math.max(3, scenarios.length),
                generationMs: 0,
            });
            router.push(`/blueprint?scenario=${scenarioId}&blueprint=${bp.id}`);
        } catch (error) {
            console.error(error);
            trackEvent('blueprint_generation_failed', { precisionScore: precision });
            alert('The Blueprint engine hit a problem. Your inputs are saved — try again in a moment.');
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
            <header className="grid gap-6 pt-4 lg:grid-cols-[1fr_280px] lg:items-end">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#9F94FF]">Diagnose</p>
                    <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">Capture the market situation with precision.</h1>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#A7A7BF]">
                        One focused intake. More detail means a more specific Blueprint, stronger law citations, and experiments you can run this week.
                    </p>
                </div>
                <PrecisionMeter score={precision} label={precisionLabel} />
            </header>

            <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
                <div className="space-y-5">
                    <Field label="Industry or category">
                        <Input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. Nigerian fintech, B2B SaaS, FMCG" className="h-12 border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]" />
                    </Field>

                    <Field label="Market type">
                        <select name="market" value={form.market} onChange={handleChange} className="h-12 w-full rounded-lg border border-white/10 bg-[#11111D] px-3 text-white">
                            <option value="B2B_HIGH_TRUST">B2B high trust</option>
                            <option value="B2C_HIGH_VOLUME">B2C high volume</option>
                            <option value="D2C_BRAND_HEAVY">D2C brand heavy</option>
                            <option value="ENTERPRISE_COMPLEX_SALES">Enterprise complex sales</option>
                        </select>
                    </Field>

                    <Field label="The symptom">
                        <Textarea
                            name="symptom"
                            value={form.symptom}
                            onChange={handleChange}
                            onBlur={() => vagueTip && trackEvent('diagnosis_specificity_tip_shown', {})}
                            rows={6}
                            placeholder="Describe the problem in plain English. What numbers are wrong? What behaviour is unexpected? What has changed? The more honest you are, the more precise your Blueprint."
                            className="border-white/10 bg-white/[0.04] text-base text-white placeholder:text-[#777791]"
                        />
                        {vagueTip && (
                            <div className="mt-3 flex gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
                                <AlertTriangle size={17} className="mt-0.5 shrink-0" />
                                Tip: Add specific numbers, such as 8% conversion or $50k CAC, to increase Blueprint precision.
                            </div>
                        )}
                    </Field>

                    <Field label="What does winning look like?">
                        <Textarea name="winCondition" value={form.winCondition} onChange={handleChange} rows={3} placeholder="e.g. Raise trial-to-paid conversion from 8% to 14% within 90 days without discounting." className="border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]" />
                    </Field>

                    <details className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                        <summary className="cursor-pointer text-sm font-bold text-white">Add context to increase precision (optional)</summary>
                        <div className="mt-5 grid gap-5">
                            <Field label="Decision-making unit">
                                <Input name="dmu" value={form.dmu} onChange={handleChange} placeholder="e.g. Founder signs off, growth lead owns execution, compliance reviews claims." className="border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]" />
                            </Field>
                            <Field label="Primary trust barrier">
                                <Input name="trustBarrier" value={form.trustBarrier} onChange={handleChange} placeholder="e.g. Users do not believe delivery times, claims feel generic, risk feels high." className="border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]" />
                            </Field>
                            <Field label="Tried before">
                                <Textarea name="tried" value={form.tried} onChange={handleChange} rows={3} placeholder="Campaigns, offers, channels, or sales motions already tested." className="border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]" />
                            </Field>
                            <div className="grid gap-5 md:grid-cols-2">
                                <Field label="Budget range">
                                    <select name="budgetRange" value={form.budgetRange} onChange={handleChange} className="h-12 w-full rounded-lg border border-white/10 bg-[#11111D] px-3 text-white">
                                        <option>{'< $50k'}</option>
                                        <option>$50k - $200k</option>
                                        <option>$200k - $1m</option>
                                        <option>{'> $1m'}</option>
                                    </select>
                                </Field>
                                <Field label="Time horizon">
                                    <select name="timeHorizon" value={form.timeHorizon} onChange={handleChange} className="h-12 w-full rounded-lg border border-white/10 bg-[#11111D] px-3 text-white">
                                        <option>30 days</option>
                                        <option>90 days</option>
                                        <option>6 months</option>
                                        <option>12 months</option>
                                    </select>
                                </Field>
                            </div>
                        </div>
                    </details>
                </div>

                <aside className="h-fit rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-5">
                    <Sparkles className="mb-4 text-[#CFC9FF]" />
                    <h2 className="text-lg font-bold text-white">Blueprint quality gate</h2>
                    <ul className="mt-4 space-y-3 text-sm text-[#CFCFE6]">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-300" /> Reflects your exact symptom language.</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-300" /> Shows Pattern Certainty and pattern count.</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-300" /> Labels the highest-ICE experiment as Start this week.</li>
                    </ul>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !form.industry || !form.symptom || !form.winCondition}
                        className="mt-6 h-14 w-full bg-[#5D4FD4] text-base font-bold text-white hover:bg-[#6C5CFF]"
                    >
                        {loading ? <Loader2 className="mr-2 animate-spin" /> : <ArrowRight className="mr-2" />}
                        Generate My Blueprint
                    </Button>
                    <div className="my-5 h-px bg-white/10" />
                    <Link href="/" className="inline-flex items-center text-sm font-bold text-[#CFC9FF]">
                        <Zap size={15} className="mr-2" /> Short on time? Try Quick Pulse
                    </Link>
                </aside>
            </section>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <Label className="mb-2 block text-sm font-bold text-white">{label}</Label>
            {children}
        </div>
    );
}

function PrecisionMeter({ score, label }: { score: number; label: string }) {
    return (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-white">Diagnosis Precision</span>
                <span className="text-2xl font-black text-white">{score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#5D4FD4] transition-all duration-500" style={{ width: `${score}%` }} />
            </div>
            <p className="mt-3 text-xs font-semibold text-[#A7A7BF]">{label}</p>
        </div>
    );
}
