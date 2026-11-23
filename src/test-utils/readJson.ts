/** Parses a response body as a JSON object so tests can assert on its fields without casting. */
export async function readJson(res: {
  json(): Promise<unknown>;
}): Promise<Record<string, unknown>> {
  const body = await res.json();
  if (typeof body !== 'object' || body === null) {
    throw new TypeError('Expected a JSON object body');
  }
  return Object.fromEntries(Object.entries(body));
}
