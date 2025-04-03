import { NextRequest, NextResponse } from "next/server";
import { tokenVerify } from "./lib/util/verifyToken";
// async function decodeToken(token:string) {
//   try {
//     const parts = token.split(".");
//     if (parts.length !== 3) {
//       throw new Error("Invalid token format");
//     }

//     // Use Buffer to decode base64 (Edge-compatible)
//     const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
//     return payload;
//   } catch (error) {
//     console.error("Token decoding failed:", error);
//     return null;
//   }
// }
// export default function middleware(req: NextRequest) {
//   const token = req.cookies.get("access_token")?.value;
//   const userRole = req.cookies.get("user_role")?.value;
//   console.log("the user role is", userRole);

  
//   const { pathname } = req.nextUrl;

//   if (userRole) {
//     // Redirect only if the user is NOT on their designated page
//     if (userRole === "AGENT" && !pathname.startsWith("/admin/agent")) {
//       return NextResponse.redirect(new URL("/admin/agent", req.url));
//     }
//     if (userRole === "BUILDER" && !pathname.startsWith("/admin/builder")) {
//       return NextResponse.redirect(new URL("/admin/builder", req.url));
//     }
//     if (userRole === "USER" && !pathname.startsWith("/admin/user")) {
//       return NextResponse.redirect(new URL("/admin/user", req.url));
//     }
//     if (userRole === "ADMIN" && !pathname.startsWith("/admin/superadmin")) {
//       return NextResponse.redirect(new URL("/admin/superadmin", req.url));
//     }
//   }

//   // Prevent unauthorized access to restricted pages
//   if (pathname.startsWith("/admin/builder") && userRole !== "BUILDER") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }
//   if (pathname.startsWith("/admin/superadmin") && userRole !== "ADMIN") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }
//   if (pathname.startsWith("/admin/agent") && userRole !== "AGENT") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }
//   if (pathname.startsWith("/admin/user") && userRole !== "USER") {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

 
/**
 * future try tomorrow
 * import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // Create this utility

export default async function middleware(req: NextRequest) {
  // Get session token instead of directly using role cookie
  const sessionToken = req.cookies.get("session_token")?.value;
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // Verify the token and get the user's role from a trusted source
  try {
    // This should verify JWT or session token and return user data from DB or cache
    const userData = await verifyToken(sessionToken);
    const userRole = userData.role;
    
    const { pathname } = req.nextUrl;
    
    // Handle /admin path redirects based on role
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
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/superadmin", req.url));
      }
    }
    
    // Protect role-specific paths
    if (pathname.startsWith("/admin/builder") && userRole !== "BUILDER") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (pathname.startsWith("/admin/superadmin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (pathname.startsWith("/admin/agent") && userRole !== "AGENT") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (pathname.startsWith("/admin/user") && userRole !== "USER") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    // Token verification failed - redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
 * 
 */

 
  // Create this utility

export default async function middleware(req: NextRequest) {
  // Get session token instead of directly using role cookie
  const sessionToken = req.cookies.get("access_token")?.value;
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // Verify the token and get the user's role from a trusted source
  try {
    // This should verify JWT or session token and return user data from DB or cache
    const userData = await tokenVerify(sessionToken);
    const userRole =  userData;
    
    console.log("the userrole is", userRole)
    const { pathname } = req.nextUrl;
    
    // Handle /admin path redirects based on role
    if (pathname === "/admin") {
      if (typeof userRole === "object" && userRole?.role === "AGENT") {
        return NextResponse.redirect(new URL("/admin/agent", req.url));
      }
      if (typeof userRole === "object" && userRole?.role === "BUILDER") {
        return NextResponse.redirect(new URL("/admin/builder", req.url));
      }
      if (typeof userRole === "object" && userRole?.role === "USER") {
        return NextResponse.redirect(new URL("/admin/user", req.url));
      }
      if (typeof userRole === "object" && userRole?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/superadmin", req.url));
      }
    }
    
    // Protect role-specific paths
    if (pathname.startsWith("/admin/builder") && (typeof userRole !== "object" || userRole?.role !== "BUILDER")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (pathname.startsWith("/admin/superadmin") && (typeof userRole !== "object" || userRole?.role !== "ADMIN")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (pathname.startsWith("/admin/agent") && (typeof userRole !== "object" || userRole?.role !== "AGENT")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (pathname.startsWith("/admin/user") && (typeof userRole !== "object" || userRole?.role !== "USER")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    // Token verification failed - redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin/superadmin/:path*"],
  // runtime:"nodejs"
};