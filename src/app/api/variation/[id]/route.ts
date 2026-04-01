import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  updateVariationController,
  deleteVariationController,
} from "@/controllers/variation.controller";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return updateVariationController(id, body, user);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getCurrentUser();

  return deleteVariationController(id, user);
}