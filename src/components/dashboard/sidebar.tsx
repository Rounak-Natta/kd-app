"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  label: string;
  href: string;
};

export default function Sidebar({ items }: { items: Item[] }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-4">Kitchen Diaries</h2>

      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg text-sm ${
              isActive
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}