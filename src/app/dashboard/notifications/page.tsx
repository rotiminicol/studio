import { Notifications } from "@/components/dashboard/notifications";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

export default function NotificationsPage() {
    return (
        <div className="relative min-h-screen">
            <div className="relative z-10">
                <DashboardContainer>
                    <Notifications />
                </DashboardContainer>
            </div>
        </div>
    );
}
