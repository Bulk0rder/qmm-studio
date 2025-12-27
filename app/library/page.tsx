'use client';

import React, { useEffect, useState } from 'react';
import ScenarioLibraryClient from '@/components/ScenarioLibraryClient';
import { getAllScenarios, seedSampleData } from '@/lib/scenario-service';
import { PageShell } from '@/components/layout/PageShell';
// import { Spinner } from '@/components/ui/Loading';
import { Scenario } from '@/lib/types';

export default function LibraryPage() {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load data on mount
        const data = getAllScenarios();
        setScenarios(data);
        setLoading(false);
    }, []);

    const handleSeed = () => {
        seedSampleData();
        setScenarios(getAllScenarios());
    };

    return (
        <PageShell>
            {loading ? (
                <div className="flex h-[50vh] items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app"></div>
                </div>
            ) : (
                <ScenarioLibraryClient scenarios={scenarios} onSeed={handleSeed} />
            )}
        </PageShell>
    );
}
