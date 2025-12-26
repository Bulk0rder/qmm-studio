
import { listDocs as getKBIndex, searchKB } from './lib/kb-service';
import { generateBlueprint } from './lib/blueprint-engine';
import { UserScenarioInput, Blueprint } from './lib/types';

async function verify() {
    console.log("--- 1. Verifying Index ---");
    const index = await getKBIndex();
    const newDoc = index.find(d => d.id === 'quantum_marketing_2025');
    if (newDoc) {
        console.log("✅ 'quantum_marketing_2025' found in index.");
    } else {
        console.error("❌ 'quantum_marketing_2025' NOT found in index.");
    }

    console.log("Verifying KB Integration...");

    // Test Blueprint Generation Logic
    const input: UserScenarioInput = {
        situation: "Test Situation",
        industry: "Retail",
        market: "US",
        objective: "Growth",
        customer_state: "Unaware",
        time_horizon: "3 months",
        budget_band: "Low",
        primary_kpi: "Revenue",
        compliance_risk: "low",
        channel_constraints: [],
        baseline_signals: "None",
        what_was_tried: "None"
    };

    const blueprint: Blueprint = await generateBlueprint(input);
    console.log("Generated Blueprint Quantum Principles:", blueprint.qmm_mapping.core_principles.map(p => p.principle));

    // Check for specific laws
    const hasNewLaw = blueprint.qmm_mapping.core_principles.some(p => p.principle.includes("Law 21") || p.principle.includes("Ecosystem"));

    if (hasNewLaw) {
        console.log("SUCCESS: Blueprint engine is picking up new Quantum Marketing 2025 laws.");
    } else {
        console.warn("WARNING: New laws not found in generated blueprint.");
    }
}

verify().catch(console.error);
