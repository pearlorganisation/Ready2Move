"use client";

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";
import { getAllProjects } from "@/lib/redux/actions/projectAction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import PaginationMainComponent from "@/components/PaginationMain";
import { Delete } from "lucide-react";
import {
  deleteProperty,
  getAllProperties,
} from "@/lib/redux/actions/propertyAction";

import { useRouter } from "next/navigation"; // ✅ App Router
import DeleteModal from "@/components/DeletedModal";

const ProjectListing = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const { propertyData, paginate } = useAppSelector((state) => state.property);
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedData, setseletedData] = useState<string | null>(null);
  console.log("propertyData", propertyData);
  const totalPages = Math.ceil(paginate?.total / paginate?.limit);
  const limit = paginate?.limit;
  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleModalOpen = (slug: string) => {
    console.log("slug", slug);
    router.push(`/admin/superadmin/property/edit/${slug}`);
  };
  useEffect(() => {
    dispatch(
      getAllProperties({
        page: currentPage,
        limit: 10,
        priceRange: 0,
        bedRooms: 0,
        bathRooms: 0,
      })
    );
  }, [dispatch, currentPage]);

  const handleDelete = (id: string) => {
    setseletedData(id);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (selectedData) {
      dispatch(deleteProperty(selectedData)).then((res: any) => {
        if (res.payload.data.success) {
          dispatch(
            getAllProperties({
              page: currentPage,
              limit: 5,
              priceRange: 0,
              bedRooms: 0,
              bathRooms: 0,
            })
          );
          setOpenModal(false);
        }
      });
    }
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    //   <div className="p-4 overflow-x-auto">
    <div>
      <h2 className="text-2xl font-bold mb-4">All Property</h2>
      <table className="w-full table-auto border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3 border">S No.</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border text-nowrap">Property Type</th>
            <th className="p-3 border">Locality</th>
            <th className="p-3 border">RERA Number</th>
            <th className="p-3 border">Services</th>
            <th className="p-3 border">Featured</th>

            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(propertyData) &&
            propertyData?.map((project: any, index: any) => (
              <tr key={project?._id} className="border-t">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{project?.title}</td>
                <td className="p-3 border">
                  {project.imageGallery.slice(0, 1).map((img: any) => {
                    return (
                      <img
                        key={img}
                        src={img.secure_url}
                        alt="image"
                        className="w-20 h-20 rounded-md"
                      />
                    );
                  })}
                </td>
                <td className="p-3 border">{project?.propertyType?.name}</td>
                <td className="p-3 border">
                  {project.city} {project.locality} {project.state}
                </td>
                <td className="p-3 border">{project?.reraNumber}</td>
                <td className="p-3 border">{project?.service}</td>

                <td className="p-3 border">
                  {project.isFeatured ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
                      YES
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-gray-400 text-white">
                      NO
                    </span>
                  )}
                </td>

                <td className="p-3 flex justify-center items-center mt-6 gap-4">
                  <button
                    className="bg-yellow-400 p-2 rounded text-white hover:bg-yellow-500"
                    onClick={() => handleModalOpen(project.slug)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded text-white hover:bg-red-600"
                    onClick={() => {
                      handleDelete(project._id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* 
      <div className="mt-12 flex justify-center">
        <PaginationMainComponent
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          handlePageClick={handlePageClick}
        />
      </div> */}
      <div className="mt-12 flex justify-center">
        {" "}
        {totalPages >= 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaChevronLeft />
              </button>

              <div className="flex space-x-1">
                {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                  let pageNumber;
                  if (totalPages <= 7) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 4) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 3) {
                    pageNumber = totalPages - 6 + i;
                  } else {
                    pageNumber = currentPage - 3 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-[#1E3D9C] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaChevronRight />
              </button>
            </nav>
          </div>
        )}
      </div>

      <div></div>
      {isOpenModal && (
        <DeleteModal
          isOpen={isOpenModal}
          onClose={closeModal}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default ProjectListing;
