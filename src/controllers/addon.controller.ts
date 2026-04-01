import { NextResponse } from "next/server";
import {
  createAddonGroup,
  createAddon,
  getAddonGroups,
  updateAddon,
  deleteAddon,
} from "@/services/addon.service";

import {
  createAddonGroupSchema,
  createAddonSchema,
  updateAddonSchema,
} from "@/validators/addon.schema";

// GROUP
export async function createAddonGroupController(menuId: string, body: any, user: any) {
  try {
    const data = createAddonGroupSchema.parse(body);
    const result = await createAddonGroup(menuId, data, user);

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function getAddonGroupController(menuId: string, user: any) {
  try {
    const result = await getAddonGroups(menuId, user);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// ADDON
export async function createAddonController(groupId: string, body: any, user: any) {
  try {
    const data = createAddonSchema.parse(body);
    const result = await createAddon(groupId, data, user);

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function updateAddonController(id: string, body: any, user: any) {
  try {
    const data = updateAddonSchema.parse(body);
    const result = await updateAddon(id, data, user);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function deleteAddonController(id: string, user: any) {
  try {
    await deleteAddon(id, user);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}