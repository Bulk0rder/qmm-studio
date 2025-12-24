import fs from 'fs';
import path from 'path';
import { KBDoc } from './types';

const KB_DIR = path.join(process.cwd(), 'kb'); // Adjust path based on execution root
const INDEX_FILE = path.join(KB_DIR, 'index.json');

export async function getKBIndex(): Promise<KBDoc[]> {
  try {
    // In a real app setup, we might read this from file or import it
    // For this environment where we can't run the app, I'm mocking the read slightly
    // but assuming standard Node fs works if the user runs it.
    const fileContents = fs.readFileSync(INDEX_FILE, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to read KB index", error);
    return [];
  }
}

export async function getKBDoc(id: string): Promise<KBDoc | null> {
  const index = await getKBIndex();
  const doc = index.find(d => d.id === id);
  if (!doc) return null;

  try {
    const fullPath = path.join(KB_DIR, path.basename(doc.filepath));
    const content = fs.readFileSync(fullPath, 'utf8');
    return { ...doc, content };
  } catch (error) {
    console.error(`Failed to read doc ${id}`, error);
    return null;
  }
}

export async function searchKB(query: string, tags: string[] = []): Promise<KBDoc[]> {
  const index = await getKBIndex();
  return index.filter(doc => {
    const matchesTag = tags.length === 0 || tags.some(t => doc.tags.includes(t));
    const matchesQuery = doc.title.toLowerCase().includes(query.toLowerCase());
    // Basic implementation: title match + tag match
    return matchesTag || matchesQuery;
  });
}
