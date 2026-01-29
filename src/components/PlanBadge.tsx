import Badge from "@/components/Badge";
import type { PlanId } from "@/store/plan-store";

const labels: Record<PlanId, string> = {
  trial: "Preview",
  basic: "BYOK",
  pro: "Best value",
  studio: "For teams",
};

export default function PlanBadge({ plan }: { plan: PlanId }) {
  return <Badge className="bg-white/10">{labels[plan]}</Badge>;
}
