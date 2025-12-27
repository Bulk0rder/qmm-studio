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
];
