"use client"
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks/dispatchHook";
import { usePathname, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/constants/axiosInstance";

const Dashboard = () => {
  const router = useRouter();
   const pathname = usePathname()
   console.log("the pathname of the pae is", pathname)



  const [userdata, setuserdata] = useState<{ role: string } | null>(null)
 
// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const response = await axiosInstance.get(`/api/v1/user/me`);
//       console.log(response.data,"the data is");
//       if(response?.data?.data?.role == "ADMIN"){
//        router.push("/")
//       }
//       setuserdata(response?.data?.data)
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   fetchUserData();
// }, []);

// N   

console.log("the user data after fetching the token is", userdata)
  return (
    <div>
      {/* Render the dashboard based on user role */}
      <p>Welcome, </p>
    </div>
  );
};

export default Dashboard;
