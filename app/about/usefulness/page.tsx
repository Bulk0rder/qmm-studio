import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { ShieldCheck, History, BarChart3 } from 'lucide-react';

export default function UsefulnessPage() {
    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-12">
                <section>
                    <h1 className="text-3xl font-bold tracking-tight text-app mb-6">Why is this useful?</h1>
                    <p className="text-xl text-muted leading-relaxed">
                        Most organizations suffer from "Strategy Fog". They react to noise rather than recognizing signal. QMM Studio brings engineering rigor to marketing strategy.
                    </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 rounded-xl border border-app card-surface">
                        <ShieldCheck className="text-blue-600 mb-4" size={32} />
                        <h3 className="text-lg font-bold mb-2">Reduces Cognitive Load</h3>
                        <p className="text-sm text-muted">
                            Founders are overwhelmed by "possibility space". QMM Studio narrows the focus to the few moves that historically work for your specific scenario constraints.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border border-app card-surface">
                        <History className="text-purple-600 mb-4" size={32} />
                        <h3 className="text-lg font-bold mb-2">Preserves Institutional Memory</h3>
                        <p className="text-sm text-muted">
                            When an employee leaves, their wisdom usually leaves with them. Documenting Scenarios &rarr; Experiments builds a permanent "Brain" for your company.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border border-app card-surface">
                        <BarChart3 className="text-emerald-600 mb-4" size={32} />
                        <h3 className="text-lg font-bold mb-2">Evidence &gt; Opinion</h3>
                        <p className="text-sm text-muted">
                            Arguments in boardrooms happen because of lack of data. By forcing every strategy to be an &quot;Experiment&quot; with a &quot;Hypothesis&quot;, we move to data-driven decision making.
                        </p>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
