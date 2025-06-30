"use client";

import { Overview } from "@/components/dashboard/overview";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <DashboardContainer>
          <Overview />
        </DashboardContainer>
      </div>
    </div>
  );
}
