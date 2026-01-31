type LemonApiMode = "test" | "live";

function getMode(): LemonApiMode {
  const mode = (process.env.LEMON_MODE ?? "test").toLowerCase();
  return mode === "live" ? "live" : "test";
}

function getBaseUrl() {
  // Lemon API base is the same; mode affects which credentials/store are used.
  return "https://api.lemonsqueezy.com/v1";
}

function requiredEnvAny(names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`Missing env var: ${names.join(" or ")}`);
}

export function getLemonApiHeaders() {
  const apiKey = requiredEnvAny(["LEMON_API_KEY", "LEMONSQUEEZY_API_KEY"]);
  return {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    "X-Api-Version": "2023-10-16",
    "User-Agent": `roxy-web/${getMode()}`,
  } as const;
}

export async function lemonFetch(path: string, init: RequestInit): Promise<unknown> {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...getLemonApiHeaders(),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lemon API error (${res.status}): ${text.slice(0, 800)}`);
  }

  return (await res.json()) as unknown;
}

export async function createLemonCheckout(params: {
  variantId: string;
  successUrl: string;
  cancelUrl: string;
  customData: Record<string, unknown>;
  customerId?: string | null;
  email?: string | null;
}): Promise<{ url: string; raw: unknown }> {
  const storeId = requiredEnvAny(["LEMON_STORE_ID", "LEMONSQUEEZY_STORE_ID"]);

  // Creates a checkout for a variant. Lemon will handle price/interval per variant.
  const payload = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          custom: {
            ...params.customData,
            cancelUrl: params.cancelUrl,
          },
          email: params.email ?? undefined,
        },
        product_options: {
          redirect_url: params.successUrl,
          receipt_thank_you_note: "Thanks! Your purchase will sync shortly.",
        },
        checkout_options: {
          embed: false,
          media: false,
        },
        preview: false,
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: String(storeId),
          },
        },
        variant: {
          data: {
            type: "variants",
            id: String(params.variantId),
          },
        },
        ...(params.customerId
          ? {
              customer: {
                data: {
                  type: "customers",
                  id: String(params.customerId),
                },
              },
            }
          : {}),
      },
    },
  };

  const jsonUnknown = await lemonFetch("/checkouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const json = jsonUnknown as Record<string, unknown>;
  const data = (json.data ?? {}) as Record<string, unknown>;
  const attributes = (data.attributes ?? {}) as Record<string, unknown>;
  const url = attributes.url;

  if (typeof url !== "string" || !url) {
    throw new Error("Lemon checkout URL missing in response.");
  }

  return { url, raw: jsonUnknown };
}
