"use client";
import { Button } from "@/components/helper/button";
import Pagination from "@/components/Pagination";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { getAllUser } from "@/lib/redux/actions/authAction";
import React, { useEffect, useState } from "react";

export interface Paginate {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[]; // this can be removed if you're calculating total pages
}

const Page = () => {
  const dispatch = useAppDispatch();
  const { users, pagination } = useAppSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;

  // Fetch users when currentPage changes
  useEffect(() => {
    dispatch(getAllUser({ page: currentPage, limit }));
  }, [currentPage, dispatch]);

  // Total pages fallback
  const totalPages = Math.ceil(
    (pagination?.total || 0) / (pagination?.limit ?? 1)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      {users?.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">S.no</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user._id || index}>
                <td className="py-2 px-4 border-b">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  {user.isVerified ? "Verified" : "Not verified"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500">No users found.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="mx-auto">
        {totalPages >= 1 && (
          <Pagination
            currentPage={currentPage}
            limit={pagination?.limit ?? 1} // fallback to 1 if undefined
            total={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
