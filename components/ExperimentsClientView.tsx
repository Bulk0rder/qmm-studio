'use client';

import React, { useState } from 'react';
import { Experiment } from '@/lib/types';
import { UI_COPY } from '@/lib/ui-copy';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ExperimentsClientViewProps {
    initialExperiments: Experiment[];
}

export default function ExperimentsClientView({ initialExperiments }: ExperimentsClientViewProps) {
    const [experiments, setExperiments] = useState<Experiment[]>(initialExperiments);
    const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
    const [logResultOpen, setLogResultOpen] = useState(false);

    // Derived state
    const runningExperiments = experiments.filter(e => e.status === 'running' || e.status === 'draft');
    const knownWinners = experiments.filter(e => e.result === 'win');

    const handleLogResult = async (result: 'win' | 'loss' | 'inconclusive') => {
        if (!selectedExperiment) return;

        try {
            const response = await fetch('/api/experiments/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedExperiment.id,
                    result,
                    status: 'completed'
                })
            });

            if (response.ok) {
                // Update local state
                setExperiments(prev => prev.map(e =>
                    e.id === selectedExperiment.id
                        ? { ...e, status: 'completed', result }
                        : e
                ));
                setLogResultOpen(false);
                setSelectedExperiment(null);
            }
        } catch (error) {
            console.error('Failed to log result', error);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* HERO SECTION */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {UI_COPY.EXPERIMENTS.TITLE}
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl">
                    {UI_COPY.EXPERIMENTS.SUBTITLE}
                </p>
                <div className="flex gap-4 pt-2">
                    <Button onClick={() => alert('New experiment wizard coming soon!')}>{UI_COPY.EXPERIMENTS.BUTTONS.CREATE}</Button>
                </div>
            </div>

            {/* ACTIVE EXPERIMENTS */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h2 className="text-xl font-bold text-white">Active Queue</h2>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full">{runningExperiments.length}</span>
                </div>

                {runningExperiments.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-slate-700 rounded-xl">
                        <p className="text-slate-500">No active experiments. Generate a blueprint to start testing.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {runningExperiments.map(exp => (
                            <Card key={exp.id} className="glass-panel border-white/5 hover:border-blue-500/30 transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{exp.type}</Badge>
                                        <span className={`text-xs font-mono font-bold ${exp.status === 'running' ? 'text-green-400' : 'text-slate-500'}`}>
                                            {exp.status === 'running' ? '● RUNNING' : '○ ' + exp.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg leading-snug">{exp.hypothesis}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div className="bg-slate-900/50 p-3 rounded">
                                        <p className="text-slate-300 mb-1"><span className="text-slate-500 font-bold uppercase text-[10px]">Setup:</span> {exp.setup}</p>
                                        <div className="flex gap-4 mt-2 text-xs text-slate-400 font-mono">
                                            <span>Cost: {exp.cost_to_learn}</span>
                                            <span>Stop: {exp.stopping_rule}</span>
                                        </div>
                                    </div>

                                    {/* Custom Modal Overlay */}
                                    {logResultOpen && selectedExperiment?.id === exp.id && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                                            <div className="bg-slate-950 border border-white/10 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
                                                <button
                                                    onClick={() => setLogResultOpen(false)}
                                                    className="absolute top-4 right-4 text-slate-500 hover:text-white"
                                                >
                                                    ✕
                                                </button>
                                                <h3 className="text-xl font-bold text-white mb-2">Log Experiment Result</h3>
                                                <p className="text-slate-300 mb-6">
                                                    What was the outcome of <strong>{exp.id}</strong>?
                                                </p>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <button onClick={() => handleLogResult('win')} className="p-4 rounded-xl border border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-center transition-colors group">
                                                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">✅</div>
                                                        <div className="font-bold text-green-400">WIN</div>
                                                        <div className="text-xs text-green-400/60 mt-1">Validated</div>
                                                    </button>
                                                    <button onClick={() => handleLogResult('loss')} className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-center transition-colors group">
                                                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">❌</div>
                                                        <div className="font-bold text-red-400">LOSS</div>
                                                        <div className="text-xs text-red-400/60 mt-1">Disproved</div>
                                                    </button>
                                                    <button onClick={() => handleLogResult('inconclusive')} className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 hover:bg-yellow-500/20 text-center transition-colors group">
                                                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚖️</div>
                                                        <div className="font-bold text-yellow-400">UNCLEAR</div>
                                                        <div className="text-xs text-yellow-400/60 mt-1">Need more data</div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        variant="outline"
                                        className="w-full border-slate-700 hover:bg-slate-800"
                                        onClick={() => {
                                            setSelectedExperiment(exp);
                                            setLogResultOpen(true);
                                        }}
                                    >
                                        {UI_COPY.EXPERIMENTS.BUTTONS.LOG}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* KNOWN WINNERS */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                        <h2 className="text-xl font-bold text-white">{UI_COPY.EXPERIMENTS.WINNERS.TAB}</h2>
                        <p className="text-sm text-slate-400">{UI_COPY.EXPERIMENTS.WINNERS.DESC}</p>
                    </div>
                </div>

                {knownWinners.length === 0 ? (
                    <div className="text-center py-12 bg-slate-900/30 rounded-xl border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-2">{UI_COPY.EXPERIMENTS.WINNERS.EMPTY}</h3>
                        <p className="text-slate-400">{UI_COPY.EXPERIMENTS.WINNERS.EMPTY_DESC}</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {knownWinners.map(exp => (
                            <div key={exp.id} className="p-6 rounded-xl bg-green-950/20 border border-green-500/20 relative overflow-hidden group hover:border-green-500/40 transition-colors">
                                <div className="absolute top-0 right-0 p-2 opacity-50">
                                    <span className="text-4xl grayscale grayscale-1 group-hover:grayscale-0 transition-all opacity-20">🏆</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="bg-green-500 text-black text-[10px] uppercase font-bold px-2 py-0.5 rounded mb-3 inline-block">Validated Winner</span>
                                    <h4 className="text-white font-bold mb-2 line-clamp-2">{exp.hypothesis}</h4>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-3">{exp.win_action}</p>
                                    <div className="text-xs font-mono text-green-400/70 border-t border-green-500/20 pt-2">
                                        Metric: {Object.keys(exp.metrics_logged || {})[0] || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
