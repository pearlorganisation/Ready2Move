"use client";

import { FC } from "react";
import Link from "next/link";
import RoleRedirect from "@/components/RoleBasedComponent";

const BuilderPage: FC = () => {
  return (
    <div>
      <RoleRedirect role="BUILDER" />
      <div className="w-full flex justify-end mr-6">
        <Link href="/admin/builder/addproject" className="mr-6">Add a Project</Link>
      </div>
    </div>
  );
};

export default BuilderPage;
