import { handleStripeWebhook } from "@/server/stripe/handler";

export async function POST(req: Request) {
  return handleStripeWebhook(req);
}
