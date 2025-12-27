'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { Briefcase, Zap, Feather, Check } from 'lucide-react';

// Storage Key
const VOICE_KEY = 'qmm.voice';

type VoiceType = 'boardroom' | 'operator' | 'creative';

export default function AdvisoryPage() {
    const [voice, setVoice] = useState<VoiceType>('boardroom');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load preference
        const saved = localStorage.getItem(VOICE_KEY) as VoiceType;
        if (saved && ['boardroom', 'operator', 'creative'].includes(saved)) {
            setVoice(saved);
        }
        setMounted(true);
    }, []);

    const handleVoiceChange = (v: VoiceType) => {
        setVoice(v);
        localStorage.setItem(VOICE_KEY, v);
    };

    if (!mounted) return null; // Prevent hydration mismatch

    const voices = [
        {
            id: 'boardroom',
            icon: <Briefcase size={18} />,
            label: 'Boardroom',
            desc: 'Strategy-first. Crisp, decisive, executive-ready.'
        },
        {
            id: 'operator',
            icon: <Zap size={18} />,
            label: 'Operator',
            desc: 'Action-first. Steps, checklists, timelines, KPIs.'
        },
        {
            id: 'creative',
            icon: <Feather size={18} />,
            label: 'Creative',
            desc: 'Idea-first. Angles, hooks, narrative frames, campaign concepts.'
        }
    ];

    const changes = {
        boardroom: "tight diagnosis, fewer words, stronger prioritization, sharper trade-offs.",
        operator: "explicit tasks, owners, cadence, measurement, risks and contingencies.",
        creative: "more options, bolder positioning, campaign territories, copy starters."
    };

    const useCases = {
        boardroom: "Leadership updates, approvals, investor/board slides.",
        operator: "Growth sprints, campaign execution, performance teams.",
        creative: "brand campaigns, influencer strategy, narrative resets, launches."
    };

    return (
        <PageShell>
            <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

                {/* Header */}
                <div className="space-y-4">
                    <BackButton />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-app">Advisory</h1>
                        <p className="text-xl text-muted mt-2 leading-relaxed">
                            Control how QMM Studio delivers your blueprint—boardroom-ready, operator-clear, or creatively provocative.
                        </p>
                    </div>
                </div>

                {/* Voice Control */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-app">Delivery Voice</h2>
                        <p className="text-sm text-muted">
                            Choose one voice. This setting changes how every blueprint is written (structure stays the same; tone and emphasis change).
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {voices.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => handleVoiceChange(v.id as VoiceType)}
                                className={`relative p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${voice === v.id ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-zinc-300 dark:hover:border-zinc-700'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${voice === v.id ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-muted'}`}>
                                    {v.icon}
                                </div>
                                <h3 className={`font-bold text-lg mb-2 ${voice === v.id ? 'text-blue-700 dark:text-blue-400' : 'text-app'}`}>
                                    {v.label}
                                </h3>
                                <p className="text-xs text-muted leading-relaxed">
                                    {v.desc}
                                </p>
                                {voice === v.id && (
                                    <div className="absolute top-4 right-4 text-blue-600">
                                        <Check size={20} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-app">

                    {/* What changes */}
                    <section className="space-y-6">
                        <h3 className="font-bold text-app">What changes when you switch voice</h3>

                        <div className="space-y-4">
                            <div className={`p-4 rounded-lg border transition-colors ${voice === 'boardroom' ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20' : 'border-transparent'}`}>
                                <div className="text-sm font-semibold mb-1">Boardroom</div>
                                <div className="text-sm text-muted">{changes.boardroom}</div>
                            </div>
                            <div className={`p-4 rounded-lg border transition-colors ${voice === 'operator' ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20' : 'border-transparent'}`}>
                                <div className="text-sm font-semibold mb-1">Operator</div>
                                <div className="text-sm text-muted">{changes.operator}</div>
                            </div>
                            <div className={`p-4 rounded-lg border transition-colors ${voice === 'creative' ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20' : 'border-transparent'}`}>
                                <div className="text-sm font-semibold mb-1">Creative</div>
                                <div className="text-sm text-muted">{changes.creative}</div>
                            </div>
                        </div>
                    </section>

                    {/* Right Col: How it works + Use Cases */}
                    <div className="space-y-12">
                        <section>
                            <h3 className="font-bold text-app mb-4">How this affects your blueprints</h3>
                            <ul className="list-disc pl-5 text-sm text-muted space-y-2 leading-relaxed">
                                <li>Your selected voice is applied to: Diagnosis, Strategy, Roadmap, Experiments, Guardrails, and Creative angles.</li>
                                <li>Your voice preference is saved in this browser (Guest Mode).</li>
                                <li>You can change it anytime; future blueprints will follow your new preference.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-app mb-4">When to use each voice</h3>
                            <ul className="space-y-4">
                                <li className="text-sm">
                                    <span className="font-semibold block text-app mb-1">Boardroom</span>
                                    <span className="text-muted">{useCases.boardroom}</span>
                                </li>
                                <li className="text-sm">
                                    <span className="font-semibold block text-app mb-1">Operator</span>
                                    <span className="text-muted">{useCases.operator}</span>
                                </li>
                                <li className="text-sm">
                                    <span className="font-semibold block text-app mb-1">Creative</span>
                                    <span className="text-muted">{useCases.creative}</span>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>

                <div className="pt-8 flex justify-end">
                    <Link href="/">
                        <Button size="lg" className="px-8">
                            Back to Studio
                        </Button>
                    </Link>
                </div>

            </div>
        </PageShell>
    );
}
