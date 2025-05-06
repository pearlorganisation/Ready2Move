"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { axiosInstance } from "@/lib/constants/axiosInstance"
 
const RoleRedirect = ({role}:{role:string}) => {
  const router = useRouter()
  const pathname = usePathname()
  console.log("the pathname of the page is", pathname)

  const [userdata, setuserdata] = useState<{ role: string } | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/users/me`)
        console.log(response.data, "the data is")

        if (response?.data?.data?.role != role || response?.data?.success == false) {
          router.push("/")
        }

        setuserdata(response?.data?.data)
      } catch (error) {
        // console.error("Error fetching user data:", error)
        if(error){
          router.push("/")
        }
      }
    }

    fetchUserData()
  }, [])

  return null 
}

export default RoleRedirect
