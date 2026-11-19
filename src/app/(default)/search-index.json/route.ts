import { buildSearchIndex } from '@/lib/searchIndex';

export const dynamic = 'force-static';

export function GET(): Response {
  return Response.json(buildSearchIndex());
}
