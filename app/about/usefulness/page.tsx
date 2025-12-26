'use client';

import React from 'react';
import { UI_COPY } from '@/lib/ui-copy';
import { CheckCircle2, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function UsefulnessPage() {
    const { TITLE, BULLETS, BEST_FOR } = UI_COPY.ABOUT_USEFULNESS;

    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-app">{TITLE}</h1>
                <div className="h-1 w-20 bg-black dark:bg-white rounded-full opacity-10"></div>
            </header>

            <div className="grid gap-6">
                {BULLETS.map((bullet, i) => {
                    const [bold, rest] = bullet.split(':');
                    return (
                        <Card key={i} className="hover:shadow-md transition-shadow border-app bg-card card-surface">
                            <CardContent className="flex gap-4 p-6">
                                <div className="mt-1 text-green-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <span className="font-bold block mb-1 text-app">{bold}</span>
                                    <span className="text-muted">{rest}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
                    <Target size={16} />
                    Best Applied For
                </h3>
                <p className="text-lg leading-relaxed font-medium text-app">
                    {BEST_FOR}
                </p>
            </div>
        </div>
    );
}
