"use client"
import Link from "next/link"

const AdminNavbar = () => {
  return (
    <div>  
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center">
                {/* <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                  Admin
                </span> */}
                <Link href={`/`}>
                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                  Add Product
                </span>
                </Link>
                 
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
                    Add Product Category
                </span>
                <div className="relative">
                </div>
                
              </div>
            </div>
          </header>
    </div>
  )
}

export default AdminNavbar