"use client"

import { Sidebar } from "@/components/sidebar"
import { axiosInstance } from "@/lib/constants/axiosInstance"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export interface USER{
_id:string,
email: string,
isVerified: string,
name: string,
phoneNumber:string,
role: string
}

const AdminPage = () => {  
  const router = useRouter();
  const [userdata, setUserData] = useState<USER | undefined>(undefined);
  const [loading, setLoading] = useState(true);  
  const [isAuthorized, setIsAuthorized] = useState(false);  
  const pathname = usePathname()
console.log("the pathname is ", pathname)
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);  
      setIsAuthorized(false);  
      try {
      const { data } = await axiosInstance.get(`/api/v1/users/me`);
      console.log("RAW response:", data);
      const fetchedUser: USER | undefined = data?.data;  
        console.log("Fetched user data:", fetchedUser);
        setUserData(fetchedUser);

         if (fetchedUser && fetchedUser?.role === "ADMIN") {
          console.log("User is ADMIN, authorizing.");
          setIsAuthorized(true);
        } else {
          console.log("User is not ADMIN or data fetch failed, redirecting.");
          router.push("/login");
        }
 
      } catch (error) {
        console.error("Error fetching user data:", error);
         router.push("/login");
      } finally {
        setLoading(false);  
      }
    };

    fetchUserData();
   }, [router]);  

  console.log("Current state: loading", loading, "isAuthorized", isAuthorized, "userdata", userdata);   
   if (loading) {
     return <div>Loading user data...</div>;
  }
   if (isAuthorized && userdata) { 
     console.log("Rendering Admin content for user:", userdata.name);
     return (
       <div>
    
         <h1>Welcome Admin, {userdata.name}!</h1>
       </div>
     );
  }
   
  console.log("Rendering null because user is not authorized or still redirecting.");
  return null;
};

export default AdminPage



 
 
 
 