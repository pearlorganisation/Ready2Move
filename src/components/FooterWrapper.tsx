"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

const FooterWrapper = () => {
      const pathName = usePathname()
      const isAdminPath = pathName.startsWith("/admin")
if(isAdminPath){
    return null
}
 return (
    <Footer />
  )
}

export default FooterWrapper