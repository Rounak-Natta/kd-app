"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground px-6">
      <div className="w-full max-w-xl text-center space-y-6">

        {/* Top Actions */}
        <div className="flex justify-between items-center">

          {/* Login Button */}
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-primary hover:underline"
          >
            Login
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-md border-base px-3 py-1 text-sm hover:bg-secondary"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Logo */}
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Kitchen Diaries
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground">
          Smart restaurant management. Billing, inventory, analytics — all in one place.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover transition"
          >
            Get Started
          </button>
        </div>

        {/* Coming Soon */}
        <div className="mt-10 space-y-3">
          <h2 className="text-2xl font-semibold">🚧 Coming Soon</h2>
          <p className="text-sm text-muted-foreground">
            We’re building something powerful for restaurant owners.
            Stay tuned.
          </p>
        </div>

        {/* Footer */}
        <p className="pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kitchen Diaries
        </p>
      </div>
    </main>
  );
}