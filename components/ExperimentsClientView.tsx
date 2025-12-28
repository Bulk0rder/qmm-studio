'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Beaker, Play, CheckCircle, XCircle, MoreHorizontal, Info, Search, FlaskConical } from 'lucide-react';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';
import { UI_COPY } from '@/lib/ui-copy';
import { getLargeExperimentsSeed } from '@/lib/seed-data';
import { Database } from 'lucide-react';

interface Experiment {
    experiment_id: string; // Match seed data key
    scenario_id: string;
    title: string;
    hypothesis: string;
    status: 'planned' | 'running' | 'completed';
    outcome?: 'win' | 'loss' | 'inconclusive';
    startDate?: string;
    created_at?: string;
    checkBackDate?: string;
    outcomeNotes?: string;
    addedToKB?: boolean;
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
    const [editingExp, setEditingExp] = useState<Experiment | null>(null);

    // Form State
    const [newExpTitle, setNewExpTitle] = useState('');
    const [newExpHypothesis, setNewExpHypothesis] = useState('');
    const [newExpScenarioId, setNewExpScenarioId] = useState(scenarioParam || '');
    const [checkBackDate, setCheckBackDate] = useState('');

    // Outcome State
    const [outcomeModalOpen, setOutcomeModalOpen] = useState(false);
    const [selectedExpId, setSelectedExpId] = useState<string | null>(null);
    const [outcomeResult, setOutcomeResult] = useState<'win' | 'loss'>('win');
    const [outcomeNotes, setOutcomeNotes] = useState('');
    const [addToKB, setAddToKB] = useState(false);

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
        if (editingExp) {
            // Update existing
            const updated = experiments.map(e =>
                e.experiment_id === editingExp.experiment_id
                    ? { ...e, title: newExpTitle, hypothesis: newExpHypothesis, scenario_id: newExpScenarioId, checkBackDate }
                    : e
            );
            storage.set(STORAGE_KEYS.EXPERIMENTS, updated);
            setExperiments(updated);
            setEditingExp(null);
        } else {
            // Create New
            const newExp: Experiment = {
                experiment_id: `EXP-${Date.now()}`,
                scenario_id: newExpScenarioId || 'SC-GUEST',
                title: newExpTitle || 'Untitled Experiment',
                hypothesis: newExpHypothesis,
                status: 'planned',
                created_at: new Date().toISOString(),
                checkBackDate: checkBackDate
            };
            const updated = [newExp, ...experiments];
            storage.set(STORAGE_KEYS.EXPERIMENTS, updated);
            setExperiments(updated);
        }

        setIsCreateOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setNewExpTitle('');
        setNewExpHypothesis('');
        setNewExpScenarioId(scenarioParam || '');
        setCheckBackDate('');
        setEditingExp(null);
    };

    const openEdit = (exp: Experiment) => {
        setEditingExp(exp);
        setNewExpTitle(exp.title);
        setNewExpHypothesis(exp.hypothesis);
        setNewExpScenarioId(exp.scenario_id);
        setCheckBackDate(exp.checkBackDate || '');
        setIsCreateOpen(true);
    };

    const handleOutcomeClick = (id: string, result: 'win' | 'loss') => {
        setSelectedExpId(id);
        setOutcomeResult(result);
        setOutcomeNotes('');
        setAddToKB(false);
        setOutcomeModalOpen(true);
    };

    const confirmOutcome = () => {
        if (!selectedExpId) return;

        const updated = experiments.map(e => {
            if (e.experiment_id === selectedExpId) {
                return {
                    ...e,
                    status: 'completed' as const,
                    outcome: outcomeResult,
                    outcomeNotes,
                    addedToKB: addToKB
                };
            }
            return e;
        });

        storage.set(STORAGE_KEYS.EXPERIMENTS, updated);
        setExperiments(updated);
        setOutcomeModalOpen(false);

        // In a real app, we would actually push to KB here.
        if (selectedExpId) {
            const exp = updated.find(e => e.experiment_id === selectedExpId);
            if (exp && exp.scenario_id) {
                const storedScenarios = storage.get<any[]>(STORAGE_KEYS.SCENARIOS) || [];
                const updatedScenarios = storedScenarios.map(s => {
                    if (s.id === exp.scenario_id) {
                        const outcomes = s.outcomes_summary || { wins: 0, losses: 0, inconclusive: 0 };
                        if (outcomeResult === 'win') outcomes.wins++;
                        if (outcomeResult === 'loss') outcomes.losses++;
                        return { ...s, outcomes_summary: outcomes };
                    }
                    return s;
                });
                storage.set(STORAGE_KEYS.SCENARIOS, updatedScenarios);
                setScenarios(updatedScenarios); // Update local state
            }
        }

        if (addToKB) {
            // Mock toast?
            console.log("Promoted to KB:", selectedExpId);
        }
    };

    const updateStatus = (id: string, newStatus: Experiment['status']) => {
        const updated = experiments.map(e => {
            if (e.experiment_id === id) return { ...e, status: newStatus };
            return e;
        });
        storage.set(STORAGE_KEYS.EXPERIMENTS, updated);
        setExperiments(updated);
    };



    // ... (ExperimentsClientView Logic)

    const handleSeed30 = () => {
        if (!confirm('This will seed 30 sample experiments. Continue?')) return;
        const largeSeed = getLargeExperimentsSeed();

        const newExps = largeSeed.map(e => ({
            experiment_id: e.experiment_id,
            scenario_id: e.scenario_id,
            title: `[Test] ${e.primary_kpi} Optimization`,
            hypothesis: e.hypothesis,
            status: e.status as 'planned' | 'running' | 'completed',
            created_at: new Date().toISOString(),
            checkBackDate: new Date(Date.now() + 86400000 * 7).toISOString()
        }));

        storage.set(STORAGE_KEYS.EXPERIMENTS, newExps);
        setExperiments(newExps as Experiment[]);
        alert('30 Sample Experiments Populated.');
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* HERO */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">{UI_COPY.EXPERIMENTS.TITLE}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {UI_COPY.EXPERIMENTS.SUBTITLE}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSeed30} className="hidden md:flex">
                        <Database size={16} className="mr-2" /> Populate 30 Sample Experiments
                    </Button>
                    <Button size="lg" onClick={() => { resetForm(); setIsCreateOpen(true); }} className="shadow-sm">
                        <Plus size={18} className="mr-2" /> {UI_COPY.EXPERIMENTS.BUTTONS.CREATE}
                    </Button>
                </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-border rounded-xl p-5 flex gap-4">
                <div className="text-blue-600 mt-1"><Info size={20} /></div>
                <div className="space-y-1">
                    <h3 className="font-bold text-foreground">Experiments vs Scenarios</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        <li><strong>Scenarios</strong> describe what is happening in the market.</li>
                        <li><strong>Blueprints</strong> prescribe what to do about it (strategy).</li>
                        <li><strong>Experiments</strong> prove what actually works (evidence).</li>
                    </ul>
                </div>
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {filteredExperiments.length === 0 ? (
                    <div className="text-center py-20 border border-border rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <Beaker className="mx-auto text-muted-foreground mb-4 opacity-50" size={48} />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No Experiments Found</h3>
                        <p className="text-muted-foreground mb-6">Start by creating a scenario and generating a blueprint, or log an ad-hoc test.</p>
                    </div>
                ) : (
                    filteredExperiments.map(exp => (
                        <div key={exp.experiment_id} className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start gap-4 group hover:border-blue-500/30 transition-colors">
                            <div className="flex-1 cursor-pointer" onClick={() => openEdit(exp)}>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-blue-600 transition-colors">{exp.title}</h3>
                                    <Badge variant={exp.status === 'running' ? 'warning' : (exp.status === 'completed' ? 'secondary' : 'default')}>
                                        {exp.status}
                                    </Badge>
                                    {exp.outcome === 'win' && <Badge variant="success">Win</Badge>}
                                    {exp.outcome === 'loss' && <Badge variant="destructive">Loss</Badge>}
                                </div>
                                <p className="text-muted-foreground text-sm italic mb-2">"{exp.hypothesis}"</p>
                                <div className="flex gap-4 text-xs text-muted-foreground">
                                    {exp.checkBackDate && (
                                        <span className="flex items-center gap-1"><Search size={12} /> Check: {new Date(exp.checkBackDate).toLocaleDateString()}</span>
                                    )}
                                    <span className="flex items-center gap-1"><FlaskConical size={12} /> {scenarios.find(s => s.id === exp.scenario_id)?.title || 'Ad-hoc'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-start md:self-center">
                                {exp.status === 'planned' && (
                                    <>
                                        <Button onClick={() => openEdit(exp)} variant="ghost" size="sm">Edit</Button>
                                        <Button onClick={() => updateStatus(exp.experiment_id, 'running')} variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                                            <Play size={14} className="mr-2" /> Start
                                        </Button>
                                    </>
                                )}
                                {exp.status === 'running' && (
                                    <>
                                        <Button onClick={() => handleOutcomeClick(exp.experiment_id, 'win')} variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20">
                                            <CheckCircle size={14} className="mr-2" /> Win
                                        </Button>
                                        <Button onClick={() => handleOutcomeClick(exp.experiment_id, 'loss')} variant="outline" size="sm" className="text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20">
                                            <XCircle size={14} className="mr-2" /> Loss
                                        </Button>
                                    </>
                                )}
                                {exp.status === 'completed' && (
                                    <Button variant="ghost" size="sm" disabled>
                                        Logged
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* CREATE/EDIT MODAL */}
            {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-lg rounded-xl shadow-2xl p-6 border border-border animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{editingExp ? 'Edit Experiment' : 'Log New Experiment'}</h2>
                            <button onClick={() => { setIsCreateOpen(false); resetForm(); }}><XCircle className="text-muted-foreground hover:text-destructive transition-colors" /></button>
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
                            <div>
                                <label className="block text-sm font-medium mb-1">Check Back Date</label>
                                <Input type="date" value={checkBackDate} onChange={e => setCheckBackDate(e.target.value)} />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => { setIsCreateOpen(false); resetForm(); }}>Cancel</Button>
                                <Button onClick={handleSave}>{editingExp ? 'Update Experiment' : 'Save Experiment'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* OUTCOME MODAL */}
            {outcomeModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-lg rounded-xl shadow-2xl p-6 border border-border animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {outcomeResult === 'win' ? <CheckCircle className="text-emerald-500" /> : <XCircle className="text-red-500" />}
                                Log {outcomeResult === 'win' ? 'Winning' : 'Learning'} Outcome
                            </h2>
                            <button onClick={() => setOutcomeModalOpen(false)}><XCircle className="text-muted-foreground hover:text-destructive transition-colors" /></button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-muted-foreground text-sm">
                                {outcomeResult === 'win'
                                    ? "Great work! Describe why this worked to help future strategy."
                                    : "Failures are just data. What did we learn about the market physics?"}
                            </p>

                            <div>
                                <label className="block text-sm font-medium mb-1">Outcome Notes</label>
                                <Textarea value={outcomeNotes} onChange={e => setOutcomeNotes(e.target.value)} className="min-h-[100px]" placeholder="Key findings and evidence..." />
                            </div>

                            <div className="flex items-center gap-2 p-3 bg-secondary/20 rounded-lg border border-border">
                                <input
                                    type="checkbox"
                                    id="kb-promo"
                                    checked={addToKB}
                                    onChange={e => setAddToKB(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="kb-promo" className="text-sm font-medium cursor-pointer select-none">
                                    Promote to Institutional Memory (Shared KB)
                                </label>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setOutcomeModalOpen(false)}>Cancel</Button>
                                <Button onClick={confirmOutcome}>Confirm & Log</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
