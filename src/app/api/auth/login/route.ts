import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔍 DEBUG LOGS
    console.log("👉 EMAIL:", email);
    console.log("👉 PASSWORD:", password);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log("👉 USER FROM DB:", user);

    if (!user) {
      console.log("❌ USER NOT FOUND");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await compare(password, user.password);

    console.log("👉 PASSWORD MATCH:", isValid);

    if (!isValid) {
      console.log("❌ PASSWORD WRONG");
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

    const res = NextResponse.json({
      role: user.role,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ FIXED
      sameSite: "strict",
      path: "/",
    });

    console.log("✅ LOGIN SUCCESS");

    return res;

  } catch (err) {
    console.log("🔥 ERROR:", err);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}