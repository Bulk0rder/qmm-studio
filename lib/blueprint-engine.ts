import {
    Blueprint,
    UserScenarioInput,
    SequenceStep,
    ExperimentCard
} from './types';
import { getScenarioById, GUEST_WORKSPACE_ID } from './storage';
import { searchKB } from './kb-service';

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

export async function generateBlueprint(input: UserScenarioInput & { anchorScenarioId?: string }): Promise<Blueprint> {

    // 1. RETRIEVAL CONTEXT
    let retrievedContext = { scenarios: [], kb: [] };
    let anchor: any = null;
    if (input.anchorScenarioId) {
        anchor = getScenarioById(input.anchorScenarioId, GUEST_WORKSPACE_ID);
        // In a real app, we'd use this to seed the LLM prompt
    }
    const relatedKB = await searchKB(input.objective + ' ' + input.industry);

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
            retrieved_scenarios: input.anchorScenarioId && anchor ? [{
                scenario_id: input.anchorScenarioId,
                title: anchor.title, // Real title from storage
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
            primary_constraint: input.budget_band?.includes('Low') ? "Budget Velocity" :
                (input.customer_state === 'Unaware' ? "Market Attention" : "Trust/Authority"),
            behavioral_barrier: input.customer_state === 'Unaware' ? "Inertia / Status Quo Bias" :
                (input.customer_state === 'Problem Aware' ? "Solution Skepticism" : "Price Anchoring"),
            root_cause_hypotheses: [
                `Customers in ${input.industry} default to established players due to risk aversion.`,
                "The current value proposition is too generic and doesn't polarize the audience.",
                "Friction in the sign-up flow is filtering out high-intent prospects."
            ],
            assumptions: [
                `CAC can be sustained at < $${input.budget_band.includes('High') ? '100' : '50'}.`,
                "Channel intent matches the 'Problem Aware' state.",
                "Competitor response will be slower than 30 days."
            ]
        },

        qmm_mapping: {
            core_principles: [
                {
                    principle: CORE_PRINCIPLES.NON_COMMUTATIVITY.name,
                    why_applies: "The order of 'Value then Price' is critical in this high-consideration journey.",
                    what_it_changes: "We enforce a strict content sequence (Education -> Proof -> Offer) instead of mixing them."
                },
                {
                    principle: CORE_PRINCIPLES.SUPERPOSITION.name,
                    why_applies: "Input indicates customers are researching (Indecision state).",
                    what_it_changes: "We use 'Either/Or' framing to collapse the wave function into a decision."
                }
            ],
            laws_used_optional: ["Law 5", "Law 1"]
        },

        strategic_options: {
            conservative: {
                title: "The Optimization Path",
                sequence_variant: "A",
                big_bet: "Incremental gain via friction reduction.",
                first_3_tests: ["Headline A/B", "Button Color", "Email Subject"]
            },
            aggressive: {
                title: "The Pattern Break",
                sequence_variant: "Z",
                big_bet: "Radical offer change to disrupt the market anchor.",
                first_3_tests: ["Offer Structure", "channel Swap", "Influencer Push"]
            },
            weird: {
                title: "The Left-Field",
                sequence_variant: "Z", // Using non-standard sequence
                big_bet: "Use humor/anti-marketing to build trust.",
                first_3_tests: ["Ugly Ad Creative", "No-Landing-Page Funnel", "Direct CEO Video"]
            }
        },

        sequence_map: {
            narrative_goal: `Convert ${input.customer_state} to Next State via Trust Accelerators`,
            steps: sequenceSteps,
            variants_for_AZ_testing: [
                {
                    variant_id: "Z",
                    sequence_order: [2, 1, 3, 4, 5],
                    rationale: "Testing 'Problem Agitation' before 'Disruption' to filter for high intent."
                }
            ]
        },

        experiments: {
            asset_tests: [assetTest],
            sequence_tests: [seqTest]
        },

        kpi_plan: {
            primary_kpi: input.primary_kpi || "Conversion Rate",
            secondary_kpis: ["CAC", "Time to Close"],
            measurement_method: "Cohorted attribution",
            cadence: "Weekly",
            targets: "+10% MoM"
        },

        trust_governance: {
            compliance_flags: input.compliance_risk === 'high' ? ["Claims Verification", "Legal Review"] : [],
            privacy_consent_note: "Ensure explicit opt-in for email sequence.",
            transparency_note: "Disclose AI usage if chatbot agents are used.",
            bias_check_note: "Verify ad targeting excludes protected attributes.",
            claims_evidence_required: input.compliance_risk === 'high' ? ["Clinical Data", "Whitepaper"] : []
        },

        confidence: {
            overall: "Medium",
            score: 72,
            data_needed_to_increase_confidence: [
                "Historical CAC data",
                "Competitor conversion benchmarks"
            ]
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
