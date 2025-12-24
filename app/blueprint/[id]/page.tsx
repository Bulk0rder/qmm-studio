import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getBlueprintById } from '@/lib/storage';

export default function BlueprintPage({ params }: { params: { id: string } }) {
    const blueprint = getBlueprintById(params.id);

    if (!blueprint) {
        notFound();
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold">Quantum Blueprint</h1>
                    <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${blueprint.source === 'retrieval' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            Source: {blueprint.source}
                        </span>
                        {blueprint.used_scenarios.length > 0 && <span className="text-sm text-gray-500">Based on {blueprint.used_scenarios.length} verified scenarios</span>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline">Export PDF</Button>
                    <Button>Save to Library</Button>
                </div>
            </div>

            {/* A. Diagnosis & B. Map */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>A. Diagnosis</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase">Primary Constraint</label>
                            <p className="font-medium">{blueprint.diagnosis.constraint}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase">Behavioral Barrier</label>
                            <p className="font-medium text-red-600">{blueprint.diagnosis.behavioral_barrier}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-50 border-slate-200">
                    <CardHeader><CardTitle>B. Quantum Mapping</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {blueprint.quantum_mapping.principles.map(p => (
                                <span key={p} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm font-semibold">{p}</span>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">{blueprint.quantum_mapping.rationale}</p>
                    </CardContent>
                </Card>
            </div>

            {/* C. Options Generator */}
            <div>
                <h2 className="text-xl font-bold mb-4">C. Strategic Options</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="border-t-4 border-t-blue-500">
                        <CardHeader className="pb-2"><CardTitle className="text-sm uppercase text-gray-500">Option 1: Conservative</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-gray-800">{blueprint.options.conservative}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-t-4 border-t-orange-500">
                        <CardHeader className="pb-2"><CardTitle className="text-sm uppercase text-gray-500">Option 2: Aggressive</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-gray-800">{blueprint.options.aggressive}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-t-4 border-t-purple-500 bg-purple-50">
                        <CardHeader className="pb-2"><CardTitle className="text-sm uppercase text-purple-700">Option 3: Weird / Quantum</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-gray-800">{blueprint.options.weird}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* D. Orchestrate & E. Prove */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>D. Orchestration</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Triggers</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {blueprint.orchestration.triggers.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Fallback Paths</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                                {blueprint.orchestration.fallback_paths.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>E. Proof (Experimentation)</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                            <label className="text-xs font-bold text-yellow-800 uppercase">Recommended Method</label>
                            <p className="font-medium text-yellow-900">{blueprint.proof.experiment_type}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-2">KPIs</h4>
                            <div className="flex gap-2">
                                {blueprint.proof.kpis.map((k, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{k}</span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* F. Trust & Ethics */}
            <Card className="border border-green-200 bg-green-50/30">
                <CardHeader><CardTitle className="flex items-center gap-2"><span className="text-green-600">🛡</span> F. Trust & Governance</CardTitle></CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <h4 className="font-bold text-gray-700">Bias Check</h4>
                        <p className="text-gray-600">{blueprint.trust_framework.bias_check}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700">Explainability</h4>
                        <p className="text-gray-600">{blueprint.trust_framework.explainability_note}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700">Data Manifesto</h4>
                        <p className="text-gray-600">{blueprint.trust_framework.data_manifesto}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Citations Footer */}
            <div className="border-t pt-6 text-sm text-gray-500">
                <h4 className="font-bold mb-2">Knowledge Base Citations</h4>
                <div className="flex gap-2">
                    {blueprint.citations.map(c => (
                        <span key={c.id} className="underline cursor-pointer hover:text-blue-600">{c.title}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
