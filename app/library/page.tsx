import React from 'react';
import ScenarioLibraryClient from '@/components/ScenarioLibraryClient';
import { getScenarios, GUEST_WORKSPACE_ID } from '@/lib/storage';

import { BackButton } from '@/components/ui/BackButton';

export default function LibraryPage() {
    const scenarios = getScenarios(GUEST_WORKSPACE_ID);
    return (
        <div className="max-w-7xl mx-auto p-6">
            <BackButton />
            <ScenarioLibraryClient scenarios={scenarios} />
        </div>
    );
}
