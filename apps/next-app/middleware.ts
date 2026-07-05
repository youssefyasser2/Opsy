import { NextRequest, NextResponse } from "next/server";
import { AUTH_REDIRECT_PARAM, AUTH_TOKEN_COOKIE_KEY } from "@/lib/constants/auth";
import { authRoutePaths, protectedRoutePrefixes, routePaths } from "@/lib/config/routes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_COOKIE_KEY)?.value;
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutePrefixes.some((route) =>
    pathname.startsWith(route),
  );
  const isGuestRoute = authRoutePaths.includes(
    pathname as (typeof authRoutePaths)[number],
  );

  if (isProtectedRoute && !token) {
    const loginUrl = new URL(routePaths.login, request.url);
    loginUrl.searchParams.set(
      AUTH_REDIRECT_PARAM,
      pathname || routePaths.dashboard,
    );

    return NextResponse.redirect(loginUrl);
  }

  if (isGuestRoute && token) {
    return NextResponse.redirect(new URL(routePaths.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
