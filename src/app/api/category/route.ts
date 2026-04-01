import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

// ================= HELPERS =================

const ALLOWED_ROLES = ["ADMIN", "MANAGER"];

function authorize(role: string) {
  return ALLOWED_ROLES.includes(role);
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

function serverError() {
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}

// ================= CREATE CATEGORY =================

export async function POST(req: Request) {
  try {
    const user = getCurrentUser();

    if (!authorize(user.role)) return forbidden();

    const body = await req.json();
    const { name, type, description } = body;

    // 🛑 Validation
    if (!name || typeof name !== "string") {
      return badRequest("Valid name is required");
    }

    if (!type) {
      return badRequest("Category type is required");
    }

    const normalizedName = name.trim();

    // 🔁 Duplicate check (case-insensitive)
    const existing = await prisma.category.findFirst({
      where: {
        name: {
          equals: normalizedName,
          mode: "insensitive",
        },
        restaurantId: user.restaurantId,
      },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }

    // ✅ Create
    const category = await prisma.category.create({
      data: {
        name: normalizedName,
        type,
        description: description?.trim() || null,
        restaurantId: user.restaurantId,
        createdById: user.id,
      },
    });

    return NextResponse.json(category, { status: 201 });

  } catch (error: any) {
    console.error("CATEGORY_CREATE_ERROR", {
      message: error?.message,
      code: error?.code,
    });

    return serverError();
  }
}

// ================= GET CATEGORIES =================

export async function GET(req: Request) {
  try {
    const user = getCurrentUser();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.trim() || "";
    const isActiveParam = searchParams.get("isActive");

    // 🎯 Default: only active
    const isActiveFilter =
      isActiveParam !== null
        ? isActiveParam === "true"
        : true;

    const categories = await prisma.category.findMany({
      where: {
        restaurantId: user.restaurantId,
        isActive: isActiveFilter,
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        type: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(categories);

  } catch (error: any) {
    console.error("CATEGORY_GET_ERROR", {
      message: error?.message,
    });

    return serverError();
  }
}