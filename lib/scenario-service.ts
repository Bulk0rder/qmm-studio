import { Scenario } from './types';
import { storage, STORAGE_KEYS } from './storage-client';
// Import seed pack
import seedPack from '@/data/seed-pack.json';

// Simulated Embedding/Vector Search
export interface ScoredScenario extends Scenario {
    match_score: number;
    match_reason: string;
}

export const getAllScenarios = (): Scenario[] => {
    return storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
};

import { Blueprint } from './types';
import { generateBlueprint } from './blueprint-engine';

export const saveScenario = (scenario: Scenario): void => {
    const existing = getAllScenarios();
    storage.set(STORAGE_KEYS.SCENARIOS, [scenario, ...existing]);
};

export const seedSampleData = async (): Promise<string> => {
    // 1. Get existing data
    const existingScenarios = getAllScenarios();
    const existingExperiments = storage.get<any[]>(STORAGE_KEYS.EXPERIMENTS) || [];

    // Map for fast lookup
    const scenarioMap = new Map(existingScenarios.map(s => [s.id, s]));
    const experimentMap = new Map(existingExperiments.map(e => [e.experiment_id, e]));

    let addedScenarios = 0;
    let addedExperiments = 0;

    const newBlueprints: Blueprint[] = [];

    // 2. Process Scenarios
    for (const s of seedPack.scenarios) {
        if (!scenarioMap.has(s.scenario_id)) {
            // Create Scenario
            const newScenario: Scenario = {
                id: s.scenario_id,
                workspace_id: 'guest',
                title: s.title,
                description: `Market: ${s.market}. Objective: ${s.objective}.`,
                metadata: {
                    industry: s.industry,
                    market: s.market,
                    customer_state: s.customer_state,
                    objective: s.objective,
                    time_horizon: '90 days',
                    budget_band: s.budget_band,
                    risk_level: 'medium'
                },
                inputs: {
                    baseline_signals: JSON.stringify(s.baseline_signals),
                    what_was_tried: 'N/A',
                    channel_constraints: s.constraints || []
                },
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                related_blueprints: [],
                related_experiments: (s as any).related_experiments || [], // Will be populated by linking logic if needed, but we rely on experiment objects having scenario_id
                outcomes_summary: { wins: 0, losses: 0, learning_notes: [] },
            };

            // Generate Blueprint
            const mockInput = {
                situation: s.title,
                industry: s.industry,
                market: s.market,
                objective: s.objective,
                customer_state: s.customer_state,
                time_horizon: '90 days',
                budget_band: s.budget_band,
                primary_kpi: 'Conversion', // Default
                compliance_risk: 'medium' as const,
                channel_constraints: s.channels || [],
                baseline_signals: JSON.stringify(s.baseline_signals),
                what_was_tried: '',
                anchorScenarioId: s.scenario_id,
                title: s.title
            };

            const bp = await generateBlueprint(mockInput);
            newScenario.related_blueprints.push(bp.id);
            newBlueprints.push(bp);

            scenarioMap.set(newScenario.id, newScenario);
            addedScenarios++;
        }
    }

    // 3. Process Experiments
    for (const e of seedPack.experiments) {
        if (!experimentMap.has(e.experiment_id)) {
            const newExperiment = {
                ...e,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                status: 'planned' as const // Enforce default status
            };
            experimentMap.set(e.experiment_id, newExperiment);
            addedExperiments++;

            // Link to Scenario (Bi-directional if needed, but primary link is distinct)
            // Ideally we update the scenario's related_experiments array too
            const linkedScenario = scenarioMap.get(e.scenario_id);
            if (linkedScenario) {
                if (!linkedScenario.related_experiments) linkedScenario.related_experiments = [];
                if (!linkedScenario.related_experiments.includes(e.experiment_id)) {
                    linkedScenario.related_experiments.push(e.experiment_id);
                }
            }
        }
    }

    // 4. Save
    if (addedScenarios > 0 || addedExperiments > 0) {
        storage.set(STORAGE_KEYS.SCENARIOS, Array.from(scenarioMap.values()));
        storage.set(STORAGE_KEYS.EXPERIMENTS, Array.from(experimentMap.values()));

        // Append new blueprints to existing ones
        if (newBlueprints.length > 0) {
            const existingBPs = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];
            storage.set(STORAGE_KEYS.BLUEPRINTS, [...existingBPs, ...newBlueprints]);
        }
    }

    return `Seeded ${addedScenarios} scenarios + ${addedExperiments} experiments`;
};

export function searchScenarios(
    query: string,
    industry: string
): ScoredScenario[] {
    const allScenarios = getAllScenarios();

    // Cold Start Handling handled by caller checking empty state usually, but here we return empty or seeds
    if (allScenarios.length === 0) {
        return [];
    }

    const scored = allScenarios.map(s => {
        let score = 0;
        const reasons: string[] = [];

        // Industry Match (High weight)
        if (s.metadata.industry.toLowerCase() === industry.toLowerCase()) {
            score += 30;
            reasons.push("Industry match");
        }

        // Text Overlap (Title/Desc vs Query)
        const queryTerms = query.toLowerCase().split(' ').filter(w => w.length > 3);
        const scenarioText = (s.title + ' ' + s.description + ' ' + s.metadata.objective).toLowerCase();

        const matchCount = queryTerms.reduce((acc, term) => acc + (scenarioText.includes(term) ? 1 : 0), 0);
        if (matchCount > 0) {
            score += matchCount * 10;
            reasons.push(`Key terms match (${matchCount})`);
        }

        // Win History Boost
        if (s.outcomes_summary && s.outcomes_summary.wins > 0) {
            score += 15;
            reasons.push("Known Winner history");
        }

        return { ...s, match_score: score, match_reason: reasons.join(", ") || "General Relevance" };
    });

    return scored
        .filter(s => s.match_score > 0)
        .sort((a, b) => b.match_score - a.match_score)
        .slice(0, 5);
}
