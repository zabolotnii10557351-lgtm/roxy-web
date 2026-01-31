import { handleLemonWebhook } from "@/server/lemon/handler";

export async function POST(req: Request) {
  return handleLemonWebhook(req);
}
