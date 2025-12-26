export const UI_COPY = {
    APP: {
        NAME: "QMM Studio",
        TAGLINE: "Retrieve similar scenarios → prescribe the path → prove it with tests → learn into a library of winners.",
        EMPTY_STATE: {
            TITLE: "Nothing here yet.",
            BODY: "Create your first {thing}. QMM Studio gets smarter as you log outcomes.",
            CTA: "Start new scenario",
        },
        TOASTS: {
            SAVED: "Saved.",
            EXPORT: "PDF ready.",
            LOGGED: "Result logged. The library learned.",
            WARNING: "Needs more input to be precise.",
        },
    },
    NAV: {
        HOME: "Home",
        NEW_SCENARIO: "New Scenario",
        EXPERIMENTS: "Experiments",
        SCENARIO_LIBRARY: "Scenario Library",
        KNOWLEDGE_BASE: "Knowledge Base",
        ABOUT: "About",
        HOW_TO_USE: "How to Use",
        USEFULNESS: "Usefulness",
    },
    HOME: {
        HERO: {
            TITLE: "Scenario Librarian Studio",
            SUBTITLE: "Turn unclear business situations into validated strategies using QMM (JTBD × Lean × AIDA).",
            PRIMARY_CTA: "Start new scenario",
            SECONDARY_CTA: "Browse knowledge base",
            HELPER_1: "How to use",
            HELPER_2: "What about usefulness?",
        },
        RECENT_BLUEPRINTS: {
            HEADER: "Recent blueprints",
            EMPTY_TITLE: "No blueprints yet.",
            EMPTY_BODY: "Start with a real situation. We’ll retrieve similar scenarios and prescribe a testable path.",
            EMPTY_CTA: "Start new scenario",
        },
        KNOWN_WINNERS: {
            HEADER: "Known winners",
            SUBTEXT: "What’s working across scenarios—reusable experiments you can deploy again.",
            EMPTY_TITLE: "No winners logged yet.",
            EMPTY_BODY: "Log experiment outcomes to turn strategy into repeatable wins.",
            EMPTY_CTA: "Log result",
        },
        COVERAGE_GAPS: {
            HEADER: "Coverage gaps",
            SUBTEXT: "What the library doesn’t know yet. Add scenarios or KB docs to increase accuracy.",
            EMPTY_TITLE: "No gaps detected.",
            EMPTY_BODY: "Your library coverage looks healthy for recent usage.",
        },
        QUICK_ACTIONS: {
            HEADER: "Quick actions",
            LOG_RESULT: "Log result",
            ADD_KB: "Add KB doc",
            HELPER: "Fast updates that improve future recommendations.",
        },
        SYSTEM_STATUS: {
            HEADER: "System status",
            SCENARIOS: (n: number) => `Scenario library: ${n} scenarios`,
            BLUEPRINTS: (n: number) => `Blueprints: ${n} saved`,
            EXPERIMENTS: (n: number) => `Experiments: ${n} logged`,
            KB: (n: number) => `Knowledge base: ${n} docs loaded`,
            STATUS_PILLS: {
                HEALTHY: "Healthy",
                NEEDS_COVERAGE: "Needs coverage",
                LEARNING_MODE: "Learning mode",
            },
        },
    },
    ABOUT_HOW_TO_USE: {
        TITLE: "How to use QMM Studio",
        INTRO: "Think in loops: Scenario → Sequence → Experiments → Learning.",
        STEPS: [
            { TITLE: "Start a scenario", BODY: "Describe what’s happening. Add objective, customer state, constraints." },
            { TITLE: "Review similar scenarios", BODY: "The Librarian retrieves close matches so your plan isn’t generic." },
            { TITLE: "Generate the blueprint", BODY: "You’ll get a sequence map, experiments (A/B/n + A/Z), KPIs, and governance notes." },
            { TITLE: "Run 3–5 experiments", BODY: "Each test includes stop rules and win/lose actions." },
            { TITLE: "Log results", BODY: "Winners become reusable. The system improves with every outcome." },
        ],
        FOOTER_TIP: "If the app says ‘Not in the library yet’, save the draft scenario—so the library learns.",
    },
    ABOUT_USEFULNESS: {
        TITLE: "Why this is useful",
        BULLETS: [
            "Sequence-first: order changes outcomes, so we design journeys—not random tactics.",
            "Testable by default: every recommendation becomes an experiment with stop rules.",
            "Retrieval-first truth: advice is grounded in your scenario library + KB, not hallucinations.",
            "Learns over time: logged outcomes improve future guidance.",
        ],
        BEST_FOR: "Launches • Conversion fixes • Competitive responses • Budget cuts • Trust & reputation • Internal advocacy",
    },
    LOGIN: {
        TITLE: "Welcome to QMM Studio",
        SUBTITLE: "Your scenario library becomes smarter as you log outcomes.",
        CONTINUE_EMAIL: "Continue with email",
        CONTINUE_GOOGLE: "Continue with Google",
        GUEST_MODE: "Try guest mode",
        GUEST_NOTE: "Guest mode saves locally only and may clear on refresh.",
        ONBOARDING: {
            TITLE: "Set your defaults",
            QUESTION: "What do you want to solve most often?",
            FINISH: "Start building",
        },
    },
    NEW_SCENARIO: {
        PAGE_TITLE: "New scenario",
        SUBTITLE: "Tell us what’s happening. We’ll retrieve similar scenarios and prescribe the path.",
        PLACEHOLDERS: {
            WHATS_HAPPENING: "E.g., Competitor dropped prices. Sign-ups are flat. CAC is up. We need a response in 30 days.",
            INDUSTRY: "e.g., Banking, Fintech, FMCG",
            MARKET: "e.g., Nigeria, Africa, Global",
            BASELINE_SIGNALS: "e.g., Conv rate 1.2%, CAC up 30%, churn rising weekly",
            TRIED: "Campaigns, offers, channels already tested—what failed and why.",
        },
        HELPERS: {
            CUSTOMER_STATE: "Where are most customers stuck right now?",
            BUDGET_BAND: "Used to calibrate cost-to-learn and scale decisions.",
            COMPLIANCE_RISK: "High risk enables claims checks and stricter language.",
            CHANNEL_CONSTRAINTS: "What can’t you use? (e.g., influencers, comparative claims, SMS, etc.)",
        },
        CTA_RETRIEVE: "Retrieve scenarios",
        CTA_DRAFT_ANYWAY: "Generate draft anyway",
        CTA_GENERATE: "Generate blueprint",
        LIBRARIAN: {
            HEADER: "Closest scenarios found",
            SUBTEXT: "Grounded matches from your library. Pin one as the anchor.",
            ACTIONS: {
                PIN: "Pin as anchor",
                VIEW: "View details",
            },
            NONE_FOUND: {
                TITLE: "Not in the library yet.",
                BODY: "We can generate a draft blueprint, but it will be assumption-heavy. Save this scenario to teach the library.",
                CTA_GENERATE: "Generate draft blueprint",
                CTA_SAVE: "Save as new scenario record",
            },
        },
    },
    BLUEPRINT: {
        TOP_STRIP: {
            LABEL: "Sources used (retrieval-first)",
            LINK: "View sources →",
            BUTTONS: {
                EXPORT: "Export PDF",
                SAVE: "Save to library",
            },
            STATS: (scenarios: number, kb: number, assumptions: number, confidence: string) =>
                `Scenarios: ${scenarios} / KB refs: ${kb} / Assumptions: ${assumptions} / Confidence: ${confidence}`,
        },
        SECTIONS: {
            A: {
                TITLE: "A. Diagnosis (what’s actually blocking growth)",
                HELPERS: {
                    CONSTRAINT: "The hard limit shaping decisions (time, budget, compliance, channels).",
                    BARRIER: "The customer-level friction preventing movement.",
                    ROOT_CAUSE: "Top 2–3 plausible reasons we will validate or kill.",
                    ASSUMPTIONS: "Editable. Mark what’s unknown.",
                }
            },
            B: {
                TITLE: "B. QMM mapping (which principles drive the plan)",
                SUBHEADER: "Customers move through non-linear states. We apply principles that match your reality.",
            },
            C: {
                TITLE: "C. Strategic options (3 paths, all testable)",
                SUBHEADER: "Choose one, or run two in parallel. Each includes a sequence variant + starter tests.",
                OPTIONS: {
                    CONSERVATIVE: "Conservative (fastest learning, lowest risk)",
                    AGGRESSIVE: "Aggressive (higher upside, higher complexity)",
                    WEIRD: "Weird-but-plausible (differentiation play)",
                },
                CTA: "Set as active plan",
            },
            D: {
                TITLE: "D. Sequence map (the path we’ll run)",
                SUBHEADER: "Order changes outcomes. Each step includes a trigger, fallback, and metric.",
                TOGGLE: "View sequence: A | Z",
            },
            E: {
                TITLE: "E. Proof (how we validate, not guess)",
                SUBHEADER: "Every recommendation becomes a test with stop rules and next actions.",
                TABS: {
                    ASSET: "Asset tests (A/B/n)",
                    SEQUENCE: "Sequence tests (A/Z)",
                },
                HELPER: "One primary KPI. A few secondary. Enough to decide.",
            },
            F: {
                TITLE: "F. Trust & governance (stay safe and credible)",
                SUBHEADER: "Good marketing compounds trust. Bad marketing compounds risk.",
            },
        },
        FOOTER: {
            CONFIDENCE: "Confidence & next inputs",
            IMPROVE: "What would make this smarter on the next run?",
        },
    },
    EXPERIMENTS: {
        TITLE: "Experiments",
        SUBTITLE: "Turn tests into decisions. Turn decisions into reusable winners.",
        BUTTONS: {
            CREATE: "Create experiment",
            LOG: "Log result",
        },
        WINNERS: {
            TAB: "Known winners",
            DESC: "Reusable tests that have worked in similar scenarios.",
            EMPTY: "No winners yet.",
            EMPTY_DESC: "Log results to turn experiments into reusable playbooks.",
            EMPTY_CTA: "Log result",
        },
    },
    SCENARIOS: {
        TITLE: "Scenario library",
        SUBTITLE: "The memory of the system. Better scenarios → better blueprints.",
        SEARCH_PLACEHOLDER: "Search scenarios by title, objective, state, industry…",
        EMPTY_TITLE: "No scenarios yet.",
        EMPTY_BODY: "Add your first scenario to make retrieval-first planning possible.",
        EMPTY_CTA: "Start new scenario",
    },
    KB: {
        TITLE: "Knowledge base",
        SUBTITLE: "Your reference layer: QMM principles, patterns, and playbooks.",
        SEARCH_PLACEHOLDER: "Search KB (principles, experiments, governance, channels…)",
        COVERAGE_EMPTY_TITLE: "No gaps detected.",
        COVERAGE_EMPTY_BODY: "Your KB coverage is strong for recent usage.",
        ADD_DOC: "Add to knowledge base",
        ADD_HELPER: "Keep it short and operational. This improves retrieval quality.",
    },
    PROFILE_MENU: {
        LABEL: (name: string) => `Profile: ${name}`,
        ITEMS: {
            PROFILE: "Name & profile",
            APPEARANCE: "Appearance",
            SETTINGS: "Settings",
            LOGOUT: "Log out",
        },
        THEME: {
            LIGHT: "Light",
            DARK: "Dark",
            SYSTEM: "System",
        },
    },
};
