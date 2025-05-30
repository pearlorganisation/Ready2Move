"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks/dispatchHook"; // assuming your hooks
import { deleteProject } from "@/lib/redux/actions/projectAction";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-center text-xl font-semibold">
          Delete Confirmation
        </h2>
        <p className="text-center">Are you sure you want to delete this?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
