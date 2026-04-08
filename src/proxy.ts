import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;


  // ✅ Public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/unauthorized") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // ❌ Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = verifyToken(token) as {
      id: string;
      role: string;
      restaurantId: string;
    };

    console.log("👉 ROLE:", user.role);

    // 🔥 RBAC

    // ADMIN + MANAGER → /admin
    if (pathname.startsWith("/admin")) {
      if (!["ADMIN", "MANAGER"].includes(user.role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // STEWARD → /waiter
    if (pathname.startsWith("/waiter")) {
      if (user.role !== "STEWARD") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // CASHIER → /pos
    if (pathname.startsWith("/pos")) {
      if (user.role !== "CASHIER") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();

  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};