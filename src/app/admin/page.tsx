"use client"
import { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userData?.role) {
      router.push("/login");
    }
  }, [userData, router]);

  if (!userData?.role) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render the dashboard based on user role */}
      <p>Welcome, {userData.role}</p>
    </div>
  );
};

export default Dashboard;
