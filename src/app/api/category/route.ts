import { getCurrentUser } from "@/utils/getCurrentUser";
import {
  createCategoryController,
  getCategoryController,
} from "@/controllers/category.controller";

export async function POST(req: Request) {
  const user = getCurrentUser();
  const body = await req.json();

  return createCategoryController(body, user);
}

export async function GET(req: Request) {
  const user = getCurrentUser();
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const isActive = searchParams.get("isActive") !== "false";

  return getCategoryController(user, search, isActive);
}