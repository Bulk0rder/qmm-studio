import { storage, STORAGE_KEYS } from './storage-client';
import { Scenario, Blueprint, Experiment } from './types';
import { SCENARIOS_SEED_JSON, EXPERIMENTS_SEED_JSON, SEED_VERSION, getLawForScenario } from './seed-data';

// Helper to generate a mock blueprint for a seeded scenario
export const generateMockBlueprint = (scenarioId: string, title?: string, industry?: string, symptom?: string): Blueprint => {
    const law = getLawForScenario(industry, symptom);
    const confidenceScore = 74 + (scenarioId.charCodeAt(scenarioId.length - 1) % 12);
    return {
        id: `BP-${scenarioId}`,
        scenario_id: scenarioId,
        workspace_id: 'guest',
        created_at: new Date().toISOString(),
        consultant_voice: {
            c_suite: {
                summary_card: { title: "Executive Brief", subtitle: "Strategic Re-alignment", focus_point: "ROI & Risk" },
                diagnosis_headline: "Strategic Misalignment detected.",
                strategic_angle: `In ${industry}, the market has shifted but your strategy has not. We need to realign mechanics.`
            },
            growth: {
                summary_card: { title: "Growth Roadmap", subtitle: "30-Day Sprints", focus_point: "Execution" },
                diagnosis_headline: "Funnel friction detected.",
                strategic_angle: "Focus on removing barriers in the first 7 days to unlock velocity."
            },
            creative: {
                summary_card: { title: "The Angle", subtitle: "Narrative & Hook", focus_point: "Differentiation" },
                diagnosis_headline: "Creative fatigue detected.",
                strategic_angle: "The story is stale. We need a new villain and a new hero."
            }
        },
        diagnosis: {
            primary_constraint: "Market Dynamics",
            behavioral_barrier: "Trust Deficit",
            root_cause_hypotheses: ["Value not communicated clearly", "High friction in signup", `${law.law_title} is not being handled early enough in the journey`],
            assumptions: ["Market demand exists", "Pricing is not the primary barrier"]
        },
        qmm_mapping: {
            core_principles: [
                { principle: `${law.law_number}. ${law.law_title}`, why_applies: law.physics_explanation, what_it_changes: "Make the governing market law visible before asking for conversion." },
                { principle: "04. Friction Physics", why_applies: "Drop-off signals show decision energy is being lost.", what_it_changes: "Simplify flow and explain unavoidable friction." }
            ],
            laws_used_optional: [law.law_number, "04"]
        },
        sequence_map: {
            narrative_goal: "Standard Funnel Optimization",
            steps: [
                { step_no: 1, goal: "Surface the real risk", channel: "Paid Social", message_angle: "Name the customer hesitation before the offer", expected_time: "Day 1-3", trigger_signal: "Click", fallback_if_no_signal: "Retarget with proof variant", metric: "CTR", law_citation: law },
                { step_no: 2, goal: "Build proof before pressure", channel: "Email / Landing Page", message_angle: "Evidence, mechanism, and next safe step", expected_time: "Day 4-7", trigger_signal: "Open / dwell", fallback_if_no_signal: "Reduce ask and add third-party signal", metric: "Open Rate / CVR", law_citation: law }
            ],
            variants_for_AZ_testing: []
        },
        strategic_options: {
            conservative: { title: "Optimizer", sequence_variant: 'A', big_bet: "Optimize lower funnel", first_3_tests: ["Checkout UI", "Email timing", "Retargeting"] },
            aggressive: { title: "Challenger", sequence_variant: 'Z', big_bet: "Pivot positioning", first_3_tests: ["New Value Prop", "Pricing Change", "Influencer Blitz"] },
            weird: { title: "Disruptor", sequence_variant: 'Z', big_bet: "Counter-intuitive offer", first_3_tests: ["Pay what you want", "Anti-marketing", "Community led"] }
        },
        experiments: {
            sequence_tests: [{
                id: `EXP-${scenarioId}-SEQ`,
                title: "Proof-before-offer sequence test",
                type: 'Sequence (A/Z)',
                hypothesis: `If we apply ${law.law_title} before the commercial ask, conversion quality will improve because the dominant uncertainty is addressed first.`,
                principle_tested: law.law_title,
                governing_law_number: law.law_number,
                law_citation: law,
                setup: "Variant A leads with offer. Variant Z leads with proof, then offer.",
                cost_to_learn: "$300",
                stopping_rule: "1,000 qualified visits or 50 conversions",
                success_threshold: "Z improves primary KPI by 15%+",
                win_action: "Adopt proof-first order for this segment",
                lose_action: "Test a lower-friction ask",
                linked_step_no: 2,
                impact_score: 8,
                confidence_score: 7,
                ease_score: 7,
                ice_total: 7.3,
                primary_metric: "Conversion rate",
                target_lift: 15,
                measurement_method: "A/Z sequence split",
                run_duration_days: 14
            }],
            asset_tests: []
        },
        trust_governance: {
            compliance_flags: ["Check local advertising laws"],
            privacy_consent_note: "Standard GDPR/NDPR applies.",
            transparency_note: "Mock Data",
            bias_check_note: "Mock Data"
        },
        confidence: {
            overall: confidenceScore >= 80 ? 'High' : 'Medium',
            score: confidenceScore,
            data_needed_to_increase_confidence: ["More historical data"]
        },
        recommendations: [
            {
                title: "Front-load the governing trust signal",
                action: `Lead with ${law.law_title.toLowerCase()} before campaign pressure or pricing.`,
                law_citation: law
            }
        ],
        kpi_plan: {
            primary_kpi: "Revenue",
            secondary_kpis: ["CAC", "LTV"],
            measurement_method: "Direct Attribution",
            cadence: "Weekly",
            targets: "10% MoM"
        },
        sources: {
            kb_refs: [{ doc_id: `LAW-${law.law_number}`, section: law.law_title, text_snippet: law.physics_explanation }],
            retrieved_scenarios: []
        }
    };
};

export const seedSampleData = async (limit = 15): Promise<string> => {
    // 1. Get existing data
    const existingScenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
    const existingExperiments = storage.get<Experiment[]>(STORAGE_KEYS.EXPERIMENTS) || [];
    const existingBlueprints = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];

    // Map for fast lookup
    const scenarioMap = new Map(existingScenarios.map(s => [s.id, s]));
    const experimentMap = new Map(existingExperiments.map((e: any) => [e.id || e.experiment_id, e]));
    const blueprintMap = new Map(existingBlueprints.map(b => [b.id, b]));

    let addedScenarios = 0;
    let addedExperiments = 0;

    // 2. Process Experiments first to link them (but they need scenario IDs)
    // We will process scenarios, then look up experiments for them.

    for (const s of SCENARIOS_SEED_JSON.slice(0, limit)) {
        const relatedExps = EXPERIMENTS_SEED_JSON.filter(e => e.scenario_id === s.scenario_id);
        const relatedExpIds = relatedExps.map(e => e.experiment_id);
        const law = getLawForScenario(s.industry, s.symptom);
        const newBp = generateMockBlueprint(s.scenario_id, s.title, s.industry, s.symptom);

        if (!blueprintMap.has(newBp.id)) {
            blueprintMap.set(newBp.id, newBp);
        }

        if (!scenarioMap.has(s.scenario_id)) {
            const newScenario: Scenario = {
                id: s.scenario_id,
                workspace_id: 'guest',
                title: s.title,
                description: `${s.industry} - ${s.market}: ${s.symptom}`,
                metadata: {
                    industry: s.industry,
                    market: s.market,
                    customer_state: s.customer_state as any,
                    objective: s.objective as any,
                    time_horizon: s.constraint,
                    budget_band: s.budget_band as any,
                    risk_level: 'medium'
                },
                inputs: {
                    baseline_signals: s.baseline_signals,
                    what_was_tried: s.what_tried,
                    channel_constraints: []
                },
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                decision_making_unit: s.industry.includes('B2B') ? 'multi_stakeholder' : 'growth_lead',
                primary_trust_barrier: law.law_number === '04' ? 'reliability_doubt' : law.law_number === '03' ? 'proof_gap' : 'fraud_fear',
                confidence_score_preview: newBp.confidence.score,
                seeded: true,
                seed_version: SEED_VERSION,
                related_blueprints: [newBp.id],
                related_experiments: relatedExpIds,
                outcomes_summary: { wins: 0, losses: 0, learning_notes: [] }
            };

            scenarioMap.set(newScenario.id, newScenario);
            addedScenarios++;
        } else {
            const existing = scenarioMap.get(s.scenario_id);
            if (existing && (!existing.related_blueprints?.includes(newBp.id) || !existing.related_experiments?.length)) {
                scenarioMap.set(s.scenario_id, {
                    ...existing,
                    confidence_score_preview: existing.confidence_score_preview || newBp.confidence.score,
                    seeded: existing.seeded ?? true,
                    seed_version: existing.seed_version || SEED_VERSION,
                    related_blueprints: Array.from(new Set([...(existing.related_blueprints || []), newBp.id])),
                    related_experiments: Array.from(new Set([...(existing.related_experiments || []), ...relatedExpIds])),
                });
            }
        }

        for (const e of relatedExps) {
            if (!experimentMap.has(e.experiment_id)) {
                const newExp: Experiment = {
                    id: e.experiment_id,
                    scenario_id: e.scenario_id,
                    blueprint_id: newBp.id,
                    workspace_id: 'guest',
                    title: e.hypothesis.split(' because')[0]?.replace('If we ', '') || "Experiment",
                    type: 'Asset (A/B/n)',
                    hypothesis: e.hypothesis,
                    status: (e.status as any) || 'planned',
                    setup: "A/B Test",
                    principle_tested: law.law_title,
                    governing_law_number: law.law_number,
                    law_citation: law,
                    stopping_rule: "100 clicks",
                    success_threshold: "10%",
                    win_action: "Scale",
                    lose_action: "Kill",
                    cost_to_learn: "$100",
                    impact_score: 8,
                    confidence_score: 7,
                    ease_score: 6,
                    ice_total: 7,
                    primary_metric: e.primary_kpi,
                    target_lift: 15,
                    measurement_method: e.method,
                    run_duration_days: e.duration_days,
                    startDate: new Date().toISOString()
                };
                experimentMap.set(newExp.id, newExp);
                addedExperiments++;
            }
        }
    }

    // 4. Save
    if (addedScenarios > 0 || addedExperiments > 0) {
        storage.set(STORAGE_KEYS.SCENARIOS, Array.from(scenarioMap.values()));
        storage.set(STORAGE_KEYS.EXPERIMENTS, Array.from(experimentMap.values()));
        storage.set(STORAGE_KEYS.BLUEPRINTS, Array.from(blueprintMap.values()));
    }

    return `Librarian instantiated: ${addedScenarios} scenarios, ${addedExperiments} experiments loaded.`;
};

// Re-export other services
export const getAllScenarios = (): Scenario[] => {
    return storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
};

export const getAllBlueprints = (): Blueprint[] => {
    return storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];
};

export const saveScenario = (scenario: Scenario): void => {
    const scenarios = getAllScenarios();
    const index = scenarios.findIndex(s => s.id === scenario.id);
    if (index >= 0) {
        scenarios[index] = scenario;
    } else {
        scenarios.push(scenario);
    }
    storage.set(STORAGE_KEYS.SCENARIOS, scenarios);
};

export const searchScenarios = async (query: string, industry?: string): Promise<Scenario[]> => {
    const scenarios = getAllScenarios();
    const q = query.toLowerCase();
    const ind = industry?.toLowerCase();

    return scenarios.filter(s => {
        const matchesQuery = s.title.toLowerCase().includes(q) ||
            s.metadata.industry.toLowerCase().includes(q) ||
            s.description?.toLowerCase().includes(q);

        if (ind && ind !== 'general') {
            return matchesQuery && s.metadata.industry.toLowerCase() === ind;
        }
        return matchesQuery;
    });
};
