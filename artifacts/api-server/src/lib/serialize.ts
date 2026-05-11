type Row = Record<string, unknown>;

function serializeValue(v: unknown): unknown {
  if (v instanceof Date) return v.toISOString();
  return v;
}

export function serializeRow<T extends Row>(row: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k] = serializeValue(v);
  }
  return out;
}

export function serializeRows<T extends Row>(rows: T[]): Record<string, unknown>[] {
  return rows.map(serializeRow);
}
