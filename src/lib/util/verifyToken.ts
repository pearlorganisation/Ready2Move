import jwt from "jsonwebtoken";

export function tokenVerify(token:string) {
  try {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT secret key is not defined");
    }
    const decoded = jwt.verify(token, secret);
    console.log("the decoded user in the token verify is", decoded)
    if (!decoded) {
      throw new Error("Failed to decode");
    }
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Return null instead of throwing to prevent breaking middleware
  }
}
