import { SettingsTab } from "@/components/dashboard/settings";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const bgImage = "/13.jpg";

export default function SettingsPage() {
    return (
        <div className="relative min-h-screen">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
          />
          <div className="relative z-10">
            <DashboardContainer>
                <SettingsTab />
            </DashboardContainer>
          </div>
        </div>
    );
}
