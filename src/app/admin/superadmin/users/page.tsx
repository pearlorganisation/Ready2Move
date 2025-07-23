"use client";
import React, { useEffect, useRef, useState } from "react";
import DeleteModal from "@/components/DeletedModal";
import Pagination from "@/components/Pagination";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllUser } from "@/lib/redux/actions/authAction";
import { DelUserData, changeUserRole } from "@/lib/redux/actions/userAction";
import { Trash } from "lucide-react";

export interface Paginate {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages?: number[];
}

const Page = () => {
  const dispatch = useAppDispatch();
  const { users, pagination } = useAppSelector((state) => state.auth);

  const [openDeleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState<string>("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [roleModalUser, setRoleModalUser] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const limit = 5;

  useEffect(() => {
    dispatch(getAllUser({ page: currentPage, limit }));
  }, [currentPage, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPages = Math.ceil(
    (pagination?.total || 0) / (pagination?.limit || 1)
  );

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const confirmDelete = (userId: string) => {
    setId(userId);
    setDeleteModal(true);
  };

  const onClose = () => setDeleteModal(false);

  const handleDelete = async () => {
    try {
      await dispatch(DelUserData(id)).unwrap();
      showToast("User deleted successfully", "success");
      setDeleteModal(false);
      dispatch(getAllUser({ page: currentPage, limit }));
    } catch (err) {
      showToast("Failed to delete user", "error");
    }
  };

  const handleRoleModalOpen = (user: any) => {
    setRoleModalUser(user);
    setActiveDropdown(null);
  };

  const handleRoleModalClose = () => {
    setRoleModalUser(null);
  };

  const handleRoleChangeConfirm = async (newRole: string) => {
    if (roleModalUser) {
      try {
        await dispatch(
          changeUserRole({ userId: roleModalUser._id, role: newRole })
        ).unwrap();
        showToast(`Role changed to ${newRole}`, "success");
        setRoleModalUser(null);
        dispatch(getAllUser({ page: currentPage, limit }));
      } catch (error) {
        showToast("Failed to update role", "error");
      }
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "AGENT":
        return "bg-blue-100 text-blue-800";
      case "BUILDER":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      {toast && (
        <div
          className={`mb-4 p-2 rounded text-white text-sm ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {users?.length > 0 ? (
        <div className="">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                        user.isVerified
                      )}`}
                    >
                      {user.isVerified ? "verified" : "Not verified"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === user._id ? null : user._id
                        )
                      }
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-gray-500 text-lg">⋯</span>
                    </button>

                    {activeDropdown === user._id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0  top-10   mt-2 w-48 bg-white rounded-md shadow-lg border z-10 transition-all duration-150"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleRoleModalOpen(user)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span className="mr-2">🔄</span>
                            Change Role
                          </button>
                          <hr className="my-1" />
                          <button
                            onClick={() => confirmDelete(user._id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <span className="mr-2">
                              <Trash size={16} />
                            </span>
                            Delete User
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">No users found.</div>
      )}

      <div className="mt-4 flex justify-center">
        {totalPages >= 1 && (
          <Pagination
            currentPage={currentPage}
            limit={pagination?.limit ?? 1}
            total={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}
      </div>

      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={onClose}
          onDelete={handleDelete}
        />
      )}

      {roleModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
            <h2 className="text-lg font-semibold mb-2">Change User Role</h2>
            <p className="mb-4 text-sm text-gray-600">
              Change role for <strong>{roleModalUser.name}</strong>
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "AGENT",
                  desc: "Real estate agent with property access",
                },
                {
                  label: "BUILDER",
                  desc: "Property builder with construction access",
                },
                // { label: "USER", desc: "Regular user with basic access" },
              ].map((role) => (
                <button
                  key={role.label}
                  onClick={() => handleRoleChangeConfirm(role.label)}
                  className={`w-full text-left p-3 rounded border ${
                    roleModalUser.role === role.label
                      ? "bg-green-100 border-green-400"
                      : "border-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block text-xs font-bold mr-2 ${getRoleBadgeColor(
                      role.label
                    )}`}
                  >
                    {role.label}
                  </span>
                  {role.desc}
                </button>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleRoleModalClose}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
