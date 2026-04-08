import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./src/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // ❌ Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = verifyToken(token) as any;

    const { pathname } = req.nextUrl;

    // 🔥 ROLE-BASED ACCESS

    // Admin routes
    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Waiter routes
    if (pathname.startsWith("/waiter") && user.role !== "STEWARD") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Optional: redirect logged-in users away from login
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();

  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}