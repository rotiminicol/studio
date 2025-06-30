"use client";

import { Expenses } from "@/components/dashboard/expenses";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const bgImage = "/10.jpg";

export default function ExpensesPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10">
        <DashboardContainer>
          <Expenses />
        </DashboardContainer>
      </div>
    </div>
  );
}
