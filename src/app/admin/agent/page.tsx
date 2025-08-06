'use client'
import { AgentSidebar } from "@/components/AgentSidebar"
import PropertyComponent from "@/components/CreatePropertyCard"
import RoleRedirect from "@/components/RoleBasedComponent"
import { useState } from "react"

const AgentPage = () => {
  const [tab, setTabToShow] = useState<number>(0)
  
  return (
    <div className="flex">
      <AgentSidebar setTab={setTabToShow} />
        {tab === 0 && (
        <div className="flex h-full">
          <PropertyComponent />
          </div>
      )}
    </div>
  )
}

export default AgentPage