import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  updateMenuController,
  deleteMenuController,
} from "@/controllers/menu.controller";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return updateMenuController(id, body, user);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getCurrentUser();

  return deleteMenuController(id, user);
}