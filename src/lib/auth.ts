import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ceh_admin";

export function getSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN ?? "campus-hub-admin-session";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "clubadmin123";
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === getSessionToken();
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    return false;
  }
  return true;
}
