'use client';

import { useEffect } from 'react';
import { seedSampleData } from '@/lib/scenario-service';
import { SEED_VERSION } from '@/lib/seed-data';
import { storage, STORAGE_KEYS, trackEvent } from '@/lib/storage-client';

export function AutoSeed() {
    useEffect(() => {
        const currentSeed = storage.get<string>(STORAGE_KEYS.SEED_VERSION);
        storage.set(STORAGE_KEYS.SYNC_STATUS, storage.get<string>(STORAGE_KEYS.SYNC_STATUS) || 'synced');

        if (currentSeed !== SEED_VERSION) {
            seedSampleData(15).then(() => {
                storage.set(STORAGE_KEYS.SEED_VERSION, SEED_VERSION);
                const blueprints = storage.get<any[]>(STORAGE_KEYS.BLUEPRINTS) || [];
                if (blueprints.length > 0 && !storage.get(STORAGE_KEYS.ACTIVE_BLUEPRINT)) {
                    storage.set(STORAGE_KEYS.ACTIVE_BLUEPRINT, blueprints[blueprints.length - 1]);
                }
                trackEvent('sample_memory_seeded', { seedVersion: SEED_VERSION });
            });
        }
    }, []);

    return null;
}
