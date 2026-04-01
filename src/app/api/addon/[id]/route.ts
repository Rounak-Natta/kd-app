import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  updateAddonController,
  deleteAddonController,
} from "@/controllers/addon.controller";

export async function PATCH(req: Request, context: any) {
  const { id } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return updateAddonController(id, body, user);
}

export async function DELETE(req: Request, context: any) {
  const { id } = await context.params;
  const user = getCurrentUser();

  return deleteAddonController(id, user);
}