import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/requirePermission";

export async function GET() {
  try {
    const user = await requirePermission("menu.write");

    return NextResponse.json({
      message: "You are allowed",
      role: user.role,
    });

  } catch (err: any) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (err.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}