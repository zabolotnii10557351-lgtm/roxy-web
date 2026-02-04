import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RegionItem = {
  code: string;
  name: string;
  flagUrl?: string;
};

type GiftCatalogItem = {
  id: string;
  name: string;
  cost: number;
  imageUrl?: string;
};

type CatalogResponse = {
  ok: true;
  source: "streamtoearn" | "fallback";
  region: string;
  lastUpdate?: string;
  regions: RegionItem[];
  gifts: GiftCatalogItem[];
};

const FALLBACK_REGIONS: RegionItem[] = [
  { code: "US", name: "United States of America" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "BR", name: "Brazil" },
  { code: "TR", name: "Türkiye" },
  { code: "ID", name: "Indonesia" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "RU", name: "Russian Federation" },
  { code: "UA", name: "Ukraine" },
];

const FALLBACK_GIFTS: GiftCatalogItem[] = [
  {
    id: "rose",
    name: "Rose",
    cost: 1,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp",
  },
  {
    id: "tiktok",
    name: "TikTok",
    cost: 1,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/802a21ae29f9fae5abe3693de9f874bd~tplv-obj.webp",
  },
  {
    id: "hand_hearts",
    name: "Hand Hearts",
    cost: 100,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/6cd022271dc4669d182cad856384870f~tplv-obj.webp",
  },
  {
    id: "money_gun",
    name: "Money Gun",
    cost: 500,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/e0589e95a2b41970f0f30f6202f5fce6~tplv-obj.webp",
  },
  {
    id: "sports_car",
    name: "Sports Car",
    cost: 7000,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/e7ce188da898772f18aaffe49a7bd7db~tplv-obj.webp",
  },
  {
    id: "lion",
    name: "Lion",
    cost: 26999,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/4fb89af2082a290b37d704e20f4fe729~tplv-obj.webp",
  },
  {
    id: "tiktok_universe",
    name: "TikTok Universe",
    cost: 44999,
    imageUrl:
      "https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/8f471afbcebfda3841a6cc515e381f58~tplv-obj.webp",
  },
];

function decodeHtmlEntities(input: string) {
  let s = input;
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/&#39;/g, "'");
  s = s.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/\s+/g, " ");
  return s.trim();
}

function normalizeGiftKey(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\s_-]+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function giftIdFromName(name: string) {
  const n = name
    .toLowerCase()
    .trim()
    .replace(/[\u00a0']/g, "")
    .replace(/\s+/g, " ");
  const base = n.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return base.length > 0 ? base : normalizeGiftKey(name);
}

function normalizeRegionCode(region: string | null) {
  const raw = (region ?? "").trim();
  if (raw.length === 0) return "US";
  if (raw.toLowerCase() === "global") return "US";

  const legacy: Record<string, string> = {
    us: "US",
    uk: "GB",
    eu: "DE",
    br: "BR",
    tr: "TR",
    id: "ID",
    jp: "JP",
    kr: "KR",
  };

  const low = raw.toLowerCase();
  if (legacy[low]) return legacy[low];

  if (/^[a-z]{2}$/i.test(raw)) return raw.toUpperCase();
  return "US";
}

async function fetchHtml(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch gift catalog (${res.status})`);
  }
  return await res.text();
}

function parseLastUpdate(html: string) {
  const m = html.match(/Last\s+Update:\s*([^<\n\r]+)/i);
  return m?.[1]?.trim();
}

function parseRegions(html: string): RegionItem[] {
  const regions: RegionItem[] = [];
  const re = /<a\s+href="\?region=([A-Z]{2})"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?([\s\S]*?)<\/a>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const code = match[1];
    const flagUrl = match[2];
    const nameRaw = match[3].replace(/<[^>]+>/g, " ");
    const name = decodeHtmlEntities(nameRaw);

    if (!code || !name) continue;
    if (regions.some((r) => r.code === code)) continue;
    regions.push({ code, name, flagUrl });
  }

  return regions.length > 0 ? regions : FALLBACK_REGIONS;
}

function parseGifts(html: string): GiftCatalogItem[] {
  const gifts: GiftCatalogItem[] = [];

  const re = /<div\s+class="gift">[\s\S]*?<img\s+src="([^"]+)"\s+alt="([^"]*)"[\s\S]*?<p\s+class="gift-name">([\s\S]*?)<\/p>[\s\S]*?<p\s+class="gift-price">\s*([0-9]+)\s*[\s\S]*?<\/p>[\s\S]*?<\/div>/g;

  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const imageUrl = match[1];
    const alt = decodeHtmlEntities(match[2] ?? "");
    const nameRaw = match[3].replace(/<[^>]+>/g, " ");
    const name = decodeHtmlEntities(nameRaw) || alt;
    const cost = Number(match[4]);

    if (!name || !Number.isFinite(cost)) continue;

    const id = giftIdFromName(name);
    const key = `${normalizeGiftKey(name)}:${cost}`;
    if (gifts.some((g) => `${normalizeGiftKey(g.name)}:${g.cost}` === key)) continue;

    gifts.push({ id, name, cost, imageUrl });
  }

  return gifts.length > 0 ? gifts : FALLBACK_GIFTS;
}

type CacheEntry<T> = { at: number; value: T };

const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12h

function getCache() {
  const g = globalThis as unknown as {
    __roxyTikTokGiftCatalogCache?: {
      regions?: CacheEntry<RegionItem[]>;
      byRegion: Map<string, CacheEntry<{ lastUpdate?: string; gifts: GiftCatalogItem[] }>>;
    };
  };

  if (!g.__roxyTikTokGiftCatalogCache) {
    g.__roxyTikTokGiftCatalogCache = {
      byRegion: new Map(),
    };
  }

  return g.__roxyTikTokGiftCatalogCache;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const regionParam = url.searchParams.get("region");
  const region = normalizeRegionCode(regionParam);

  const cache = getCache();
  const now = Date.now();

  try {
    const regionsCached = cache.regions;
    let regions: RegionItem[] | undefined;
    if (regionsCached && now - regionsCached.at < CACHE_TTL_MS) {
      regions = regionsCached.value;
    }

    const regionKey = region;
    const giftsCached = cache.byRegion.get(regionKey);
    if (giftsCached && now - giftsCached.at < CACHE_TTL_MS && regions) {
      const body: CatalogResponse = {
        ok: true,
        source: "streamtoearn",
        region,
        lastUpdate: giftsCached.value.lastUpdate,
        regions,
        gifts: giftsCached.value.gifts,
      };

      return NextResponse.json(body, {
        headers: { "Cache-Control": "public, max-age=300" },
      });
    }

    const catalogUrl = `https://streamtoearn.io/gifts?region=${encodeURIComponent(regionKey)}`;
    const html = await fetchHtml(catalogUrl);

    const parsedRegions = regions ?? parseRegions(html);
    const gifts = parseGifts(html);
    const lastUpdate = parseLastUpdate(html);

    cache.regions = { at: now, value: parsedRegions };
    cache.byRegion.set(regionKey, { at: now, value: { lastUpdate, gifts } });

    const body: CatalogResponse = {
      ok: true,
      source: "streamtoearn",
      region,
      lastUpdate,
      regions: parsedRegions,
      gifts,
    };

    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, max-age=300" },
    });
  } catch {
    const body: CatalogResponse = {
      ok: true,
      source: "fallback",
      region,
      regions: FALLBACK_REGIONS,
      gifts: FALLBACK_GIFTS,
    };

    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  }
}
