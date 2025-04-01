 import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}