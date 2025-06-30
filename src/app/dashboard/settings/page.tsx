import { SettingsTab } from "@/components/dashboard/settings";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

export default function SettingsPage() {
    return (
        <div className="relative min-h-screen">
          <div className="relative z-10">
            <DashboardContainer>
                <SettingsTab />
            </DashboardContainer>
          </div>
        </div>
    );
}
