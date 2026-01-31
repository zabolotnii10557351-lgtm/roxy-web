export const runtime = "nodejs";

import { handleLemonWebhook } from "@/server/lemon/handler";

export async function POST(request: Request) {
  return handleLemonWebhook(request);
}
