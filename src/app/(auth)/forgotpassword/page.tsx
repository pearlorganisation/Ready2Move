"use client"
import VerifyOtp from "@/components/VerifyOtp"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { forgotPassword } from "@/lib/redux/actions/passwordAction"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

export interface ForgotEmail {
    email: string
}
 
const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit,watch,formState: { errors } } = useForm<ForgotEmail>()
  const [userEmail, setUserEmail] = useState<string>("")
  const { isSuccess, isLoading } = useAppSelector(state=> state.forgotpassword)
    
  const onSubmit: SubmitHandler<ForgotEmail> = (data) => {
    localStorage.setItem("otpVerifyEmail",data.email)
    dispatch(forgotPassword(data))
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {isSuccess ? <div><VerifyOtp /></div>:  
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{typeof errors.email?.message === 'string' ? errors.email.message : ''}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>}
     
    </div>
  )
}

export default ForgotPasswordPage
