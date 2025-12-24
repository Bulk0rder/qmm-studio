
import fs from 'fs';
import path from 'path';
import { GeneratedBlueprint } from './types';


const DATA_DIR = path.join(process.cwd(), 'data');
const BLUEPRINTS_FILE = path.join(DATA_DIR, 'blueprints.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredBlueprint extends GeneratedBlueprint {
    id: string;
    createdAt: string;
}

function getBlueprints(): StoredBlueprint[] {
    if (!fs.existsSync(BLUEPRINTS_FILE)) {
        return [];
    }
    try {
        const fileContent = fs.readFileSync(BLUEPRINTS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading blueprints file:", error);
        return [];
    }
}

export function saveBlueprint(blueprint: GeneratedBlueprint): string {
    const blueprints = getBlueprints();
    const newBlueprint: StoredBlueprint = {
        ...blueprint,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        createdAt: new Date().toISOString(),
    };

    blueprints.push(newBlueprint);
    fs.writeFileSync(BLUEPRINTS_FILE, JSON.stringify(blueprints, null, 2));

    return newBlueprint.id;
}

export function getBlueprintById(id: string): StoredBlueprint | undefined {
    const blueprints = getBlueprints();
    return blueprints.find(b => b.id === id);
}
