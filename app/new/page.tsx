'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Label, Textarea } from '@/components/ui/Input';

export default function IntakePage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            situation: (document.getElementById('situation') as HTMLTextAreaElement).value,
            industry: (document.getElementById('industry') as HTMLInputElement).value,
            objective: (document.getElementById('objective') as HTMLInputElement).value,
            risk_level: (document.getElementById('risk') as HTMLSelectElement).value,
            constraints: [] // Default for now
        };

        try {
            const res = await fetch('/api/blueprints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to generate blueprint");

            const data = await res.json();
            // Redirect to the blueprint page
            window.location.href = `/blueprint/${data.id}`;
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error generating blueprint. Check console.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">New Mission</h1>
                <p className="text-gray-600">Tell us what's happening. The QMM engine will prescribe the path.</p>
                {/* Rebuild Trigger */}
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="situation">What's happening? (The Scenario)</Label>
                                <Textarea
                                    id="situation"
                                    placeholder="e.g. 'Competitor just dropped prices by 50% and we are losing churn.'"
                                    className="h-32 text-base"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input id="industry" placeholder="e.g. Fintech, Retail" />
                                </div>
                                <div>
                                    <Label htmlFor="risk">Compliance Risk</Label>
                                    <select id="risk" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                        <option value="low">Low (Standard)</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High (Banking/Health)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="objective">Primary Objective</Label>
                                <Input id="objective" placeholder="e.g. Stop the bleeding within 30 days." />
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? 'Analyzing KB...' : 'Generate QMM Blueprint'}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
