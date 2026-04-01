import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  createAddonGroupController,
  getAddonGroupController,
} from "@/controllers/addon.controller";

export async function POST(req: Request, context: any) {
  const { id } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return createAddonGroupController(id, body, user);
}

export async function GET(req: Request, context: any) {
  const { id } = await context.params;
  const user = getCurrentUser();

  return getAddonGroupController(id, user);
}