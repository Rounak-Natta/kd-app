import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/logout";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // 🔐 Auth check ONLY
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="text-lg font-semibold mb-6">Admin</h2>

        <nav className="space-y-2 text-sm">
          <Link href="/admin" className="block hover:text-primary">
            Dashboard
          </Link>

          <Link href="/admin/categories" className="block hover:text-primary">
            Categories
          </Link>

          <Link href="/admin/menu" className="block hover:text-primary">
            Menu
          </Link>

          <Link href="/admin/users" className="block hover:text-primary">
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <LogoutButton />
        </div>

        {children}
      </main>
    </div>
  );
}