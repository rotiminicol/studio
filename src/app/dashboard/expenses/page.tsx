import { Expenses } from "@/components/dashboard/expenses";
import { MobileExpenses } from "@/components/dashboard/mobile-expenses";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ExpensesPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileExpenses />;
  }

  return <Expenses />;
}
