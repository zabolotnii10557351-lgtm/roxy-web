import AdminPricingClient from "@/app/admin/pricing/pricing-client";

export default function AdminPricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Pricing</p>
        <h1 className="text-2xl font-semibold text-white">Pricing CMS</h1>
        <p className="mt-2 text-sm text-white/60">
          Edit versioned pricing config and publish the active version.
        </p>
      </div>
      <AdminPricingClient />
    </div>
  );
}
