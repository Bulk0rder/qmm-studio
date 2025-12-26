import { KBDoc } from './types';
import fs from 'fs/promises';
import path from 'path';

const KB_DIR = path.join(process.cwd(), 'data', 'kb');

// Helper to parse frontmatter simple style
function parseDoc(filename: string, content: string): KBDoc {
  const parts = content.split('---');
  // parts[0] is empty, parts[1] is frontmatter, parts[2] is body
  // If no frontmatter, treat whole thing as body

  let metadata: any = {};
  let body = content;

  if (parts.length >= 3) {
    const fm = parts[1];
    body = parts.slice(2).join('---').trim();

    fm.split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val) {
        const k = key.trim();
        let v = val.join(':').trim();

        // simple array handling [a, b]
        if (v.startsWith('[') && v.endsWith(']')) {
          metadata[k] = v.slice(1, -1).split(',').map((s: string) => s.trim());
        } else {
          metadata[k] = v;
        }
      }
    });
  }

  return {
    id: filename.replace('.md', ''),
    title: metadata.title || filename.replace('.md', ''),
    type: metadata.type || 'General',
    tags: metadata.tags || [],
    filepath: `/kb/${filename}`,
    risk_level: metadata.risk_level || 'low',
    content: body
  };
}

export async function listDocs(): Promise<KBDoc[]> {
  try {
    const files = await fs.readdir(KB_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    const docs = await Promise.all(mdFiles.map(async f => {
      const content = await fs.readFile(path.join(KB_DIR, f), 'utf-8');
      return parseDoc(f, content);
    }));

    return docs;
  } catch (error) {
    console.error("Failed to list KB docs:", error);
    return [];
  }
}

export async function getKBDoc(id: string): Promise<KBDoc | undefined> {
  try {
    const docs = await listDocs();
    return docs.find(d => d.id === id);
  } catch (error) {
    return undefined;
  }
}

// Keeping searchMock for compatibility but wiring it to real docs
export async function searchKB(query: string, tags: string[] = []): Promise<KBDoc[]> {
  const docs = await listDocs();

  if (!query && tags.length === 0) return docs;

  return docs.filter(doc => {
    const q = query.toLowerCase();
    const textMatch = doc.title.toLowerCase().includes(q) || doc.content.toLowerCase().includes(q);
    const tagMatch = tags.length > 0 ? tags.some(t => doc.tags.includes(t)) : false;
    return textMatch || tagMatch;
  });
}
