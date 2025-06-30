import { Notifications } from "@/components/dashboard/notifications";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const bgImage = "/12.jpg";

export default function NotificationsPage() {
    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
                style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
            />
            <div className="relative z-10">
                <DashboardContainer>
                    <Notifications />
                </DashboardContainer>
            </div>
        </div>
    );
}
