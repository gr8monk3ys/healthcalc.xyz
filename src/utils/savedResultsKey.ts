function stableStringify(value: unknown): string {
  if (value === null || value === undefined) return 'null';

  const type = typeof value;
  if (type === 'number' || type === 'boolean' || type === 'string') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (type === 'object') {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    const entries = keys.map(key => `${JSON.stringify(key)}:${stableStringify(record[key])}`);
    return `{${entries.join(',')}}`;
  }

  // Fallback for functions/symbols/etc.
  return JSON.stringify(String(value));
}

function hashString(input: string): number {
  // Simple deterministic 32-bit hash (djb2-like).
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0; // unsigned
}

export function computeSavedResultKey(
  calculatorType: string,
  data: Record<string, unknown>
): string {
  const normalizedType = calculatorType.trim().toLowerCase();
  const dataString = stableStringify(data);
  const digest = hashString(`${normalizedType}:${dataString}`).toString(36);
  return `${normalizedType}-${digest}`;
}
