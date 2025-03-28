import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  // const userRole = req.cookies.get("user_role")?.value; 
  // if (!userRole) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  // const { pathname } = req.nextUrl;
  // if (pathname === "/admin") {
  //   if (userRole === "AGENT") {
  //     return NextResponse.redirect(new URL("/admin/agent", req.url));
  //   }
  //   if (userRole === "BUILDER") {
  //     return NextResponse.redirect(new URL("/admin/builder", req.url));
  //   }
  //   if (userRole === "USER") {
  //     return NextResponse.redirect(new URL("/admin/user", req.url));
  //   }
  // }
  // if (pathname.startsWith("/admin/builder") && userRole !== "BUILDER") {
  //   return NextResponse.redirect(new URL("/admin", req.url));  
  // }
  // return NextResponse.next();
}
// export const config = {
//   matcher: ["/admin/:path*"],
// };
