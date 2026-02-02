type Semver = number[];

function parseSemver(input: string): Semver | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const noPrefix = trimmed.startsWith('v') || trimmed.startsWith('V') ? trimmed.slice(1) : trimmed;
  const core = noPrefix.split('-')[0].split('+')[0].trim();
  if (!core) return null;

  const parts = core.split('.');
  const numbers: number[] = [];

  for (const part of parts) {
    if (!part.length) return null;
    if (!/^[0-9]+$/.test(part)) return null;
    numbers.push(Number.parseInt(part, 10));
  }

  return numbers;
}

export function compareSemver(a: string, b: string): number | null {
  const av = parseSemver(a);
  const bv = parseSemver(b);
  if (!av || !bv) return null;

  const maxLen = Math.max(av.length, bv.length);
  for (let i = 0; i < maxLen; i++) {
    const ai = av[i] ?? 0;
    const bi = bv[i] ?? 0;
    if (ai < bi) return -1;
    if (ai > bi) return 1;
  }

  return 0;
}

export function isUpdateRequired(appVersion: string | undefined, minVersion: string): boolean {
  if (!appVersion) return false;
  const cmp = compareSemver(appVersion, minVersion);
  if (cmp == null) return false;
  return cmp < 0;
}
