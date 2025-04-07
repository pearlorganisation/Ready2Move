"use client";

import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/helper/card";
import { Building2, Users, House } from "lucide-react";
import LeadsPage from "../leads/page";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { useEffect } from "react";
import { getDashboardData } from "@/lib/redux/actions/dashboardAction";
import { Button } from "@/components/helper/button";
import { FaEdit, FaEnvelope, FaTrash } from "react-icons/fa";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const dashboardData:any= useAppSelector((state) => state.dashboard.data);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]); // Added 'dispatch' to dependencies for better effect management

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Users" value={dashboardData?.data?.totalUsers ?? 0} description="Total Users" icon={<Users className="h-5 w-5" />} />
        <StatsCard title="Properties" value={dashboardData?.data?.totalProperties ?? 0} description="Total Properties" icon={<House className="h-5 w-5" />} />
        <StatsCard title="Projects" value={dashboardData?.data?.totalProjects ?? 0} description="Total Projects" icon={<Building2 className="h-5 w-5" />} />
        <StatsCard title="Leads" value={dashboardData?.data?.totalLeads ?? 0} description="Total Leads" icon={<Users className="h-5 w-5" />} />
      </div>

      {/* Recent Properties & Leads */}
      {/* <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Latest properties added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span>Luxury Villa</span>
                <span className="text-muted-foreground">$1.2M</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Downtown Apartment</span>
                <span className="text-muted-foreground">$450K</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Suburban House</span>
                <span className="text-muted-foreground">$680K</span>
              </div>
            </div>
          </CardContent>
        </Card>

      
      </div> */}


<h1 className="text-3xl font-bold text-gray-800 pb-2 w-fit">
  Recent Leads
</h1>
      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">S No.</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">Assigned To</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData?.data?.recentLeads?.length > 0 ? (
              dashboardData.data.recentLeads.map((item:any, index:any) => (
                <tr key={index} className="border-b">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 flex items-center gap-2">
                    <FaEnvelope /> {item.email}
                  </td>
                  <td className="p-2 font-bold">{item.phoneNumber}</td>
                  <td className="p-2">{item.assignedTo?.name ?? "Unassigned"}</td>
                  <td className="p-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">{item.status}</span>
                  </td>
                  <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 flex gap-2">
                    <Button className="bg-yellow-500 text-white p-2 rounded">
                      <FaEdit />
                    </Button>
                    <Button className="bg-red-500 text-white p-2 rounded">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">No leads available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Stats Card Component */
function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
