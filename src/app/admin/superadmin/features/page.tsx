"use client"

import { type FC, useEffect, useState } from "react"
import { Pencil, Trash2, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getFeatures } from "@/lib/redux/actions/featuresAction"
import { Sidebar } from "@/components/sidebar"

interface FeatureItem {
  id: number
  name: string
  slug: string
}

const Page: FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("Parking")

  const { userData } = useAppSelector((state) => state.user)
  const { featureData } = useAppSelector((state) => state.features)
  console.log("dfr",featureData)
const dispatch= useAppDispatch()

  console.log("redux",useAppSelector((state)=>state))

  useEffect(()=>{
    dispatch(getFeatures())
  },[])
  const [newFeatureName, setNewFeatureName] = useState("")
  const [newFeatureType, setNewFeatureType] = useState(selectedType)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <div>
       {/* <Sidebar /> */}
        <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-700">FEATURE LISTING</h1>
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Type
          </button>
        </div>

        <div className="mb-6 flex space-x-1 overflow-x-auto">
        {featureData?.map((item) => (
    <button
      key={item.type}  // Use item.type as the key
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        selectedType === item.type
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => setSelectedType(item.type)}  // Pass item.type instead of the whole object
    >
  {item.type.split('_').join('')}  </button>
  ))}


        </div>

        <div className="bg-white rounded-md overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {
    featureData?.map((featureGroup) => {
      // Find the selected type's features from the data
      if (featureGroup.type === selectedType) {
        return featureGroup.features.map((feature,i) => (
          <tr key={feature._id}>
            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{i+1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{feature.name}</td>
      
            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
              <div className="flex space-x-2">
                <button className="text-amber-500 hover:text-amber-600">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ));
      }
      return null;
    })
  }


            </tbody>
          </table>
        </div>

        {/* Modal Dialog - Pure Tailwind CSS */}
        {isAddDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium">Add Feature Listing</h3>
                <button onClick={() => setIsAddDialogOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Type</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {newFeatureType}
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                        {featureData.map((item,i) => (
                          <div
                            key={i}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                            onClick={() => {
                              setNewFeatureType(item.type)
                              setIsDropdownOpen(false)
                            }}
                          >
                            {item.type.split('_').join(' ')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={newFeatureName}
                    onChange={(e) => setNewFeatureName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                type="submit"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
     
  )
}

export default Page

