import { NextResponse } from "next/server";
import {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
} from "@/services/menu.service";

import {
  createMenuSchema,
  updateMenuSchema,
} from "@/validators/menu.schema";

// CREATE
export async function createMenuController(body: any, user: any) {
  try {
    const data = createMenuSchema.parse(body);

    const menu = await createMenu(data, user);

    return NextResponse.json(menu, { status: 201 });
  } catch (error: any) {
    if (error.message === "CATEGORY_NOT_FOUND") {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// GET
export async function getMenuController(user: any, search: string) {
  try {
    const menus = await getMenus(user, search);
    return NextResponse.json(menus);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function updateMenuController(
  id: string,
  body: any,
  user: any
) {
  try {
    const data = updateMenuSchema.parse(body);

    const updated = await updateMenu(id, data, user);

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "Menu not found" },
        { status: 404 }
      );
    }

    if (error.message === "CATEGORY_NOT_FOUND") {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// DELETE
export async function deleteMenuController(id: string, user: any) {
  try {
    await deleteMenu(id, user);

    return NextResponse.json({ message: "Menu deleted" });
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "Menu not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}