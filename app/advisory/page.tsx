'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { Badge } from '@/components/ui/Badge';
import { Briefcase, Zap, Feather, Check, ArrowRight, ShieldAlert, BookOpen, Beaker, CheckCircle } from 'lucide-react';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';
import { Blueprint, Scenario } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';

// Storage Key
const VOICE_KEY = 'qmm.voice';

type VoiceType = 'boardroom' | 'operator' | 'creative';

export default function AdvisoryPage() {
    const searchParams = useSearchParams();
    const scenarioId = searchParams.get('scenario');
    const blueprintId = searchParams.get('blueprint');

    const [voice, setVoice] = useState<VoiceType>('boardroom');
    const [mounted, setMounted] = useState(false);
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [activeSection, setActiveSection] = useState('blueprint'); // 'retrieval', 'blueprint', 'experiments'

    useEffect(() => {
        setMounted(true);
        // Load preference
        const savedVoice = localStorage.getItem(VOICE_KEY) as VoiceType;
        if (savedVoice && ['boardroom', 'operator', 'creative'].includes(savedVoice)) {
            setVoice(savedVoice);
        }

        // Load Data
        const scenarios = storage.get<Scenario[]>(STORAGE_KEYS.SCENARIOS) || [];
        const blueprints = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];

        // 1. Try exact match from URL
        let foundBp = blueprintId ? blueprints.find(b => b.id === blueprintId) : null;
        let foundSc = scenarioId ? scenarios.find(s => s.id === scenarioId) : null;

        // 2. Fallback: Most recent
        if (!foundBp && blueprints.length > 0) foundBp = blueprints[blueprints.length - 1]; // Last one is usually newest appended
        if (!foundSc && foundBp) foundSc = scenarios.find(s => s.id === foundBp?.scenario_id);

        setBlueprint(foundBp || null);
        setScenario(foundSc || null);

    }, [scenarioId, blueprintId]);

    const handleVoiceChange = (v: VoiceType) => {
        setVoice(v);
        localStorage.setItem(VOICE_KEY, v);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    if (!mounted) return null;

    if (!blueprint || !scenario) {
        return (
            <PageShell>
                <div className="max-w-3xl mx-auto py-20 text-center space-y-6">
                    <h1 className="text-2xl font-bold">No Active Blueprint Found</h1>
                    <p className="text-muted">Generate a blueprint first to access advisory.</p>
                    <Link href="/new">
                        <Button>Start a Scenario</Button>
                    </Link>
                </div>
            </PageShell>
        );
    }

    const voices = [
        { id: 'boardroom', icon: <Briefcase size={18} />, label: 'Boardroom', desc: 'Strategy-first. Crisp, decisive, executive-ready.' },
        { id: 'operator', icon: <Zap size={18} />, label: 'Operator', desc: 'Action-first. Steps, checklists, timelines, KPIs.' },
        { id: 'creative', icon: <Feather size={18} />, label: 'Creative', desc: 'Idea-first. Angles, hooks, narrative frames.' }
    ];

    const voiceContent = {
        boardroom: {
            title: "Boardroom Strategy",
            diagnosis: blueprint.consultant_voice.c_suite.diagnosis_headline,
            angle: blueprint.consultant_voice.c_suite.strategic_angle,
        },
        operator: {
            title: "Operator Plan",
            diagnosis: blueprint.consultant_voice.growth.diagnosis_headline,
            angle: blueprint.consultant_voice.growth.strategic_angle,
        },
        creative: {
            title: "Creative Angles",
            diagnosis: blueprint.consultant_voice.creative.diagnosis_headline,
            angle: blueprint.consultant_voice.creative.strategic_angle,
        }
    };

    const activeVoice = voiceContent[voice];

    return (
        <PageShell>
            <div className="max-w-4xl mx-auto space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">

                {/* STEP NAVIGATOR */}
                <div className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-app py-4 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex justify-between items-center max-w-3xl mx-auto text-sm font-medium">
                        <Link href="/new" className="flex items-center gap-2 text-muted hover:text-blue-600 transition-colors">
                            <span className="w-6 h-6 rounded-full border border-muted hover:border-blue-600 flex items-center justify-center text-xs">1</span>
                            Define
                        </Link>
                        <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800" />

                        <button onClick={() => scrollToSection('retrieval')} className={`flex items-center gap-2 transition-colors ${activeSection === 'retrieval' ? 'text-blue-600' : 'text-muted hover:text-app'}`}>
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${activeSection === 'retrieval' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-muted'}`}>2</span>
                            Retrieval
                        </button>
                        <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800" />

                        <button onClick={() => scrollToSection('blueprint')} className={`flex items-center gap-2 transition-colors ${activeSection === 'blueprint' ? 'text-blue-600' : 'text-muted hover:text-app'}`}>
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${activeSection === 'blueprint' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-muted'}`}>3</span>
                            Blueprint
                        </button>
                        <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800" />

                        <Link href={`/experiments?scenario=${scenario.id}`} className="flex items-center gap-2 text-muted hover:text-blue-600 transition-colors">
                            <span className="w-6 h-6 rounded-full border border-muted hover:border-blue-600 flex items-center justify-center text-xs">4</span>
                            Experiments
                        </Link>
                    </div>
                </div>

                {/* HEADER */}
                <header className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{scenario.metadata.industry}</Badge>
                        <Badge variant="outline" className="text-xs">{scenario.metadata.objective}</Badge>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-app">Advisory</h1>
                        <p className="text-2xl text-muted mt-2 font-light">
                            Your Blueprint becomes action here.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href={`/blueprint/${blueprint.id}`}>
                            <Button variant="outline" size="sm">Back to Blueprint Report</Button>
                        </Link>
                        <Link href={`/experiments?scenario=${scenario.id}`}>
                            <Button variant="outline" size="sm" className="bg-blue-50 dark:bg-blue-900/10 text-blue-600 border-blue-200 hover:bg-blue-100">Go to Experiments</Button>
                        </Link>
                    </div>
                </header>

                <hr className="border-app" />

                {/* SECTION 2: RETRIEVAL REVIEW */}
                <section id="retrieval" className="scroll-mt-32 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen className="text-blue-600" size={24} /> Retrieval Review
                        </h2>
                        <p className="text-muted leading-relaxed max-w-2xl">
                            The Studio found familiar patterns in the Knowledge Base. Review these matches to understand the ‘physics’ of your situation before acting.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {blueprint.sources.retrieved_scenarios.length > 0 ? blueprint.sources.retrieved_scenarios.map((match, i) => (
                            <div key={i} className="p-4 rounded-xl border border-app bg-zinc-50 dark:bg-zinc-900/50">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-app">{match.title}</h3>
                                    <Badge variant="outline" className="bg-white dark:bg-zinc-800 text-[10px]">Similar</Badge>
                                </div>
                                <p className="text-sm text-muted mb-2">{match.match_reason}</p>
                            </div>
                        )) : (
                            <div className="col-span-2 p-6 rounded-xl border border-dashed border-app text-center text-muted italic">
                                No close scenario matches found. This is a novel situation for your KB.
                            </div>
                        )}
                    </div>
                </section>

                <hr className="border-app" />

                {/* SECTION 3: BLUEPRINT SUMMARY & VOICE */}
                <section id="blueprint" className="scroll-mt-32 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Zap className="text-amber-500" size={24} /> Blueprint Summary
                        </h2>
                        <p className="text-muted">
                            Control how QMM Studio delivers your blueprint—boardroom-ready, operator-clear, or creatively provocative.
                        </p>
                    </div>

                    {/* Vioce Toggle */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {voices.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => handleVoiceChange(v.id as VoiceType)}
                                className={`relative p-4 rounded-lg border-2 text-left transition-all hover:scale-[1.01] focus:outline-none ${voice === v.id ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black'}`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`${voice === v.id ? 'text-blue-600' : 'text-muted'}`}>{v.icon}</div>
                                    <span className={`font-bold ${voice === v.id ? 'text-blue-700 dark:text-blue-400' : 'text-app'}`}>{v.label}</span>
                                </div>
                                {voice === v.id && <div className="absolute top-4 right-4 text-blue-600"><Check size={16} /></div>}
                            </button>
                        ))}
                    </div>

                    {/* 7-Part Report (Refined for Advisory View) */}
                    <div className="space-y-12">

                        {/* 1. Diagnosis */}
                        <div className="bg-white dark:bg-zinc-900 border border-app rounded-xl p-8 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">01 Diagnosis</h3>
                            <h4 className="text-2xl font-bold text-app mb-3">{activeVoice.diagnosis}</h4>
                            <p className="text-lg text-app/80 leading-relaxed indent-0 border-l-4 border-blue-500 pl-4 py-1">
                                {activeVoice.angle}
                            </p>
                            <div className="mt-6 pt-6 border-t border-app grid md:grid-cols-2 gap-6 text-sm">
                                <div>
                                    <span className="block font-semibold mb-1">Primary Constraint</span>
                                    <span className="text-muted">{blueprint.diagnosis.primary_constraint}</span>
                                </div>
                                <div>
                                    <span className="block font-semibold mb-1">Behavioral Barrier</span>
                                    <span className="text-muted">{blueprint.diagnosis.behavioral_barrier}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quantum Principles */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">02 Quantum Principles</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {blueprint.qmm_mapping.core_principles.map((p, i) => (
                                    <div key={i} className="p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                        <div className="text-xs font-bold uppercase text-blue-600 mb-2">{p.principle}</div>
                                        <p className="text-sm font-medium mb-1">Why: {p.why_applies}</p>
                                        <p className="text-sm text-muted">Change: {p.what_it_changes}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3 Strategy (Implied in Voice Angle) + 4 Roadmap */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">03 Strategy & 04 Roadmap</h3>
                            <div className="bg-white dark:bg-zinc-900 border border-app rounded-xl overflow-hidden">
                                {blueprint.sequence_map.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 p-5 border-b border-app last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                        <div className="font-mono text-muted/50 text-xl font-bold">0{idx + 1}</div>
                                        <div className="grid md:grid-cols-3 gap-6 w-full">
                                            <div className="md:col-span-1">
                                                <h4 className="font-bold">{step.goal}</h4>
                                                <div className="text-xs text-muted mt-1 uppercase tracking-wider">{step.expected_time}</div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <div className="text-sm">
                                                    <span className="font-semibold text-app">Touchpoint:</span> <span className="text-muted">{step.channel}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="font-semibold text-app">Angle:</span> <span className="italic text-muted">"{step.message_angle}"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5 Options */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">05 Strategic Options</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <OptionCard title="Conservative" option={blueprint.strategic_options.conservative} />
                                <OptionCard title="Aggressive" option={blueprint.strategic_options.aggressive} />
                                <OptionCard title="Weird / Plausible" option={blueprint.strategic_options.weird} />
                            </div>
                        </div>

                        {/* 7 Governance */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">07 Trust & Governance</h3>
                            <div className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg text-sm text-amber-900 dark:text-amber-100">
                                <div className="font-bold mb-2 flex items-center gap-2"><ShieldAlert size={14} /> Risk & Compliance</div>
                                <ul className="space-y-1 list-disc pl-4 opacity-90">
                                    <li>{blueprint.trust_governance.compliance_flags.join(', ') || 'Standard compliance checks apply.'}</li>
                                    <li>{blueprint.trust_governance.privacy_consent_note}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-app" />

                {/* SECTION 4: RECOMMENDED EXPERIMENTS */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Beaker className="text-purple-600" size={24} /> Recommended Experiments
                        </h2>
                        <p className="text-muted">
                            Blueprints are just better hypotheses. Prove what works by launching these experiments.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...blueprint.experiments.sequence_tests, ...blueprint.experiments.asset_tests].slice(0, 6).map((exp, i) => (
                            <div key={i} className="flex flex-col p-6 rounded-xl border border-app bg-white dark:bg-zinc-900 shadow-sm hover:border-purple-500/50 transition-all group">
                                <Badge variant="secondary" className="w-fit mb-3">{exp.type}</Badge>
                                <h4 className="font-bold text-app leading-tight mb-2 group-hover:text-purple-600 transition-colors">{exp.title}</h4>
                                <p className="text-sm text-muted italic mb-4 flex-grow">"{exp.hypothesis}"</p>

                                <div className="mt-auto space-y-3 pt-4 border-t border-app">
                                    <div className="flex justify-between text-xs font-medium text-muted">
                                        <span>Cost: {exp.cost_to_learn}</span>
                                    </div>
                                    <Link href={`/experiments?scenario=${scenario.id}&action=create&title=${encodeURIComponent(exp.title)}`}>
                                        <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white border-none">
                                            Add to Experiments
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER */}
                <div className="pt-12 text-center">
                    <Link href={`/experiments?scenario=${scenario.id}`}>
                        <Button size="lg" className="px-12 h-14 text-lg shadow-lg shadow-blue-900/20">
                            Proceed to Experiments <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>

            </div>
        </PageShell>
    );
}

function OptionCard({ title, option }: { title: string, option: any }) {
    if (!option) return null;
    return (
        <div className="p-4 rounded-lg border border-app bg-zinc-50 dark:bg-zinc-900/50">
            <h4 className="font-bold text-sm uppercase tracking-wide mb-2">{title}</h4>
            <div className="text-xs font-semibold text-blue-600 mb-2">{option.big_bet}</div>
            <ul className="text-xs text-muted space-y-1 list-disc pl-4">
                {option.first_3_tests.map((t: string, i: number) => (
                    <li key={i}>{t}</li>
                ))}
            </ul>
        </div>
    )
}
