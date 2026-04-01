import { NextResponse } from "next/server";
import {
  createVariation,
  getVariations,
  updateVariation,
  deleteVariation,
} from "@/services/variation.service";

import {
  createVariationSchema,
  updateVariationSchema,
} from "@/validators/variation.schema";

// CREATE
export async function createVariationController(
  menuItemId: string,
  body: any,
  user: any
) {
  try {
    const data = createVariationSchema.parse(body);

    const result = await createVariation(menuItemId, data, user);

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.message === "MENU_NOT_FOUND") {
      return NextResponse.json(
        { error: "Menu not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// GET
export async function getVariationController(
  menuItemId: string,
  user: any
) {
  try {
    const result = await getVariations(menuItemId, user);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch variations" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function updateVariationController(
  id: string,
  body: any,
  user: any
) {
  try {
    const data = updateVariationSchema.parse(body);

    const result = await updateVariation(id, data, user);

    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "Variation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// DELETE
export async function deleteVariationController(
  id: string,
  user: any
) {
  try {
    await deleteVariation(id, user);

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}