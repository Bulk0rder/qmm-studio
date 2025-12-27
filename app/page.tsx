'use client';

import React, { useEffect, useState } from 'react';
import { UI_COPY } from '@/lib/ui-copy';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, BookOpen, Layers, Lightbulb, Zap, Activity, AlertTriangle, CheckCircle2, Database } from 'lucide-react';
import Link from 'next/link';
import { OrbitNodes } from '@/components/illustrations/OrbitNodes';
import { seedSampleData, getAllScenarios } from '@/lib/scenario-service';

export default function Home() {
    const { HERO, RECENT_BLUEPRINTS, KNOWN_WINNERS, COVERAGE_GAPS, SYSTEM_STATUS, QUICK_ACTIONS } = UI_COPY.HOME;
    const [stats, setStats] = useState({ scenarios: 0, blueprints: 0 });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const sc = getAllScenarios();
            // Estimate blueprints count (approx 1 per scenario for now)
            const bpCount = localStorage.getItem('qmm-blueprints') ? JSON.parse(localStorage.getItem('qmm-blueprints') || '[]').length : 0;
            setStats({ scenarios: sc.length, blueprints: bpCount });
        }
    }, []);

    const handleSeed = async () => {
        if (confirm("This will overwrite your current guest data with 30 sample scenarios. Continue?")) {
            await seedSampleData();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-12 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* HERO */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-app leading-[1.1]">{HERO.TITLE}</h1>
                        <p className="text-lg md:text-xl text-muted font-normal leading-relaxed max-w-lg">{HERO.SUBTITLE}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link href="/new">
                            <Button size="lg" className="h-12 px-8 text-base shadow-sm hover:shadow-md transition-all">
                                {HERO.PRIMARY_CTA} <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </Link>
                        <Link href="/kb">
                            <Button variant="outline" size="lg" className="h-12 px-6 text-base border-app text-muted hover:text-app">
                                {HERO.SECONDARY_CTA}
                            </Button>
                        </Link>
                    </div>

                </div>

                {/* Subtle Illustration Panel */}
                <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] flex items-center justify-center">
                    <OrbitNodes className="w-full h-full text-slate-400 dark:text-slate-600 opacity-50" />
                </div>
            </section>

            {/* BENTO GRID */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

                {/* Row 1: Recent Blueprints (7 cols) */}
                <div className="md:col-span-12 lg:col-span-7">
                    <Card className="h-full border-app bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-app/40">
                            <CardTitle className="flex items-center gap-2">
                                <Layers size={18} className="text-muted" />
                                {RECENT_BLUEPRINTS.HEADER}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-muted">
                                        <Layers size={14} />
                                    </div>
                                    <h4 className="font-medium text-app">{stats.blueprints > 0 ? "Latest Strategy" : RECENT_BLUEPRINTS.EMPTY_TITLE}</h4>
                                </div>
                                <p className="text-sm text-muted max-w-md ml-11">
                                    {stats.blueprints > 0
                                        ? "Your latest blueprint is ready for review in the Advisory."
                                        : RECENT_BLUEPRINTS.EMPTY_BODY}
                                </p>
                                <div className="ml-11 mt-1">
                                    <Link href={stats.blueprints > 0 ? "/advisory" : "/new"}>
                                        <Button variant="secondary" size="sm" className="text-xs h-8">
                                            {stats.blueprints > 0 ? "Open Advisory" : RECENT_BLUEPRINTS.EMPTY_CTA}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Row 1: Quick Actions (5 cols) */}
                <div className="md:col-span-12 lg:col-span-5">
                    <Card className="h-full border-app bg-zinc-50/50 dark:bg-zinc-900/50 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-app/40">
                            <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Zap size={18} />
                                {QUICK_ACTIONS.HEADER}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <p className="text-xs font-medium text-muted uppercase tracking-wider">{QUICK_ACTIONS.HELPER}</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/experiments">
                                    <Button variant="outline" className="w-full justify-start h-10 bg-white dark:bg-zinc-800 border-app hover:bg-zinc-50 shadow-sm">
                                        <Activity size={14} className="mr-2 text-purple-500" />
                                        {QUICK_ACTIONS.LOG_RESULT}
                                    </Button>
                                </Link>
                                <Link href="/kb">
                                    <Button variant="outline" className="w-full justify-start h-10 bg-white dark:bg-zinc-800 border-app hover:bg-zinc-50 shadow-sm">
                                        <BookOpen size={14} className="mr-2 text-emerald-500" />
                                        {QUICK_ACTIONS.ADD_KB}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Row 2: Known Winners (4 cols) */}
                <div className="md:col-span-12 lg:col-span-4">
                    <Card className="h-full border-app shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3 pt-5 px-5">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Lightbulb size={16} className="text-yellow-500" />
                                {KNOWN_WINNERS.HEADER}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <p className="text-xs text-muted mb-4 leading-relaxed">{KNOWN_WINNERS.SUBTEXT}</p>
                            {stats.scenarios > 0 ? (
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-app">{stats.scenarios}</div>
                                    <div className="text-xs text-muted">Patterns Indexed</div>
                                </div>
                            ) : (
                                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 p-3">
                                    <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">{KNOWN_WINNERS.EMPTY_BODY}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Row 2: Coverage Gaps (4 cols) */}
                <div className="md:col-span-12 lg:col-span-4">
                    <Card className="h-full border-app shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3 pt-5 px-5">
                            <CardTitle className="text-base flex items-center gap-2">
                                <AlertTriangle size={16} className="text-orange-500" />
                                {COVERAGE_GAPS.HEADER}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <p className="text-xs text-muted mb-4 leading-relaxed">{COVERAGE_GAPS.SUBTEXT}</p>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">{COVERAGE_GAPS.EMPTY_TITLE}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Row 2: System Status (4 cols) */}
                <div className="md:col-span-12 lg:col-span-4">
                    <Card className="h-full border-app bg-zinc-900 text-white dark:bg-zinc-800 shadow-sm">
                        <CardHeader className="pb-3 pt-5 px-5">
                            <CardTitle className="text-base flex items-center gap-2 text-white">
                                <Activity size={16} className="text-blue-400" />
                                {SYSTEM_STATUS.HEADER}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <div className="space-y-1.5 text-xs text-zinc-400">
                                <div className="flex justify-between">
                                    <span>Scenarios</span> <span className="text-white font-mono">{stats.scenarios}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Blueprints</span> <span className="text-white font-mono">{stats.blueprints}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>KB Docs</span> <span className="text-white font-mono">5</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-xs font-medium text-emerald-400">{SYSTEM_STATUS.STATUS_PILLS.HEALTHY}</span>
                                </div>

                                <button
                                    onClick={handleSeed}
                                    title="Seed Sample Data"
                                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded border border-zinc-700 flex items-center gap-1 transition-colors"
                                >
                                    <Database size={10} /> Seed
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </section>
        </div>
    );
}
