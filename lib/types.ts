export interface KBDoc {
    id: string;
    title: string;
    type: string;
    tags: string[];
    filepath: string;
    risk_level: 'low' | 'medium' | 'high';
    content?: string;
}

export interface ScenarioRecord {
    scenario_id: string;
    title: string;
    industry: string;
    market: string;
    customer_state: 'awareness' | 'consideration' | 'conversion' | 'retention' | 'advocacy';
    objective: string;
    constraints: string[];
    inputs: {
        product: string;
        audience: string;
        channels: string[];
        timing?: string;
    };
    signals: string[];
    recommended_qm_principles: string[];
    sequence_map: {
        step: number;
        touchpoint: string;
        rationale: string;
    }[];
    kpis: {
        primary: string;
        secondary: string[];
        measurement_plan: string;
    };
    experiment_plan: {
        type: 'A/B/n' | 'A/Z sequence';
        description: string;
    };
    risks_and_ethics: {
        privacy_note: string;
        bias_check: string;
        transparency_level: string;
    };
    outputs: {
        brief_summary: string;
        dashboard_view: string;
    };
}

export interface UserScenarioInput {
    situation: string;
    industry: string;
    objective: string;
    constraints: string[];
    risk_level: 'low' | 'medium' | 'high';
}

export interface GeneratedBlueprint {
    source: 'retrieval' | 'generation';
    used_scenarios: { id: string; title: string }[];
    diagnosis: {
        constraint: string;
        behavioral_barrier: string;
    };
    quantum_mapping: {
        principles: string[];
        rationale: string;
    };
    options: {
        conservative: string;
        aggressive: string;
        weird: string;
    };
    orchestration: {
        triggers: string[];
        fallback_paths: string[];
    };
    proof: {
        experiment_type: string;
        kpis: string[];
    };
    trust_framework: {
        bias_check: string;
        explainability_note: string;
        data_manifesto: string;
    };
    citations: KBDoc[];
}
