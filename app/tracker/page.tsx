'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Activity, Plus } from 'lucide-react';

export default function TrackerPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-app">Experiment Tracker</h1>
                    <p className="text-muted text-lg mt-1">Monitor active experiments and log results.</p>
                </div>
                <Button className="shadow-sm">
                    <Plus className="mr-2" size={16} />
                    Log New Result
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="card-surface border-app bg-white dark:bg-zinc-900">
                    <CardContent className="p-6">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted mt-1">Active Experiments</div>
                    </CardContent>
                </Card>
                <Card className="card-surface border-app bg-white dark:bg-zinc-900">
                    <CardContent className="p-6">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-500">5</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted mt-1">Validated Winners</div>
                    </CardContent>
                </Card>
                <Card className="card-surface border-app bg-white dark:bg-zinc-900">
                    <CardContent className="p-6">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-500">3</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted mt-1">Failed (Learning)</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-app pb-4">
                    <Activity className="text-blue-500" size={20} />
                    <h2 className="text-lg font-semibold text-app">Active Log</h2>
                </div>

                <Card className="border-app bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <div className="space-y-1">
                                    <div className="font-medium text-app text-base">Test #{100 + i}: Email Subject Line A/B</div>
                                    <div className="text-sm text-muted">Hypothesis: Curiosity beats Urgency.</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 px-2 py-1 rounded border border-yellow-200 dark:border-yellow-900/30">In Progress</span>
                                    <Button variant="ghost" size="sm" onClick={() => alert("Update Experiment:\nThis would allow you to change status or add new data points.")}>Update</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
