import { promises as fs } from 'fs';
import path from 'path';

interface EmbedShowcaseItem {
  name: string;
  url: string;
  calculator: string;
  note: string;
}

interface EmbedPartnerLogo {
  name: string;
  logo: string;
}

// Fully literal paths — these helpers run in server components only. The
// previous implementation fetched the files over HTTP with a relative URL,
// which throws in Node (no base URL) — the calculator-widgets page silently
// lost its server-side render because of it.
const SHOWCASE_PATH = path.join(process.cwd(), 'public', 'data', 'embedShowcase.json');
const PARTNERS_PATH = path.join(process.cwd(), 'public', 'data', 'embedPartners.json');

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getEmbedShowcase(): Promise<EmbedShowcaseItem[]> {
  return (await readJsonFile<EmbedShowcaseItem[]>(SHOWCASE_PATH)) ?? [];
}

export async function getEmbedPartners(): Promise<EmbedPartnerLogo[]> {
  return (await readJsonFile<EmbedPartnerLogo[]>(PARTNERS_PATH)) ?? [];
}
