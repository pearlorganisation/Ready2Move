 "use client"
import { FC, useState } from "react";
import Link from "next/link";
import RoleRedirect from "@/components/RoleBasedComponent";
import CreateProjectBuilderForm from "@/components/CreateProjectByBuilder";
import { BuilderSidebar } from "@/components/BuilderSidebar";
import ProjectListing from "../superadmin/projectlist/page";
const BuilderPage: FC = () => {
  const [openAddProjectModal, setOpenAddProjectModal] = useState<boolean>(false)
  const handleOpenAddProject =()=>{
  setOpenAddProjectModal(!openAddProjectModal)
}

const [tab, setTabToShow] = useState<number>(0)
console.log("the tab is", tab)
  return (
  <div className="flex h-screen">
  {/* Sidebar */}
  <BuilderSidebar setTab={setTabToShow} />

  {/* Right side content */}
  <div className="flex-1 flex flex-col p-6">
    {/* Top-right button */}
    <div className="flex justify-end mb-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleOpenAddProject}>
        Add a Project
      </button>
    </div>

    {/* Modal */}
    {openAddProjectModal && (
      <CreateProjectBuilderForm modalOpen={handleOpenAddProject} />
    )}

    {/* Tab content */}
    <div className="flex-1">
        {tab === 0 && (
        <div className="flex h-full">
          <h1>Project Listing</h1>
          <ProjectListing />
        </div>
      )}
      {tab === 1 && (
        <div className="flex justify-center items-center h-full">
          <h1>This is when clicked on 1</h1>
        </div>
      )}
       {tab === 2 && (
        <div className="flex justify-center items-center h-full">
          <h1>This is when clicked on 2</h1>
        </div>
      )}
       {tab === 3 && (
        <div className="flex justify-center items-center h-full">
          <h1>This is when clicked on 3</h1>
        </div>
      )}
       {tab === 4 && (
        <div className="flex justify-center items-center h-full">
          <h1>This is when clicked on 4</h1>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default BuilderPage;
