"use client"
import type React from "react"
import Link from "next/link"
import { Home, BarChart3, Building2, FolderKanban, Users } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-background border-r h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Real Estate CRM</h1>
      </div>
      <nav className="space-y-2">
        <SidebarLink href="/admin/superadmin/dashboard" icon={<Home className="mr-2 h-4 w-4" />} label="Dashboard" />
        <SidebarLink href="/admin/superadmin/banner" icon={<BarChart3 className="mr-2 h-4 w-4" />} label="Banner" />
        <SidebarLink href="/admin/superadmin/property" icon={<Building2 className="mr-2 h-4 w-4" />} label="Property" />
        <SidebarLink href="/admin/superadmin/project" icon={<FolderKanban className="mr-2 h-4 w-4" />} label="Projects" />
        <SidebarLink href="/admin/superadmin/leads" icon={<Users className="mr-2 h-4 w-4" />} label="Leads" />
        <SidebarLink href="/admin/superadmin/features" icon={<Users className="mr-2 h-4 w-4" />} label="Features" />
        <SidebarLink href="/admin/superadmin/users" icon={<Users className="mr-2 h-4 w-4" />} label="Users" />

      </nav>
    </div>
  )
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      {label}
    </Link>
  )
}

