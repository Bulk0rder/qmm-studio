// --- Core Entities ---

export interface Scenario {
    id: string; // "SC-" + timestamp
    workspace_id: string;
    title: string;
    description: string;
    metadata: {
        industry: string;
        market: string; // e.g., "Nigeria", "Global"
        customer_state: string;
        objective: string;
        time_horizon: string;
        budget_band: string;
        risk_level: 'low' | 'medium' | 'high';
    };
    inputs: {
        baseline_signals: string;
        what_was_tried: string;
        channel_constraints: string[];
    };
    created_at: string;
    updated_at: string;
    // Relationships
    related_blueprints: string[]; // IDs
    related_experiments: string[]; // IDs
    // Learning
    outcomes_summary?: {
        wins: number;
        losses: number;
        learning_notes: string[];
    };
}

export interface Blueprint {
    id: string; // "BP-" + timestamp
    scenario_id: string;
    workspace_id: string;
    created_at: string;
    input?: any; // To store the original user input that generated this blueprint

    // SOURCES (Retrieval-First)
    sources: {
        retrieved_scenarios: {
            scenario_id: string;
            title: string;
            match_reason: string;
        }[];
        kb_refs: {
            doc_id: string;
            section: string;
            text_snippet?: string;
        }[];
    };

    // A. DIAGNOSIS
    diagnosis: {
        primary_constraint: string;
        behavioral_barrier: string;
        root_cause_hypotheses: string[];
        assumptions: string[];
    };

    // B. QMM MAPPING
    qmm_mapping: {
        core_principles: {
            principle: string; // One of the 5 Core Principles
            why_applies: string;
            what_it_changes: string;
        }[];
        laws_used_optional: string[]; // Tags
    };

    // C. STRATEGIC OPTIONS
    strategic_options: {
        conservative: StrategicOption;
        aggressive: StrategicOption;
        weird: StrategicOption;
    };

    // D. SEQUENCE MAP (Narrative)
    sequence_map: {
        narrative_goal: string;
        steps: SequenceStep[];
        variants_for_AZ_testing: {
            variant_id: string; // "A" or "Z"
            sequence_order: number[];
            rationale: string;
        }[];
    };

    // E. EXPERIMENTS (Proof)
    experiments: {
        asset_tests: ExperimentCard[];
        sequence_tests: ExperimentCard[];
    };

    // F. TRUST & GOVERNANCE
    trust_governance: {
        compliance_flags: string[]; // e.g. "Claims Check Required"
        privacy_consent_note: string;
        transparency_note: string; // Explainability
        bias_check_note: string;
        claims_evidence_required?: string[];
    };

    // META
    kpi_plan: {
        primary_kpi: string;
        secondary_kpis: string[];
        measurement_method: string;
        cadence: string;
        targets: string;
    };
    confidence: {
        overall: 'Low' | 'Medium' | 'High';
        score: number;
        data_needed_to_increase_confidence: string[];
    };
    consultant_voice: {
        c_suite: VoiceContent;
        growth: VoiceContent;
        creative: VoiceContent;
    };
}

export interface Experiment {
    id: string; // "EXP-" + timestamp
    scenario_id: string;
    blueprint_id: string;
    workspace_id: string;
    title: string;
    type: 'Asset (A/B/n)' | 'Sequence (A/Z)';
    status: 'draft' | 'running' | 'completed';

    // Design
    hypothesis: string;
    principle_tested: string;
    setup: string;
    linked_step_no?: number;

    // Decisions
    stopping_rule: string;
    success_threshold: string;
    win_action: string;
    lose_action: string;
    cost_to_learn: string;

    // Results
    result?: 'win' | 'loss' | 'inconclusive';
    metrics_logged?: Record<string, number>; // e.g., { "ctr": 2.5 }
    learning_notes?: string;
    logged_at?: string;
}

// Reuse for Blueprint preview
export interface ExperimentCard extends Omit<Experiment, 'workspace_id' | 'scenario_id' | 'blueprint_id' | 'status' | 'result' | 'metrics_logged' | 'learning_notes' | 'logged_at'> { }

export interface SequenceStep {
    step_no: number;
    goal: string;
    channel: string;
    message_angle: string;
    trigger_signal: string;
    fallback_if_no_signal: string;
    metric: string;
    expected_time: string;
}

export interface StrategicOption {
    title: string;
    sequence_variant: 'A' | 'Z';
    big_bet: string;
    first_3_tests: string[];
}

export interface VoiceContent {
    summary_card: {
        title: string;
        subtitle: string;
        focus_point: string;
    };
    diagnosis_headline: string;
    strategic_angle: string;
}

export interface WorkspaceSettings {
    workspace_id: string;
    display_name: string;
    theme_preference: 'light' | 'dark' | 'system';
    defaults: {
        market: string;
        industry: string;
        currency: string;
    };
}

// Legacy Input Support (for Intake Form)
export interface UserScenarioInput {
    situation: string; // "What's happening?"
    industry: string;
    market: string;
    objective: string;
    customer_state: string;
    time_horizon: string;
    budget_band: string;
    primary_kpi: string;
    compliance_risk: 'low' | 'medium' | 'high';
    channel_constraints: string[];
    baseline_signals: string;
    what_was_tried: string;
}

export interface KBDoc {
    id: string;
    title: string;
    type: string;
    tags: string[];
    filepath: string;
    risk_level: 'low' | 'medium' | 'high';
    content: string;
}
