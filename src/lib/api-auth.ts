import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || token === "") {
    throw new Error("UNAUTHORIZED");
  }

  try {
    const user = verifyToken(token) as {
      id: string;
      role: string;
      restaurantId: string;
    };

    return user;
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}