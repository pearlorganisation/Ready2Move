import { BuilderSidebar } from "@/components/BuilderSidebar";
import RoleRedirect from "@/components/RoleBasedComponent";
import { ReactNode } from "react";

export default function BuilderAdminLayout({children}:{children: ReactNode}){
    return(
        <div className="flex h-screen">
         <RoleRedirect role="BUILDER" />
          <main className="flex-1 overflow-y-auto">
             {children}
         </main>
        </div>
    )
}