"use client";

import { Reports } from "@/components/dashboard/reports";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

export default function ReportsPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <DashboardContainer>
          <Reports />
        </DashboardContainer>
      </div>
    </div>
  );
}
