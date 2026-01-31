import BackgroundGlow from "@/components/BackgroundGlow";
import MarketingFooter from "@/components/MarketingFooter";
import MarketingHeader from "@/components/MarketingHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#0A0F1A] text-white">
      <BackgroundGlow />
      <div className="relative z-10 flex min-h-screen flex-col">
        <MarketingHeader />
        <main className="flex-1 pb-16">{children}</main>
        <MarketingFooter />
      </div>
    </div>
  );
}
