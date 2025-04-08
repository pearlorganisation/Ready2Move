 
import AdminNavbar from "@/components/AdminNavbar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <AdminNavbar />
            
            <main>{children}</main>
        </div>
    )
}