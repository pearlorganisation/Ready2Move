 import RoleRedirect from "@/components/RoleBasedComponent";
import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen">
      <RoleRedirect role="ADMIN" />
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
    )
}