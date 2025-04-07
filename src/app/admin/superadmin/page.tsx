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

const AdminPage = () => { // Renamed component for clarity
  const router = useRouter();
  const [userdata, setUserData] = useState<USER | undefined>(undefined);
  const [loading, setLoading] = useState(true); // <-- Add loading state
  const [isAuthorized, setIsAuthorized] = useState(false); // <-- State to track authorization
  const pathname = usePathname()
console.log("the pathname is ", pathname)
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      setIsAuthorized(false); // Reset authorization status
      try {
      const { data } = await axiosInstance.get(`/api/v1/users/me`);
      console.log("RAW response:", data);
      const fetchedUser: USER | undefined = data?.data; // fixed extraction

        console.log("Fetched user data:", fetchedUser);
        setUserData(fetchedUser);

        // --- Check role AFTER data is fetched ---
        if (fetchedUser && fetchedUser?.role === "ADMIN") {
          console.log("User is ADMIN, authorizing.");
          setIsAuthorized(true);
        } else {
          console.log("User is not ADMIN or data fetch failed, redirecting.");
          router.push("/login");
        }
        // --- End check ---

      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect on error as well, as we can't verify the user
        router.push("/login");
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]); // Add router to dependency array as it's used in the effect

  console.log("Current state: loading", loading, "isAuthorized", isAuthorized, "userdata", userdata);   
  // 1. Show loading indicator while fetching
  if (loading) {
    // You can return null or a proper loading spinner component
    return <div>Loading user data...</div>;
  }
  // 2. If loading is finished AND user is authorized, show the page content
  if (isAuthorized && userdata) { // Check userdata too for type safety if needed
     console.log("Rendering Admin content for user:", userdata.name);
     return (
       <div>
         <Sidebar />
         {/* Add the rest of your admin page content here */}
         <h1>Welcome Admin, {userdata.name}!</h1>
       </div>
     );
  }
  // 3. If loading is finished but user is not authorized (useEffect handled redirect)
  console.log("Rendering null because user is not authorized or still redirecting.");
  return null;
};

export default AdminPage



 
 
 
 