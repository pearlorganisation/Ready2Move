"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import DeleteModal from "@/components/DeletedModal";
import { Button } from "@/components/helper/button";
import Pagination from "@/components/Pagination";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllUser } from "@/lib/redux/actions/authAction";
import { DelUserData } from "@/lib/redux/actions/userAction";

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

  const limit = 5;

  useEffect(() => {
    dispatch(getAllUser({ page: currentPage, limit }));
  }, [currentPage, dispatch]);

  const totalPages = Math.ceil(
    (pagination?.total || 0) / (pagination?.limit || 1)
  );

  const handleDelete = async () => {
    await dispatch(DelUserData(id));
    setDeleteModal(false);
    dispatch(getAllUser({ page: currentPage, limit })); // re-fetch after delete
  };

  const confirmDelete = (userId: string) => {
    setId(userId);
    setDeleteModal(true);
  };

  const onClose = () => setDeleteModal(false);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      {users?.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  {user.isVerified ? "Verified" : "Not Verified"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center">
                    <FaTrash
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => confirmDelete(user._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4 text-gray-500">No users found.</div>
      )}

      {/* Pagination */}
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

      {/* Delete Modal */}
      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={onClose}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Page;
