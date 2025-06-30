"use client";

import { Overview } from "@/components/dashboard/overview";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const bgImage = "/9.jpg";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10">
        <DashboardContainer>
          <Overview />
        </DashboardContainer>
      </div>
    </div>
  );
}
