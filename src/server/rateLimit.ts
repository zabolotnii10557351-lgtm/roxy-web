type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number };

const windows = new Map<string, number[]>();

function nowMs() {
  return Date.now();
}

export function rateLimitSlidingWindow(params: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const { key, limit, windowMs } = params;

  const now = nowMs();
  const windowStart = now - windowMs;

  const existing = windows.get(key) ?? [];
  const filtered = existing.filter((t) => t > windowStart);

  if (filtered.length >= limit) {
    const oldest = filtered[0] ?? now;
    const resetAt = oldest + windowMs;
    windows.set(key, filtered);
    return { ok: false, remaining: 0, resetAt };
  }

  filtered.push(now);
  windows.set(key, filtered);

  const remaining = Math.max(0, limit - filtered.length);
  const oldest = filtered[0] ?? now;
  const resetAt = oldest + windowMs;

  return { ok: true, remaining, resetAt };
}
