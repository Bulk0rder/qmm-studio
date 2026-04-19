'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, FlaskConical, Gauge, Map, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { storage, STORAGE_KEYS, trackEvent } from '@/lib/storage-client';
import { getAllScenarios } from '@/lib/scenario-service';
import { HeroField } from '@/components/HeroField';

const laws = [
    { id: '01', title: 'Double Jeopardy', principle: 'Smaller brands have fewer buyers and lower loyalty; growth starts with reach.' },
    { id: '02', title: '60/40 Rule', principle: 'Long-term brand building and short-term activation compound when sequenced correctly.' },
    { id: '03', title: 'Trust Equation', principle: 'Credibility, reliability, and intimacy must exceed perceived risk in high-trust markets.' },
    { id: '04', title: 'Friction Physics', principle: 'Every extra step adds energy cost; remove or explain friction before conversion.' },
    { id: '05', title: 'Embrace Non-Commutativity', principle: 'Order changes outcomes; the same messages perform differently in different sequences.' },
    { id: '13', title: 'Harness Social Influence', principle: 'Group dynamics and social proof shape behaviour at scale.' },
    { id: '16', title: 'Continuous Testing', principle: 'Strategy becomes compounding evidence only when experiments are logged.' },
];

export default function Home() {
    const [stats, setStats] = useState({
        scenarios: 0,
        blueprints: 0,
        experiments: 0,
        winners: 0,
    });
    const [activeBlueprint, setActiveBlueprint] = useState<any>(null);
    const [runningExperiments, setRunningExperiments] = useState<any[]>([]);

    useEffect(() => {
        const scenarios = getAllScenarios();
        const blueprints = storage.get<any[]>(STORAGE_KEYS.BLUEPRINTS) || [];
        const experiments = storage.get<any[]>(STORAGE_KEYS.EXPERIMENTS) || [];
        const winners = storage.get<any[]>(STORAGE_KEYS.KNOWN_WINNERS) || [];
        const active = storage.get<any>(STORAGE_KEYS.ACTIVE_BLUEPRINT) || blueprints[blueprints.length - 1] || null;

        setStats({
            scenarios: scenarios.length,
            blueprints: blueprints.length,
            experiments: experiments.length,
            winners: winners.length,
        });
        setActiveBlueprint(active);
        setRunningExperiments(experiments.filter((exp) => exp.status === 'running').slice(0, 3));
        trackEvent('app_opened', {
            userState: scenarios.length > 0 ? 'returning' : 'new',
            hasScenarios: scenarios.length > 0,
            hasBlueprintActive: Boolean(active),
        });
    }, []);

    const lawOfDay = useMemo(() => {
        const start = new Date(new Date().getFullYear(), 0, 0);
        const day = Math.floor((Number(new Date()) - Number(start)) / 86400000);
        return laws[day % laws.length];
    }, []);

    const hasMemory = stats.scenarios > 0 || stats.blueprints > 0;

    if (!hasMemory) {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-12 duration-700">
                <section className="grid min-h-[88vh] items-center gap-8 lg:grid-cols-[55fr_45fr]">
                    <div className="space-y-7 lg:pr-12">
                        <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[54px]">
                            The funnel is a 1959 diagram.<br />Your market is not.
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-[#A7A7BF]">
                            Modern buyers are in superposition — curious, sceptical, consulting their network, and nowhere near your funnel stage labels. QMM Studio applies 25 validated market physics laws to diagnose your exact situation and tell you which experiments to run this week.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link href="/diagnose">
                                <Button size="lg" className="h-14 w-full bg-[#5D4FD4] px-8 text-base font-bold text-white hover:bg-[#6C5CFF] sm:w-auto" onClick={() => trackEvent('homepage_cta_clicked', { cta: 'diagnose' })}>
                                    Run a Diagnosis <ArrowRight className="ml-2" size={18} />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg" className="h-14 w-full border-[#333355] px-8 text-base text-[#B8B8CF] hover:bg-white/5 sm:w-auto">
                                    Read the Manifesto
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center justify-end">
                        <HeroField className="hero-svg w-full max-w-[560px] mt-[-32px]" />
                    </div>
                </section>

                <CommandGrid lawOfDay={lawOfDay} />
            </div>
        );
    }

    const score = Math.min(10, Math.max(3, Math.ceil((stats.blueprints + stats.experiments + stats.winners * 2) / 3)));
    storage.set(STORAGE_KEYS.STRATEGY_SCORE, score);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-700">
            <section className="space-y-3 pt-4">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#9F94FF]">Command Centre</p>
                <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Good morning.</h1>
                <p className="max-w-2xl text-lg text-[#A7A7BF]">Your market does not pause. Neither should your strategy.</p>
            </section>

            <section className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <div className="mb-5 flex items-start justify-between gap-5">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#9F94FF]">Active Blueprint</p>
                            <h2 className="mt-2 text-2xl font-bold text-white">{activeBlueprint?.input?.industry || 'QMM Strategy'} · {activeBlueprint?.input?.market || 'Trust Market'}</h2>
                        </div>
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">Synced cache</span>
                    </div>
                    <div>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-black text-white">{activeBlueprint?.confidence?.score || 84}%</span>
                            <span className="pb-2 text-sm font-bold text-[#A7A7BF]">Pattern Certainty</span>
                        </div>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-[#5D4FD4]" style={{ width: `${activeBlueprint?.confidence?.score || 84}%` }} />
                        </div>
                        <p className="mt-3 text-sm text-[#A7A7BF]">Based on {Math.max(3, stats.scenarios)} similar market configurations in Strategy Memory.</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/blueprint">
                            <Button className="bg-[#5D4FD4] text-white hover:bg-[#6C5CFF]">View Blueprint</Button>
                        </Link>
                        <Link href="/lab">
                            <Button variant="outline" className="border-white/15 text-white hover:bg-white/10">Log a result</Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <div className="flex items-center gap-3">
                        <Gauge className="text-[#9F94FF]" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#9F94FF]">Strategy Score</p>
                            <p className="font-mono text-lg text-white">{'●'.repeat(score)}{'○'.repeat(10 - score)}</p>
                        </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-[#A7A7BF]">
                        Next action: add a result in The Lab to promote a Known Winner and strengthen future Blueprints.
                    </p>
                </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-white"><FlaskConical size={18} /> The Lab — this week</h2>
                        <Link href="/lab" className="text-sm font-bold text-[#9F94FF]">Open The Lab</Link>
                    </div>
                    <div className="space-y-3">
                        {(runningExperiments.length ? runningExperiments : [
                            { title: 'Social proof sequence test', status: 'running', ice_total: 8.2 },
                            { title: 'Trust badge placement', status: 'planned', ice_total: 7.6 },
                            { title: 'Referral offer copy', status: 'planned', ice_total: 7.4 },
                        ]).map((experiment, index) => (
                            <div key={`${experiment.title}-${index}`} className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 p-3">
                                <span className="text-sm font-semibold text-white">{experiment.title}</span>
                                <span className="text-xs font-bold text-emerald-300">ICE {Number(experiment.ice_total || 7.2).toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-white"><Trophy size={18} className="text-yellow-300" /> Known Winners</h2>
                    <p className="text-3xl font-black text-white">{stats.winners}</p>
                    <p className="mt-2 text-sm text-[#A7A7BF]">Promoted experiment results that future Blueprints can cite.</p>
                    <Link href="/memory" className="mt-4 inline-flex text-sm font-bold text-[#9F94FF]">View Memory</Link>
                </div>
            </section>

            <CommandGrid lawOfDay={lawOfDay} active />
        </div>
    );
}

function CommandGrid({ lawOfDay, active = false }: { lawOfDay: typeof laws[number]; active?: boolean }) {
    return (
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
            <Link href={`/physics/qmm-law-${lawOfDay.id}`} className="rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-6 transition hover:border-[#9F94FF]/70">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#CFC9FF]"><Sparkles size={15} /> Law of the Day</p>
                <h2 className="text-2xl font-bold text-white">Law {lawOfDay.id}: {lawOfDay.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#CFCFE6]">{lawOfDay.principle}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-white">{active ? 'See how it applies' : 'Read the full law'} <ArrowRight className="ml-2" size={14} /></span>
            </Link>

            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-white">Physics in action</h2>
                    <Link href="/physics" className="text-sm font-bold text-[#9F94FF]">See all laws</Link>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                    {laws.slice(0, 3).map((law) => (
                        <Link key={law.id} href={`/physics/qmm-law-${law.id}`} className="rounded-md border border-white/10 bg-black/20 p-4 transition hover:border-[#5D4FD4]/70">
                            <BookOpen size={16} className="mb-3 text-[#9F94FF]" />
                            <h3 className="font-bold text-white">{law.title}</h3>
                            <p className="mt-2 text-xs leading-relaxed text-[#A7A7BF]">{law.principle}</p>
                        </Link>
                    ))}
                </div>
                {!active && (
                    <ol className="mt-6 grid gap-3 text-sm text-[#CFCFE6] md:grid-cols-4">
                        {['Diagnose your market', 'Get a physics-backed Blueprint', 'Run experiments', 'Build institutional memory'].map((step, index) => (
                            <li key={step} className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-emerald-300" /> {index + 1}. {step}
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </section>
    );
}

function SampleBlueprintTeaser() {
    return (
        <Link href="/blueprint" className="block rounded-lg border border-[#5D4FD4]/30 bg-[#11111D] p-5 shadow-2xl transition hover:border-[#9F94FF]/70">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Map size={17} className="text-[#9F94FF]" /> Sample Blueprint
                </div>
                <Badge variant="warning">SAMPLE</Badge>
            </div>
            <h2 className="text-xl font-black leading-tight text-white">Nigerian Fintech Trust Recovery</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B8B8CF]">
                We understood this as: trial-to-paid is stuck at 8%, users abandon bank-linking, and generic trust prompts have not worked.
            </p>
            <div className="mt-5 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3">
                <p className="text-xs font-bold text-emerald-200">START THIS WEEK</p>
                <p className="mt-1 text-sm font-bold text-white">Proof-before-permission sequence</p>
                <p className="mt-1 text-xs text-[#CFCFE6]">ICE 8.3 - Law 13: Social Influence</p>
            </div>
            <span className="mt-5 inline-flex items-center text-sm font-bold text-[#CFC9FF]">
                Open the full output <ArrowRight className="ml-2" size={14} />
            </span>
        </Link>
    );
}
