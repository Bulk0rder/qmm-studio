'use client';

import React, { useState } from 'react';
import { Blueprint } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { ArrowLeft, Share2, Printer, Briefcase, Zap, Feather, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlueprintClientViewProps {
    blueprint: Blueprint;
}

export default function BlueprintClientView({ blueprint }: BlueprintClientViewProps) {
    const [voice, setVoice] = useState<'boardroom' | 'operator' | 'creative'>('boardroom');

    const voiceContent = {
        boardroom: {
            title: "Boardroom Strategy",
            icon: <Briefcase size={16} />,
            diagnosis: blueprint.consultant_voice.c_suite.diagnosis_headline,
            angle: blueprint.consultant_voice.c_suite.strategic_angle,
            tone: "Executive, ROI-focused, Risk-managed"
        },
        operator: {
            title: "Operator Plan",
            icon: <Zap size={16} />,
            diagnosis: blueprint.consultant_voice.growth.diagnosis_headline,
            angle: blueprint.consultant_voice.growth.strategic_angle,
            tone: "Action-oriented, Metric-driven, Tactical"
        },
        creative: {
            title: "Creative Angles",
            icon: <Feather size={16} />,
            diagnosis: blueprint.consultant_voice.creative.diagnosis_headline,
            angle: blueprint.consultant_voice.creative.strategic_angle,
            tone: "Emotional, Brand-focused, Narrative"
        }
    };

    const activeVoice = voiceContent[voice];

    return (
        <div className="space-y-12 pb-20 animate-in fade-in zoom-in-95 duration-500">
            {/* Nav / Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/library" className="text-muted hover:text-app transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <Badge variant="outline" className="text-xs uppercase tracking-widest">{blueprint.id}</Badge>
                        <Badge variant={blueprint.confidence.score > 70 ? 'success' : 'warning'}>
                            Confidence: {blueprint.confidence.score}%
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-app">
                        {blueprint.input.title || "Untitled Strategy"}
                    </h1>
                    <div className="text-muted flex items-center gap-2 mt-2 text-sm">
                        Generated for <span className="font-semibold text-app">{blueprint.input.industry}</span> • {new Date(blueprint.created_at).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.print()}><Printer size={16} className="mr-2" /> Print</Button>
                    <Button variant="primary" size="sm"><Share2 size={16} className="mr-2" /> Share</Button>
                </div>
            </div>

            {/* VOICE TOGGLE */}
            <div className="border-b border-app">
                <div className="flex gap-6">
                    {(['boardroom', 'operator', 'creative'] as const).map((v) => (
                        <button
                            key={v}
                            onClick={() => setVoice(v)}
                            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${voice === v ? 'border-blue-600 text-blue-600' : 'border-transparent text-muted hover:text-app'}`}
                        >
                            {voiceContent[v].icon}
                            {voiceContent[v].title}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN (Strategy) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Executive Diagnosis */}
                    <section className="bg-white dark:bg-zinc-900 border border-app rounded-xl p-8 shadow-sm">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">01 Executive Diagnosis</h2>
                        <h3 className="text-2xl font-bold text-app mb-2">{activeVoice.diagnosis}</h3>
                        <p className="text-lg text-app/80 leading-relaxed mb-6">
                            {activeVoice.angle}
                        </p>
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <ShieldAlert size={14} className="text-amber-500" /> Root Cause Hypothesis
                            </h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted">
                                {blueprint.diagnosis.root_cause_hypotheses.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* 2. The Causal Chain (Sequence) */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">02 The Causal Chain</h2>
                        <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 space-y-10 pl-8 py-2">
                            {blueprint.sequence_map.steps.map((step, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white dark:bg-black border-2 border-blue-600 flex items-center justify-center text-[10px] font-bold z-10">
                                        {step.step_no}
                                    </div>
                                    <div className=" p-5 bg-white dark:bg-zinc-900 border border-app rounded-xl shadow-sm hover:border-blue-400/50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg">{step.goal}</h4>
                                            <Badge variant="outline" className="text-[10px]">{step.expected_time}</Badge>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted block text-xs uppercase mb-1">Touchpoint</span>
                                                <div className="font-medium">{step.channel}</div>
                                                <div className="text-muted mt-1 italic">"{step.message_angle}"</div>
                                            </div>
                                            <div>
                                                <span className="text-muted block text-xs uppercase mb-1">Success Signal</span>
                                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                                                    <Zap size={12} /> {step.trigger_signal}
                                                </div>
                                                <div className="text-xs text-muted mt-1">Metric: {step.metric}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Experiments */}
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">03 Recommended Experiments</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[...blueprint.experiments.sequence_tests, ...blueprint.experiments.asset_tests].map((exp, i) => (
                                <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-app rounded-xl shadow-sm flex flex-col">
                                    <div className="mb-4">
                                        <Badge variant="secondary" className="mb-2">{exp.type}</Badge>
                                        <h4 className="font-bold text-lg leading-tight">{exp.title}</h4>
                                    </div>
                                    <p className="text-sm text-muted mb-4 flex-grow">
                                        hypothesis: <span className="italic">"{exp.hypothesis}"</span>
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-app flex justify-between items-center">
                                        <div className="text-xs font-mono text-muted">{exp.cost_to_learn}</div>
                                        <Link href="/experiments" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
                                            Run Test <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN (Principles & Governance) */}
                <div className="space-y-8">

                    {/* QMM Principles */}
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <h3 className="font-bold mb-4 flex items-center gap-2 text-purple-700 dark:text-purple-400">
                            <Zap size={18} /> Applied Physics
                        </h3>
                        <div className="space-y-4">
                            {blueprint.qmm_mapping.core_principles.map((p, i) => (
                                <div key={i}>
                                    <div className="text-xs font-bold uppercase text-muted mb-1">{p.principle}</div>
                                    <p className="text-sm leading-snug">{p.why_applies}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 90 Day Roadmap */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-app rounded-xl">
                        <h3 className="font-bold mb-4">90-Day Roadmap</h3>
                        <div className="space-y-4 relative">
                            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-800"></div>

                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-zinc-900"></div>
                                <h4 className="text-sm font-bold">Weeks 1-2: Validation</h4>
                                <p className="text-xs text-muted mt-1">Launch A/Z Sequence Test. Validate CTR &gt; 1.5%.</p>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900"></div>
                                <h4 className="text-sm font-bold">Weeks 3-6: Iteration</h4>
                                <p className="text-xs text-muted mt-1">Scale winning variants. Optimize landing page conversion.</p>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 border-2 border-white dark:border-zinc-900"></div>
                                <h4 className="text-sm font-bold">Weeks 7-12: Scale</h4>
                                <p className="text-xs text-muted mt-1">Integration into evergreen automation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
