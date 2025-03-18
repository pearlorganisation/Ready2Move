import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("access_token")?.value;
//   const userRole = req.cookies.get("user_role")?.value;

//   console.log("Access Token:", accessToken);
//   console.log("User Role:", userRole);
//   console.log("Current Path:", req.nextUrl.pathname);

//   if (!accessToken) {
//     console.log("Redirecting to /login");
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

// //   if (req.nextUrl.pathname.startsWith("/admin")) {
// //     if (!userRole || userRole !== "admin") {
// //       console.log("Unauthorized access to /admin. Redirecting...");
// //       return NextResponse.redirect(new URL("/unauthorized", req.url));
// //     }
// //   }

//   if (userRole === "AGENT" && req.nextUrl.pathname !== "/admin/agent") {
//     return NextResponse.redirect(new URL("/admin/agent", req.url));
//   }
//   if (userRole === "BUILDER" && req.nextUrl.pathname !== "/admin/builder") {
//     return NextResponse.redirect(new URL("/admin/builder", req.url));
//   }
//   if (userRole === "USER" && req.nextUrl.pathname !== "/admin/user") {
//     return NextResponse.redirect(new URL("/admin/user", req.url));
//   }

//   return NextResponse.next();
}
