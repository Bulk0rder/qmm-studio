'use client';

import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebaseUser, firestoreDb, isFirebaseConfigured } from '@/lib/firebase-client';
import { STORAGE_KEYS } from '@/lib/storage-client';

const collectionByKey: Record<string, string> = {
    [STORAGE_KEYS.SCENARIOS]: 'scenarios',
    [STORAGE_KEYS.BLUEPRINTS]: 'blueprints',
    [STORAGE_KEYS.EXPERIMENTS]: 'experiments',
    [STORAGE_KEYS.KNOWN_WINNERS]: 'knownWinners',
};

function getDocumentId(item: any, fallbackPrefix: string, index: number) {
    return item?.id || item?.scenario_id || item?.blueprint_id || item?.experiment_id || `${fallbackPrefix}-${index}`;
}

export async function syncCacheKey(key: string, value: unknown) {
    const db = firestoreDb;
    if (!isFirebaseConfigured || !db) return;

    const collection = collectionByKey[key];
    if (!collection) return;

    const user = await getFirebaseUser();
    if (!user) return;

    const records = Array.isArray(value) ? value : [value];
    await Promise.all(records.map((record, index) => {
        const id = getDocumentId(record, collection, index);
        return setDoc(
            doc(db, 'users', user.uid, collection, id),
            {
                ...(record as Record<string, unknown>),
                updatedAt: serverTimestamp(),
                isSeeded: Boolean((record as any)?.seeded),
            },
            { merge: true }
        );
    }));
}
