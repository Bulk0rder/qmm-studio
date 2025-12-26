import { Scenario } from './types';
import { getScenarios, GUEST_WORKSPACE_ID } from './storage';

// Simulated Embedding/Vector Search
// In a real app, this would use OpenAI embeddings + Pinecone
// Here we use a keyword overlap + industry match scoring system.

export interface ScoredScenario extends Scenario {
    match_score: number;
    match_reason: string;
}

export function searchScenarios(
    query: string,
    industry: string,
    workspaceId: string = GUEST_WORKSPACE_ID
): ScoredScenario[] {
    const allScenarios = getScenarios(workspaceId);

    // Default "Bank" of scenarios if empty (Cold Start)
    if (allScenarios.length === 0) {
        return getColdStartScenarios(query, industry);
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

// Cold Start Data (So the app isn't empty)
function getColdStartScenarios(query: string, industry: string): ScoredScenario[] {
    // Return mock data that looks like it came from the DB
    return [
        {
            id: 'SC-MOCK-1',
            workspace_id: 'system',
            title: 'SaaS Churn Reduction via Law 3',
            description: 'Reduced churn by 15% using non-linear re-engagement loops.',
            metadata: {
                industry: 'SaaS',
                market: 'Global',
                customer_state: 'Retention',
                objective: 'Reduce Churn',
                time_horizon: '30 days',
                budget_band: '$1k - $5k',
                risk_level: 'low'
            },
            inputs: { baseline_signals: '', what_was_tried: '', channel_constraints: [] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            related_blueprints: [],
            related_experiments: [],
            outcomes_summary: { wins: 2, losses: 0, learning_notes: ['Sequence matters more than offer'] },
            match_score: 90,
            match_reason: 'System Template: High relevance to general queries'
        },
        {
            id: 'SC-MOCK-2',
            workspace_id: 'system',
            title: 'Fintech Trust Building (Nigeria)',
            description: 'Launched new savings product using "Law 16: Trust Velocity".',
            metadata: {
                industry: 'Fintech',
                customer_state: 'Consideration',
                market: 'Nigeria',
                objective: 'Acquisition',
                time_horizon: '60 days',
                budget_band: '$10k+',
                risk_level: 'medium'
            },
            inputs: { baseline_signals: '', what_was_tried: '', channel_constraints: [] },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            related_blueprints: [],
            related_experiments: [],
            match_score: 85,
            match_reason: 'System Template: Regional best practice'
        }
    ];
}
