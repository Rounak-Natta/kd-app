import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/logout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // ❌ Not logged in
  if (!user) {
    redirect("/login");
  }

  // ❌ Wrong role
  if (user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <LogoutButton />
      </div>

      {children}
    </div>
  );
}