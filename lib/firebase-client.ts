'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

export const firebaseApp = isFirebaseConfigured
    ? getApps()[0] || initializeApp(firebaseConfig)
    : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const firestoreDb = firebaseApp ? getFirestore(firebaseApp) : null;

let authPromise: Promise<User | null> | null = null;

export function getFirebaseUser(): Promise<User | null> {
    if (!firebaseAuth) return Promise.resolve(null);
    if (authPromise) return authPromise;

    authPromise = new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
            unsubscribe();
            if (user) {
                resolve(user);
                return;
            }

            try {
                const credential = await signInAnonymously(firebaseAuth);
                resolve(credential.user);
            } catch (error) {
                console.error('Firebase anonymous auth failed', error);
                resolve(null);
            }
        });
    });

    return authPromise;
}
