import {
    Blueprint,
    UserScenarioInput,
    SequenceStep,
    ExperimentCard
} from './types';
// import { getScenarioById, GUEST_WORKSPACE_ID } from './storage';
// import { searchKB } from './kb-service';

// --- CORE QMM PRINCIPLES ---
const CORE_PRINCIPLES = {
    NON_COMMUTATIVITY: {
        id: 'LAW-5',
        name: 'Non-Commutativity',
        desc: 'Order matters. A then B != B then A.'
    },
    SUPERPOSITION: {
        id: 'LAW-1',
        name: 'Superposition',
        desc: 'Customer occupies multiple states simultaneously (e.g. Hopeful & Skeptical).'
    },
    OBSERVATION: {
        id: 'LAW-2',
        name: 'Observation Effect',
        desc: 'Measuring the system changes the system.'
    },
    ENTANGLEMENT: {
        id: 'LAW-4',
        name: 'Entanglement',
        desc: 'Touchpoints are connected; feedback loops are instant.'
    },
    UNCERTAINTY: {
        id: 'LAW-3',
        name: 'Indeterminacy',
        desc: 'Probabilities, not certainties. Test for probability distribution.'
    }
};

export async function generateBlueprint(input: UserScenarioInput & { anchorScenarioId?: string, title?: string }): Promise<Blueprint> {

    // 1. RETRIEVAL CONTEXT (Mocked for Client Side Seeding)
    let retrievedContext = { scenarios: [], kb: [] };

    // In strict client mode, we skip complex KB retrieval
    // const relatedKB = await searchKB(input.objective + ' ' + input.industry);
    const relatedKB: any[] = [];



    // 2. GENERATE ID
    const blueprintId = `BP-${Math.random().toString(36).substr(2, 9)}`;

    // 3. GENERATE SEQUENCE MAP (The Core)
    // Dynamic Sequence Generation based on Industry/Goal
    let sequenceSteps: SequenceStep[] = [];

    // TEMPLATE A: SaaS / B2B Tech (High Consideration)
    const saasSequence: SequenceStep[] = [
        { step_no: 1, goal: "Disrupt Cognitive Pattern", channel: "LinkedIn / Meta (Feed)", message_angle: "The 'Counter-Intuitive' Insight", trigger_signal: "Click / Dwell > 3s", fallback_if_no_signal: "Retarget with 'Social Proof' variant", metric: "CTR / Scroll Depth", expected_time: "Day 1-3" },
        { step_no: 2, goal: "Reframe the Problem", channel: "Landing Page (Above Fold)", message_angle: "It's not your fault, it's the old mechanism.", trigger_signal: "Time on Site > 45s", fallback_if_no_signal: "Exit Intent Popup (Lead Magnet)", metric: "Bounce Rate", expected_time: "Day 3 (Instant)" },
        { step_no: 3, goal: "Validate Solution Fit", channel: "Email Sequence / Demo", message_angle: "The 'New Mechanism' in action.", trigger_signal: "Reply / Booking", fallback_if_no_signal: "Downsell to 'Lite' version", metric: "Conversion Rate", expected_time: "Day 4-7" },
        { step_no: 4, goal: "Entangle Social Circles", channel: "Referral / Shared Content", message_angle: "Who else needs to see this?", trigger_signal: "Share Count", fallback_if_no_signal: "N/A", metric: "K-Factor", expected_time: "Day 7+" },
        { step_no: 5, goal: "Observation & Feedback", channel: "Survey / Usage Data", message_angle: "How did this change your workflow?", trigger_signal: "Response", fallback_if_no_signal: "Auto-reminder", metric: "NPS / CSAT", expected_time: "Day 14" }
    ];

    // TEMPLATE B: E-Commerce / D2C (Impulse + Trust)
    const ecomSequence: SequenceStep[] = [
        { step_no: 1, goal: "Stop the Scroll", channel: "TikTok / IG Reels", message_angle: "Visceral Product Demo (Hook)", trigger_signal: "Video View > 50%", fallback_if_no_signal: "Test Static Image", metric: "Thumbstop Rate", expected_time: "Day 1" },
        { step_no: 2, goal: "Build Immediate Trust", channel: "PDP (Product Page)", message_angle: "Social Proof + Guarantee Stack", trigger_signal: "Add to Cart", fallback_if_no_signal: "Retargeting: Unboxing Video", metric: "ATC Rate", expected_time: "Day 1" },
        { step_no: 3, goal: "Increase Average Order", channel: "Checkout Cart", message_angle: "Bundle Logic ('Most people add...')", trigger_signal: "Upsell Accept", fallback_if_no_signal: "Standard Checkout", metric: "AOV", expected_time: "Day 1" },
        { step_no: 4, goal: "Post-Purchase High", channel: "Email / SMS", message_angle: "You made a great choice (Validation)", trigger_signal: "Open Rate", fallback_if_no_signal: "Resend", metric: "Open Rate", expected_time: "Day 2" },
        { step_no: 5, goal: "Loop to Loyalty", channel: "Email", message_angle: "Join the VIP Community", trigger_signal: "Join Group / Referral", fallback_if_no_signal: "Discount Next Order", metric: "LTV", expected_time: "Day 14" }
    ];

    // Logic to select template
    const isEcom = input.industry.toLowerCase().includes('commerce') || input.industry.toLowerCase().includes('retail') || input.industry.toLowerCase().includes('d2c');
    sequenceSteps = isEcom ? ecomSequence : saasSequence;

    // 4. GENERATE EXPERIMENTS
    const seqTest: ExperimentCard = {
        id: `EXP-${Math.random().toString(36).substr(2, 5)}`,
        title: "Sequence Variant Test",
        type: 'Sequence (A/Z)',
        hypothesis: "Showing 'Price' before 'Value' increases drop-off by 40%.",
        principle_tested: "Non-Commutativity",
        setup: "Variant A: Standard Flow. Variant Z: Pricing Table first.",
        cost_to_learn: "$500 ad spend",
        stopping_rule: "1000 Visits or 50 conversions in Control",
        success_threshold: "Variant Z beats A by >15% confident",
        win_action: "Adopt Price-First for high-intent traffic",
        lose_action: "Revert to Value-First standard",
        linked_step_no: 2
    };

    const assetTest: ExperimentCard = {
        id: `EXP-${Math.random().toString(36).substr(2, 5)}`,
        title: "Creative Angle Test",
        type: 'Asset (A/B/n)',
        hypothesis: "Social Proof (faces) outperforms Data Proof (charts) for this audience.",
        principle_tested: "Social Proof",
        setup: "A/B test on Step 1 Ad Creative.",
        cost_to_learn: "$200",
        stopping_rule: "50 Clicks per variant",
        success_threshold: "CTR diff > 20%",
        win_action: "Scale winner layout",
        lose_action: "Test 'Fear of Loss' angle next",
        linked_step_no: 1
    };

    // 5. CONSTRUCT BLUEPRINT
    const blueprint: Blueprint = {
        id: blueprintId,
        scenario_id: input.anchorScenarioId || `SC-DRAFT-${Date.now()}`,
        workspace_id: 'guest-workspace', // Default
        created_at: new Date().toISOString(),
        input: input,

        sources: {
            retrieved_scenarios: input.anchorScenarioId ? [{
                scenario_id: input.anchorScenarioId,
                title: input.title || input.anchorScenarioId, // Use passed title or ID
                match_reason: "User Pinned"
            }] : [],
            kb_refs: relatedKB.map(d => ({
                doc_id: d.id,
                section: "Key Principles",
                text_snippet: d.content?.substring(0, 100) + "..."
            }))
        },

        diagnosis: {
            // Dynamic diagnosis based on inputs
            primary_constraint: input.channel_constraints?.[0] || "Capital Efficiency",
            behavioral_barrier: "High Cognitive Load",
            root_cause_hypotheses: [
                "User lacks clear signal of value",
                "Competing priorities dilute attention"
            ],
            assumptions: [
                "Traffic intent is high",
                "Offer is competitive"
            ]
        },
        qmm_mapping: {
            core_principles: [
                {
                    principle: "The Law of Double Jeopardy",
                    why_applies: "Your small market share implies lower loyalty naturally.",
                    what_it_changes: "Stop fighting for loyalty first. Fight for penetration."
                },
                {
                    principle: "Signal Cost Theory",
                    why_applies: "Low trust environment.",
                    what_it_changes: "Invest in high-cost signals (partnerships) over cheap talk (ads)."
                },
                {
                    principle: "Friction Physics",
                    why_applies: "Conversion rate < 1%",
                    what_it_changes: "Radical simplification of the signup flow."
                }
            ],
            laws_used_optional: ["LAW-1", "LAW-5"]
        },
        sequence_map: {
            narrative_goal: "Disrupt, Validate, Scale",
            steps: sequenceSteps,
            variants_for_AZ_testing: [
                {
                    variant_id: "A",
                    sequence_order: [1, 2, 3],
                    rationale: "Standard Flow"
                },
                {
                    variant_id: "Z",
                    sequence_order: [2, 1, 3],
                    rationale: "Price-First Test"
                }
            ]
        },
        strategic_options: {
            conservative: {
                title: "The Optimizer",
                sequence_variant: 'A',
                big_bet: "Optimization of current rails",
                first_3_tests: ["Pricing Page Audit", "Email Subject Lines", "Retargeting Frequency"]
            },
            aggressive: {
                title: "The Challenger",
                sequence_variant: 'Z',
                big_bet: "New Channel Expansion",
                first_3_tests: ["Influencer Seeding", "Podcast Sponsorship", "Competitor Conquesting"]
            },
            weird: {
                title: "The Disruptor",
                sequence_variant: 'Z',
                big_bet: "The 'Trojan Horse' Strategy",
                first_3_tests: ["Free Tool Launch", "Viral Quiz", "Fake Documentary"]
            }
        },
        experiments: {
            sequence_tests: [seqTest],
            asset_tests: [assetTest]
        },
        trust_governance: {
            compliance_flags: ["Claims Check Required"],
            privacy_consent_note: "Standard GDPR/NDPR applies.",
            transparency_note: "AI generated based on user input and simulated patterns.",
            bias_check_note: "Standard safeguards applied."
        },
        confidence: {
            overall: "Medium",
            score: 72,
            data_needed_to_increase_confidence: [
                "Historical CAC data",
                "Competitor conversion benchmarks"
            ]
        },
        kpi_plan: {
            primary_kpi: input.primary_kpi || "ROI",
            secondary_kpis: ["CAC", "LTV"],
            measurement_method: "Attribution Win-Window",
            cadence: "Weekly",
            targets: "+20%"
        },

        consultant_voice: {
            c_suite: {
                summary_card: { title: "Executive Summary", subtitle: "Strategic ROI Focus", focus_point: "Capital Efficiency" },
                diagnosis_headline: "Strategic Constraint: Budget Velocity",
                strategic_angle: "We are trading speed for efficiency to minimize burn."
            },
            growth: {
                summary_card: { title: "Growth Tactics", subtitle: "Execution Focus", focus_point: "Experiment Velocity" },
                diagnosis_headline: "Funnel Bottleneck: Top-of-Funnel",
                strategic_angle: "Rapid A/Z testing to identify the breakout offer."
            },
            creative: {
                summary_card: { title: "Creative Direction", subtitle: "Brand Resonance", focus_point: "Emotional Impact" },
                diagnosis_headline: "The Emotional Disconnect",
                strategic_angle: "The brand feels too 'corporate'. We need to inject humanity."
            }
        }
    };

    return blueprint;
}
