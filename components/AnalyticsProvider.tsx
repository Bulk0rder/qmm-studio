'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { getFirebaseUser } from '@/lib/firebase-client';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const enabled = Boolean(posthogKey);

    useEffect(() => {
        if (!enabled || posthog.__loaded) return;

        posthog.init(posthogKey!, {
            api_host: posthogHost,
            capture_pageview: false,
            capture_pageleave: true,
            persistence: 'localStorage+cookie',
            session_recording: {
                maskAllInputs: true,
                maskInputOptions: { textarea: true, password: true },
            },
        });

        getFirebaseUser().then((user) => {
            if (!user) return;
            posthog.identify(user.uid, {
                email: user.email,
                isAnonymous: user.isAnonymous,
            });
        });
    }, [enabled]);

    useEffect(() => {
        if (!enabled || !posthog.__loaded) return;
        const query = searchParams.toString();
        posthog.capture('$pageview', {
            $current_url: `${window.location.origin}${pathname}${query ? `?${query}` : ''}`,
        });
    }, [enabled, pathname, searchParams]);

    if (!enabled) return <>{children}</>;

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
