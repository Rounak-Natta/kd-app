import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

type AuthUser = {
  id: string;
  role: string;
  restaurantId: string;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies(); 

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const user = verifyToken(token) as AuthUser;
    return user;
  } catch {
    return null;
  }
}