
import { getKBIndex, searchKB } from './lib/kb-service';
import { generateBlueprint } from './lib/blueprint-engine';
import { UserScenarioInput } from './lib/types';

async function verify() {
    console.log("--- 1. Verifying Index ---");
    const index = await getKBIndex();
    const newDoc = index.find(d => d.id === 'quantum_marketing_2025');
    if (newDoc) {
        console.log("✅ 'quantum_marketing_2025' found in index.");
    } else {
        console.error("❌ 'quantum_marketing_2025' NOT found in index.");
    }

    console.log("\n--- 2. Verifying Search ---");
    const searchResults = await searchKB('2025');
    const foundInSearch = searchResults.some(d => d.id === 'quantum_marketing_2025');
    if (foundInSearch) {
        console.log("✅ Search for '2025' returned the new document.");
    } else {
        console.error("❌ Search for '2025' DID NOT return the new document.");
    }

    console.log("\n--- 3. Verifying Blueprint Logic ---");
    const input: UserScenarioInput = {
        industry: "Retail",
        objective: "Growth",
        constraints: [],
        risk_level: "low",
        situation: "Test situation"
    };

    const blueprint = await generateBlueprint(input);
    console.log("Blueprint generated:", blueprint.quantum_mapping.principles);
    if (blueprint.quantum_mapping.principles.some(p => p.includes("2025"))) {
        console.log("✅ Blueprint logic generated 2025 principles.");
    } else {
        console.error("❌ Blueprint logic DID NOT generate 2025 principles.");
    }
}

verify().catch(console.error);
