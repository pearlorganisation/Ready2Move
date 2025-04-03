"use client";

import { FC } from "react";
import Link from "next/link";

const BuilderPage: FC = () => {
  return (
    <div>
      <div className="w-full flex justify-end mr-6">
        <Link href="/admin/builder/addproject" className="mr-6">Add a Project</Link>
      </div>
    </div>
  );
};

export default BuilderPage;
