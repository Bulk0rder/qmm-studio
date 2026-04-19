import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-10">
                <section className="space-y-4">
                    <h1 className="text-[30px] font-black leading-tight tracking-tight text-app uppercase">
                        THE FUNNEL IS A LIE.
                    </h1>
                    <p className="text-lg font-semibold text-app">And you already know it. You&apos;ve known it for a while.</p>
                </section>

                <section className="space-y-5 text-[14px] leading-[1.6] text-muted-foreground">
                    <p>
                        You ran the campaign. You followed the playbook. You hit every touchpoint in the sequence — awareness, consideration, decision. The creative was good. The targeting was tight. The copy was tested.
                    </p>
                    <p className="font-bold text-app">The numbers didn&apos;t move.</p>
                    <p>
                        So you blamed the budget. Or the timing. Or the platform algorithm. Or the team. And then you rebuilt the funnel, gave it a new name, and ran it again.
                    </p>
                    <p className="font-semibold text-app">The real answer was none of those things.</p>
                </section>

                <section className="space-y-5 text-[14px] leading-[1.6] text-muted-foreground">
                    <h2 className="text-[22px] font-bold text-app">Here is what actually happened:</h2>
                    <p>
                        Your prospect was not moving through a funnel. They were in superposition — simultaneously curious about your product, sceptical of whether it would work for them, aware of three alternatives, consulting their network, and waiting for someone they trusted to make the decision first. They were not at Stage 2 on your chart. They were in all stages at once. Your Stage 2 message found them while they were having a Stage 4 conversation in a WhatsApp group you could not see.
                    </p>
                    <p>
                        This is not a failure of execution. It is a failure of model. The funnel was designed in 1959 to describe how people bought encyclopaedias from door-to-door salespeople. It was never meant to describe how trust is built in a high-fraud market, how community-influenced purchase decisions work, or how digital buyers behave when they have infinite access to alternatives and zero obligation to move linearly.
                    </p>
                    <p>
                        The funnel is not a flawed tool. It is the wrong tool for the job — used anyway, because no one handed us something better.
                    </p>
                </section>

                <section className="space-y-5 text-[14px] leading-[1.6] text-muted-foreground">
                    <h2 className="text-[22px] font-bold text-app">Here is your mistake, explained by the physics.</h2>
                    <p>
                        You sent the product-feature email to a prospect who had not yet decided to trust you. That is a Law 5 violation: Non-Commutativity. The sequence in which you deliver your messages changes the outcome as definitively as the messages themselves. Trust must come before value. Value must come before features. Features must come before price. In a high-trust-deficit market, the sequence is the strategy. Get it wrong and the message is technically correct but functionally invisible.
                    </p>
                    <p>
                        You spent eighty percent of your budget on activation — promotions, performance ads, conversion campaigns — and wondered why retention was collapsing. That is the 60/40 inversion. The research says sixty percent of long-term marketing efficiency comes from brand investment, forty from activation. You did it backwards and then tried to solve a brand problem with more activation spend.
                    </p>
                    <p>
                        You targeted the buyer. But in your market, the buyer doesn&apos;t buy alone. A family member weighs in. A community leader&apos;s opinion matters. A WhatsApp group made the decision three conversations before your retargeting pixel fired. That is Law 3: Intrication. Purchase decisions are shaped by interconnected networks. The funnel assumes the buyer is a solitary individual moving in a straight line. In most of the world, that assumption is catastrophically wrong.
                    </p>
                    <p>
                        These are not isolated mistakes. They are the natural consequence of operating without the physics.
                    </p>
                </section>

                <section className="space-y-5 text-[14px] leading-[1.6] text-muted-foreground">
                    <h2 className="text-[22px] font-bold text-app">Your market has laws.</h2>
                    <p>
                        Twenty-five of them. Drawn from quantum physics, behavioural science, neuroscience, social dynamics, and decades of empirical market evidence. They govern how buyers behave, how brands grow, how trust is built, and how strategies succeed or fail. They operate continuously — in every market, at every price point, in every cultural context — whether you know about them or not.
                    </p>
                    <p>
                        The Law of Double Jeopardy: smaller brands have fewer buyers who buy less often — not just fewer buyers. The implication is that penetration must come before loyalty, always. The 60/40 Rule: sixty percent of marketing efficiency over time comes from brand-building, forty from activation. The Trust Equation: in markets where financial fraud is a lived experience, the first purchase is always a trust purchase, never a value purchase. The Law of Friction: trust decreases as friction increases, unless the value curve compensates exponentially — and it almost never does.
                    </p>
                    <p>
                        Most marketing fails not because the team is incompetent or the budget is insufficient. It fails because the team is applying the right tactics to the wrong physics. They are playing chess on a Go board.
                    </p>
                </section>

                <section className="space-y-5 text-[14px] leading-[1.6] text-muted-foreground">
                    <h2 className="text-[22px] font-bold text-app">QMM Studio was built for this problem.</h2>
                    <p>
                        QMM stands for Quantum Marketing Mechanics. A quantum is the minimum discrete unit of any physical quantity. In QMM, a Scenario is the minimum discrete unit of a market situation — the smallest complete description of your market, your buyer, your problem, and your win condition. You cannot diagnose a market without first defining its exact configuration. Vague inputs produce generic outputs. Precise inputs produce physics.
                    </p>
                    <p>
                        When you describe your market situation with that precision — the industry, the buyer type, the symptom, the win condition, the trust barrier, who makes the decision — the system does not generate a plan. It retrieves what has worked in your exact market configuration before, validates it against the governing laws, and returns a Blueprint: a seven-part strategy with law citations on every recommendation, a 90-day roadmap, and three pre-prioritised experiments you can start running this week.
                    </p>
                    <p>
                        Every recommendation is citable. Every citation links to the law that governs it. If the Blueprint says lead with social proof before product features, it tells you why — Law 13 (Social Influence), with the evidence for how it applies to your specific market type. This is not a chatbot generating plausible prose. It is a retrieval system applying validated principles to a precisely described situation.
                    </p>
                </section>

                <section className="space-y-5 text-[14px] leading-[1.6] text-muted-foreground">
                    <h2 className="text-[22px] font-bold text-app">And then it gets smarter.</h2>
                    <p>
                        Every experiment you run in The Lab is logged. Every win is promoted to Strategy Memory — a Known Winner, a validated pattern that strengthens the next Blueprint for anyone operating in a similar market configuration. The system compounds. The fiftieth Blueprint generated in your market context is better than the first, not because the AI trained further, but because real people in real markets ran real experiments and recorded what happened.
                    </p>
                    <p>
                        This is the thing the funnel never had: institutional memory. Not a shared drive. Not a deck that no one reads. A structured, retrievable, pattern-matched record of what the physics confirmed actually works — for your market, your buyers, your conditions.
                    </p>
                </section>

                <section className="space-y-4 border-t border-app pt-8">
                    <p className="text-[14px] leading-[1.6] text-muted-foreground font-semibold">Your market is not a funnel.</p>
                    <p className="text-[14px] leading-[1.6] text-muted-foreground font-semibold">It is a quantum system. It has laws.</p>
                    <p className="text-[22px] font-bold text-app">Now you can use them.</p>
                </section>

                <div className="flex justify-center pt-8">
                    <Link href="/diagnose" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#5D4FD4] text-white font-medium hover:bg-[#6C5CFF] transition-colors">
                        Run a Diagnosis <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
