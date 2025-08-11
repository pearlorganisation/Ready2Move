// import RoleRedirect from "@/components/RoleBasedComponent";
// import { ReactNode } from "react";

// export default function AgentAdminLayout({
//     children}:{children:ReactNode }
//  ){
//     return (
//         <div className="flex h-screen">
//          <RoleRedirect role="AGENT" />
//            <main className="flex-1 overflow-y-auto">
//              {children}
//          </main>
//         </div>
//     )
//  }

'use client'

import RoleRedirect from "@/components/RoleBasedComponent"
import { AgentSidebar } from "@/components/AgentSidebar"
import { ReactNode, useState } from "react"

export default function AgentAdminLayout({ children }: { children: ReactNode }) {
  const [tab, setTabToShow] = useState<number>(0)

  return (
    <div className="flex h-screen">
      <RoleRedirect role="AGENT" />
      <AgentSidebar setTab={setTabToShow} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
