import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/logout";

export default async function WaiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "STEWARD") {
    redirect("/unauthorized");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Waiter Panel</h1>
        <LogoutButton />
      </div>

      {children}
    </div>
  );
}