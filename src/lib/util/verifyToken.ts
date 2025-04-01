import { jwtVerify }  from "jose"

export async function tokenVerify(token: string){
 try {
    // Option 1: JWT Verification

    console.log("my secret key in the backend is", process.env.JWT_SECRET_KEY)
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error('JWT secret key is not defined');
    }
    console.log("the secret key will be", secret);
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    console.log("the payload inn the end is", payload)
    return payload as { role: string, userId: string };
  } catch (error) {
    throw new Error('Authentication failed');
  }
}