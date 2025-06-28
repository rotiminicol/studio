import { DataProvider } from "@/contexts/data-context";
import { DashboardApp } from "@/components/dashboard/dashboard-app";

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
