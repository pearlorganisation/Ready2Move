import jwt from "jsonwebtoken";
import { jwtVerify } from "jose"
export async function tokenVerify(token:string) {
  try {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT secret key is not defined");
    }
console.log("my secret key is", secret)
    //  jwt.verify(token,secret,(decoded)=>{
    //  console.log("asdsdasdas",decoded)
    // })
    // const decoded = await jwt.verify(token, secret);
    const decoded2 =await jwt.decode(token) 
    // await jwtVerify(token, new TextEncoder().encode(secret))

    console.log("the decoded user in the token verify is", decoded2)
    if (!decoded2) {
      throw new Error("Failed to decode");
    }
    return decoded2;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Return null instead of throwing to prevent breaking middleware
  }
}
