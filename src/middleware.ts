import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("TK_AWGAP");

  if (!jwt) {
    if (
      request.nextUrl.pathname === "/auth/login" ||
      request.nextUrl.pathname === "/auth/register"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode("jeffersonjwtsecret")
    );

    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    if (payload.id) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
