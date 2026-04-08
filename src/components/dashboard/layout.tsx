import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import { SIDEBAR_CONFIG } from "@/config/sidebar";
import Sidebar from "./sidebar";
import LogoutButton from "@/components/ui/logout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const sidebarItems =
    SIDEBAR_CONFIG[user.role as keyof typeof SIDEBAR_CONFIG] || [];

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold capitalize">
            {user.role.toLowerCase()} panel
          </h1>
          <LogoutButton />
        </div>

        {children}
      </div>
    </div>
  );
}