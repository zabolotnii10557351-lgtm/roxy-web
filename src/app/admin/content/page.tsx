import AdminContentClient from "@/app/admin/content/content-client";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Content</p>
        <h1 className="text-2xl font-semibold text-white">Marketing CMS</h1>
        <p className="mt-2 text-sm text-white/60">
          Edit marketing copy via markdown blocks. Pages fetch by key with fallbacks.
        </p>
      </div>
      <AdminContentClient />
    </div>
  );
}
