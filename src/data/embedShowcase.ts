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

/**
 * Read a JSON data file from public/ directly off the filesystem.
 *
 * These helpers run in server components only. The previous implementation
 * fetched the files over HTTP with a relative URL, which throws in Node
 * (no base URL) — the calculator-widgets page silently lost its server-side
 * render because of it.
 */
async function readJsonFromPublic<T>(relativePath: string): Promise<T | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', relativePath);
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getEmbedShowcase(): Promise<EmbedShowcaseItem[]> {
  return (await readJsonFromPublic<EmbedShowcaseItem[]>('data/embedShowcase.json')) ?? [];
}

export async function getEmbedPartners(): Promise<EmbedPartnerLogo[]> {
  return (await readJsonFromPublic<EmbedPartnerLogo[]>('data/embedPartners.json')) ?? [];
}
