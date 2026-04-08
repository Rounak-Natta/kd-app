
import { ROLE_PERMISSIONS } from "./rbac";

export function hasPermission(role: string, permission: string) {
  const permissions =
    ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS];

  if (!permissions) return false;

  if (permissions.includes("*")) return true;

  return permissions.includes(permission);
}