import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  createMenuController,
  getMenuController,
} from "@/controllers/menu.controller";

export async function POST(req: Request) {
  const user = getCurrentUser();
  const body = await req.json();

  return createMenuController(body, user);
}

export async function GET(req: Request) {
  const user = getCurrentUser();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";

  return getMenuController(user, search);
}