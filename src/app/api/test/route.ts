// src/app/api/test/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$connect();

    return NextResponse.json({
      message: "DB Connected ✅",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "DB connection failed ❌" },
      { status: 500 }
    );
  }
}