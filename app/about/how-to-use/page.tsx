'use client';

import React from 'react';
import { UI_COPY } from '@/lib/ui-copy';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function HowToUsePage() {
    const { TITLE, INTRO, STEPS, FOOTER_TIP } = UI_COPY.ABOUT_HOW_TO_USE;

    return (
        <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-app">{TITLE}</h1>
                <p className="text-xl text-muted font-light">{INTRO}</p>
            </header>

            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
                {STEPS.map((step, index) => (
                    <div key={index} className="flex gap-6 relative">
                        <div className="flex-none w-10 h-10 rounded-full bg-white dark:bg-black border border-app flex items-center justify-center font-bold shadow-sm z-10 text-sm">
                            {index + 1}
                        </div>
                        <div className="space-y-1 pt-2">
                            <h3 className="font-semibold text-lg">{step.TITLE}</h3>
                            <p className="text-muted leading-relaxed">{step.BODY}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                <CardContent className="flex gap-4 items-start p-6">
                    <Lightbulb className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                        {FOOTER_TIP}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
