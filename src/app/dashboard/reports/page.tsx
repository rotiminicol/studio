"use client";

import { Reports } from "@/components/dashboard/reports";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const bgImage = "/11.jpg";

export default function ReportsPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10">
        <DashboardContainer>
          <Reports />
        </DashboardContainer>
      </div>
    </div>
  );
}
