import { DashboardApp } from "@/components/dashboard/dashboard-app";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardApp>{children}</DashboardApp>;
}
