"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/helper/card";
import { Building2, Users, House, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getDashboardData } from "@/lib/redux/actions/dashboardAction";
import { Button } from "@/components/helper/button";
import { FaEdit, FaEnvelope, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  GetUserByRoles,
  updateLeadById,
} from "@/lib/redux/actions/leadsAction";
import { FaChevronDown } from "react-icons/fa";
import { RiBloggerLine } from "react-icons/ri";

interface LeadRowProps {
  Sno: number;
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  assignedTo?: any;
  status: "PENDING" | "CALLING" | "QUALIFIED" | "UNQUALIFIED";
  createdAt: string;
  feedBack?: string;
}

type User = {
  _id: string;
  name: string;
  role: string;
};

export default function DashboardPage() {
  const dashboardData: any = useAppSelector((state) => state.dashboard.data);
  console.log(dashboardData, ":dashboard data");
  console.log("dashbore", dashboardData);
  const users: User[] = useAppSelector((state) => state.leads.users);
  console.log("users", users);
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newAssignee, setNewAssignee] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");

  const STATUS_OPTIONS = ["PENDING", "CALLING", "QUALIFIED", "UNQUALIFIED"];

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  useEffect(() => {
    dispatch(GetUserByRoles({ limit: 5, page: 1, roles: "AGENT,BUILDER" }));
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Partial<LeadRowProps>>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      assignedTo: "",
      status: "PENDING",
      feedBack: "",
    },
  });

  const handleEdit = (lead: any) => {
    setSelectedLeadId(lead._id);
    setValue("assignedTo", lead.assignedTo?._id || "");
    setValue("status", lead.status);
    setNewAssignee(
      lead.assignedTo
        ? { name: lead.assignedTo.name, role: lead.assignedTo.role || "" }
        : null
    );
    setIsEditDialogOpen(true);
  };

  const onSubmit = (data: any) => {
    console.log("Submitting edited lead:", { id: selectedLeadId, ...data });
    dispatch(updateLeadById({ id: selectedLeadId, updatedData: { ...data } }));
    setIsEditDialogOpen(false);
  };

  return (
    <div>
      {/* <Sidebar /> */}
      <div className="space-y-6 px-4 py-4">
        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            title="Users"
            value={dashboardData?.data?.totalUsers ?? 0}
            description="Total Users"
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            title="Properties"
            value={dashboardData?.data?.totalProperties ?? 0}
            description="Total Properties"
            icon={<House className="h-5 w-5" />}
          />
          <StatsCard
            title="Projects"
            value={dashboardData?.data?.totalProjects ?? 0}
            description="Total Projects"
            icon={<Building2 className="h-5 w-5" />}
          />
          <StatsCard
            title="Leads"
            value={dashboardData?.data?.totalLeads ?? 0}
            description="Total Leads"
            icon={<Users className="h-5 w-5" />}
          />
          <StatsCard
            title="Blogs"
            value={dashboardData?.data?.totalBlogs ?? 0}
            description="Total Blogs"
            icon={<RiBloggerLine className="h-5 w-5" />}
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 pb-2 w-fit text-center ml-4">
          Recent Leads
        </h1>

        {/* Leads Table */}
        <div className="overflow-x-auto px-4">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-center">S No.</th>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Phone Number</th>
                <th className="text-center">Assigned To</th>
                <th className="text-center">Status</th>
                <th className="text-center">Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.data?.recentLeads?.length > 0 ? (
                dashboardData.data.recentLeads.map(
                  (item: any, index: number) => (
                    <tr key={index} className="border-b text-center">
                      <td>{index + 1}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 flex items-center justify-center gap-2">
                        <FaEnvelope /> {item.email}
                      </td>
                      <td className="p-2 font-bold">{item.phoneNumber}</td>
                      <td className="p-2">
                        {item.assignedTo?.name ?? "Unassigned"}
                      </td>
                      <td className="p-2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2 flex justify-center gap-2">
                        <Button
                          className="bg-yellow-500 text-white p-2 rounded"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          className="bg-red-500 text-white p-2 rounded"
                          onClick={() => console.log("Delete lead:", item._id)} // replace with dispatch(deleteLeadById(item._id))
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    No leads available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Dialog */}
        {isEditDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h3 className="text-lg font-semibold">Edit Lead</h3>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                {/* Assigned To Dropdown */}
                <div>
                  <label className="block text-sm font-medium">
                    Assigned To
                  </label>
                  <div className="relative flex flex-row">
                    {/* <button
                    type="button"
                    className="w-full border px-3 py-2 text-left"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  >
                    {newAssignee
                      ? `${newAssignee.name} - ${newAssignee.role}`
                      : "Select Assignee"}
                  </button> */}

                    <div className="relative">
                      {/* Trigger box */}
                      <div
                        className="flex w-full flex-row items-center justify-end border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>{newAssignee?.name || "Select Assignee"}</span>
                        <FaChevronDown
                          className={`ml-2 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {/* Dropdown menu */}
                      {isDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto z-10">
                          {users.map((user, i) => (
                            <div
                              key={i}
                              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                              onClick={() => {
                                setNewAssignee({
                                  name: user.name,
                                  role: user.role,
                                });
                                setValue("assignedTo", user._id);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {user.name || "Unknown"} -{" "}
                              {user.role || "No Role"}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    {...register("status")}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feedback */}
                <div>
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-medium"
                  >
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    placeholder="Write your feedback here..."
                    className="w-full h-36 p-4 border rounded-xl bg-gray-50"
                    {...register("feedBack", {
                      required: "Feedback is required",
                      maxLength: 500,
                    })}
                  />
                  {errors.feedBack && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.feedBack.message}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 border-t px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setIsEditDialogOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};
