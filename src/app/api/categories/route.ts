// app/api/categories/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, type, restaurantId, userId } = body;

    const category = await prisma.category.create({
      data: {
        name,
        type,
        restaurantId,
        createdById: userId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}