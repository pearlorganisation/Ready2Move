"use client"
import { axiosInstance } from "@/lib/constants/axiosInstance"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AdminNavbar = () => {
  return (
    <div>  
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center">
            
                <div className="relative">
                </div>
                
              </div>
            </div>
          </header>
    </div>
  )
}

export default AdminNavbar