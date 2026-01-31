import crypto from "crypto";

export function verifyLemonWebhookSignature(params: {
  rawBody: string;
  signatureHeader: string | null;
}) {
  const secret = process.env.LEMON_WEBHOOK_SECRET ?? process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("Missing env var: LEMON_WEBHOOK_SECRET (or legacy LEMONSQUEEZY_WEBHOOK_SECRET)");
  }

  const header = (params.signatureHeader ?? "").trim();
  if (!header) return false;

  // Lemon signature is HMAC-SHA256 hex of raw body.
  // Some implementations send `sha256=<hex>`.
  const signatureHex = header.toLowerCase().startsWith("sha256=")
    ? header.slice("sha256=".length).trim()
    : header;

  // Basic validation to avoid throwing in Buffer.from.
  if (!/^[0-9a-fA-F]+$/.test(signatureHex) || signatureHex.length % 2 !== 0) {
    return false;
  }

  const expectedHex = crypto
    .createHmac("sha256", secret)
    .update(params.rawBody, "utf8")
    .digest("hex");

  if (signatureHex.length !== expectedHex.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHex, "hex"),
      Buffer.from(expectedHex, "hex")
    );
  } catch {
    return false;
  }
}

export function getLemonEventMeta(payload: unknown): {
  eventId: string;
  eventType: string;
  customData: Record<string, unknown>;
} {
  const p = (payload ?? {}) as Record<string, unknown>;
  const meta = (p.meta ?? {}) as Record<string, unknown>;

  const eventId = String(meta.event_id ?? meta.id ?? "");
  const eventType = String(meta.event_name ?? meta.event_type ?? meta.type ?? "");
  const customData = (meta.custom_data ?? meta.custom ?? {}) as Record<string, unknown>;

  return { eventId, eventType, customData };
}
