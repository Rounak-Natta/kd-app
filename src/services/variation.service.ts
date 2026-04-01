import { prisma } from "@/lib/prisma";

// CREATE
export async function createVariation(
  menuItemId: string,
  data: any,
  user: any
) {
  // ✅ Check menu belongs to restaurant
  const menu = await prisma.menuItem.findUnique({
    where: { id: menuItemId },
  });

  if (!menu || menu.restaurantId !== user.restaurantId) {
    throw new Error("MENU_NOT_FOUND");
  }

  // ✅ If default → unset others
  if (data.isDefault) {
    await prisma.variation.updateMany({
      where: { menuItemId },
      data: { isDefault: false },
    });
  }

  return prisma.variation.create({
    data: {
      name: data.name.trim(),
      price: data.price,
      isDefault: data.isDefault ?? false,
      menuItemId,
    },
  });
}

// GET
export async function getVariations(menuItemId: string, user: any) {
  const menu = await prisma.menuItem.findUnique({
    where: { id: menuItemId },
  });

  if (!menu || menu.restaurantId !== user.restaurantId) {
    throw new Error("MENU_NOT_FOUND");
  }

  return prisma.variation.findMany({
    where: { menuItemId },
    orderBy: { createdAt: "asc" },
  });
}

// UPDATE
export async function updateVariation(
  id: string,
  data: any,
  user: any
) {
  const variation = await prisma.variation.findUnique({
    where: { id },
    include: { menuItem: true },
  });

  if (
    !variation ||
    variation.menuItem.restaurantId !== user.restaurantId
  ) {
    throw new Error("NOT_FOUND");
  }

  // handle default switch
  if (data.isDefault) {
    await prisma.variation.updateMany({
      where: { menuItemId: variation.menuItemId },
      data: { isDefault: false },
    });
  }

  return prisma.variation.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name.trim() }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.isDefault !== undefined && {
        isDefault: data.isDefault,
      }),
    },
  });
}

// DELETE
export async function deleteVariation(id: string, user: any) {
  const variation = await prisma.variation.findUnique({
    where: { id },
    include: { menuItem: true },
  });

  if (
    !variation ||
    variation.menuItem.restaurantId !== user.restaurantId
  ) {
    throw new Error("NOT_FOUND");
  }

  return prisma.variation.delete({
    where: { id },
  });
}