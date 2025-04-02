 import { ReactNode } from "react";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}