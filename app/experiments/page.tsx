import React from 'react';
import { PageShell } from '@/components/layout/PageShell';
import ExperimentsClientView from '@/components/ExperimentsClientView';

export default function ExperimentsPage() {
    return (
        <PageShell>
            <ExperimentsClientView />
        </PageShell>
    );
}
