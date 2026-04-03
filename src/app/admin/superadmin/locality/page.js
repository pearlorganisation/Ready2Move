"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import {
  deleteLocality,
  getLocalities,
  createLocality,
  updateLocality,
} from "@/lib/redux/actions/localityAction";
import Pagination from "@/components/Pagination";

const LocalityManagement = () => {
  const dispatch = useAppDispatch();
  const { localities, pagination, isLoading } = useAppSelector((state) => state.locality);

  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getLocalities({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editId) {
      const result = await dispatch(updateLocality({ id: editId, locality: inputValue }));
      if (updateLocality.fulfilled.match(result)) handleCancel();
    } else {
      const result = await dispatch(createLocality(inputValue));
      if (createLocality.fulfilled.match(result)) setInputValue("");
    }
    dispatch(getLocalities({ page: currentPage, limit }));
  };

  // FIXED LINE BELOW: Removed the TypeScript type definition
  const handleEditClick = (loc) => {
    setEditId(loc._id);
    setInputValue(loc.locality);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setInputValue("");
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(deleteLocality(deleteId));
      setDeleteId(null);
      dispatch(getLocalities({ page: currentPage, limit }));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          {editId ? "Edit Locality" : "Add New Locality"}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-1 p-2.5 border rounded-lg outline-none"
            placeholder="Enter locality name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-lg font-semibold text-white flex items-center gap-2 ${
                editId ? "bg-amber-600" : "bg-blue-600"
              }`}
            >
              {editId ? <><FaCheck /> Update</> : <><FaPlus /> Add</>}
            </button>
            {editId && (
              <button onClick={handleCancel} type="button" className="px-4 py-2.5 bg-gray-200 rounded-lg">
                <FaTimes />
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {localities?.map((loc) => (
              <tr key={loc._id} className={editId === loc._id ? 'bg-amber-50' : ''}>
                <td className="px-6 py-4 text-sm text-gray-800">{loc.locality}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleEditClick(loc)} className="text-amber-600"><FaEdit /></button>
                  <button onClick={() => setDeleteId(loc._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination?.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          limit={limit}
          total={pagination.total}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Delete Locality?</h3>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-2 bg-red-600 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalityManagement;