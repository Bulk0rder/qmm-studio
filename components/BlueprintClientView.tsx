'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Blueprint } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';
import { OrbitNodes } from '@/components/illustrations/OrbitNodes';
import { TimelineArc } from '@/components/illustrations/TimelineArc';

export default function BlueprintClientView({ blueprint }: { blueprint: Blueprint }) {
    const handleExport = async () => {
        try {
            window.open(`/api/export/pdf?id=${blueprint.id}`, '_blank');
        } catch (e) {
            alert('Export failed');
        }
    };

    return (
        <div className="space-y-16 animate-in fade-in duration-700">

            {/* TOP STRIP: SOURCES */}
            <div className="rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-app bg-white dark:bg-zinc-900 shadow-sm">
                <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        {UI_COPY.BLUEPRINT.TOP_STRIP.LABEL}
                    </h2>
                    <div className="flex flex-wrap gap-6 text-sm text-app font-medium">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {UI_COPY.BLUEPRINT.TOP_STRIP.STATS(
                                blueprint.sources?.retrieved_scenarios?.length || 0,
                                blueprint.sources?.kb_refs?.length || 0,
                                blueprint.diagnosis?.assumptions?.length || 0,
                                blueprint.confidence?.overall || 'Low'
                            ).split(' / ')[0]}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {UI_COPY.BLUEPRINT.TOP_STRIP.STATS(
                                blueprint.sources?.retrieved_scenarios?.length || 0,
                                blueprint.sources?.kb_refs?.length || 0,
                                blueprint.diagnosis?.assumptions?.length || 0,
                                blueprint.confidence?.overall || 'Low'
                            ).split(' / ')[1]}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Confidence: {blueprint.confidence?.overall || 'Low'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2 mr-4 bg-zinc-50 dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-app">
                        <span className="text-xs font-bold text-muted uppercase tracking-wider">Voice:</span>
                        <select className="bg-transparent text-sm font-medium text-app focus:outline-none cursor-pointer" defaultValue="Professional">
                            <option>Professional</option>
                            <option>Casual</option>
                            <option>Urgent</option>
                            <option>Empathetic</option>
                        </select>
                    </div>

                    <Button variant="outline" size="sm" onClick={handleExport} className="shadow-sm bg-white dark:bg-zinc-800">
                        {UI_COPY.BLUEPRINT.TOP_STRIP.BUTTONS.EXPORT}
                    </Button>
                    <Button size="sm" className="shadow-sm">
                        {UI_COPY.BLUEPRINT.TOP_STRIP.BUTTONS.SAVE}
                    </Button>
                </div>
            </div>

            {/* A. DIAGNOSIS */}
            <section className="space-y-6">
                <div className="border-b border-app pb-4">
                    <h3 className="text-2xl font-semibold text-app">{UI_COPY.BLUEPRINT.SECTIONS.A.TITLE.split('(')[0]}</h3>
                    <p className="text-muted text-lg mt-1">{UI_COPY.BLUEPRINT.SECTIONS.A.TITLE.split('(')[1].replace(')', '')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-app shadow-sm bg-white dark:bg-zinc-900">
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-red-600 dark:text-red-400 uppercase tracking-widest font-bold">Primary Constraint</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-xl font-medium text-app leading-relaxed">{blueprint.diagnosis?.primary_constraint}</p>
                            <p className="text-xs text-muted mt-3 py-2 border-t border-app">{UI_COPY.BLUEPRINT.SECTIONS.A.HELPERS.CONSTRAINT}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-app shadow-sm bg-white dark:bg-zinc-900">
                        <CardHeader className="pb-2"><CardTitle className="text-sm text-orange-600 dark:text-orange-400 uppercase tracking-widest font-bold">Behavioral Barrier</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-xl font-medium text-app leading-relaxed">{blueprint.diagnosis?.behavioral_barrier}</p>
                            <p className="text-xs text-muted mt-3 py-2 border-t border-app">{UI_COPY.BLUEPRINT.SECTIONS.A.HELPERS.BARRIER}</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* D. SEQUENCE MAP (Centerpiece) */}
            <section className="space-y-8">
                <div className="border-b border-app pb-4">
                    <h3 className="text-2xl font-semibold text-app">{UI_COPY.BLUEPRINT.SECTIONS.D.TITLE.split('(')[0]}</h3>
                    <p className="text-muted text-lg mt-1">{UI_COPY.BLUEPRINT.SECTIONS.D.SUBHEADER}</p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-app rounded-2xl p-8 md:p-12 relative overflow-hidden">

                    <TimelineArc className="absolute top-0 right-0 w-full h-full opacity-[0.05]" />

                    <div className="absolute left-[39px] md:left-[50%] top-12 bottom-12 w-px bg-zinc-300 dark:bg-zinc-700"></div>

                    <div className="space-y-16 relative">
                        {blueprint.sequence_map?.steps?.map((step: any, i: number) => (
                            <div key={i} className={`flex flex-col md:flex-row gap-10 relative items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Node */}
                                <div className="absolute left-[20px] md:left-[50%] md:-translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-sm font-bold z-10 shadow-sm text-app">
                                    {i + 1}
                                </div>

                                <div className="ml-16 md:ml-0 md:w-1/2">
                                    <Card className="border-app bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h5 className="font-bold text-lg text-app leading-tight">{step.goal}</h5>
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-muted">{step.channel}</span>
                                            </div>
                                            <p className="text-sm text-muted italic mb-5 leading-relaxed pl-3 border-l-2 border-zinc-200 dark:border-zinc-700">"{step.message_angle}"</p>
                                            <div className="flex justify-between items-center text-xs pt-4 border-t border-app">
                                                <span className="text-red-500 font-medium">Fallback: {step.fallback_if_no_signal}</span>
                                                <span className="font-mono font-bold text-app bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded">{step.metric}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* B. QMM MAPPING */}
            <section className="space-y-6">
                <div className="border-b border-app pb-4">
                    <h3 className="text-xl font-semibold text-app">{UI_COPY.BLUEPRINT.SECTIONS.B.TITLE.split('(')[0]}</h3>
                    <p className="text-muted text-sm mt-1">{UI_COPY.BLUEPRINT.SECTIONS.B.SUBHEADER}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blueprint.qmm_mapping?.core_principles?.map((p: any, i: number) => (
                        <Card key={i} className="border-app bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3"><CardTitle className="text-blue-600 dark:text-blue-500 text-lg leading-tight">{p.principle}</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <span className="block text-xs uppercase text-muted font-bold mb-1 tracking-wider">Why it applies</span>
                                    <p className="text-sm text-app leading-relaxed">{p.why_applies}</p>
                                </div>
                                <div className="pt-3 border-t border-app">
                                    <span className="block text-xs uppercase text-blue-600 dark:text-blue-500 font-bold mb-1 tracking-wider">What changes</span>
                                    <p className="text-sm font-medium text-app leading-relaxed">{p.what_it_changes}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* E. PROOF (EXPERIMENTS) */}
            <section className="space-y-6">
                <div className="border-b border-app pb-4">
                    <h3 className="text-xl font-semibold text-app">{UI_COPY.BLUEPRINT.SECTIONS.E.TITLE.split('(')[0]}</h3>
                    <p className="text-muted text-sm mt-1">{UI_COPY.BLUEPRINT.SECTIONS.E.SUBHEADER}</p>
                </div>

                <div className="space-y-8">
                    <div>
                        <h4 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-4">Sequence Tests (A/Z)</h4>
                        <div className="grid gap-4">
                            {blueprint.experiments?.sequence_tests?.map((exp: any) => (
                                <Card key={exp.id} className="bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900/30 shadow-sm">
                                    <CardContent className="p-6 flex flex-col md:flex-row gap-8 justify-between items-center">
                                        <div className="space-y-2 max-w-2xl">
                                            <h5 className="font-bold text-lg text-app leading-tight">{exp.hypothesis}</h5>
                                            <p className="text-sm text-muted leading-relaxed">{exp.setup}</p>
                                            <div className="flex gap-4 text-xs font-mono mt-3">
                                                <span className="text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">Stop: {exp.stopping_rule}</span>
                                                <span className="text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Win: {exp.success_threshold}</span>
                                            </div>
                                        </div>
                                        <Button
                                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm shrink-0"
                                            onClick={() => alert(`Launching test sequence for ${exp.hypothesis}... done!`)}
                                        >
                                            Launch Test
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* F. TRUST */}
            <section className="mt-12 bg-zinc-50 dark:bg-zinc-900/30 p-8 rounded-2xl border border-app">
                <h3 className="text-base font-bold text-app mb-6 uppercase tracking-wider">{UI_COPY.BLUEPRINT.SECTIONS.F.TITLE.split('(')[0]}</h3>
                <div className="grid md:grid-cols-3 gap-8 text-sm">
                    <div>
                        <span className="block text-muted font-bold mb-2 text-xs uppercase tracking-wider">Privacy & Consent</span>
                        <p className="text-app leading-relaxed">{blueprint.trust_governance?.privacy_consent_note}</p>
                    </div>
                    <div>
                        <span className="block text-muted font-bold mb-2 text-xs uppercase tracking-wider">Bias Check</span>
                        <p className="text-app leading-relaxed">{blueprint.trust_governance?.bias_check_note}</p>
                    </div>
                    <div>
                        <span className="block text-muted font-bold mb-2 text-xs uppercase tracking-wider">Explainability</span>
                        <p className="text-app leading-relaxed">{blueprint.trust_governance?.transparency_note}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
