'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    BookOpen,
    Database,
    FlaskConical,
    Gauge,
    Home,
    Map,
    PlusCircle,
    ShieldCheck,
    Sparkles,
    Zap,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { storage, STORAGE_KEYS, trackEvent, writeThroughCache } from '@/lib/storage-client';

interface NavbarProps {
    session?: {
        displayName: string;
        role: string;
    } | null;
}

const navItems = [
    { href: '/', label: 'Command', icon: Home, match: ['/'] },
    { href: '/diagnose', label: 'Diagnose', icon: PlusCircle, match: ['/diagnose', '/new'] },
    { href: '/blueprint', label: 'Blueprint', icon: Map, match: ['/blueprint', '/advisory'] },
    { href: '/lab', label: 'The Lab', icon: FlaskConical, match: ['/lab', '/experiments'] },
    { href: '/memory', label: 'Memory', icon: Database, match: ['/memory', '/library'] },
    { href: '/physics', label: 'Physics', icon: BookOpen, match: ['/physics', '/kb'] },
];

export function Navbar({ session }: NavbarProps) {
    const pathname = usePathname();
    const [pulseOpen, setPulseOpen] = useState(false);
    const [scoreOpen, setScoreOpen] = useState(false);
    const [syncStatus, setSyncStatus] = useState('synced');
    const [score, setScore] = useState(3);
    const userSession = session || { displayName: 'Guest', role: 'guest' };

    useEffect(() => {
        setSyncStatus(storage.get<string>(STORAGE_KEYS.SYNC_STATUS) || 'synced');
        setScore(storage.get<number>(STORAGE_KEYS.STRATEGY_SCORE) || 3);
    }, [pathname]);

    const isActive = (item: typeof navItems[number]) => {
        if (item.href === '/') return pathname === '/';
        return item.match.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    };

    return (
        <>
            <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-60 xl:w-60 lg:w-16 flex-col border-r border-[#2A2A3E] bg-[#1C1C2E] text-white">
                <div className="flex h-20 items-center gap-3 px-5 lg:px-4 xl:px-5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#5D4FD4]/60 bg-[#5D4FD4]/15">
                        <Sparkles size={18} className="text-[#9F94FF]" />
                    </div>
                    <div className="lg:hidden xl:block">
                        <Link href="/" className="text-lg font-bold leading-none">QMM</Link>
                        <p className="mt-1 text-xs text-[#9090AA]">The Scenario Librarian</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex h-11 items-center gap-3 rounded-r-lg border-l-[3px] px-3 text-sm font-semibold transition-all duration-150 ${active
                                    ? 'border-l-[#5D4FD4] bg-[#5D4FD4]/15 text-white'
                                    : 'border-l-transparent text-[#B8B8CF] hover:bg-white/[0.04] hover:text-white'
                                    }`}
                                title={item.label}
                            >
                                <Icon size={18} />
                                <span className="lg:hidden xl:inline">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="space-y-3 border-t border-white/10 p-3">
                    <button
                        onClick={() => setScoreOpen((open) => !open)}
                        className="relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-[#B8B8CF] hover:bg-white/[0.04]"
                    >
                        <Gauge size={18} className="text-[#9F94FF]" />
                        <span className="lg:hidden xl:inline">
                            <span className="block font-semibold text-white">Strategy Score</span>
                            <span className="font-mono text-xs">{'●'.repeat(score)}{'○'.repeat(Math.max(0, 10 - score))}</span>
                        </span>
                        {scoreOpen && (
                            <span className="absolute bottom-full left-3 mb-2 w-64 rounded-lg border border-white/10 bg-[#11111D] p-3 text-xs leading-relaxed text-[#CFCFE6] shadow-xl">
                                Earn points by generating Blueprints, adding experiments, logging results, and promoting Known Winners.
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => {
                            setPulseOpen(true);
                            trackEvent('quick_pulse_opened', { source: 'sidebar' });
                        }}
                        className="flex h-11 w-full items-center gap-3 rounded-lg bg-[#5D4FD4] px-3 text-sm font-bold text-white shadow-lg shadow-[#5D4FD4]/20 transition hover:bg-[#6C5CFF]"
                    >
                        <Zap size={18} />
                        <span className="lg:hidden xl:inline">Quick Pulse</span>
                    </button>

                    <div className="group relative flex items-center gap-3 rounded-lg px-3 py-3 text-xs text-[#777791]">
                        <span className={`h-2 w-2 rounded-full ${syncStatus === 'error' ? 'bg-red-400' : syncStatus === 'syncing' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        <span className="lg:hidden xl:inline">{userSession.role === 'guest' ? 'Guest Mode' : userSession.displayName}</span>
                        <span className="pointer-events-none absolute bottom-full left-3 mb-2 hidden w-72 rounded-lg border border-white/10 bg-[#11111D] p-3 text-xs leading-relaxed text-[#CFCFE6] shadow-xl group-hover:block">
                            You are in Guest Mode. Your Blueprints and experiments are saved to this device. Sign up to access your work from any device, share with teammates, and unlock the Win Wall.
                        </span>
                    </div>

                    <Link href="/about" className="block rounded-lg px-3 py-2 text-xs text-[#777791] hover:bg-white/[0.04] hover:text-white lg:hidden xl:block">
                        Manifesto
                    </Link>
                </div>
            </aside>

            <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#2A2A3E] bg-[#1C1C2E] md:hidden">
                <div className="grid h-16 grid-cols-5 px-1">
                    {navItems.slice(1).map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item);
                        return (
                            <Link key={item.href} href={item.href} className={`grid place-items-center gap-0.5 text-[10px] font-semibold ${active ? 'text-[#9F94FF]' : 'text-[#7E7E9A]'}`}>
                                <Icon size={19} />
                                <span>{item.label.replace('The ', '')}</span>
                                <span className={`h-1 w-1 rounded-full ${active ? 'bg-[#9F94FF]' : 'bg-transparent'}`} />
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <button
                onClick={() => {
                    setPulseOpen(true);
                    trackEvent('quick_pulse_opened', { source: 'mobile_fab' });
                }}
                className="fixed bottom-20 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#5D4FD4] text-white shadow-xl shadow-[#5D4FD4]/30 md:hidden"
                aria-label="Quick Pulse"
            >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#5D4FD4]/20" />
                <Zap size={22} />
            </button>

            <QuickPulseModal open={pulseOpen} onClose={() => setPulseOpen(false)} />
        </>
    );
}

function QuickPulseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const router = useRouter();
    const [problem, setProblem] = useState('');
    const [metric, setMetric] = useState('');

    const result = useMemo(() => {
        const lower = problem.toLowerCase();
        if (lower.includes('trust') || lower.includes('fraud')) {
            return {
                law: 'Law 13: Harness Social Influence',
                title: 'Proof-before-pressure sequence',
                hypothesis: 'If we show credible peer proof before the offer, qualified conversions should rise because the dominant barrier is uncertainty, not awareness.',
                metric: metric || 'trial-to-paid conversion',
            };
        }
        if (lower.includes('price') || lower.includes('discount')) {
            return {
                law: 'Law 6: Price-Value Relativity',
                title: 'Value frame before price test',
                hypothesis: 'If we reframe the value mechanism before showing price, objections should fall because buyers compare outcomes before they compare fees.',
                metric: metric || 'qualified conversion rate',
            };
        }
        return {
            law: 'Law 16: Continuous Testing',
            title: 'Message-order test',
            hypothesis: 'If we test the proof-first message against the offer-first message, we can identify whether sequence friction is suppressing intent.',
            metric: metric || 'conversion rate',
        };
    }, [problem, metric]);

    if (!open) return null;

    const addToLab = () => {
        const experiments = storage.get<any[]>(STORAGE_KEYS.EXPERIMENTS) || [];
        const exp = {
            experiment_id: `EXP-PULSE-${Date.now()}`,
            id: `EXP-PULSE-${Date.now()}`,
            scenario_id: 'quick-pulse',
            title: result.title,
            hypothesis: result.hypothesis,
            status: 'planned',
            primary_metric: result.metric,
            impact_score: 8,
            confidence_score: 7,
            ease_score: 8,
            ice_total: 7.7,
            governing_law_number: result.law.match(/\d+/)?.[0] || '16',
            created_at: new Date().toISOString(),
        };
        writeThroughCache(STORAGE_KEYS.EXPERIMENTS, [exp, ...experiments]);
        trackEvent('quick_pulse_added_to_lab', { law: result.law, iceTotal: exp.ice_total });
        onClose();
        router.push('/lab');
    };

    const fullBlueprint = () => {
        sessionStorage.setItem('qmm_prefill_symptom', problem);
        trackEvent('quick_pulse_full_blueprint_clicked', {});
        onClose();
        router.push('/diagnose');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-lg border border-white/10 bg-[#11111D] p-6 text-white shadow-2xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#9F94FF]">Quick Pulse</p>
                        <h2 className="mt-2 text-2xl font-bold">60-second experiment hypothesis</h2>
                    </div>
                    <button onClick={onClose} className="rounded-md p-2 text-[#9090AA] hover:bg-white/10 hover:text-white" aria-label="Close Quick Pulse">
                        <X size={18} />
                    </button>
                </div>

                <div className="grid gap-4">
                    <Textarea
                        value={problem}
                        onChange={(event) => setProblem(event.target.value)}
                        placeholder="What is the problem? Example: Trial-to-paid conversion is stuck at 8% and users do not trust the onboarding claims."
                        className="min-h-[120px] border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]"
                    />
                    <Input
                        value={metric}
                        onChange={(event) => setMetric(event.target.value)}
                        placeholder="Primary metric, e.g. activation rate"
                        className="border-white/10 bg-white/[0.04] text-white placeholder:text-[#777791]"
                    />
                </div>

                {problem.length > 12 && (
                    <div className="mt-5 rounded-lg border border-[#5D4FD4]/30 bg-[#5D4FD4]/10 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#CFC9FF]">
                            <ShieldCheck size={16} /> {result.law}
                        </div>
                        <h3 className="text-lg font-bold">{result.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#CFCFE6]">{result.hypothesis}</p>
                        <div className="mt-3 text-xs font-bold text-emerald-300">ICE 7.7 — Start this week</div>
                    </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={addToLab} disabled={problem.length <= 12} className="h-12 flex-1 bg-[#5D4FD4] text-white hover:bg-[#6C5CFF]">
                        Add to Lab
                    </Button>
                    <Button onClick={fullBlueprint} disabled={problem.length <= 12} variant="outline" className="h-12 flex-1 border-white/15 text-white hover:bg-white/10">
                        Want the full Blueprint?
                    </Button>
                </div>
            </div>
        </div>
    );
}
