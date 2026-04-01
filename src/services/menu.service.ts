import { prisma } from "@/lib/prisma";

// CREATE
export async function createMenu(data: any, user: any) {
  // ✅ check category belongs to restaurant
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      restaurantId: user.restaurantId,
    },
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  return prisma.menuItem.create({
    data: {
      name: data.name.trim(),
      description: data.description?.trim() || null,
      basePrice: data.basePrice,

      isVeg: data.isVeg ?? false,
      isAvailable: data.isAvailable ?? true,

      restaurantId: user.restaurantId,
      categoryId: data.categoryId,
    },
  });
}

// GET
export async function getMenus(user: any, search: string) {
  return prisma.menuItem.findMany({
    where: {
      restaurantId: user.restaurantId,
      isDeleted: false,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    include: {
      category: true,
      variations: true,
      addonGroups: {
        include: {
          addons: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// UPDATE
export async function updateMenu(id: string, data: any, user: any) {
  const existing = await prisma.menuItem.findUnique({
    where: { id },
  });

  if (!existing || existing.restaurantId !== user.restaurantId) {
    throw new Error("NOT_FOUND");
  }

  if (data.categoryId) {
    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        restaurantId: user.restaurantId,
      },
    });

    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
  }

  return prisma.menuItem.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name.trim() }),
      ...(data.description !== undefined && {
        description: data.description?.trim() || null,
      }),
      ...(data.basePrice !== undefined && {
        basePrice: data.basePrice,
      }),
      ...(data.categoryId && { categoryId: data.categoryId }),
      ...(data.isVeg !== undefined && { isVeg: data.isVeg }),
      ...(data.isAvailable !== undefined && {
        isAvailable: data.isAvailable,
      }),
    },
  });
}

// DELETE (SOFT)
export async function deleteMenu(id: string, user: any) {
  const existing = await prisma.menuItem.findUnique({
    where: { id },
  });

  if (!existing || existing.restaurantId !== user.restaurantId) {
    throw new Error("NOT_FOUND");
  }

  return prisma.menuItem.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
}