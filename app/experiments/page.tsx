'use client';

import React from 'react';
import { UI_COPY } from '@/lib/ui-copy';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Trophy, Activity, TrendingUp } from 'lucide-react';

import { BackButton } from '@/components/ui/BackButton';

export default function ExperimentsPage() {
    const { TITLE, SUBTITLE, WINNERS, BUTTONS } = UI_COPY.EXPERIMENTS;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BackButton />
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-app">{TITLE}</h1>
                    <p className="text-muted text-lg mt-1">{SUBTITLE}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white dark:bg-zinc-900 shadow-sm" onClick={() => alert('Log Experiment feature coming soon')}>
                        {BUTTONS.LOG}
                    </Button>
                    <Button className="shadow-sm" onClick={() => alert('Create Experiment feature coming soon')}>
                        <Plus className="mr-2" size={16} />
                        {BUTTONS.CREATE}
                    </Button>
                </div>
            </header>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-app shadow-sm bg-white dark:bg-zinc-900">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-800">
                            <Activity size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider">Active Tests</p>
                            <p className="text-2xl font-semibold text-app mt-1">0</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-app shadow-sm bg-white dark:bg-zinc-900">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-800">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider">Known Winners</p>
                            <p className="text-2xl font-semibold text-app mt-1">0</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-app shadow-sm bg-white dark:bg-zinc-900">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 rounded-lg border border-purple-100 dark:border-purple-800">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted font-bold uppercase tracking-wider">Learning Rate</p>
                            <p className="text-2xl font-semibold text-app mt-1">0%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Known Winners */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-app pb-4">
                    <Trophy className="text-yellow-500" size={20} />
                    <h3 className="text-lg font-semibold text-app">{WINNERS.TAB}</h3>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-app rounded-xl p-12 text-center">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy size={24} />
                        </div>
                        <h4 className="text-base font-semibold text-app">{WINNERS.EMPTY}</h4>
                        <p className="text-sm text-muted leading-relaxed">{WINNERS.EMPTY_DESC}</p>
                        <Button variant="outline" size="sm" className="mt-4 bg-white dark:bg-zinc-900 shadow-sm">{WINNERS.EMPTY_CTA}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
