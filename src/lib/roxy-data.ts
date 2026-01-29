import type { PlanId } from "@/store/plan-store";

export interface PlanCard {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  badge?: string;
  includedHours: string;
  cta: string;
  features: string[];
}

export const planCards: PlanCard[] = [
  {
    id: "trial",
    name: "Trial",
    price: "€0",
    description: "Preview",
    badge: "Preview",
    includedHours: "60 minutes active speech",
    cta: "Start Trial",
    features: [
      "TikTok: 1 account",
      "Dono rules: up to 10",
      "Scripts: 2 base presets",
      "Watermark always on",
      "Logs: 3 days",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    price: "€19 / month",
    description: "BYOK",
    badge: "BYOK",
    includedHours: "Unlimited (BYOK)",
    cta: "Choose Basic",
    features: [
      "TikTok: 1 account",
      "Dono rules: up to 20",
      "Scripts: up to 3",
      "Watermark always on",
      "Knowledge pack: 3 items",
      "Logs: 7 days",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "€59 / month",
    description: "Best value",
    badge: "Best value",
    includedHours: "10 hours / month",
    cta: "Choose Pro",
    features: [
      "Credits + BYOK",
      "TikTok: up to 5 accounts",
      "Dono rules: up to 200",
      "Scripts: unlimited",
      "Watermark toggle",
      "Auto language",
      "Knowledge pack: 20 items",
      "Logs: 30 days",
      "Export/Import",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    price: "€199 / month",
    description: "For teams",
    badge: "For teams",
    includedHours: "40 hours / month",
    cta: "Contact / Choose Studio",
    features: [
      "Credits + BYOK",
      "Accounts: up to 20",
      "Team seats: 5",
      "Commercial license",
      "Dono rules: up to 1000",
      "Advanced scripts",
      "Watermark toggle",
      "Knowledge pack: 200 items",
      "Logs: 90 days",
      "Priority support",
    ],
  },
];

export const faqs = [
  {
    q: "Do I need API keys?",
    a: "Basic uses BYOK. Pro and Studio include credits and work out of the box. You can still use BYOK on Pro+.",
  },
  {
    q: "What are ‘active speech hours’?",
    a: "Only the time when Roxy speaks. Idle and silence do not consume hours.",
  },
  {
    q: "Can I disable the watermark?",
    a: "Watermark is always on in Basic and Trial. Pro and Studio can disable it.",
  },
  {
    q: "Does this guarantee income?",
    a: "No. Roxy provides automation and retention tools, but results depend on your content and audience.",
  },
  {
    q: "Is Unreal required?",
    a: "No. Unreal is optional via the Unreal Connector Pack.",
  },
  {
    q: "Can I run 24/7?",
    a: "Yes. Pro/Studio support scheduling and multi-account rotation.",
  },
];
