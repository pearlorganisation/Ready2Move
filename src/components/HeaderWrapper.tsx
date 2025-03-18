"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"

const HeaderWrapper = () => {
  const pathName = usePathname()
  const isAdminPath = pathName.startsWith("/admin")
  if(isAdminPath){
    return null
  }
    return (
    <Header />
  )
}

export default HeaderWrapper