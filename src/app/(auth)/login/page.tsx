"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ important
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // 🔥 ROLE-BASED REDIRECT
      if (data.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (data.role === "STEWARD") {
        window.location.href = "/waiter";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md shadow-xl border-base">
        <CardContent className="p-8 space-y-6">

          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Login to your Kitchen Diaries account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email" // ✅ REQUIRED
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
                <Input
                  name="password" // ✅ REQUIRED
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Forgot password?{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Reset
            </span>
          </p>

        </CardContent>
      </Card>
    </main>
  );
}