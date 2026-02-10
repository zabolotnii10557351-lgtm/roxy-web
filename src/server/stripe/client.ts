import Stripe from "stripe";

let cachedStripe: Stripe | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

export function getStripe(): Stripe {
  if (!cachedStripe) {
    cachedStripe = new Stripe(requiredEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2024-06-20",
    });
  }
  return cachedStripe;
}

export function getStripeWebhookSecret(): string {
  return requiredEnv("STRIPE_WEBHOOK_SECRET");
}
