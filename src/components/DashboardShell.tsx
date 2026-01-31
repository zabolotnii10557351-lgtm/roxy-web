import BackgroundGlow from "@/components/BackgroundGlow";
import SidebarNav from "@/components/SidebarNav";
import Topbar from "@/components/Topbar";
import { PlanProvider, type PlanProfile } from "@/providers/PlanProvider";

interface DashboardShellProps {
  children: React.ReactNode;
  planProfile: PlanProfile;
  displayName: string;
  isAdmin?: boolean;
}

export default function DashboardShell({
  children,
  planProfile,
  displayName,
  isAdmin,
}: DashboardShellProps) {
  return (
    <div className="relative min-h-screen bg-[#0A0F1A] text-white">
      <BackgroundGlow />
      <PlanProvider profile={planProfile}>
        <div className="relative z-10 flex">
          <SidebarNav isAdmin={Boolean(isAdmin)} />
          <div className="flex min-h-screen flex-1 flex-col">
            <Topbar displayName={displayName} />
            <main className="flex-1 px-6 py-8">{children}</main>
          </div>
        </div>
      </PlanProvider>
    </div>
  );
}
