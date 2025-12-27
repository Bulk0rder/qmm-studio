'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Beaker, Play, CheckCircle, XCircle, MoreHorizontal, Info, Search, FlaskConical } from 'lucide-react';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';

interface Experiment {
    experiment_id: string; // Match seed data key
    scenario_id: string;
    title: string;
    hypothesis: string;
    status: 'planned' | 'running' | 'completed';
    outcome?: 'win' | 'loss' | 'inconclusive';
    startDate?: string;
    created_at?: string;
}

export default function ExperimentsClientView() {
    const searchParams = useSearchParams();
    const scenarioParam = searchParams.get('scenario');
    const actionParam = searchParams.get('action');
    const titleParam = searchParams.get('title');

    const [experiments, setExperiments] = useState<Experiment[]>([]);
    const [filteredExperiments, setFilteredExperiments] = useState<Experiment[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Form State
    const [newExpTitle, setNewExpTitle] = useState('');
    const [newExpHypothesis, setNewExpHypothesis] = useState('');
    const [newExpScenarioId, setNewExpScenarioId] = useState(scenarioParam || '');

    // Scenarios for dropdown
    const [scenarios, setScenarios] = useState<any[]>([]);

    const loadData = () => {
        const storedExps = storage.get<Experiment[]>(STORAGE_KEYS.EXPERIMENTS) || [];
        const storedScenarios = storage.get<any[]>(STORAGE_KEYS.SCENARIOS) || [];

        // Ensure status is valid for seeded data if coming from pure JSON
        const validatedExps = storedExps.map(e => ({
            ...e,
            status: e.status || 'planned'
        }));

        setExperiments(validatedExps as Experiment[]);
        setScenarios(storedScenarios);
    };

    useEffect(() => {
        loadData();
        if (actionParam === 'create') {
            setIsCreateOpen(true);
            if (titleParam) setNewExpTitle(titleParam);
            if (scenarioParam) setNewExpScenarioId(scenarioParam);
        }
    }, [actionParam, titleParam, scenarioParam]);

    useEffect(() => {
        let filtered = experiments;
        if (scenarioParam) {
            filtered = filtered.filter(e => e.scenario_id === scenarioParam);
        }
        setFilteredExperiments(filtered);
    }, [experiments, scenarioParam]);

    const handleSave = () => {
        const newExp: Experiment = {
            experiment_id: `EXP-${Date.now()}`,
            scenario_id: newExpScenarioId || 'SC-GUEST',
            title: newExpTitle || 'Untitled Experiment',
            hypothesis: newExpHypothesis,
            status: 'planned',
            created_at: new Date().toISOString()
        };

        const updated = [newExp, ...experiments];
        storage.set(STORAGE_KEYS.EXPERIMENTS, updated);
        setExperiments(updated);
        setIsCreateOpen(false);
        setNewExpTitle('');
        setNewExpHypothesis('');
    };

    const updateStatus = (id: string, newStatus: Experiment['status'], outcome?: Experiment['outcome']) => {
        const updated = experiments.map(e => {
            if (e.experiment_id === id) {
                return { ...e, status: newStatus, outcome: outcome || e.outcome };
            }
            return e;
        });
        storage.set(STORAGE_KEYS.EXPERIMENTS, updated);
        setExperiments(updated);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* HERO */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-app">Experiments</h1>
                    <p className="text-lg text-muted max-w-2xl">
                        Turn strategy into evidence. Log your hypotheses and track results.
                    </p>
                </div>
                <Button size="lg" onClick={() => setIsCreateOpen(true)} className="shadow-sm">
                    <Plus size={18} className="mr-2" /> Log Experiment
                </Button>
            </div>

            {/* INFO BOX */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-app rounded-xl p-5 flex gap-4">
                <div className="text-blue-600 mt-1"><Info size={20} /></div>
                <div className="space-y-1">
                    <h3 className="font-bold text-app">Experiments vs Scenarios</h3>
                    <ul className="text-sm text-muted space-y-1 list-disc pl-4">
                        <li><strong>Scenarios</strong> describe what is happening in the market.</li>
                        <li><strong>Blueprints</strong> prescribe what to do about it (strategy).</li>
                        <li><strong>Experiments</strong> prove what actually works (evidence).</li>
                    </ul>
                </div>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {filteredExperiments.length === 0 ? (
                    <div className="text-center py-20 border border-app rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <Beaker className="mx-auto text-muted mb-4 opacity-50" size={48} />
                        <h3 className="text-lg font-semibold text-app mb-2">No Experiments Found</h3>
                        <p className="text-muted mb-6">Start by creating a scenario and generating a blueprint, or log an ad-hoc test.</p>
                    </div>
                ) : (
                    filteredExperiments.map(exp => (
                        <div key={exp.experiment_id} className="p-6 bg-white dark:bg-zinc-900 border border-app rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 group hover:border-blue-500/30 transition-colors">
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
                                <div className="mt-2 text-xs text-muted flex gap-2">
                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{scenarios.find(s => s.id === exp.scenario_id)?.title || exp.scenario_id}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {exp.status === 'planned' && (
                                    <Button onClick={() => updateStatus(exp.experiment_id, 'running')} variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                                        <Play size={14} className="mr-2" /> Start
                                    </Button>
                                )}
                                {exp.status === 'running' && (
                                    <>
                                        <Button onClick={() => updateStatus(exp.experiment_id, 'completed', 'win')} variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">
                                            <CheckCircle size={14} className="mr-2" /> Win
                                        </Button>
                                        <Button onClick={() => updateStatus(exp.experiment_id, 'completed', 'loss')} variant="outline" size="sm" className="text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20">
                                            <XCircle size={14} className="mr-2" /> Loss
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* CREATE MODAL */}
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
                                <Input value={newExpTitle} onChange={e => setNewExpTitle(e.target.value)} placeholder="e.g. Price Page A/B Test" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Scenario (Optional)</label>
                                <Input value={newExpScenarioId} onChange={e => setNewExpScenarioId(e.target.value)} placeholder="Linked Scenario ID" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Hypothesis</label>
                                <Textarea value={newExpHypothesis} onChange={e => setNewExpHypothesis(e.target.value)} className="min-h-[100px]" placeholder="If we..., then... because..." />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                                <Button onClick={handleSave}>Save Experiment</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
