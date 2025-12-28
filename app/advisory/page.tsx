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

    const getVoiceContent = (v: VoiceType) => {
        const base = blueprint.consultant_voice[v === 'operator' ? 'growth' : v === 'boardroom' ? 'c_suite' : 'creative'];

        // Voice-specific flavors for other sections
        const flavors = {
            boardroom: {
                title: UI_COPY.BLUEPRINT.VOICES.BOARDROOM,
                diagnosis: base.diagnosis_headline,
                angle: base.strategic_angle,
                principles_header: "Core Leverage Points",
                roadmap_header: "Execution Critical Path",
                options_header: "Strategic Trade-offs",
                risk_header: "Governance & Liability",
                kpi_label: "Primary ROI Metric"
            },
            operator: {
                title: UI_COPY.BLUEPRINT.VOICES.OPERATOR,
                diagnosis: base.diagnosis_headline,
                angle: base.strategic_angle,
                principles_header: "Operating Mechanics",
                roadmap_header: "Implementation Sequence",
                options_header: "Tactical Approaches",
                risk_header: "Compliance Guardrails",
                kpi_label: "North Star Metric"
            },
            creative: {
                title: UI_COPY.BLUEPRINT.VOICES.CREATIVE,
                diagnosis: base.diagnosis_headline,
                angle: base.strategic_angle,
                principles_header: "Narrative Laws",
                roadmap_header: "Story Arc",
                options_header: "Creative Angles",
                risk_header: "Brand Safety",
                kpi_label: "Engagement Signal"
            }
        };

        return flavors[v];
    };

    const activeVoice = getVoiceContent(voice);

    return (
        <PageShell>
            <div className="max-w-4xl mx-auto space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">

                {/* CONFIDENCE STRIP */}
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-lg p-3 flex flex-wrap justify-between items-center text-xs text-blue-800 dark:text-blue-300">
                    <div className="font-medium">
                        {UI_COPY.BLUEPRINT.TOP_STRIP.STATS(
                            blueprint.sources.retrieved_scenarios.length,
                            5, // Mock KB refs count for now
                            blueprint.diagnosis.assumptions.length,
                            "High (87%)"
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button className="hover:underline">{UI_COPY.BLUEPRINT.TOP_STRIP.LINK}</button>
                    </div>
                </div>

                {/* STEP NAVIGATOR */}
                <div className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-app py-4 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex justify-between items-center max-w-3xl mx-auto text-sm font-medium">
                        <Link href="/new" className="flex items-center gap-2 text-muted hover:text-primary transition-colors">
                            <span className="w-6 h-6 rounded-full border border-muted hover:border-primary flex items-center justify-center text-xs">1</span>
                            {UI_COPY.NEW_SCENARIO.STEPS.ARENA}
                        </Link>
                        <div className="h-px w-8 bg-border" />

                        <button onClick={() => scrollToSection('retrieval')} className={`flex items-center gap-2 transition-colors ${activeSection === 'retrieval' ? 'text-primary' : 'text-muted hover:text-foreground'}`}>
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${activeSection === 'retrieval' ? 'border-primary bg-secondary' : 'border-muted'}`}>2</span>
                            Retrieval
                        </button>
                        <div className="h-px w-8 bg-border" />

                        <button onClick={() => scrollToSection('blueprint')} className={`flex items-center gap-2 transition-colors ${activeSection === 'blueprint' ? 'text-primary' : 'text-muted hover:text-foreground'}`}>
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${activeSection === 'blueprint' ? 'border-primary bg-secondary' : 'border-muted'}`}>3</span>
                            Blueprint
                        </button>
                        <div className="h-px w-8 bg-border" />

                        <Link href={`/experiments?scenario=${scenario.id}`} className="flex items-center gap-2 text-muted hover:text-primary transition-colors">
                            <span className="w-6 h-6 rounded-full border border-muted hover:border-primary flex items-center justify-center text-xs">4</span>
                            Experiment
                        </Link>
                    </div>
                </div>

                {/* HEADER */}
                <header className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">{scenario.metadata.industry}</Badge>
                        <Badge variant="outline" className="text-xs font-mono">{scenario.metadata.objective}</Badge>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">Advisory Board</h1>
                        <p className="text-xl text-muted-foreground mt-2 font-light">
                            Strategy generated from {blueprint.sources.retrieved_scenarios.length} similar scenarios.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href={`/blueprint/${blueprint.id}`}>
                            <Button variant="outline" size="sm">View Raw Data</Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => window.print()}>
                            {UI_COPY.BLUEPRINT.TOP_STRIP.BUTTONS.EXPORT}
                        </Button>
                    </div>
                </header>

                <hr className="border-border" />

                {/* SECTION 2: RETRIEVAL REVIEW */}
                <section id="retrieval" className="scroll-mt-32 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen className="text-primary" size={20} /> Retrieval Review
                        </h2>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                            The Librarian matched these historical patterns to your situation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {blueprint.sources.retrieved_scenarios.length > 0 ? blueprint.sources.retrieved_scenarios.map((match, i) => (
                            <div key={i} className="p-5 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-foreground group-hover:underline decoration-1 underline-offset-4">{match.title}</h3>
                                    <Badge variant="secondary" className="text-[10px]">Similar</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{match.match_reason}</p>
                            </div>
                        )) : (
                            <div className="col-span-2 p-6 rounded-xl border border-dashed border-border text-center text-muted-foreground italic">
                                No close scenario matches found. This is a novel situation for your KB.
                            </div>
                        )}
                    </div>
                </section>

                <hr className="border-border" />

                {/* SECTION 3: BLUEPRINT SUMMARY & VOICE */}
                <section id="blueprint" className="scroll-mt-32 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Zap className="text-primary" size={20} /> Blueprint
                        </h2>
                        <p className="text-muted-foreground">
                            Toggle the delivery voice. The content rewrites to match the stakeholder.
                        </p>
                    </div>

                    {/* Voice Toggle */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {voices.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => handleVoiceChange(v.id as VoiceType)}
                                className={`relative p-4 rounded-lg border text-left transition-all hover:scale-[1.01] focus:outline-none ${voice === v.id ? 'border-foreground bg-secondary ring-1 ring-foreground' : 'border-border bg-card'}`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`${voice === v.id ? 'text-foreground' : 'text-muted-foreground'}`}>{v.icon}</div>
                                    <span className={`font-bold ${voice === v.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {v.id === 'boardroom' ? UI_COPY.BLUEPRINT.VOICES.BOARDROOM :
                                            v.id === 'operator' ? UI_COPY.BLUEPRINT.VOICES.OPERATOR :
                                                UI_COPY.BLUEPRINT.VOICES.CREATIVE}
                                    </span>
                                </div>
                                {voice === v.id && <div className="absolute top-4 right-4 text-foreground"><Check size={16} /></div>}
                            </button>
                        ))}
                    </div>

                    {/* 7-Part Report */}
                    <div className="space-y-12">

                        {/* 1. Diagnosis */}
                        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{UI_COPY.BLUEPRINT.SECTIONS.A.TITLE}</h3>
                            <h4 className="text-2xl font-bold text-foreground mb-4 leading-tight">{activeVoice.diagnosis}</h4>
                            <p className="text-lg text-foreground/80 leading-relaxed indent-0 border-l-2 border-primary pl-6 py-1">
                                {activeVoice.angle}
                            </p>
                            <div className="mt-8 pt-8 border-t border-border grid md:grid-cols-2 gap-8 text-sm">
                                <div>
                                    <span className="block font-semibold mb-1 text-foreground">Primary Constraint</span>
                                    <span className="text-muted-foreground">{blueprint.diagnosis.primary_constraint} <span className="text-xs block opacity-70 mt-1">{UI_COPY.BLUEPRINT.SECTIONS.A.HELPERS.CONSTRAINT}</span></span>
                                </div>
                                <div>
                                    <span className="block font-semibold mb-1 text-foreground">Behavioral Barrier</span>
                                    <span className="text-muted-foreground">{blueprint.diagnosis.behavioral_barrier} <span className="text-xs block opacity-70 mt-1">{UI_COPY.BLUEPRINT.SECTIONS.A.HELPERS.BARRIER}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quantum Principles */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-foreground">{activeVoice.principles_header}</h3>
                            <p className="text-muted-foreground text-sm">{UI_COPY.BLUEPRINT.SECTIONS.B.SUBHEADER}</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                {blueprint.qmm_mapping.core_principles.map((p, i) => (
                                    <div key={i} className="p-5 bg-secondary/30 rounded-lg border border-border">
                                        <div className="text-xs font-bold uppercase text-primary mb-2">{p.principle}</div>
                                        <p className="text-sm font-medium mb-1 text-foreground">Why: {p.why_applies}</p>
                                        <p className="text-sm text-muted-foreground">Change: {p.what_it_changes}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3 Strategy & 4 Roadmap */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-foreground">{activeVoice.roadmap_header}</h3>
                            <p className="text-muted-foreground text-sm">{UI_COPY.BLUEPRINT.SECTIONS.D.SUBHEADER}</p>
                            <div className="bg-card border border-border rounded-xl overflow-hidden">
                                {blueprint.sequence_map.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 p-5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                                        <div className="font-mono text-muted-foreground/30 text-xl font-bold">0{idx + 1}</div>
                                        <div className="grid md:grid-cols-3 gap-6 w-full">
                                            <div className="md:col-span-1">
                                                <h4 className="font-bold text-foreground">{step.goal}</h4>
                                                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{step.expected_time}</div>
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <div className="text-sm text-foreground">
                                                    <span className="font-semibold">Touchpoint:</span> <span className="text-muted-foreground">{step.channel}</span>
                                                </div>
                                                <div className="text-sm text-foreground">
                                                    <span className="font-semibold">Angle:</span> <span className="italic text-muted-foreground">"{step.message_angle}"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5 Options */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-foreground">{activeVoice.options_header}</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <OptionCard title={UI_COPY.BLUEPRINT.SECTIONS.C.OPTIONS.CONSERVATIVE} option={blueprint.strategic_options.conservative} />
                                <OptionCard title={UI_COPY.BLUEPRINT.SECTIONS.C.OPTIONS.AGGRESSIVE} option={blueprint.strategic_options.aggressive} />
                                <OptionCard title={UI_COPY.BLUEPRINT.SECTIONS.C.OPTIONS.WEIRD} option={blueprint.strategic_options.weird} />
                            </div>
                        </div>

                        {/* 7 Governance */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-foreground">{activeVoice.risk_header}</h3>
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

                <hr className="border-border" />

                {/* SECTION 4: RECOMMENDED EXPERIMENTS */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Beaker className="text-primary" size={20} /> {UI_COPY.BLUEPRINT.SECTIONS.E.TITLE}
                        </h2>
                        <p className="text-muted-foreground">
                            {UI_COPY.BLUEPRINT.SECTIONS.E.SUBHEADER}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...blueprint.experiments.sequence_tests, ...blueprint.experiments.asset_tests].slice(0, 6).map((exp, i) => (
                            <div key={i} className="flex flex-col p-6 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all group">
                                <Badge variant="secondary" className="w-fit mb-3">{exp.type}</Badge>
                                <h4 className="font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">{exp.title}</h4>
                                <p className="text-sm text-muted-foreground italic mb-4 flex-grow">"{exp.hypothesis}"</p>

                                <div className="mt-auto space-y-3 pt-4 border-t border-border">
                                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                        <span>Cost: {exp.cost_to_learn}</span>
                                    </div>
                                    <Link href={`/experiments?scenario=${scenario.id}&action=create&title=${encodeURIComponent(exp.title)}`}>
                                        <Button size="sm" className="w-full">
                                            {UI_COPY.EXPERIMENTS.BUTTONS.CREATE}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER */}
                <div className="pt-12 text-center pb-20">
                    <Link href={`/experiments?scenario=${scenario.id}`}>
                        <Button size="lg" className="px-12 h-14 text-lg shadow-lg">
                            {UI_COPY.BLUEPRINT.FOOTER.CTA_DEPLOY} <ArrowRight className="ml-2" />
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
