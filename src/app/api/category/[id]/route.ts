import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

// ================= UPDATE CATEGORY =================
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX

    console.log("🔵 PATCH HIT:", id);

    const user = getCurrentUser();

    if (!["ADMIN", "MANAGER"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    console.log("📦 BODY:", body);

    const { name, type, description, isActive } = body;

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    console.log("📄 EXISTING:", existing);

    if (!existing || existing.restaurantId !== user.restaurantId) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // 🔁 Duplicate check
    if (name) {
      const duplicate = await prisma.category.findFirst({
        where: {
          name: {
            equals: name.trim(),
            mode: "insensitive",
          },
          restaurantId: user.restaurantId,
          NOT: { id },
        },
      });

      if (duplicate) {
        return NextResponse.json(
          { error: "Category name already exists" },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(type && { type }),
        ...(description !== undefined && {
          description: description?.trim() || null,
        }),
        ...(isActive !== undefined && { isActive }),
        updatedById: user.id,
      },
    });

    return NextResponse.json(updated);

  } catch (error: any) {
    console.error("❌ CATEGORY_UPDATE_ERROR", error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ FIX

    console.log("🔴 DELETE HIT:", id);

    const user = getCurrentUser();

    if (!["ADMIN", "MANAGER"].includes(user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing || existing.restaurantId !== user.restaurantId) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    await prisma.category.update({
      where: { id },
      data: {
        isActive: false,
        updatedById: user.id,
      },
    });

    return NextResponse.json({ message: "Category deleted" });

  } catch (error: any) {
    console.error("❌ CATEGORY_DELETE_ERROR", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}