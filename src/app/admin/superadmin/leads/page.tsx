"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Import query handling
import { Mail, MoreHorizontal, Edit, Trash, X } from "lucide-react";
import { deleteLeadById, getAllLeads, GetUserByRoles, updateLeadById } from "@/lib/redux/actions/leadsAction";
import { RootState } from "@/lib/redux";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import Pagination from "@/components/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getFeatures } from "@/lib/redux/actions/featuresAction";
import { useForm } from "react-hook-form";
import { Lead } from "@/lib/redux/slice/leadSlice";

const STATUS_OPTIONS = ["PENDING", "CALLING", "QUALIFIED", "UNQUALIFIED"];

export default function LeadsPage() {
  const dispatch = useAppDispatch();
  const { leads, loading, pagination } = useAppSelector(
    (state) => state.leads
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "";
  const propertyOrProject = searchParams.get("type") || "";
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit: number = 5;

  // Handle Status Change and Update URL Query
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    updateQuery({ status });
  };

  // Handle Property/Project Filter
  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    updateQuery({ type });
  };

  // Update Query Parameters in URL
  const updateQuery = (params: { [key: string]: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.keys(params).forEach((key) => {
      if (params[key]) newParams.set(key, params[key]);
      else newParams.delete(key);
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    dispatch(
      getAllLeads({
        page: currentPage,
        limit: limit,
        status: currentStatus,
        propertyOrProject: propertyOrProject,
      })
    );
  }, [dispatch, currentPage, currentStatus, propertyOrProject]);

  return (
    
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
        
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Filter By Status
            </label>
            <select
              className="border border-gray-300 bg-white rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={currentStatus}
              onChange={handleStatusChange}
            >
              <option value="">All</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
              Filter By Type
            </label>
            <select
              className="border border-gray-300 bg-white rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={propertyOrProject}
              onChange={handlePropertyChange}
            >
              <option value="">All</option>
              <option value="property">Property</option>
              <option value="project">Project</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <table className="w-full border-collapse border rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">S No.</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone Number</th>
              <th className="p-3 border">Assigned To</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {false ? (
              <tr>
                <td colSpan={8} className="text-center py-4">Loading...</td>
              </tr>
            ) : leads?.length > 0 ? (
              leads?.map((lead, index) => (
                <LeadRow key={lead._id} Sno={index + 1} {...lead} />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">No leads found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Array.isArray(pagination?.pages) ? pagination.pages[0] : pagination?.pages || 1}
          onPageChange={(page) => setCurrentPage(page)}
        />
  
      </div>
    </div>
  );
}

// LeadRow Component

function LeadRow({
  Sno,
  _id,
  name,
  email,
  phoneNumber,
  assignedTo,
  assignedRole,
  status, 
  createdAt,
}: {
  Sno: number;
} & Lead) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newAssignee, setNewAssignee] = useState<{ name: string; role: string } | null>(null);
  const STATUS_OPTIONS = ["PENDING", "CALLING", "QUALIFIED", "UNQUALIFIED"];

  const { users } = useAppSelector((state) => state.leads);
  console.log("users",users)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetUserByRoles({ limit: 5, page: 1, roles: "AGENT,BUILDER" }));
  }, []);

  // React Hook Form Setup
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name,
      email,
      phoneNumber,
      assignedTo,
      assignedRole,
      status,
    },
  });

  const handleEdit = () => {
    setIsEditDialogOpen(true);
    setNewAssignee(assignedTo ? { name: assignedTo, role: assignedRole || "" } : null);
  };

  const onSubmit = async (data: any) => {
    try {
      await dispatch(updateLeadById({ id: _id, updatedData: data })).unwrap();
      toast.success("Lead updated successfully!");
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update lead!");
    }
  };

  return (
    <>
    
      <tr className="border">
        <td className="p-3 border font-medium">{Sno}</td>
        <td className="p-3 border font-medium">{name}</td>
        <td className="p-3 border flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-500" /> {email}
        </td>
        <td className="p-3 border font-medium">{phoneNumber}</td>
        <td className="p-3 border">{assignedTo ? `${assignedTo} - ${assignedRole}` : "Unassigned"}</td>
        <td className="p-3 border">
          <span className={`px-2 py-1 rounded text-white ${
            status === "PENDING" ? "bg-gray-500" : 
            status === "CALLING" ? "bg-blue-500" : 
            status === "QUALIFIED" ? "bg-green-500" : "bg-red-500"
          }`}>
            {status}
          </span>
        </td>
        <td className="p-3 border">{new Date(createdAt).toLocaleDateString()}</td>
        <td className="p-3 border text-right flex gap-2 justify-end">
          <button
            className="p-2 rounded bg-yellow-500 text-white"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 rounded bg-red-500 text-white" onClick={() => dispatch(deleteLeadById(_id))}>
            <Trash className="h-4 w-4" />
          </button>
        </td>
      </tr>

      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold">Edit Lead</h3>
              <button onClick={() => setIsEditDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input {...register("name")} className="w-full border px-3 py-2 rounded" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input {...register("email")} className="w-full border px-3 py-2 rounded" />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input {...register("phoneNumber")} className="w-full border px-3 py-2 rounded" />
              </div>

              {/* Assigned To Dropdown */}
              <div>
                <label className="block text-sm font-medium">Assigned To</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full border px-3 py-2 text-left"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {newAssignee ? `${newAssignee.name} - ${newAssignee.role}` : "Select Assignee"}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 overflow-auto">
                      {users.map((user, i) => (
                        <div
                          key={i}
                          className="cursor-pointer select-none py-2 px-4 hover:bg-gray-100"
                          onClick={() => {
                            setNewAssignee({ name: user.name, role: user.role });
                            setValue("assignedTo", user._id);
                         
                            setIsDropdownOpen(false);
                          }}
                        >
                          {user.name} - {user.role}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select {...register("status")} className="w-full border px-3 py-2 rounded">
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-2 border-t px-6 py-4">
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


