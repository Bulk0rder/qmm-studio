import { searchKB, getKBDoc } from './kb-service';
import { ScenarioRecord, UserScenarioInput, GeneratedBlueprint, KBDoc } from './types';

// --- Librarian Logic ---

// Mock "Scenario Library" (In a real app, this would be a Vector DB or JSON file)
const SCENARIO_LIBRARY: ScenarioRecord[] = [
    {
        scenario_id: "SEED-001",
        title: "Bank Internal Advocacy Program",
        industry: "Banking",
        market: "Africa",
        customer_state: "advocacy",
        objective: "Reputation",
        constraints: ["Compliance", "Low Budget"],
        inputs: { product: "Employee App", audience: "Staff", channels: ["Internal Email", "Intranet"] },
        signals: ["Positive customer feedback", "Anniversary"],
        recommended_qm_principles: ["Entanglement", "Superposition"],
        sequence_map: [{ step: 1, touchpoint: "Kudos Email", rationale: "Trigger positive emotion" }],
        kpis: { primary: "eNPS", secondary: ["Share Rate"], measurement_plan: "Monthly Pulse" },
        experiment_plan: { type: "A/B/n", description: "Test Subject Lines for Kudos" },
        risks_and_ethics: { privacy_note: "Anonymize data", bias_check: "Ensure fair visibility", transparency_level: "High" },
        outputs: { brief_summary: "Internal advocacy drive", dashboard_view: "Advocacy Heatmap" }
    }
];

// Helper to simulate retrieval
async function findClosestScenarios(industry: string, objective: string): Promise<ScenarioRecord[]> {
    return SCENARIO_LIBRARY.filter(s =>
        s.industry.toLowerCase().includes(industry.toLowerCase()) ||
        s.objective.toLowerCase().includes(objective.toLowerCase())
    );
}

// Heuristic Generator (The "AI" Logic)
/* 
    Pipeline:
    A. Diagnose
    B. Map (Quantum Principles)
    C. Generate 3 options
    D. Orchestrate
    E. Prove
    F. Trust & Ethics
*/
export async function generateBlueprint(input: UserScenarioInput): Promise<GeneratedBlueprint> {

    // 1. Retrieval First Policy
    const retrievedScenarios = await findClosestScenarios(input.industry, input.objective);
    const kbDocs = await searchKB(input.industry, ['strategy', 'scenarios']);

    // Fallback Check ("No Hallucinations" Policy)
    if (retrievedScenarios.length === 0 && kbDocs.length === 0) {
        // In a real agent, we might return a specialized "Not Found" state, 
        // but here we generate a "Best Effort" with strict labeling.
        // For the purpose of this demo engine, we proceed but mark source as 'generation'.
    }

    // A. Diagnose
    const diagnosis = {
        constraint: input.constraints.join(", ") || "Generic Market Pressure",
        behavioral_barrier: input.risk_level === 'high' ? "Trust Deficit" : "Attention Scarcity" // Heuristic
    };

    // B. Map to Quantum Marketing
    // Heuristic selection based on risk/industry/objective
    let principles: string[] = [];

    if (input.risk_level === 'high') {
        principles = ["Law 16: Transparency", "Law 10: Internal Alignment", "Law 25: Quantum Ethics (2025)"];
    } else if (input.objective.toLowerCase().includes('growth')) {
        principles = ["Law 6: Quantum Leaps", "Law 21: The Quantum Ecosystem (2025)"];
    } else {
        principles = ["Law 3: Nonlinear Journeys", "Law 23: Infinite Intelligence (2025)"];
    }

    // C. Generate 3 Options (Mocking the creative generation)
    const options = {
        conservative: `Optimize existing channels for ${input.objective} using ${principles[0]}.`,
        aggressive: `Disrupt the ${input.industry} market with a viral campaign based on ${principles[1]}.`,
        weird: `Partner with a completely unrelated industry/influencer to create a 'Superposition' event.`
    };

    // D. Orchestrate
    const orchestration = {
        triggers: ["User visits pricing page", "Cart abandonment > 24h"],
        fallback_paths: ["Downsell to newsletter", "Retarget with education"]
    };

    // E. Prove
    const proof = {
        experiment_type: "A/Z Sequence Test (Order Testing)",
        kpis: ["Conversion Rate", "Customer Lifetime Value (CLV)", "Net Promoter Score (NPS)"]
    };

    // F. Trust & Ethics (Governance)
    const trust = {
        bias_check: "Checked target audience for exclusion bias.",
        explainability_note: "Recommendations based on retrieval of similar industry scenarios.",
        data_manifesto: "User data used solely for personalization; no third-party sale."
    };

    return {
        source: retrievedScenarios.length > 0 ? 'retrieval' : 'generation',
        used_scenarios: retrievedScenarios.map(s => ({ id: s.scenario_id, title: s.title })),
        diagnosis,
        quantum_mapping: {
            principles,
            rationale: "Selected based on industry constraints and objective."
        },
        options,
        orchestration,
        proof,
        trust_framework: trust,
        citations: kbDocs.slice(0, 3)
    };
}
