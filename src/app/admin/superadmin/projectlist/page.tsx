
"use client"


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProject, getAllProjects } from "@/lib/redux/actions/projectAction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import PaginationMainComponent from "@/components/PaginationMain";

import { useRouter } from 'next/navigation'
import DeleteModal from "@/components/DeletedModal";



const ProjectListing = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState(true);
  const { projectData, paginate } = useAppSelector((state) => state.projects)
  console.log("projectData", projectData)
const dispatch = useAppDispatch();
const totalPages = Math.ceil(paginate?.total/paginate?.limit)
const[isModalopen,setModalopen]=useState(false) 
 
const handlePageClick = (page:number)=>{
  if(page >0 && page < totalPages){
      setCurrentPage(page)
  }
}

const router = useRouter();


const handleModalOpen = (slug: string) => {
  console.log("slug", slug);
  router.push(`/admin/superadmin/project/edit/${slug}`);
};

  useEffect(() => {
    dispatch(getAllProjects({page: currentPage,limit:10}))
  }, [dispatch, currentPage])
  const [isopen,setModalOpen]=useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null);


  
  const handleDeleteClick = (id: string) => {
    setSelectedId(id);   // Save the id
    setModalOpen(true);  // Open the modal
  };
  
  const confirmDelete = () => {
    if (selectedId) {
      dispatch(deleteProject(selectedId));  // Now dispatch happens only after confirmation
    }
    setModalOpen(false);  // Close the modal after deletion
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Projects</h2>
      <table className="w-full table-auto border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3 border">S No.</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Project Type</th>        
            <th className="p-3 border">Locality</th>
            <th className="p-3 border">RERA Number</th>
            <th className="p-3 border">Services</th>
            <th className="p-3 border">Featured</th>
          
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(projectData)&& projectData?.map((project: any,index:any) => (
              <tr key={project?._id} className="border-t">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{project?.title}</td>
                <td className="p-3 border">{project?.imageGallery?.slice(0,1).map((img:any,i:any)=>{
                  return <img key={i} src={img?.secure_url} alt="image" className="w-20 h-20 rounded-md" />
                })}</td> 
                <td className="p-3 border">{project?.projectType}</td>
                <td className="p-3 border">{project?.city} {project?.locality} {project?.state}</td>
                <td className="p-3 border">{project?.reraNumber}</td>         
                <td className="p-3 border">{project?.service}</td>  
                  

                <td className="p-3 border">
                  {project.isFeatured ? (
                    <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">YES</span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-gray-400 text-white">NO</span>
                  )}
                </td>
              
               
                <td className="p-3 flex justify-center items-center mt-6 gap-4">
                  <button className="bg-yellow-400 p-2 rounded text-white hover:bg-yellow-500" 
                  onClick={()=>handleModalOpen(project.slug)}>
                    <FaEdit />
                    
                  </button>
                  <button className="bg-red-500 p-2 rounded text-white hover:bg-red-600" onClick={()=>handleDeleteClick(project?._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      
      <div className="mt-12 flex justify-center">
    <PaginationMainComponent
      totalPages={totalPages}
      currentPage={currentPage}
      paginate={paginate}
      handlePageClick={handlePageClick}
    /></div>

{isopen &&( <DeleteModal isOpen={isopen} onClose={closeModal} onDelete={confirmDelete}/>)}
    </div>
  );
};

export default ProjectListing;
