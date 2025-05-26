import RoleRedirect from "@/components/RoleBasedComponent";
import { ReactNode } from "react";

export default function AgentAdminLayout({
    children}:{children:ReactNode }
 ){
    return (
        <div className="flex h-screen">
         <RoleRedirect role="AGENT" />
           <main className="flex-1 overflow-y-auto">
             {children}
         </main>
        </div>
    )
 }