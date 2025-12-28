export interface KBItem {
    id: string;
    title: string;
    category: 'Laws' | 'Ratios' | 'Local Context' | 'Guardrails';
    summary: string;
    content: string;
}

export const KB_SEED: KBItem[] = [
    { id: '1', title: 'The Law of Double Jeopardy', category: 'Laws', summary: 'Smaller brands have fewer buyers who buy less often.', content: 'Marketing science dictates that loyalty is a function of penetration. You cannot grow loyalty without first growing penetration. This prevents "niche trap" thinking where brands try to "deepen engagement" before they have breadth.' },
    { id: '2', title: '60/40 Rule (Brand vs Activation)', category: 'Ratios', summary: 'The optimal split for long-term efficiency.', content: 'Field and Binet research suggests that for maximum efficiency, 60% of budget should go to long-term brand building (broad reach, emotional) and 40% to short-term activation (targeted, rational). In digital-only startups, this ratio often skews 10/90, leading to a plateau in CAC efficiency.' },
    { id: '3', title: 'Trust Equation in High-Fraud Markets', category: 'Local Context', summary: 'Why verify-first works in Nigeria.', content: 'In low trust markets (e.g., Nigeria, Brazil), verification signals (human faces, physical addresses, COD, third-party badges) must precede value propositions. If trust is zero, value is irrelevant.' },
    { id: '4', title: 'Greenwashing Guardrails', category: 'Guardrails', summary: 'Avoid vague sustainability claims.', content: 'Do not use terms like "Eco-friendly" without specific verifiable attributes. EU and FTC guidelines require specific claims (e.g., "Made from 80% recycled ocean plastic") rather than generic halos.' },
    { id: '5', title: 'Pricing Anchoring', category: 'Laws', summary: 'Humans compare to the nearest reference point.', content: 'Price is never absolute. It is relative to the "Anchor". If you sell a $2000 course, anchor it against a $50,000 MBA, not a $20 book. The sequence of presentation matters: Show the high anchor first.' },
    {
        id: 'kb-001',
        title: 'The Law of Friction',
        category: 'Laws',
        summary: 'Trust decreases as friction increases, unless the value curve compensates exponentially.',
        content: 'Friction is not just UI lag; it is cognitive load. In high-trust environments (like enterprise sales), some friction is necessary to prove value (The Ike Effect). In low-trust environments (consumer apps), distinct friction points cause drop-off. The diagnosis must map friction against current trust levels.'
    },
    {
        id: 'kb-002',
        title: 'CAC:LTV Equilibrium',
        category: 'Ratios',
        summary: 'The golden ratio of 1:3 is a myth in early-stage validation; aim for payback period velocity instead.',
        content: 'Focusing on 3:1 LTV:CAC too early kills experimentation. Operator voice blueprints prioritize "Time to Payback" (TTP) over theoretical lifetime value. A healthy TTP is < 90 days for SMB and < 6 months for Enterprise.'
    },
    {
        id: 'kb-003',
        title: 'The Local Context Variable',
        category: 'Local Context',
        summary: 'Strategies that work in US SaaS fail in EU Fintech without cultural localization of the "Trust" phase.',
        content: 'Cultural dimensions (Hofstede) impact the "Trust" step of the sequence. In high-uncertainty avoidance cultures (e.g., DACH region), social proof must be authoritative (certifications), not just peer-based (reviews).'
    },
    {
        id: 'kb-004',
        title: 'Dunbar’s Number in Communities',
        category: 'Laws',
        summary: 'Community engagement collapses when group size exceeds cognitive limits without segmentation.',
        content: 'When building community-led growth (Fuel), do not scale a single channel beyond 150 active participants without fracturing it into sub-groups (Squads). Violating this leads to noise and churn.'
    },
    {
        id: 'kb-005',
        title: 'The Endowment Effect',
        category: 'Guardrails',
        summary: 'Users overvalue what they already have. Switching costs must be overcome by 10x value.',
        content: 'To disrupt an incumbent, your solution cannot just be "better". It must be 10x better to justify the psychological cost of losing the familiar tool. Diagnostic questions should hunt for "Implementation Fear".'
    },
    {
        id: 'kb-006',
        title: 'Network Effects (Metcalfe’s Law)',
        category: 'Laws',
        summary: 'The value of the network increases with the square of the number of users.',
        content: 'For marketplaces and social platforms, the "Cold Start Problem" is the primary barrier. Blueprints must focus on "Atomic Networks"—the smallest viable cluster of users needed to simulate value.'
    },
    {
        id: 'kb-007',
        title: 'Regulatory Moats',
        category: 'Guardrails',
        summary: 'Compliance is not just a cost; it is a defensive asset in Fintech and Health.',
        content: 'In highly regulated industries, the "friction" of compliance is a feature. It prevents low-quality entrants. Operator plans should highlight "Compliance as Marketing" logic.'
    }
];
