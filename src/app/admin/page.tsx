"use client"
import { useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
 
const Dashboard = () => {
  const router = useRouter();
  const { userData }= useAppSelector((state) => state.user); // Get user from Redux state

//   useEffect(() => {
//     if (!userData?.role) {
//       router.push("/login");
//     } else if (userData.role === "AGENT") {
//       router.push("/admin/agent");
//     } else if (userData.role === "BUILDER") {
//       router.push("/admin/builder");
//     } else {
//       router.push("/admin/user");
//     }
//   }, [userData, router]);

  return (<div>Loading...</div>);
};


export default Dashboard