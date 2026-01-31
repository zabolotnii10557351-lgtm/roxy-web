import { NextResponse } from "next/server";

function envTrue(value: string | undefined): boolean {
  if (!value) return false;
  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

export async function GET() {
  const polyphoriaEnabled = envTrue(process.env.POLYPHORIA_ENABLED);

  return NextResponse.json({
    polyphoriaEnabled,
  });
}
