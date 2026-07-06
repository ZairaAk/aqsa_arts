import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth/session";

const LOGIN_ROUTE = "/admin/login";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isLoginRoute = path === LOGIN_ROUTE;
  const isAdminRoute = path.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = Boolean(session?.username);

  if (!isLoginRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
  }

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
