export const STORAGE_KEYS = {
    SCENARIOS: 'qmm_scenarios',
    EXPERIMENTS: 'qmm_experiments',
    BLUEPRINTS: 'qmm_blueprints',
    KB_CUSTOM: 'qmm_kb_custom',
    ACTIVE_BLUEPRINT: 'qmm_active_blueprint',
    KNOWN_WINNERS: 'qmm_known_winners',
    STRATEGY_SCORE: 'qmm_strategy_score',
    SEED_VERSION: 'qmm_seed_version',
    SYNC_STATUS: 'qmm_sync_status',
    WORKSPACE_ID: 'qmm_workspace_id',
};

// Safe wrapper for localStorage
export const storage = {
    get: <T>(key: string): T | null => {
        if (typeof window === 'undefined') return null;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return null;
        }
    },
    set: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage', error);
        }
    },
    remove: (key: string): void => {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    }
};

export const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return;
    const posthog = (window as any).posthog;
    if (posthog?.capture) {
        posthog.capture(eventName, properties);
        return;
    }

    const events = storage.get<any[]>('qmm_analytics_queue') || [];
    storage.set('qmm_analytics_queue', [
        ...events.slice(-49),
        { eventName, properties, capturedAt: new Date().toISOString() },
    ]);
};

export const writeThroughCache = <T>(key: string, value: T) => {
    storage.set(key, value);
    if (typeof window === 'undefined') return;

    storage.set(STORAGE_KEYS.SYNC_STATUS, 'syncing');
    import('./cloud-sync')
        .then(({ syncCacheKey }) => syncCacheKey(key, value))
        .then(() => storage.set(STORAGE_KEYS.SYNC_STATUS, 'synced'))
        .catch((error) => {
            console.error('Cloud sync failed', error);
            storage.set(STORAGE_KEYS.SYNC_STATUS, 'error');
        });
};
