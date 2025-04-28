"use client"

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UpdatePassword from "./UpdatePassword";
import { fetchCurrentUser, updateUser } from "@/lib/redux/actions/userAction";
import { useAppDispatch } from "@/lib/hooks/dispatchHook";

export interface UserData{
    _id:string;
    name:string;
    email:string;
    phoneNumber:string;
    role:string;
    isVerified:string;
    refreshToken ?: string
}
const DetailsModal = ({userData, showModal}:{userData: UserData, showModal:React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const dispatch = useAppDispatch()
    const [openUpdateModal, setUpdateModal] = useState<boolean>(false)
    const [openPasswordUpdateModal, setOpenPasswordUpdateModal] = useState<boolean>(false)
    const [detailsModal, setOpenDetailsModal] = useState<boolean>(false)

    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<UserData>({
            defaultValues: {
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            },
        });
   
    const handleOpenDetails=()=>{
       setOpenDetailsModal(!detailsModal)
    }
        

  /** for opening the update modal */
   const handelOpenUpdateModal =()=>{
    setUpdateModal(!openUpdateModal)
   }

   const handleOpenUpdatePassword =()=>{
    setOpenPasswordUpdateModal(!openPasswordUpdateModal)
   }

    {/** for sending the updated data */}   
    const onSubmitForm:SubmitHandler<UserData> =async(data)=>{
      try {
          const response = await dispatch(updateUser({ userdata: data })).unwrap();
          // handle success
          console.log("User updated:", response);
          if(response?.data?.success == true){
            dispatch(fetchCurrentUser())
          }
        } catch (error) {
          // handle error
          console.error("Failed to update user:", error);
        }      
      } 
     return (
 <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
  <div className="bg-white rounded-2xl shadow-xl w-full h-full max-w-4xl p-6 space-y-6 overflow-y-auto relative">
    <div className="flex justify-between">    
        <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
        <button onClick={() => showModal(false)}>Close</button>
    </div>
    {/* User Details */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-sm text-gray-500">Name</h3>
        <p>{userData?.name}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-sm text-gray-500">Email</h3>
        <p>{userData?.email}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-sm text-gray-500">Phone Number</h3>
        <p>{userData?.phoneNumber}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-sm text-gray-500">Role</h3>
        <p>{userData?.role}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-semibold text-sm text-gray-500">Verified</h3>
        <p>{userData?.isVerified ? "Yes" : "No"}</p>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handelOpenUpdateModal}
        className="w-full sm:w-auto px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Update Details
      </button>
      <button
        onClick={handleOpenUpdatePassword}
        className="w-full sm:w-auto px-6 py-2 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
      >
        Update Password
      </button>
    </div>

    {/* Update Profile Form */}
    {openUpdateModal && (
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-700">Edit Profile</h3>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
            className="mt-1 w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex">
              <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Save Changes
        </button>
          <button
          onClick={handelOpenUpdateModal}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Cancel
        </button>
        </div>
       
      </form>
    )}

    {/** update password modal */}
    {
    openPasswordUpdateModal && <>
      <UpdatePassword />
       </>
    }
  </div>
</div>  

  )
}

export default DetailsModal