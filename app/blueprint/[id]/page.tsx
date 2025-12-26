import React from 'react';
import { notFound } from 'next/navigation';
import { getBlueprintById } from '@/lib/storage';
import { Blueprint } from '@/lib/types';
import BlueprintClientView from '@/components/BlueprintClientView';

export default function BlueprintPage({ params }: { params: { id: string } }) {
    const blueprint = getBlueprintById(params.id) as Blueprint | undefined;

    if (!blueprint) {
        notFound();
    }

    return <BlueprintClientView blueprint={blueprint} />;
}

