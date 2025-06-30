"use client";

import { Expenses } from "@/components/dashboard/expenses";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

export default function ExpensesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <DashboardContainer>
          <Expenses />
        </DashboardContainer>
      </div>
    </div>
  );
}
