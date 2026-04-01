import { prisma } from "@/lib/prisma";

// CREATE GROUP
export async function createAddonGroup(menuId: string, data: any, user: any) {
  const menu = await prisma.menuItem.findUnique({
    where: { id: menuId },
  });

  if (!menu || menu.restaurantId !== user.restaurantId) {
    throw new Error("MENU_NOT_FOUND");
  }

  return prisma.addonGroup.create({
    data: {
      name: data.name.trim(),
      isRequired: data.isRequired ?? false,
      maxSelect: data.maxSelect,
      menuItemId: menuId,
    },
  });
}

// CREATE ADDON
export async function createAddon(groupId: string, data: any, user: any) {
  const group = await prisma.addonGroup.findUnique({
    where: { id: groupId },
    include: { menuItem: true },
  });

  if (
    !group ||
    group.menuItem.restaurantId !== user.restaurantId
  ) {
    throw new Error("NOT_FOUND");
  }

  return prisma.addon.create({
    data: {
      name: data.name.trim(),
      price: data.price,
      addonGroupId: groupId,
    },
  });
}

// GET GROUPS + ADDONS
export async function getAddonGroups(menuId: string, user: any) {
  const menu = await prisma.menuItem.findUnique({
    where: { id: menuId },
  });

  if (!menu || menu.restaurantId !== user.restaurantId) {
    throw new Error("MENU_NOT_FOUND");
  }

  return prisma.addonGroup.findMany({
    where: { menuItemId: menuId },
    include: {
      addons: true,
    },
  });
}

// UPDATE ADDON
export async function updateAddon(id: string, data: any, user: any) {
  const addon = await prisma.addon.findUnique({
    where: { id },
    include: {
      addonGroup: {
        include: { menuItem: true },
      },
    },
  });

  if (
    !addon ||
    addon.addonGroup.menuItem.restaurantId !== user.restaurantId
  ) {
    throw new Error("NOT_FOUND");
  }

  return prisma.addon.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name.trim() }),
      ...(data.price !== undefined && { price: data.price }),
    },
  });
}

// DELETE ADDON
export async function deleteAddon(id: string, user: any) {
  const addon = await prisma.addon.findUnique({
    where: { id },
    include: {
      addonGroup: {
        include: { menuItem: true },
      },
    },
  });

  if (
    !addon ||
    addon.addonGroup.menuItem.restaurantId !== user.restaurantId
  ) {
    throw new Error("NOT_FOUND");
  }

  return prisma.addon.delete({
    where: { id },
  });
}