import Link from "next/link";

export default function NotFound() {
  return (
    <div className="glass-card mx-auto mt-24 max-w-xl rounded-3xl p-10 text-center">
      <h2 className="text-2xl font-semibold text-white">Page not found</h2>
      <p className="mt-3 text-sm text-white/70">
        This dashboard module is still in preview.
      </p>
      <Link
        href="/app"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2 text-sm text-white"
      >
        Back to overview
      </Link>
    </div>
  );
}
