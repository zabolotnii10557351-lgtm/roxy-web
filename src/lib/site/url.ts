export function getSiteUrl(): string {
  const v = process.env.NEXT_PUBLIC_SITE_URL;
  if (v && v.startsWith("http")) return v.replace(/\/$/, "");
  return "http://localhost:3000";
}
