import { Reports } from "@/components/dashboard/reports";
import { MobileReports } from "@/components/dashboard/mobile-reports";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ReportsPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileReports />;
  }

  return <Reports />;
}
