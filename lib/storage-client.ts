export const STORAGE_KEYS = {
    SCENARIOS: 'qmm_scenarios',
    EXPERIMENTS: 'qmm_experiments',
    BLUEPRINTS: 'qmm_blueprints',
    KB_CUSTOM: 'qmm_kb_custom',
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
