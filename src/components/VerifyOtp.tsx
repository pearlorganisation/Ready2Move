"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { verification, verifyOtp } from "@/lib/redux/actions/otpAction"
import { resetOtpEmail } from "@/lib/redux/slice/passwordSlice"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { resetOtpState } from "@/lib/redux/slice/otpVerificationSlice"

const VerifyOtp = () => {

const dispatch = useAppDispatch();
const router = useRouter();
const { isSuccess, isError, isLoading } = useAppSelector(state=> state.otp);
const { register, handleSubmit, formState: { errors } } = useForm<verification>();
/** to reset the email state for going back to the form for entering the email */
const handleRequestResetForm = ()=>{
    dispatch(resetOtpEmail())
}
const [emailStoredInLocalStorage, setEmailStoredInLocalStorage] = useState<string>("")

/** to get the stored email in the local storage */ 
useEffect(() => {
    const fetchData = async () => {
        let val = localStorage.getItem("otpVerifyEmail");
        if (val) {
            try {
                setEmailStoredInLocalStorage(val)
             } catch (err) {
                console.error("Failed to parse JSON from localStorage:", err);
            }
        }
    };
    fetchData();
}, []);

useEffect(()=>{
  if(isSuccess){
    dispatch(resetOtpState())
    // dispatch(resetOtpEmail())
    router.push("/resetpassword")
  }
},[isSuccess])

console.log("the recieved email from the storage", emailStoredInLocalStorage);

const submitOtp: SubmitHandler<verification>=(data)=>{
    const formData = {...data, email:emailStoredInLocalStorage, type:"FORGOT_PASSWORD"};

           dispatch(verifyOtp(formData))
}
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <button onClick={handleRequestResetForm} className="bg-blue-300 text-2xl p-2 rounded-md w-full">Reset</button>
       <form
        onSubmit={handleSubmit(submitOtp)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
 
        <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>

        {/* Email Field */}
        <div className="mb-4">
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label> */}
          {/* <input
            type="hidden"
            id="email"
            value={emailStoredInLocalStorage} // a string from state or props
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          {/* {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )} */}
        </div>

        {/* OTP Field */}
        <div className="mb-4">
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            {...register("otp", { required: "OTP is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        {/* Hidden Type Field */}
        {/* <input
          type="hidden"
          value="FORGOT_PASSWORD" // or whatever type you want to hardcode
          {...register("type")}
        /> */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </form>
    </div>
  )
}

export default VerifyOtp