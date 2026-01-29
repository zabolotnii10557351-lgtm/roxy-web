import BackgroundGlow from "@/components/BackgroundGlow";
import SidebarNav from "@/components/SidebarNav";
import Topbar from "@/components/Topbar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative min-h-screen bg-[#0A0F1A] text-white">
      <BackgroundGlow />
      <div className="relative z-10 flex">
        <SidebarNav />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
