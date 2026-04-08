import { ROLE_PERMISSIONS } from "./rbac";
import { requireAuth } from "./api-auth";

export async function requirePermission(permission: string) {
  const user = await requireAuth();

  const permissions =
    ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS];

  if (!permissions) {
    throw new Error("FORBIDDEN");
  }

  // ADMIN shortcut
  if (permissions.includes("*")) {
    return user;
  }

  if (!permissions.includes(permission)) {
    throw new Error("FORBIDDEN");
  }

  return user;
}