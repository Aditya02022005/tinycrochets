import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute =
    pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const userEmail = request.cookies.get(
    "user-email"
  )?.value;

  if (!userEmail) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    userEmail !== "tinycrochets11@gmail.com"
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};