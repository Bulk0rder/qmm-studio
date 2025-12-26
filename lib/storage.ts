import fs from 'fs';
import path from 'path';
import { Blueprint, Scenario, Experiment, WorkspaceSettings } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
export const WORKSPACES_DIR = path.join(DATA_DIR, 'workspaces');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure base directories exist
if (!fs.existsSync(WORKSPACES_DIR)) {
    fs.mkdirSync(WORKSPACES_DIR, { recursive: true });
}

export const GUEST_WORKSPACE_ID = 'guest-workspace';

// --- Paths & Helpers ---

export function getWorkspacePath(workspaceId: string): string {
    const dir = path.join(WORKSPACES_DIR, workspaceId);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
}

function getFilePath(workspaceId: string, filename: string): string {
    return path.join(getWorkspacePath(workspaceId), filename);
}

function readJSON<T>(workspaceId: string, filename: string, defaultValue: T): T {
    const filePath = getFilePath(workspaceId, filename);
    if (!fs.existsSync(filePath)) return defaultValue;
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
        console.error(`Error reading ${filename} for workspace ${workspaceId}`, e);
        return defaultValue;
    }
}

function writeJSON<T>(workspaceId: string, filename: string, data: T): void {
    const filePath = getFilePath(workspaceId, filename);
    // Atomic-ish write: strictly synchronous write
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// --- Users (Global) ---
export interface UserRecord {
    id: string; // same as workspaceId for simple one-to-one mapping
    workspaceName: string;
    pinHash: string;
    displayName: string;
    createdAt: string;
}

export function getUser(workspaceName: string): UserRecord | undefined {
    if (!fs.existsSync(USERS_FILE)) return undefined;
    try {
        const users: UserRecord[] = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
        return users.find(u => u.workspaceName === workspaceName);
    } catch {
        return undefined;
    }
}

export function saveUser(user: UserRecord) {
    let users: UserRecord[] = [];
    if (fs.existsSync(USERS_FILE)) {
        try {
            users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
        } catch { }
    }
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


// --- Scenarios ---

export function getScenarios(workspaceId: string = GUEST_WORKSPACE_ID): Scenario[] {
    return readJSON<Scenario[]>(workspaceId, 'scenarios.json', []);
}

export function saveScenario(scenario: Scenario, workspaceId: string = GUEST_WORKSPACE_ID): void {
    const scenarios = getScenarios(workspaceId);
    const index = scenarios.findIndex(s => s.id === scenario.id);

    if (index >= 0) {
        scenarios[index] = scenario;
    } else {
        scenarios.push(scenario);
    }

    writeJSON(workspaceId, 'scenarios.json', scenarios);
    saveAuditLog(workspaceId, 'SCENARIO_SAVED', `Saved scenario ${scenario.title}`);
}

export function getScenarioById(id: string, workspaceId: string = GUEST_WORKSPACE_ID): Scenario | undefined {
    return getScenarios(workspaceId).find(s => s.id === id);
}

// --- Blueprints ---

export function getBlueprints(workspaceId: string = GUEST_WORKSPACE_ID): Blueprint[] {
    return readJSON<Blueprint[]>(workspaceId, 'blueprints.json', []);
}

export function saveBlueprint(blueprint: Blueprint, workspaceId: string = GUEST_WORKSPACE_ID): void {
    const blueprints = getBlueprints(workspaceId);
    // Ensure blueprint has workspace_id set correctly
    blueprint.workspace_id = workspaceId;

    const index = blueprints.findIndex(b => b.id === blueprint.id);
    if (index >= 0) {
        blueprints[index] = blueprint;
    } else {
        blueprints.push(blueprint);
    }

    writeJSON(workspaceId, 'blueprints.json', blueprints);
    saveAuditLog(workspaceId, 'BLUEPRINT_SAVED', `Saved blueprint ${blueprint.id}`);
}

export function getBlueprintById(id: string, workspaceId: string = GUEST_WORKSPACE_ID): Blueprint | undefined {
    return getBlueprints(workspaceId).find(b => b.id === id);
}

// --- Experiments ---

export function getExperiments(workspaceId: string = GUEST_WORKSPACE_ID): Experiment[] {
    return readJSON<Experiment[]>(workspaceId, 'experiments.json', []);
}

export function saveExperiment(experiment: Experiment, workspaceId: string = GUEST_WORKSPACE_ID): void {
    const experiments = getExperiments(workspaceId);
    const index = experiments.findIndex(e => e.id === experiment.id);

    if (index >= 0) {
        experiments[index] = experiment;
    } else {
        experiments.push(experiment);
    }

    writeJSON(workspaceId, 'experiments.json', experiments);
    saveAuditLog(workspaceId, 'EXPERIMENT_SAVED', `Saved experiment ${experiment.id}`);
}

// --- Settings ---

export function getSettings(workspaceId: string = GUEST_WORKSPACE_ID): WorkspaceSettings {
    const defaults: WorkspaceSettings = {
        workspace_id: workspaceId,
        display_name: 'Guest User',
        theme_preference: 'system',
        defaults: {
            market: 'Global',
            industry: 'General',
            currency: 'USD'
        }
    };
    return readJSON<WorkspaceSettings>(workspaceId, 'settings.json', defaults);
}

export function saveSettings(settings: WorkspaceSettings, workspaceId: string = GUEST_WORKSPACE_ID): void {
    writeJSON(workspaceId, 'settings.json', settings);
}

// --- Audit Log ---

interface AuditEntry {
    timestamp: string;
    action: string;
    details: string;
}

export function saveAuditLog(workspaceId: string, action: string, details: string): void {
    const logs = readJSON<AuditEntry[]>(workspaceId, 'audit.json', []);
    logs.push({
        timestamp: new Date().toISOString(),
        action,
        details
    });
    // Keep last 1000 logs
    if (logs.length > 1000) logs.shift();
    writeJSON(workspaceId, 'audit.json', logs);
}

// --- Migration / Init ---
export function initializeGuestWorkspace() {
    getWorkspacePath(GUEST_WORKSPACE_ID);
}
