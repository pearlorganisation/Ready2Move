"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { resetPasswordFunction } from "@/lib/redux/actions/passwordAction"
import { resetOtpEmail } from "@/lib/redux/slice/passwordSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export interface ResetPasswordForm {
  email: string
  newPassword: string
  confirmNewPassword: string
}

const ResetPasswordPage = () => {
   const dispatch = useAppDispatch()
   const router = useRouter()
   const { resetPassword } = useAppSelector(state=> state.forgotpassword)
   const { isPasswordResetLoading , isPasswordReset, isPasswordResetFailed } = resetPassword; 
    
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ResetPasswordForm>()


  useEffect(()=>{
     if(isPasswordReset){
        dispatch(resetOtpEmail())
        router.push("/")
     }
  },[isPasswordReset])

  const onSubmit = (data: ResetPasswordForm) => {
    console.log("Reset password data:", data)
    dispatch(resetPasswordFunction(data))
   }

  const newPassword = watch("newPassword")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword", { required: "New password is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            {...register("confirmNewPassword", {
              required: "Please confirm your password",
              validate: value =>
                value === newPassword || "Passwords do not match"
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPasswordPage
