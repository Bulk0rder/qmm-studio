import { storage, STORAGE_KEYS } from './storage-client';
import { Scenario, Blueprint, Experiment } from './types';
import { SCENARIOS_SEED_JSON, EXPERIMENTS_SEED_JSON } from './seed-data';

// Helper to generate a mock blueprint for a seeded scenario
const generateMockBlueprint = (scenarioId: string, title: string, industry: string): Blueprint => {
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
            root_cause_hypotheses: ["Value not communicated clearly", "High friction in signup"],
            assumptions: ["Market demand exists", "Pricing is not the primary barrier"]
        },
        qmm_mapping: {
            core_principles: [
                { principle: "Trust Equation", why_applies: "Low conversion despite high traffic", what_it_changes: "Front-load proof." },
                { principle: "Friction Cost", why_applies: "Drop-off at checkout", what_it_changes: "Simplify flow." }
            ],
            laws_used_optional: ["LAW-1", "LAW-2"]
        },
        sequence_map: {
            narrative_goal: "Standard Funnel Optimization",
            steps: [
                { step_no: 1, goal: "Capture Attention", channel: "Paid Social", message_angle: "Pattern Interrupt", expected_time: "Day 1-3", trigger_signal: "Click", fallback_if_no_signal: "Retarget", metric: "CTR" },
                { step_no: 2, goal: "Build Trust", channel: "Email", message_angle: "Social Proof", expected_time: "Day 4-7", trigger_signal: "Open", fallback_if_no_signal: "Resend", metric: "Open Rate" }
            ],
            variants_for_AZ_testing: []
        },
        strategic_options: {
            conservative: { title: "Optimizer", sequence_variant: 'A', big_bet: "Optimize lower funnel", first_3_tests: ["Checkout UI", "Email timing", "Retargeting"] },
            aggressive: { title: "Challenger", sequence_variant: 'Z', big_bet: "Pivot positioning", first_3_tests: ["New Value Prop", "Pricing Change", "Influencer Blitz"] },
            weird: { title: "Disruptor", sequence_variant: 'Z', big_bet: "Counter-intuitive offer", first_3_tests: ["Pay what you want", "Anti-marketing", "Community led"] }
        },
        experiments: {
            sequence_tests: [],
            asset_tests: []
        },
        trust_governance: {
            compliance_flags: ["Check local advertising laws"],
            privacy_consent_note: "Standard GDPR/NDPR applies.",
            transparency_note: "Mock Data",
            bias_check_note: "Mock Data"
        },
        confidence: {
            overall: 'Medium',
            score: 75,
            data_needed_to_increase_confidence: ["More historical data"]
        },
        kpi_plan: {
            primary_kpi: "Revenue",
            secondary_kpis: ["CAC", "LTV"],
            measurement_method: "Direct Attribution",
            cadence: "Weekly",
            targets: "10% MoM"
        },
        sources: {
            kb_refs: [],
            retrieved_scenarios: []
        }
    };
};

export const seedSampleData = async (): Promise<string> => {
    // 1. Get existing data
    const existingScenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
    const existingExperiments = storage.get<Experiment[]>(STORAGE_KEYS.EXPERIMENTS) || [];
    const existingBlueprints = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];

    // Map for fast lookup
    const scenarioMap = new Map(existingScenarios.map(s => [s.id, s]));
    const experimentMap = new Map(existingExperiments.map(e => [e.id, e]));
    const blueprintMap = new Map(existingBlueprints.map(b => [b.id, b]));

    let addedScenarios = 0;
    let addedExperiments = 0;

    // 2. Process Experiments first to link them (but they need scenario IDs)
    // We will process scenarios, then look up experiments for them.

    for (const s of SCENARIOS_SEED_JSON) {
        if (!scenarioMap.has(s.scenario_id)) {
            // Find related experiments from seed
            const relatedExps = EXPERIMENTS_SEED_JSON.filter(e => e.scenario_id === s.scenario_id);
            const relatedExpIds = relatedExps.map(e => e.experiment_id);

            // Create Blueprint for this scenario
            const newBp = generateMockBlueprint(s.scenario_id, s.title, s.industry);
            if (!blueprintMap.has(newBp.id)) {
                blueprintMap.set(newBp.id, newBp);
            }

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
                related_blueprints: [newBp.id],
                related_experiments: relatedExpIds,
                outcomes_summary: { wins: 0, losses: 0, learning_notes: [] }
            };

            scenarioMap.set(newScenario.id, newScenario);
            addedScenarios++;

            // Add the experiments to map
            for (const e of relatedExps) {
                if (!experimentMap.has(e.experiment_id)) {
                    const newExp: Experiment = {
                        id: e.experiment_id, // Map seed's experiment_id to type's id
                        scenario_id: e.scenario_id,
                        blueprint_id: newBp.id,
                        workspace_id: 'guest',
                        title: e.hypothesis.split(' because')[0]?.replace('If we ', '') || "Experiment",
                        type: 'Asset (A/B/n)', // Default
                        hypothesis: e.hypothesis,
                        status: (e.status as any) || 'planned',
                        // outcome: 'inconclusive', // Optional in type?
                        setup: "A/B Test",
                        principle_tested: "Unknown",
                        stopping_rule: "100 clicks",
                        success_threshold: "10%",
                        win_action: "Scale",
                        lose_action: "Kill",
                        cost_to_learn: "$100",
                        startDate: new Date().toISOString()
                    };
                    experimentMap.set(newExp.id, newExp);
                    addedExperiments++;
                }
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
