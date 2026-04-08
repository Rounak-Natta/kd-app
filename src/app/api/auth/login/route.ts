import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ROLE_ROUTES } from "@/lib/rbac";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email?.toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      role: user.role,
      restaurantId: user.restaurantId,
    });

    const redirectTo =
      ROLE_ROUTES[user.role as keyof typeof ROLE_ROUTES] || "/admin";

    const res = NextResponse.json({
      role: user.role,
      redirectTo, // 🔥 IMPORTANT
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}