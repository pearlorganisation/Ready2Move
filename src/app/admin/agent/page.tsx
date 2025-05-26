'use client'
import { AgentSidebar } from "@/components/AgentSidebar"
import RoleRedirect from "@/components/RoleBasedComponent"
import { useState } from "react"

const AgentPage = () => {
  const [tab, setTabToShow] = useState<number>(0)
  
  return (
    <div className="flex h-screen">
      <AgentSidebar setTab={setTabToShow} />
        <div className="flex-1 flex flex-col p-6">
          <h1>This is the agent dashboard</h1>
             <div className="flex-1">
        {tab === 0 && (
        <div className="flex h-full">
          <h1>Property Listing</h1>
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
  )
}

export default AgentPage