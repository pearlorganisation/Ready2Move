"use client"
import AddFeatureComponent from "@/components/AddFeatureComponent"
import ListingFeatureComponent from "@/components/ListingFeatureComponent"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getFeatures } from "@/lib/redux/actions/featuresAction"
import { useEffect, useState } from "react"

 
 const page = () => {
  const dispatch = useAppDispatch()
  const { featureData } = useAppSelector(state=> state.features)
  const [addFeatureOpen, setAddFeatureOpen] = useState(false)
  
  const handleOpen=()=>{
    setAddFeatureOpen(!addFeatureOpen)
  }

  useEffect(()=>{
   dispatch(getFeatures())
  },[])
   return (
     <div>

      <ListingFeatureComponent />
      {addFeatureOpen && <><AddFeatureComponent /></>}
     </div>
   )
 }
 
 export default page