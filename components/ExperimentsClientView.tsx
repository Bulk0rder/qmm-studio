'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Beaker, Play, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { UI_COPY } from '@/lib/ui-copy';

// Simple types for the UI since we don't have the full shared type file in context easily, 
// using generic shape that matches seed data structure mostly.
interface Experiment {
    id: string;
    title: string;
    hypothesis: string;
    status: 'draft' | 'running' | 'completed';
    outcome?: 'win' | 'loss' | 'inconclusive';
    startDate?: string;
}

export default function ExperimentsClientView() {
    // Mock state for now - normally would fetch from storage
    const [experiments, setExperiments] = useState<Experiment[]>([
        { id: 'EXP-1', title: 'Price First Sequence', hypothesis: 'Showing price before value reduces anxiety.', status: 'completed', outcome: 'loss', startDate: '2024-12-01' },
        { id: 'EXP-2', title: 'Social Proof Header', hypothesis: 'Testimonials above fold increase time-on-site.', status: 'running', startDate: '2024-12-25' },
    ]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HERO */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-app">
                        Experiments
                    </h1>
                    <p className="text-lg text-muted max-w-2xl">
                        Turn strategy into evidence. Log your hypotheses and track results.
                    </p>
                </div>
                <Button size="lg" onClick={() => setIsCreateOpen(true)} className="shadow-sm">
                    <Plus size={18} className="mr-2" /> Log Experiment
                </Button>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {experiments.length === 0 ? (
                    <div className="text-center py-20 border border-app rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <Beaker className="mx-auto text-muted mb-4 opacity-50" size={48} />
                        <h3 className="text-lg font-semibold text-app mb-2">No Experiments Yet</h3>
                        <p className="text-muted mb-6">Start by creating a scenario and generating a blueprint, or log an ad-hoc test.</p>
                    </div>
                ) : (
                    experiments.map(exp => (
                        <div key={exp.id} className="p-6 bg-white dark:bg-zinc-900 border border-app rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 group hover:border-blue-500/30 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg text-app">{exp.title}</h3>
                                    <Badge variant={exp.status === 'running' ? 'warning' : (exp.status === 'completed' ? 'secondary' : 'default')}>
                                        {exp.status}
                                    </Badge>
                                    {exp.outcome === 'win' && <Badge variant="success">Win</Badge>}
                                    {exp.outcome === 'loss' && <Badge variant="destructive">Loss</Badge>}
                                </div>
                                <p className="text-muted text-sm italic">"{exp.hypothesis}"</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {exp.status === 'draft' && (
                                    <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                                        <Play size={14} className="mr-2" /> Start
                                    </Button>
                                )}
                                {exp.status === 'running' && (
                                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">
                                        <CheckCircle size={14} className="mr-2" /> Log Result
                                    </Button>
                                )}
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted hover:text-app">
                                    <MoreHorizontal size={18} />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* CREATE MODAL (Simple Mock) */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl p-6 border border-app animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Log New Experiment</h2>
                            <button onClick={() => setIsCreateOpen(false)}><XCircle className="text-muted hover:text-red-500 transition-colors" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Experiment Title</label>
                                <Input placeholder="e.g. Price Page A/B Test" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hypothesis</label>
                                <textarea className="w-full p-2 rounded-md border border-app bg-transparent text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={3} placeholder="If we..., then... because..." />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                <Button onClick={() => setIsCreateOpen(false)}>Save Draft</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
