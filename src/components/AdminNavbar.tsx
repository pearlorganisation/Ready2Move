"use client"
import { axiosInstance } from "@/lib/constants/axiosInstance"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import DetailsModal from "./DetailsModal"

const AdminNavbar = () => {
const dispatch = useAppDispatch()
  const { isLoggedIn, userData } = useAppSelector(state=> state.user)
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)

  const handleShowDetails =()=>{
    setShowUpdateModal(!showUpdateModal)
  }

  /** will add this in the future */
  // useEffect(()=>{
  //   if(isLoggedIn && userData?._id == ""){
  //      dispatch()
  //   }
  // },[]) 
  return (
    <div>  
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center">
                <div className="relative">
                  <button onClick={handleShowDetails}>Profile</button>
                </div>
              </div>
            </div>
              {showUpdateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                  <div className="w-full h-full bg-white p-6 overflow-auto animate-fade-in">
                    {/* <button
                      className="absolute top-4 right-4 text-xl font-bold"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      ✕
                    </button> */}
                    <DetailsModal userData={userData} showModal={setShowUpdateModal} />
                  </div>
                </div>
              )}          
          </header>
      </div>
  )
}

export default AdminNavbar