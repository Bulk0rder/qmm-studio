'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Download,
    FlaskConical,
    Gauge,
    Lightbulb,
    Map,
    ShieldAlert,
    Sparkles,
    X,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { storage, STORAGE_KEYS, trackEvent, writeThroughCache } from '@/lib/storage-client';
import { Blueprint, Scenario } from '@/lib/types';
import { seedSampleData } from '@/lib/scenario-service';

const SAMPLE_SCENARIO: Scenario = {
    id: 'sample-nigerian-fintech',
    workspace_id: 'guest',
    title: 'SAMPLE - Nigerian Fintech B2C Trust Recovery',
    description: 'Trial-to-paid conversion is stuck at 8%. Users click through onboarding but abandon when asked to connect bank data. Email sequences and in-app prompts have not moved activation.',
    metadata: {
        industry: 'Nigerian Fintech',
        market: 'B2C_HIGH_TRUST',
        customer_state: 'Aware but cautious',
        objective: 'Raise trial-to-paid conversion from 8% to 14% in 90 days',
        time_horizon: '90 days',
        budget_band: '$50k - $200k',
        risk_level: 'medium',
    },
    inputs: {
        baseline_signals: '8% trial-to-paid conversion, high bank-link abandonment',
        what_was_tried: 'Email sequences, generic trust badges, in-app prompts',
        channel_constraints: ['No exaggerated financial claims', 'NDPR-sensitive data language'],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    decision_making_unit: 'growth_lead',
    primary_trust_barrier: 'fraud_fear',
    confidence_score_preview: 84,
    seeded: true,
    seed_version: 'sample',
    related_blueprints: ['sample-blueprint'],
    related_experiments: [],
    outcomes_summary: { wins: 1, losses: 0, learning_notes: ['Proof-before-permission lifted bank-link completion.'] },
};

function makeSampleBlueprint(): Blueprint {
    const law = {
        law_number: '13',
        law_title: 'Harness Social Influence',
        physics_explanation: 'Group dynamics and visible proof reduce perceived risk before users commit.',
    };

    return {
        id: 'sample-blueprint',
        scenario_id: SAMPLE_SCENARIO.id,
        workspace_id: 'guest',
        created_at: new Date().toISOString(),
        input: {
            industry: SAMPLE_SCENARIO.metadata.industry,
            market: SAMPLE_SCENARIO.metadata.market,
            symptom: SAMPLE_SCENARIO.description,
            tried: SAMPLE_SCENARIO.inputs.what_was_tried,
            winCondition: SAMPLE_SCENARIO.metadata.objective,
        },
        sources: {
            retrieved_scenarios: [
                { scenario_id: 'sample-1', title: 'B2C fintech onboarding trust gap', match_reason: 'High-risk permission ask before visible peer proof.' },
                { scenario_id: 'sample-2', title: 'Wallet activation proof sequence', match_reason: 'Activation rose after proof was shown before KYC.' },
                { scenario_id: 'sample-3', title: 'High-fraud market reassurance flow', match_reason: 'Users needed social proof and control language before data sharing.' },
            ],
            kb_refs: [{ doc_id: 'LAW-13', section: law.law_title, text_snippet: law.physics_explanation }],
        },
        diagnosis: {
            primary_constraint: 'Trust is being requested after the user has already entered the danger zone.',
            behavioral_barrier: 'Users understand the offer, but they do not yet believe the permission request is safe.',
            root_cause_hypotheses: [
                'The bank-link ask appears before enough social proof is visible.',
                'Trust badges are present but generic, so they do not answer the specific fear.',
                'The current sequence asks for commitment before demonstrating control and reversibility.',
            ],
            assumptions: ['Demand exists', 'Onboarding traffic quality is acceptable', 'The permission ask is necessary'],
        },
        qmm_mapping: {
            core_principles: [
                { principle: 'Law 13: Harness Social Influence', why_applies: law.physics_explanation, what_it_changes: 'Move credible peer proof ahead of bank-link permission.' },
                { principle: 'Law 5: Embrace Non-Commutativity', why_applies: 'The same messages perform differently when the order changes.', what_it_changes: 'Test proof-before-permission against permission-before-proof.' },
            ],
            laws_used_optional: ['13', '05', '16'],
        },
        strategic_options: {
            conservative: { title: 'Proof-first onboarding', sequence_variant: 'A', big_bet: 'Reorder existing assets', first_3_tests: ['Proof module before bank link', 'Control-language tooltip', 'Peer cohort testimonial'] },
            aggressive: { title: 'Trust reset', sequence_variant: 'Z', big_bet: 'Rebuild the trust sequence', first_3_tests: ['Verified user wall', 'Bank-link explainer', 'Risk reversal message'] },
            weird: { title: 'Permission rehearsal', sequence_variant: 'Z', big_bet: 'Let users preview permissions before connecting', first_3_tests: ['Sandbox preview', 'Data-use receipt', 'One-tap revoke copy'] },
        },
        sequence_map: {
            narrative_goal: 'Make the data-permission ask feel safe before it feels urgent.',
            steps: [
                { step_no: 1, goal: 'Name the fear', channel: 'Onboarding screen 2', message_angle: 'You stay in control of what is connected.', expected_time: 'Week 1-2', trigger_signal: 'Continues past explainer', fallback_if_no_signal: 'Reduce ask and add FAQ proof', metric: 'Explainer completion', law_citation: law },
                { step_no: 2, goal: 'Show proof before permission', channel: 'Bank-link screen', message_angle: 'Thousands of users connect securely every week.', expected_time: 'Week 3-6', trigger_signal: 'Bank-link started', fallback_if_no_signal: 'Switch to testimonial + security explainer', metric: 'Bank-link starts', law_citation: law },
                { step_no: 3, goal: 'Convert reassurance into action', channel: 'Email + in-app reminder', message_angle: 'Complete setup when you are ready. Your access can be revoked anytime.', expected_time: 'Week 7-12', trigger_signal: 'Trial-to-paid upgrade', fallback_if_no_signal: 'Offer assisted setup', metric: 'Trial-to-paid conversion', law_citation: law },
            ],
            variants_for_AZ_testing: [],
        },
        experiments: {
            sequence_tests: [
                {
                    id: 'sample-exp-1',
                    title: 'Proof-before-permission sequence',
                    type: 'Sequence (A/Z)',
                    hypothesis: 'If we show specific peer proof before asking users to connect bank data, bank-link completion will rise because the dominant barrier is perceived fraud risk.',
                    principle_tested: law.law_title,
                    governing_law_number: law.law_number,
                    law_citation: law,
                    setup: 'Variant A asks for bank connection first. Variant Z shows peer proof, data-control copy, then the bank-link CTA.',
                    cost_to_learn: '$1,200',
                    stopping_rule: '2,000 qualified onboarding users or 300 bank-link starts',
                    success_threshold: 'Bank-link completion improves by 18%+ without lowering paid conversion quality.',
                    win_action: 'Make proof-before-permission the default onboarding sequence.',
                    lose_action: 'Test control-language density and reduce permission scope.',
                    impact_score: 9,
                    confidence_score: 8,
                    ease_score: 8,
                    ice_total: 8.3,
                    primary_metric: 'Bank-link completion',
                    target_lift: 18,
                    measurement_method: 'A/Z onboarding split',
                    run_duration_days: 21,
                },
            ],
            asset_tests: [
                {
                    id: 'sample-exp-2',
                    title: 'Control-language tooltip',
                    type: 'Asset (A/B/n)',
                    hypothesis: 'If users see plain-language control and revoke messaging beside the permission button, completion will improve because the risk feels bounded.',
                    principle_tested: 'Non-Commutativity',
                    governing_law_number: '05',
                    law_citation: { law_number: '05', law_title: 'Embrace Non-Commutativity', physics_explanation: 'Order and adjacency change how a message is interpreted.' },
                    setup: 'Test generic security copy against explicit control/revoke copy.',
                    cost_to_learn: '$400',
                    stopping_rule: '1,000 bank-link screen views',
                    success_threshold: 'CTA click-through improves by 12%+',
                    win_action: 'Ship control copy beside every data-permission ask.',
                    lose_action: 'Move reassurance earlier in onboarding.',
                    impact_score: 8,
                    confidence_score: 7,
                    ease_score: 9,
                    ice_total: 8.0,
                    primary_metric: 'Permission CTA click-through',
                    target_lift: 12,
                    measurement_method: 'A/B copy test',
                    run_duration_days: 14,
                },
            ],
        },
        trust_governance: {
            compliance_flags: ['Avoid absolute security claims', 'Keep NDPR consent language explicit'],
            privacy_consent_note: 'Explain what data is accessed, why it is needed, and how access can be revoked.',
            transparency_note: 'Show source of peer proof and sample size.',
            bias_check_note: 'Do not imply all users in a group should behave the same way.',
        },
        confidence: {
            overall: 'High',
            score: 84,
            data_needed_to_increase_confidence: ['More bank-link drop-off reasons', 'Segmented activation by acquisition channel'],
        },
        consultant_voice: {
            c_suite: { summary_card: { title: 'Executive Brief', subtitle: 'Trust sequencing', focus_point: 'Conversion without trust erosion' }, diagnosis_headline: 'The issue is not awareness. It is trust sequence failure.', strategic_angle: 'Move proof, control, and reversibility ahead of the permission ask to raise conversion without training users to ignore risk.' },
            growth: { summary_card: { title: 'Operator Brief', subtitle: '21-day proof sequence', focus_point: 'Activation lift' }, diagnosis_headline: 'Users are dropping at the moment trust becomes expensive.', strategic_angle: 'Run proof-before-permission as the first test, then tighten copy around data control.' },
            creative: { summary_card: { title: 'Creative Brief', subtitle: 'Make safety visible', focus_point: 'Reassurance angle' }, diagnosis_headline: 'The story asks for belief before it earns it.', strategic_angle: 'Lead with visible proof and customer control, then ask for the connection.' },
        },
        recommendations: [{ title: 'Start with proof-before-permission', action: 'Place specific peer proof and control language before the bank-link CTA.', law_citation: law }],
        kpi_plan: { primary_kpi: 'Trial-to-paid conversion', secondary_kpis: ['Bank-link completion', 'Permission CTA click-through'], measurement_method: 'A/Z onboarding split', cadence: 'Weekly', targets: '+18% bank-link completion, +6 pts trial-to-paid' },
    };
}

type BlueprintState = {
    blueprint: Blueprint;
    scenario: Scenario;
    isSample: boolean;
};

export default function AdvisoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, setState] = useState<BlueprintState | null>(null);
    const [evidenceOpen, setEvidenceOpen] = useState(false);
    const [upgradeShown, setUpgradeShown] = useState(false);

    useEffect(() => {
        const load = async () => {
            let scenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
            let blueprints = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];

            if (scenarios.length === 0 || blueprints.length === 0) {
                await seedSampleData(15);
                scenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
                blueprints = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];
            }

            const blueprintId = searchParams.get('blueprint');
            const scenarioId = searchParams.get('scenario');
            const activeBlueprint = storage.get<Blueprint>(STORAGE_KEYS.ACTIVE_BLUEPRINT);
            const foundBlueprint = (blueprintId ? blueprints.find((item) => item.id === blueprintId) : null)
                || activeBlueprint
                || blueprints[blueprints.length - 1]
                || null;
            const foundScenario = (scenarioId ? scenarios.find((item) => item.id === scenarioId) : null)
                || (foundBlueprint ? scenarios.find((item) => item.id === foundBlueprint.scenario_id) : null)
                || scenarios[scenarios.length - 1]
                || null;

            if (foundBlueprint && foundScenario) {
                setState({ blueprint: foundBlueprint, scenario: foundScenario, isSample: Boolean(foundBlueprint.id?.includes('sample') || foundScenario.seeded) });
                writeThroughCache(STORAGE_KEYS.ACTIVE_BLUEPRINT, foundBlueprint);
                return;
            }

            setState({ blueprint: makeSampleBlueprint(), scenario: SAMPLE_SCENARIO, isSample: true });
        };

        load();
    }, [searchParams]);

    const blueprint = state?.blueprint;
    const scenario = state?.scenario;
    const isSample = state?.isSample ?? false;

    const experiments = useMemo(() => {
        if (!blueprint) return [];
        return [...(blueprint.experiments.sequence_tests || []), ...(blueprint.experiments.asset_tests || [])]
            .map((experiment: any) => ({
                ...experiment,
                ice_total: experiment.ice_total || Number((((experiment.impact_score || 8) + (experiment.confidence_score || 7) + (experiment.ease_score || 7)) / 3).toFixed(1)),
            }))
            .sort((a, b) => (b.ice_total || 0) - (a.ice_total || 0));
    }, [blueprint]);

    if (!blueprint || !scenario) {
        return null;
    }

    const input = blueprint.input || {};
    const patternCount = Math.max(9, blueprint.sources.retrieved_scenarios.length || (storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || []).length);
    const primaryLaw = blueprint.recommendations?.[0]?.law_citation
        || blueprint.sequence_map.steps.find((step) => step.law_citation)?.law_citation
        || experiments[0]?.law_citation;
    const topExperiment = experiments[0];
    const exportHref = `/api/export/pdf?id=${encodeURIComponent(blueprint.id)}&title=${encodeURIComponent(scenario.title)}&confidence=${encodeURIComponent(`${blueprint.confidence.score}% Pattern Certainty`)}&law=${encodeURIComponent(primaryLaw ? `${primaryLaw.law_number}. ${primaryLaw.law_title}` : 'Pending')}`;

    const reflectionRows = [
        ['Industry', input.industry || scenario.metadata.industry],
        ['Market type', input.market || scenario.metadata.market],
        ['Symptom', input.symptom || scenario.description],
        ['Failed attempts', input.tried || scenario.inputs.what_was_tried || 'Not supplied yet'],
        ['Win condition', input.winCondition || scenario.metadata.objective],
    ];

    const addExperimentToLab = (experiment: any) => {
        const existing = storage.get<any[]>(STORAGE_KEYS.EXPERIMENTS) || [];
        const id = experiment.id || `EXP-${blueprint.id}-${Date.now()}`;
        const labExperiment = {
            ...experiment,
            id,
            experiment_id: id,
            scenario_id: scenario.id,
            blueprint_id: blueprint.id,
            workspace_id: 'guest',
            status: 'planned',
            created_at: new Date().toISOString(),
        };
        writeThroughCache(STORAGE_KEYS.EXPERIMENTS, [labExperiment, ...existing]);
        trackEvent('experiment_added_to_lab', { source: 'blueprint', iceTotal: labExperiment.ice_total, isSeeded: isSample });
        router.push('/lab');
    };

    const sendAllToLab = () => {
        const existing = storage.get<any[]>(STORAGE_KEYS.EXPERIMENTS) || [];
        const created = experiments.slice(0, 3).map((experiment: any, index) => {
            const id = experiment.id || `EXP-${blueprint.id}-${index}`;
            return {
                ...experiment,
                id,
                experiment_id: id,
                scenario_id: scenario.id,
                blueprint_id: blueprint.id,
                workspace_id: 'guest',
                status: 'planned',
                created_at: new Date().toISOString(),
            };
        });
        writeThroughCache(STORAGE_KEYS.EXPERIMENTS, [...created, ...existing]);
        trackEvent('blueprint_experiments_sent_to_lab', { count: created.length, highestIce: created[0]?.ice_total, isSeeded: isSample });
        router.push('/lab');
    };

    return (
        <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-3 space-y-8 pb-24 duration-500">
            <header className="grid gap-6 pt-4 lg:grid-cols-[1fr_340px] lg:items-end">
                <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <Badge variant={isSample ? 'warning' : 'default'}>{isSample ? 'SAMPLE BLUEPRINT' : 'ACTIVE BLUEPRINT'}</Badge>
                        <Badge variant="outline">{scenario.metadata.industry}</Badge>
                        <Badge variant="outline">{scenario.metadata.market.replaceAll('_', ' ')}</Badge>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">Blueprint</h1>
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#B8B8CF]">
                        {scenario.title.replace(/^SAMPLE - /, '')}
                    </p>
                </div>

                <div className="rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-5">
                    <button
                        onClick={() => {
                            setEvidenceOpen(true);
                            trackEvent('evidence_layer_interaction', { source: 'pattern_count', patternCount, isSeeded: isSample });
                        }}
                        className="text-left"
                    >
                        <div className="flex items-center gap-3 text-[#CFC9FF]">
                            <Gauge size={20} />
                            <span className="text-sm font-bold uppercase tracking-widest">Pattern Certainty</span>
                        </div>
                        <p className="mt-3 text-2xl font-black text-white">
                            {blueprint.confidence.score}% Pattern Certainty - based on {patternCount} similar scenarios
                        </p>
                        <p className="mt-2 text-sm text-[#CFCFE6]">Click to inspect the evidence layer.</p>
                    </button>
                </div>
            </header>

            {isSample && (
                <div className="rounded-lg border border-yellow-300/25 bg-yellow-300/10 p-4 text-sm text-yellow-100">
                    This is a sample output so first-time users can see the product ceiling. Run a diagnosis to generate a Blueprint from your own market inputs.
                </div>
            )}

            <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                        <Sparkles size={20} className="text-[#9F94FF]" /> We understood this as
                    </h2>
                    <div className="mt-5 grid gap-3">
                        {reflectionRows.map(([label, value]) => (
                            <div key={label} className="grid gap-2 rounded-md border border-white/10 bg-black/20 p-3 md:grid-cols-[150px_1fr]">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#9090AA]">{label}</span>
                                <span className="text-sm leading-relaxed text-white">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                        <BookOpen size={20} className="text-[#9F94FF]" /> Governing law
                    </h2>
                    <p className="mt-4 text-2xl font-bold text-white">
                        Law {primaryLaw?.law_number || '13'}: {primaryLaw?.law_title || 'Harness Social Influence'}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#B8B8CF]">
                        {primaryLaw?.physics_explanation || 'The system selected this law because the situation depends on proof, order, and trust before action.'}
                    </p>
                    <Link href={`/physics/qmm-law-${String(primaryLaw?.law_number || '13').padStart(2, '0')}`}>
                        <Button variant="outline" className="mt-5 border-white/15 text-white hover:bg-white/10">
                            Read the law
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <h2 className="text-2xl font-black text-white">Diagnosis</h2>
                <p className="mt-3 text-xl font-bold leading-snug text-white">
                    {blueprint.consultant_voice.c_suite.diagnosis_headline}
                </p>
                <p className="mt-4 max-w-4xl border-l-2 border-[#5D4FD4] pl-5 text-base leading-relaxed text-[#CFCFE6]">
                    {blueprint.consultant_voice.c_suite.strategic_angle}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <ProofBlock title="Primary constraint" body={blueprint.diagnosis.primary_constraint} />
                    <ProofBlock title="Behavioural barrier" body={blueprint.diagnosis.behavioral_barrier} />
                </div>
            </section>

            <section className="rounded-lg border border-emerald-300/20 bg-emerald-300/5 p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">Immediate payoff</p>
                        <h2 className="mt-2 text-2xl font-black text-white">Recommended Experiments</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B8B8CF]">
                            These are deliberately above the roadmap. The user should leave this page with something usable today.
                        </p>
                    </div>
                    <Button onClick={sendAllToLab} className="bg-emerald-300 text-black hover:bg-emerald-200">
                        Send top 3 to The Lab <ArrowRight className="ml-2" size={16} />
                    </Button>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {experiments.slice(0, 3).map((experiment: any, index) => (
                        <article key={experiment.id || experiment.title} className="flex min-h-[320px] flex-col rounded-lg border border-white/10 bg-black/25 p-5">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                {index === 0 && <Badge variant="success">START THIS WEEK</Badge>}
                                <Badge variant="outline">ICE {Number(experiment.ice_total || 0).toFixed(1)}</Badge>
                            </div>
                            <h3 className="text-lg font-bold leading-tight text-white">{experiment.title}</h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#CFCFE6]">{experiment.hypothesis}</p>
                            {index === 0 && (
                                <div className="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-200">How to run this</p>
                                    <p className="mt-2 text-sm leading-relaxed text-white">{experiment.setup}</p>
                                    <p className="mt-2 text-xs text-emerald-100">Stop rule: {experiment.stopping_rule}</p>
                                </div>
                            )}
                            <div className="mt-4 border-t border-white/10 pt-4">
                                <p className="text-xs text-[#9090AA]">Primary metric: {experiment.primary_metric || blueprint.kpi_plan.primary_kpi}</p>
                                <Button onClick={() => addExperimentToLab(experiment)} className="mt-3 w-full bg-[#5D4FD4] text-white hover:bg-[#6C5CFF]">
                                    Add to The Lab
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
                {blueprint.sequence_map.steps.slice(0, 3).map((step, index) => (
                    <article key={step.step_no} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-sm font-black text-[#5D4FD4]">Phase {index + 1}</div>
                        <h3 className="mt-2 text-xl font-bold text-white">{step.goal}</h3>
                        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#9090AA]">{step.expected_time}</p>
                        <p className="mt-4 text-sm leading-relaxed text-[#CFCFE6]">{step.message_angle}</p>
                        <div className="mt-4 rounded-md bg-black/20 p-3 text-xs text-[#B8B8CF]">Metric: {step.metric}</div>
                    </article>
                ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <h2 className="text-xl font-bold text-white">Why this is not generic strategy</h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {blueprint.qmm_mapping.core_principles.map((principle, index) => (
                            <div key={index} className="rounded-md border border-white/10 bg-black/20 p-4">
                                <p className="text-sm font-bold text-[#CFC9FF]">{principle.principle}</p>
                                <p className="mt-2 text-sm leading-relaxed text-[#CFCFE6]">{principle.why_applies}</p>
                                <p className="mt-3 text-xs font-bold text-white">Changes: {principle.what_it_changes}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-amber-300/25 bg-amber-300/10 p-6">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                        <ShieldAlert size={19} className="text-amber-200" /> Trust guardrails
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-amber-50">
                        {blueprint.trust_governance.compliance_flags.map((flag) => <li key={flag}>- {flag}</li>)}
                        <li>- {blueprint.trust_governance.privacy_consent_note}</li>
                    </ul>
                </div>
            </section>

            <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-bold text-white">Ready to operationalize this?</h2>
                    <p className="mt-1 text-sm text-[#B8B8CF]">Send the experiments to The Lab or export the boardroom Briefing.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button onClick={sendAllToLab} className="bg-[#5D4FD4] text-white hover:bg-[#6C5CFF]">
                        Send to The Lab
                    </Button>
                    <Link href={exportHref}>
                        <Button variant="outline" className="border-white/15 text-white hover:bg-white/10">
                            <Download className="mr-2" size={16} /> Export Briefing
                        </Button>
                    </Link>
                </div>
            </div>

            {!upgradeShown && !isSample && (
                <div className="fixed bottom-5 right-5 z-30 max-w-sm rounded-lg border border-[#5D4FD4]/30 bg-[#11111D] p-4 text-white shadow-2xl">
                    <button onClick={() => setUpgradeShown(true)} className="absolute right-2 top-2 text-[#9090AA] hover:text-white" aria-label="Dismiss upgrade prompt">
                        <X size={15} />
                    </button>
                    <p className="text-sm font-bold">Your Blueprint is saved on this device.</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#B8B8CF]">Create a free account to access it from anywhere, share with teammates, and unlock the Win Wall.</p>
                </div>
            )}

            {evidenceOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
                    <aside className="h-full w-full max-w-lg overflow-y-auto border-l border-white/10 bg-[#11111D] p-6 text-white shadow-2xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9F94FF]">Evidence Layer</p>
                                <h2 className="mt-2 text-2xl font-black">{patternCount} similar scenarios</h2>
                            </div>
                            <button onClick={() => setEvidenceOpen(false)} className="rounded-md p-2 text-[#9090AA] hover:bg-white/10 hover:text-white" aria-label="Close evidence drawer">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-6 space-y-3">
                            {(blueprint.sources.retrieved_scenarios.length ? blueprint.sources.retrieved_scenarios : makeSampleBlueprint().sources.retrieved_scenarios).map((match) => (
                                <div key={match.scenario_id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                                    <p className="font-bold">{match.title}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-[#B8B8CF]">{match.match_reason}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-4">
                            <p className="text-sm font-bold">What would raise certainty?</p>
                            <ul className="mt-3 space-y-2 text-sm text-[#CFCFE6]">
                                {blueprint.confidence.data_needed_to_increase_confidence.map((item) => <li key={item}>- {item}</li>)}
                            </ul>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}

function ProofBlock({ title, body }: { title: string; body: string }) {
    return (
        <div className="rounded-md border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9090AA]">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white">{body}</p>
        </div>
    );
}
