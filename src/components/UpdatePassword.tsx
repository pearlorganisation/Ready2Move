"use client"

import { useAppDispatch } from "@/lib/hooks/dispatchHook"
import { updateUserPassword } from "@/lib/redux/actions/passwordAction"
import { SubmitHandler, useForm } from "react-hook-form"

export interface Password{
    password:string
}
const UpdatePassword = () => {
    const dispatch = useAppDispatch()
    const {register, handleSubmit,formState:{errors}} = useForm<Password>()
  
    const submitPasswordUpdate:SubmitHandler<Password>=(data)=>{
          dispatch(updateUserPassword(data))  
    }
    return (
     <div className="flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(submitPasswordUpdate)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Update Password
        </h2>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Update Password
        </button>
      </form>
    </div>
  )
}
 
export default UpdatePassword