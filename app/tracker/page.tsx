'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function TrackerPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Experiment Tracker</h1>
                <Button>Log New Result</Button>
                {/* Rebuild Trigger */}
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-700">12</div>
                        <div className="text-sm text-blue-600">Active Experiments</div>
                    </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-700">5</div>
                        <div className="text-sm text-green-600">Validated Winners</div>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-100">
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-700">3</div>
                        <div className="text-sm text-red-600">Failed (Learning)</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Active Log</h2>
                <Card>
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                <div className="space-y-1">
                                    <div className="font-medium">Test #{100 + i}: Email Subject Line A/B</div>
                                    <div className="text-sm text-gray-500">Hypothesis: Curiosity beats Urgency.</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold uppercase text-yellow-600 bg-yellow-50 px-2 py-1 rounded">In Progress</span>
                                    <Button variant="ghost" size="sm">Update</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
