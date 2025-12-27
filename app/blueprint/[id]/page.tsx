'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { storage, STORAGE_KEYS } from '@/lib/storage-client';
import { Blueprint } from '@/lib/types';
import BlueprintClientView from '@/components/BlueprintClientView';
import { PageShell } from '@/components/layout/PageShell';
import { BackButton } from '@/components/ui/BackButton';

export default function BlueprintPage() {
    const params = useParams();
    const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;

        const allBlueprints = storage.get<Blueprint[]>(STORAGE_KEYS.BLUEPRINTS) || [];
        const found = allBlueprints.find(b => b.id === params.id as string);

        if (found) {
            setBlueprint(found);
        }
        setLoading(false);
    }, [params.id]);

    if (loading) {
        return (
            <PageShell>
                <div className="flex h-[50vh] items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app"></div>
                </div>
            </PageShell>
        );
    }

    if (!blueprint) {
        return (
            <PageShell>
                <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                    <h1 className="text-2xl font-bold">Blueprint Not Found</h1>
                    <p className="text-muted">The blueprint you are looking for does not exist or has been deleted.</p>
                    <BackButton />
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell>
            <BlueprintClientView blueprint={blueprint} />
        </PageShell>
    );
}

