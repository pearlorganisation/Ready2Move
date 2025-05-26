"use client"
import type React from "react"
import Link from "next/link"
import { Home, BarChart3, Building2, FolderKanban, Users, HelpCircle, HousePlus, BookHeadphones } from "lucide-react"

export function BuilderSidebar({ setTab }: { setTab: (index:number) => void }) {
    const navItems=[
        {id:0, label:"Projects"},
        {id:1, label:"Item 2"},
        {id:2, label:"Item 3"},
        {id:3, label:"Item 4"},
        {id:4, label:"Item 5"},

    ]
  return (
    <div className="w-64 bg-background border-r h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Ready2Move</h1>
      </div>
      <nav className="space-y-2 flex flex-col">
      {navItems.map((item,index) => (
        <>
        <button onClick={()=>setTab(index)}> 
        <SidebarLink
          key={item.id}
          href="#"  
          icon={<FolderKanban className="mr-2 h-4 w-4" />}  
          label={item.label}
         />
         </button>
         </>
      ))}
    </nav>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}
