import { getCurrentUser } from "@/utils/getCurrentUser";
import { createAddonController } from "@/controllers/addon.controller";

export async function POST(req: Request, context: any) {
  const { id } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return createAddonController(id, body, user);
}