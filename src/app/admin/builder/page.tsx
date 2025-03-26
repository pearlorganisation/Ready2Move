"use client"

import { useState } from "react"
import Link from "next/link"
const BuilderPage = () => {
  return (
    <div>
      <div className="w-full flex justify-end">
        <Link href={`/admin/builder/addproject`} >
        Add a Project
        </Link>
       </div>
     </div>
  )
}

export default BuilderPage