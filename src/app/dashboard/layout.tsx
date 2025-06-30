import { DashboardApp } from "@/components/dashboard/dashboard-app";
import { DataProvider } from "@/contexts/data-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      <DashboardApp>{children}</DashboardApp>
    </DataProvider>
  );
}
