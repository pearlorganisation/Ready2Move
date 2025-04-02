import { NextRequest, NextResponse } from "next/server";
async function decodeToken(token:string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    // Use Buffer to decode base64 (Edge-compatible)
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
    return payload;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
}
export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  let userData = null
  console.log("the token in middleware is", token)
 if(token){
    userData = await decodeToken(token);
  console.log("the userdata is ", userData)
 }else{
  console.log(token)
 }


  const { pathname } = req.nextUrl;
  if (userData!= null) {
    if (userData.role === "AGENT") {
      return NextResponse.redirect(new URL("/admin/agent", req.url));
    }
    if (userData.role === "BUILDER") {
      return NextResponse.redirect(new URL("/admin/builder", req.url));
    }
    if (userData.role === "USER") {
      return NextResponse.redirect(new URL("/admin/user", req.url));
    }
    if(userData.role ==="ADMIN"){
      return NextResponse.redirect(new URL("/admin/superadmin", req.url));
    }
  }
  if (pathname.startsWith("/admin/builder") && userData.role !== "BUILDER") {
    return NextResponse.redirect(new URL("/admin", req.url));  
  }
    if (pathname.startsWith("/admin/superadmin") && userData.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));  
  }
  if (pathname.startsWith("/admin/agent") && userData.role !== "AGENT") {
    return NextResponse.redirect(new URL("/admin", req.url));  
  }
  if (pathname.startsWith("/admin/user") && userData.role !== "USER") {
    return NextResponse.redirect(new URL("/admin", req.url));  
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/admin/superadmin/:path*"]
 };
 
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