import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  createVariationController,
  getVariationController,
} from "@/controllers/variation.controller";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: menuId } = await context.params;
  const user = getCurrentUser();
  const body = await req.json();

  return createVariationController(menuId, body, user);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: menuId } = await context.params;
  const user = getCurrentUser();

  return getVariationController(menuId, user);
}