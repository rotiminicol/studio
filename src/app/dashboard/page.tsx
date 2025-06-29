import { Overview } from "@/components/dashboard/overview";
import { MobileOverview } from "@/components/dashboard/mobile-overview";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileOverview />;
  }

  return <Overview />;
}
