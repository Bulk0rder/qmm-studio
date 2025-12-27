import { Scenario } from './types';
import { storage, STORAGE_KEYS } from './storage-client';
import seeds from '@/data/scenarios.json';

// Simulated Embedding/Vector Search
export interface ScoredScenario extends Scenario {
    match_score: number;
    match_reason: string;
}

export const getAllScenarios = (): Scenario[] => {
    return storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
};

export const saveScenario = (scenario: Scenario): void => {
    const existing = getAllScenarios();
    storage.set(STORAGE_KEYS.SCENARIOS, [scenario, ...existing]);
};

// Import Blueprint Type
import { Blueprint } from './types';
import { generateBlueprint } from './blueprint-engine';

export const seedSampleData = async (): Promise<void> => {
    const existing = getAllScenarios();
    if (existing.length > 0) return;

    const newScenarios: Scenario[] = [];
    const newBlueprints: Blueprint[] = [];

    for (const s of (seeds as any[])) {
        // 1. Create Scenario
        const scenarioId = s.scenario_id;
        const newScenario: Scenario = {
            id: scenarioId,
            workspace_id: 'guest',
            title: s.title,
            description: `Market: ${s.market}. Objective: ${s.objective || 'Optimization'}.`,
            metadata: {
                industry: s.industry,
                market: s.market,
                customer_state: s.customer_state,
                objective: s.objective || 'Growth',
                time_horizon: '90 days',
                budget_band: 'Variable',
                risk_level: 'medium'
            },
            inputs: {
                baseline_signals: (s.signals || []).join(', '),
                what_was_tried: 'N/A',
                channel_constraints: []
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            related_blueprints: [],
            related_experiments: [],
            outcomes_summary: { wins: Math.floor(Math.random() * 5), losses: 0, learning_notes: [] },
        };

        // 2. Mock Input for Blueprint Engine
        const mockInput = {
            situation: s.title,
            industry: s.industry,
            market: s.market,
            objective: s.objective || 'Growth',
            customer_state: s.customer_state,
            time_horizon: '90 days',
            budget_band: 'Medium',
            primary_kpi: 'Conversion',
            compliance_risk: 'medium' as const,
            channel_constraints: [],
            baseline_signals: '',
            what_was_tried: '',
            anchorScenarioId: scenarioId,
            title: s.title // Extra field for title
        };

        // 3. Generate Blueprint
        const bp = await generateBlueprint(mockInput);
        newBlueprints.push(bp);

        // 4. Link
        newScenario.related_blueprints.push(bp.id);
        newScenarios.push(newScenario);
    }

    storage.set(STORAGE_KEYS.SCENARIOS, newScenarios);
    storage.set(STORAGE_KEYS.BLUEPRINTS, newBlueprints);
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
