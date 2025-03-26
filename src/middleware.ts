import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const userRole = req.cookies.get("user_role")?.value;

  // If userRole is not set, redirect to login
  if (!userRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { pathname } = req.nextUrl;

  // Redirect users to their respective dashboards only if they are at `/admin`
  if (pathname === "/admin") {
    if (userRole === "AGENT") {
      return NextResponse.redirect(new URL("/admin/agent", req.url));
    }
    if (userRole === "BUILDER") {
      return NextResponse.redirect(new URL("/admin/builder", req.url));
    }
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/admin/user", req.url));
    }
  }

  // Restrict access to `/admin/builder/*` only to BUILDER
  if (pathname.startsWith("/admin/builder") && userRole !== "BUILDER") {
    return NextResponse.redirect(new URL("/admin", req.url)); // Redirect unauthorized users
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Config to limit middleware execution to paths under `/admin/*`
export const config = {
  matcher: ["/admin/:path*"],
};
