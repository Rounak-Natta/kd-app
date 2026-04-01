import { prisma } from "@/lib/prisma";

// CREATE
export async function createCategory(data: any, user: any) {
  const normalizedName = data.name.trim();

  const existing = await prisma.category.findFirst({
    where: {
      name: {
        equals: normalizedName,
        mode: "insensitive",
      },
      restaurantId: user.restaurantId,
    },
  });

  if (existing) {
    throw new Error("CATEGORY_EXISTS");
  }

  return prisma.category.create({
    data: {
      name: normalizedName,
      type: data.type,
      description: data.description?.trim() || null,
      restaurantId: user.restaurantId,
      createdById: user.id,
    },
  });
}

// GET
export async function getCategories(user: any, search: string, isActive: boolean) {
  return prisma.category.findMany({
    where: {
      restaurantId: user.restaurantId,
      isActive,
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: { sortOrder: "asc" },
  });
}

// UPDATE
export async function updateCategory(id: string, data: any, user: any) {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing || existing.restaurantId !== user.restaurantId) {
    throw new Error("NOT_FOUND");
  }

  if (data.name) {
    const duplicate = await prisma.category.findFirst({
      where: {
        name: {
          equals: data.name.trim(),
          mode: "insensitive",
        },
        restaurantId: user.restaurantId,
        NOT: { id },
      },
    });

    if (duplicate) {
      throw new Error("CATEGORY_EXISTS");
    }
  }

  return prisma.category.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name.trim() }),
      ...(data.type && { type: data.type }),
      ...(data.description !== undefined && {
        description: data.description?.trim() || null,
      }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
      updatedById: user.id,
    },
  });
}

// DELETE (SOFT)
export async function deleteCategory(id: string, user: any) {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing || existing.restaurantId !== user.restaurantId) {
    throw new Error("NOT_FOUND");
  }

  return prisma.category.update({
    where: { id },
    data: {
      isActive: false,
      updatedById: user.id,
    },
  });
}