 import RoleRedirect from "@/components/RoleBasedComponent";
import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <RoleRedirect role="ADMIN" />
             <main>{children}</main>
        </div>
    )
}