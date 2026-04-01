import { NextResponse } from "next/server";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/services/category.service";

import {
  createCategorySchema,
  updateCategorySchema,
} from "@/validators/category.schema";

// CREATE
export async function createCategoryController(body: any, user: any) {
  try {
    const data = createCategorySchema.parse(body);

    const category = await createCategory(data, user);

    return NextResponse.json(category, { status: 201 });

  } catch (error: any) {
    if (error.message === "CATEGORY_EXISTS") {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// GET
export async function getCategoryController(
  user: any,
  search: string,
  isActive: boolean
) {
  try {
    const categories = await getCategories(user, search, isActive);
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function updateCategoryController(
  id: string,
  body: any,
  user: any
) {
  try {
    const data = updateCategorySchema.parse(body);

    const updated = await updateCategory(id, data, user);

    return NextResponse.json(updated);

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    if (error.message === "CATEGORY_EXISTS") {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

// DELETE
export async function deleteCategoryController(id: string, user: any) {
  try {
    await deleteCategory(id, user);

    return NextResponse.json({ message: "Category deleted" });

  } catch (error: any) {
    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}