 "use client"
import { FC, useState } from "react";
import Link from "next/link";
import RoleRedirect from "@/components/RoleBasedComponent";
import CreateProjectBuilderForm from "@/components/CreateProjectByBuilder";
const BuilderPage: FC = () => {
  const [openAddProjectModal, setOpenAddProjectModal] = useState<boolean>(false)
  const handleOpenAddProject =()=>{
  setOpenAddProjectModal(!openAddProjectModal)
}
  return (
    <div>
      <RoleRedirect role="BUILDER" />
      <div className="w-full flex justify-end mr-6">
        <button className="mr-6" onClick={handleOpenAddProject}>Add a Project</button>
        {openAddProjectModal &&  <CreateProjectBuilderForm modalOpen={handleOpenAddProject} /> }
        
      </div>
    </div>
  );
};

export default BuilderPage;
