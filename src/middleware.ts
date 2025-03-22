import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const userRole = req.cookies.get("user_role")?.value;

  // If userRole is not set, redirect to login
  if (!userRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect based on the userRole
  if (userRole === "AGENT" && req.nextUrl.pathname !== "/admin/agent") {
    return NextResponse.redirect(new URL("/admin/agent", req.url));
  }

  if (userRole === "BUILDER" && req.nextUrl.pathname !== "/admin/builder") {
    return NextResponse.redirect(new URL("/admin/builder", req.url));
  }

  if (userRole === "USER" && req.nextUrl.pathname !== "/admin/user") {
    return NextResponse.redirect(new URL("/admin/user", req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Config to limit middleware execution to paths under `/admin/*`
export const config = {
  matcher: ['/admin/:path*'],
};
