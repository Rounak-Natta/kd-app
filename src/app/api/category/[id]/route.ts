import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  updateCategoryController,
  deleteCategoryController,
} from "@/controllers/category.controller";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return updateCategoryController(id, body, user);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getCurrentUser();

  return deleteCategoryController(id, user);
}